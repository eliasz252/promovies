"use client";

import { usePathname } from "next/navigation";

export default function AppMainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={`flex-1 w-full ${isHome ? "pt-0" : "pt-16 sm:pt-20"}`}>
      {children}
    </main>
  );
}
