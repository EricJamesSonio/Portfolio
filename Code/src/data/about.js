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
  `I'm ${name}, a 4th-year ${degreeShort} at ${school}, and a full-stack developer focused on **maintainable, scalable backends** — robust APIs, **agentic programming**, and **automation** that hold up over time.`,
  "I've built and shipped systems for clients, wiring up full-stack applications and **automation** workflows that replace manual processes with reliable, self-running pipelines. **AI engineering** is where I do my best work — taking a messy requirement and turning it into a maintainable, scalable system. I thrive in collaborative environments: brainstorming ideas, building new solutions, and learning from every experience. Outside coding I'm the lead guitarist in our church, and music fuels the same creativity and discipline I bring to programming.",
  "Feel free to explore the projects below, or get in touch if you'd like to collaborate and build something worth shipping together.",
];

/**
 * Inline emphasis marker.
 *
 * The copy marks highlighted phrases with `**like this**` rather than HTML because these same
 * strings are fed to the chatbot system prompt (`chatbot.js`) as PLAIN TEXT. `About.astro`
 * parses the markers into real `<span class="about-hl">` text nodes — Astro escapes them, so
 * nothing is ever passed to `set:html` — and `aboutPlain` below strips them for the prompt.
 */
const HL = /\*\*(.+?)\*\*/g;

/** The About copy with the emphasis markers removed. Used by the chatbot prompt. */
export const aboutPlain = about.map((paragraph) => paragraph.replace(HL, '$1'));

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
  // `wide: true` makes this fact span the whole grid row (see `.about-fact-wide`); `chips`
  // renders as a list of tags rather than a single value.
  { label: 'Focus', wide: true, chips: ['Agentic programming', 'Automation integration', 'Maintainable, scalable systems'] },
];

export default about;
