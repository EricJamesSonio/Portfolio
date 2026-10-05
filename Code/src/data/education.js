/**
 * Education timeline, ordered from elementary school to the current degree.
 *
 * Content source: supplied by the owner on 2026-10-10 (school names and grade ranges are
 * verbatim). The current entry reuses `degree` and `school` from `profile.js`, so the wording
 * can never drift from the hero, the About copy or the chatbot prompt.
 *
 * `year` is the grade range shown on the right. The active entry renders a "Current" badge
 * instead (see `Timeline.astro`), so its grade range lives in `sub`.
 */
import { degree, school } from './profile.js';

export const education = [
  {
    title: 'Elementary',
    sub: 'Matias V. Salvador Memorial Elementary School',
    year: 'Grades 1-6',
    active: false,
  },
  {
    title: 'Junior High',
    sub: 'Holy Angels Academy',
    year: 'Grades 7-8',
    active: false,
  },
  {
    title: 'Senior High',
    sub: 'Virginia Ramirez National High School',
    year: 'Grades 9-10',
    active: false,
  },
  {
    title: 'Senior High',
    sub: school,
    year: 'Grades 11-12',
    active: false,
  },
  {
    title: degree,
    sub: `${school} - Years 1-4`,
    year: '',
    active: true,
  },
];

export default education;
