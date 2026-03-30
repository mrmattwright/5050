#!/usr/bin/env node

// Fetches playlist data from Spotify API and writes js/data.js
// Usage: node scripts/fetch-playlist.js [--dry-run]
//
// Reads SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET from ../.env
// Preserves any manually-set year, era, and message values in existing data.js

const fs = require('fs');
const path = require('path');

const PLAYLIST_ID = '3Kk6r9hmwCe0J8lKW7zG14';
const PLAYLIST_URL = 'https://open.spotify.com/playlist/3Kk6r9hmwCe0J8lKW7zG14';

const ERAS = {
  "80s":   { name: "Side A",      years: "1980\u20131989", tagline: "Vinyl", color: "#ff2d95" },
  "90s":   { name: "Side B",      years: "1990\u20131999", tagline: "Cassette \u2192 Technics 1200s", color: "#b026ff" },
  "00s":   { name: "Track 3",     years: "2000\u20132009", tagline: "MiniDisc \u2192 CD", color: "#c77dff" },
  "2010s": { name: "Now Playing", years: "2010\u20132019", tagline: "Streaming", color: "#7b2ff7" },
  "2020s": { name: "The B-Side",  years: "2020\u20132026", tagline: "Vinyl Redux", color: "#ff2d95" }
};

// ── Resolve paths relative to this script's location ──────────
const SCRIPT_DIR = __dirname;
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '..');
const ENV_PATH = path.join(PROJECT_ROOT, '.env');
const DATA_PATH = path.join(PROJECT_ROOT, 'js', 'data.js');

// ── Load .env file ────────────────────────────────────────────
function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) {
    console.error(`No .env file found at ${ENV_PATH}`);
    console.error('Create one with SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET');
    process.exit(1);
  }

  const contents = fs.readFileSync(ENV_PATH, 'utf-8');
  const env = {};
  for (const line of contents.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    env[key] = value;
  }
  return env;
}

// ── Spotify Auth ──────────────────────────────────────────────
async function getAccessToken(clientId, clientSecret) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    },
    body: 'grant_type=client_credentials'
  });

  const data = await res.json();
  if (!data.access_token) {
    console.error('Spotify auth failed:', data);
    process.exit(1);
  }
  return data.access_token;
}

// ── Fetch all playlist tracks (handles pagination) ────────────
async function getPlaylistTracks(token) {
  // Try the main playlist endpoint first (includes first page of tracks)
  const playlistRes = await fetch(
    `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  const playlist = await playlistRes.json();

  if (playlist.error) {
    console.error('Spotify API error:', playlist.error);
    process.exit(1);
  }

  // Check if tracks were included in the response
  if (!playlist.tracks || !playlist.tracks.items || playlist.tracks.items.length === 0) {
    console.error('');
    console.error('Could not fetch track data from Spotify API.');
    console.error('');
    console.error('This is likely because your Spotify app needs "Extended Quota Mode".');
    console.error('Spotify restricted access to track/playlist data for apps in');
    console.error('"Development Mode" (limited to 25 users you manually approve).');
    console.error('');
    console.error('To fix this, either:');
    console.error('  1. Request Extended Quota Mode in your Spotify Developer Dashboard');
    console.error('     https://developer.spotify.com/dashboard');
    console.error('  2. Or manually edit js/data.js with your track data');
    console.error('');
    console.error(`Playlist "${playlist.name || PLAYLIST_ID}" was found but tracks were not accessible.`);
    process.exit(1);
  }

  const allItems = [...playlist.tracks.items];
  let nextUrl = playlist.tracks.next;

  // Fetch remaining pages if the playlist has more than 100 tracks
  while (nextUrl) {
    const res = await fetch(nextUrl, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.error) {
      console.error('Spotify API error fetching next page:', data.error);
      break;
    }
    allItems.push(...data.items);
    nextUrl = data.next || null;
  }

  return allItems;
}

// ── Auto-assign era based on year ─────────────────────────────
function assignEra(year) {
  if (!year) return '80s';
  if (year < 1990) return '80s';
  if (year < 2000) return '90s';
  if (year < 2010) return '00s';
  if (year < 2020) return '2010s';
  return '2020s';
}

// ── Parse existing data.js to preserve manual edits ───────────
function parseExistingData() {
  if (!fs.existsSync(DATA_PATH)) return {};

  const content = fs.readFileSync(DATA_PATH, 'utf-8');

  // Extract the TRACKS array by finding it and eval-ing it in a sandboxed way
  // We look for tracks by their spotifyUrl as unique key
  const existing = {};

  // Use a simple regex-based approach to extract track objects
  // Match each { ... } block inside the TRACKS array
  const tracksMatch = content.match(/const TRACKS\s*=\s*\[([\s\S]*?)\];/);
  if (!tracksMatch) return existing;

  const tracksBody = tracksMatch[1];

  // Extract individual track objects
  const trackRegex = /\{[^{}]*\}/g;
  let match;
  while ((match = trackRegex.exec(tracksBody)) !== null) {
    const block = match[0];

    // Extract fields with regex (no comment stripping needed -- field
    // extraction regexes match quoted values which won't be confused
    // with comments, and numeric fields match before any trailing comment)
    const spotifyUrl = extractStringField(block, 'spotifyUrl');
    const title = extractStringField(block, 'title');
    const artist = extractStringField(block, 'artist');

    if (!spotifyUrl && !title) continue;

    const year = extractNumberField(block, 'year');
    const era = extractStringField(block, 'era');
    const message = extractStringField(block, 'message');
    const imageUrl = extractStringField(block, 'imageUrl');

    // Use spotifyUrl as primary key, fall back to title+artist
    const key = spotifyUrl || `${title}|||${artist}`;
    existing[key] = { year, era, message, imageUrl };
  }

  return existing;
}

function extractStringField(block, fieldName) {
  // Try double-quoted first, then single-quoted
  const dqRegex = new RegExp(`${fieldName}:\\s*"([^"]*)"`);
  const dqMatch = block.match(dqRegex);
  if (dqMatch) return dqMatch[1];

  const sqRegex = new RegExp(`${fieldName}:\\s*'([^']*)'`);
  const sqMatch = block.match(sqRegex);
  return sqMatch ? sqMatch[1] : '';
}

function extractNumberField(block, fieldName) {
  const regex = new RegExp(`${fieldName}:\\s*(\\d+)`);
  const match = block.match(regex);
  return match ? parseInt(match[1]) : null;
}

// ── Escape a string for JS output ─────────────────────────────
function jsString(s) {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}

// ── Generate the data.js content ──────────────────────────────
function generateDataJs(tracks) {
  const lines = [];
  lines.push('// Playlist order IS the timeline \u2014 don\'t reorder by release year');
  lines.push('const TRACKS = [');

  // Group tracks by era for section comments
  let currentEra = null;

  const eraComments = {
    '80s':   '// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n  // SIDE A \u2014 1980s \u2014 Vinyl\n  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550',
    '90s':   '// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n  // SIDE B \u2014 1990s \u2014 Cassette \u2192 Technics 1200s\n  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550',
    '00s':   '// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n  // TRACK 3 \u2014 2000s \u2014 MiniDisc \u2192 CD\n  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550',
    '2010s': '// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n  // NOW PLAYING \u2014 2010s \u2014 Streaming\n  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550',
    '2020s': '// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n  // THE B-SIDE \u2014 2020s \u2014 Vinyl Redux\n  // \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550'
  };

  for (let i = 0; i < tracks.length; i++) {
    const t = tracks[i];

    // Insert era section comment when era changes
    if (t.era !== currentEra) {
      currentEra = t.era;
      if (i > 0) lines.push('');
      lines.push(`  ${eraComments[t.era] || `// ${t.era}`}`);
    }

    const yearComment = t._yearIsPersonal ? '' : ' // personal year \u2014 edit this';
    const eraComment = t._eraIsPersonal ? '' : ' // auto-assigned from year \u2014 edit this';
    const messageComment = t.message ? '' : ' // your memory';

    lines.push('  {');
    lines.push(`    title: "${jsString(t.title)}",`);
    lines.push(`    artist: "${jsString(t.artist)}",`);
    lines.push(`    year: ${t.year},${yearComment}`);
    lines.push(`    era: "${jsString(t.era)}",${eraComment}`);
    lines.push(`    imageUrl: "${jsString(t.imageUrl)}",`);
    lines.push(`    spotifyUrl: "${jsString(t.spotifyUrl)}",`);
    lines.push(`    message: "${jsString(t.message)}"${messageComment}`);

    const isLast = i === tracks.length - 1;
    lines.push(`  }${isLast ? '' : ','}`);
  }

  lines.push('];');
  lines.push('');
  lines.push(`const PLAYLIST_URL = "${PLAYLIST_URL}";`);
  lines.push('');
  lines.push('const ERAS = {');

  const eraKeys = Object.keys(ERAS);
  eraKeys.forEach((key, i) => {
    const e = ERAS[key];
    const comma = i < eraKeys.length - 1 ? ',' : '';
    // Pad the key for alignment
    const paddedKey = `"${key}"`.padEnd(7);
    lines.push(`  ${paddedKey}: { name: "${e.name}", years: "${e.years}", tagline: "${e.tagline}", color: "${e.color}" }${comma}`);
  });

  lines.push('};');
  lines.push('');

  return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  const dryRun = process.argv.includes('--dry-run');

  // Load credentials from .env
  const env = loadEnv();
  const clientId = env.SPOTIFY_CLIENT_ID;
  const clientSecret = env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env');
    process.exit(1);
  }

  console.log('Authenticating with Spotify...');
  const token = await getAccessToken(clientId, clientSecret);

  console.log('Fetching playlist tracks...');
  const items = await getPlaylistTracks(token);
  console.log(`Found ${items.length} tracks`);

  // Load existing personal data to preserve manual edits
  const existingData = parseExistingData();
  const preservedCount = Object.keys(existingData).length;
  if (preservedCount > 0) {
    console.log(`Loaded ${preservedCount} existing tracks from data.js for merge`);
  }

  // Build track objects
  const tracks = items.map((item, i) => {
    const track = item.track;
    if (!track) {
      console.warn(`  Skipping position ${i + 1}: no track data (may be a local file)`);
      return null;
    }

    const album = track.album;
    const images = album.images || [];
    // Get 300px image, or largest available
    const image = images.find(img => img.width === 300) || images[0] || {};
    const releaseYear = parseInt(album.release_date?.substring(0, 4)) || null;

    const spotifyUrl = track.external_urls?.spotify || '';
    const title = track.name;
    const artist = track.artists.map(a => a.name).join(', ');

    // Look up existing data by spotifyUrl first, then by title+artist
    const existingByUrl = existingData[spotifyUrl];
    const existingByName = existingData[`${title}|||${artist}`];
    const existing = existingByUrl || existingByName || {};

    // Preserve manually-set values; fall back to auto-generated
    const hasPersonalYear = existing.year != null && existing.year !== releaseYear;
    const personalYear = existing.year || releaseYear;

    const autoEra = assignEra(personalYear);
    const hasPersonalEra = existing.era && existing.era !== autoEra && existing.era !== assignEra(releaseYear);
    const personalEra = existing.era || autoEra;

    const personalMessage = existing.message || '';

    // Preserve local image paths if they exist
    const existingImage = existing.imageUrl || '';
    const imageUrl = existingImage.startsWith('img/') ? existingImage : (image.url || '');

    return {
      title,
      artist,
      year: personalYear,
      era: personalEra,
      imageUrl,
      spotifyUrl,
      message: personalMessage,
      // Internal flags for comment generation (not written to output)
      _yearIsPersonal: hasPersonalYear,
      _eraIsPersonal: hasPersonalEra,
    };
  }).filter(Boolean);

  // Generate output
  const output = generateDataJs(tracks);

  if (dryRun) {
    console.log('\n--- DRY RUN (would write to js/data.js) ---\n');
    console.log(output);
  } else {
    // Ensure js/ directory exists
    const jsDir = path.join(PROJECT_ROOT, 'js');
    if (!fs.existsSync(jsDir)) {
      fs.mkdirSync(jsDir, { recursive: true });
    }

    fs.writeFileSync(DATA_PATH, output, 'utf-8');
    console.log(`Wrote ${tracks.length} tracks to ${DATA_PATH}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
