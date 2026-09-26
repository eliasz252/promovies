import { MetadataRoute } from "next";
import { MOCK_MEDIA_ITEMS, GENRES_LIST } from "@/lib/tmdb/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://promovies.app";

  const staticRoutes = [
    "",
    "/movies",
    "/shows",
    "/anime",
    "/new-and-popular",
    "/my-list",
    "/search",
    "/profiles",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const genreRoutes = GENRES_LIST.map((genre) => ({
    url: `${baseUrl}/genre/${genre.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const mediaRoutes = MOCK_MEDIA_ITEMS.map((item) => ({
    url: `${baseUrl}/title/${item.media_type}/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...genreRoutes, ...mediaRoutes];
}
