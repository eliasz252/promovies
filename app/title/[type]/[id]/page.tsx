import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaType, MediaItem } from "@/types/tmdb";
import { getMediaDetails, getTMDBImageUrl } from "@/lib/tmdb/client";
import { formatYear, formatRuntime, formatScore } from "@/lib/utils";
import { getMovieTheme } from "@/lib/utils/movieTheme";
import AddToListButton from "@/components/media/AddToListButton";
import RatingStars from "@/components/media/RatingStars";
import EpisodeList from "@/components/media/EpisodeList";
import MediaCard from "@/components/media/MediaCard";
import StreamingPlayer from "@/components/media/StreamingPlayer";
import {
  Star,
  Play,
  ArrowLeft,
  Video,
  Film,
  Users,
  ExternalLink,
  Tv,
} from "lucide-react";

interface TitlePageProps {
  params: Promise<{ type: string; id: string }>;
  searchParams?: Promise<{ t?: string; s?: string; e?: string }>;
}

export async function generateMetadata({ params }: TitlePageProps): Promise<Metadata> {
  const { type, id } = await params;
  const media = await getMediaDetails(type as MediaType, id);

  if (!media) {
    return { title: "Title Not Found" };
  }

  const title = media.title || media.name || "Movie";
  return {
    title: `${title} (${formatYear(media.release_date || media.first_air_date)}) - ProMovies`,
    description: media.overview,
    openGraph: {
      title,
      description: media.overview,
      images: [getTMDBImageUrl(media.backdrop_path || media.poster_path, "w1280")],
    },
  };
}

export default async function TitleDetailPage({ params, searchParams }: TitlePageProps) {
  const { type, id } = await params;
  const search = searchParams ? await searchParams : {};
  const startSeconds = search.t ? Number(search.t) : undefined;
  const initialSeason = search.s ? Number(search.s) : undefined;
  const initialEpisode = search.e ? Number(search.e) : undefined;

  const media = await getMediaDetails(type as MediaType, id);

  if (!media) {
    notFound();
  }

  const title = media.title || media.name || "Untitled";
  const year = formatYear(media.release_date || media.first_air_date);
  const score = formatScore(media.vote_average);
  const numericScore = media.vote_average || 8.0;
  const starCount = Math.min(5, Math.max(1, Math.round(numericScore / 2)));

  const theme = getMovieTheme(title, media.genre_ids || []);

  const portraitUrl = getTMDBImageUrl(
    media.poster_path || media.backdrop_path,
    "original"
  );
  const backdropUrl = getTMDBImageUrl(
    media.backdrop_path || media.poster_path,
    "original"
  );
  const trailerVideo =
    media.videos?.results?.find(
      (v) => v.type === "Trailer" || v.site === "YouTube"
    ) || media.videos?.results?.[0];
  const providers = media["watch/providers"]?.results?.US;

  const movieClips = (media.videos?.results || [])
    .filter((v) => v.site === "YouTube")
    .slice(0, 3);

  const genresList =
    media.genres?.map((g) => g.name).join(", ") || "Action, Adventure, Drama";

  const runtimeString = media.runtime
    ? formatRuntime(media.runtime)
    : media.number_of_seasons
    ? `${media.number_of_seasons} Seasons`
    : "2h 15m";

  return (
    <div className="min-h-screen bg-[#070a0d] text-slate-100 pb-20 selection:bg-red-600 selection:text-white">
      {/* Top Ambient Showcase Container */}
      <div className="relative w-full overflow-hidden border-b border-white/10">
        {/* Dynamic Ambient Background matching cover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <Image
            src={backdropUrl}
            alt=""
            fill
            unoptimized
            priority
            className="object-cover scale-110 opacity-25"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.fogColor}`} />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Top Navbar */}
        <header className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Browse</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-semibold tracking-wide text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/movies" className="hover:text-white transition-colors">
              Movies
            </Link>
            <Link href="/shows" className="hover:text-white transition-colors">
              Shows
            </Link>
            <Link href="/new-and-popular" className="hover:text-white transition-colors">
              Discover
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <AddToListButton media={media} variant="icon" />
          </div>
        </header>

        {/* Signature DUNE Hero Showcase */}
        <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px]">
          {/* Left Column: Cover / Character Portrait Bleed */}
          <div className="relative lg:col-span-6 h-80 sm:h-[450px] lg:h-full w-full overflow-hidden select-none">
            <Image
              src={portraitUrl}
              alt={title}
              fill
              unoptimized
              priority
              className="object-cover object-top lg:object-center transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradient Masks */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent lg:via-[#070a0d]/40 to-[#070a0d]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a0d] via-[#070a0d]/30 lg:via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#070a0d]/60 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Right Column: Hero Content */}
          <div className="relative lg:col-span-6 p-6 sm:p-10 lg:pl-4 lg:pr-8 flex flex-col justify-between gap-6 z-10">
            <div className="flex flex-col gap-3.5">
              {/* Massive Bold Title */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-wider uppercase font-sans leading-none drop-shadow-md">
                {title}
              </h1>

              {/* Genre & Year */}
              <div className="text-xs sm:text-sm font-semibold tracking-wide text-slate-300/85">
                {genresList} · {year}
              </div>

              {/* Overview Synopsis */}
              <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-4 font-normal pt-1">
                {media.overview}
              </p>

              {/* Star Rating & Runtime */}
              <div className="flex items-center gap-3 pt-2 text-xs sm:text-sm font-semibold text-slate-300">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < starCount ? "fill-amber-400 text-amber-400" : "text-slate-600"
                      }`}
                    />
                  ))}
                </div>
                <span>{score}</span>
                <span className="text-white/20">|</span>
                <span>{runtimeString}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#stream-player"
                  className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 ${theme.buttonBg}`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play now</span>
                </a>

                {trailerVideo && (
                  <a
                    href="#trailer-section"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 hover:border-white/70 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all duration-300 cursor-pointer shadow-md"
                  >
                    <Film className="w-4 h-4" />
                    <span>Watch trailer</span>
                  </a>
                )}
              </div>
            </div>

            {/* Movie clips / Episodes Section */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold tracking-wider text-slate-200 uppercase font-mono">
                  {media.media_type === "tv" ? "Episodes & Clips" : "Movie clips"}
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  {movieClips.length > 0 ? "Official Clips" : "Previews"}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {movieClips.length > 0
                  ? movieClips.map((clip, idx) => {
                      const thumbUrl = `https://img.youtube.com/vi/${clip.key}/mqdefault.jpg`;
                      const numStr = String(idx + 1).padStart(2, "0");

                      return (
                        <a
                          key={clip.id || idx}
                          href="#trailer-section"
                          className="group flex items-center justify-between gap-4 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative aspect-video w-28 sm:w-36 rounded-lg overflow-hidden bg-black/60 shrink-0">
                              <Image
                                src={thumbUrl}
                                alt={clip.name}
                                fill
                                unoptimized
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div className="w-7 h-7 rounded-full bg-white/40 group-hover:bg-blue-600 text-white flex items-center justify-center shadow-md transition-colors">
                                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[11px] font-bold text-blue-400 font-mono">
                                {clip.type || "Clip"}
                              </span>
                              <h4 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                                {clip.name}
                              </h4>
                            </div>
                          </div>
                          <span className="text-base sm:text-lg font-light text-slate-400/80 font-mono tracking-wider pr-2">
                            {numStr}
                          </span>
                        </a>
                      );
                    })
                  : [
                      { title: "Official Teaser", num: "01" },
                      { title: "Main Trailer", num: "02" },
                    ].map((item, idx) => (
                      <a
                        key={idx}
                        href="#stream-player"
                        className="group flex items-center justify-between gap-4 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative aspect-video w-28 sm:w-36 rounded-lg overflow-hidden bg-black/60 shrink-0">
                            <Image
                              src={backdropUrl}
                              alt={item.title}
                              fill
                              unoptimized
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <div className="w-7 h-7 rounded-full bg-white/40 group-hover:bg-blue-600 text-white flex items-center justify-center shadow-md transition-colors">
                                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                              {item.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Full HD Preview
                            </span>
                          </div>
                        </div>
                        <span className="text-base sm:text-lg font-light text-slate-400/80 font-mono tracking-wider pr-2">
                          {item.num}
                        </span>
                      </a>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Streaming Player & Details Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col gap-14">
        {/* Streaming Player Anchor */}
        <div id="stream-player" className="flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Stream Online ({media.media_type === "tv" ? "TV Series" : "Movie"})
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Select server below for instant 4K playback
            </span>
          </div>

          <StreamingPlayer
            tmdbId={media.id}
            mediaType={type as MediaType}
            title={title}
            backdropPath={media.backdrop_path}
            seasons={media.seasons}
            initialSeason={initialSeason}
            initialEpisode={initialEpisode}
            initialStartTime={startSeconds}
            runtime={media.runtime}
            autoPlay={Boolean(startSeconds && startSeconds > 0)}
          />
        </div>

        {/* TV Episodes Section (if TV) */}
        {media.media_type === "tv" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5">
            <EpisodeList
              seasons={media.seasons}
              tmdbId={media.id}
              mediaType="tv"
              backdropPath={media.backdrop_path}
            />
          </div>
        )}

        {/* Official Trailer Section */}
        {trailerVideo && (
          <div id="trailer-section" className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-red-500" />
              <span>Official Trailer: {trailerVideo.name || title}</span>
            </h2>
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailerVideo.key}?rel=0&modestbranding=1`}
                title={`${title} Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay *; clipboard-write; encrypted-media *; gyroscope; picture-in-picture *; web-share *; fullscreen *"
                allowFullScreen={true}
                {...({
                  webkitallowfullscreen: "true",
                  mozallowfullscreen: "true",
                } as any)}
              />
            </div>
          </div>
        )}

        {/* Cast & Crew */}
        {media.credits?.cast && media.credits.cast.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>Top Billed Cast</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {media.credits.cast.slice(0, 6).map((actor) => (
                <div
                  key={actor.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5"
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-800 shrink-0">
                    <Image
                      src={getTMDBImageUrl(actor.profile_path, "w300")}
                      alt={actor.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{actor.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Streaming Providers */}
        {providers?.flatrate && providers.flatrate.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-emerald-400" />
              <span>Streaming Services (US)</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {providers.flatrate.map((prov) => (
                <div
                  key={prov.provider_id}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5"
                >
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-black shrink-0">
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${prov.logo_path}`}
                      alt={prov.provider_name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{prov.provider_name}</p>
                    <span className="text-[10px] text-emerald-400 font-medium">Included with Plan</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
