# Review Report

## Summary

**Phases: 14 done, 0 blocked, 0 skipped.** Branch: `portfolio-upgrade`. Commits: 14 (one per phase).
`main` is untouched and **nothing has been pushed or deployed.**

| # | Phase | Status |
|---|-------|--------|
| 0 | Recon, plan, setup | DONE |
| 1 | Foundation (tokens, theme, base) | DONE |
| 2 | UI primitives | DONE |
| 3 | Hero | DONE |
| 4 | Bento (Experience, Education, About, Tech Stack) | DONE |
| 5 | Projects (Featured + video grid) | DONE |
| 6 | GitHub contributions | DONE |
| 7 | Certifications and Contact | DONE |
| 8 | Theme polish (ripple + audit) | DONE |
| 9 | AI chatbot | DONE |
| 10 | Content and data consolidation | DONE |
| 11 | Responsive pass | DONE |
| 12 | Accessibility, performance, SEO | DONE |
| 13 | Cleanup and release readiness | DONE |

The site was upgraded **in place**: still Astro 4, still plain CSS, no Tailwind, no rebuild.
React is used for exactly two small islands (GitHub graph, chatbot).

---

## What changed (by section)

Page flow now matches the reference exactly:

```
Divider "NAME || PORTFOLIO 2026" -> Hero
Divider "SOLVING THROUGH CODE"  -> Bento (Experience, Education | About, Tech Stack)
Divider "ITERATE. BUILD. DEPLOY." -> Projects (Featured mockups, then the video grid)
Divider "CONSISTENCY"           -> GitHub contributions
Divider "RECOGNITION | SOCIALS" -> Certifications | Contact -> Footer -> floating chatbot
```

- **Design** - replaced the old navy/gold "terminal" look with the reference mono + orange
  editorial style: monospace everywhere, one orange accent, flat square cards with thin
  accent-tinted borders, UPPERCASE card titles, fading-hairline divider captions.
- **Theme** - new light/dark token system. Follows the OS on first visit, remembers your choice,
  applies **before first paint** (no flash), and toggles with a circular ripple via the View
  Transitions API, degrading to an instant switch where unsupported.
- **Hero** - portrait + text, stacked on phones and side-by-side from `md`, role, location,
  buttons, and the theme pill. `GET RESUME` is currently disabled (no resume file - see TODOs).
- **Bento** - brand-new Experience and Education timelines with the `CODING SINCE` header and
  `Current` badge, About in three paragraphs, and Tech Stack as grouped chips. This also
  **removed 26 third-party img.shields.io badge requests**.
- **Projects** - new Featured Projects block above the video grid, with CSS-built laptop + phone
  mockups (the phone overlaps the laptop corner) and a striped placeholder phone when a project
  has no mobile screenshot.
- **GitHub** - new React island using react-github-calendar, orange 5-step palettes, square
  cells, year select, and horizontal scrolling **inside its own panel** on phones.
- **Certifications** - tile list with a keyboard-accessible lightbox (Escape, backdrop click,
  focus return, focus trap). Currently shows an honest empty state because there are none yet.
- **Contact** - replaced the EmailJS form with two link-tile columns. Phone is now a tel: link.
- **Chatbot** - new floating assistant with a teaser bubble, aria-live messages, and a secure
  serverless backend.
- **Footer / SEO** - centered mono footer, plus canonical URL, Open Graph, Twitter card,
  JSON-LD Person, favicon, robots.txt and sitemap.xml.

### Bugs found and fixed during the build gates

Several were invisible until the built HTML was inspected:

1. **Empty divider captions** - Divider read a `children` prop, but Astro passes
   `<Divider>TEXT</Divider>` as slot content. Every caption rendered blank. Fixed to `<slot />`.
2. **Broken build (infinite hang)** - a dynamic `await import()` in the chatbot prompt builder
   could not be resolved by the Vite client build. Replaced with a static import.
3. **Fragile image path** - featured-project images resolved relative to `src/data/`, pointing at
   a nonexistent `src/assets/images/`. Worked under Vite but returned zero projects under plain
   Node. Now resolved through `process.cwd()`.
4. **Invalid href=""** - URL-less link tiles rendered as `<div class="tile" href="">`.
5. **Heading-order skip** - timeline items were `<h4>` directly under `<h2>` card titles.
6. **Build/media collision** - astro.config.mjs had `build.assets: 'assets'`, making Vite emit
   bundles into the **same folder as your images and videos**. Removed; bundles now go to
   `dist/_astro/` so your media is protected.
7. **WCAG AA failures in light mode** - see below.
---

## Decisions that may need your approval

1. **Navbar removed** (per the default decisions). `Navbar.astro` and `navbar.css` are still in the
   repo, unused, so you can restore them. Old anchors (`#about`, `#tech`, `#projects`, `#contact`)
   still work.
2. **Colours were darkened for accessibility.** The reference palette fails WCAG AA on white
   (body 3.49:1, muted 2.77:1, faint 2.12:1). I kept the same neutral-grey family and hierarchy but
   darkened the values to meet 4.5:1, and made link orange a deep `#5f210d` instead of
   `orange-600 at 70%`. It still reads as the single orange accent. If you prefer exact parity with
   the reference over readability, all values are in `src/styles/base.css`.
3. **The EmailJS contact form was removed.** The reference contact section is link tiles, not a
   form. The EmailJS key/service/template IDs are no longer anywhere in the repo. Say the word and
   I will add the form back as a third card.
4. **Content came from your existing site, not `content-seed.md`.** That reference file describes a
   *different person* (Ehrvayn Rayven Olivera, Naga City, GitHub `ehrvayn`). Per the rule
   "reference wins for design, existing site wins for content", I used the reference **design** with
   **your** content and the `EricJamesSonio` username. Nothing from that file was copied.
5. **React 18, not 19.** React 19 needs Astro 5; upgrading Astro was outside the allowed scope, so
   the islands run on React 18. Nothing looks different.
6. **Default theme follows the OS**, remembered afterwards. (The reference defaults to dark.)
7. **Video grid has 11 cards in 3 columns**, so the last row has 2 cards. Left as is - filling it
   would have meant inventing a project.

---

## Content you need to provide (TODO)

Every item is a `TODO` in the code, listed in `docs/PORTFOLIO_PROGRESS.md`, and designed so that
adding the content updates the UI by itself:

| # | TODO | Where | Effect once supplied |
|---|---|---|---|
| 1 | **`public/Resume.pdf`** | `resume` in `src/data/profile.js` | GET RESUME becomes a real download link |
| 2 | **Screenshots for 5 featured projects** (TechHub, NavSumaro, InterviewSpark, StartSmart, My Portfolio) | `public/assets/images/<slug>-mockup.png` | 5 currently-hidden featured rows appear |
| 3 | **Mobile screenshots** for Voting System and Apptel | `<slug>-mobile.png` | placeholder phones become real ones |
| 4 | **Per-project tech chips** | `tech: []` in `src/data/projects.js` | chips render under each description |
| 5 | **Live URLs** for projects | `link: ''` in `src/data/projects.js` | a "View Project" button appears |
| 6 | **Certifications + images** | `src/data/certs.js` | empty state becomes rows + lightbox |
| 7 | **Facebook URL** | `src/data/links.js` | the Facebook tile becomes a link |
| 8 | **Messenger URL** | `src/data/links.js` | the Messenger tile becomes a link |
| 9 | **"Coding since" year** | `codingSince` in `src/data/experience.js` | the CODING SINCE header appears |
| 10 | **Earlier education stages** | `src/data/education.js` | more timeline rows |
| 11 | **Portrait hover video** | `portraitHoverVideo` in `src/data/profile.js` | portrait plays a loop on hover/tap |
| 12 | **Video poster frames** | - | videos show a still before loading |

Optional: your hero role reads `Fullstack Developer - Backend Specialist` (your existing wording).
The reference uses a tighter 3-word role - change `role` in `profile.js` if you prefer that.

---

## Images missing / unused media

**Missing** - all handled gracefully, see the TODO table above.

**Unused but kept on disk (never deleted):**

| File | Size | Why |
|---|---|---|
| `public/assets/videos/apptel.mp4` | 34.5 MB | card replaced by a featured row |
| `public/assets/videos/edutool2.mp4` | 19.9 MB | card replaced by a featured row |
| `public/assets/videos/votingsystem.mp4` | 3.4 MB | card replaced by a featured row |
| `public/assets/videos/edutool.mp4` | 1.3 MB | card replaced by a featured row |

**~59 MB of unreferenced video.** Safe to delete; nothing references them.

**Oversized assets still in use** (>500 KB) - the biggest performance lever:

`chatly.mp4` 9.7 MB - `personalapp.mp4` 7.7 MB - `sweetify.mp4` 3.1 MB - `helpertool.mp4` 2.7 MB -
`starbucks.mp4` 2.5 MB - `googleclassroom.mp4` 2.2 MB - `assessmentgenerator.mp4` 2.1 MB -
`agrifresh.mp4` 1.3 MB - `gown.mp4` 1.3 MB - `jollibee.mp4` 1.0 MB - `motordev.mp4` 0.8 MB -
`images/apptel-desktop.png` 709 KB

Nothing was recompressed or resized - that would modify your originals. Videos already lazy-load,
use `preload="none"`, play only when in view and pause when off screen, so they load as you scroll.
If you want, I can write compressed copies into a **new** folder and report before/after sizes.
---

## Environment and setup

### Variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `GROQ_API_KEY` | yes | - | create one at https://console.groq.com/keys |
| `GROQ_MODEL` | no | `llama-3.3-70b-versatile` | any model your key can access |

`.env.example` is committed with **names only**. No `.env` file exists in the repo, and `.env*` is
gitignored. Verified: no `gsk_*` key appears anywhere in the source or the built output.

### Hosting the chatbot - IMPORTANT

`api/chat.js` is written for **Vercel** and needs no configuration there.

**This repo deploys to GitHub Pages, which cannot execute serverless functions.** Until the site is
hosted on Vercel or Netlify, the chat button appears and works, but replies with a friendly
"assistant unavailable" message instead of erroring. This is the one piece that needs your action.

- **Vercel** - keep `api/chat.js` as is; add `GROQ_API_KEY` (and optionally `GROQ_MODEL`) to the
  project environment variables. Use `vercel dev` locally.
- **Netlify** - copy `api/chat.js` to `netlify/functions/chat.js`; set the same variables.

### Commands

```bash
npm install
npm run dev      # http://localhost:4321/Portfolio/
npm run build    # -> dist/
npm run preview
```

### Git

Branch `portfolio-upgrade`, 14 commits (one per phase). `main` is untouched.
**Nothing has been pushed or deployed.** To publish: `git push origin portfolio-upgrade` (or merge
into `main`, which triggers the GitHub Pages workflow).

---

## Blocked or skipped work

**No phase is blocked and none was skipped.** Two limitations worth recording:

1. **`npx astro check` was not run.** It requires `@astrojs/check`, which is not in the allowed
   dependency list, and it prompts to install packages interactively. The build itself passes at
   every phase. Run it yourself with `npm i -D @astrojs/check typescript && npx astro check` if you
   want the type diagnostics.
2. **No browser or screenshot tool is available** in the environment the work ran in, so responsive
   and theme checks were done by **inspecting the built HTML and CSS** (element counts, computed
   contrast ratios, media-query presence) rather than by rendering at each width. The CSS was
   written to the documented responsive rules, but **please eyeball it in a real browser.**

---

## Known limitations

- The chatbot cannot work on GitHub Pages (see above).
- Featured-project rows and certifications are placeholders until you supply content.
- Two contact tiles (Facebook, Messenger) are non-interactive because no URL exists for them.
- No video poster frames, so video cards show an empty panel briefly before the first frame.
- Four videos (~59 MB) are unreferenced. Harmless, but they still ship inside `dist/`.
- `dist/` includes every video, so the built folder is large. Consider external media hosting.

---

## What to check first (manual review)

1. **Toggle the theme** in the hero. Confirm the ripple expands from the button, that it survives a
   reload with no flash, and that it respects "reduce motion" if enabled in your OS.
2. **Check both themes at 375px and 1536px**, looking specifically for horizontal scroll. The bento
   should be one column under 1024px and 35/65 above it.
3. **Open the chat button** after 2 seconds (teaser should appear), type a message, and confirm the
   graceful "unavailable" message on GitHub Pages rather than a crash.
4. **Scroll to the Featured Projects block** and confirm EduTool shows a laptop + real phone, while
   Voting System and Apptel show a laptop + striped placeholder phone.
5. **Confirm the videos** play when scrolled into view and pause when scrolled away, and that the
   11 cards filter correctly by category.
6. **Reload the GitHub contributions card** and confirm the graph renders orange and scrolls inside
   its panel rather than the page.
7. **Keyboard-test**: Tab through the page (focus ring should be visible orange), open the
   certificate lightbox with a certificate added, and press Escape.
8. **Read the About and Experience copy** and confirm it is accurate for you - this is your
   personal content, not the reference's.

---

## How to request changes

Use these ready-made prompts (from `skills/astro-portfolio-upgrade/references/agent-prompts.md`):

- **"Resume the portfolio upgrade loop."** - pick up from the progress file at the first unfinished phase.
- **"Run only Phase N."** - re-run a single phase.
- **"Add certifications to the portfolio."** - fill in `src/data/certs.js` with a list, then build.
- **"Add a featured project: <name>."** - add one entry to the `featured` array plus its images.
- **"Fix: <specific problem>."** - a targeted single-phase fix.
- **"Review the portfolio build and list issues."** - a fresh audit against the quality checklist.

Every edit you make should go in `src/data/`. Components read from there, and the chatbot prompt is
generated from the same files, so one change updates the page and the assistant together.