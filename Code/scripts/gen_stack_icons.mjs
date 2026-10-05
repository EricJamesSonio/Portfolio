import { writeFileSync } from 'node:fs';

const OUT = 'C:/Users/Windows 10/Desktop/Personal/Projects/Porttfolio/Code/src/data/stackIcons.js';

// ---------------------------------------------------------------- colour maths
const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const lum = (r, g, b) => 0.2126 * lin(r / 255) + 0.7152 * lin(g / 255) + 0.0722 * lin(b / 255);
function contrast(r, g, b, br, bg, bb) {
  const L1 = lum(r, g, b);
  const L2 = lum(br, bg, bb);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}
const hex = (r, g, b) =>
  '#' +
  [r, g, b]
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
    .join('');

function rgbToHsl(r, g, b) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return [h * 60, s, l];
}

function hslToRgb(h, s, l) {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 360;
  const x = c * (1 - Math.abs(((hp * 6) % 2) - 1));
  const m = l - c / 2;
  let v;
  if (hp < 1 / 6) v = [c, x, 0];
  else if (hp < 2 / 6) v = [x, c, 0];
  else if (hp < 3 / 6) v = [0, c, x];
  else if (hp < 4 / 6) v = [0, x, c];
  else if (hp < 5 / 6) v = [x, 0, c];
  else v = [c, 0, x];
  return [(v[0] + m) * 255, (v[1] + m) * 255, (v[2] + m) * 255];
}

// Card backgrounds: --tile-bg composited over the page background.
const BG_LIGHT = [229.5, 238.5, 247.4]; // rgba(0,95,179,.10) over #ffffff
const BG_DARK = [12.9, 32.5, 43.7];     // rgba(0,140,220,.14) over #0f0f0f
const MIN = 3.0; // WCAG 1.4.11 non-text contrast

function fix(h) {
  const r = parseInt(h.slice(1, 3), 16);
  const g = parseInt(h.slice(3, 5), 16);
  const b = parseInt(h.slice(5, 7), 16);
  const [H, S, L] = rgbToHsl(r, g, b);

  // Achromatic near-black brands (Express, Angular, Cline, Vercel, Render, OpenCode,
  // Copilot) are literally black marks, so invert per theme instead of turning them grey.
  if (S < 0.15 && L < 0.2) {
    return { brand: h, light: hex(...hslToRgb(H, 0, 0.08)), dark: hex(...hslToRgb(H, 0, 0.95)) };
  }
  let ll = L;
  while (ll > 0.02) {
    if (contrast(...hslToRgb(H, S, ll), ...BG_LIGHT) >= MIN) break;
    ll -= 0.02;
  }
  let dl = L;
  while (dl < 0.99) {
    if (contrast(...hslToRgb(H, S, dl), ...BG_DARK) >= MIN) break;
    dl += 0.02;
  }
  return { brand: h, light: hex(...hslToRgb(H, S, ll)), dark: hex(...hslToRgb(H, S, dl)) };
}

// ---------------------------------------------------------------- sources
const SLUGS = {
  react: 'react', reactquery: 'reactquery', angular: 'angular', javascript: 'javascript',
  html: 'html5', css: 'css', nodejs: 'nodedotjs', express: 'express', fastapi: 'fastapi',
  aspnet: 'dotnet', php: 'php', python: 'python', mysql: 'mysql', postgresql: 'postgresql',
  mongodb: 'mongodb', sqlite: 'sqlite', jest: 'jest', swagger: 'swagger', postman: 'postman',
  karma: 'selenium', jasmine: 'jasmine', mstest: 'dotnet', openrouter: 'openrouter',
  cline: 'cline', opencode: 'opencode', copilot: 'githubcopilot', vercel: 'vercel',
  render: 'render', cloudinary: 'cloudinary', agora: 'agora',
};

const lines = [];
const report = [];
const problems = [];

for (const [key, slug] of Object.entries(SLUGS)) {
  try {
    const res = await fetch(`https://cdn.simpleicons.org/${slug}`);
    const text = await res.text();
    const brand = (text.match(/fill="(#[0-9a-fA-F]{6})"/) || [])[1]?.toLowerCase();
    if (!brand) throw new Error('no fill');
    const c = fix(brand);
    const body = text
      .replace(/^<svg[^>]*>/, '')
      .replace(/<\/svg>\s*$/, '')
      .replace(/<title>.*?<\/title>/, '')
      .trim()
      .replace(/'/g, "\\'");
    lines.push(`  ${key} : { brand: '${c.brand}', light: '${c.light}', dark: '${c.dark}', body: '${body}' },`);
    const unchanged = c.light === c.brand && c.dark === c.brand;
    report.push(
      `${key.padEnd(13)} ${unchanged ? 'as-is   ' : 'adjusted'} light ${c.light}  dark ${c.dark}  (brand ${c.brand})`
    );
  } catch (e) {
    problems.push(`${key}: ${e.message}`);
  }
}

// sanity: every emitted colour must clear 3:1 on its own background
for (const line of lines) {
  const m = line.match(/brand: '(#\w{6})', light: '(#\w{6})', dark: '(#\w{6})'/);
  const px = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const cl = contrast(...px(m[2]), ...BG_LIGHT);
  const cd = contrast(...px(m[3]), ...BG_DARK);
  if (cl < MIN || cd < MIN) problems.push(`LOW ${m[1]} light=${cl.toFixed(2)} dark=${cd.toFixed(2)}`);
}
const header = `/**
 * Tech icons + official brand colours, one entry per stack technology (24x24 viewBox).
 *
 * GENERATED FILE - do not hand-edit; regenerate instead.
 *
 * Shape: Simple Icons (https://simpleicons.org), CC0-1.0. The <svg fill="..."> wrapper is
 * stripped so TechStack.astro can drive the colour itself. \`brand\` is the official hex
 * published by the technology owner.
 *
 * Why two colours and not one: most official brand hexes fail WCAG 1.4.11 (3:1 non-text) on
 * one of the two card backgrounds - Express #0a0a0a, Vercel and Render #000000 vanish on
 * dark; JavaScript #f7df1e and Swagger #85ea2d vanish on light. Where a colour fails it is
 * shifted in HSL - same hue, same saturation, only lightness - until it clears 3:1.
 * Achromatic near-black brands (Express, Angular, Cline, Vercel, Render, OpenCode, Copilot)
 * are inverted per theme instead of turning muddy grey: a black mark on a dark card is just
 * a white mark. \`brand\` is kept so every adjustment stays auditable.
 *
 * Substitutions where Simple Icons has no entry (documented, not invented branding):
 *   karma  -> Selenium  (Karma is a test runner; Selenium is its usual partner)
 *   mstest -> .NET      (MSTest ships with the .NET platform)
 *   aiven  -> neutral cloud glyph below (Aiven has no Simple Icons entry)
 *
 * These marks are trademarks of their respective owners, used only to identify a technology.
 */
export const stackIcons = {
  // Aiven has no brand icon, so it uses a neutral cloud mark of three overlapping circles.
  aiven : { brand: '#64748b', light: '#475569', dark: '#94a3b8', body: '<circle cx="8.5" cy="13" r="4"/><circle cx="15.5" cy="12" r="5"/><circle cx="11" cy="16.5" r="3.5"/>' },
`;

const footer = `};

/**
 * Safe lookup: an unknown technology renders no icon rather than a broken one.
 * Returns { brand, light, dark, body } or null.
 */
export function getIcon(key) {
  return stackIcons[key] || null;
}

export default stackIcons;
`;

writeFileSync(OUT, header + lines.join('\n') + '\n' + footer, 'utf8');
console.log(report.join('\n'));
console.log('\nICONS_WRITTEN=' + lines.length);
console.log('PROBLEMS=' + (problems.length ? problems.join(' | ') : 'none'));