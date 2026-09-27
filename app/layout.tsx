import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AppMainWrapper from "@/components/layout/AppMainWrapper";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { AdSocialBar1, AdSocialBar2 } from "@/components/ads/AdUnit";

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "ProMovies - Cinema-Grade Movie & TV Discovery",
    template: "%s | ProMovies",
  },
  description:
    "Discover trending 4K HDR movies, popular TV series, anime, trailers, and where to stream them legally across your favorite platforms.",
  keywords: ["movies", "tv shows", "streaming", "anime", "trailers", "watch online", "4k cinema", "tmdb"],
  authors: [{ name: "ProMovies Studio" }],
  openGraph: {
    title: "ProMovies - Cinema-Grade Movie & TV Discovery",
    description: "Explore trending movies, series, anime, trailers, and personal watchlists.",
    type: "website",
    siteName: "ProMovies",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark antialiased">
      <body className="min-h-screen flex flex-col bg-[#0b0b0f] text-slate-100 selection:bg-violet-600 selection:text-white">
        <Navbar />
        <AppMainWrapper>{children}</AppMainWrapper>
        {modal}
        <Footer />
        <MobileNav />
        {/* Adsterra Social Bar Ads — sticky, site-wide */}
        <AdSocialBar1 />
        <AdSocialBar2 />
      </body>
    </html>
  );
}
