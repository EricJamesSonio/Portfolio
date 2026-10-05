# Design System

Contents: tokens · typography · surfaces · borders and shadows · chips · links · buttons · dividers · scrollbars · motion · icon usage

## Tokens (Tailwind v4, CSS-first)

No `tailwind.config.js`. Define the font in `@theme`:

```css
/* src/assets/styles/index.css */
@import "tailwindcss";

@theme {
  --font-sans: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
}
```
Overriding `--font-sans` makes **every** element monospace, so `font-mono` is then redundant but harmless. Optional upgrade: load JetBrains Mono from Google Fonts and put it first in the stack.

### Palette (as used in the source)

| Role | Light | Dark |
|---|---|---|
| Page background | `bg-white` | `bg-black` |
| Card background | `bg-white` | `bg-[#0f0f0f]` |
| Inner panel | `bg-gray-50` / `bg-gray-100` | `bg-[#1a1a1a]` / `bg-black/30` / `bg-[#0a0a0a]` |
| Card border | `border-orange-800/30` | `border-orange-800/30` |
| Inner border | `border-gray-200` | `border-gray-700` / `border-orange-800/20` |
| Body text | `text-gray-700` | `text-gray-300` |
| Muted text | `text-gray-500/600` | `text-gray-400/500` |
| Heading text | `text-black` | `text-white` |
| Accent text | `text-orange-500` (dividers), `text-orange-600/70` (links) | `text-orange-500`, `text-orange-400/70` (links) |
| Chip | `bg-orange-50` + `border-orange-200` | `bg-orange-500/10` + `border-orange-500/30` |
| Link tile | `bg-orange-800/10` + `border-orange-600/30` | same |
| Tile/chip hover | `hover:bg-orange-100` / `hover:bg-orange-500/20` | `hover:bg-orange-500/20` |
| Primary button | `bg-black text-white hover:bg-zinc-800` | `bg-white text-black hover:bg-gray-200` |
| Chat button/banner | `bg-[#3e3e3e] text-white hover:bg-gray-600` | `bg-white text-black hover:bg-gray-200` |

Accent is **only orange**. The only other hues allowed are functional: green dot for "Online".

## Typography

| Element | Classes |
|---|---|
| Hero name | `text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tight leading-tight` |
| Hero role | `text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] uppercase tracking-[0.25em] sm:tracking-[0.3em]` |
| Hero location | `text-[12px] sm:text-[13px] md:text-[14px]` with `FaLocationDot` icon |
| Card title | `text-lg uppercase font-mono font-bold tracking-tight` (Certifications uses `text-base`) |
| Timeline title | `font-bold text-xs` |
| Timeline sub / year | `text-xs font-mono leading-tight` (muted) |
| Body paragraph | `text-sm leading-relaxed` |
| Chip text | `text-xs` |
| Tech group label | `text-[9px] uppercase tracking-[0.15em] font-mono font-semibold` |
| Divider caption | `text-[8px] lg:text-[10px] font-mono tracking-[0.4em] uppercase whitespace-nowrap text-orange-500` |
| Footer | `text-[11px] font-mono text-center` |

Rules: titles UPPERCASE and bold; micro-labels tiny and widely tracked; descriptions `text-sm` with `leading-relaxed` (project descriptions use `text-justify`).

## Surfaces: the card shell

Every container uses the same shell. Light and dark differ only in background and shadow:

```jsx
const shell = darkMode
  ? "bg-[#0f0f0f] border-orange-800/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
  : "bg-white border-orange-800/30 shadow-[0_4px_12px_rgba(0,0,0,0.08)]";

<div className={`p-6 border backdrop-blur-sm overflow-hidden ${shell}`}>
```
Padding `p-6` (`md:p-8` for the GitHub card). Shadows are soft, never colored. No `rounded-*` on cards.

## Chips (tech tags)

```jsx
<span className={`px-2 py-1 text-xs ${darkMode
  ? "bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-gray-200"
  : "bg-orange-50 hover:bg-orange-100 border border-orange-200 text-gray-800"}`}>
```
Project chips use `px-2.5 py-1 font-medium`; stack chips use `px-2 py-1`. Wrap in `flex flex-wrap gap-1.5` (stack) or `gap-2` (projects).

## Link tiles (socials, contact, certificates)

Peach block with a thin orange border, content left, arrow right:
```jsx
className="p-3 flex items-center justify-between bg-orange-800/10 hover:bg-orange-500/20 border border-orange-600/30"
```
Trailing icon: `<i className="bi bi-arrow-up-right text-xs text-gray-400" />`. Certificates use `bi-arrows-angle-expand` at `absolute top-3 right-3`.

## Orange text links

```jsx
className={`font-semibold transition-colors ${darkMode
  ? "text-orange-400/70 hover:text-orange-300/70"
  : "text-orange-600/70 hover:text-orange-700/70"}`}
```
Format: `View Project <i className="bi bi-arrow-up-right ml-1" />`, a `|` separator in gray, then `View Code ↗`. Project titles use a gradient text trick: `bg-gradient-to-r from-orange-400/70 to-orange-400/70 bg-clip-text text-transparent`; plain `text-orange-400/70` is equivalent and simpler.

## Buttons

Square, bold, uppercase, widely tracked, with a press effect:
```jsx
// primary
`px-10 py-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase shadow-lg
 transition-all duration-300 hover:scale-105 active:scale-95
 ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-zinc-800"}`
// secondary: same but `border` and
 ${darkMode ? "border-white/30 text-white hover:bg-white/10" : "border-black/30 text-black hover:bg-black/5"}
```
On mobile both buttons are full width (`w-full sm:w-auto`) and stack (`flex-col sm:flex-row`).

## Divider caption (signature element)

```jsx
export default function Divider({ children, strong = false }) {
  const line = strong ? "orange-500" : "orange-500/70";
  return (
    <div className="flex items-center w-full opacity-80" role="separator">
      <span className={`h-[1px] flex-1 bg-gradient-to-r from-transparent to-${line}`} />
      <span className="px-4 text-[8px] lg:text-[10px] font-mono tracking-[0.4em] uppercase whitespace-nowrap text-orange-500">
        {children}
      </span>
      <span className={`h-[1px] flex-1 bg-gradient-to-l from-transparent to-${line}`} />
    </div>
  );
}
```
> Tailwind cannot see dynamically built class names (`to-${line}`). In real code, write both full class strings out or use a conditional between two literal strings.

Captions in order: `EHRVAYN RAYVEN || PORTFOLIO 2026` (top, hero) -> `SOLVING THROUGH CODE` -> `ITERATE. BUILD. DEPLOY.` -> `CONSISTENCY` -> `RECOGNITION | SOCIALS`. Write captions for your own story: short, verb-driven, 1-3 words or a 3-beat phrase. The top caption is `NAME || PORTFOLIO YEAR`.

## Scrollbars (thin, themed)

```css
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
::-webkit-scrollbar-thumb { background: #c9c9c9; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
body.dark ::-webkit-scrollbar-track { background: #2e2e2e; }
body.dark ::-webkit-scrollbar-thumb { background: #555; }
body.dark ::-webkit-scrollbar-thumb:hover { background: #888; }
```
The `body.dark` class is toggled in `App.jsx` (`useLayoutEffect`) specifically so these pseudo-element styles can switch themes. Scrollable inner areas also get a `custom-scroll` class (define it, e.g. `scrollbar-width: thin;`, since the original references it without defining it).

## Motion

Purposeful and small: `transition-colors duration-500` on the hero, `hover:scale-105 active:scale-95` on buttons, `hover:scale-110` image zoom on project hover (`duration-500`), `animate-bounce` on the chat button and its banner, the circular theme ripple (see theming file). Respect `prefers-reduced-motion`: wrap bounce/scale in `motion-safe:`.

## Icons

- `react-icons`: `IoSunny`/`IoMoon` (theme), `FaLocationDot` (pin), `BiSolidMessageDots` (chat).
- `bootstrap-icons` font via `<i className="bi bi-github" />` for socials and arrows (import `bootstrap-icons/font/bootstrap-icons.css` once in `main.jsx`).
- Pick one set when starting fresh to cut bundle size; `react-icons` alone covers everything.
