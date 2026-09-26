import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ProMovies Discovery Web App",
    short_name: "ProMovies",
    description: "Cinema-grade responsive movie and TV discovery web application.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0f",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
