import BrandLogo from "@/components/ui/BrandLogo";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] flex flex-col items-center justify-center gap-6 select-none">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
        <div className="absolute">
          <BrandLogo size="md" clickable={false} />
        </div>
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 animate-pulse">
        Loading ProMovies Cinema Experience...
      </p>
    </div>
  );
}
