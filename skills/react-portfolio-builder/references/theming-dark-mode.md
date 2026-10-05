# Theming and Dark Mode

Contents: how the original works · recommended provider · body class · ripple transition · persistence and flash · reduced motion · testing

## How the original works

`DarkmodeProvider` keeps a boolean in React Context (default **dark = true**). Every component calls `useDarkMode()` and picks Tailwind class strings with ternaries (`darkMode ? "..." : "..."`). It does **not** use Tailwind's `dark:` variant. `App.jsx` also toggles a `dark` class on `document.body` in `useLayoutEffect`, used only by the scrollbar CSS (`body.dark ::-webkit-scrollbar-*`).

Trade-off: simple and explicit, but verbose and impossible to style with CSS alone. Two valid approaches:

- **A. Context + ternaries (original):** keep for fidelity. Reduce repetition with the `t(dark)` token helper.
- **B. Tailwind `dark:` variant:** add `@custom-variant dark (&:where(.dark, .dark *));` to `index.css`, put the class on `<html>`, then write `bg-white dark:bg-black`. Less code, no re-render of consumers on toggle. Recommended for new builds.

## Recommended provider (persistent, system-aware)

```jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
const Ctx = createContext(null);

const initial = () => {
  try {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
  } catch {}
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
};

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(initial);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.body.classList.toggle("dark", darkMode);   // for body.dark scrollbar rules
    try { localStorage.setItem("theme", darkMode ? "dark" : "light"); } catch {}
  }, [darkMode]);
  const toggleDarkMode = useCallback(() => setDarkMode(d => !d), []);
  return <Ctx.Provider value={{ darkMode, toggleDarkMode }}>{children}</Ctx.Provider>;
}
export const useDarkMode = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDarkMode must be used inside DarkModeProvider");
  return v;
};
```
Use `useLayoutEffect` instead of `useEffect` if you want the class applied before paint. To avoid a flash of the wrong theme, add to `index.html` `<head>` before the bundle:

```html
<script>
  try {
    var s = localStorage.getItem("theme");
    var d = s ? s === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    if (d) document.documentElement.classList.add("dark");
  } catch (e) {}
</script>
```
Also set `<meta name="color-scheme" content="light dark">` and update `<meta name="theme-color">` per theme.

## Circular ripple transition (View Transitions API)

Pure CSS plus a few lines of JS. The new theme "grows" from the toggle button.

```css
/* index.css */
::view-transition-old(root) { animation: none; }
::view-transition-new(root) { animation: ripple-reveal 0.7s ease-in-out; z-index: 9999; }
@keyframes ripple-reveal {
  from { clip-path: circle(0px at var(--ripple-x) var(--ripple-y)); }
  to   { clip-path: circle(var(--ripple-radius) at var(--ripple-x) var(--ripple-y)); }
}
```

```jsx
const handleThemeToggle = () => {
  const btn = btnRef.current;
  if (!btn || !document.startViewTransition) { toggleDarkMode(); return; }   // graceful fallback

  const r = btn.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + r.height / 2;
  const root = document.documentElement.style;
  root.setProperty("--ripple-x", `${x}px`);
  root.setProperty("--ripple-y", `${y}px`);
  root.setProperty("--ripple-radius", `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`);

  document.startViewTransition(() => flushSync(() => toggleDarkMode()));
};
```
Improvements over the original:
- Set `--ripple-radius` **before** starting the transition (the original sets it after `ready`, which can race the first frame).
- Wrap the state change in `flushSync` (from `react-dom`) so React commits the DOM update inside the transition callback.
- Skip the animation when `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
- Browser support: Chromium and recent Safari; others get an instant switch via the fallback.

## Theme-aware assets

Swap images per theme (`profile.jpg` vs `DarkProfile.jpg`), hover videos (`AnimeWhite.mp4` vs `AnimeBlack.mp4`), chat colors (inverted: light theme = dark-gray button, dark theme = white button), and the GitHub calendar `colorScheme` + custom orange palettes.

## Contrast guidance

Keep body text at least 4.5:1. `text-gray-500` on `bg-[#0f0f0f]` is borderline for small text; use `text-gray-400` for dark mode muted copy. Orange `text-orange-400/70` on black is fine at large/bold sizes; verify small sizes with a contrast checker.

## Testing

Toggle in each section; reload to confirm persistence and no flash; test with OS dark mode on first visit; check scrollbars, modals, the chat panel, GitHub graph, and images in both themes.
