import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMediaDetails, getTMDBImageUrl } from "@/lib/tmdb/client";
import { formatYear, formatScore } from "@/lib/utils";
import EpisodeList from "@/components/media/EpisodeList";
import AddToListButton from "@/components/media/AddToListButton";
import StreamingPlayer from "@/components/media/StreamingPlayer";
import {
  ArrowLeft,
  Star,
  Play,
  Sparkles,
  Calendar,
  Tv,
  Film,
} from "lucide-react";

interface AnimeDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ season?: string }>;
}

export async function generateMetadata({
  params,
}: AnimeDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const anime = await getMediaDetails("tv", id);

  if (!anime) {
    return { title: "Anime Not Found - ProMovies" };
  }

  const title = anime.name || anime.title || "Anime Series";
  const year = formatYear(anime.first_air_date || anime.release_date);

  return {
    title: `${title} (${year}) - Watch Anime on ProMovies`,
    description: anime.overview || `Watch all seasons and episodes of ${title} in 4K UHD.`,
    openGraph: {
      title,
      description: anime.overview,
      images: [getTMDBImageUrl(anime.backdrop_path || anime.poster_path, "w1280")],
    },
  };
}

export default async function AnimeDetailPage({
  params,
  searchParams,
}: AnimeDetailPageProps) {
  const { id } = await params;
  const query = searchParams ? await searchParams : {};
  const seasonParam = query.season ? parseInt(query.season, 10) : 1;

  const anime = await getMediaDetails("tv", id);

  if (!anime) {
    notFound();
  }

  const title = anime.name || anime.title || "Untitled Anime";
  const year = formatYear(anime.first_air_date || anime.release_date);
  const score = formatScore(anime.vote_average);
  const backdropUrl = getTMDBImageUrl(anime.backdrop_path || anime.poster_path, "original");
  const posterUrl = getTMDBImageUrl(anime.poster_path || anime.backdrop_path, "w500");

  const genres = anime.genres?.map((g) => g.name).join(", ") || "Animation, Action, Fantasy";

  return (
    <div className="min-h-screen bg-[#070a0d] text-slate-100 pb-24 selection:bg-violet-600 selection:text-white">
      {/* 1. HERO BACKDROP SHOWCASE */}
      <div className="relative w-full overflow-hidden border-b border-white/10">
        {/* Ambient Dark Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <Image
            src={backdropUrl}
            alt=""
            fill
            unoptimized
            priority
            className="object-cover scale-105 opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070a0d] via-[#070a0d]/80 to-transparent" />
        </div>

        {/* Top Navigation */}
        <header className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-white/5">
          <Link
            href="/anime"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Anime Universe</span>
          </Link>

          <div className="flex items-center gap-3">
            <AddToListButton media={anime} variant="full" />
          </div>
        </header>

        {/* Anime Showcase Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Poster Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative aspect-[2/3] w-56 sm:w-64 lg:w-72 rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black/60 shrink-0">
              <Image
                src={posterUrl}
                alt={title}
                fill
                priority
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 240px, 300px"
              />
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/30 text-violet-300 font-bold border border-violet-500/40 uppercase tracking-wider text-[10px]">
                <Sparkles className="w-3.5 h-3.5" />
                ANIME SERIES
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {score}
              </span>
              {year && (
                <span className="flex items-center gap-1 text-slate-300 font-medium">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {year}
                </span>
              )}
              {anime.number_of_seasons && (
                <span className="px-2 py-0.5 rounded bg-black/60 text-slate-300 font-semibold text-[10px] border border-white/10">
                  {anime.number_of_seasons} Season{anime.number_of_seasons > 1 ? "s" : ""}
                </span>
              )}
              <span className="px-1.5 py-0.5 rounded bg-black/60 text-slate-300 font-semibold text-[10px] border border-white/10">
                4K UHD
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-none font-sans drop-shadow-xl">
              {title}
            </h1>

            {anime.original_name && anime.original_name !== title && (
              <p className="text-sm font-medium text-violet-300/80 -mt-2">
                {anime.original_name}
              </p>
            )}

            <div className="text-xs sm:text-sm text-slate-400 font-semibold">
              {genres}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal line-clamp-4">
              {anime.overview || "Stream this acclaimed anime series with all episodes in high definition."}
            </p>

            <div className="flex items-center gap-3 pt-3">
              <a
                href="#player-section"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-xl shadow-violet-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Watching</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN PLAYER & EPISODES CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col gap-12">
        {/* Streaming Player Section */}
        <section id="player-section" className="flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
              <span>Anime Streaming Player</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              Click any episode below to watch instantly
            </span>
          </div>

          <StreamingPlayer
            tmdbId={anime.id}
            mediaType="tv"
            title={title}
            backdropPath={anime.backdrop_path}
            seasons={anime.seasons}
            initialSeason={seasonParam}
            initialEpisode={1}
            autoPlay={false}
          />
        </section>

        {/* 3. DYNAMIC EPISODES LIST WITH REAL TMDB DATA */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#111119] border border-white/10 shadow-2xl">
          <EpisodeList
            tmdbId={anime.id}
            mediaType="tv"
            initialSeasons={anime.seasons}
            backdropPath={anime.backdrop_path}
            selectedSeasonNumber={seasonParam}
            syncWithUrl={true}
          />
        </section>
      </div>
    </div>
  );
}
