import Link from "next/link";
import { Film, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 select-none">
      <div className="relative mb-6">
        <span className="text-8xl sm:text-9xl font-black text-white/5 select-none">404</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className="w-16 h-16 text-violet-500 animate-pulse" />
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
        Lost in the Multiverse?
      </h1>
      <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
        The title or page you are looking for has departed this timeline or moved to another premiere theatre.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/">
          <Button variant="primary" size="lg">
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </Link>
        <Link href="/search">
          <Button variant="secondary" size="lg">
            <Search className="w-4 h-4 mr-2" />
            Search Titles
          </Button>
        </Link>
      </div>
    </div>
  );
}
