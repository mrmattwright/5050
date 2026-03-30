#!/usr/bin/env node

// Downloads album art from Spotify CDN to local img/covers/ directory
// and updates js/data.js to reference local paths instead of CDN URLs.
//
// Usage: node scripts/fetch-album-art.js [--dry-run]
//
// Reads track data from js/data.js, downloads each album cover image,
// and rewrites data.js with local image paths.

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const SCRIPT_DIR = __dirname;
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '..');
const DATA_PATH = path.join(PROJECT_ROOT, 'js', 'data.js');
const COVERS_DIR = path.join(PROJECT_ROOT, 'img', 'covers');

// ── Slugify an artist name for filenames ──────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

// ── Download a URL to a file, following redirects ─────────────
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, (response) => {
      // Follow redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', reject);
    });

    request.on('error', reject);
    request.setTimeout(15000, () => {
      request.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

// ── Parse data.js to extract track data ───────────────────────
function parseDataJs() {
  if (!fs.existsSync(DATA_PATH)) {
    console.error(`data.js not found at ${DATA_PATH}`);
    console.error('Run fetch-playlist.js first.');
    process.exit(1);
  }

  const content = fs.readFileSync(DATA_PATH, 'utf-8');

  // Extract individual track blocks
  const tracksMatch = content.match(/const TRACKS\s*=\s*\[([\s\S]*?)\];/);
  if (!tracksMatch) {
    console.error('Could not parse TRACKS array from data.js');
    process.exit(1);
  }

  const tracksBody = tracksMatch[1];
  const tracks = [];

  const trackRegex = /\{[^{}]*\}/g;
  let match;
  while ((match = trackRegex.exec(tracksBody)) !== null) {
    const block = match[0];

    const title = extractStringField(block, 'title');
    const artist = extractStringField(block, 'artist');
    const imageUrl = extractStringField(block, 'imageUrl');
    const spotifyUrl = extractStringField(block, 'spotifyUrl');

    if (title) {
      tracks.push({ title, artist, imageUrl, spotifyUrl });
    }
  }

  return { content, tracks };
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

// ── Determine image extension from content-type or URL ────────
function getExtension(url) {
  // Spotify CDN images are typically JPEG
  if (url.includes('.jpg') || url.includes('.jpeg')) return '.jpg';
  if (url.includes('.png')) return '.png';
  if (url.includes('.webp')) return '.webp';
  // Default to .jpg for Spotify CDN images (they serve JPEG)
  return '.jpg';
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  const dryRun = process.argv.includes('--dry-run');

  const { content, tracks } = parseDataJs();

  if (tracks.length === 0) {
    console.error('No tracks found in data.js');
    process.exit(1);
  }

  console.log(`Found ${tracks.length} tracks in data.js`);

  // Create covers directory
  if (!dryRun && !fs.existsSync(COVERS_DIR)) {
    fs.mkdirSync(COVERS_DIR, { recursive: true });
    console.log(`Created ${COVERS_DIR}`);
  }

  // Download each album cover
  let updatedContent = content;
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i];
    const imageUrl = track.imageUrl;

    // Skip if already a local path
    if (!imageUrl || imageUrl.startsWith('img/')) {
      console.log(`  [${i + 1}/${tracks.length}] ${track.title} - already local, skipping`);
      skipped++;
      continue;
    }

    // Skip if not an HTTP URL
    if (!imageUrl.startsWith('http')) {
      console.log(`  [${i + 1}/${tracks.length}] ${track.title} - not a URL, skipping`);
      skipped++;
      continue;
    }

    const ext = getExtension(imageUrl);
    const artistSlug = slugify(track.artist);
    const filename = `${String(i + 1).padStart(2, '0')}-${artistSlug}${ext}`;
    const localPath = path.join(COVERS_DIR, filename);
    const relativePath = `img/covers/${filename}`;

    if (dryRun) {
      console.log(`  [${i + 1}/${tracks.length}] Would download: ${track.title} by ${track.artist}`);
      console.log(`    ${imageUrl}`);
      console.log(`    -> ${relativePath}`);
      // Still update the content string for dry-run preview
      updatedContent = updatedContent.replace(imageUrl, relativePath);
      downloaded++;
      continue;
    }

    // Check if file already exists and has content
    if (fs.existsSync(localPath)) {
      const stat = fs.statSync(localPath);
      if (stat.size > 0) {
        console.log(`  [${i + 1}/${tracks.length}] ${track.title} - already downloaded, updating path`);
        updatedContent = updatedContent.replace(imageUrl, relativePath);
        skipped++;
        continue;
      }
    }

    try {
      console.log(`  [${i + 1}/${tracks.length}] Downloading: ${track.title} by ${track.artist}...`);
      await downloadFile(imageUrl, localPath);

      const stat = fs.statSync(localPath);
      console.log(`    -> ${relativePath} (${(stat.size / 1024).toFixed(1)} KB)`);

      // Replace the CDN URL with the local path in the file content
      updatedContent = updatedContent.replace(imageUrl, relativePath);
      downloaded++;

      // Small delay to be polite to Spotify CDN
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (err) {
      console.error(`    FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nSummary: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed`);

  // Write updated data.js
  if (dryRun) {
    console.log('\n--- DRY RUN (would update data.js with local paths) ---');
    console.log('First few lines of updated data.js:');
    const previewLines = updatedContent.split('\n').slice(0, 30);
    console.log(previewLines.join('\n'));
    console.log('...');
  } else if (downloaded > 0) {
    fs.writeFileSync(DATA_PATH, updatedContent, 'utf-8');
    console.log(`Updated ${DATA_PATH} with local image paths`);
  } else {
    console.log('No new downloads; data.js unchanged.');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
