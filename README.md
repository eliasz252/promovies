# ProMovies Discovery Web App 🎬

ProMovies is a cinema-grade responsive Movie & TV discovery web application built with **Next.js 15 (App Router)**, **TypeScript**, custom **Tailwind CSS**, and a dedicated multi-tier animation architecture (**Framer Motion**, **GSAP + ScrollTrigger**, and **Anime.js**).

---

## 🚀 Key Features

1. **Who's Watching? Multi-Profile Architecture**:
   - 4 customizable avatar profiles including a dedicated **Kids** profile.
   - Kids profile automatically filters horror, violence, and adult-rated content.
   - Separate **My List** and **Continue Watching** stores per profile using Zustand + localStorage.

2. **Cinematic Hero Experience**:
   - GSAP timeline intro (backdrop zoom-out, title split-line reveal, badges & CTA fade-up).
   - Parallax effect on scroll via ScrollTrigger.
   - Interactive rotating featured thumbnails.

3. **Curated Discovery Carousels**:
   - Continue Watching with real-time percentage progress bar and remaining time calculation.
   - Trending Movies & TV Series.
   - **Today's Top 10** featuring custom giant numbered cards with **Anime.js SVG stroke drawing & count-up animations**.
   - Dedicated Anime & World Cinema rows.

4. **Multi-Tab Title Detail Modal & Standalone Fallback**:
   - Seamless intercepted route (`@modal/(.)title/[type]/[id]`) with Framer Motion shared layout animation.
   - Full standalone page fallback (`/title/[type]/[id]`) for direct URL access or refresh with dynamic SEO metadata.
   - Embedded YouTube trailer players.
   - Season & episode selector with thumbnails and runtime.
   - "Where to Watch" legal streaming provider integration (Netflix, Max, Prime, Disney+, Apple TV).
   - Interactive 5-star rating with Anime.js bounce.
   - Built-in "Report an Issue" modal posting to `/api/report`.

5. **Instant Live Search & Categories Mega-Menu**:
   - Debounced search across titles, cast, directors, and genres.
   - Category mega-menu for rapid navigation by Genre and World Cinema (Korean, Japanese, French, Spanish, etc.).

6. **Out-of-the-Box Fallback Data**:
   - Works immediately with high-definition posters, backdrops, real trailers, cast, and streaming providers even without a TMDB API key.
   - Adding a real `TMDB_API_KEY` in `.env.local` instantly activates live TMDB data fetching with ISR caching.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS (custom dark tokens: background `#0b0b0f`, surface `#14141e`, accent `#7c3aed`)
- **Animations**:
  - **Framer Motion (`motion`)**: Page transitions, modal transitions, profile picker stagger, tab indicator sliding.
  - **GSAP (`gsap` + `ScrollTrigger`)**: Hero intro timeline, parallax, carousel row scroll-reveals.
  - **Anime.js (`animejs`)**: 3D poster tilt micro-interactions, Top 10 SVG numeral stroke animations, rating star bounce, brand logo path animation.
- **State Management**: Zustand persisted to `localStorage`
- **Icons**: Lucide React

---

## 📦 Setup & Running Locally

### Prerequisites
- Node.js 18+ installed on your system.

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(Optional: Provide your free TMDB API key from https://www.themoviedb.org/settings/api. If left blank, the app functions completely with its built-in catalog).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```
