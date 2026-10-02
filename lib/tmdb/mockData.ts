import { Genre, MediaItem } from "@/types/tmdb";
import { NETOUT_IMPORTED_MOVIES } from "./netoutMovies";
import { NETOUT_IMPORTED_CATALOG } from "./netoutCatalog";

export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const GENRES_LIST: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
  { id: 10759, name: "Action & Adventure" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
];

const RAW_MOCK_MEDIA_ITEMS: MediaItem[] = [
  // --- CURATED LIVE HIT HEADLINERS (TOP FEATURED & TRENDING WORLDWIDE) ---
  {
    id: 108978,
    title: "Reacher",
    name: "Reacher",
    overview:
      "Jack Reacher, a veteran military police investigator, has just recently entered civilian life. Reacher is a drifter, carrying no phone and the barest of essentials as he travels the country and explores the nation he once served.",
    poster_path: "/f1VCQIG2iCyOookdgOzwtUpwWC0.jpg",
    backdrop_path: "/pF0qkRsrHkdYadPWY9AMeFZfcwk.jpg",
    logo_path: "/2YkCVT6opPxKh2ogEqxVrCiFgsr.png",
    media_type: "tv",
    genre_ids: [10759, 80],
    genres: [
      { id: 10759, name: "Action & Adventure" },
      { id: 80, name: "Crime" },
    ],
    release_date: "2022-02-03",
    first_air_date: "2022-02-03",
    vote_average: 8.1,
    vote_count: 3200,
    popularity: 4200.0,
    quality_badge: "4K UHD",
    age_rating: "TV-MA",
  },
  {
    id: 969681,
    title: "Spider-Man: Brand New Day",
    overview:
      "Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control.",
    poster_path: "/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
    backdrop_path: "/qeQJx07rK2xm8SD2sJxFKhE7gs0.jpg",
    logo_path: "/vbZcDHC5IFylYuRnp3eyOs5rTV1.png",
    media_type: "movie",
    genre_ids: [28, 12, 878],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Sci-Fi" },
    ],
    release_date: "2026-07-24",
    vote_average: 7.9,
    vote_count: 4890,
    popularity: 5500.0,
    quality_badge: "4K UHD",
    age_rating: "PG-13",
  },
  {
    id: 113962,
    title: "Lioness",
    name: "Lioness",
    overview:
      "Cruz Manuelos, a rough-around-the-edges but passionate young Marine, is recruited to join the CIA's Lioness Engagement Team to help bring down a terrorist organization from within.",
    poster_path: "/rzpHPSEgPTpRs8EHbygwsOw7jC0.jpg",
    backdrop_path: "/mU7l9UaEItxHbg2YBNs0sHjoFVY.jpg",
    logo_path: "/xCXmYvX8UwggLh0h3I1A1fbHBxI.png",
    media_type: "tv",
    genre_ids: [18, 10768],
    genres: [
      { id: 18, name: "Drama" },
      { id: 10768, name: "War & Politics" },
    ],
    release_date: "2023-07-23",
    first_air_date: "2023-07-23",
    vote_average: 8.2,
    vote_count: 2450,
    popularity: 3820.0,
    quality_badge: "4K UHD",
    age_rating: "TV-MA",
  },
  // --- 2026 LATEST HIT HEADLINERS (TRENDING WORLDWIDE) ---
  {
    id: 1248832,
    title: "Digger",
    overview:
      "The most powerful man in the world embarks on a frantic mission to prove he is humanity's savior before the disaster he's unleashed destroys everything.",
    poster_path: "/1ATXKrIPJyKNwnJ6lcG088Sa6zi.jpg",
    backdrop_path: "/b7t3r39Oll5qPxBKzLZ8eHMBD7l.jpg",
    media_type: "movie",
    genre_ids: [35, 18],
    genres: [
      { id: 35, name: "Comedy" },
      { id: 18, name: "Drama" },
    ],
    release_date: "2026-09-28",
    vote_average: 7.7,
    vote_count: 1450,
    popularity: 5800.0,
    quality_badge: "4K UHD",
    age_rating: "PG-13",
  },
  {
    id: 1283515,
    title: "Verity",
    overview:
      "Lowen Ashleigh is hired by Jeremy Crawford to ghostwrite novels for his bestselling author wife Verity, who is unable to finish following an accident. Lowen gradually uncovers Verity's disturbing truths while residing at the Crawfords' home to work.",
    poster_path: "/dGSsPovyUW5XVekXcy7F2GyhTEh.jpg",
    backdrop_path: "/9qxyrJfjk577ym5WD6HCDmunoyO.jpg",
    media_type: "movie",
    genre_ids: [9648, 53],
    genres: [
      { id: 9648, name: "Mystery" },
      { id: 53, name: "Thriller" },
    ],
    release_date: "2026-09-30",
    vote_average: 6.9,
    vote_count: 1100,
    popularity: 5200.0,
    quality_badge: "4K UHD",
    age_rating: "R",
  },
  {
    id: 977942,
    title: "The Uprising",
    overview:
      "As war and plague devastate 14th-century England, a humble peasant ignites a rebellion, uniting an army of commoners to defy the King’s might in a desperate fight for justice and survival.",
    poster_path: "/7TUl15TOsIvndKlgMWTtLgtEzZP.jpg",
    backdrop_path: "/y0reRTsewsPh0ePtgvDeLIsb5Wk.jpg",
    media_type: "movie",
    genre_ids: [36, 18, 28],
    genres: [
      { id: 36, name: "History" },
      { id: 18, name: "Drama" },
      { id: 28, name: "Action" },
    ],
    release_date: "2026-09-10",
    vote_average: 8.1,
    vote_count: 2150,
    popularity: 4950.0,
    quality_badge: "4K UHD",
    age_rating: "R",
  },
  {
    id: 1599191,
    title: "Renegade Immortal: Battle of the Immortal Slayer",
    overview:
      "Trapped in a fatal pursuit within the Celestial Realm of Thunder, Wang Lin faces his ultimate crisis. Watch the underdog defy the odds, flip the script in a world-shaking counterattack, and achieve the ultimate, magnificent feat: SLAYING A CELESTIAL.",
    poster_path: "/cpgLuRAT8SW7YiZaBYUGZ43GiLL.jpg",
    backdrop_path: "/rJT7ARv4G2sr1uTZnBEUSigg1hf.jpg",
    media_type: "movie",
    genre_ids: [16, 28, 12, 14],
    genres: [
      { id: 16, name: "Animation" },
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 14, name: "Fantasy" },
    ],
    release_date: "2026-10-01",
    vote_average: 7.8,
    vote_count: 1890,
    popularity: 6100.0,
    quality_badge: "4K UHD",
    age_rating: "PG-13",
  },
  {
    id: 1377237,
    title: "Runner",
    overview:
      "A former soldier is thrown into a brutal race against time when a critical medical delivery makes him and his unlikely partner the targets of a ruthless cartel. As the mission spirals into a deadly manhunt, every detour, delay, and bullet pushes them closer to failure. With betrayal closing in from every side, they must survive the chase and deliver their cargo to save the life of a little girl.",
    poster_path: "/yBKMAIj7clP42UkFejhGDBBoTpb.jpg",
    backdrop_path: "/2c9zNZJL0ZdagD6JbmU3hH4hovs.jpg",
    logo_path: "/pAnbApoi6DHwXzoKBfQU4M5Wr8t.png",
    media_type: "movie",
    genre_ids: [28, 35],
    genres: [
      { id: 28, name: "Action" },
      { id: 35, name: "Comedy" },
    ],
    release_date: "2026-09-07",
    vote_average: 8.3,
    vote_count: 2780,
    popularity: 5700.0,
    quality_badge: "4K UHD",
    age_rating: "PG-13",
  },
  {
    id: 1307118,
    title: "Soulm8te",
    overview:
      "After a ruthless tech giant acquires a small robotics company, a grieving engineer is tasked with testing their new AI companion. But when he attempts to reprogram her to be a truly sentient soulmate, she develops needs of her own—unleashing a relentless spree of precision-engineered mayhem.",
    poster_path: "/bNErActDctl6cdUGw9pnjSCmyhQ.jpg",
    backdrop_path: "/7t6f6VxA2ZXbbZSVctgt7bZG2DI.jpg",
    media_type: "movie",
    genre_ids: [27, 878, 53],
    genres: [
      { id: 27, name: "Horror" },
      { id: 878, name: "Sci-Fi" },
      { id: 53, name: "Thriller" },
    ],
    release_date: "2026-07-31",
    vote_average: 7.4,
    vote_count: 1650,
    popularity: 4300.0,
    quality_badge: "4K UHD",
    age_rating: "R",
  },
  {
    id: 1492640,
    title: "UNABOMBER",
    overview:
      "Follow Ted Kaczynski's transformation from Harvard prodigy into the infamous Unabomber. Subjected to controversial psychological experiments by Professor Henry Murray, Kaczynski's troubled past resurfaces decades later when his manhunt, led by FBI agent Joanne Miller, brings to light the chilling consequences of ambition and isolation.",
    poster_path: "/39aMkR8Y5vhCG9dTkjiqRl8AVqp.jpg",
    backdrop_path: "/58D9nalUYW5L5K0guw7hcpsEJBH.jpg",
    media_type: "movie",
    genre_ids: [53, 18, 80],
    genres: [
      { id: 53, name: "Thriller" },
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" },
    ],
    release_date: "2026-09-25",
    vote_average: 6.7,
    vote_count: 1250,
    popularity: 4100.0,
    quality_badge: "4K UHD",
    age_rating: "R",
  },
  {
    id: 1294819,
    title: "The End of Oak Street",
    overview:
      "When a bizarre atmospheric anomaly descends on a quiet suburban neighborhood, the residents of Oak Street must confront terrifying secrets before daylight disappears forever.",
    poster_path: "/fYXqpgPmHMphSF2W30GbTeJVIa5.jpg",
    backdrop_path: "/fYXqpgPmHMphSF2W30GbTeJVIa5.jpg",
    media_type: "movie",
    genre_ids: [9648, 53, 18],
    genres: [
      { id: 9648, name: "Mystery" },
      { id: 53, name: "Thriller" },
      { id: 18, name: "Drama" },
    ],
    release_date: "2026-08-14",
    vote_average: 7.0,
    vote_count: 2150,
    popularity: 2940.2,
    tagline: "Don't go into the fog.",
    runtime: 108,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
  },
  {
    id: 1423191,
    title: "Resident Evil",
    overview:
      "Medical courier Bryan unwittingly finds himself fighting for survival as one fateful, horrifying night collapses around him in chaos.",
    poster_path: "/qku2uWSoJ9amQV5MWo1Eek29iji.jpg",
    backdrop_path: "/3icyRAqgakNcQn6aDVz9libFmBA.jpg",
    media_type: "movie",
    genre_ids: [27, 28, 53],
    genres: [
      { id: 27, name: "Horror" },
      { id: 28, name: "Action" },
      { id: 53, name: "Thriller" },
    ],
    release_date: "2026-09-18",
    vote_average: 7.4,
    vote_count: 3420,
    popularity: 5200.0,
    tagline: "Survival is not guaranteed.",
    runtime: 114,
    age_rating: "R",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 101, name: "Austin Abrams", character: "Bryan", profile_path: null },
        { id: 102, name: "Paul Walter Hauser", character: "Duke", profile_path: null },
        { id: 103, name: "Zach Cherry", character: "Marcus", profile_path: null },
        { id: 104, name: "Kali Reis", character: "Captain Vance", profile_path: null },
      ],
      crew: [{ id: 201, name: "Zach Cregger", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_re2026", key: "73_1biulkYk", name: "Official Teaser", site: "YouTube", type: "Trailer", official: true }],
    },
  },
  {
    id: 969681,
    title: "Spider-Man: Brand New Day",
    overview:
      "Stripped of his identity and separated from everyone he loved, Peter Parker navigates the shadows of New York as a street-level vigilante, confronting a shadowy criminal syndicate threatening the city.",
    poster_path: "/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
    backdrop_path: "/jenQoCLJ4FEfFGZS13op91jlxjy.jpg",
    media_type: "movie",
    genre_ids: [28, 12, 878],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Sci-Fi" },
    ],
    release_date: "2026-07-24",
    vote_average: 7.9,
    vote_count: 4890,
    popularity: 3510.4,
    tagline: "A new beginning in the shadows.",
    runtime: 135,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
  },
  {
    id: 757860,
    title: "Coyote vs. Acme",
    overview:
      "After all of the ACME Corporation's products fail him in his pursuit of the Road Runner, Wile E. Coyote hires a down-on-his-luck human billboard attorney to take the manufacturing giant to court.",
    poster_path: "/AbQYEHieBJsMheLFKM02rFu0xnc.jpg",
    backdrop_path: "/AbQYEHieBJsMheLFKM02rFu0xnc.jpg",
    media_type: "movie",
    genre_ids: [35, 16, 10751],
    genres: [
      { id: 35, name: "Comedy" },
      { id: 16, name: "Animation" },
      { id: 10751, name: "Family" },
    ],
    release_date: "2026-08-01",
    vote_average: 7.6,
    vote_count: 2780,
    popularity: 2820.0,
    tagline: "He's had enough of ACME.",
    runtime: 98,
    age_rating: "PG",
    quality_badge: "4K UHD",
  },
  {
    id: 558449,
    title: "Gladiator II",
    overview:
      "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius must enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist. With rage in his heart and the future of the Empire at stake, Lucius must look to his past to find strength and honor to return the glory of Rome to its people.",
    poster_path: "/b5UXjzW5cLZhprMnlAmsVAA3G4t.jpg",
    backdrop_path: "/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg",
    media_type: "movie",
    genre_ids: [28, 12, 18],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
    ],
    release_date: "2024-11-22",
    vote_average: 8.0,
    vote_count: 3650,
    popularity: 3120.0,
    tagline: "What we do in life echoes in eternity.",
    runtime: 148,
    age_rating: "R",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 2577782, name: "Paul Mescal", character: "Lucius Verus", profile_path: null },
        { id: 5292, name: "Denzel Washington", character: "Macrinus", profile_path: null },
        { id: 1253360, name: "Pedro Pascal", character: "Marcus Acacius", profile_path: null },
        { id: 934, name: "Connie Nielsen", character: "Lucilla", profile_path: null },
        { id: 2038, name: "Joseph Quinn", character: "Emperor Geta", profile_path: null },
      ],
      crew: [{ id: 578, name: "Ridley Scott", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_glad2", key: "4rgYUipGJNo", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
  },
  // --- 2024-2026 LATEST BLOCKBUSTERS (HEADLINERS) ---
  {
    id: 533535,
    title: "Deadpool & Wolverine",
    overview:
      "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop_path: "/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
    media_type: "movie",
    genre_ids: [28, 35, 878],
    genres: [
      { id: 28, name: "Action" },
      { id: 35, name: "Comedy" },
      { id: 878, name: "Sci-Fi" },
    ],
    release_date: "2024-07-26",
    vote_average: 7.7,
    vote_count: 5920,
    popularity: 2850.5,
    tagline: "Everyone deserves a happy ending.",
    runtime: 128,
    age_rating: "R",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 10859, name: "Ryan Reynolds", character: "Wade Wilson / Deadpool", profile_path: "/4SYTH5FRAxWh29dj22daM82fq0q.jpg" },
        { id: 6968, name: "Hugh Jackman", character: "Logan / Wolverine", profile_path: "/4exSbLbR2mUF718b5g3mG2X9m3s.jpg" },
        { id: 2267679, name: "Emma Corrin", character: "Cassandra Nova", profile_path: "/53C2zV6g9l3lO2j4m3Q1a2s4d5f.jpg" },
        { id: 147573, name: "Matthew Macfadyen", character: "Mr. Paradox", profile_path: "/9Wv6x4l2o5f8b9p1k2j3m4n5o6p.jpg" },
        { id: 1373737, name: "Dafne Keen", character: "Laura / X-23", profile_path: "/2qpeQe51X57o4uL77Ew5hQZ3y9m.jpg" },
      ],
      crew: [{ id: 17825, name: "Shawn Levy", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_dp3", key: "73_1biulkYk", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 337, provider_name: "Disney+", logo_path: null }],
          rent: [{ provider_id: 2, provider_name: "Apple TV", logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg" }],
        },
      },
    },
  },
  {
    id: 1184918,
    title: "The Wild Robot",
    overview:
      "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose, discovering the transformative power of love, connection, and family.",
    poster_path: "/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
    backdrop_path: "/1pmXyN3sKeYoUhu5VBZiDU4BX21.jpg",
    media_type: "movie",
    genre_ids: [16, 878, 10751, 12],
    genres: [
      { id: 16, name: "Animation" },
      { id: 878, name: "Sci-Fi" },
      { id: 10751, name: "Family" },
      { id: 12, name: "Adventure" },
    ],
    release_date: "2024-09-27",
    vote_average: 8.4,
    vote_count: 3820,
    popularity: 2210.4,
    tagline: "Discover your true nature.",
    runtime: 102,
    age_rating: "PG",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1267329, name: "Lupita Nyong'o", character: "Roz (voice)", profile_path: null },
        { id: 1253360, name: "Pedro Pascal", character: "Fink (voice)", profile_path: null },
        { id: 2226905, name: "Kit Connor", character: "Brightbill (voice)", profile_path: null },
        { id: 380, name: "Bill Nighy", character: "Longneck (voice)", profile_path: null },
      ],
      crew: [{ id: 66193, name: "Chris Sanders", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_wild", key: "67vbA5ZJb3E", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 386, provider_name: "Peacock", logo_path: null }],
          rent: [{ provider_id: 9, provider_name: "Amazon Video", logo_path: "/emthp39XA2jdvAqflZAEOWAc6on.jpg" }],
        },
      },
    },
  },
  {
    id: 402431,
    title: "Wicked",
    overview:
      "Elphaba, an ostracized but fiery girl born with green skin, and Glinda, a privileged and aristocratic young girl with an ambition for popularity, meet as students at Shiz University in the land of Oz and forge an unlikely but profound friendship.",
    poster_path: "/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg",
    backdrop_path: "/w22GVYotTIVC1dUd58mRhwPqiS.jpg",
    media_type: "movie",
    genre_ids: [14, 18, 10402],
    genres: [
      { id: 14, name: "Fantasy" },
      { id: 18, name: "Drama" },
      { id: 10402, name: "Music" },
    ],
    release_date: "2024-11-22",
    vote_average: 7.6,
    vote_count: 1940,
    popularity: 2310.8,
    tagline: "Everyone deserves the chance to fly.",
    runtime: 160,
    age_rating: "PG",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1530064, name: "Cynthia Erivo", character: "Elphaba Thropp", profile_path: null },
        { id: 1144197, name: "Ariana Grande", character: "Glinda Upland", profile_path: null },
        { id: 1368142, name: "Jonathan Bailey", character: "Fiyero Tigelaar", profile_path: null },
        { id: 4783, name: "Jeff Goldblum", character: "The Wonderful Wizard of Oz", profile_path: null },
      ],
      crew: [{ id: 83854, name: "Jon M. Chu", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_wicked", key: "6COmYeLsz4c", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 386, provider_name: "Peacock", logo_path: null }],
          rent: [{ provider_id: 2, provider_name: "Apple TV", logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg" }],
        },
      },
    },
  },
  {
    id: 438631,
    title: "Dune",
    overview:
      "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence, only those who can conquer their fear will survive.",
    poster_path: "/v1tRXZ4JtD2Iv6fjkPvT4GiwslV.jpg",
    backdrop_path: "/zRKQW58MBEY078AxkHxEJzUskCl.jpg",
    media_type: "movie",
    genre_ids: [878, 12, 18],
    genres: [
      { id: 878, name: "Sci-Fi" },
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
    ],
    release_date: "2021-09-15",
    vote_average: 8.2,
    vote_count: 11450,
    popularity: 2450.0,
    tagline: "It begins.",
    runtime: 155,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1190668, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: null },
        { id: 505710, name: "Zendaya", character: "Chani", profile_path: null },
        { id: 932, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: null },
        { id: 16828, name: "Oscar Isaac", character: "Duke Leto Atreides", profile_path: null },
      ],
      crew: [{ id: 137427, name: "Denis Villeneuve", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [
        { id: "v_dune1", key: "8g18jFHCLXk", name: "Official Main Trailer", site: "YouTube", type: "Trailer", official: true },
        { id: "v_dune2", key: "n9xhJrPXop4", name: "Special Teaser", site: "YouTube", type: "Teaser", official: true },
      ],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [
            { provider_id: 1899, provider_name: "Max", logo_path: null },
            { provider_id: 9, provider_name: "Amazon Prime Video", logo_path: null },
          ],
        },
      },
    },
  },
  {
    id: 693134,
    title: "Dune: Part Two",
    overview:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future.",
    poster_path: "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    backdrop_path: "/w22GVYotTIVC1dUd58mRhwPqiS.jpg",
    media_type: "movie",
    genre_ids: [878, 12, 18],
    genres: [
      { id: 878, name: "Sci-Fi" },
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
    ],
    release_date: "2024-02-27",
    vote_average: 8.6,
    vote_count: 5420,
    popularity: 2180.5,
    tagline: "Long live the fighters.",
    runtime: 166,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1190668, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: "/BE2sdjpgsa2rNTFa66f7upkaOP.jpg" },
        { id: 505710, name: "Zendaya", character: "Chani", profile_path: "/tyA1k6693iHQ8m0P10G0UeX6qU4.jpg" },
        { id: 932, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: "/6NRubqiqffZ7mD21Z5mXqL1M8gK.jpg" },
        { id: 1373737, name: "Florence Pugh", character: "Princess Irulan", profile_path: "/2qpeQe51X57o4uL77Ew5hQZ3y9m.jpg" },
        { id: 135651, name: "Austin Butler", character: "Feyd-Rautha", profile_path: "/oSw9t2M92r9oA7x8sOqB8e6D2nN.jpg" },
      ],
      crew: [{ id: 137427, name: "Denis Villeneuve", job: "Director", department: "Directing", profile_path: "/vdctb8iB81P81t4aB71kL5n0.jpg" }],
    },
    videos: {
      results: [{ id: "v1", key: "Way9Dexny3w", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [
            { provider_id: 1899, provider_name: "Max", logo_path: "/6O9Nl7g9o8e2t2A6l8gB3k7j4d.jpg" },
            { provider_id: 9, provider_name: "Amazon Prime Video", logo_path: "/emthp39XA2jdvAqflZAEOWAc6on.jpg" },
          ],
          rent: [{ provider_id: 2, provider_name: "Apple TV", logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg" }],
        },
      },
    },
  },
  {
    id: 1022789,
    title: "Inside Out 2",
    overview:
      "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for unexpected new Emotions: Anxiety, Envy, Ennui, and Embarrassment. Joy and her crew must navigate this whirlwind adolescent era.",
    poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    backdrop_path: "/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg",
    media_type: "movie",
    genre_ids: [16, 10751, 12, 35],
    genres: [
      { id: 16, name: "Animation" },
      { id: 10751, name: "Family" },
      { id: 12, name: "Adventure" },
      { id: 35, name: "Comedy" },
    ],
    release_date: "2024-06-14",
    vote_average: 7.8,
    vote_count: 5120,
    popularity: 2150.0,
    tagline: "Make room for new emotions.",
    runtime: 96,
    age_rating: "PG",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 41042, name: "Amy Poehler", character: "Joy (voice)", profile_path: null },
        { id: 2095644, name: "Maya Hawke", character: "Anxiety (voice)", profile_path: null },
        { id: 122827, name: "Phyllis Smith", character: "Sadness (voice)", profile_path: null },
        { id: 11107, name: "Lewis Black", character: "Anger (voice)", profile_path: null },
      ],
      crew: [{ id: 12890, name: "Kelsey Mann", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v10", key: "LEjhY15eCx0", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 337, provider_name: "Disney+", logo_path: null }],
        },
      },
    },
  },
  {
    id: 945961,
    title: "Alien: Romulus",
    overview:
      "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying and lethal life form in the universe.",
    poster_path: "/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    backdrop_path: "/iYqSQaWDttQIQzsxg9xHyg0bttG.jpg",
    media_type: "movie",
    genre_ids: [27, 878],
    genres: [
      { id: 27, name: "Horror" },
      { id: 878, name: "Sci-Fi" },
    ],
    release_date: "2024-08-16",
    vote_average: 7.3,
    vote_count: 2890,
    popularity: 2100.3,
    tagline: "In space, no one can hear you scream.",
    runtime: 119,
    age_rating: "R",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1682803, name: "Cailee Spaeny", character: "Rain Carradine", profile_path: null },
        { id: 2362033, name: "David Jonsson", character: "Andy", profile_path: null },
        { id: 2029986, name: "Archie Renaux", character: "Tyler", profile_path: null },
        { id: 2049969, name: "Isabela Merced", character: "Kay", profile_path: null },
      ],
      crew: [{ id: 83030, name: "Fede Álvarez", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_alien", key: "x0XDEhP4MQs", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 15, provider_name: "Hulu", logo_path: null }],
          rent: [{ provider_id: 2, provider_name: "Apple TV", logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg" }],
        },
      },
    },
  },
  {
    id: 917496,
    title: "Beetlejuice Beetlejuice",
    overview:
      "After an unexpected family tragedy, three generations of the Deetz family return home to Winter River. Still haunted by Beetlejuice, Lydia's life is turned upside down when her rebellious teenage daughter, Astrid, discovers the mysterious model of the town in the attic and the portal to the Afterlife is accidentally opened.",
    poster_path: "/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg",
    backdrop_path: "/kF8ljC7Y4p1UsmKBi2LxelZpqw.jpg",
    media_type: "movie",
    genre_ids: [35, 14, 27],
    genres: [
      { id: 35, name: "Comedy" },
      { id: 14, name: "Fantasy" },
      { id: 27, name: "Horror" },
    ],
    release_date: "2024-09-06",
    vote_average: 7.1,
    vote_count: 2150,
    popularity: 1890.6,
    tagline: "The juice is loose.",
    runtime: 105,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 2232, name: "Michael Keaton", character: "Betelgeuse", profile_path: null },
        { id: 2157, name: "Winona Ryder", character: "Lydia Deetz", profile_path: null },
        { id: 974169, name: "Jenna Ortega", character: "Astrid Deetz", profile_path: null },
        { id: 2233, name: "Catherine O'Hara", character: "Delia Deetz", profile_path: null },
        { id: 1370, name: "Willem Dafoe", character: "Wolf Jackson", profile_path: null },
      ],
      crew: [{ id: 510, name: "Tim Burton", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_bj2", key: "As-vKW4ZpbU", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 1899, provider_name: "Max", logo_path: "/6O9Nl7g9o8e2t2A6l8gB3k7j4d.jpg" }],
          rent: [{ provider_id: 9, provider_name: "Amazon Prime Video", logo_path: "/emthp39XA2jdvAqflZAEOWAc6on.jpg" }],
        },
      },
    },
  },
  {
    id: 426063,
    title: "Nosferatu",
    overview:
      "A gothic tale of obsession between a haunted young woman in 19th century Germany and the ancient Transylvanian vampire who stalks her, bringing untold horror in his wake.",
    poster_path: "/5qGIxdEO841C0tdY8vOdLoRVrr0.jpg",
    backdrop_path: "/gprjiZWY43vxSKngMha1wfb5TGG.jpg",
    media_type: "movie",
    genre_ids: [27, 18, 9648],
    genres: [
      { id: 27, name: "Horror" },
      { id: 18, name: "Drama" },
      { id: 9648, name: "Mystery" },
    ],
    release_date: "2024-12-25",
    vote_average: 7.4,
    vote_count: 1420,
    popularity: 1950.4,
    tagline: "He is coming.",
    runtime: 132,
    age_rating: "R",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 54695, name: "Bill Skarsgård", character: "Count Orlok", profile_path: null },
        { id: 1475731, name: "Lily-Rose Depp", character: "Ellen Hutter", profile_path: null },
        { id: 3292, name: "Nicholas Hoult", character: "Thomas Hutter", profile_path: null },
        { id: 1370, name: "Willem Dafoe", character: "Professor Albin Eberhart Von Franz", profile_path: null },
        { id: 9642, name: "Aaron Taylor-Johnson", character: "Friedrich Harding", profile_path: null },
      ],
      crew: [{ id: 1313028, name: "Robert Eggers", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_nos", key: "d_Gcx6BS3TI", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 386, provider_name: "Peacock", logo_path: null }],
          rent: [{ provider_id: 2, provider_name: "Apple TV", logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg" }],
        },
      },
    },
  },
  {
    id: 1241982,
    title: "Moana 2",
    overview:
      "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and an all-new crew to the far seas of Oceania into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
    poster_path: "/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg",
    backdrop_path: "/vYqt6kb4lcF8wwqsMMaULkP9OEn.jpg",
    media_type: "movie",
    genre_ids: [16, 12, 10751, 35],
    genres: [
      { id: 16, name: "Animation" },
      { id: 12, name: "Adventure" },
      { id: 10751, name: "Family" },
      { id: 35, name: "Comedy" },
    ],
    release_date: "2024-11-27",
    vote_average: 7.4,
    vote_count: 1400,
    popularity: 2090.0,
    tagline: "The ocean is calling her back.",
    runtime: 100,
    age_rating: "PG",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1564846, name: "Auli'i Cravalho", character: "Moana (voice)", profile_path: null },
        { id: 18918, name: "Dwayne Johnson", character: "Maui (voice)", profile_path: null },
      ],
      crew: [{ id: 1564847, name: "David G. Derrick Jr.", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v16", key: "hDZ7y8RP5HE", name: "Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 337, provider_name: "Disney+", logo_path: null }],
        },
      },
    },
  },
  {
    id: 718821,
    title: "Twisters",
    overview:
      "As storm season intensifies, the paths of former storm chaser Kate Cooper and reckless social-media superstar Tyler Owens collide when terrifying, unprecedented weather phenomena are unleashed across Oklahoma.",
    poster_path: "/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
    backdrop_path: "/58D6ZAvOKxlHjyX9S8qNKSBE9Y.jpg",
    media_type: "movie",
    genre_ids: [28, 12, 53],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 53, name: "Thriller" },
    ],
    release_date: "2024-07-19",
    vote_average: 7.0,
    vote_count: 1980,
    popularity: 1720.0,
    tagline: "If you feel it, chase it.",
    runtime: 122,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 2244443, name: "Daisy Edgar-Jones", character: "Kate Carter", profile_path: null },
        { id: 1110467, name: "Glen Powell", character: "Tyler Owens", profile_path: null },
        { id: 1475734, name: "Anthony Ramos", character: "Javi", profile_path: null },
      ],
      crew: [{ id: 13344, name: "Lee Isaac Chung", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_twist", key: "Jb8nUa8bHlE", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 386, provider_name: "Peacock", logo_path: null }],
          rent: [{ provider_id: 2, provider_name: "Apple TV", logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg" }],
        },
      },
    },
  },
  {
    id: 786892,
    title: "Furiosa: A Mad Max Saga",
    overview:
      "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland, they come across the Citadel presided over by The Immortan Joe.",
    poster_path: "/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    backdrop_path: "/raph7qjAGTMXaIjVxt6ZDSXRzUr.jpg",
    media_type: "movie",
    genre_ids: [28, 878, 12],
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Sci-Fi" },
      { id: 12, name: "Adventure" },
    ],
    release_date: "2024-05-24",
    vote_average: 7.6,
    vote_count: 3410,
    popularity: 1680.5,
    tagline: "Out of the fire she rises.",
    runtime: 148,
    age_rating: "R",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1397778, name: "Anya Taylor-Joy", character: "Furiosa", profile_path: null },
        { id: 74568, name: "Chris Hemsworth", character: "Dementus", profile_path: null },
        { id: 84433, name: "Tom Burke", character: "Praetorian Jack", profile_path: null },
      ],
      crew: [{ id: 20629, name: "George Miller", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_furiosa", key: "XJMuhwVlca4", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 1899, provider_name: "Max", logo_path: "/6O9Nl7g9o8e2t2A6l8gB3k7j4d.jpg" }],
        },
      },
    },
  },
  {
    id: 653346,
    title: "Kingdom of the Planet of the Apes",
    overview:
      "Several generations in the future following Caesar's reign, a young ape named Noa embarks on a journey that will lead him to question everything he's been taught about the past and make choices that will define a future for apes and humans alike.",
    poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    backdrop_path: "/wMEhptvj6pcp2QSzHYcl4DFA5Pz.jpg",
    media_type: "movie",
    genre_ids: [878, 12, 28],
    genres: [
      { id: 878, name: "Sci-Fi" },
      { id: 12, name: "Adventure" },
      { id: 28, name: "Action" },
    ],
    release_date: "2024-05-10",
    vote_average: 7.1,
    vote_count: 3100,
    popularity: 1640.2,
    tagline: "No one can stop the reign.",
    runtime: 145,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1586047, name: "Owen Teague", character: "Noa", profile_path: null },
        { id: 2125084, name: "Freya Allan", character: "Mae", profile_path: null },
        { id: 17328, name: "Kevin Durand", character: "Proximus Caesar", profile_path: null },
      ],
      crew: [{ id: 111303, name: "Wes Ball", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_apes", key: "XtFI7SNtVpY", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 15, provider_name: "Hulu", logo_path: null }],
        },
      },
    },
  },
  {
    id: 933260,
    title: "The Substance",
    overview:
      "A fading celebrity decides to use a black-market drug, a cell-replicating substance that temporarily creates a younger, better version of herself, with horrifying and grotesque consequences.",
    poster_path: "/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
    backdrop_path: "/wMEhptvj6pcp2QSzHYcl4DFA5Pz.jpg",
    media_type: "movie",
    genre_ids: [27, 878, 18],
    genres: [
      { id: 27, name: "Horror" },
      { id: 878, name: "Sci-Fi" },
      { id: 18, name: "Drama" },
    ],
    release_date: "2024-09-20",
    vote_average: 7.7,
    vote_count: 2200,
    popularity: 1820.7,
    tagline: "If you respect the balance, what could go wrong?",
    runtime: 140,
    age_rating: "R",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 3416, name: "Demi Moore", character: "Elisabeth Sparkle", profile_path: null },
        { id: 1356210, name: "Margaret Qualley", character: "Sue", profile_path: null },
        { id: 5882, name: "Dennis Quaid", character: "Harvey", profile_path: null },
      ],
      crew: [{ id: 1466334, name: "Coralie Fargeat", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_sub", key: "LNlrGhPdnC8", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 11, provider_name: "MUBI", logo_path: null }],
        },
      },
    },
  },
  {
    id: 762509,
    title: "Mufasa: The Lion King",
    overview:
      "Told in flashbacks, Rafiki transmits the legend of Mufasa to young lion cub Kiara, daughter of Simba and Nala, with Timon and Pumbaa lending their signature schtick. The story introduces Mufasa as an orphaned cub, lost and alone until he meets a sympathetic lion named Taka.",
    poster_path: "/jbOSUAWMGzGL1L4EaUF8K6zYFo7.jpg",
    backdrop_path: "/1w8kutrRucTd3wlYyu5QlUDMiG1.jpg",
    media_type: "movie",
    genre_ids: [12, 10751, 16],
    genres: [
      { id: 12, name: "Adventure" },
      { id: 10751, name: "Family" },
      { id: 16, name: "Animation" },
    ],
    release_date: "2024-12-20",
    vote_average: 7.2,
    vote_count: 1250,
    popularity: 1980.2,
    tagline: "A brother who would be king. A cub who would become a legend.",
    runtime: 118,
    age_rating: "PG",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 2075056, name: "Aaron Pierre", character: "Mufasa (voice)", profile_path: null },
        { id: 1544084, name: "Kelvin Harrison Jr.", character: "Taka / Scar (voice)", profile_path: null },
        { id: 19292, name: "Seth Rogen", character: "Pumbaa (voice)", profile_path: null },
        { id: 55934, name: "Billy Eichner", character: "Timon (voice)", profile_path: null },
      ],
      crew: [{ id: 13344, name: "Barry Jenkins", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_mufasa", key: "o17MF9vnabg", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 337, provider_name: "Disney+", logo_path: null }],
        },
      },
    },
  },
  {
    id: 939243,
    title: "Sonic the Hedgehog 3",
    overview:
      "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek an unlikely alliance.",
    poster_path: "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
    backdrop_path: "/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
    media_type: "movie",
    genre_ids: [28, 10751, 35, 878],
    genres: [
      { id: 28, name: "Action" },
      { id: 10751, name: "Family" },
      { id: 35, name: "Comedy" },
      { id: 878, name: "Sci-Fi" },
    ],
    release_date: "2024-12-20",
    vote_average: 7.8,
    vote_count: 1480,
    popularity: 1870.5,
    tagline: "Try to keep up.",
    runtime: 110,
    age_rating: "PG",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 17419, name: "Ben Schwartz", character: "Sonic (voice)", profile_path: null },
        { id: 206, name: "Jim Carrey", character: "Dr. Ivo Robotnik / Gerald Robotnik", profile_path: null },
        { id: 6384, name: "Keanu Reeves", character: "Shadow (voice)", profile_path: null },
        { id: 17647, name: "Idris Elba", character: "Knuckles (voice)", profile_path: null },
      ],
      crew: [{ id: 93821, name: "Jeff Fowler", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_sonic3", key: "qSu6i2iFMO0", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 531, provider_name: "Paramount+", logo_path: null }],
        },
      },
    },
  },

  // --- 2025 & 2026 FRESH AND UPCOMING PREMIERES ---
  {
    id: 822119,
    title: "Captain America: Brave New World",
    overview:
      "Sam Wilson finds himself in the middle of an international incident after meeting with newly elected U.S. President Thaddeus Ross. He must discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.",
    poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    backdrop_path: "/gvLG3Fnznkxl4SmYfcK8gUuqxM8.jpg",
    media_type: "movie",
    genre_ids: [28, 878, 12],
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Sci-Fi" },
      { id: 12, name: "Adventure" },
    ],
    release_date: "2025-02-14",
    vote_average: 7.9,
    vote_count: 1850,
    popularity: 2900.0,
    tagline: "A new era begins.",
    runtime: 118,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 53655, name: "Anthony Mackie", character: "Sam Wilson / Captain America", profile_path: null },
        { id: 3, name: "Harrison Ford", character: "President Thaddeus 'Thunderbolt' Ross / Red Hulk", profile_path: null },
        { id: 4808, name: "Giancarlo Esposito", character: "Seth Voelker / Sidewinder", profile_path: null },
        { id: 1682801, name: "Danny Ramirez", character: "Joaquin Torres / Falcon", profile_path: null },
        { id: 932, name: "Liv Tyler", character: "Betty Ross", profile_path: null },
      ],
      crew: [{ id: 1042784, name: "Julius Onah", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_cap4", key: "1pHDWnXmK7Y", name: "Official Teaser Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 337, provider_name: "Disney+", logo_path: null }],
        },
      },
    },
  },
  {
    id: 986056,
    title: "Thunderbolts*",
    overview:
      "An irreverent team-up featuring depressed assassin Yelena Belova alongside the MCU's least anticipated band of misfits, forced to execute covert operations for the American government.",
    poster_path: "/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg",
    backdrop_path: "/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
    media_type: "movie",
    genre_ids: [28, 12, 878],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Sci-Fi" },
    ],
    release_date: "2025-05-02",
    vote_average: 8.0,
    vote_count: 980,
    popularity: 2450.0,
    tagline: "Be careful who you assemble.",
    runtime: 130,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1373737, name: "Florence Pugh", character: "Yelena Belova", profile_path: null },
        { id: 60898, name: "Sebastian Stan", character: "Bucky Barnes", profile_path: null },
        { id: 35029, name: "David Harbour", character: "Alexei Shostakov / Red Guardian", profile_path: null },
        { id: 1728298, name: "Lewis Pullman", character: "Bob / Sentry", profile_path: null },
        { id: 11107, name: "Wyatt Russell", character: "John Walker / U.S. Agent", profile_path: null },
      ],
      crew: [{ id: 1042784, name: "Jake Schreier", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_tb", key: "v-bt7WpSrhg", name: "Official Teaser", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 337, provider_name: "Disney+", logo_path: null }],
        },
      },
    },
  },
  {
    id: 1064213,
    title: "Superman",
    overview:
      "Superman, a journalist for the Daily Planet in Metropolis, reconciles his Kryptonian heritage with his human upbringing as Clark Kent in Smallville, Kansas.",
    poster_path: "/qvyOfwTC3qdbzkqdXWSSEMHtjBZ.jpg",
    backdrop_path: "/qvyOfwTC3qdbzkqdXWSSEMHtjBZ.jpg",
    media_type: "movie",
    genre_ids: [28, 878, 12],
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Sci-Fi" },
      { id: 12, name: "Adventure" },
    ],
    release_date: "2025-07-11",
    vote_average: 8.2,
    vote_count: 1200,
    popularity: 2780.0,
    tagline: "Look up in the sky.",
    runtime: 145,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1397779, name: "David Corenswet", character: "Clark Kent / Superman", profile_path: null },
        { id: 1475732, name: "Rachel Brosnahan", character: "Lois Lane", profile_path: null },
        { id: 3292, name: "Nicholas Hoult", character: "Lex Luthor", profile_path: null },
        { id: 11105, name: "Nathan Fillion", character: "Guy Gardner / Green Lantern", profile_path: null },
      ],
      crew: [{ id: 15217, name: "James Gunn", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_sup", key: "uhUht6vAsMY", name: "Official Teaser Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 1899, provider_name: "Max", logo_path: "/6O9Nl7g9o8e2t2A6l8gB3k7j4d.jpg" }],
        },
      },
    },
  },
  {
    id: 83533,
    title: "Avatar: Fire and Ash",
    overview:
      "Jake Sully and Neytiri encounter a new, aggressive clan of Na'vi known as the 'Ash People', who are volcanic biome dwellers led by the fiery Varang, pushing Pandora toward a devastating clash of elements.",
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    backdrop_path: "/8rpDcsfLJypbO6vREc0547VKqEv.jpg",
    media_type: "movie",
    genre_ids: [878, 12, 28],
    genres: [
      { id: 878, name: "Sci-Fi" },
      { id: 12, name: "Adventure" },
      { id: 28, name: "Action" },
    ],
    release_date: "2025-12-19",
    vote_average: 8.3,
    vote_count: 1500,
    popularity: 3100.0,
    tagline: "Enter the world of the Ash clan.",
    runtime: 190,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 65731, name: "Sam Worthington", character: "Jake Sully", profile_path: null },
        { id: 8691, name: "Zoe Saldana", character: "Neytiri", profile_path: null },
        { id: 10205, name: "Sigourney Weaver", character: "Kiri", profile_path: null },
        { id: 1620, name: "Michelle Yeoh", character: "Dr. Karina Mogue", profile_path: null },
        { id: 11106, name: "Oona Chaplin", character: "Varang", profile_path: null },
      ],
      crew: [{ id: 2710, name: "James Cameron", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_avatar3", key: "d9MyW72ELq0", name: "Official Concept Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 337, provider_name: "Disney+", logo_path: null }],
        },
      },
    },
  },
  {
    id: 575265,
    title: "Mission: Impossible - The Final Reckoning",
    overview:
      "Our lives are not defined by any one action. Our lives are the sum of our choices. Ethan Hunt and his IMF team track down the dangerous, rogue AI known as the Entity in the ultimate worldwide mission.",
    poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    backdrop_path: "/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
    media_type: "movie",
    genre_ids: [28, 12, 53],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 53, name: "Thriller" },
    ],
    release_date: "2025-05-23",
    vote_average: 8.2,
    vote_count: 1100,
    popularity: 2500.0,
    tagline: "Every choice has led to this.",
    runtime: 165,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 500, name: "Tom Cruise", character: "Ethan Hunt", profile_path: null },
        { id: 504, name: "Hayley Atwell", character: "Grace", profile_path: null },
        { id: 1015, name: "Ving Rhames", character: "Luther Stickell", profile_path: null },
        { id: 11108, name: "Simon Pegg", character: "Benji Dunn", profile_path: null },
      ],
      crew: [{ id: 11210, name: "Christopher McQuarrie", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_mi8", key: "NOhDyZJgkQ8", name: "Official Teaser Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 531, provider_name: "Paramount+", logo_path: null }],
        },
      },
    },
  },
  {
    id: 414906,
    title: "The Batman Part II",
    overview:
      "Bruce Wayne faces the rising darkness in Gotham City's flooded streets, challenging the fragile criminal underworld and an elusive new menace.",
    poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    media_type: "movie",
    genre_ids: [28, 80, 18],
    genres: [
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
    ],
    release_date: "2026-10-02",
    vote_average: 8.5,
    vote_count: 1300,
    popularity: 3200.0,
    tagline: "The shadows return.",
    runtime: 175,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 11288, name: "Robert Pattinson", character: "Bruce Wayne / The Batman", profile_path: null },
        { id: 7248, name: "Colin Farrell", character: "Oz Cobb / The Penguin", profile_path: null },
        { id: 1333, name: "Andy Serkis", character: "Alfred Pennyworth", profile_path: null },
        { id: 138, name: "Jeffrey Wright", character: "James Gordon", profile_path: null },
      ],
      crew: [{ id: 15218, name: "Matt Reeves", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_bat2", key: "mqqft2x_Aa4", name: "Official Teaser", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 1899, provider_name: "Max", logo_path: "/6O9Nl7g9o8e2t2A6l8gB3k7j4d.jpg" }],
        },
      },
    },
  },

  // --- LATEST TOP-TIER TV SERIES (2024-2025) ---
  {
    id: 93405,
    title: "Squid Game",
    name: "Squid Game",
    overview:
      "Three years after winning Squid Game, Player 456 gave up going to the states and comes back with a new resolution in his mind. Gi-hun once again dives into the mysterious survival game, starting another life-or-death game with new participants gathered to win the 45.6 billion won prize.",
    poster_path: "/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    backdrop_path: "/2meX1nMdScFOoV4370rqHWKmXhY.jpg",
    media_type: "tv",
    genre_ids: [10759, 9648, 18],
    genres: [
      { id: 10759, name: "Action & Adventure" },
      { id: 9648, name: "Mystery" },
      { id: 18, name: "Drama" },
    ],
    first_air_date: "2024-12-26",
    vote_average: 8.5,
    vote_count: 3200,
    popularity: 2950.0,
    tagline: "The game will not stop.",
    number_of_seasons: 2,
    number_of_episodes: 15,
    age_rating: "TV-MA",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 73249, name: "Lee Jung-jae", character: "Seong Gi-hun", profile_path: null },
        { id: 21688, name: "Lee Byung-hun", character: "Front Man", profile_path: null },
        { id: 21689, name: "Wi Ha-joon", character: "Hwang Jun-ho", profile_path: null },
        { id: 122828, name: "Yim Si-wan", character: "Player 333", profile_path: null },
      ],
      crew: [{ id: 13345, name: "Hwang Dong-hyuk", job: "Creator / Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_sg2", key: "lQBmZBJTN4U", name: "Season 2 Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 8, provider_name: "Netflix", logo_path: "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg" }],
        },
      },
    },
    seasons: [
      {
        id: 1,
        season_number: 1,
        name: "Season 1",
        episode_count: 9,
        poster_path: "/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
      },
      {
        id: 2,
        season_number: 2,
        name: "Season 2",
        episode_count: 6,
        poster_path: "/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
      },
    ],
  },
  {
    id: 118956,
    title: "The Penguin",
    name: "The Penguin",
    overview:
      "Following the events of The Batman (2022), Oz Cobb, a.k.a. the Penguin, makes a calculated, brutal play to seize control of Gotham City's criminal underworld after the death of boss Carmine Falcone.",
    poster_path: "/vOWcqC4oDQws1doDWLO7d3dh5qc.jpg",
    backdrop_path: "/4TdmuuwiIiKw3JOjIuhdgYxRXnN.jpg",
    media_type: "tv",
    genre_ids: [80, 18],
    genres: [
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
    ],
    first_air_date: "2024-09-19",
    vote_average: 8.8,
    vote_count: 2400,
    popularity: 2650.0,
    tagline: "The city belongs to him.",
    number_of_seasons: 1,
    number_of_episodes: 8,
    age_rating: "TV-MA",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 7248, name: "Colin Farrell", character: "Oz Cobb / The Penguin", profile_path: null },
        { id: 122829, name: "Cristin Milioti", character: "Sofia Falcone", profile_path: null },
        { id: 1728295, name: "Rhenzy Feliz", character: "Victor Aguilar", profile_path: null },
        { id: 11109, name: "Clancy Brown", character: "Salvatore Maroni", profile_path: null },
      ],
      crew: [{ id: 11110, name: "Lauren LeFranc", job: "Showrunner", department: "Writing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_peng", key: "sf9YSb7tQpY", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 1899, provider_name: "Max", logo_path: "/6O9Nl7g9o8e2t2A6l8gB3k7j4d.jpg" }],
        },
      },
    },
    seasons: [
      {
        id: 1,
        season_number: 1,
        name: "Season 1",
        episode_count: 8,
        poster_path: "/vOWcqC4oDQws1doDWLO7d3dh5qc.jpg",
      },
    ],
  },
  {
    id: 106379,
    title: "Fallout",
    name: "Fallout",
    overview:
      "The story of haves and have-nots in a world in which there's almost nothing left to have. 200 years after the nuclear apocalypse, the gentle denizens of luxury fallout shelters are forced to return to the irradiated hellscape their ancestors left behind.",
    poster_path: "/c15BtJxCXMrISLVmysdsnZUPQft.jpg",
    backdrop_path: "/coaPCIqQBPUZsOnJcWZxhaORcDT.jpg",
    media_type: "tv",
    genre_ids: [10765, 10759, 18],
    genres: [
      { id: 10765, name: "Sci-Fi & Fantasy" },
      { id: 10759, name: "Action & Adventure" },
      { id: 18, name: "Drama" },
    ],
    first_air_date: "2024-04-10",
    vote_average: 8.4,
    vote_count: 3950,
    popularity: 2400.0,
    tagline: "The future is wasteland.",
    number_of_seasons: 1,
    number_of_episodes: 8,
    age_rating: "TV-MA",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1465809, name: "Ella Purnell", character: "Lucy MacLean", profile_path: null },
        { id: 1544085, name: "Aaron Moten", character: "Maximus", profile_path: null },
        { id: 1038, name: "Walton Goggins", character: "The Ghoul / Cooper Howard", profile_path: null },
        { id: 1334, name: "Kyle MacLachlan", character: "Hank MacLean", profile_path: null },
      ],
      crew: [{ id: 15219, name: "Jonathan Nolan", job: "Director / Executive Producer", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_fo", key: "V-mugKDQDlg", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 9, provider_name: "Amazon Prime Video", logo_path: "/emthp39XA2jdvAqflZAEOWAc6on.jpg" }],
        },
      },
    },
    seasons: [
      {
        id: 1,
        season_number: 1,
        name: "Season 1",
        episode_count: 8,
        poster_path: "/c15BtJxCXMrISLVmysdsnZUPQft.jpg",
      },
    ],
  },
  {
    id: 94997,
    title: "House of the Dragon",
    name: "House of the Dragon",
    overview:
      "The Targaryen dynasty is at the height of its power in Westeros, with more than 10 dragons under their control. But when King Viserys designates his daughter Rhaenyra as heir, the Greens and the Blacks clash in a devastating civil war known as the Dance of the Dragons.",
    poster_path: "/7V0Ebks0GgpKvQ7QbLAIdX5dos4.jpg",
    backdrop_path: "/577eXC8wFQT0eUrJcgznSiFPRmk.jpg",
    media_type: "tv",
    genre_ids: [10765, 18, 10759],
    genres: [
      { id: 10765, name: "Sci-Fi & Fantasy" },
      { id: 18, name: "Drama" },
      { id: 10759, name: "Action & Adventure" },
    ],
    first_air_date: "2024-06-16",
    vote_average: 8.4,
    vote_count: 4500,
    popularity: 2350.0,
    tagline: "All must choose.",
    number_of_seasons: 2,
    number_of_episodes: 18,
    age_rating: "TV-MA",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1475735, name: "Emma D'Arcy", character: "Queen Rhaenyra Targaryen", profile_path: null },
        { id: 122830, name: "Matt Smith", character: "Daemon Targaryen", profile_path: null },
        { id: 11111, name: "Olivia Cooke", character: "Alicent Hightower", profile_path: null },
      ],
      crew: [{ id: 11112, name: "Ryan Condal", job: "Showrunner", department: "Writing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_hotd2", key: "DotnJ7tTA34", name: "Season 2 Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 1899, provider_name: "Max", logo_path: "/6O9Nl7g9o8e2t2A6l8gB3k7j4d.jpg" }],
        },
      },
    },
  },
  {
    id: 93740,
    title: "Dune: Prophecy",
    name: "Dune: Prophecy",
    overview:
      "Set 10,000 years before the ascension of Paul Atreides, Dune: Prophecy follows two Harkonnen sisters as they combat forces that threaten the future of humankind and establish the fabled sect that will become known as the Bene Gesserit.",
    poster_path: "/tg9I5pOY4M9CKj8U0cxVBTsm5eh.jpg",
    backdrop_path: "/7NNNXo0qG2SqH4JoG7GPvJ2hzes.jpg",
    media_type: "tv",
    genre_ids: [10765, 18],
    genres: [
      { id: 10765, name: "Sci-Fi & Fantasy" },
      { id: 18, name: "Drama" },
    ],
    first_air_date: "2024-11-17",
    vote_average: 7.9,
    vote_count: 1400,
    popularity: 2150.0,
    tagline: "Before the legend, before the messiah.",
    number_of_seasons: 1,
    number_of_episodes: 6,
    age_rating: "TV-MA",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 931, name: "Emily Watson", character: "Valya Harkonnen", profile_path: null },
        { id: 122831, name: "Olivia Williams", character: "Tula Harkonnen", profile_path: null },
        { id: 11113, name: "Travis Fimmel", character: "Desmond Hart", profile_path: null },
      ],
      crew: [{ id: 11114, name: "Alison Schapker", job: "Showrunner", department: "Writing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_dunep", key: "4r0YQ5k3s-I", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 1899, provider_name: "Max", logo_path: "/6O9Nl7g9o8e2t2A6l8gB3k7j4d.jpg" }],
        },
      },
    },
  },
  {
    id: 202250,
    title: "Daredevil: Born Again",
    name: "Daredevil: Born Again",
    overview:
      "Matt Murdock, a blind lawyer with heightened abilities, and his nemesis Wilson Fisk, the former mob boss running for Mayor of New York, find their paths crossing once again as their pasts threaten to tear Hell's Kitchen apart.",
    poster_path: "/fiK3u7oQb2Nsi2kuR73RRyIIGDD.jpg",
    backdrop_path: "/mAJ84W6I8I272Da87qplS2Dp9ST.jpg",
    media_type: "tv",
    genre_ids: [10759, 80, 18],
    genres: [
      { id: 10759, name: "Action & Adventure" },
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
    ],
    first_air_date: "2025-03-04",
    vote_average: 8.7,
    vote_count: 1100,
    popularity: 2800.0,
    tagline: "Hell's Kitchen calls its devil back.",
    number_of_seasons: 1,
    number_of_episodes: 9,
    age_rating: "TV-MA",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1335, name: "Charlie Cox", character: "Matt Murdock / Daredevil", profile_path: null },
        { id: 1039, name: "Vincent D'Onofrio", character: "Wilson Fisk / Kingpin", profile_path: null },
        { id: 11115, name: "Jon Bernthal", character: "Frank Castle / The Punisher", profile_path: null },
      ],
      crew: [{ id: 11116, name: "Dario Scardapane", job: "Showrunner", department: "Writing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_ddba", key: "7bA0g4_H42w", name: "Official Teaser Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 337, provider_name: "Disney+", logo_path: null }],
        },
      },
    },
  },
  {
    id: 95557,
    title: "Severance",
    name: "Severance",
    overview:
      "Mark Scout leads a team at Lumon Industries, whose employees have undergone a severance procedure, which surgically divides their memories between their work and personal lives. In Season 2, the team deals with the dire consequences of discovering the outside truth.",
    poster_path: "/4tblBrslcKSifMVZ3TmtT2ukMor.jpg",
    backdrop_path: "/9qrroces8C6R9aKr08hACNPVXdZ.jpg",
    media_type: "tv",
    genre_ids: [878, 18, 9648],
    genres: [
      { id: 878, name: "Sci-Fi" },
      { id: 18, name: "Drama" },
      { id: 9648, name: "Mystery" },
    ],
    first_air_date: "2025-01-17",
    vote_average: 8.7,
    vote_count: 2400,
    popularity: 2500.0,
    tagline: "You never truly leave.",
    number_of_seasons: 2,
    number_of_episodes: 19,
    age_rating: "TV-MA",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 41042, name: "Adam Scott", character: "Mark Scout", profile_path: null },
        { id: 1373738, name: "Britt Lower", character: "Helly R.", profile_path: null },
        { id: 932, name: "Patricia Arquette", character: "Harmony Cobel", profile_path: null },
        { id: 2038, name: "John Turturro", character: "Irving Bailiff", profile_path: null },
      ],
      crew: [{ id: 13344, name: "Ben Stiller", job: "Director / Executive Producer", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v12", key: "xEQP4VVuyrY", name: "Season 2 Teaser", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 2, provider_name: "Apple TV+", logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg" }],
        },
      },
    },
  },
  {
    id: 125988,
    title: "Silo",
    name: "Silo",
    overview:
      "In a ruined and toxic future, thousands live in a giant silo deep underground. After its sheriff breaks a cardinal rule and residents die mysteriously, engineer Juliette starts to uncover shocking secrets and the truth about the silo.",
    poster_path: "/gMYZZvnkVNTqSVnVCphWbPXwWwb.jpg",
    backdrop_path: "/fQGrzO0Iwo7CO4b2zVdJLkcnhwK.jpg",
    media_type: "tv",
    genre_ids: [10765, 18],
    genres: [
      { id: 10765, name: "Sci-Fi & Fantasy" },
      { id: 18, name: "Drama" },
    ],
    first_air_date: "2024-11-15",
    vote_average: 8.3,
    vote_count: 1950,
    popularity: 1980.0,
    tagline: "The truth will surface.",
    number_of_seasons: 2,
    number_of_episodes: 20,
    age_rating: "TV-MA",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 932, name: "Rebecca Ferguson", character: "Juliette Nichols", profile_path: "/6NRubqiqffZ7mD21Z5mXqL1M8gK.jpg" },
        { id: 1040, name: "Common", character: "Robert Sims", profile_path: null },
        { id: 11117, name: "Tim Robbins", character: "Bernard Holland", profile_path: null },
        { id: 11118, name: "Steve Zahn", character: "Solo", profile_path: null },
      ],
      crew: [{ id: 11119, name: "Graham Yost", job: "Showrunner", department: "Writing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_silo2", key: "k5_8Xk9m0n1", name: "Season 2 Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 2, provider_name: "Apple TV+", logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg" }],
        },
      },
    },
  },
  {
    id: 126308,
    title: "Shōgun",
    name: "Shōgun",
    overview:
      "In Japan in the year 1600 at the dawn of a century-defining civil war, Lord Yoshii Toranaga is fighting for his life as his enemies on the Council of Regents unite against him, when a mysterious European ship is found marooned in a nearby fishing village.",
    poster_path: "/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg",
    backdrop_path: "/bwSmgmd90hCWwqOKQYTEraeOZhJ.jpg",
    media_type: "tv",
    genre_ids: [18, 10768, 10759],
    genres: [
      { id: 18, name: "Drama" },
      { id: 10768, name: "War & Politics" },
      { id: 10759, name: "Action & Adventure" },
    ],
    first_air_date: "2024-02-27",
    vote_average: 8.6,
    vote_count: 2980,
    popularity: 1840.0,
    tagline: "Destiny is no matter of chance.",
    number_of_seasons: 1,
    number_of_episodes: 10,
    age_rating: "TV-MA",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 8654, name: "Hiroyuki Sanada", character: "Lord Yoshii Toranaga", profile_path: null },
        { id: 1475736, name: "Cosmo Jarvis", character: "John Blackthorne", profile_path: null },
        { id: 122832, name: "Anna Sawai", character: "Toda Mariko", profile_path: null },
        { id: 1728296, name: "Tadanobu Asano", character: "Kashigi Yabushige", profile_path: null },
      ],
      crew: [{ id: 11120, name: "Justin Marks", job: "Showrunner", department: "Writing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v11", key: "yRfQVYRXhYo", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 15, provider_name: "Hulu", logo_path: null }],
        },
      },
    },
  },
  {
    id: 94605,
    title: "Arcane",
    name: "Arcane",
    overview:
      "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and incompatible convictions. The final season brings an explosive climax to the battle for Runeterra.",
    poster_path: "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    backdrop_path: "/5cvnxEHT3e39DvT6ARw4GNCFrB0.jpg",
    media_type: "tv",
    genre_ids: [16, 10765, 10759, 18],
    genres: [
      { id: 16, name: "Animation" },
      { id: 10765, name: "Sci-Fi & Fantasy" },
      { id: 18, name: "Drama" },
    ],
    first_air_date: "2024-11-09",
    vote_average: 9.0,
    vote_count: 5100,
    popularity: 2450.4,
    tagline: "Every legend has a beginning. Every conflict has an end.",
    number_of_seasons: 2,
    number_of_episodes: 18,
    age_rating: "TV-14",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 54693, name: "Hailee Steinfeld", character: "Vi (voice)", profile_path: null },
        { id: 1465809, name: "Ella Purnell", character: "Jinx (voice)", profile_path: null },
        { id: 1728299, name: "Katie Leung", character: "Caitlyn (voice)", profile_path: null },
      ],
      crew: [{ id: 2470659, name: "Christian Linke", job: "Creator", department: "Writing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_arcane2", key: "cqGjhVJWtEg", name: "Season 2 Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 8, provider_name: "Netflix", logo_path: "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg" }],
        },
      },
    },
    seasons: [
      {
        id: 1,
        season_number: 1,
        name: "Season 1",
        episode_count: 9,
        poster_path: "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
      },
      {
        id: 2,
        season_number: 2,
        name: "Season 2",
        episode_count: 9,
        poster_path: "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
      },
    ],
  },
  {
    id: 100088,
    title: "The Last of Us",
    name: "The Last of Us",
    overview:
      "Twenty years after modern civilization was destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone. Season 2 introduces Abby, Jackson, and a cycle of brutal reckoning.",
    poster_path: "/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg",
    backdrop_path: "/lY2DhbA7Hy44fAKddr06UrXWWaQ.jpg",
    media_type: "tv",
    genre_ids: [18, 10765, 10759],
    genres: [
      { id: 18, name: "Drama" },
      { id: 10765, name: "Sci-Fi & Fantasy" },
    ],
    first_air_date: "2025-01-01",
    vote_average: 8.6,
    vote_count: 4900,
    popularity: 2300.0,
    tagline: "When you're lost in the darkness, look for the light.",
    number_of_seasons: 2,
    number_of_episodes: 16,
    age_rating: "TV-MA",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1253360, name: "Pedro Pascal", character: "Joel Miller", profile_path: null },
        { id: 2095643, name: "Bella Ramsey", character: "Ellie Williams", profile_path: null },
        { id: 1475737, name: "Kaitlyn Dever", character: "Abby Anderson", profile_path: null },
        { id: 2233, name: "Catherine O'Hara", character: "Gail", profile_path: null },
      ],
      crew: [{ id: 11121, name: "Craig Mazin", job: "Creator / Showrunner", department: "Writing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v_tlou2", key: "uLtkt8BonwM", name: "Season 2 Official Teaser", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 1899, provider_name: "Max", logo_path: "/6O9Nl7g9o8e2t2A6l8gB3k7j4d.jpg" }],
        },
      },
    },
  },

  // --- ACCLAIMED MODERN CLASSICS & TOP RATED GEMS ---
  {
    id: 872585,
    title: "Oppenheimer",
    overview:
      "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, examining the scientific breakthrough and the deep moral consequences that followed.",
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop_path: "/7CENyUim29IEsaJhUxIGymCRvPu.jpg",
    media_type: "movie",
    genre_ids: [18, 36],
    genres: [
      { id: 18, name: "Drama" },
      { id: 36, name: "History" },
    ],
    release_date: "2023-07-19",
    vote_average: 8.5,
    vote_count: 8900,
    popularity: 1420.2,
    tagline: "The world forever changes.",
    runtime: 181,
    age_rating: "R",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 2037, name: "Cillian Murphy", character: "J. Robert Oppenheimer", profile_path: null },
        { id: 5081, name: "Emily Blunt", character: "Katherine Oppenheimer", profile_path: null },
        { id: 1892, name: "Matt Damon", character: "Leslie Groves", profile_path: null },
        { id: 3223, name: "Robert Downey Jr.", character: "Lewis Strauss", profile_path: null },
      ],
      crew: [{ id: 525, name: "Christopher Nolan", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v2", key: "uYPbbksJxIg", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 9, provider_name: "Amazon Prime Video", logo_path: "/emthp39XA2jdvAqflZAEOWAc6on.jpg" }],
        },
      },
    },
  },
  {
    id: 569094,
    title: "Spider-Man: Across the Spider-Verse",
    overview:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    media_type: "movie",
    genre_ids: [16, 28, 12, 878],
    genres: [
      { id: 16, name: "Animation" },
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Sci-Fi" },
    ],
    release_date: "2023-06-02",
    vote_average: 8.4,
    vote_count: 6780,
    popularity: 1350.0,
    tagline: "It's how you wear the mask that matters.",
    runtime: 140,
    age_rating: "PG",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 587506, name: "Shameik Moore", character: "Miles Morales (voice)", profile_path: null },
        { id: 54693, name: "Hailee Steinfeld", character: "Gwen Stacy (voice)", profile_path: null },
        { id: 25063, name: "Oscar Isaac", character: "Miguel O'Hara (voice)", profile_path: null },
      ],
      crew: [{ id: 12891, name: "Joaquim Dos Santos", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v3", key: "cqGjhVJWtEg", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 8, provider_name: "Netflix", logo_path: "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg" }],
        },
      },
    },
  },
  {
    id: 157336,
    title: "Interstellar",
    overview:
      "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    media_type: "movie",
    genre_ids: [12, 18, 878],
    genres: [
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
      { id: 878, name: "Sci-Fi" },
    ],
    release_date: "2014-11-07",
    vote_average: 8.4,
    vote_count: 34000,
    popularity: 910.0,
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    runtime: 169,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 10297, name: "Matthew McConaughey", character: "Cooper", profile_path: null },
        { id: 1813, name: "Anne Hathaway", character: "Brand", profile_path: null },
        { id: 83002, name: "Jessica Chastain", character: "Murph", profile_path: null },
      ],
      crew: [{ id: 525, name: "Christopher Nolan", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v7", key: "zSWdZVtXT7E", name: "Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 531, provider_name: "Paramount+", logo_path: null }],
        },
      },
    },
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    media_type: "movie",
    genre_ids: [18, 28, 80, 53],
    genres: [
      { id: 18, name: "Drama" },
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" },
      { id: 53, name: "Thriller" },
    ],
    release_date: "2008-07-18",
    vote_average: 8.5,
    vote_count: 32000,
    popularity: 880.0,
    tagline: "Why so serious?",
    runtime: 152,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 3894, name: "Christian Bale", character: "Bruce Wayne / Batman", profile_path: null },
        { id: 1810, name: "Heath Ledger", character: "Joker", profile_path: null },
        { id: 3895, name: "Michael Caine", character: "Alfred Pennyworth", profile_path: null },
        { id: 64, name: "Gary Oldman", character: "James Gordon", profile_path: null },
      ],
      crew: [{ id: 525, name: "Christopher Nolan", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v8", key: "EXeTwQWrcwY", name: "Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 1899, provider_name: "Max", logo_path: "/6O9Nl7g9o8e2t2A6l8gB3k7j4d.jpg" }],
        },
      },
    },
  },
  {
    id: 129,
    title: "Spirited Away",
    overview:
      "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
    poster_path: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    backdrop_path: "/6oaL4DP75yABrd5EbC4H2zq5ghc.jpg",
    media_type: "movie",
    genre_ids: [16, 10751, 14],
    genres: [
      { id: 16, name: "Animation" },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
    ],
    release_date: "2001-07-20",
    vote_average: 8.5,
    vote_count: 16000,
    popularity: 820.0,
    tagline: "The tunnel led Chihiro to a mysterious world...",
    runtime: 125,
    age_rating: "PG",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 19586, name: "Rumi Hiiragi", character: "Chihiro Ogino (voice)", profile_path: null },
        { id: 19587, name: "Miyu Irino", character: "Haku (voice)", profile_path: null },
      ],
      crew: [{ id: 608, name: "Hayao Miyazaki", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v9", key: "ByXuk9QqQkk", name: "Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 1899, provider_name: "Max", logo_path: "/6O9Nl7g9o8e2t2A6l8gB3k7j4d.jpg" }],
        },
      },
    },
  },
  {
    id: 27205,
    title: "Inception",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    media_type: "movie",
    genre_ids: [28, 878, 12],
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Sci-Fi" },
      { id: 12, name: "Adventure" },
    ],
    release_date: "2010-07-16",
    vote_average: 8.4,
    vote_count: 36000,
    popularity: 870.0,
    tagline: "Your mind is the scene of the crime.",
    runtime: 148,
    age_rating: "PG-13",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 6193, name: "Leonardo DiCaprio", character: "Dom Cobb", profile_path: null },
        { id: 24045, name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: null },
        { id: 27578, name: "Elliot Page", character: "Ariadne", profile_path: null },
      ],
      crew: [{ id: 525, name: "Christopher Nolan", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v15", key: "YoHD9XEInc0", name: "Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 1899, provider_name: "Max", logo_path: "/6O9Nl7g9o8e2t2A6l8gB3k7j4d.jpg" }],
        },
      },
    },
  },
  {
    id: 1429,
    title: "Attack on Titan",
    name: "Attack on Titan",
    overview:
      "Several hundred years ago, humans were nearly exterminated by Titans. In the present, young Eren Yeager vows to cleanse the earth of Titans after a colossal monstrosity breaches the wall of his hometown.",
    poster_path: "/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
    backdrop_path: "/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg",
    media_type: "tv",
    genre_ids: [16, 10765, 10759],
    genres: [
      { id: 16, name: "Animation" },
      { id: 10765, name: "Sci-Fi & Fantasy" },
      { id: 10759, name: "Action & Adventure" },
    ],
    first_air_date: "2013-04-07",
    vote_average: 8.7,
    vote_count: 6100,
    popularity: 920.0,
    tagline: "To defeat monsters, you must be willing to throw away your humanity.",
    number_of_seasons: 4,
    number_of_episodes: 89,
    age_rating: "TV-MA",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 111893, name: "Yuki Kaji", character: "Eren Yeager (voice)", profile_path: null },
        { id: 111894, name: "Yui Ishikawa", character: "Mikasa Ackerman (voice)", profile_path: null },
      ],
      crew: [{ id: 111895, name: "Tetsuro Araki", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v6", key: "MGRm4IzK1SQ", name: "Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 283, provider_name: "Crunchyroll", logo_path: null }],
        },
      },
    },
  },
  {
    id: 85937,
    title: "Demon Slayer: Kimetsu no Yaiba",
    name: "Demon Slayer: Kimetsu no Yaiba",
    overview:
      "It is the Taisho Period in Japan. Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon. To make matters worse, his younger sister Nezuko has been transformed into a demon herself. Tanjiro resolves to become a 'demon slayer' to turn his sister back into a human.",
    poster_path: "/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
    backdrop_path: "/3GQKYh6Trm8pxd2AypovoYQf4Ay.jpg",
    media_type: "tv",
    genre_ids: [16, 10759, 10765],
    genres: [
      { id: 16, name: "Animation" },
      { id: 10759, name: "Action & Adventure" },
      { id: 10765, name: "Sci-Fi & Fantasy" },
    ],
    first_air_date: "2019-04-06",
    vote_average: 8.7,
    vote_count: 6100,
    popularity: 910.0,
    tagline: "Sharpen your blade. Slay the demons.",
    number_of_seasons: 4,
    number_of_episodes: 55,
    age_rating: "TV-14",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1253361, name: "Natsuki Hanae", character: "Tanjiro Kamado (voice)", profile_path: null },
        { id: 1253362, name: "Akari Kito", character: "Nezuko Kamado (voice)", profile_path: null },
      ],
      crew: [{ id: 1253363, name: "Haruo Sotozaki", job: "Director", department: "Directing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v14", key: "VQGCKyvzIM4", name: "Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [
            { provider_id: 8, provider_name: "Netflix", logo_path: "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg" },
            { provider_id: 283, provider_name: "Crunchyroll", logo_path: null },
          ],
        },
      },
    },
  },
  {
    id: 66732,
    title: "Stranger Things",
    name: "Stranger Things",
    overview:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    media_type: "tv",
    genre_ids: [10765, 18, 9648],
    genres: [
      { id: 10765, name: "Sci-Fi & Fantasy" },
      { id: 18, name: "Drama" },
      { id: 9648, name: "Mystery" },
    ],
    first_air_date: "2016-07-15",
    vote_average: 8.6,
    vote_count: 17000,
    popularity: 980.0,
    tagline: "Every ending has a beginning.",
    number_of_seasons: 4,
    number_of_episodes: 34,
    age_rating: "TV-14",
    quality_badge: "4K UHD",
    credits: {
      cast: [
        { id: 1356211, name: "Millie Bobby Brown", character: "Eleven", profile_path: null },
        { id: 35029, name: "David Harbour", character: "Jim Hopper", profile_path: null },
        { id: 2157, name: "Winona Ryder", character: "Joyce Byers", profile_path: null },
      ],
      crew: [{ id: 11122, name: "The Duffer Brothers", job: "Creators", department: "Writing", profile_path: null }],
    },
    videos: {
      results: [{ id: "v13", key: "b9EkMc79ZSU", name: "Trailer", site: "YouTube", type: "Trailer", official: true }],
    },
    "watch/providers": {
      results: {
        US: {
          flatrate: [{ provider_id: 8, provider_name: "Netflix", logo_path: "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg" }],
        },
      },
    },
  },

  // --- ALL-TIME TIMELESS CLASSICS & ICONIC FRANCHISES ---
  {
    "id": 557,
    "title": "Spider-Man",
    "overview": "After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.",
    "poster_path": "/or6XJBVpcEbIkma0V9zshnbEtx4.jpg",
    "backdrop_path": "/zQ8AxTPiCiS5nnwXpwTBPBHSaa5.jpg",
    "media_type": "movie",
    "genre_ids": [
      28,
      878
    ],
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      }
    ],
    "release_date": "2002-05-01",
    "vote_average": 7.4,
    "vote_count": 21444,
    "popularity": 49.6786,
    "tagline": "Go for the ultimate spin.",
    "runtime": 121,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 2219,
          "name": "Tobey Maguire",
          "character": "Spider-Man / Peter Parker",
          "profile_path": "/s6PwSvq6gC7PGEjIku69tPbvR8M.jpg"
        },
        {
          "id": 5293,
          "name": "Willem Dafoe",
          "character": "Green Goblin / Norman Osborn",
          "profile_path": "/ui8e4sgZAwMPi3hzEO53jyBJF9B.jpg"
        },
        {
          "id": 205,
          "name": "Kirsten Dunst",
          "character": "Mary Jane Watson",
          "profile_path": "/yhLKGjuiMMdbGnFrR8AREkCZcVF.jpg"
        },
        {
          "id": 17051,
          "name": "James Franco",
          "character": "Harry Osborn",
          "profile_path": "/bjmAntHGiibLZixH8nTNVBzaFQn.jpg"
        },
        {
          "id": 19153,
          "name": "Cliff Robertson",
          "character": "Ben Parker",
          "profile_path": "/8pH2RWCPtXKzT9P33MbzgnzPlF0.jpg"
        }
      ],
      "crew": [
        {
          "id": 7623,
          "name": "Sam Raimi",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/8gssvwiPrFRuFRlr5ruKx68k1Jl.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a71755c776068c8ff358642",
          "key": "ISJc7iScX64",
          "name": "Will Spider-Man Be Able to Defeat The Green Goblin and Save Mary Jane?",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "6a7178789287b1cf5e05b811",
          "key": "LqhrKf6ibwQ",
          "name": "Let's Destroy Parker!",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        }
      ]
    }
  },
  {
    "id": 558,
    "title": "Spider-Man 2",
    "overview": "Peter Parker is going through a major identity crisis. Burned out from being Spider-Man, he decides to shelve his superhero alter ego, which leaves the city suffering in the wake of carnage left by the evil Doc Ock. In the meantime, Parker still can't act on his feelings for Mary Jane Watson, a girl he's loved since childhood. A certain anger begins to brew in his best friend Harry Osborn as well...",
    "poster_path": "/aGuvNAaaZuWXYQQ6N2v7DeuP6mB.jpg",
    "backdrop_path": "/6al048Lat3eLVQOuKtc9h6Tu94d.jpg",
    "media_type": "movie",
    "genre_ids": [
      28,
      12,
      878
    ],
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      }
    ],
    "release_date": "2004-06-25",
    "vote_average": 7.3,
    "vote_count": 16926,
    "popularity": 17.0721,
    "tagline": "There's a hero in all of us.",
    "runtime": 127,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 2219,
          "name": "Tobey Maguire",
          "character": "Spider-Man / Peter Parker",
          "profile_path": "/s6PwSvq6gC7PGEjIku69tPbvR8M.jpg"
        },
        {
          "id": 205,
          "name": "Kirsten Dunst",
          "character": "Mary Jane Watson",
          "profile_path": "/yhLKGjuiMMdbGnFrR8AREkCZcVF.jpg"
        },
        {
          "id": 17051,
          "name": "James Franco",
          "character": "Harry Osborn",
          "profile_path": "/bjmAntHGiibLZixH8nTNVBzaFQn.jpg"
        },
        {
          "id": 658,
          "name": "Alfred Molina",
          "character": "Doc Ock / Otto Octavius",
          "profile_path": "/nJo91Czesn6z0d0pkfbDoVZY3sg.jpg"
        },
        {
          "id": 18998,
          "name": "Rosemary Harris",
          "character": "May Parker",
          "profile_path": "/3Mu02enwaF8dFuT195f7esILXns.jpg"
        }
      ],
      "crew": [
        {
          "id": 7623,
          "name": "Sam Raimi",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/8gssvwiPrFRuFRlr5ruKx68k1Jl.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a71780756e22395a353fdbb",
          "key": "sczbArdxReo",
          "name": "Web's in my Business",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "6a71781d50b53a3412b5e8bb",
          "key": "CW5yKmyk3qA",
          "name": "The Train Fight",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        }
      ]
    }
  },
  {
    "id": 1930,
    "title": "The Amazing Spider-Man",
    "overview": "A teenage Peter Parker grapples with both high school and amazing super-human crises as his alter-ego Spider-Man.",
    "poster_path": "/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg",
    "backdrop_path": "/HVcza6tJtWFrLriuh3Ano4Vt46.jpg",
    "media_type": "movie",
    "genre_ids": [
      28,
      12,
      878
    ],
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      }
    ],
    "release_date": "2012-06-23",
    "vote_average": 6.8,
    "vote_count": 19115,
    "popularity": 40.0194,
    "tagline": "The untold story begins.",
    "runtime": 136,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 37625,
          "name": "Andrew Garfield",
          "character": "Spider-Man / Peter Parker",
          "profile_path": "/beO5YvbTjrr5yy8hW26KVDMSr35.jpg"
        },
        {
          "id": 54693,
          "name": "Emma Stone",
          "character": "Gwen Stacy",
          "profile_path": "/cZ8a3QvAnj2cgcgVL6g4XaqPzpL.jpg"
        },
        {
          "id": 7026,
          "name": "Rhys Ifans",
          "character": "The Lizard / Dr. Curt Connors",
          "profile_path": "/5X8XcIqCDxsQYyHdx7mBwPVkSTs.jpg"
        },
        {
          "id": 5724,
          "name": "Denis Leary",
          "character": "Captain Stacy",
          "profile_path": "/tAOziVWQBnrW9eR442M6g9SQkmA.jpg"
        },
        {
          "id": 8349,
          "name": "Martin Sheen",
          "character": "Uncle Ben",
          "profile_path": "/m2Y3Q0uyuW6htrn2W9UWCWMkpZu.jpg"
        }
      ],
      "crew": [
        {
          "id": 87742,
          "name": "Marc Webb",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/95FAAT150Mi6DB8VcJgEeOplOsU.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a71773a42367a73b03586fa",
          "key": "CxUh9MYf1FE",
          "name": "From the Sewers",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "6a717748d8e611f9781adfe9",
          "key": "l3R0guWvdn4",
          "name": "Uncle Ben",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        }
      ]
    }
  },
  {
    "id": 315635,
    "title": "Spider-Man: Homecoming",
    "overview": "Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.",
    "poster_path": "/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
    "backdrop_path": "/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg",
    "media_type": "movie",
    "genre_ids": [
      28,
      12,
      878
    ],
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      }
    ],
    "release_date": "2017-07-05",
    "vote_average": 7.3,
    "vote_count": 23925,
    "popularity": 48.056,
    "tagline": "Homework can wait. The city can't.",
    "runtime": 133,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 1136406,
          "name": "Tom Holland",
          "character": "Peter Parker / Spider-Man",
          "profile_path": "/5OK84Wn1bIEIThFKcVoaN087mLj.jpg"
        },
        {
          "id": 2232,
          "name": "Michael Keaton",
          "character": "Adrian Toomes / Vulture",
          "profile_path": "/tYSja1KByFnZ4Hkp3stPqkKHnNL.jpg"
        },
        {
          "id": 3223,
          "name": "Robert Downey Jr.",
          "character": "Tony Stark / Iron Man",
          "profile_path": "/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg"
        },
        {
          "id": 3141,
          "name": "Marisa Tomei",
          "character": "May Parker",
          "profile_path": "/5NCCKQooVCQD36R6JL3a1hOeBVn.jpg"
        },
        {
          "id": 15277,
          "name": "Jon Favreau",
          "character": "Happy Hogan",
          "profile_path": "/tnx7iMVydPQXGOoLsxXl84PXtbA.jpg"
        }
      ],
      "crew": [
        {
          "id": 1293994,
          "name": "Jon Watts",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/fkXChMX6CUXY1yOxBehAzvaTCl7.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a71761a1a8712fad953fcda",
          "key": "oSGiXdc1ZrA",
          "name": "I Like You!",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "6a71762968420906de3586b5",
          "key": "dlXseh8JKXA",
          "name": "Messing with Things You Don't Understand",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        }
      ]
    }
  },
  {
    "id": 324857,
    "title": "Spider-Man: Into the Spider-Verse",
    "overview": "Struggling to find his place in the world while juggling school and family, Brooklyn teenager Miles Morales is unexpectedly bitten by a radioactive spider and develops unfathomable powers just like the one and only Spider-Man. While wrestling with the implications of his new abilities, Miles discovers a super collider created by the madman Wilson \"Kingpin\" Fisk, causing others from across the Spider-Verse to be inadvertently transported to his dimension.",
    "poster_path": "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    "backdrop_path": "/1ntePsIqeklfmrQJqZPncCydsqY.jpg",
    "media_type": "movie",
    "genre_ids": [
      16,
      28,
      12,
      878
    ],
    "genres": [
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      }
    ],
    "release_date": "2018-12-06",
    "vote_average": 8.4,
    "vote_count": 17887,
    "popularity": 48.4221,
    "tagline": "Enter a universe where more than one wears the mask.",
    "runtime": 117,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 587506,
          "name": "Shameik Moore",
          "character": "Miles Morales (voice)",
          "profile_path": "/ovUKfVOwJ7CadEHaG3NDsfA5xRq.jpg"
        },
        {
          "id": 543505,
          "name": "Jake Johnson",
          "character": "Peter B. Parker (voice)",
          "profile_path": "/3UNfW2qZgRkW81neNVfQvaRC92K.jpg"
        },
        {
          "id": 130640,
          "name": "Hailee Steinfeld",
          "character": "Gwen Stacy (voice)",
          "profile_path": "/qDInsG0cxWNxS1X4t59TBZ5S6x5.jpg"
        },
        {
          "id": 932967,
          "name": "Mahershala Ali",
          "character": "Uncle Aaron (voice)",
          "profile_path": "/9ZmSejm5lnUVY5IJ1iNx2QEjnHb.jpg"
        },
        {
          "id": 226366,
          "name": "Brian Tyree Henry",
          "character": "Jefferson Davis (voice)",
          "profile_path": "/2MsJh0bpyzwvOUnXOltHp3j85Pb.jpg"
        }
      ],
      "crew": [
        {
          "id": 936670,
          "name": "Bob Persichetti",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/jmpNVUvvhJB2X2eOSKpveFnetM8.jpg"
        },
        {
          "id": 151007,
          "name": "Peter Ramsey",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/eAL9QdCEYyxiMP9cl9lQddg8zEa.jpg"
        },
        {
          "id": 59918,
          "name": "Rodney Rothman",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/75yKuJr1wL8qesEDYL2IHK67BEx.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "61573fbe8e2ba600433fb15e",
          "key": "I3NHvQ0x4f0",
          "name": "Behind The Voices of Spider-Man: Into the Spider-Verse",
          "site": "YouTube",
          "type": "Featurette",
          "official": false
        },
        {
          "id": "61573ffd8e2ba600433fb1aa",
          "key": "7vD8P8501bg",
          "name": "Visual FX Breakdown",
          "site": "YouTube",
          "type": "Behind the Scenes",
          "official": true
        }
      ]
    }
  },
  {
    "id": 634649,
    "title": "Spider-Man: No Way Home",
    "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
    "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "backdrop_path": "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
    "media_type": "movie",
    "genre_ids": [
      28,
      12,
      878
    ],
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      }
    ],
    "release_date": "2021-12-15",
    "vote_average": 7.9,
    "vote_count": 23147,
    "popularity": 71.0281,
    "tagline": "Enter the Multiverse.",
    "runtime": 148,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 1136406,
          "name": "Tom Holland",
          "character": "Peter Parker / Spider-Man",
          "profile_path": "/5OK84Wn1bIEIThFKcVoaN087mLj.jpg"
        },
        {
          "id": 505710,
          "name": "Zendaya",
          "character": "MJ",
          "profile_path": "/3WdOloHpjtjL96uVOhFRRCcYSwq.jpg"
        },
        {
          "id": 71580,
          "name": "Benedict Cumberbatch",
          "character": "Doctor Strange",
          "profile_path": "/wz3MRiMmoz6b5X3oSzMRC9nLxY1.jpg"
        },
        {
          "id": 1649152,
          "name": "Jacob Batalon",
          "character": "Ned Leeds",
          "profile_path": "/53YhaL4xw4Sb1ssoHkeSSBaO29c.jpg"
        },
        {
          "id": 15277,
          "name": "Jon Favreau",
          "character": "Happy Hogan",
          "profile_path": "/tnx7iMVydPQXGOoLsxXl84PXtbA.jpg"
        }
      ],
      "crew": [
        {
          "id": 1293994,
          "name": "Jon Watts",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/fkXChMX6CUXY1yOxBehAzvaTCl7.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a717679c7aaf830af53fc05",
          "key": "QTtUdN2k0Bo",
          "name": "It Can't Be Him",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "6a71768c08cff3672a05b9cb",
          "key": "rrfJs6qeSbE",
          "name": "This is new!",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        }
      ]
    }
  },
  {
    "id": 272,
    "title": "Batman Begins",
    "overview": "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City.  Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.",
    "poster_path": "/sPX89Td70IDDjVr85jdSBb4rWGr.jpg",
    "backdrop_path": "/9IIBboV7MCT0bTxzXHmWK1Hq558.jpg",
    "media_type": "movie",
    "genre_ids": [
      18,
      80,
      28
    ],
    "genres": [
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 28,
        "name": "Action"
      }
    ],
    "release_date": "2005-06-10",
    "vote_average": 7.7,
    "vote_count": 23197,
    "popularity": 33.271,
    "tagline": "Evil fears the knight.",
    "runtime": 140,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 3894,
          "name": "Christian Bale",
          "character": "Bruce Wayne / Batman",
          "profile_path": "/7Pxez9J8fuPd2Mn9kex13YALrCQ.jpg"
        },
        {
          "id": 3895,
          "name": "Michael Caine",
          "character": "Alfred",
          "profile_path": "/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg"
        },
        {
          "id": 3896,
          "name": "Liam Neeson",
          "character": "Ducard",
          "profile_path": "/sRLev3wJioBgun3ZoeAUFpkLy0D.jpg"
        },
        {
          "id": 3897,
          "name": "Katie Holmes",
          "character": "Rachel Dawes",
          "profile_path": "/gDhc9rLbhpXdY8lISD7yPiIhvp4.jpg"
        },
        {
          "id": 64,
          "name": "Gary Oldman",
          "character": "Jim Gordon",
          "profile_path": "/yhaSM5habNNI1Tf4ALRwRk3VvSZ.jpg"
        }
      ],
      "crew": [
        {
          "id": 525,
          "name": "Christopher Nolan",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "68e40d99f6d32fab28bd9bf8",
          "key": "ejd9hefxp_E",
          "name": "Scarecrow is NIGHTMARE FUEL",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "69fe61dbf9b07a2cb334cec8",
          "key": "2oE3iNAMUGA",
          "name": "Scarecrow's Fear Gas",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        }
      ]
    }
  },
  {
    "id": 238,
    "title": "The Godfather",
    "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
    "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "backdrop_path": "/tSPT36ZKlP2WVHJLM4cQPLSzv3b.jpg",
    "media_type": "movie",
    "genre_ids": [
      18,
      80
    ],
    "genres": [
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 80,
        "name": "Crime"
      }
    ],
    "release_date": "1972-03-14",
    "vote_average": 8.7,
    "vote_count": 23604,
    "popularity": 69.1893,
    "tagline": "An offer you can't refuse.",
    "runtime": 175,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 3084,
          "name": "Marlon Brando",
          "character": "Don Vito Corleone",
          "profile_path": "/fuTEPMsBtV1zE98ujPONbKiYDc2.jpg"
        },
        {
          "id": 1158,
          "name": "Al Pacino",
          "character": "Michael Corleone",
          "profile_path": "/m8HAAjq1T75JypKk0v1FFQn4ysZ.jpg"
        },
        {
          "id": 3085,
          "name": "James Caan",
          "character": "Sonny Corleone",
          "profile_path": "/z2Lz3rtxZ7aJjzBUkCnExvo8stn.jpg"
        },
        {
          "id": 3087,
          "name": "Robert Duvall",
          "character": "Tom Hagen",
          "profile_path": "/3tcKxC5Sc3DJ6XPDKKC2EAomEWn.jpg"
        },
        {
          "id": 3086,
          "name": "Richard S. Castellano",
          "character": "Clemenza",
          "profile_path": "/1vr75BdHWret81vuSJ3ugiCBkxw.jpg"
        }
      ],
      "crew": [
        {
          "id": 1776,
          "name": "Francis Ford Coppola",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/IwGgkmW6IoJ9vuNF0T9CU3FYUX.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "699896f6f8a060dd5dc998b3",
          "key": "kbKCCV2EAqo",
          "name": "Why This One Shot in ‘The Godfather’ Suddenly Feels Terrifying!",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        },
        {
          "id": "667c967ef8934b455d34b06d",
          "key": "tlFyyzXVEMk",
          "name": "Robert De Niro Auditioning for Sonny Corleone in The Godfather",
          "site": "YouTube",
          "type": "Behind the Scenes",
          "official": true
        }
      ]
    }
  },
  {
    "id": 240,
    "title": "The Godfather Part II",
    "overview": "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
    "poster_path": "/8a1lJs7mFyGhGhZZDT1azJUoQiZ.jpg",
    "backdrop_path": "/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
    "media_type": "movie",
    "genre_ids": [
      18,
      80
    ],
    "genres": [
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 80,
        "name": "Crime"
      }
    ],
    "release_date": "1974-12-20",
    "vote_average": 8.6,
    "vote_count": 14347,
    "popularity": 43.4056,
    "tagline": "The rise and fall of the Corleone empire.",
    "runtime": 202,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 1158,
          "name": "Al Pacino",
          "character": "Don Michael Corleone",
          "profile_path": "/m8HAAjq1T75JypKk0v1FFQn4ysZ.jpg"
        },
        {
          "id": 3087,
          "name": "Robert Duvall",
          "character": "Tom Hagen",
          "profile_path": "/3tcKxC5Sc3DJ6XPDKKC2EAomEWn.jpg"
        },
        {
          "id": 3092,
          "name": "Diane Keaton",
          "character": "Kay Corleone",
          "profile_path": "/A8B3BsFgbmw2WEmJuQX38qeU9eR.jpg"
        },
        {
          "id": 380,
          "name": "Robert De Niro",
          "character": "Vito Corleone",
          "profile_path": "/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg"
        },
        {
          "id": 3096,
          "name": "John Cazale",
          "character": "Frederico 'Fredo' Corleone",
          "profile_path": "/41wXX1FBalyIuf5eaA4S43Y8IfZ.jpg"
        }
      ],
      "crew": [
        {
          "id": 1776,
          "name": "Francis Ford Coppola",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/IwGgkmW6IoJ9vuNF0T9CU3FYUX.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "69e005e6302b4b20ffb4ce0f",
          "key": "XsB5DCfmHeM",
          "name": "Quentin Tarantino on The Godfather Part II",
          "site": "YouTube",
          "type": "Featurette",
          "official": false
        },
        {
          "id": "686a4b48a722d3894b1034aa",
          "key": "F1b6iSedYgQ",
          "name": "Al Pacino & Robert De Niro Praise Francis Ford Coppola: \"You Changed My Life\"",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        }
      ]
    }
  },
  {
    "id": 680,
    "title": "Pulp Fiction",
    "overview": "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
    "poster_path": "/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    "backdrop_path": "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    "media_type": "movie",
    "genre_ids": [
      53,
      80,
      35
    ],
    "genres": [
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 35,
        "name": "Comedy"
      }
    ],
    "release_date": "1994-09-10",
    "vote_average": 8.5,
    "vote_count": 30893,
    "popularity": 50.3016,
    "tagline": "You won’t know the facts until you’ve seen the fiction.",
    "runtime": 154,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 8891,
          "name": "John Travolta",
          "character": "Vincent Vega",
          "profile_path": "/ap8eEYfBKTLixmVVpRlq4NslDD5.jpg"
        },
        {
          "id": 2231,
          "name": "Samuel L. Jackson",
          "character": "Jules Winnfield",
          "profile_path": "/AiAYAqwpM5xmiFrAIeQvUXDCVvo.jpg"
        },
        {
          "id": 139,
          "name": "Uma Thurman",
          "character": "Mia Wallace",
          "profile_path": "/hlYG0MC6im0MHNq1xixxVilfwyR.jpg"
        },
        {
          "id": 62,
          "name": "Bruce Willis",
          "character": "Butch Coolidge",
          "profile_path": "/w3aXr1e7gQCn8MSp1vW4sXHn99P.jpg"
        },
        {
          "id": 10182,
          "name": "Ving Rhames",
          "character": "Marsellus Wallace",
          "profile_path": "/tOVDvu1EQP78AwaUw6uh1wN818E.jpg"
        }
      ],
      "crew": [
        {
          "id": 138,
          "name": "Quentin Tarantino",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/1gjcpAa99FAOWGnrUvHEXXsRs7o.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "670d5c15f58a9206aa4185d0",
          "key": "r1bm09Xxr0Q",
          "name": "Uma Thurman 'Wants To Dance' in Pulp Fiction w/ John Travolta",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "66239544e295b4018799c5ad",
          "key": "r2ycpVYNTXE",
          "name": "Pulp Fiction cast on meeting Tarantino and changing film history",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        }
      ]
    }
  },
  {
    "id": 550,
    "title": "Fight Club",
    "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    "poster_path": "/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg",
    "backdrop_path": "/c6OLXfKAk5BKeR6broC8pYiCquX.jpg",
    "media_type": "movie",
    "genre_ids": [
      18,
      53
    ],
    "genres": [
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 53,
        "name": "Thriller"
      }
    ],
    "release_date": "1999-10-15",
    "vote_average": 8.4,
    "vote_count": 32891,
    "popularity": 51.1733,
    "tagline": "Mischief. Mayhem. Soap.",
    "runtime": 139,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 819,
          "name": "Edward Norton",
          "character": "Narrator",
          "profile_path": "/8nytsqL59SFJTVYVrN72k6qkGgJ.jpg"
        },
        {
          "id": 287,
          "name": "Brad Pitt",
          "character": "Tyler Durden",
          "profile_path": "/ajNaPmXVVMJFg9GWmu6MJzTaXdV.jpg"
        },
        {
          "id": 1283,
          "name": "Helena Bonham Carter",
          "character": "Marla Singer",
          "profile_path": "/hJMbNSPJ2PCahsP3rNEU39C8GWU.jpg"
        },
        {
          "id": 7470,
          "name": "Meat Loaf",
          "character": "Robert Paulson",
          "profile_path": "/1zkohpaG3my4qQAZGVgzgPuXwZ6.jpg"
        },
        {
          "id": 7499,
          "name": "Jared Leto",
          "character": "Angel Face",
          "profile_path": "/ca3x0OfIKbJppZh8S1Alx3GfUZO.jpg"
        }
      ],
      "crew": [
        {
          "id": 7467,
          "name": "David Fincher",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/tpEczFclQZeKAiCeKZZ0adRvtfz.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "67c90f7a3dd7da394f24957b",
          "key": "V0Fqdb-smqo",
          "name": "Yeah... no wonder this movie never won an Oscar",
          "site": "YouTube",
          "type": "Featurette",
          "official": false
        },
        {
          "id": "64fb16fbdb4ed610343d72c3",
          "key": "dfeUzm6KF4g",
          "name": "20th Anniversary Trailer",
          "site": "YouTube",
          "type": "Trailer",
          "official": true
        }
      ]
    }
  },
  {
    "id": 603,
    "title": "The Matrix",
    "overview": "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    "poster_path": "/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg",
    "backdrop_path": "/lrtSb1skJayPydZk0OSMAKjBOVe.jpg",
    "media_type": "movie",
    "genre_ids": [
      28,
      878
    ],
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      }
    ],
    "release_date": "1999-03-31",
    "vote_average": 8.3,
    "vote_count": 28757,
    "popularity": 55.4924,
    "tagline": "Believe the unbelievable.",
    "runtime": 136,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 6384,
          "name": "Keanu Reeves",
          "character": "Neo",
          "profile_path": "/8RZLOyYGsoRe9p44q3xin9QkMHv.jpg"
        },
        {
          "id": 2975,
          "name": "Laurence Fishburne",
          "character": "Morpheus",
          "profile_path": "/2GbXERENPpl5MmlqOLlPVaVtifD.jpg"
        },
        {
          "id": 530,
          "name": "Carrie-Anne Moss",
          "character": "Trinity",
          "profile_path": "/9zya72vRZYBQILfetACsnmCBgdj.jpg"
        },
        {
          "id": 1331,
          "name": "Hugo Weaving",
          "character": "Agent Smith",
          "profile_path": "/lSC8Et0PYi5zeQb3IpPkFje7hgR.jpg"
        },
        {
          "id": 9364,
          "name": "Gloria Foster",
          "character": "Oracle",
          "profile_path": "/AriGXtC9fjBOia9Zr8CZjn4o3rx.jpg"
        }
      ],
      "crew": [
        {
          "id": 9340,
          "name": "Lana Wachowski",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/4nE4ttPQBuw1virOz0LYT08c1Vm.jpg"
        },
        {
          "id": 9339,
          "name": "Lilly Wachowski",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/rCScAjSpeKA19BLNR07MqNNeeTT.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a5232288f6851b82c66c30b",
          "key": "w-efbYj1YHA",
          "name": "How KEANU REEVES prepared for THE MATRIX",
          "site": "YouTube",
          "type": "Featurette",
          "official": false
        },
        {
          "id": "68f8cda9fa57a24031dbc45d",
          "key": "CF5bBZ2t130",
          "name": "Why The Wachowskis Invented \"Bullet Time” for 'The Matrix'",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        }
      ]
    }
  },
  {
    "id": 278,
    "title": "The Shawshank Redemption",
    "overview": "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    "poster_path": "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    "backdrop_path": "/pNjh59JSxChQktamG3LMp9ZoQzp.jpg",
    "media_type": "movie",
    "genre_ids": [
      18,
      80
    ],
    "genres": [
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 80,
        "name": "Crime"
      }
    ],
    "release_date": "1994-09-23",
    "vote_average": 8.7,
    "vote_count": 31367,
    "popularity": 78.69,
    "tagline": "Fear can hold you prisoner. Hope can set you free.",
    "runtime": 142,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 504,
          "name": "Tim Robbins",
          "character": "Andy Dufresne",
          "profile_path": "/3FfJMIVwXgsIXbAT8ECBSZJAncR.jpg"
        },
        {
          "id": 192,
          "name": "Morgan Freeman",
          "character": "Ellis Boyd 'Red' Redding",
          "profile_path": "/905k0RFzH0Kd6gx8oSxRdnr6FL.jpg"
        },
        {
          "id": 4029,
          "name": "Bob Gunton",
          "character": "Warden Norton",
          "profile_path": "/ulbVvuBToBN3aCGcV028hwO0MOP.jpg"
        },
        {
          "id": 6573,
          "name": "William Sadler",
          "character": "Heywood",
          "profile_path": "/rWeb2kjYCA7V9MC9kRwRpm57YoY.jpg"
        },
        {
          "id": 6574,
          "name": "Clancy Brown",
          "character": "Captain Byron T. Hadley",
          "profile_path": "/1JeBRNG7VS7r64V9lOvej9bZXW5.jpg"
        }
      ],
      "crew": [
        {
          "id": 4027,
          "name": "Frank Darabont",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/vZ50guP86otYTiBSGfi35GNHWVf.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "687a83653f1f6bc2bed98421",
          "key": "pYGf3p0mE60",
          "name": "Fresh Fish",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "6799573d83d7aae2f02791fb",
          "key": "BD0bC2inuAc",
          "name": "Brooks Was Here",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        }
      ]
    }
  },
  {
    "id": 13,
    "title": "Forrest Gump",
    "overview": "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
    "poster_path": "/Cw4hIUIAmSYfK9QfaUW5igp9La.jpg",
    "backdrop_path": "/66Kn4XWhkuPkJxOJyPEx4U2CUfN.jpg",
    "media_type": "movie",
    "genre_ids": [
      35,
      18,
      10749
    ],
    "genres": [
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10749,
        "name": "Romance"
      }
    ],
    "release_date": "1994-06-23",
    "vote_average": 8.5,
    "vote_count": 30483,
    "popularity": 46.8206,
    "tagline": "The world will never be the same once you've seen it through the eyes of Forrest Gump.",
    "runtime": 142,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 31,
          "name": "Tom Hanks",
          "character": "Forrest Gump",
          "profile_path": "/oFvZoKI6lvU03n4YoNGAll9rkas.jpg"
        },
        {
          "id": 32,
          "name": "Robin Wright",
          "character": "Jenny Curran",
          "profile_path": "/d3rIv0y2p0jMsQ7ViR7O1606NZa.jpg"
        },
        {
          "id": 33,
          "name": "Gary Sinise",
          "character": "Lieutenant Dan Taylor",
          "profile_path": "/olRjiV8ZhBixQiTvrGwXhpVXxsV.jpg"
        },
        {
          "id": 35,
          "name": "Sally Field",
          "character": "Mrs. Gump",
          "profile_path": "/iMeq1j9Xwvaf6PbTJ0FQz69fpuA.jpg"
        },
        {
          "id": 34,
          "name": "Mykelti Williamson",
          "character": "Bubba Blue",
          "profile_path": "/dR16zD9AjnHWbeN5OVmJWE0vSax.jpg"
        }
      ],
      "crew": [
        {
          "id": 24,
          "name": "Robert Zemeckis",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/lPYDQ5LYNJ12rJZENtyASmVZ1Ql.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a584715b338e71a2eeb1288",
          "key": "7kfYBYg59-E",
          "name": "Happy July Fourth!",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "6985e528bd8e9780ec99d6bc",
          "key": "TSzdSfG5cQU",
          "name": "Ping Pong",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        }
      ]
    }
  },
  {
    "id": 98,
    "title": "Gladiator",
    "overview": "After the death of Emperor Marcus Aurelius, his devious son takes power and demotes Maximus, one of Rome's most capable generals who Marcus preferred. Eventually, Maximus is forced to become a gladiator and battle to the death against other men for the amusement of paying audiences.",
    "poster_path": "/wN2xWp1eIwCKOD0BHTcErTBv1Uq.jpg",
    "backdrop_path": "/Ar7QuJ7sJEiC0oP3I8fKBKIQD9u.jpg",
    "media_type": "movie",
    "genre_ids": [
      28,
      18,
      12
    ],
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 12,
        "name": "Adventure"
      }
    ],
    "release_date": "2000-05-04",
    "vote_average": 8.2,
    "vote_count": 21507,
    "popularity": 43.4333,
    "tagline": "What we do in life echoes in eternity.",
    "runtime": 155,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 934,
          "name": "Russell Crowe",
          "character": "Maximus",
          "profile_path": "/uxiXuVH4vNWrKlJMVVPG1sxAJFe.jpg"
        },
        {
          "id": 73421,
          "name": "Joaquin Phoenix",
          "character": "Commodus",
          "profile_path": "/u38k3hQBDwNX0VA22aQceDp9Iyv.jpg"
        },
        {
          "id": 935,
          "name": "Connie Nielsen",
          "character": "Lucilla",
          "profile_path": "/gSQ3O3PJ6ly6nT63joOtfZyscFP.jpg"
        },
        {
          "id": 936,
          "name": "Oliver Reed",
          "character": "Proximo",
          "profile_path": "/dWfotc1X71wNCGyPO9hXpv8U9Gw.jpg"
        },
        {
          "id": 194,
          "name": "Richard Harris",
          "character": "Marcus Aurelius",
          "profile_path": "/oJIS8QUOCfLUhsfK7kROkLHVyJh.jpg"
        }
      ],
      "crew": [
        {
          "id": 578,
          "name": "Ridley Scott",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/zABJmN9opmqD4orWl3KSdCaSo7Q.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a8f43d6f06e8774b836f06f",
          "key": "64DXB0R4bIA",
          "name": "Adam Savage Reacts to the Original Concept Designs Behind 'Gladiator'",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        },
        {
          "id": "6a5e91c9b4e888b14a4b140a",
          "key": "mtGvNfvR3UY",
          "name": "Maximus Reveals His Identity to the Emperor",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        }
      ]
    }
  },
  {
    "id": 597,
    "title": "Titanic",
    "overview": "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic's departure through to its death—on its first and last voyage—on April 15, 1912.",
    "poster_path": "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    "backdrop_path": "/xXCuto8YVp5RFqBJ7yKmVmLOWpF.jpg",
    "media_type": "movie",
    "genre_ids": [
      18,
      10749
    ],
    "genres": [
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10749,
        "name": "Romance"
      }
    ],
    "release_date": "1997-12-18",
    "vote_average": 7.9,
    "vote_count": 27761,
    "popularity": 48.1437,
    "tagline": "Nothing on earth could come between them.",
    "runtime": 194,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 6193,
          "name": "Leonardo DiCaprio",
          "character": "Jack Dawson",
          "profile_path": "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg"
        },
        {
          "id": 204,
          "name": "Kate Winslet",
          "character": "Rose DeWitt Bukater",
          "profile_path": "/6qNnMsKtKz9si5rabpUEG85UfHp.jpg"
        },
        {
          "id": 1954,
          "name": "Billy Zane",
          "character": "Cal Hockley",
          "profile_path": "/wr4fuwLzQvW1G0MS7cmQ3ObFjvL.jpg"
        },
        {
          "id": 8534,
          "name": "Kathy Bates",
          "character": "Molly Brown",
          "profile_path": "/qZRTzTjV4OC1Ii9a0n8QBS9zMOd.jpg"
        },
        {
          "id": 3713,
          "name": "Frances Fisher",
          "character": "Ruth DeWitt Bukater",
          "profile_path": "/3iNDgd54IIj8g8hGqhhUjM6TeWd.jpg"
        }
      ],
      "crew": [
        {
          "id": 2710,
          "name": "James Cameron",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/2Hh4Jos62luf90CCglP5K32qaWO.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a8f4315a8d4a7f3f0019f32",
          "key": "U0J0wSSheQE",
          "name": "Before 'Titanic,' James Cameron Was Living in His Car!",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        },
        {
          "id": "6a1ef4a06bdbcacbbdca6288",
          "key": "rtHJY26iXng",
          "name": "From set to the big screen, see how Titanic was brought to life!",
          "site": "YouTube",
          "type": "Behind the Scenes",
          "official": true
        }
      ]
    }
  },
  {
    "id": 120,
    "title": "The Lord of the Rings: The Fellowship of the Ring",
    "overview": "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator. Along the way, a fellowship is formed to protect the ringbearer and make sure that the ring arrives at its final destination: Mt. Doom, the only place where it can be destroyed.",
    "poster_path": "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    "backdrop_path": "/oiwc338EoBgS4sEI2ixAny4KQKg.jpg",
    "media_type": "movie",
    "genre_ids": [
      12,
      14,
      28
    ],
    "genres": [
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 28,
        "name": "Action"
      }
    ],
    "release_date": "2001-12-18",
    "vote_average": 8.4,
    "vote_count": 28373,
    "popularity": 54.0189,
    "tagline": "One ring to rule them all.",
    "runtime": 179,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 109,
          "name": "Elijah Wood",
          "character": "Frodo",
          "profile_path": "/7UKRbJBNG7mxBl2QQc5XsAh6F8B.jpg"
        },
        {
          "id": 1327,
          "name": "Ian McKellen",
          "character": "Gandalf",
          "profile_path": "/5cnnnpnJG6TiYUSS7qgJheUZgnv.jpg"
        },
        {
          "id": 110,
          "name": "Viggo Mortensen",
          "character": "Aragorn",
          "profile_path": "/vH5gVSpHAMhDaFWfh0Q7BG61O1y.jpg"
        },
        {
          "id": 1328,
          "name": "Sean Astin",
          "character": "Sam",
          "profile_path": "/As3ctGUtBYmG4zj4Ifyrcqd71HP.jpg"
        },
        {
          "id": 65,
          "name": "Ian Holm",
          "character": "Bilbo",
          "profile_path": "/cOJDgvgj4nMec6Inzj1H5nugTO5.jpg"
        }
      ],
      "crew": [
        {
          "id": 108,
          "name": "Peter Jackson",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/bNc908d59Ba8VDNr4eCcm4G1cR.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "69f65ad81f282a7ccfdb3df3",
          "key": "9P-9uVo4zg4",
          "name": "Mountain Pass Battle",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "62ce1c99d14443004c263524",
          "key": "3JlFHcFDH-w",
          "name": "Middle Earth Costume Design",
          "site": "YouTube",
          "type": "Behind the Scenes",
          "official": true
        }
      ]
    }
  },
  {
    "id": 122,
    "title": "The Lord of the Rings: The Return of the King",
    "overview": "As armies mass for a final battle that will decide the fate of the world--and powerful, ancient forces of Light and Dark compete to determine the outcome--one member of the Fellowship of the Ring is revealed as the noble heir to the throne of the Kings of Men. Yet, the sole hope for triumph over evil lies with a brave hobbit, Frodo, who, accompanied by his loyal friend Sam and the hideous, wretched Gollum, ventures deep into the very dark heart of Mordor on his seemingly impossible quest to destroy the Ring of Power.​",
    "poster_path": "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    "backdrop_path": "/ctiw6FZK4N36LmkjSklWEbuvlq9.jpg",
    "media_type": "movie",
    "genre_ids": [
      12,
      14,
      28
    ],
    "genres": [
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 28,
        "name": "Action"
      }
    ],
    "release_date": "2003-12-17",
    "vote_average": 8.5,
    "vote_count": 27372,
    "popularity": 55.7679,
    "tagline": "There can be no triumph without loss. No victory without suffering. No freedom without sacrifice.",
    "runtime": 201,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 109,
          "name": "Elijah Wood",
          "character": "Frodo",
          "profile_path": "/7UKRbJBNG7mxBl2QQc5XsAh6F8B.jpg"
        },
        {
          "id": 1327,
          "name": "Ian McKellen",
          "character": "Gandalf",
          "profile_path": "/5cnnnpnJG6TiYUSS7qgJheUZgnv.jpg"
        },
        {
          "id": 110,
          "name": "Viggo Mortensen",
          "character": "Aragorn",
          "profile_path": "/vH5gVSpHAMhDaFWfh0Q7BG61O1y.jpg"
        },
        {
          "id": 1328,
          "name": "Sean Astin",
          "character": "Sam",
          "profile_path": "/As3ctGUtBYmG4zj4Ifyrcqd71HP.jpg"
        },
        {
          "id": 1333,
          "name": "Andy Serkis",
          "character": "Gollum / Smeagol",
          "profile_path": "/eNGqhebQ4cDssjVeNFrKtUvweV5.jpg"
        }
      ],
      "crew": [
        {
          "id": 108,
          "name": "Peter Jackson",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/bNc908d59Ba8VDNr4eCcm4G1cR.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "677c662ed9b0e70d5d7262c7",
          "key": "UCyqwsoISMs",
          "name": "Siege of Gondor Begins",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "677c669625e0e91c577528cd",
          "key": "aT3hPyEQOc4",
          "name": "You Bow to No One",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        }
      ]
    }
  },
  {
    "id": 1726,
    "title": "Iron Man",
    "overview": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
    "poster_path": "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    "backdrop_path": "/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg",
    "media_type": "movie",
    "genre_ids": [
      28,
      878,
      12
    ],
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 12,
        "name": "Adventure"
      }
    ],
    "release_date": "2008-04-30",
    "vote_average": 7.7,
    "vote_count": 28837,
    "popularity": 43.8454,
    "tagline": "Heroes aren't born. They're built.",
    "runtime": 126,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 3223,
          "name": "Robert Downey Jr.",
          "character": "Tony Stark",
          "profile_path": "/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg"
        },
        {
          "id": 18288,
          "name": "Terrence Howard",
          "character": "Rhodey",
          "profile_path": "/wXWt2NSY23v7DHe2yZQ1C8TikBp.jpg"
        },
        {
          "id": 1229,
          "name": "Jeff Bridges",
          "character": "Obadiah Stane",
          "profile_path": "/xms1RAY6q7Lzp7wNeRCB0kzhucn.jpg"
        },
        {
          "id": 12052,
          "name": "Gwyneth Paltrow",
          "character": "Pepper Potts",
          "profile_path": "/ylN4A7fnnNXvHURENl5sQI8Jbib.jpg"
        },
        {
          "id": 57451,
          "name": "Leslie Bibb",
          "character": "Christine Everhart",
          "profile_path": "/g3a1O9lOTZvrwQupUtg4Fc3CdTd.jpg"
        }
      ],
      "crew": [
        {
          "id": 15277,
          "name": "Jon Favreau",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/tnx7iMVydPQXGOoLsxXl84PXtbA.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a85bc2f0eb6af0c6db58469",
          "key": "fNj7ykvewGE",
          "name": "Tony Stark and Nick Fury - The Avenger Initiative - Official Clip",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "64768efbd3719700f9ca5d92",
          "key": "-bx4O7Ub1GY",
          "name": "Iron Man: 15 Years Later with Kevin Feige and Jon Favreau",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        }
      ]
    }
  },
  {
    "id": 299536,
    "title": "Avengers: Infinity War",
    "overview": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
    "poster_path": "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    "backdrop_path": "/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    "media_type": "movie",
    "genre_ids": [
      12,
      28,
      878
    ],
    "genres": [
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      }
    ],
    "release_date": "2018-04-25",
    "vote_average": 8.2,
    "vote_count": 32939,
    "popularity": 92.0113,
    "tagline": "An entire universe. Once and for all.",
    "runtime": 149,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 3223,
          "name": "Robert Downey Jr.",
          "character": "Tony Stark / Iron Man",
          "profile_path": "/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg"
        },
        {
          "id": 16828,
          "name": "Chris Evans",
          "character": "Steve Rogers / Captain America",
          "profile_path": "/3bOGNsHlrswhyW79uvIHH1V43JI.jpg"
        },
        {
          "id": 74568,
          "name": "Chris Hemsworth",
          "character": "Thor",
          "profile_path": "/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"
        },
        {
          "id": 16851,
          "name": "Josh Brolin",
          "character": "Thanos",
          "profile_path": "/sX2etBbIkxRaCsATyw5ZpOVMPTD.jpg"
        },
        {
          "id": 103,
          "name": "Mark Ruffalo",
          "character": "Bruce Banner / Hulk",
          "profile_path": "/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg"
        }
      ],
      "crew": [
        {
          "id": 19272,
          "name": "Joe Russo",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/o0OXjFzL10jCy89iAs7UzzSbyoK.jpg"
        },
        {
          "id": 19271,
          "name": "Anthony Russo",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/xbINBnWn28YygYWUJ1aSAw0xPRv.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a628189d46b5a86b43dd110",
          "key": "CCWEkf24Mew",
          "name": "Iron Man, Spider-Man and Doctor Strange's Park Fight - Official Clip",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "69c37f93b61ab4c85062e959",
          "key": "GyQVFOTmSC0",
          "name": "Spider-Man Meets Doctor Strange - Official Clip",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        }
      ]
    }
  },
  {
    "id": 299534,
    "title": "Avengers: Endgame",
    "overview": "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
    "poster_path": "/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
    "backdrop_path": "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    "media_type": "movie",
    "genre_ids": [
      12,
      878,
      28
    ],
    "genres": [
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 28,
        "name": "Action"
      }
    ],
    "release_date": "2019-04-24",
    "vote_average": 8.2,
    "vote_count": 28717,
    "popularity": 90.1636,
    "tagline": "Avenge the fallen.",
    "runtime": 181,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 3223,
          "name": "Robert Downey Jr.",
          "character": "Tony Stark / Iron Man",
          "profile_path": "/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg"
        },
        {
          "id": 16828,
          "name": "Chris Evans",
          "character": "Steve Rogers / Captain America",
          "profile_path": "/3bOGNsHlrswhyW79uvIHH1V43JI.jpg"
        },
        {
          "id": 103,
          "name": "Mark Ruffalo",
          "character": "Bruce Banner / Hulk",
          "profile_path": "/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg"
        },
        {
          "id": 74568,
          "name": "Chris Hemsworth",
          "character": "Thor",
          "profile_path": "/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"
        },
        {
          "id": 1245,
          "name": "Scarlett Johansson",
          "character": "Natasha Romanoff / Black Widow",
          "profile_path": "/tgxYh3jMs5bY2Ub4d2dcp9iaz1R.jpg"
        }
      ],
      "crew": [
        {
          "id": 19271,
          "name": "Anthony Russo",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/xbINBnWn28YygYWUJ1aSAw0xPRv.jpg"
        },
        {
          "id": 19272,
          "name": "Joe Russo",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/o0OXjFzL10jCy89iAs7UzzSbyoK.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6aae8306b5368943ce66f515",
          "key": "BQTIzuafllQ",
          "name": "ONE WEEK until we Assemble in IMAX.",
          "site": "YouTube",
          "type": "Teaser",
          "official": true
        },
        {
          "id": "6aa4981818a2bec17d35d5e8",
          "key": "Q9ay0wGluwY",
          "name": "Experience it all again.",
          "site": "YouTube",
          "type": "Teaser",
          "official": true
        }
      ]
    }
  },
  {
    "id": 329,
    "title": "Jurassic Park",
    "overview": "A wealthy entrepreneur secretly creates a theme park featuring living dinosaurs drawn from prehistoric DNA. Before opening day, he invites a team of experts and his two eager grandchildren to experience the park and help calm anxious investors. However, the park is anything but amusing as the security systems go off-line and the dinosaurs escape.",
    "poster_path": "/d9mtMGQDLANKieb9PbD3yK7xxzo.jpg",
    "backdrop_path": "/4SyDTF02R5BepqSdQmOaNCHObzF.jpg",
    "media_type": "movie",
    "genre_ids": [
      12,
      878
    ],
    "genres": [
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      }
    ],
    "release_date": "1993-06-11",
    "vote_average": 8,
    "vote_count": 18350,
    "popularity": 17.9609,
    "tagline": "An adventure 65 million years in the making.",
    "runtime": 127,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 4783,
          "name": "Sam Neill",
          "character": "Grant",
          "profile_path": "/iIfuxalf37xUayuGyK0zG7z6WEZ.jpg"
        },
        {
          "id": 4784,
          "name": "Laura Dern",
          "character": "Ellie",
          "profile_path": "/gB9PnGEvxKg33OSlcqptQwTBwPE.jpg"
        },
        {
          "id": 4785,
          "name": "Jeff Goldblum",
          "character": "Malcolm",
          "profile_path": "/kcyEPgYtBP5Pm6LLeLGfXKjYovL.jpg"
        },
        {
          "id": 4786,
          "name": "Richard Attenborough",
          "character": "Hammond",
          "profile_path": "/mJGvNS69xUqiNRybKzPl2Zuxe9Z.jpg"
        },
        {
          "id": 4789,
          "name": "Bob Peck",
          "character": "Muldoon",
          "profile_path": "/66wkMHY76swadwfHLcTEKEKhUbv.jpg"
        }
      ],
      "crew": [
        {
          "id": 488,
          "name": "Steven Spielberg",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/tZxcg19YQ3e8fJ0pOs7hjlnmmr6.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a25b1cd3ab250933438dd4e",
          "key": "Snk8rf0MIzw",
          "name": "Welcome To Jurassic Park - Extended Preview",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "6a25b1b5f70bae3e141137a1",
          "key": "JNJ2oYvzSCc",
          "name": "The Making of Jurassic Park - Full Documentary",
          "site": "YouTube",
          "type": "Behind the Scenes",
          "official": true
        }
      ]
    }
  },
  {
    "id": 105,
    "title": "Back to the Future",
    "overview": "Eighties teenager Marty McFly is accidentally sent back in time to 1955, inadvertently disrupting his parents' first meeting and attracting his mother's romantic interest. Marty must repair the damage to history by rekindling his parents' romance and - with the help of his eccentric inventor friend Doc Brown - return to 1985.",
    "poster_path": "/vN5B5WgYscRGcQpVhHl6p9DDTP0.jpg",
    "backdrop_path": "/5bzPWQ2dFUl2aZKkp7ILJVVkRed.jpg",
    "media_type": "movie",
    "genre_ids": [
      12,
      35,
      878
    ],
    "genres": [
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      }
    ],
    "release_date": "1985-07-03",
    "vote_average": 8.3,
    "vote_count": 22409,
    "popularity": 43.7074,
    "tagline": "He was never in time for his classes... He wasn't in time for his dinner... Then one day... he wasn't in his time at all.",
    "runtime": 116,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 521,
          "name": "Michael J. Fox",
          "character": "Marty McFly",
          "profile_path": "/2JB4FMgQmnhbBlQ4SxWFN9EIVDi.jpg"
        },
        {
          "id": 1062,
          "name": "Christopher Lloyd",
          "character": "Emmett Brown",
          "profile_path": "/nxVjpyb3UrfbPZnEyDNlQVlFAs5.jpg"
        },
        {
          "id": 1064,
          "name": "Crispin Glover",
          "character": "George McFly",
          "profile_path": "/imBnLpSXvg61qDDdEfvL6R4ITKt.jpg"
        },
        {
          "id": 1063,
          "name": "Lea Thompson",
          "character": "Lorraine Baines",
          "profile_path": "/n7qTKpbAbr2P1RlcW1Lq1NhckQ2.jpg"
        },
        {
          "id": 1066,
          "name": "Claudia Wells",
          "character": "Jennifer Parker",
          "profile_path": "/2VOsPvoV2vmEUd1O2KjW3kcN8JD.jpg"
        }
      ],
      "crew": [
        {
          "id": 24,
          "name": "Robert Zemeckis",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/lPYDQ5LYNJ12rJZENtyASmVZ1Ql.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6a445884aaea73c71242b564",
          "key": "sKyS8A5BZ6U",
          "name": "The Moment Marty Plays Johnny B Goode & Saves the Timeline",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        },
        {
          "id": "68fad6f2555e155f325a33d0",
          "key": "UZ9MH4iw03w",
          "name": "Back to Hill Valley - Bonus Feature",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        }
      ]
    }
  },
  {
    "id": 769,
    "title": "GoodFellas",
    "overview": "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway.",
    "poster_path": "/9OkCLM73MIU2CrKZbqiT8Ln1wY2.jpg",
    "backdrop_path": "/gILte6Zd7m1YneIr6MVhh30S9pr.jpg",
    "media_type": "movie",
    "genre_ids": [
      18,
      80
    ],
    "genres": [
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 80,
        "name": "Crime"
      }
    ],
    "release_date": "1990-09-12",
    "vote_average": 8.5,
    "vote_count": 14765,
    "popularity": 31.7253,
    "tagline": "Three decades of life in the mafia.",
    "runtime": 145,
    "age_rating": "PG-13",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 380,
          "name": "Robert De Niro",
          "character": "James Conway",
          "profile_path": "/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg"
        },
        {
          "id": 11477,
          "name": "Ray Liotta",
          "character": "Henry Hill",
          "profile_path": "/jdwGJbJNSRQiG2kB5MJxiu2clCQ.jpg"
        },
        {
          "id": 4517,
          "name": "Joe Pesci",
          "character": "Tommy DeVito",
          "profile_path": "/pEHQoL8yOndOq59iXlgsOpUTcTk.jpg"
        },
        {
          "id": 11478,
          "name": "Lorraine Bracco",
          "character": "Karen Hill",
          "profile_path": "/tAtpCzN4sTOy1RHpMpJj52zTO4S.jpg"
        },
        {
          "id": 7004,
          "name": "Paul Sorvino",
          "character": "Paul Cicero",
          "profile_path": "/1gF0UskusEdDcNaBDJ2CMsz5Agi.jpg"
        }
      ],
      "crew": [
        {
          "id": 1032,
          "name": "Martin Scorsese",
          "job": "Director",
          "department": "Directing",
          "profile_path": "/g3DjfKsgZQWZiw30I20hZVk1oMX.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "692f5de9839356a8bd3ead1b",
          "key": "9nCdSqmUWeU",
          "name": "How an Empty Lot Became Movie History in 'Goodfellas'!",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        },
        {
          "id": "6903a49a83cceb790a34cea0",
          "key": "5bHKQYrA_Is",
          "name": "Meeting The Wiseguys",
          "site": "YouTube",
          "type": "Clip",
          "official": true
        }
      ]
    }
  },
  {
    "id": 1396,
    "title": "Breaking Bad",
    "name": "Breaking Bad",
    "overview": "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
    "poster_path": "/anFx9aTOOYqgS3v7x3R84Kz67ly.jpg",
    "backdrop_path": "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    "media_type": "tv",
    "genre_ids": [
      18,
      80
    ],
    "genres": [
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 80,
        "name": "Crime"
      }
    ],
    "first_air_date": "2008-01-20",
    "release_date": "2008-01-20",
    "vote_average": 9,
    "vote_count": 18663,
    "popularity": 227.4384,
    "tagline": "Change the equation.",
    "number_of_seasons": 5,
    "number_of_episodes": 62,
    "age_rating": "TV-MA",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 17419,
          "name": "Bryan Cranston",
          "character": "Walter White",
          "profile_path": "/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg"
        },
        {
          "id": 84497,
          "name": "Aaron Paul",
          "character": "Jesse Pinkman",
          "profile_path": "/8Ac9uuoYwZoYVAIJfRLzzLsGGJn.jpg"
        },
        {
          "id": 134531,
          "name": "Anna Gunn",
          "character": "Skyler White",
          "profile_path": "/adppyeu1a4REN3khtgmXusrapFi.jpg"
        },
        {
          "id": 209674,
          "name": "RJ Mitte",
          "character": "Walter White Jr.",
          "profile_path": "/sNPA92ZrssYhlaB1UA2pWcLD9db.jpg"
        },
        {
          "id": 14329,
          "name": "Dean Norris",
          "character": "Hank Schrader",
          "profile_path": "/mKRrEbsxAX3ro700HsViFArRM7l.jpg"
        }
      ],
      "crew": [
        {
          "id": 24951,
          "name": "Peter Gould",
          "job": "Co-Executive Producer",
          "department": "Production",
          "profile_path": "/a2dJSpUiXQ2NAxqSzztr6WsnhOJ.jpg"
        },
        {
          "id": 103009,
          "name": "Thomas Schnauz",
          "job": "Co-Executive Producer",
          "department": "Production",
          "profile_path": "/uMz5wsgv6QQAgFI809SgCCbwYn9.jpg"
        }
      ]
    },
    "videos": {
      "results": []
    }
  },
  {
    "id": 1399,
    "title": "Game of Thrones",
    "name": "Game of Thrones",
    "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
    "poster_path": "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    "backdrop_path": "/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg",
    "media_type": "tv",
    "genre_ids": [
      10765,
      18,
      10759
    ],
    "genres": [
      {
        "id": 10765,
        "name": "Sci-Fi & Fantasy"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10759,
        "name": "Action & Adventure"
      }
    ],
    "first_air_date": "2011-04-17",
    "release_date": "2011-04-17",
    "vote_average": 8.5,
    "vote_count": 27784,
    "popularity": 220.024,
    "tagline": "Winter is coming.",
    "number_of_seasons": 8,
    "number_of_episodes": 73,
    "age_rating": "TV-MA",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 22970,
          "name": "Peter Dinklage",
          "character": "Tyrion 'The Halfman' Lannister",
          "profile_path": "/9CAd7wr8QZyIN0E7nm8v1B6WkGn.jpg"
        },
        {
          "id": 239019,
          "name": "Kit Harington",
          "character": "Jon Snow",
          "profile_path": "/iGXlJbExWwZmo9sUDsYuzf4Sv4y.jpg"
        },
        {
          "id": 12795,
          "name": "Nikolaj Coster-Waldau",
          "character": "Sir Jaime 'Kingslayer' Lannister",
          "profile_path": "/rpFOERbHkj7GWxkinUNiQ76sSGk.jpg"
        },
        {
          "id": 17286,
          "name": "Lena Headey",
          "character": "Cersei Lannister",
          "profile_path": "/cDyZLf8ddz0EgoUjpv4jjzy7qxA.jpg"
        },
        {
          "id": 1223786,
          "name": "Emilia Clarke",
          "character": "Daenerys Targaryen",
          "profile_path": "/iFY6t7Ux9r70WB7Sp0TTVz6eGtm.jpg"
        }
      ],
      "crew": [
        {
          "id": 2301155,
          "name": "Gursimran Sandhu",
          "job": "Staff Writer",
          "department": "Writing",
          "profile_path": null
        },
        {
          "id": 6168014,
          "name": "Ethan J. Antonucci",
          "job": "Staff Writer",
          "department": "Writing",
          "profile_path": null
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "64ec59a7e894a60101224a01",
          "key": "KPLWWIOCOOQ",
          "name": "Game of Thrones | Official Series Trailer",
          "site": "YouTube",
          "type": "Trailer",
          "official": true
        },
        {
          "id": "5c999b48c3a36863b73b9d42",
          "key": "y2ZJ3lTaREY",
          "name": "Inside Game of Thrones: A Story in Camera Work",
          "site": "YouTube",
          "type": "Behind the Scenes",
          "official": true
        }
      ]
    }
  },
  {
    "id": 1398,
    "title": "The Sopranos",
    "name": "The Sopranos",
    "overview": "The story of New Jersey-based Italian-American mobster Tony Soprano and the difficulties he faces as he tries to balance the conflicting requirements of his home life and the criminal organization he heads. Those difficulties are often highlighted through his ongoing professional relationship with psychiatrist Jennifer Melfi. The show features Tony's family members and Mafia associates in prominent roles and story arcs, most notably his wife Carmela and his cousin and protégé Christopher Moltisanti.",
    "poster_path": "/rTc7ZXdroqjkKivFPvCPX0Ru7uw.jpg",
    "backdrop_path": "/lNpkvX2s8LGB0mjGODMT4o6Up7j.jpg",
    "media_type": "tv",
    "genre_ids": [
      80,
      18
    ],
    "genres": [
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 18,
        "name": "Drama"
      }
    ],
    "first_air_date": "1999-01-10",
    "release_date": "1999-01-10",
    "vote_average": 8.7,
    "vote_count": 3683,
    "popularity": 139.6985,
    "tagline": "Family. Redefined.",
    "number_of_seasons": 6,
    "number_of_episodes": 86,
    "age_rating": "TV-MA",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 4691,
          "name": "James Gandolfini",
          "character": "Tony Soprano",
          "profile_path": "/vhtsFJZcfHdeDkFBoWMDzOS6xrP.jpg"
        },
        {
          "id": 36190,
          "name": "Edie Falco",
          "character": "Carmela Soprano",
          "profile_path": "/jS2Hnr5OmntpX0J7EpH70zAG0mz.jpg"
        },
        {
          "id": 99241,
          "name": "Jamie-Lynn Sigler",
          "character": "Meadow Soprano",
          "profile_path": "/Aur8H7qOzDUr9cRaqqOsCE5kLJp.jpg"
        },
        {
          "id": 1218240,
          "name": "Robert Iler",
          "character": "A.J. Soprano",
          "profile_path": "/vfTbVoV1Bp2fcDVHaGOIiQppk3J.jpg"
        },
        {
          "id": 11478,
          "name": "Lorraine Bracco",
          "character": "Jennifer Melfi",
          "profile_path": "/tAtpCzN4sTOy1RHpMpJj52zTO4S.jpg"
        }
      ],
      "crew": [
        {
          "id": 1799777,
          "name": "Eddy Vallante",
          "job": "Post Production Assistant",
          "department": "Crew",
          "profile_path": "/olECWZIo2JBzmyDedFYJb9ptTLe.jpg"
        },
        {
          "id": 1224015,
          "name": "Chris Collins",
          "job": "Writers' Assistant",
          "department": "Writing",
          "profile_path": null
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "659428cb6aa8e06277eb5cd6",
          "key": "Q8cBFvpqmH0",
          "name": "The Sopranos - Official Trailer | HBO Series",
          "site": "YouTube",
          "type": "Trailer",
          "official": false
        },
        {
          "id": "5eca2759140bad001c1a075d",
          "key": "hCDv1pHWPe0",
          "name": "The Sopranos Dictionary | HBO",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        }
      ]
    }
  },
  {
    "id": 1438,
    "title": "The Wire",
    "name": "The Wire",
    "overview": "Told from the points of view of both the Baltimore homicide and narcotics detectives and their targets, the series captures a universe in which the national war on drugs has become a permanent, self-sustaining bureaucracy, and distinctions between good and evil are routinely obliterated.",
    "poster_path": "/4lbclFySvugI51fwsyxBTOm4DqK.jpg",
    "backdrop_path": "/aQTtua5pG490fMfeKgtYg5B853e.jpg",
    "media_type": "tv",
    "genre_ids": [
      80,
      18
    ],
    "genres": [
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 18,
        "name": "Drama"
      }
    ],
    "first_air_date": "2002-06-02",
    "release_date": "2002-06-02",
    "vote_average": 8.6,
    "vote_count": 2823,
    "popularity": 69.994,
    "tagline": "Listen carefully.",
    "number_of_seasons": 5,
    "number_of_episodes": 60,
    "age_rating": "TV-MA",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 17287,
          "name": "Dominic West",
          "character": "Jimmy McNulty",
          "profile_path": "/6y2M3EWslBPwPlugEFg8XDHfSJ0.jpg"
        },
        {
          "id": 129101,
          "name": "Lance Reddick",
          "character": "Cedric Daniels",
          "profile_path": "/22mVtEXZbpt0J7S0LhIhdkfRrZV.jpg"
        },
        {
          "id": 203683,
          "name": "Sonja Sohn",
          "character": "Kima Greggs",
          "profile_path": "/ywx9VUp66kr7vt3xiSKHRtYBjw1.jpg"
        },
        {
          "id": 17859,
          "name": "Wendell Pierce",
          "character": "Bunk Moreland",
          "profile_path": "/r6yKahL6Z8l9aUX5qvWxTmWl8Nm.jpg"
        },
        {
          "id": 39390,
          "name": "Michael Kenneth Williams",
          "character": "Omar Little",
          "profile_path": "/mafEXtGlT1qYjGmZtbjo7Ep5qK3.jpg"
        }
      ],
      "crew": [
        {
          "id": 1224015,
          "name": "Chris Collins",
          "job": "Story Editor",
          "department": "Writing",
          "profile_path": null
        },
        {
          "id": 1618327,
          "name": "Gina Sansom",
          "job": "Post Production Assistant",
          "department": "Crew",
          "profile_path": null
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "644b893c51a64e088add34fa",
          "key": "hz401ifciSM",
          "name": "Behind The Scenes Series Featurette",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        },
        {
          "id": "63382572e8131d009152eb89",
          "key": "iNGQc6hDNvE",
          "name": "The Wire 20th Anniversary: ‘The King Stay the King’: In Conversation with Creator David Simon",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        }
      ]
    }
  },
  {
    "id": 60059,
    "title": "Better Call Saul",
    "name": "Better Call Saul",
    "overview": "Six years before Saul Goodman meets Walter White. We meet him when the man who will become Saul Goodman is known as Jimmy McGill, a small-time lawyer searching for his destiny, and, more immediately, hustling to make ends meet. Working alongside, and, often, against Jimmy, is “fixer” Mike Ehrmantraut. The series tracks Jimmy’s transformation into Saul Goodman, the man who puts “criminal” in “criminal lawyer\".",
    "poster_path": "/zjg4jpK1Wp2kiRvtt5ND0kznako.jpg",
    "backdrop_path": "/rfxryDIv8huejujg4JueDJx8zCz.jpg",
    "media_type": "tv",
    "genre_ids": [
      80,
      18
    ],
    "genres": [
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 18,
        "name": "Drama"
      }
    ],
    "first_air_date": "2015-02-08",
    "release_date": "2015-02-08",
    "vote_average": 8.7,
    "vote_count": 6887,
    "popularity": 101.1717,
    "tagline": "Putting the \"criminal\" in \"criminal lawyer.\"",
    "number_of_seasons": 6,
    "number_of_episodes": 63,
    "age_rating": "TV-MA",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 59410,
          "name": "Bob Odenkirk",
          "character": "Jimmy McGill",
          "profile_path": "/rF0Lb6SBhGSTvjRffmlKRSeI3jE.jpg"
        },
        {
          "id": 783,
          "name": "Jonathan Banks",
          "character": "Mike Ehrmantraut",
          "profile_path": "/bswk26L13PvY4iMTwUTAsepXCLv.jpg"
        },
        {
          "id": 62765,
          "name": "Rhea Seehorn",
          "character": "Kim Wexler",
          "profile_path": "/tql4gvY8NfYvmAdmdp1olkwJnrq.jpg"
        },
        {
          "id": 76855,
          "name": "Tony Dalton",
          "character": "Lalo Salamanca",
          "profile_path": "/vWteTJu9Dyrax7gQq8ndTjx5s6V.jpg"
        },
        {
          "id": 4808,
          "name": "Giancarlo Esposito",
          "character": "Gus Fring",
          "profile_path": "/rcXnr82TwDzU4ZGdBeNXfG0ZQnZ.jpg"
        }
      ],
      "crew": [
        {
          "id": 1223202,
          "name": "Diane Mercer",
          "job": "Executive Producer",
          "department": "Production",
          "profile_path": null
        },
        {
          "id": 1366450,
          "name": "Michael Morris",
          "job": "Executive Producer",
          "department": "Production",
          "profile_path": "/2tvHMQ1OcOUxeAMDQPI4cWGwnRo.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "6aa9a2e95179f3f3c1d82022",
          "key": "YvXi1epPptM",
          "name": "Exclusive Featurette Preview | Season 6 Blu-ray | Better Call Saul #bettercallsaul #shorts",
          "site": "YouTube",
          "type": "Featurette",
          "official": true
        },
        {
          "id": "6aa9a2639948757f20d8208c",
          "key": "0w8ClYZFXIg",
          "name": "Season 6 Gag Reel | BETTER CALL SAUL | Now on Blu-ray & DVD",
          "site": "YouTube",
          "type": "Bloopers",
          "official": true
        }
      ]
    }
  },
  {
    "id": 87108,
    "title": "Chernobyl",
    "name": "Chernobyl",
    "overview": "The true story of one of the worst man-made catastrophes in history: the catastrophic nuclear accident at Chernobyl. A tale of the brave men and women who sacrificed to save Europe from unimaginable disaster.",
    "poster_path": "/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
    "backdrop_path": "/900tHlUYUkp7Ol04XFSoAaEIXcT.jpg",
    "media_type": "tv",
    "genre_ids": [
      18
    ],
    "genres": [
      {
        "id": 18,
        "name": "Drama"
      }
    ],
    "first_air_date": "2019-05-06",
    "release_date": "2019-05-06",
    "vote_average": 8.7,
    "vote_count": 8317,
    "popularity": 39.9214,
    "tagline": "What is the cost of lies?",
    "number_of_seasons": 1,
    "number_of_episodes": 5,
    "age_rating": "TV-MA",
    "quality_badge": "4K UHD",
    "credits": {
      "cast": [
        {
          "id": 15440,
          "name": "Jared Harris",
          "character": "Valery Legasov",
          "profile_path": "/jAyPWkmge3BqXtgxIG9MfXBzOGj.jpg"
        },
        {
          "id": 1640,
          "name": "Stellan Skarsgård",
          "character": "Boris Shcherbina",
          "profile_path": "/mW7xmtGV4y79kQGn0zkKVGDMAmw.jpg"
        },
        {
          "id": 1639,
          "name": "Emily Watson",
          "character": "Ulana Khomyuk",
          "profile_path": "/bd0qiJXHoLNpkCqABsh67AKRtjC.jpg"
        },
        {
          "id": 52888,
          "name": "Paul Ritter",
          "character": "Anatoly Dyatlov",
          "profile_path": "/hYRSjC5vxrIFZ5sx1rM6V4ZEI8G.jpg"
        },
        {
          "id": 1498158,
          "name": "Jessie Buckley",
          "character": "Lyudmilla Ignatenko",
          "profile_path": "/qbz9175DERSqsCQeYWGJWwqb38z.jpg"
        }
      ],
      "crew": [
        {
          "id": 1495142,
          "name": "Chris Fry",
          "job": "Co-Executive Producer",
          "department": "Production",
          "profile_path": null
        },
        {
          "id": 1213459,
          "name": "Sanne Wohlenberg",
          "job": "Producer",
          "department": "Production",
          "profile_path": "/eHwHwjxS6xH8lPiZ1h0fko5lMZq.jpg"
        }
      ]
    },
    "videos": {
      "results": [
        {
          "id": "5c9d48c4c3a36854bad262d6",
          "key": "s9APLXM9Ei8",
          "name": "Official Trailer",
          "site": "YouTube",
          "type": "Trailer",
          "official": true
        },
        {
          "id": "5c86b433925141745818b4a7",
          "key": "PMlwjCID3Io",
          "name": "Teaser Trailer",
          "site": "YouTube",
          "type": "Trailer",
          "official": true
        }
      ]
    }
  },
  // --- IMPORTED NETOUT CATALOG (Placed after blockbusters with low-popularity horror moved to the back) ---
  ...NETOUT_IMPORTED_CATALOG.filter((m) => m.id !== 1284041),
  ...NETOUT_IMPORTED_MOVIES.filter((m) => m.id !== 1284041 && !NETOUT_IMPORTED_CATALOG.some((c) => c.id === m.id)),
  ...NETOUT_IMPORTED_CATALOG.filter((m) => m.id === 1284041),
];

// Deduplicate strictly by unique ID to prevent React duplicate key warnings
const seenMediaIds = new Set<number>();
export const MOCK_MEDIA_ITEMS: MediaItem[] = RAW_MOCK_MEDIA_ITEMS.filter((item) => {
  if (seenMediaIds.has(item.id)) return false;
  seenMediaIds.add(item.id);
  return true;
});

// Helper to filter kids-safe content (Family, Animation, PG, PG-13, no horror or adult R)
export function getKidsContent(items: MediaItem[]): MediaItem[] {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => {
    if (!item) return false;
    if (item.adult) return false;
    if (item.age_rating === "R" || item.age_rating === "TV-MA") return false;
    const gIds = Array.isArray(item.genre_ids) ? item.genre_ids : [];
    if (gIds.includes(27)) return false; // Exclude Horror
    return (
      gIds.includes(10751) || // Family
      gIds.includes(16) || // Animation
      item.age_rating === "PG" ||
      item.age_rating === "TV-PG" ||
      item.age_rating === "G"
    );
  });
}
