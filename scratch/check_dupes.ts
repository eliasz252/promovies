import { MOCK_MEDIA_ITEMS } from "../lib/tmdb/mockData";

const ids = MOCK_MEDIA_ITEMS.map((m) => m.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
const uniqueDupes = Array.from(new Set(dupes));

console.log("Total items:", MOCK_MEDIA_ITEMS.length);
console.log("Total duplicate ID occurrences:", dupes.length);
console.log("Unique duplicate IDs count:", uniqueDupes.length);
console.log("Duplicate IDs:", uniqueDupes);

for (const id of uniqueDupes) {
  const matches = MOCK_MEDIA_ITEMS.filter((m) => m.id === id);
  console.log(`ID ${id} is duplicated ${matches.length} times:`, matches.map((m) => m.title));
}
