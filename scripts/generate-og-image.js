#!/usr/bin/env node
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 1200, H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// Background — dark with purple gradient
const bg = ctx.createRadialGradient(W/2, H*1.2, 0, W/2, H/2, W*0.8);
bg.addColorStop(0, '#3d1259');
bg.addColorStop(0.4, '#0a0014');
bg.addColorStop(1, '#000000');
ctx.fillStyle = bg;
ctx.fillRect(0, 0, W, H);

// Vinyl record
const cx = W/2, cy = H/2;
const vinylR = 240;

// Outer disc
const discGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, vinylR);
discGrad.addColorStop(0, '#222');
discGrad.addColorStop(0.3, '#151515');
discGrad.addColorStop(0.31, '#1a1a1a');
discGrad.addColorStop(0.7, '#111');
discGrad.addColorStop(0.88, '#1a1a1a');
discGrad.addColorStop(0.95, '#2a2a2a');
discGrad.addColorStop(1, '#333');
ctx.beginPath();
ctx.arc(cx, cy, vinylR, 0, Math.PI * 2);
ctx.fillStyle = discGrad;
ctx.fill();

// Edge highlight
ctx.beginPath();
ctx.arc(cx, cy, vinylR, 0, Math.PI * 2);
ctx.strokeStyle = 'rgba(255,255,255,0.15)';
ctx.lineWidth = 1.5;
ctx.stroke();

// Grooves — concentric rings
for (let r = vinylR * 0.35; r < vinylR * 0.95; r += 3) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(255,255,255,${0.04 + Math.random() * 0.03})`;
  ctx.lineWidth = 0.5;
  ctx.stroke();
}

// Sheen / light reflection
const sheen = ctx.createLinearGradient(cx - vinylR, cy - vinylR, cx + vinylR, cy + vinylR);
sheen.addColorStop(0, 'rgba(255,255,255,0)');
sheen.addColorStop(0.2, 'rgba(255,255,255,0.04)');
sheen.addColorStop(0.3, 'rgba(255,45,149,0.06)');
sheen.addColorStop(0.42, 'rgba(255,255,255,0)');
sheen.addColorStop(0.55, 'rgba(176,38,255,0.08)');
sheen.addColorStop(0.68, 'rgba(255,255,255,0)');
sheen.addColorStop(0.8, 'rgba(255,255,255,0.03)');
sheen.addColorStop(1, 'rgba(255,255,255,0)');
ctx.beginPath();
ctx.arc(cx, cy, vinylR - 2, 0, Math.PI * 2);
ctx.fillStyle = sheen;
ctx.fill();

// Label
const labelR = vinylR * 0.33;
const labelGrad = ctx.createRadialGradient(cx - labelR*0.2, cy - labelR*0.3, 0, cx, cy, labelR);
labelGrad.addColorStop(0, '#3d1259');
labelGrad.addColorStop(0.4, '#2d0a3e');
labelGrad.addColorStop(1, '#1a0525');
ctx.beginPath();
ctx.arc(cx, cy, labelR, 0, Math.PI * 2);
ctx.fillStyle = labelGrad;
ctx.fill();
ctx.strokeStyle = 'rgba(255,45,149,0.3)';
ctx.lineWidth = 2;
ctx.stroke();

// Label glow
ctx.shadowColor = 'rgba(255,45,149,0.3)';
ctx.shadowBlur = 20;
ctx.beginPath();
ctx.arc(cx, cy, labelR, 0, Math.PI * 2);
ctx.strokeStyle = 'rgba(255,45,149,0.2)';
ctx.lineWidth = 1;
ctx.stroke();
ctx.shadowBlur = 0;

// Spindle hole
ctx.beginPath();
ctx.arc(cx, cy + 8, 5, 0, Math.PI * 2);
ctx.fillStyle = '#000';
ctx.fill();
ctx.strokeStyle = 'rgba(255,255,255,0.08)';
ctx.lineWidth = 1;
ctx.stroke();

// 50/50 title
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = 'italic 62px Georgia, serif';
ctx.fillStyle = '#ff2d95';
ctx.shadowColor = 'rgba(255,45,149,0.6)';
ctx.shadowBlur = 15;
ctx.fillText('50/50', cx, cy - 22);
ctx.shadowBlur = 0;

// A SIDE
ctx.font = 'bold 14px Inter, Helvetica, sans-serif';
ctx.fillStyle = 'rgba(255,255,255,0.55)';
ctx.textAlign = 'right';
ctx.fillText('A', cx - 18, cy + 14);
ctx.font = '8px Inter, Helvetica, sans-serif';
ctx.fillStyle = 'rgba(255,255,255,0.3)';
ctx.fillText('SIDE', cx - 14, cy + 26);

// LP1 / 33 RPM
ctx.font = 'bold 14px Inter, Helvetica, sans-serif';
ctx.fillStyle = 'rgba(255,255,255,0.55)';
ctx.textAlign = 'left';
ctx.fillText('LP1', cx + 18, cy + 14);
ctx.font = '8px Inter, Helvetica, sans-serif';
ctx.fillStyle = 'rgba(255,255,255,0.3)';
ctx.fillText('33 RPM', cx + 14, cy + 26);

// Subtitle text
ctx.textAlign = 'center';
ctx.font = '600 13px Inter, Helvetica, sans-serif';
ctx.fillStyle = 'rgba(255,255,255,0.4)';
ctx.letterSpacing = '0.2em';
ctx.fillText('50 MEMORIES  ·  50 SONGS', cx, cy + labelR + 40);

// Outer glow on record
ctx.beginPath();
ctx.arc(cx, cy, vinylR + 4, 0, Math.PI * 2);
ctx.strokeStyle = 'rgba(255,45,149,0.08)';
ctx.lineWidth = 8;
ctx.stroke();

// Save
const out = path.join(__dirname, '..', 'img', 'og-image.png');
fs.writeFileSync(out, canvas.toBuffer('image/png'));
console.log(`OG image saved to ${out} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);
