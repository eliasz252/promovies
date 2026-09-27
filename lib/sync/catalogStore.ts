import fs from "fs";
import path from "path";
import {
  CatalogCategory,
  CatalogItem,
  CategorySyncSummary,
  SyncStats,
} from "./catalogTypes";

const DATA_DIR = path.join(process.cwd(), "data");
const CATALOG_FILE = path.join(DATA_DIR, "synced-catalog.json");
const SYNC_LOGS_FILE = path.join(DATA_DIR, "sync-history.json");
const LOGS_DIR = path.join(process.cwd(), "logs");

function ensureDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Reads all catalog items from the storage file
 */
export function getAllCatalogItems(): CatalogItem[] {
  try {
    ensureDirectory(DATA_DIR);
    if (!fs.existsSync(CATALOG_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(CATALOG_FILE, "utf-8");
    if (!raw.trim()) return [];
    return JSON.parse(raw) as CatalogItem[];
  } catch (err) {
    console.error("[CatalogStore] Error reading synced-catalog.json:", err);
    return [];
  }
}

/**
 * Returns the epoch timestamp in ms of the last successful sync, or null if never synced
 */
export function getLastSyncTime(): number | null {
  try {
    ensureDirectory(DATA_DIR);
    if (fs.existsSync(SYNC_LOGS_FILE)) {
      const raw = fs.readFileSync(SYNC_LOGS_FILE, "utf-8");
      if (raw.trim()) {
        const history = JSON.parse(raw);
        if (Array.isArray(history) && history.length > 0 && history[0].completed_at) {
          const t = new Date(history[0].completed_at).getTime();
          if (!isNaN(t)) return t;
        }
      }
    }
    if (fs.existsSync(CATALOG_FILE)) {
      const stat = fs.statSync(CATALOG_FILE);
      return stat.mtimeMs;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Query catalog items by category with sorting
 */
export function getCatalogByCategory(
  category: CatalogCategory,
  activeOnly = true,
  limit?: number
): CatalogItem[] {
  const items = getAllCatalogItems().filter((item) => {
    if (item.category !== category) return false;
    if (activeOnly && !item.is_active) return false;
    return true;
  });

  // Sort: Items with rank first (1 to N), then by vote_average descending
  items.sort((a, b) => {
    if (a.rank !== null && b.rank !== null) return a.rank - b.rank;
    if (a.rank !== null) return -1;
    if (b.rank !== null) return 1;
    return (b.vote_average || 0) - (a.vote_average || 0);
  });

  return limit ? items.slice(0, limit) : items;
}

/**
 * Structured logger to file
 */
export function writeStructuredLog(logFileName: string, message: string) {
  try {
    ensureDirectory(LOGS_DIR);
    const logPath = path.join(LOGS_DIR, logFileName);
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`, "utf-8");
  } catch (err) {
    console.error("[CatalogStore] Failed to write log:", err);
  }
}

/**
 * Production Transactional Storage Manager
 * Ensures that sync execution is all-or-nothing (atomic).
 */
export class CatalogTransaction {
  private workingItems: CatalogItem[];
  private isCommitted = false;
  private isRolledBack = false;

  constructor() {
    // Clone existing state into isolated transaction buffer
    this.workingItems = JSON.parse(JSON.stringify(getAllCatalogItems()));
  }

  /**
   * Fully rebuilds a category: deletes previous rows of this category and inserts new ones.
   * Used for: featured, top10, now_playing, trending_tv
   */
  public rebuildCategory(
    category: CatalogCategory,
    newItems: Omit<CatalogItem, "created_at" | "updated_at">[]
  ): CategorySyncSummary {
    const now = new Date().toISOString();

    // Count previous items in this category
    const previousCount = this.workingItems.filter(
      (i) => i.category === category
    ).length;

    // Remove old items of this category
    this.workingItems = this.workingItems.filter((i) => i.category !== category);

    // Insert new items
    const insertedItems: CatalogItem[] = newItems.map((item) => ({
      ...item,
      category,
      is_active: true,
      created_at: now,
      updated_at: now,
    }));

    this.workingItems.push(...insertedItems);

    return {
      category,
      mode: "rebuild",
      added: insertedItems.length,
      updated: 0,
      removed: previousCount,
      total_active: insertedItems.length,
    };
  }

  /**
   * Upserts incoming items by (tmdb_id, category) and soft-deletes dropped items.
   * Used for: upcoming, top_rated
   */
  public upsertWithSoftDelete(
    category: CatalogCategory,
    incomingItems: Omit<CatalogItem, "created_at" | "updated_at">[]
  ): CategorySyncSummary {
    const now = new Date().toISOString();
    const incomingMap = new Map<number, Omit<CatalogItem, "created_at" | "updated_at">>();
    for (const item of incomingItems) {
      incomingMap.set(item.tmdb_id, item);
    }

    let added = 0;
    let updated = 0;
    let removed = 0;

    // 1. Process existing items for this category
    for (let i = 0; i < this.workingItems.length; i++) {
      const item = this.workingItems[i];
      if (item.category !== category) continue;

      if (incomingMap.has(item.tmdb_id)) {
        // Item is still in the incoming feed -> Update attributes and ensure active
        const fresh = incomingMap.get(item.tmdb_id)!;
        this.workingItems[i] = {
          ...item,
          ...fresh,
          is_active: true,
          updated_at: now,
        };
        updated++;
        incomingMap.delete(item.tmdb_id); // Handled
      } else {
        // Item dropped out of the feed -> Soft-delete
        if (item.is_active) {
          this.workingItems[i].is_active = false;
          this.workingItems[i].updated_at = now;
          removed++;
        }
      }
    }

    // 2. Add brand-new items that didn't exist in the database
    for (const fresh of incomingMap.values()) {
      this.workingItems.push({
        ...fresh,
        category,
        is_active: true,
        created_at: now,
        updated_at: now,
      });
      added++;
    }

    const totalActive = this.workingItems.filter(
      (i) => i.category === category && i.is_active
    ).length;

    return {
      category,
      mode: "upsert_with_soft_delete",
      added,
      updated,
      removed,
      total_active: totalActive,
    };
  }

  /**
   * Atomically commits transaction to disk using a temporary file and rename
   */
  public commit(): void {
    if (this.isCommitted || this.isRolledBack) return;

    ensureDirectory(DATA_DIR);
    const tempFile = path.join(
      DATA_DIR,
      `synced-catalog.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`
    );

    try {
      fs.writeFileSync(
        tempFile,
        JSON.stringify(this.workingItems, null, 2),
        "utf-8"
      );
      // Atomic rename replaces the existing file instantaneously
      fs.renameSync(tempFile, CATALOG_FILE);
      this.isCommitted = true;
    } catch (err) {
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }
      throw new Error(`Failed to commit catalog transaction: ${err}`);
    }
  }

  /**
   * Discards the working state on error
   */
  public rollback(): void {
    this.isRolledBack = true;
  }
}

/**
 * Saves a structured sync execution log to history
 */
export function saveSyncHistoryLog(stats: SyncStats): void {
  try {
    ensureDirectory(DATA_DIR);
    let history: SyncStats[] = [];
    if (fs.existsSync(SYNC_LOGS_FILE)) {
      const raw = fs.readFileSync(SYNC_LOGS_FILE, "utf-8");
      if (raw.trim()) history = JSON.parse(raw);
    }

    history.unshift(stats);
    if (history.length > 50) history = history.slice(0, 50); // Keep last 50 runs

    const tempFile = path.join(DATA_DIR, `sync-history.${Date.now()}.tmp`);
    fs.writeFileSync(tempFile, JSON.stringify(history, null, 2), "utf-8");
    fs.renameSync(tempFile, SYNC_LOGS_FILE);
  } catch (err) {
    console.error("[CatalogStore] Failed to save sync history log:", err);
  }
}
