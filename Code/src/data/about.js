import { name, degree, degreeShort, school, role, location } from './profile.js';

/**
 * About — three paragraphs, as in the reference.
 *
 * Content source: the existing `About.astro` had four short sections. They are condensed into
 * three paragraphs without adding any new claim:
 *   1. introduction (who he is and what he builds)
 *   2. skills & experience, plus life outside coding
 *   3. how to connect
 *
 * The name, degree and school come from `profile.js` so they can never drift from the hero
 * and the Education timeline.
 */
export const about = [
  `I'm ${name}, a 4th-year ${degreeShort} at ${school}, and a full-stack developer who specializes in building maintainable and scalable backends. I focus on designing robust APIs and backend systems that keep working well and hold up over time.`,
  "I've worked on multiple full-stack projects, expert systems and automation solutions, and I thrive in collaborative environments: brainstorming ideas, building new solutions, and learning from every experience. Outside coding I'm the lead guitarist in our church, and music fuels the same creativity and discipline I bring to programming.",
  "Feel free to explore the projects below, or get in touch if you'd like to collaborate and build something worth shipping together.",
];

/**
 * Quick facts shown under the About prose.
 *
 * These are NOT new biography. Every value is either pulled straight from `profile.js` or is a
 * restatement of a claim already made in `about` above, so the card can fill the height of the
 * Experience + Education column without anyone writing copy on the owner's behalf.
 *
 * TODO (owner): if you would rather have real prose here, replace this list with a fourth and
 * fifth paragraph and delete the block.
 */
export const aboutFacts = [
  { label: 'Role', value: role },
  { label: 'Degree', value: degree },
  { label: 'School', value: school },
  { label: 'Location', value: location },
  { label: 'Focus', value: 'Robust APIs & maintainable backends' },
];

export default about;
