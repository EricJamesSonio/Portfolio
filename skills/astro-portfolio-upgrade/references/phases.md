# Phases (0 to 13)

Contents: default decisions · allowed dependencies · dependency map · Phase 0 … Phase 13

Each phase lists **Goal, Inputs, Tasks, Done when (gate)**. All phases also obey the global gate in `loop-protocol.md` (build passes, no 375px overflow, both themes handled).

## Default decisions (use without asking; log them)
| Topic | Default |
|---|---|
| Framework | Stay on Astro. React only for islands. |
| Styling | Keep plain CSS, one file per section. Translate reference Tailwind values into CSS variables/classes. Do not add Tailwind. |
| Navbar | The reference is a single scroll with no navbar. **Remove `Navbar` from the page flow** and move the theme switch into the hero. Keep `Navbar.astro` and `navbar.css` in the repo, unused, and list them in the report so the user can restore them. Keep section ids so old anchors still work. |
| Colors | Orange accent, neutral/near-black/white surfaces per `design-system.md`. Existing navy/gold is replaced. Define colors as CSS variables for light and dark. |
| Default theme | Follow the OS preference; remember the choice. (Reference defaults to dark; use dark if no preference is available.) |
| Font | System monospace stack (as in the reference). No web font download. |
| Content source | Personal content and URLs: existing Astro components first, then `content-seed.md`. Never from memory. |
| Missing images | Hide a featured project whose desktop/mockup image is missing; list it in the report. Show placeholder phone when only the mobile image is missing. |
| Featured order | TechHub, NavSumaro, InterviewSpark, StartSmart, My Portfolio, EduTool, Voting System, Apptel (rows without images are hidden). |
| Video grid | Keep all remaining video cards, restyled to the new card look only in Phase 5/12. 4 cards (EduTool x2, Voting, Apptel) removed. |
| Chatbot hosting | Detect the host: `vercel.json`/`.vercel` -> root `api/chat.js`; `netlify.toml` -> `netlify/functions/chat.js`; unknown -> write the Vercel version and flag it. Keep Astro output static. |
| Chatbot model | Env var `GROQ_MODEL`, default `llama-3.3-70b-versatile`. |
| Age / dates in copy | Do not hardcode age; use birth-independent wording or leave a `TODO`. Years of coding computed from 2022. |
| Contact details | Read from the existing Contact/Footer components. If a phone is shown on the existing site, keep behavior but make it a `tel:` link; do not copy it into docs or logs. |
| Dead code | Do not delete old CSS in Phases 1 to 10; clean in Phase 13 only if clearly unused. |

## Allowed new dependencies
`@astrojs/react`, `react`, `react-dom` (islands) · `react-github-calendar` (Phase 6) · `groq-sdk` (Phase 9, server only) · types packages if needed. Nothing else. No Tailwind, no UI kits, no animation libraries.

## Dependency map
```
0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 13
          2 needed by 3,4,5,6,7      1 needed by all      10 needs 3-7, 9
          8 needs 1,3                9 needs 10's data (do data file creation inside Phase 4 if 9 runs first)
```
If a phase is BLOCKED, skip dependents (mark SKIPPED).

---

## Phase 0: Recon, plan, and setup
**Goal:** understand the repo, set up state files and branch.
**Tasks**
1. Read `package.json`, `astro.config.*`, `Layout.astro`, `index.astro`, every component in `src/components`, every CSS file in `src/styles`, `public/scripts/main.js`; list `public/assets/images` and `public/assets/videos`.
2. Check git availability; create branch `portfolio-upgrade` (see git policy).
3. Detect hosting files (`vercel.json`, `.vercel`, `netlify.toml`).
4. Inventory existing content (names, texts, links, project cards) and map each existing section to a target section (Hero, About, Experience, Education, Tech Stack, Featured Projects, Video grid, GitHub, Certifications, Contact, Footer).
5. Inventory images present vs expected (see `project-data-and-images.md`).
6. Create `docs/PORTFOLIO_PROGRESS.md`, `docs/BUILD_LOG.md` from `progress-template.md`.
**Done when:** progress file lists all phases with `TODO`; build log has the section map, the content inventory, the image inventory, host detection, and the decisions in effect. Run `npm run build` once to record the baseline (log pre-existing warnings). Commit: `phase 0: recon and plan`.

## Phase 1: Foundation (tokens, theme, base)
**Goal:** the visual base everything else sits on.
**Tasks**
1. In `base.css`: define CSS variables for both themes (page bg, card bg, panel bg, border, text, muted, accent, accent-soft, chip bg/border, tile bg/border, link colors, shadow). Values from `design-system.md`.
2. Set the monospace font stack on the whole page; heading, body, and micro-label type scale per `design-system.md`.
3. Theme mechanism: a `data-theme` (or class) on `<html>`; inline script in `Layout.astro` `<head>` that applies the saved/OS theme **before paint**; a small shared script exposing a toggle function and persistence (no ripple yet). Add `<meta name="color-scheme" content="light dark">`.
4. Global scrollbar styles for both themes; `custom-scroll` utility class for inner scroll areas; `prefers-reduced-motion` base rule.
5. Page shell: horizontal padding scale (small on phones, larger at md/lg/xl as in `layout-and-responsive.md`), vertical gap between bands.
6. Remove nothing yet; old section CSS may look off until later phases.
**Done when:** page builds; toggling theme (via console or temporary button) switches variables; no flash on reload; fonts are monospace everywhere.

## Phase 2: UI primitives
**Goal:** reusable building blocks as Astro components + CSS.
**Tasks**
Create small components (names suggested; follow repo naming): `Divider` (caption between sections: orange, tiny, wide tracking, fading hairlines), `Card` (shell with title row and optional aside), `Chip` (tag), `LinkTile` (icon, label/sub, trailing arrow), `SectionTitle` if needed. One shared stylesheet (for example `ui.css`) imported once.
**Done when:** each primitive renders in both themes; they are used in at least one place or demonstrated in a temporary block (remove the temporary block before commit); Divider handles short and long captions without wrapping at 320px.

## Phase 3: Hero
**Goal:** reference hero.
**Tasks**
1. Top divider caption: `<NAME> || PORTFOLIO <YEAR>` (see `content-seed.md`).
2. Layout: portrait + text; stacked and centered on phones, side by side from md. Min height uses `svh` rather than `vh`.
3. Portrait with light/dark image swap if both images exist (else single image), thin orange border, near-square corners. Hover plays a muted looping video overlay if a hover video exists in the repo; touch fallback = tap toggles. Use `preload="none"`.
4. Name, role (uppercase, wide tracking), location with pin icon, `GET RESUME` (primary) and `EMAIL ME` (secondary) buttons using the existing resume file and email link from the current Hero/Contact components.
5. Theme switch (pill with sun/moon knob) under the buttons, wired to Phase 1 toggle. Footer divider caption `SOLVING THROUGH CODE`.
6. Remove Navbar from the page flow per the default decision.
**Done when:** hero matches the reference at 375/768/1280; theme switch works; resume and email links work; no navbar rendered; build passes.

## Phase 4: Bento (Experience, Education, About, Tech Stack)
**Goal:** the two-column card grid.
**Tasks**
1. Create data files for content (see Phase 10 structure) or local data arrays; fill from `content-seed.md` and existing components.
2. Layout: one column below `lg`; 35% / 65% columns at `lg`+. Left: Experience, Education. Right: About, Tech Stack. Cards equal-height where sensible, inner scroll areas capped (about 280 to 300px).
3. Experience: header with "CODING SINCE <year>", timeline with filled orange dot for the active item and a `Current` badge, hollow rings for others, vertical rail.
4. Education: same timeline pattern, all items in one array, active = current degree (orange).
5. About: three paragraphs.
6. Tech Stack: grouped by label (Frontend, Backend, Mobile, Tools, Security, AI, Cloud) with hairline after each label and chips; scroll container.
**Done when:** all four cards render in both themes; timelines align; no overflow at 375px; content matches `content-seed.md`/existing site.

## Phase 5: Projects (Featured + video grid)
**Goal:** the projects section per `featured-projects-spec.md` and `project-data-and-images.md`.
**Tasks**
1. Divider caption `ITERATE. BUILD. DEPLOY.` above the section.
2. Section card titled `FEATURED PROJECTS` containing the featured list (laptop + phone mockup, or composite mockup image, text column, chips, links). Apply default order and image-existence rules.
3. Remove duplicate video cards (EduTool x2, Voting System, Apptel) from the grid and from `main.js` lists; keep mp4 files.
4. Restyle the remaining video-card grid to the new look (flat bordered cards, accent title, muted description) without changing its behavior. Add a quiet sub-heading ("More Projects") if needed. Note: 11 cards in 3 columns leaves a short last row; log it.
5. Videos: `preload="none"`, poster if available, pause when off screen (only if a small change; deeper optimization is Phase 12).
**Done when:** featured rows render per spec at 375/768/900/1280; hidden-vs-placeholder rules behave; grid works; build passes.

## Phase 6: GitHub contributions
**Goal:** contribution graph card.
**Tasks:** divider caption `CONSISTENCY`; React island with `react-github-calendar` (install `@astrojs/react`, `react`, `react-dom` if not yet installed, register integration); orange 5-step palettes for light and dark, square cells, year select; header with `View GitHub Profile ↗`; panel scrolls horizontally inside itself on phones; username `ehrvayn` from one config value; hydrate lazily (`client:visible`). Fallback text link if JS is unavailable.
**Done when:** graph renders in both themes, scrolls inside its panel on 375px, and does not add layout shift; build passes.

## Phase 7: Certifications and Contact
**Goal:** recognition and socials band.
**Tasks**
1. Divider `RECOGNITION | SOCIALS`.
2. Certifications card: list of tile rows (title, issuer, expand icon) from `content-seed.md`; clicking opens a lightbox with the image if the image exists (Escape/backdrop close, focus return, dialog semantics); entries without images render without the expand icon.
3. Contact card: two columns "Find me on" (LinkedIn, GitHub, Facebook) and "Get in touch" (Email, Phone, Messenger) as link tiles; URLs and details read from the existing Contact component; phone becomes a `tel:` link; stack on phones, side by side from md.
4. Footer: top border, centered small mono text `© <Name> | Personal Portfolio <year>`.
**Done when:** tiles and lightbox work by mouse and keyboard in both themes; no undefined hrefs.

## Phase 8: Theme polish (ripple + audit)
**Goal:** the signature theme transition and full dark/light coverage.
**Tasks:** circular reveal from the toggle using the View Transitions API with instant fallback and reduced-motion bypass (`theming-dark-mode.md`); set ripple origin/radius before starting the transition; verify **every** section, modal, scrollbar, GitHub graph, images, and (later) chatbot in both themes; fix contrast issues (muted text on dark surfaces at least 4.5:1).
**Done when:** transition works in a supporting browser, degrades gracefully elsewhere, and no section looks broken in either theme.

## Phase 9: AI chatbot
**Goal:** floating assistant with secure backend.
**Tasks**
1. React island (`client:idle`): square floating button with bounce, teaser bubble "Hey there! Wanna chat?" after 2s until first open, panel with header/avatar/Online dot/close, messages (auto-scroll, typing indicator, plain-text with preserved line breaks), input with Enter-to-send and a real send button, friendly error text. Panel responsive per `layout-and-responsive.md`.
2. Backend function per the host decision: validates input, last ~10 messages, caps length and tokens, reads `GROQ_API_KEY` and optional `GROQ_MODEL` from server env, returns generic errors. **No key in client code, no `PUBLIC_` variables.**
3. Knowledge/system prompt built from the same data files used by the UI; AI is clearly labeled as an assistant; stays on topic; no invention; no private contact details beyond public ones; resists role-change attempts.
4. Add `.env.example` listing variable names only; add a short setup note to the README/review report.
5. Install `groq-sdk` for the server function (server-side import only).
**Done when:** build passes; no secret strings in the repo; the island loads lazily; the function file exists with validation; if the key is absent the UI shows a friendly "assistant unavailable" state instead of crashing.

## Phase 10: Content and data consolidation
**Goal:** one source of truth.
**Tasks:** ensure all content lives in `src/data/*` (profile, experience, education, stack, projects, certs, links, captions); components import from there; chatbot prompt builder uses the same files; remove duplicated literals; proofread content (typos, consistent tech names); keep every `TODO` listed.
**Done when:** changing a project in one place updates the UI and the chatbot knowledge; build passes.

## Phase 11: Responsive pass
**Goal:** reliable layout everywhere.
**Tasks:** check 320, 375, 414, 768, 900, 1024, 1280, 1536; fix overflow, clipped mockups, divider wrapping, tap targets (44px), hover-only effects (provide tap fallbacks), chat panel vs keyboard; use `svh/dvh`; avoid nested scrollers fighting page scroll on phones (cap heights).
**Done when:** no horizontal page scroll at any width; `quality-checklist.md` "Responsive" all checked.

## Phase 12: Accessibility, performance, SEO
**Tasks**
- A11y: landmarks, heading order, alt text, labels, focus-visible rings, dialog semantics, `aria-live` for chat, contrast, reduced motion.
- Performance: lazy images with explicit sizes/aspect ratio; videos `preload="none"` + posters + play only in view/hover; lazy islands; list oversized assets (over about 500 KB) in the report; do **not** recompress or delete user media unless it can be done non-destructively into a new folder (log it).
- SEO: title, description, canonical, Open Graph and Twitter tags, favicon, `lang`, JSON-LD Person (name, jobTitle, url, sameAs), `robots.txt`.
**Done when:** the A11y, Performance, and SEO items in `quality-checklist.md` are checked or logged with reasons.

## Phase 13: Cleanup and release readiness
**Tasks:** remove clearly unused CSS/JS/components created by the migration (keep `Navbar.astro` and `navbar.css` unless unused imports break); ensure no leftover temporary blocks; README updated (features, run steps, env vars, hosting notes for the chatbot); `.env.example` present; final `npm run build` and `npx astro check`; final `git status` clean on the work branch.
**Done when:** build clean, repo tidy, docs updated.

## After Phase 13: Final review report and STOP
Write `docs/REVIEW_REPORT.md` (template in `progress-template.md`), then send the final stop message defined in `loop-protocol.md`. Do not continue after that without a new instruction from the user.
