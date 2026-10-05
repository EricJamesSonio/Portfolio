/**
 * Education timeline.
 *
 * Content source: the existing site names College of Mary Immaculate (4th-year Computer Science
 * student). Earlier stages were not listed on the existing site, so they are TODO placeholders
 * for the owner to fill in. Nothing is invented here.
 */
import { degree, school } from './profile.js';

export const education = [
  {
    title: degree,
    sub: school,
    year: 'Current',
    active: true,
  },
  // TODO (owner): add earlier stages (Senior High, Junior High, Elementary) with school + year.
];

export default education;
