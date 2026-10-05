import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export default function GithubGraph({ username, profileUrl, theme }) {
  const [isDark, setIsDark] = useState(false);
  // Cell size in px. The graph used to be hardcoded to 11px in dark mode, which rendered the
  // 53-week grid tiny and made it look sparse. These are the sizes that read well at each width;
  // the wrapper still scrolls horizontally on phones (AGENTS.md rule 10: no PAGE-level overflow
  // at 375px), so the larger desktop cells can never widen the page.
  const [blockSize, setBlockSize] = useState(11);

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
    const wide = window.matchMedia('(min-width: 768px)');
    const mid = window.matchMedia('(min-width: 480px)');
    const apply = () =>
      setBlockSize(
        window.innerWidth >= 768 ? 18 : window.innerWidth >= 480 ? 14 : 11
      );
    apply();
    wide.addEventListener('change', apply);
    mid.addEventListener('change', apply);
    return () => {
      wide.removeEventListener('change', apply);
      mid.removeEventListener('change', apply);
    };
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
        blockSize={blockSize}
        blockMargin={5}
        fontSize={15}
        blockRadius={0}
        showYearSelect
        hideTotalCount={false}
      />
    </div>
  );
}
