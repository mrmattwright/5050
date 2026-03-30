#!/usr/bin/env node

// Tiny dev server that serves the site AND lets the admin page save data.js directly
// Usage: node scripts/admin-server.js
// Then open http://localhost:8050/test/edit-memories.html

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8050;
const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'js', 'data.js');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // ── Save endpoint ──
  if (req.method === 'POST' && req.url === '/api/save-data') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        fs.writeFileSync(DATA_PATH, body, 'utf-8');
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ ok: true }));
        console.log(`Saved data.js (${body.length} bytes)`);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // ── CORS preflight ──
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  // ── Static file server ──
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  50/50 Admin Server running on http://localhost:${PORT}`);
  console.log(`  Edit memories: http://localhost:${PORT}/test/edit-memories.html`);
  console.log(`  Preview site:  http://localhost:${PORT}/\n`);
});
