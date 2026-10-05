/**
 * Tech stack, grouped by label.
 *
 * Content source: the badge labels in the existing `TechStack.astro`, kept verbatim so no
 * technology is invented. The shields.io badge images are dropped in favour of the reference's
 * peach-tinted chips.
 */
export const stack = [
  {
    label: 'Frontend',
    techs: ['React', 'React Query', 'Angular', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    label: 'Backend',
    techs: ['Node.js', 'Express', 'FastAPI', 'ASP.NET', 'PHP', 'Python'],
  },
  {
    label: 'Database',
    techs: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
  },
  {
    label: 'Tools & Testing',
    techs: ['Jest', 'Swagger', 'Postman', 'Karma', 'Jasmine', 'MSTest'],
  },
  {
    label: 'Deployment',
    techs: ['Render', 'Cloudinary', 'Agora', 'Aiven'],
  },
];

export default stack;
