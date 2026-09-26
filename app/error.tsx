"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ProMovies Error Caught]", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 select-none">
      <div className="p-4 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-4">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
        Signal Interruption
      </h1>
      <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
        Something unexpected occurred while streaming catalog data. Please try reloading or return to the main lobby.
      </p>

      <div className="flex items-center gap-4">
        <Button variant="primary" size="md" onClick={() => reset()}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Link href="/">
          <Button variant="secondary" size="md">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
