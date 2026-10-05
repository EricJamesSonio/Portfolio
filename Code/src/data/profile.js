/**
 * Profile — single source of truth for the owner.
 * Content comes from the EXISTING Astro site (Hero.astro / About.astro / Contact.astro),
 * never from memory and never from references/content-seed.md (that describes a different person).
 */

/** Role shown under the hero name, in the About quick facts, the chatbot prompt and the page
 *  meta description - so it is defined exactly once and can never drift between them.
 *  Owner update (2026-10-10): "Backend Specialist" -> "AI-Engineer". */
export const role = 'Fullstack Developer · AI-Engineer';

/** Location from the existing Contact section. */
export const location = 'Pandi, Bulacan';

/**
 * Resume file, linked by the hero's GET RESUME button.
 * The owner supplied `public/resume.docx` (16 KB, valid OOXML) on 2026-10-10, so this is no
 * longer a TODO. A `.docx` downloads via the button's `download` attribute rather than opening
 * in the browser; a `.pdf` would open inline, but converting it is outside the allowed
 * dependency list (AGENTS.md rule 4), so the supplied file is linked as-is.
 */
export const resume = '/Portfolio/resume.pdf';

/** Public email from the existing Contact component (mailto: link used by the hero). */
export const email = 'ericjamessonio7@gmail.com';

/**
 * Degree currently being taken. Shared by the Experience and Education timelines and by
 * the About copy, so the wording can never drift between the three.
 */
export const degree = 'BS Computer Science — 4th Year';
export const school = 'College of Mary Immaculate';

/** Natural-language form of the degree, used in prose (the About copy and the chatbot). */
export const degreeShort = 'Computer Science student';

/** Year shown in the top divider caption, e.g. "ERIC JAMES SONIO || PORTFOLIO 2026". */
export const portfolioYear = 2026;

/** Portrait from the existing hero (`public/assets/images/`). */
export const portrait = '/Portfolio/assets/images/eric.jpg';

/**
 * TODO: optional hover video for the portrait (light/dark).
 * None exists in the repo, so the hero renders the still image only.
 * Drop `portraitHoverVideo` files in `public/assets/videos/` and set this to enable it.
 */
export const portraitHoverVideo = null;

/** Owner's full name, also used by the About copy, the chatbot greeting and the footer. */
export const name = 'Eric James Sonio';

export default {
  name,
  role,
  location,
  resume,
  email,
  degree,
  degreeShort,
  school,
  portfolioYear,
  portrait,
  portraitHoverVideo,
};
