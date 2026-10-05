/**
 * Education timeline, ordered NEWEST-FIRST: the current degree sits at the TOP, followed by the
 * schools in reverse chronological order (11-12 -> 9-10 -> 7-8 -> 1-6).
 *
 * Content source: supplied by the owner on 2026-10-10 (school names and grade ranges are
 * verbatim). The current entry reuses `degree` and `school` from `profile.js`, so the wording
 * can never drift from the hero, the About copy or the chatbot prompt.
 *
 * `year` is the grade range shown on the right. The active entry renders a "Current" badge
 * instead (see `Timeline.astro`), so its grade range lives in `sub`.
 *
 * The rail connector in `bento.css` is driven by DOM order (`.timeline-item:not(:last-child)`),
 * so reversing this array re-flows the rail automatically - no CSS change is needed.
 */
import { degree, school } from './profile.js';

export const education = [
  {
    title: degree,
    sub: `${school} - Years 1-4`,
    year: '',
    active: true,
  },
  {
    title: 'Senior High',
    sub: school,
    year: 'Grades 11-12',
    active: false,
  },
  {
    title: 'Senior High',
    sub: 'Virginia Ramirez National High School',
    year: 'Grades 9-10',
    active: false,
  },
  {
    title: 'Junior High',
    sub: 'Holy Angels Academy',
    year: 'Grades 7-8',
    active: false,
  },
  {
    title: 'Elementary',
    sub: 'Matias V. Salvador Memorial Elementary School',
    year: 'Grades 1-6',
    active: false,
  },
];

export default education;
