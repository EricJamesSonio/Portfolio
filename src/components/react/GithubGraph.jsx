import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

/**
 * Contribution graph island.
 * - Orange 5-step palettes per theme, square cells (blockRadius 0)
 * - Re-renders when the page theme changes (reads the `themechange` event)
 * - The panel scrolls horizontally INSIDE itself on phones so the page never overflows
 */
export default function GithubGraph({ username, profileUrl, theme }) {
  const [isDark, setIsDark] = useState(false);

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
        blockSize={isDark ? 11 : 14}
        blockMargin={4}
        fontSize={12}
        blockRadius={0}
        showYearSelect
        hideTotalCount={false}
      />
    </div>
  );
}
