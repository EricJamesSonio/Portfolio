/**
 * Featured projects.
 *
 * Content source: descriptions and URLs are taken VERBATIM from the existing video cards in
 * `Projects.astro` so nothing is invented. Images are the user's screenshots in
 * `public/assets/images/`.
 *
 * Default order from phases.md: TechHub, NavSumaro, InterviewSpark, StartSmart, My Portfolio,
 * EduTool, Voting System, Apptel. Rows whose desktop/mockup image is missing are HIDDEN (never
 * rendered with a broken image) and listed in the review report.
 *
 * Image conventions (project-data-and-images.md):
 *   - `<slug>-desktop.png` + `<slug>-mobile.png` -> built CSS mockup (laptop + phone frame)
 *   - `<slug>-mockup.png`                      -> composite image, shown as-is
 *
 * TODO (owner):
 *   - TechHub, NavSumaro, InterviewSpark, StartSmart, My Portfolio: no screenshots supplied,
 *     so these rows are hidden. Add `<slug>-mockup.png` to `public/assets/images/` and the row
 *     appears automatically.
 *   - `tech` and `link` fields below are empty because the existing site never stated a stack or a
 *     live URL per project. Fill them in and the chips/buttons appear with no markup change.
 */

/**
 * Absolute path to the user's image folder.
 *
 * This module lives in `src/data/`, but the images live in `public/assets/images/`, so a
 * relative `../assets/images/` would resolve to `src/assets/images/` (which does not exist)
 * when the module is loaded directly by Node. Resolve through `process.cwd()` instead, which
 * is the project root under both `astro build` and `node`.
 */
const IMG_DIR = new URL('public/assets/images/', `file:///${process.cwd().replace(/\\/g, '/')}/`);
const VIDEO_DIR = '/Portfolio/assets/videos/';

/** Featured rows. `tech` and `link` are intentionally empty until the owner supplies them. */
const featured = [
  { name: 'TechHub', slug: 'techhub', description: '', tech: [], link: '', code: '', desktop: 'techhub-desktop.png', mobile: 'techhub-mobile.png', mockup: 'techhub-mockup.png' },
  { name: 'NavSumaro', slug: 'navsumaro', description: '', tech: [], link: '', code: '', desktop: 'navsumaro-desktop.png', mobile: 'navsumaro-mobile.png', mockup: 'navsumaro-mockup.png' },
  { name: 'InterviewSpark', slug: 'interviewspark', description: '', tech: [], link: '', code: '', desktop: 'interviewspark-desktop.png', mobile: 'interviewspark-mobile.png', mockup: 'interviewspark-mockup.png' },
  { name: 'StartSmart', slug: 'startsmart', description: '', tech: [], link: '', code: '', desktop: 'startsmart-desktop.png', mobile: 'startsmart-mobile.png', mockup: 'startsmart-mockup.png' },
  { name: 'My Portfolio', slug: 'portfolio', description: '', tech: [], link: '', code: '', desktop: 'portfolio-desktop.png', mobile: 'portfolio-mobile.png', mockup: 'portfolio-mockup.png' },

  {
    name: 'EduTool',
    slug: 'edutool',
    description:
      'Multi-tenant school management SaaS with full admin control over programs, school years, and student and educator accounts. Includes video meetings, AI assessment generation, auto-grading, and presentation tools for teachers.',
    tech: [],
    link: '',
    code: 'https://github.com/EricJamesSonio/EduToolV3',
    desktop: 'edutool-desktop.png',
    mobile: 'edutool-mobile.png',
    mockup: '',
  },
  {
    name: 'Voting System',
    slug: 'voting',
    description:
      'A fullstack voting system for managing candidates, voters, and real-time election results.',
    tech: [],
    link: '',
    code: 'https://github.com/EricJamesSonio/VotingSystem',
    desktop: 'voting-desktop.png',
    mobile: '',
    mockup: '',
  },
  {
    name: 'Apptel',
    slug: 'apptel',
    description:
      'Multi-tenant hotel management SaaS. Browse multiple hotels, with an admin dashboard for creating hotels, managing rooms, packages, and handling bookings end-to-end.',
    tech: [],
    link: '',
    code: 'https://github.com/EricJamesSonio/AppTel',
    desktop: 'apptel-desktop.png',
    mobile: '',
    mockup: '',
  },
];

// Build-time existence check so the page never requests a file that is not there.
const fs = await import('node:fs/promises');

async function exists(file) {
  if (!file) return false;
  try {
    await fs.access(new URL(file, IMG_DIR));
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolves each row to a render mode and drops rows with no usable image.
 * mode: 'composite' (single mockup image) | 'built' (laptop + phone CSS mockup)
 */
export async function getFeatured() {
  const resolved = await Promise.all(
    featured.map(async (p) => {
      const mockup = await exists(p.mockup);
      const desktop = await exists(p.desktop);
      const mobile = await exists(p.mobile);

      // Composite wins when both exist.
      if (mockup) {
        return { ...p, mode: 'composite', image: `/Portfolio/assets/images/${p.mockup}`, mobile: '' };
      }
      // No desktop image -> hide the row entirely.
      if (!desktop) return null;

      return {
        ...p,
        mode: 'built',
        desktopImage: `/Portfolio/assets/images/${p.desktop}`,
        mobileImage: mobile ? `/Portfolio/assets/images/${p.mobile}` : '',
      };
    })
  );
  return resolved.filter(Boolean);
}


/** Video-grid projects. The four that became featured rows are removed (see phases.md). */
export const videoProjects = [
  { category: 'fullstack', href: 'https://github.com/EricJamesSonio/StarBucks-Ecommerce', video: `${VIDEO_DIR}starbucks.mp4`, title: 'Starbucks Clone', desc: 'Fullstack e-commerce clone using PHP, HTML, CSS, JS and MySQL with product filtering and order system.' },
  { category: 'web', href: 'https://github.com/EricJamesSonio/Chatly', video: `${VIDEO_DIR}chatly.mp4`, title: 'Chatly', desc: 'A clone of Messenger built with real-time chat functionality and more.' },
  { category: 'tool', href: 'https://github.com/EricJamesSonio/PersonalApp', video: `${VIDEO_DIR}personalapp.mp4`, title: 'GitHub Tracker App', desc: 'Personal app tracking GitHub repo contribution streaks and custom commit metrics.' },
  { category: 'tool', href: 'https://github.com/EricJamesSonio/HelperTool', video: `${VIDEO_DIR}helpertool.mp4`, title: 'HelperTool', desc: 'A utility tool designed to streamline everyday development tasks and boost productivity.' },
  { category: 'fullstack', href: 'https://github.com/EricJamesSonio/Agri_fresh', video: `${VIDEO_DIR}agrifresh.mp4`, title: 'AgriFresh', desc: 'A fullstack agricultural e-commerce platform for farmers and buyers, featuring inventory management, product lists, and orders.' },
  { category: 'fullstack', href: 'https://github.com/EricJamesSonio/Jollibee', video: `${VIDEO_DIR}jollibee.mp4`, title: 'Jollibee Clone', desc: 'A fullstack Jollibee e-commerce clone featuring menu browsing, ordering, and checkout.' },
  { category: 'fullstack', href: 'https://github.com/EricJamesSonio/Gown', video: `${VIDEO_DIR}gown.mp4`, title: 'Gown System', desc: 'A fullstack gown rental and management system for handling inventory, bookings, and customer transactions.' },
  { category: 'fullstack', href: 'https://github.com/EricJamesSonio/SE2-MOTORDEV-FULLSTACK', video: `${VIDEO_DIR}motordev.mp4`, title: 'MotorDev', desc: 'A fullstack motorcycle dealership management system for handling inventory, sales, and customer transactions.' },
  { category: 'offline', href: 'https://github.com/EricJamesSonio/Sweetify', video: `${VIDEO_DIR}sweetify.mp4`, title: 'Sweetify', desc: 'A fullstack offline application with a chatbot, games, a slither-style game, a Candy Crush-inspired game, a gallery and music.' },
  { category: 'tool', href: 'https://github.com/EricJamesSonio/GoogleClassroomV1', video: `${VIDEO_DIR}googleclassroom.mp4`, title: 'Google Classroom Mini Clone', desc: 'A mini clone of Google Classroom featuring class management, assignments, and student-teacher interactions.' },
  { category: 'tool', href: 'https://github.com/EricJamesSonio/AssessmentGeneratorV2', video: `${VIDEO_DIR}assessmentgenerator.mp4`, title: 'Assessment Generator', desc: 'An AI-powered assessment generator for creating quizzes, exams, and evaluation materials efficiently.' },
];

/**
 * Projects whose videos are now unused because they became featured rows.
 * The .mp4 files are KEPT on disk (never deleted) and listed in the review report.
 */
export const unusedVideos = [
  { file: 'edutool.mp4', project: 'EduToolV2' },
  { file: 'edutool2.mp4', project: 'EduTool V3' },
  { file: 'votingsystem.mp4', project: 'Voting System' },
  { file: 'apptel.mp4', project: 'Apptel' },
];

export default { getFeatured, getHiddenFeatured, videoProjects, unusedVideos };

/** Rows that were hidden because no image exists, for the report. */
export async function getHiddenFeatured() {
  const all = await getFeatured();
  const shown = new Set(all.map((p) => p.slug));
  return featured.filter((p) => !shown.has(p.slug)).map((p) => p.name);
}
