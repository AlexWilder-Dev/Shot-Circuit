// One-off asset build: web-sized photos, og.jpg, favicon and apple-touch-icon.
// Run with `npm run og`. Sources live in research/.
import sharp from 'sharp';
import opentype from 'opentype.js';
import { readFileSync, writeFileSync, statSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const research = (p) => root + 'research/' + p;
const pub = (p) => root + 'public/' + p;

const FASCIA = '#003fff';
const SIGN_WHITE = '#f5f9ff';
const BOLT = '#00d9ff';

const wm = readFileSync(root + 'src/brand/wordmark.ts', 'utf8');
const WM = {
  width: +wm.match(/width: ([\d.]+)/)[1],
  height: +wm.match(/height: ([\d.]+)/)[1],
  shot: JSON.parse(wm.match(/shot: (".*")/)[1]),
  circui: JSON.parse(wm.match(/circui: (".*")/)[1]),
};

// Barlow Condensed is not installed system-wide, so the small sign lines are drawn
// from the same font file via opentype.js.
const font = opentype.parse(readFileSync(root + 'scripts/fonts/BarlowCondensed-700.ttf').buffer);
const r = (n) => String(Math.round(n * 10) / 10);
const toD = (cmds) => cmds.map((c) => {
  if (c.type === 'M' || c.type === 'L') return c.type + r(c.x) + ' ' + r(c.y);
  if (c.type === 'Q') return 'Q' + r(c.x1) + ' ' + r(c.y1) + ' ' + r(c.x) + ' ' + r(c.y);
  if (c.type === 'C') return 'C' + r(c.x1) + ' ' + r(c.y1) + ' ' + r(c.x2) + ' ' + r(c.y2) + ' ' + r(c.x) + ' ' + r(c.y);
  return 'Z';
}).join('');
function textPath(text, x, y, size, track = 0, anchor = 'start') {
  const glyphs = font.stringToGlyphs(text);
  const scale = size / font.unitsPerEm;
  let width = 0;
  glyphs.forEach((g) => (width += g.advanceWidth * scale + track));
  width -= track;
  let pen = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x;
  let d = '';
  for (const g of glyphs) {
    d += toD(g.getPath(pen, y, size).commands);
    pen += g.advanceWidth * scale + track;
  }
  return d;
}

// ---------- photos ----------
const photos = [
  ['DSC09696-1.jpg', 'counter-night', [640, 1024]],
  ['DSC09323-scaled.jpg', 'fascia', [800, 1400]],
  ['IMG_1838.jpg', 'front-day', [640, 1100]],
  ['IMG_1839.jpg', 'bar-staff', [640, 1100]],
  ['IMG_1840.jpg', 'layered-shots', [640, 1100]],
  ['IMG_1841.jpg', 'noon-tumbler', [640, 1100]],
];
for (const [src, name, widths] of photos) {
  for (const w of widths) {
    await sharp(research('photos/' + src)).rotate().resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true }).toFile(pub(`photos/${name}-${w}.jpg`));
  }
}
await sharp(research('video/maxresdefault.jpg')).resize({ width: 960 })
  .jpeg({ quality: 76, mozjpeg: true }).toFile(pub('photos/route-video-960.jpg'));

// ---------- og.jpg: the fascia over the open shopfront ----------
const W = 1200, H = 630, BAND = 282;
const wmW = 790, wmScale = wmW / WM.width, wmH = WM.height * wmScale;
const wmX = (W - wmW) / 2, wmY = 36;
const band = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${BAND}" viewBox="0 0 ${W} ${BAND}">
  <rect width="${W}" height="${BAND}" fill="${FASCIA}"/>
  <g transform="translate(${wmX} ${wmY}) scale(${wmScale})" fill="${SIGN_WHITE}">
    <path d="${WM.shot}"/><path d="${WM.circui}"/>
  </g>
  <path fill="${SIGN_WHITE}" d="${textPath('SHOOTER BAR', W / 2, wmY + wmH + 56, 42, 1.5, 'middle')}"/>
  <path fill="${SIGN_WHITE}" d="${textPath('14', 40, BAND - 22, 36)}"/>
  <path fill="${SIGN_WHITE}" d="${textPath('MARKET ROW', W - 40, BAND - 22, 36, 1, 'end')}"/>
</svg>`;
const photoH = H - BAND;
const photo = await sharp(research('photos/DSC09696-1.jpg'))
  .resize({ width: W })
  .toBuffer()
  .then((b) => sharp(b).extract({ left: 0, top: 160, width: W, height: photoH }).toBuffer());
await sharp({ create: { width: W, height: H, channels: 3, background: FASCIA } })
  .composite([
    { input: Buffer.from(band), top: 0, left: 0 },
    { input: photo, top: BAND, left: 0 },
    { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="8"><rect width="${W}" height="8" fill="${FASCIA}"/></svg>`), top: BAND, left: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:2:0' })
  .toFile(pub('og.jpg'));

// ---------- icons: their glass-and-bolt mark ----------
const mark = (size, pad) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="${pad ? 0 : 36}" fill="${FASCIA}"/>
  <g transform="translate(100 100) scale(${pad ? 0.82 : 0.95}) translate(-100 -185)">
    <path d="M100 130 L90 180 L110 180 L100 230" stroke="${BOLT}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M100 230 L135 230 L160 110 L40 110 L65 250 L140 250" stroke="${BOLT}" stroke-width="12" stroke-linejoin="round" fill="none"/>
    <path d="M66 261 L135 261" stroke="${BOLT}" stroke-width="12" stroke-linecap="square" fill="none"/>
  </g>
</svg>`;
writeFileSync(pub('favicon.svg'), mark(64, false).trim() + '\n');
await sharp(Buffer.from(mark(32, false))).png().toFile(pub('favicon-32.png'));
await sharp(Buffer.from(mark(180, true))).png().toFile(pub('apple-touch-icon.png'));

const og = await sharp(pub('og.jpg')).metadata();
console.log('og.jpg', og.width + 'x' + og.height, og.format, Math.round(statSync(pub('og.jpg')).size / 1024) + 'KB');
