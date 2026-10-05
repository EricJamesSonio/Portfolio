import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export default function GithubGraph({ username, profileUrl, theme }) {
  const [isDark, setIsDark] = useState(false);
  // Cell size in px. The graph used to be hardcoded to 11px in dark mode, which rendered the
  // 53-week grid tiny and made it look sparse. These are the sizes that read well at each width;
  // the wrapper still scrolls horizontally on phones (AGENTS.md rule 10: no PAGE-level overflow
  // at 375px), so the larger desktop cells can never widen the page.
  const [metrics, setMetrics] = useState({ blockSize: 18, blockMargin: 5 });

  // Track the site theme (not just the OS preference) so the calendar repaints when the user
  // flips the light/dark switch, which writes `data-theme` on <html> and fires `themechange`.
  useEffect(() => {
    const apply = () => {
      const attr =
        document.documentElement.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      setIsDark(attr === 'dark');
    };
    apply();
    window.addEventListener('themechange', apply);
    return () => window.removeEventListener('themechange', apply);
  }, []);

  // Re-size the cells when the viewport crosses a breakpoint. A `matchMedia` listener rather
  // than a resize handler, so it only fires when the relevant threshold is actually crossed.
  useEffect(() => {
    // Bottom-up: the narrowest phone gets the largest cells *relative to the space available*.
    // Previously phones fell back to 11px cells, which rendered the whole year so compressed
    // that individual days were hard to see. 13px with a 3px gutter reads clearly at 320-480px,
    // and the tighter gutter means more of the year is reachable per swipe.
    const STEP = [
      { q: '(max-width: 479px)', blockSize: 13, blockMargin: 3 },
      { q: '(max-width: 767px)', blockSize: 14, blockMargin: 3 },
      { q: '(max-width: 1023px)', blockSize: 16, blockMargin: 4 },
    ];

    const apply = () => {
      const step = STEP.find((s) => window.matchMedia(s.q).matches);
      setMetrics(
        step ?? { blockSize: 18, blockMargin: 5 }  // 1024px and up
      );
    };
    apply();

    const queries = STEP.map((s) => window.matchMedia(s.q));
    queries.forEach((mq) => mq.addEventListener('change', apply));
    return () => queries.forEach((mq) => mq.removeEventListener('change', apply));
  }, []);

  // Keep in sync if the OS preference changes while using dark mode.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!window.__theme) return;
      if (window.__theme.get() === 'dark') setIsDark(mq.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="gh-panel">
      <GitHubCalendar
        username={username}
        colorScheme={isDark ? 'dark' : 'light'}
        theme={theme}
        blockSize={metrics.blockSize}
        blockMargin={metrics.blockMargin}
        fontSize={15}
        blockRadius={0}
        showYearSelect
        hideTotalCount={false}
      />
      {/* The grid is wider than a phone, so on small screens it scrolls inside its own panel.
          Kept in the DOM (not `aria-hidden`) so screen-reader users are told, since they cannot
          see the visual swipe hint rendered above the panel. */}
      <p className="gh-scroll-note">Scroll the grid sideways to see the whole year.</p>
    </div>
  );
}
