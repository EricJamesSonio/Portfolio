# Section Components (copy-ready patterns)

Contents: shared primitives · Hero · Experience · Education · About · Tech Stack · Featured Projects · GitHub Contributions · Certifications · Contact · Footer

All components read `darkMode` from the theme context (see theming-dark-mode.md). To avoid repeating ternaries, extract a `useTheme()` token helper (shown below) and use it everywhere.

## Shared primitives

```jsx
// ui/tokens.js
export const t = (dark) => ({
  shell: dark
    ? "bg-[#0f0f0f] border-orange-800/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    : "bg-white border-orange-800/30 shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
  title: dark ? "text-white" : "text-black",
  body: dark ? "text-gray-300" : "text-gray-700",
  muted: dark ? "text-gray-400" : "text-gray-600",
  faint: dark ? "text-gray-500" : "text-gray-500",
  chip: dark
    ? "bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-gray-200"
    : "bg-orange-50 hover:bg-orange-100 border border-orange-200 text-gray-800",
  tile: "bg-orange-800/10 hover:bg-orange-500/20 border border-orange-600/30",
  link: dark ? "text-orange-400/70 hover:text-orange-300/70" : "text-orange-600/70 hover:text-orange-700/70",
  rail: dark ? "bg-gray-700" : "bg-gray-300",
});

// ui/Card.jsx
export function Card({ title, aside, className = "", children }) {
  const { darkMode } = useDarkMode(); const k = t(darkMode);
  return (
    <section className={`flex flex-col p-6 border backdrop-blur-sm overflow-hidden ${k.shell} ${className}`}>
      <header className="flex items-start justify-between shrink-0 mb-4">
        <h2 className={`text-lg uppercase font-mono font-bold tracking-tight ${k.title}`}>{title}</h2>
        {aside}
      </header>
      {children}
    </section>
  );
}
export const Chip = ({ children }) => {
  const { darkMode } = useDarkMode();
  return <span className={`px-2 py-1 text-xs ${t(darkMode).chip}`}>{children}</span>;
};
```

## Hero (`Container1`)

Features: dark/light portrait swap, hover plays a looping muted video over the photo, ripple theme switch.

```jsx
const [hovered, setHovered] = useState(false);
const videoRef = useRef(null);

const enter = () => { videoRef.current?.play(); setHovered(true); };
const leave = () => { const v = videoRef.current; if (!v) return; v.pause(); v.currentTime = 0; setHovered(false); };

<div className={`relative overflow-hidden rounded-md cursor-pointer ${!hovered && "border"}
     ${darkMode ? "border-orange-500/30" : "border-orange-500/80"}`}
     onMouseEnter={enter} onMouseLeave={leave}>
  <img src={darkMode ? DarkPic : LightPic} alt="Portrait of Your Name"
       className="h-56 w-56 sm:h-64 md:h-80 lg:h-100 lg:w-75 object-cover
                  transition-opacity duration-300 group-hover:opacity-0" />
  <video ref={videoRef} src={darkMode ? vidDark : vidLight} muted loop playsInline preload="none"
         className="absolute inset-0 h-full w-full object-cover opacity-0
                    group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
</div>
```
Notes: wrap with `group` (the original wraps with `relative group p-2`). Keep videos under ~1.5 MB, `preload="none"`, and add a `poster`. Use `onTouchStart` as a mobile fallback.

Text block order: `h1` name -> role (UPPERCASE tracked) -> location with `FaLocationDot` -> buttons -> theme switch. Resume is a static file in `public/` linked as `href="/Resume.pdf"`. "Email me" opens Gmail compose: `https://mail.google.com/mail/?view=cm&to=you@example.com` (or `mailto:` as a fallback).

Theme switch (pill, 56x28, knob 20px, slides 28px):
```jsx
<button ref={btnRef} onClick={handleThemeToggle} aria-label="Toggle theme"
  className={`relative w-14 h-7 rounded-full flex items-center px-1 shadow-inner transition-colors
              ${darkMode ? "bg-zinc-800" : "bg-zinc-200"}`}>
  <div className={`w-5 h-5 rounded-full shadow-md grid place-items-center transition-transform duration-300
                   ${darkMode ? "translate-x-7 bg-zinc-900" : "translate-x-0 bg-white"}`}>
    {darkMode ? <IoMoon size={15}/> : <IoSunny size={18}/>}
  </div>
</button>
```

## Experience (timeline with "Current" badge)

Header aside: `CODING SINCE` + big year. Compute years if you like: `new Date().getFullYear() - startYear`.

```jsx
{items.map((it, i) => (
  <div key={i} className="relative pl-6 py-3">
    <div className="absolute -left-1 top-0 bottom-0 w-6 flex flex-col items-center">
      <div className={`w-3 h-3 rounded-full mt-4 shrink-0 ring-2 ${
        it.active ? (dark ? "bg-orange-400/70 ring-orange-400/30" : "bg-orange-500/70 ring-gray-400/80")
                  : (dark ? "ring-gray-700/90" : "ring-gray-600/30")}`} />
      {i !== items.length - 1 && <div className={`w-0.5 flex-1 -mb-4 ${k.rail}`} />}
    </div>
    <div className="flex justify-between items-start gap-3">
      <div className="flex-1 min-w-0">
        <h3 className={`font-bold text-xs mb-0.5 ${k.title}`}>{it.title}</h3>
        <p className={`text-xs font-mono leading-tight ${k.muted}`}>{it.sub}</p>
      </div>
      {it.active
        ? <span className={`px-1.5 py-0.5 text-xs font-mono ${dark ? "bg-orange-500/20 text-white" : "bg-orange-500/30 text-black"}`}>Current</span>
        : <span className={`text-xs font-mono ${k.faint}`}>{it.year}</span>}
    </div>
  </div>
))}
```
Scroll region: `max-h-[280px] overflow-y-auto custom-scroll`. Remove the original's empty placeholder item (it was a hack to extend the rail).

## Education (same timeline, simpler)

Same row pattern with `school` and `year`. The first item (current degree) is hard-coded above the mapped array in the original; instead put **all** items in one array with `active: true` on the current one, and let the dot style follow `active` (orange filled vs hollow ring). Use the same orange for active (the original mixes blue, which breaks the single-accent rule). Container: `relative flex flex-col h-full justify-between px-1 overflow-y-auto custom-scroll`, rail `absolute left-[9px] top-7 bottom-4 w-0.5`.

## About

Three short first-person paragraphs, `text-sm leading-relaxed`. Structure: (1) who you are and why you build, (2) how you learn and work, (3) what you want now plus location and age. Conversational, honest, no buzzword soup. Hold copy in `data/profile.js` as an array of strings.

## Tech Stack (grouped chips, scrollable)

Groups in the source: Frontend, Backend, Mobile, Tools, Security, AI, Cloud. Group header = tiny label plus a hairline filling the row.

```jsx
{stack.map(g => (
  <div key={g.label}>
    <div className="flex items-center gap-2 mb-2">
      <span className={`text-[9px] uppercase tracking-[0.15em] font-mono font-semibold ${k.title}`}>{g.label}</span>
      <div className={`flex-1 h-[1px] opacity-20 ${dark ? "bg-white" : "bg-black"}`} />
    </div>
    <div className="flex flex-wrap gap-1.5">{g.techs.map(n => <Chip key={n}>{n}</Chip>)}</div>
  </div>
))}
```
Wrapper: `flex flex-col gap-3 overflow-y-auto max-h-[300px] custom-scroll pb-4 pr-2`. Optional per-tech logo: `<img className="w-3 h-3 object-contain">`.

## Featured Projects

Container card with title, then `space-y-4 overflow-y-auto` list (height strategy in layout file). Each article:

```jsx
<article onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
  className={`border p-5 transition-all duration-200 ${dark
    ? "bg-[#1a1a1a] border-gray-700 hover:border-orange-500/50"
    : "bg-gray-50 border-gray-200 hover:border-orange-300"}`}>
  <div className="flex flex-col lg:flex-row gap-4">
    <div className={`w-full lg:w-100 h-70 p-3 rounded flex-shrink-0 overflow-hidden grid place-items-center
                     ${dark ? "bg-black/30" : "bg-gray-100"}`}>
      <img src={p.image} alt={`${p.name} screenshot`} loading="lazy"
           className={`h-full object-contain transition-transform duration-500 ${hover === i ? "scale-110" : ""}`} />
    </div>
    <div className="flex flex-col gap-3 flex-1">
      <h3 className="text-lg font-bold text-orange-400/70">{p.name}</h3>
      <p className={`text-sm text-justify leading-relaxed ${k.muted}`}>{p.description}</p>
      <div className="flex flex-wrap gap-2">{p.tech.map(x => <Chip key={x}>{x}</Chip>)}</div>
      <div className="flex gap-3 items-center pt-2 text-sm">
        <a href={`https://${p.link}`} target="_blank" rel="noreferrer" className={`font-semibold ${k.link}`}>View Project <i className="bi bi-arrow-up-right ml-1"/></a>
        <span className="text-gray-400">|</span>
        <a href={`https://${p.code}`} target="_blank" rel="noreferrer" className={`font-semibold ${k.link}`}>View Code <i className="bi bi-arrow-up-right ml-1"/></a>
      </div>
    </div>
  </div>
</article>
```
Images are laptop+phone mockups with a transparent/neutral background. Replace the `hoveredIndex` state with CSS `group` + `group-hover:scale-110` to avoid re-rendering the whole list on hover. Remove `onError={e => e.target.style.display = "none"}` in favor of a real fallback.

**Writing project copy:** first sentence says what it is; then who it serves; then the technical depth (auth, real-time, roles, analytics, payments); end with the outcome. 3-5 sentences. Tech chips ordered by importance.

## GitHub Contributions

```jsx
import { GitHubCalendar } from "react-github-calendar";
const theme = {
  light: ["#ebedf0", "#ffedd5", "#fed7aa", "#fb923c", "#ea580c"],
  dark:  ["#161616", "#431407", "#7c2d12", "#c2410c", "#f97316"],
};
<GitHubCalendar username="YOUR_USER" colorScheme={darkMode ? "dark" : "light"}
  blockSize={24} blockMargin={4} fontSize={14} blockRadius={0} theme={theme} showYearSelect />
```
Header: title left, `View GitHub Profile ↗` right (`text-xs font-mono`, orange). Panel: `flex justify-center overflow-x-auto px-4 py-4 border` on `bg-gray-50` / `bg-[#0a0a0a]`. `blockRadius={0}` gives square cells that match the style. The component fetches from a public API; show a skeleton or let it handle its own loading state.

## Certifications (with lightbox)

```jsx
const [selected, setSelected] = useState(null);
<div className="flex flex-col p-2 gap-3 h-53.5 overflow-y-auto">
  {certs.map(c => (
    <button key={c.name} onClick={() => setSelected(c.img)}
      className={`relative text-left p-4 pr-10 ${k.tile}`}>
      <strong className="text-sm">{c.name}</strong>
      <p className={`text-[12px] font-mono ${k.faint}`}>{c.issuer}</p>
      <i className="bi bi-arrows-angle-expand absolute top-3 right-3 text-gray-400 text-lg" />
    </button>
  ))}
</div>
{selected && (
  <div onClick={() => setSelected(null)} className="fixed inset-0 bg-black/70 grid place-items-center z-50">
    <img src={selected} alt="Certificate" className="w-[80%] h-[80%] object-contain rounded-lg" />
  </div>
)}
```
Add `Escape` to close, `role="dialog"`, `aria-modal`, and focus return. Include Dean's Lister awards alongside certificates.

## Contact (two link-tile columns)

Left "Find me on" (LinkedIn, GitHub, Facebook), right "Get in touch" (Email, Reach me, Messenger). Tile: icon + label (+ small mono sub-line, `truncate`) left, `bi-arrow-up-right` right.

```jsx
<a href={url} target="_blank" rel="noreferrer"
   className={`p-3 flex items-center justify-between ${k.tile}`} style={{ textDecoration: "none", color: "inherit" }}>
```
For phone use `href="tel:+63..."` (the original had none). For email use `mailto:` or the Gmail compose URL. Do not render a tile as an `<a>` with an undefined `href`: render a `<div>` or supply a `tel:` link.

## Footer

`mt-10 pt-6 border-t text-center text-[11px] font-mono`, border `border-[#333333]` dark / `border-gray-200` light: `© Your Name | Personal Portfolio 2026`.
