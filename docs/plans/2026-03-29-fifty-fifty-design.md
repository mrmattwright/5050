# 50/50 — Design Brief

**A 50th birthday playlist site. 50 songs. One life. Scroll through it.**

---

## Concept

A single-page vertical scroll experience that takes visitors on a journey through 46 years of music (1980–2026). As you scroll deeper, you travel forward through time — the aesthetic, textures, format, and *fidelity* of how music is presented shifts to match each era.

Think Neal.fun's *The Deep Sea* meets Purple Disco Machine meets Miami Vice — but with the feel of thumbing through old copies of Rolling Stone. Torn edges, pinned clippings, scribbled notes. A music scrapbook drenched in neon.

This is not a Spotify embed with a nice background. This is high art. A love letter to music, wrapped in neon and nostalgia.

---

## The Journey

### Structure

The page is one continuous vertical scroll, divided into five eras. Each era has its own visual identity, but transitions are smooth — gradients morph, textures crossfade, the world shifts around you as you scroll.

Roughly ~10 songs per era, ~1 song per year of life (born 1976, starting from 1980).

| Era | Years | Format | Visual Identity |
|-----|-------|--------|-----------------|
| **Side A** | 1980–1989 | Vinyl | Deep purples, analog warmth, record groove textures, Miami Vice neon. The Paradise image energy lives here. Raw, zine-like, photocopied-in-purple. |
| **Side B** | 1990–1999 | Cassette → Technics 1200s | Grungier, rawer. Hand-written cassette labels, pencil-rewind iconography, VHS distortion. Late 90s transitions to DJ culture — **Technics 1200s**, scratched records, club flyers. Deeper, moodier purples. |
| **Track 3** | 2000–2009 | MiniDisc → CD | Opens with a **MiniDisc player** (a personal artifact). Transitions to Y2K chrome, iridescent disc reflections, silver-pink shimmer. Fidelity starts to clean up — less zine, more magazine. |
| **Now Playing** | 2010–2019 | Streaming | Cleanest era. Waveforms, EQ visualiser bars, flat-design-meets-festival-LED-walls. A hint of Spotify green creeping into the purple palette. More personal photos appear here. |
| **The B-Side** | 2020–2026 | Vinyl redux | Full circle. Back to analog warmth but with modern polish. The synthwave palette returns, richer than before. Tactile again — gatefold sleeves, premium feel. The future is retro. |

### Era Names

The above era names (Side A, Side B, Track 3, Now Playing, The B-Side) are suggestions — riffing on the format metaphor. Open to change.

### Format Artifacts

Physical objects that appear as scroll landmarks / section dividers:

- **80s:** Vinyl record sleeves, turntable tone arms
- **Early 90s:** Cassette tapes, hand-scrawled mixtape labels, pencil-in-reel iconography
- **Late 90s:** **Technics SL-1200s** — the decks, a crossfader, club flyers, DJ culture
- **Early 00s:** **MiniDisc player** — a personal deep cut, the format nobody else remembers
- **Mid/Late 00s:** Jewel cases, CDs, iPod silhouettes
- **2010s:** Streaming UI elements, festival wristbands, phone screens
- **2020s:** Vinyl gatefolds, premium packaging, back to physical

---

## Song Cards

### Front Face

Each card shows **one image**:
- **Your personal photo** if you have one (these win — especially post-2000)
- **Album cover** as fallback if no personal photo

The image is presented in an era-appropriate frame:
- **80s:** Torn-edge clipping, pinned/taped to the page, slightly askew
- **90s:** Cassette J-card insert, hand-labelled, photocopied feel
- **Late 90s:** Club flyer aesthetic, bold type, 1200s context
- **00s:** MiniDisc/jewel case frame, iridescent shimmer overlay
- **2010s:** Clean streaming card, waveform accent
- **2020s:** Gatefold vinyl sleeve, large format, premium

### Back Face (Hover / Tap)

On hover (desktop) or tap (mobile), the card **flips** to reveal:

- **1–2 sentence personal message** — what this track means to you
- **Spotify link** (small, tasteful icon)
- Styled to match the era — handwritten-feel in early decades, cleaner later

The interaction should feel like turning over a record sleeve to read the liner notes.

---

## Visual Design

### Palette

Rooted in the reference image (Paradise — purple/pink synthwave sunset). **The pink/purple/black palette is the constant thread across all eras** — even when the texture and fidelity shifts, the colour family stays.

- **Primary darks:** Deep black (#0a0a0a), midnight purple (#1a0a2e)
- **Primary accents:** Neon pink (#ff2d95), electric purple (#b026ff), hot magenta (#ff00ff)
- **Supporting:** Cyan highlights (#00f0ff) for contrast moments, warm gold (#ffd700) for vinyl-era warmth
- **Era shifts within the palette:**
  - 80s — warm neon pink/purple, saturated, glowing
  - 90s — darker, moodier purples, desaturated, grittier
  - 00s — silver/chrome pink, iridescent, shimmer
  - 2010s — cleaner, flatter purple, minimal, a whisper of Spotify green
  - 2020s — rich, warm purple/pink returns, deeper and more refined than the 80s

### Aesthetic: The Evolving Scrapbook

The visual fidelity evolves through the eras, but always within the purple palette:

| Era | Fidelity | Feel |
|-----|----------|------|
| **80s** | Raw, zine-like | Photocopied in purple. Torn edges, tape marks, things pinned askew. Rolling Stone collage energy. |
| **90s** | Grungier, hand-made | Hand-scrawled labels, VHS tracking lines, club flyer typography. Still messy, but with attitude. |
| **00s** | Cleaning up | More magazine than zine. Iridescent surfaces, chrome accents. The mess starts to organise. |
| **2010s** | Clean, digital | Flat, minimal, polished. The streaming era. Cards are neat, type is system-font clean. |
| **2020s** | Warm polish | Tactile again but refined. Gatefold quality. The scrapbook returns, but curated. |

### Typography

- **80s:** Brush script, neon glow — Miami Vice energy
- **90s:** Grunge type, hand-scrawled, ransom-note headers
- **00s:** Y2K futurism, clean sans with chrome effects
- **2010s:** Minimal sans-serif, Helvetica/Inter vibes
- **2020s:** Modern display type with retro warmth
- **Personal messages:** Always readable — clean sans-serif regardless of era
- **Year markers:** Bold, oversized, partially transparent as background texture

### Textures & Effects

- CRT scanlines / film grain (era-dependent — heavy in 80s/90s, gone by 2010s, subtle return in 2020s)
- Neon glow on interactive elements (always, it's the constant)
- Parallax layers — background elements scroll at different speeds
- Smooth gradient transitions between eras
- Torn paper edges, tape marks, pin holes (80s/90s)
- Iridescent shimmer overlays (00s)
- Stars/particles in the background, drifting slowly

---

## Scroll Experience

### Year Counter

A persistent year counter on the side (or top) — ticks up as you scroll, anchoring you in time. Styled to match the current era:
- 80s: Neon radio dial / frequency display
- 90s: VHS counter / tape deck display
- 00s: Digital LCD
- 2010s: Minimal, flat
- 2020s: Warm, analog-styled digital

### Navigation

- **Scroll is primary** — the whole point is the journey
- **Era jump nav** — small, unobtrusive dots or decade markers on the side for quick access
- **Progress indicator** — subtle bar or line showing how far through the timeline you are

### Scroll Animations

Each song card enters the viewport with motion:
- Cards drift in slightly askew (80s/90s), slide in clean (2010s)
- Staggered timing if multiple cards are close together
- Parallax drift on background elements
- Era transitions trigger background gradient morphs, texture swaps
- Format artifacts (1200s, MiniDisc player, etc.) appear as scroll-triggered landmarks between sections

Performance matters — all animations should be CSS/GPU-accelerated. Smooth on mobile.

---

## Technical Approach

### Stack

- **Pure HTML/CSS/JS** — no framework needed, this is a single page
- **GSAP + ScrollTrigger** — industry standard for scroll-driven animation, lightweight
- **GitHub Pages** — static hosting, no build step required (or minimal)
- **Responsive** — mobile-first, works beautifully on phones (vertical scroll is native there)

### Assets

- **Album art / personal photos:** ~50 images, optimised (WebP, lazy-loaded, ~300px squares)
- **Format artifacts:** Illustrated or photographed Technics 1200s, MiniDisc player, cassettes, vinyl — could be SVG, PNG, or CSS-generated
- **Background textures:** Lightweight SVG/CSS patterns where possible
- **Fonts:** 2-3 web fonts max, loaded async

### Data

Song data stored in a simple JSON array:

```json
{
  "title": "Track Name",
  "artist": "Artist",
  "year": 1992,
  "era": "90s",
  "image": "images/track-name.webp",
  "imageType": "personal",
  "spotifyUrl": "https://open.spotify.com/track/...",
  "message": "The first song I ever taped off the radio. Still remember the DJ talking over the intro."
}
```

`imageType` is either `"personal"` or `"album"` — determines which image is shown on the front.

### Performance

- Intersection Observer for lazy-loading images and triggering animations
- CSS transforms only (no layout thrashing)
- Reduced motion media query support
- Target: 90+ Lighthouse performance score

---

## Content Needed From You

1. **The 50 songs** — artist, track name, year (the year it matters to *you*, not release year)
2. **Personal photos** — where you have them (especially post-2000)
3. **Album art** — we'll source via Spotify API for tracks without personal photos
4. **Personal messages** — 1-2 sentences per track. The heart of the whole thing.
5. **Spotify links** — playlist link + individual track links
6. **Your name / headline text** — "50/50" or whatever you want up top
7. **The Paradise image** — as hero/background for the opening section
8. **Any physical artifacts you want photographed** — your actual 1200s? Your MiniDisc player?

---

## Inspiration References

| Reference | What to steal |
|-----------|---------------|
| [Neal.fun - The Deep Sea](https://neal.fun/deep-sea/) | Single-axis scroll storytelling, things emerging from darkness, year counter |
| [50 Years of Swiss Music Charts](https://50-jahre-hitparade.ch/) | Music as glowing points on dark background, audio changes with scroll position |
| [The Boat (SBS)](https://www.sbs.com.au/theboat/) | Dark background, illustrations emerging from blackness, audio tied to scroll |
| [Firewatch](https://www.firewatchgame.com/) | Multi-layer parallax silhouettes, colour gradient transitions |
| [In Pieces](http://species-in-pieces.com/) | Pure CSS geometric morphing between sections |
| [B-boy Lilou timeline](https://bboylilou.redbull.com/en/) | Chronological life story, year-based navigation |
| [Synthwave CodePens](https://speckyboy.com/css-javascript-snippets-synthwave/) | Neon grids, flickering text, retro CSS effects |
| [Spotify Wrapped](https://newsroom.spotify.com/2024-12-04/10-years-spotify-wrapped/) | Personal data as art, bold colour, playful motion |
| [Codrops scroll demos](https://tympanus.net/codrops/tag/scroll/) | Scroll-driven grid animations, parallax techniques |
| [Every Last Drop](http://everylastdrop.co.uk/) | Scene-by-scene parallax journey through environments |

---

## What This Is Not

- Not a blog post with an embedded playlist
- Not a corporate "about me" page
- Not a template
- Not subtle
- Not polished — it's *raw*

This is a **full-screen, immersive, emotional, interactive scrapbook** drenched in purple neon — part Rolling Stone, part mixtape liner notes, part love letter to 50 years of music.
