# 50/50 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page, scroll-driven birthday playlist site with era-shifting aesthetics, deployed to GitHub Pages.

**Architecture:** Pure HTML/CSS/JS single page. GSAP + ScrollTrigger for scroll-driven animations. Song data in a JS array. Album art as placeholder gradients until Spotify API integration. Five visual eras with distinct palettes, textures, and card styles — all within a pink/purple/black colour family.

**Tech Stack:** HTML5, CSS3 (custom properties, transforms, filters), vanilla JS, GSAP 3 + ScrollTrigger, GitHub Pages.

---

### Task 1: Project Scaffolding & Hero Section

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/data.js`
- Create: `js/app.js`

**Step 1: Create index.html with base structure**

Set up the HTML shell: meta tags, font imports, GSAP CDN links, CSS/JS references. Include the hero section with "50/50" title and the five era containers (empty for now). Mobile-first viewport meta.

**Step 2: Create css/style.css with CSS custom properties and hero styles**

Define the full colour system as CSS custom properties on `:root`. Build the hero section: full-viewport, dark background, neon "50/50" title with glow effect, scroll-down indicator. Add the base body styles (black background, smooth scroll, hidden horizontal overflow). Add the CRT scanline overlay as a pseudo-element.

**Step 3: Create js/data.js with the 20 known tracks**

Populate a `TRACKS` array with all 20 tracks from the playlist screenshots. Each track has: title, artist, album, year (personal year, best guess for now), era, spotifyUrl (blank), message (placeholder), imageUrl (blank — will use generated gradient placeholders).

**Step 4: Create js/app.js — basic initialisation**

Set up DOMContentLoaded listener, render track cards into era sections from data, initialise GSAP ScrollTrigger.

**Step 5: Open in browser and verify**

Run: `open index.html` or use Live Server
Expected: Dark page, neon "50/50" hero title with glow, five empty era sections below.

**Step 6: Commit**

```bash
git add index.html css/ js/
git commit -m "feat: project scaffolding with hero section and track data"
```

---

### Task 2: Era Sections & Gradient Transitions

**Files:**
- Modify: `index.html` — add era section markup with era headers
- Modify: `css/style.css` — era-specific gradient backgrounds, era header typography
- Modify: `js/app.js` — GSAP ScrollTrigger for gradient transitions between eras

**Step 1: Add era section markup to index.html**

Five `<section>` elements with `data-era` attributes ("80s", "90s", "00s", "2010s", "2020s"). Each has an era header with the era name (Side A, Side B, Track 3, Now Playing, The B-Side) and year range. Add a persistent year counter element fixed to the viewport.

**Step 2: Style era sections in CSS**

Each era section gets its own background gradient using CSS custom properties:
- 80s: warm neon pink → deep purple
- 90s: dark moodier purple → near-black
- 00s: silver-pink shimmer → chrome purple
- 2010s: clean flat purple → dark with spotify-green accent
- 2020s: rich warm purple → deep pink

Style the era headers with era-appropriate typography (we'll use Google Fonts: Pacifico for 80s script, a system font stack for 90s grunge, Inter for 2010s clean, etc).

**Step 3: Wire up GSAP ScrollTrigger for background transitions**

As each era section enters the viewport, smoothly transition the page background gradient. The year counter updates as you scroll. Use `ScrollTrigger.create()` with `onUpdate` callbacks to interpolate colours.

**Step 4: Verify in browser**

Scroll through the page — background gradients should morph smoothly between eras, year counter should tick up.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: era sections with scroll-driven gradient transitions and year counter"
```

---

### Task 3: Song Cards — Layout & Flip Interaction

**Files:**
- Modify: `css/style.css` — card styles, flip animation, era-specific card treatments
- Modify: `js/app.js` — render cards from data, flip interaction handler

**Step 1: Build the card component CSS**

3D flip card: `.card` container with `.card-front` and `.card-back` faces. Front shows the image (or a gradient placeholder). Back shows the personal message + Spotify link. `transform-style: preserve-3d`, `backface-visibility: hidden`, `transition: transform 0.6s`.

**Step 2: Add era-specific card frame styles**

- 80s cards: `transform: rotate(-2deg)` (slightly askew), torn-edge `clip-path`, tape/pin decoration via pseudo-elements, heavy `box-shadow` glow
- 90s cards: cassette J-card border styling, slight VHS distortion filter, `rotate(1deg)`
- 00s cards: jewel case border with iridescent gradient border, subtle shimmer animation
- 2010s cards: clean rounded corners, minimal shadow, flat design
- 2020s cards: large format, gatefold aspect ratio, warm glow

**Step 3: Render cards from data in JS**

Loop through `TRACKS`, create card elements, inject into the correct era section. Front face gets a gradient placeholder (coloured by era) with track title/artist overlaid. Back face gets the message and a Spotify icon link.

**Step 4: Add flip interaction**

Desktop: flip on hover (CSS `:hover` on `.card` triggers `rotateY(180deg)`).
Mobile: flip on tap (JS click handler toggles `.flipped` class).

**Step 5: Verify**

Cards render in era sections. Hovering flips them. Mobile tap works. Era-specific styling visible.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: song cards with era-specific styling and flip interaction"
```

---

### Task 4: Scroll Animations — Cards Entering the Viewport

**Files:**
- Modify: `js/app.js` — GSAP ScrollTrigger animations for card entry
- Modify: `css/style.css` — initial hidden states for cards

**Step 1: Set initial card states**

Cards start invisible and offset: `opacity: 0`, `translateY: 60px`. Era-specific entry variations:
- 80s/90s: also slightly rotated on entry (`rotate: -3deg` to `0deg`)
- 00s: scale from 0.9 to 1
- 2010s: clean slide up only
- 2020s: fade + slight rotation back

**Step 2: Wire GSAP ScrollTrigger per card**

Each card gets a `ScrollTrigger` that fires when it enters 80% from the top of the viewport. Animate to `opacity: 1`, `translateY: 0`, era-specific properties. Stagger cards within the same era section.

**Step 3: Add parallax to background decorative elements**

Floating background elements (stars, notes, vinyl fragments — CSS-generated) move at different scroll speeds via `ScrollTrigger` with `scrub: true`.

**Step 4: Verify**

Scroll slowly — cards should animate in with era-appropriate motion. Background elements drift with parallax.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: scroll-triggered card animations with era-specific motion"
```

---

### Task 5: Year Counter & Era Navigation

**Files:**
- Modify: `css/style.css` — year counter styling, nav dots
- Modify: `js/app.js` — year counter logic, era nav click handlers

**Step 1: Style the year counter**

Fixed position on the left side of the viewport. Large, bold, monospace font. Neon glow text-shadow. The counter updates as you scroll — showing the current year based on scroll position (1980 at the top, 2026 at the bottom).

**Step 2: Style the era navigation dots**

Five small dots/markers on the right side, fixed position. Each labelled with the era name on hover. Active dot glows brighter. Clicking scrolls to that era section.

**Step 3: Wire up year counter in JS**

Use `ScrollTrigger.create()` on the full page. Map scroll progress (0–1) to year range (1980–2026). Update the counter element text. Optionally add a subtle counting animation.

**Step 4: Wire up nav dots**

Click handler on each dot calls `gsap.to(window, { scrollTo: eraSectionElement })`.

**Step 5: Verify**

Year counter ticks smoothly as you scroll. Nav dots highlight correctly. Clicking jumps to era.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: year counter and era navigation"
```

---

### Task 6: Textures, Effects & Polish

**Files:**
- Modify: `css/style.css` — CRT overlay, grain, glow effects, era-specific textures
- Create: `css/textures.css` — separated texture/effect styles
- Modify: `js/app.js` — texture intensity tied to scroll position

**Step 1: CRT scanline overlay**

A full-viewport pseudo-element with repeating-linear-gradient creating horizontal scanlines. `pointer-events: none`. Opacity varies by era (heavy in 80s, fades out by 2010s, subtle return in 2020s). Tied to scroll position via GSAP.

**Step 2: Film grain effect**

CSS animation on a pseudo-element with a noise background. Subtle, randomised opacity flicker. Heaviest in 80s/90s sections.

**Step 3: Neon glow system**

Reusable `.neon-glow` class with `text-shadow` and `box-shadow` using the accent colours. A subtle CSS animation that pulses the glow. Applied to interactive elements, era headers, year counter.

**Step 4: Era-specific decorative elements**

- 80s: Floating palm tree silhouettes, neon grid lines (CSS perspective grid)
- 90s: VHS tracking line distortion (a thin horizontal bar that drifts)
- 00s: Subtle iridescent shimmer on backgrounds
- 2010s: Clean, minimal — maybe just a subtle EQ bar animation
- 2020s: Floating vinyl grooves pattern, warm analog noise

**Step 5: Verify**

Each era should feel distinctly different as you scroll through. Textures should be atmospheric, not distracting.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: era-specific textures, CRT overlay, film grain, and neon effects"
```

---

### Task 7: Responsive & Mobile

**Files:**
- Modify: `css/style.css` — responsive breakpoints, touch interactions, mobile layout

**Step 1: Mobile card layout**

Cards go single-column on screens < 768px. Card size increases relative to viewport. Flip interaction switches from hover to tap (already handled in Task 3, verify here).

**Step 2: Year counter mobile position**

Move from left side to top-centre on mobile. Smaller font size but still visible.

**Step 3: Era nav mobile**

Bottom of screen, horizontal dots instead of vertical. Or hide and rely on scroll.

**Step 4: Performance check**

Reduce particle count on mobile. Simplify scanline overlay. Test with Chrome DevTools device emulation.

**Step 5: `prefers-reduced-motion` support**

Media query that disables parallax, card entry animations, and particle effects. Cards simply appear. Gradient transitions still work.

**Step 6: Verify on mobile emulator**

Test iPhone SE, iPhone 14, iPad. Smooth scroll, cards flip on tap, year counter visible.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: responsive layout, mobile touch interactions, reduced motion support"
```

---

### Task 8: Spotify Integration Script

**Files:**
- Create: `scripts/fetch-playlist.js` — Node script to pull playlist data from Spotify API
- Modify: `js/data.js` — updated with real data from Spotify

**Step 1: Create the fetch script**

A Node.js script that:
1. Takes Client ID + Client Secret as env vars
2. Authenticates with Spotify API (client credentials flow)
3. Fetches playlist by ID (3Kk6r9hmwCe0J8lKW7zG14)
4. Extracts: track name, artist, album, album art URL (300px), Spotify track URL
5. Outputs a JSON array matching our data schema

**Step 2: Run the script**

```bash
SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=xxx node scripts/fetch-playlist.js > js/data-spotify.json
```

**Step 3: Merge with personal data**

Manually merge the Spotify data with personal years, era assignments, and messages in `js/data.js`. Replace gradient placeholders with real album art URLs.

**Step 4: Verify**

Page now shows real album covers. All 20 (and eventually 50) tracks render correctly.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: Spotify playlist integration script and real album art"
```

---

### Task 9: GitHub Pages Deployment

**Files:**
- Potentially create: `.github/workflows/deploy.yml` (if using Actions) or just push to main
- Verify: all asset paths are relative

**Step 1: Ensure all paths are relative**

Check all CSS/JS/image references use relative paths (no leading `/`). GitHub Pages serves from root or `/5050/` depending on config.

**Step 2: Push to GitHub**

```bash
git remote add origin <repo-url>  # if not already
git push -u origin main
```

**Step 3: Enable GitHub Pages**

Settings → Pages → Source: Deploy from branch → Branch: main, folder: / (root).

**Step 4: Verify live site**

Visit `https://<username>.github.io/5050/` and test full scroll experience.

**Step 5: Commit any path fixes**

```bash
git add -A
git commit -m "fix: relative paths for GitHub Pages deployment"
```

---

## Task Dependency Order

```
Task 1 (scaffolding)
  → Task 2 (era sections)
    → Task 3 (cards)
      → Task 4 (scroll animations)
      → Task 5 (year counter & nav)
    → Task 6 (textures & polish)
  → Task 7 (responsive) — can run after Task 3
  → Task 8 (Spotify) — can run after Task 1, independent
Task 9 (deploy) — after everything
```

Tasks 4+5 can run in parallel after Task 3. Task 7 can start after Task 3. Task 8 is independent once scaffolding exists.
