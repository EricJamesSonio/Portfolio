/**
 * Tech stack, grouped by label. Drives the four scrolling carousels in `TechStack.astro`.
 *
 * Content source: the badge labels in the existing `TechStack.astro`, kept verbatim so no
 * technology is invented. The shields.io badge images were dropped in favour of the neon-blue
 * accent cards.
 *
 * `techs` entries are `{ name, icon }` where `icon` is a key in `stackIcons.js`. A missing key
 * is not fatal: `getIcon()` returns an empty string and the card renders without an icon, so
 * adding a new technology never breaks the build.
 *
 * Owner additions (2026-10-10): OpenRouter, Cline, OpenCode, GitHub Copilot and Vercel in
 * Tools & Testing.
 */
export const stack = [
  {
    label: 'Frontend',
    techs: [
      { name: 'React', icon: 'react' },
      { name: 'React Query', icon: 'reactquery' },
      { name: 'Angular', icon: 'angular' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML', icon: 'html' },
      { name: 'CSS', icon: 'css' },
    ],
  },
  {
    label: 'Backend',
    techs: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'ASP.NET', icon: 'aspnet' },
      { name: 'PHP', icon: 'php' },
      { name: 'Python', icon: 'python' },
    ],
  },
  {
    label: 'Database',
    techs: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'SQLite', icon: 'sqlite' },
    ],
  },
  {
    label: 'Tools & Testing',
    techs: [
      { name: 'Jest', icon: 'jest' },
      { name: 'Swagger', icon: 'swagger' },
      { name: 'Postman', icon: 'postman' },
      { name: 'Karma', icon: 'karma' },
      { name: 'Jasmine', icon: 'jasmine' },
      { name: 'MSTest', icon: 'mstest' },
      { name: 'OpenRouter', icon: 'openrouter' },
      { name: 'Cline', icon: 'cline' },
      { name: 'OpenCode', icon: 'opencode' },
      { name: 'GitHub Copilot', icon: 'copilot' },
      { name: 'Vercel', icon: 'vercel' },
    ],
  },
  {
    label: 'Deployment',
    techs: [
      { name: 'Render', icon: 'render' },
      { name: 'Cloudinary', icon: 'cloudinary' },
      { name: 'Agora', icon: 'agora' },
      { name: 'Aiven', icon: 'aiven' },
    ],
  },
];

export default stack;
