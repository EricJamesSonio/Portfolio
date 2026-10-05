/**
 * Profile — single source of truth for the owner.
 * Content comes from the EXISTING Astro site (Hero.astro / About.astro / Contact.astro),
 * never from memory and never from references/content-seed.md (that describes a different person).
 */

/** TODO: confirm the exact role wording. Taken from the existing Hero ("Fullstack Developer ·
 *  Backend Specialist"). Add a short 3-word tagline here if you want the reference's tighter hero. */
export const role = 'Fullstack Developer · Backend Specialist';

/** Location from the existing Contact section. */
export const location = 'Pandi, Bulacan';

/** TODO: supply `public/Resume.pdf`. Until it exists the GET RESUME button renders disabled. */
export const resume = null;

/** Public email from the existing Contact component (mailto: link used by the hero). */
export const email = 'ericjamessonio7@gmail.com';

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

export default {
  name: 'Eric James Sonio',
  role,
  location,
  resume,
  email,
  portfolioYear,
  portrait,
  portraitHoverVideo,
};
