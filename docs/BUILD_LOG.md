# Build Log

## Baseline (Phase 0)

- **Build result before changes:** pending (run at end of Phase 0)
- **Framework:** Astro `^4.0.0`, static output, `base: '/Portfolio'`, `build.assets: 'assets'` (removed in Phase 0)
- **⚠️ Base-path finding:** the repo folder is named `Porttfolio` (double "t") but `astro.config.mjs` sets
  `base: '/Portfolio'` (single "t"). **Source files consistently use `/Portfolio/...`** (verified with
  `git show HEAD` and a repo-wide grep), so source and config agree and every asset resolves correctly
  in `dist/index.html`. Do not "fix" the base without confirming the live GitHub Pages URL, because the
  live site is served from `/Portfolio` and changing it would 404 every asset. Flagged in the report.
- **Host detection:** no `vercel.json`, no `.vercel`, no `netlify.toml`. Hosting is **GitHub Pages** via
  `.github/workflows/deploy.yml`. Per the Default decisions table ("unknown -> write the Vercel version
  and flag it"), the chatbot backend is written as `api/chat.js` (Vercel style) and flagged in the report.
- **Repo state at start:** branch `main`, clean tree except untracked `AGENTS.md`, `skills/`, 4 screenshots.

### Section map: existing -> target

| Existing | Target | Phase | Action |
|---|---|---|---|
| `Navbar.astro` | (removed from flow) | 3 | File + CSS kept in repo, unused; anchors preserved |
| `Hero.astro` | Hero | 3 | Rebuild to reference (portrait, role, location, buttons, theme pill) |
| `About.astro` | Bento > About | 4 | Rebuild as card with 3 paragraphs |
| `TechStack.astro` | Bento > Tech Stack | 4 | Rebuild as grouped chips (drop shields.io badges) |
| (none) | Bento > Experience | 4 | NEW |
| (none) | Bento > Education | 4 | NEW |
| (none) | Bento grid wrapper | 4 | NEW, 35/65 columns at `lg` |
| `Projects.astro` (featured) | Featured Projects | 5 | NEW block above the grid |
| `Projects.astro` (grid) | Video grid | 5 | Restyle; drop 4 duplicate cards |
| (none) | GitHub contributions | 6 | NEW React island |
| (none) | Certifications | 7 | NEW |
| `Contact.astro` | Contact | 7 | Rebuild as two link-tile columns |
| `Footer.astro` | Footer | 7 | Restyle to centered small mono text |
| (none) | Dividers (5 captions) | 2/3/5/6/7 | NEW `Divider` primitive |
| (none) | AI chatbot | 9 | NEW React island + serverless function |

### Content inventory (source of truth = EXISTING site)

- **Name:** Eric James Sonio
- **Role:** Fullstack Developer - Backend Specialist
- **Location:** Pandi, Bulacan
- **School:** College of Mary Immaculate (4th-year Computer Science student)
- **GitHub:** `https://github.com/EricJamesSonio`
- **LinkedIn / Email / Phone:** kept in `src/data/links.js` only; never copied into docs, logs or reports
- **Resume:** `TODO` - no resume file exists in `public/`
- **About copy:** 4 paragraphs in the existing `About.astro` (intro, skills/experience, outside coding, connect)
- **Tech stack groups (existing):** Frontend, Backend, Database, Tools & Testing, Deployment
- **Projects:** 15 video cards with real GitHub URLs in `Projects.astro`
- **Certifications:** none exist in the existing site and no certificate images supplied -> empty state + `TODO`

> **IMPORTANT content-source decision.** `references/content-seed.md` describes a *different person*
> (Ehrvayn Rayven Olivera, Naga City, GitHub `ehrvayn`). AGENTS.md rule 2: "reference wins for design;
> existing site wins for personal content and URLs." Therefore the **reference design** is used but
> **Eric James Sonio's real content** is used for all copy, links, and the GitHub username
> (`EricJamesSonio`, not `ehrvayn`). No personal detail from `content-seed.md` is copied.

### Image inventory

Present in `public/assets/images/`:

| File | Used for |
|---|---|
| `eric.jpg` | Hero portrait |
| `edutool-desktop.png` | EduTool featured laptop mockup |
| `edutool-mobile.png` | EduTool featured phone mockup |
| `voting-desktop.png` | Voting System featured laptop mockup |
| `apptel-desktop.png` | Apptel featured laptop mockup |

Missing (handled per spec, listed in the report):

- `voting-mobile.png`, `apptel-mobile.png` -> placeholder phone frames
- 5 composite mockups (TechHub, NavSumaro, InterviewSpark, StartSmart, My Portfolio) -> rows hidden
- 4 certificate images -> no expand icon, honest empty state
- `Resume.pdf` -> `GET RESUME` button rendered disabled and marked `TODO`

Video inventory: 15 `.mp4` files in `public/assets/videos/`. After Phase 5 removals, 4 become unused
(`edutool.mp4`, `edutool2.mp4`, `votingsystem.mp4`, `apptel.mp4`) and are **kept on disk** (never deleted).

### Oversized assets (>500 KB) for the report

| Asset | Size |
|---|---|
| `videos/apptel.mp4` | 34.5 MB (unused after Phase 5) |
| `videos/edutool2.mp4` | 19.9 MB (unused after Phase 5) |
| `videos/chatly.mp4` | 9.7 MB |
| `videos/personalapp.mp4` | 7.7 MB |
| `videos/votingsystem.mp4` | 3.4 MB (unused after Phase 5) |
| `videos/sweetify.mp4` | 3.1 MB |
| `images/apptel-desktop.png` | 709 KB |
| `videos/helpertool.mp4` | 2.7 MB |
| `videos/starbucks.mp4` | 2.5 MB |
| `videos/googleclassroom.mp4` | 2.2 MB |
| `videos/assessmentgenerator.mp4` | 2.1 MB |
| `videos/agrifresh.mp4` | 1.3 MB |
| `videos/edutool.mp4` | 1.3 MB (unused after Phase 5) |

## Decisions

- [Phase 0] Stay on Astro with plain CSS; React only for the 3 islands (AGENTS.md rule 3 + Default decisions).
- [Phase 0] Content comes from the **existing site**, not `content-seed.md`, because that file describes a
  different person. Design still follows the reference. GitHub username is `EricJamesSonio`.
- [Phase 0] Remove `build.assets: 'assets'` from `astro.config.mjs` so Astro emits bundles into `/_astro/`.
  With that setting, bundled JS/CSS would land in `/assets/` and collide with `public/assets/`, which holds
  the user's images and videos. Once Phase 6/9 add React islands the collision becomes a real overwrite
  risk for user media, which rule 6 forbids.
- [Phase 0] Add `.gitignore` (`node_modules`, `dist`, `.astro`, `.env*` with `!.env.example`,
  `desktop.ini`). There was none, and `desktop.ini` sits inside the images folder.
- [Phase 0] `public/scripts/main.js` will crash once the Navbar is removed because it reads
  `document.querySelector('.navbar').offsetHeight`. It gets a null guard in Phase 13 (kept working in
  Phases 1-10 per the "do not delete old JS" decision).

## Phase 13: Cleanup and release readiness

- Plan:
  - Removed clearly-unused CSS created by the migration, kept `Navbar.astro` / `navbar.css`.
  - Removed the legacy alias variables that no live stylesheet references.
  - Rewrote the README for the new architecture.
  - Final build + verification.
- Removed as dead code (all written for the old navy/gold design):
  - `src/styles/about.css`, `src/styles/tech.css`, `src/styles/contact.css`,
    `src/styles/responsive.css` — their markup no longer exists (About/TechStack are now cards,
    the contact form was replaced by link tiles, and every breakpoint now lives in its own file).
  - The trailing legacy block in `base.css` (`.section`, `.section h2`, `.section h2::after`,
    `.section-intro`, `.section p`) which no component uses.
  - The `--ink` / `--ink-card` / `--gold` / `--gold-dim` / `--text-primary` alias variables.
    Verified first that all 56 of their usages were confined to the four dead files.
- Kept deliberately (per the Default decisions table): `src/components/Navbar.astro` and
  `src/styles/navbar.css`. They are **not rendered**, are not imported, and the README explains how
  to restore or delete them.
- Fixed during the pass: removing the alias block also removed `--ease` / `--ease-out` /
  `--ease-spring`, which *are* used by the live stylesheets. Restored them into the main `:root`
  block.
- README rewritten: quick start, project structure, **a table of every `src/data/` file**, how to
  add a featured project and a certificate, the chatbot env vars and the Vercel/Netlify hosting
  instructions (including the GitHub Pages limitation), theming notes, deployment, performance
  notes, and the unused-but-kept files.
- Gate results:
  - **Build ok** (1 page, 37.9s).
  - Featured rows 3, video cards 11, chatbot island present — unchanged by the cleanup.
  - **`astro check` was skipped**: it requires `@astrojs/check` + `typescript`, and
    `@astrojs/check` is not in the allowed dependency list. It also prompts interactively to
    install, which is not possible in this environment. Logged as a known limitation.
  - **Privacy scan: the phone number appears in neither `docs/` nor `dist/`.** It exists only in
    `src/data/links.js` as a `tel:` link, as required.
  - **Secret scan: no `gsk_*` key anywhere in `dist/`.**
  - **User media intact: 5 images and 15 videos** in both `public/` and `dist/`.
  - **No `.env` file exists**; only `.env.example` (names only) is tracked by git.
- Issues: `astro check` not run (see above). No other problems.

## Phase 12: Accessibility, performance, SEO

- Plan:
  - **A11y:** audited landmarks, heading order, alt text, labels, focus rings, dialog semantics,
    `aria-live`, contrast and reduced motion. Fixed a real heading-order bug.
  - **SEO:** canonical URL, Open Graph, Twitter card, favicon, `robots.txt`, `sitemap.xml`,
    JSON-LD `Person`, author meta, `lang`, `theme-color`.
  - **Performance:** verified lazy loading, explicit aspect ratios, video `preload="none"` and
    lazily hydrated islands. Inventoried oversized assets (no user media was modified).
- Fixes and additions:
  - **Heading-order bug fixed.** The timeline items rendered as `<h4>` directly under `<h2>` card
    titles, skipping a level. `Timeline.astro` now takes a `heading` prop (default `h3`), so the
    order is h1 -> h2 -> h3 throughout with no skipped levels.
  - **Removed the Google Fonts `<link>`.** After the Phase 1 rewrite nothing uses Playfair Display,
    DM Sans or DM Mono — the whole site is on the system monospace stack. This drops two preconnects
    and a third-party stylesheet from the critical path.
  - **Added `Layout.astro` frontmatter** so SEO values come from the data files rather than literals:
    title, description, canonical, OG/Twitter tags, and the JSON-LD `Person` schema.
  - **`site` set in `astro.config.mjs`** so Astro can build absolute canonical/OG URLs.
  - **`public/favicon.svg`** — a black square with an orange monospace "E" (on-theme, tiny, no
    binary asset added).
  - **`public/robots.txt`** and **`public/sitemap.xml`** (hand-written; `@astrojs/sitemap` is not an
    allowed dependency, and the site is a single page).
- Gate results: **build ok** (1 page, 29.8s). Verified:
  - `<html lang="en">`, canonical link, `og:type/title/description/url/image/locale`,
    `twitter:card/title/description/image/creator`, author meta, favicon and apple-touch-icon all present.
  - `robots.txt`, `sitemap.xml` and `favicon.svg` are copied into `dist/`.
  - **JSON-LD parses as valid JSON** with the correct name and 2 `sameAs` entries, and **does not
    contain the phone number**.
  - **Heading order is now valid**: `h1` (name) -> `h2` (each card) -> `h3` (each project/item).
    No skipped levels anywhere.
  - **All 5 `<img>` elements have meaningful alt text** ("Portrait of Eric James Sonio",
    "<Project> desktop screenshot", "<Project> mobile screenshot").
  - `fonts.googleapis` no longer appears in the output.
- Performance state:
  - Hero portrait: `loading="eager"` + explicit `width`/`height`.
  - Featured screenshots: `loading="lazy"` + `decoding="async"`, inside CSS `aspect-ratio` boxes, so
    there is no layout shift.
  - Videos: `preload="none"`, no `autoplay`, `data-src` lazy loading, play when >=35% in view, pause
    when off screen. **No poster images exist** (listed as a TODO).
  - Islands: GitHub graph is `client:visible`, chatbot is `client:idle`; the React runtime is never
    needed for first paint.
  - Oversized assets (>500 KB) are listed in `docs/BUILD_LOG.md` and the review report. **No user media
    was recompressed, resized or deleted** (rule 6).
- A11y state: landmarks present (`<main>`-equivalent shell, `<header>`/`<footer>`), `:focus-visible`
  2px accent ring, lightbox `role="dialog" aria-modal` with Escape/backdrop close, focus return and a
  focus trap, chat `aria-live="polite"` with a real `<button>` send control, decorative SVGs
  `aria-hidden`, all tap targets >= 44px, and a global `prefers-reduced-motion` block.
- Issues: none. Contrast was already corrected in Phase 8.

## Phase 11: Responsive pass

- Plan:
  - Grepped every stylesheet for overflow sources: `100vw`, fixed widths >= 500px, negative margins,
    `min-width` on the root, and every `white-space: nowrap`.
  - Fixed the real risks found (see below), then re-verified the built CSS.
- Fixes applied:
  1. **`.card-head` now wraps.** A long UPPERCASE card title next to a `white-space: nowrap` link
     (the GitHub card) could exceed the viewport on a phone. Added `flex-wrap: wrap`.
  2. **`overflow-wrap: anywhere`** on cards, card bodies, tiles, the featured text column and the
     bento columns, so a long unbroken string can never widen the page.
  3. **`.gh-profile-link` drops its `nowrap` below 480px**, so it wraps under the title instead of
     pushing the card header wider than the screen.
  4. **Hero buttons**: below 420px the padding drops from `16px 40px` to `14px 20px` and the tracking
     from `0.2em` to `0.12em`, so `GET RESUME TODO` and `EMAIL ME` fit at 320px.
  5. **Overflow guard**: `.shell, .shell > * { max-width: 100% }`, plus `overflow-x: auto` on the
     inner scrollers (timeline, stack groups, featured list, GitHub panel, cert list) so wide content
     scrolls inside its own box rather than on the page.
  6. **`svh`/`dvh`**: `html` uses `min-height: 100dvh`, the hero uses `95svh`, and the chat panel uses
     `60svh` with a `60dvh` `@supports` upgrade, so the on-screen keyboard cannot push the chat input
     off the bottom of a phone screen.
  7. **Hover-only effects gated behind `(hover: hover) and (pointer: fine)`** — both the portrait
     video and the project-card video zoom — so touch devices do not get a stuck hover state.
     `overflow-x: hidden` on `body` alone is unreliable for fixed elements, hence the explicit guard.
- Gate results: **build ok** (1 page, 36.7s). Verified in the built CSS:
  - **No `100vw`**, **no negative margins**, **no `min-width` on the root** — the three classic causes
    of horizontal page scroll.
  - The only `max-width` values >= 500px are `max-width` (not fixed widths) on legacy
    `.section` / `.section-intro` / `.hero-text` rules.
  - `overflow-wrap: anywhere` and the 420px button rule are present.
  - `svh` **and** `dvh` both appear; two `(hover: hover) and (pointer: fine)` blocks are present.
  - Tap targets: `.tile` `min-height: 44px`, theme switch `min-height: 44px` (its visual pill is
    56x28, the hit area is padded), chat FAB 48x48.
- Widths reviewed: 320, 375, 414, 768, 900, 1024, 1280, 1536. The bento splits at 1024, the featured
  rows at 901, the contact columns at 768, and the GitHub/recognition bands at 1024 — matching the
  reference's breakpoints.
- Issues: none. No browser/screenshot tool is available in this environment, so widths were verified by
  CSS inspection against the responsive rules rather than by rendering; this is called out in the report.

## Phase 10: Content and data consolidation

- Plan:
  - Audited the whole tree for duplicated literals with a repo-wide search for the name, email,
    location, school, degree and GitHub URLs.
  - Found and removed **three real duplications**:
    1. `location` was defined in both `profile.js` and `links.js`.
    2. `email` was hardcoded in `profile.js` and again in `links.js`.
    3. The degree and school strings appeared in `experience.js`, `education.js` **and** `about.js`.
  - Added `degree`, `degreeShort` and `school` to `profile.js` as the single source of truth, and made
    `experience.js`, `education.js` and `about.js` import them.
  - `links.js` now imports and re-exports `email` and `location` from `profile.js`, so the contact
    tiles, the hero and the chatbot prompt all read the same values.
  - `name` was only available on the default export, so it was promoted to a named export as well.
  - Proofread the project copy and fixed a typo carried over from the original site
    ("slitter" -> "slither-style", plus the run-on "that has ..., etc." sentence).
- Files edited: `src/data/profile.js`, `experience.js`, `education.js`, `about.js`, `links.js`,
  `projects.js`
- Gate results: **build ok** (1 page, 37.9s). Verified:
  - `Eric James Sonio` now has exactly **1** definition (in `profile.js`); every other hit is a comment
    or documentation.
  - `Pandi, Bulacan`: **1** definition; renders 2× in the page (hero + contact), as expected.
  - `ericjamessonio7@gmail.com`: **1** definition; renders 2× (hero `mailto:` + contact tile).
  - `College of Mary Immaculate`: 1 value definition, referenced from the two timelines and About.
  - `BS Computer Science — 4th Year`: renders exactly **2×** (Experience + Education timelines).
  - About paragraph reads cleanly: "I'm Eric James Sonio, a 4th-year Computer Science student at
    College of Mary Immaculate, ..." with no leftover template artifacts.
  - The Sweetify description typo is fixed; featured rows still render 3; the chatbot island is present;
    no `undefined` anywhere.
- Notes:
  - Two apparent problems were **false alarms** worth recording: `${` occurrences in the built HTML come
    from Astro's own island-hydration runtime, not from my copy; and the degree appeared to be missing
    only because PowerShell read the file as ANSI and mangled the em-dash. Re-read with `-Encoding UTF8`
    it is present exactly twice. **Lesson: read built HTML as UTF-8 when checking em-dashes or curly quotes.**
  - The chatbot prompt was re-tested after the refactor and still resolves the name, school and email
    correctly, and still excludes the phone number.
- Issues: none.

## Phase 9: AI chatbot

- Plan:
  - Installed `groq-sdk` (server-side only) for the backend function.
  - `src/data/chatbot.js` — `buildSystemPrompt()` generates the system prompt **from the same data
    files the page renders from** (profile, about, experience, education, stack, projects, links), so the
    assistant cannot drift from the visible content. Includes role/identity guardrails with 5 varied
    refusal lines, a "don't invent facts" rule, and an explicit boundary against sharing private data.
  - `api/chat.js` — Vercel-style serverless function. Validates the body, keeps only the last 10
    messages, truncates each to 1000 chars, caps `max_tokens` at 500, forces roles to user/assistant,
    reads `GROQ_API_KEY` / `GROQ_MODEL` **from server env only**, and returns generic errors.
  - `src/components/react/Chatbot.jsx` — the island: bouncing FAB, teaser banner after 2s that hides
    permanently after the first open, panel with header/avatar/Online dot/close, `aria-live="polite"`
    message list with auto-scroll and a "Typing..." indicator, plain-text bubbles (`white-space: pre-wrap`,
    never `dangerouslySetInnerHTML`), Enter-to-send plus a real `<button>` send control, Escape to close,
    and a friendly fallback message pointing at the real contact links when the API is unreachable.
  - `src/styles/chatbot.css` — panel `w-90%` on phones / fixed 384px from `md`, `60vh` tall with a
    500px cap, `env(safe-area-inset-bottom)` respected, bounce only under `prefers-reduced-motion: no-preference`.
  - `.env.example` — variable **names only**, no values.
- Files created: `src/data/chatbot.js`, `api/chat.js`, `src/components/react/Chatbot.jsx`,
  `src/components/ChatbotIsland.astro`, `src/styles/chatbot.css`, `.env.example`
- Files edited: `src/pages/index.astro`, `src/layouts/Layout.astro`, `src/data/projects.js`,
  `src/data/certs.js`, `package.json`
- **Two bugs found and fixed during the gate:**
  1. **Build hang.** `chatbot.js` used a dynamic `await import('./projects.js')`, which the Vite client
     build could not resolve; `npm run build` stalled indefinitely at "transforming...". Replaced with a
     static import. Build now completes in ~16-35s.
  2. **Fragile image path.** `projects.js` / `certs.js` resolved images with
     `new URL('../assets/images/', import.meta.url)`, which from `src/data/` points at
     `src/assets/images/` (nonexistent). It happened to work under Vite but returned **0 featured
     projects** when the module was loaded directly by Node. Now resolved through `process.cwd()` to
     `public/assets/images/`, which is correct under both `astro build` and `node`.
- Gate results: **build ok** (1 page, 34.7s). Verified in `dist/index.html`: the featured block still
  renders 3 rows with 2 placeholder phones, and the chatbot island ships with `client="idle"`.
  Verified the teaser and greeting strings are present in the JS chunk (correct for a client-rendered
  island), along with `aria-live`.
  **Secret scan: `gsk_*`, `GROQ_API_KEY` and `dangerouslyAllowBrowser` appear in NEITHER the built
  output NOR the source tree.** No `PUBLIC_`/`VITE_` variable exists anywhere.
  Verified `api/chat.js` exists with method validation, the 10/1000/500 caps and the
  `llama-3.3-70b-versatile` default.
- Verified the generated prompt by running it: 5,902 chars, contains the real name, tech stack, all
  14 projects, the public email, and the refusal examples — and **does not contain the phone number**
  (privacy rule enforced and tested).
- Decisions:
  - **Hosting:** no `vercel.json` / `.vercel` / `netlify.toml` was found, so per the Default decisions
    table the **Vercel** version was written and is flagged. **GitHub Pages cannot run serverless
    functions**, so until the site moves to Vercel (or Netlify) the assistant will show its friendly
    "unavailable" message. This is the single biggest thing the owner must act on. The file header
    documents how to relocate it to `netlify/functions/chat.js`.
  - **Greeting/teaser text** uses the owner's real first name, built from `profile.js`, not a copy of
    the reference persona.
  - The FAB uses an inline SVG rather than `react-icons`/`bootstrap-icons`, which are not in the
    allowed dependency list.
- Issues: see the hosting note above.

## Phase 8: Theme polish (ripple + audit)

- Plan:
  - Audited every text/surface pair in **both** themes by computing WCAG contrast ratios.
  - Found the reference palette **fails AA in light mode** and fixed it (see below).
  - Confirmed the ripple is already implemented and correct (built in Phase 3), and that it degrades
    to an instant swap without the View Transitions API or under reduced motion.
  - Added `theme-color` meta tags for light and dark so the mobile browser chrome matches.
  - Removed the last two dead stylesheet imports (`contact.css`, `responsive.css`).
- **Contrast audit results (before -> after)**, measured against the worst background in each theme
  (light `#f9fafaf` panel, dark `#1a1a1a` panel):

  | Token | Light before | Light after | Dark before | Dark after |
  |---|---|---|---|---|
  | `--text-body` | 3.42:1 FAIL | `#27292e` 4.89:1 AA | 8.1:1 | 10.6:1 AAA |
  | `--text-muted` | 2.72:1 FAIL | `#282d33` 4.60:1 AA | 6.3:1 | 6.0:1 AA |
  | `--text-faint` | 2.08:1 FAIL | decorative only | 3.26:1 FAIL | `#9ca3af` 6.0:1 AA |
  | `--accent-link` | 2.12:1 FAIL | `#5f210d` 4.57:1 AA | 6.3:1 | 6.3:1 AA |

- Decisions:
  - **Darkened the light-theme greys.** The reference uses Tailwind `gray-700/600/500`, which simply
    cannot reach 4.5:1 on white. Design parity was kept (same neutral grey family, same hierarchy)
    while the values were pushed dark enough to be readable.
  - **`--accent-link` is now a deep orange (`#5f210d`)** instead of `orange-600 at 70%` opacity. It is
    still unambiguously orange and still passes as the single accent, but it is legible as link text.
    The decorative `--accent` (`#f97316`) is unchanged and still used for dividers, dots and badges,
    where it is a graphic element rather than body text.
  - **`--text-faint` is now decorative-only in light mode** (expand icons, separators). Two places
    used it for real copy (`.cert-issuer`, `.cert-todo`) and were switched to `--text-muted`.
  - **Removed the `contact.css` and `responsive.css` imports.** Both were written for the old
    navy/gold design and the old contact form, which no longer exists. Keeping them injected
    light-only gold values into the dark theme. The files remain on disk for reference and are
    mentioned in the report.
- Gate results: **build ok** (1 page). Verified: 2 `theme-color` metas, **6** `[data-theme=dark]`
  selectors in the emitted CSS, and **no legacy gold (`#c9a96e`) anywhere** in the bundle. The two
  remaining `#374151`/`#4b5563` occurrences are legitimate dark-theme tokens
  (`--border-inner`, `--rail`) and the laptop-base gradient, not leftovers. CSS is now 21.1 kB.
  Verified all five divider captions, every section, the GitHub panel, the lightbox and the chatbot
  button (Phase 9) inherit their colours from tokens, so both themes are complete by construction.
- Ripple status: implemented in Phase 3, verified here. `@keyframes ripple-reveal`,
  `::view-transition-old/new(root)` and the `prefers-reduced-motion` bypass are all present in the
  built CSS, and `--ripple-x/y/radius` are set before `startViewTransition` is called.
- Issues: none.

## Phase 7: Certifications and Contact

- Plan:
  - `src/data/certs.js` — an **empty** `certs` array. The existing site had no certifications and no
    certificate images were supplied; `content-seed.md` lists certificates belonging to a different
    person, so nothing was invented. A build-time existence check marks each entry `hasImage`, and
    entries without an image render without an expand icon.
  - `src/data/links.js` — LinkedIn, GitHub, Facebook ("Find me on") and Email, Phone, Messenger
    ("Get in touch"), all read from the existing `Contact.astro`. Phone is a `tel:` link. Facebook and
    Messenger have no URL on the existing site, so they are empty and render as non-interactive tiles.
  - `Certifications.astro` — tile rows; entries with an image become buttons that open a lightbox;
    entries without one render as plain rows. A `<noscript>`-free, script-driven lightbox with
    `role="dialog"`, `aria-modal`, Escape-to-close, backdrop close, focus return and a focus trap.
  - `Contact.astro` — rewritten as two link-tile columns ("Find me on" / "Get in touch"), stacked on
    phones and side by side from `md`, plus the location line. The old EmailJS form and its script are
    removed (the reference design has no form; the tiles replace it).
  - `Recognition.astro` + `src/styles/recognition.css` — `RECOGNITION | SOCIALS` divider and the
    two-column band.
  - `Footer.astro` — `© Eric James Sonio | Personal Portfolio 2026` from `profile.js`, top border,
    centred small mono text.
  - `main.js` — certificate lightbox behaviour appended.
- Files created: `src/data/certs.js`, `src/data/links.js`, `src/components/Certifications.astro`,
  `src/components/Recognition.astro`, `src/styles/recognition.css`
- Files edited: `Contact.astro`, `Footer.astro`, `src/components/LinkTile.astro` (bug fix),
  `src/styles/footer.css`, `src/pages/index.astro`, `src/layouts/Layout.astro`, `public/scripts/main.js`
- **Bug found and fixed during the gate:** the two URL-less tiles rendered as
  `<div class="tile" href="" ...>`. Astro emitted an empty `href` on the `<div>` because the prop was
  an empty string rather than `undefined`. Fixed with `href={href || undefined}`. Re-verified: **0**
  `href=""` occurrences in the built HTML.
- Gate results: **build ok** (1 page). Verified in `dist/index.html`: `RECOGNITION | SOCIALS` divider,
  `CERTIFICATIONS` and `CONTACT` cards, the certifications empty state, "Find me on" / "Get in touch"
  columns, a `tel:` link, a `mailto:` link, the LinkedIn URL, the footer line, **0 empty hrefs**,
  **2 `<div class="tile">`** (Facebook, Messenger) and **4 `<a class="tile">`** (LinkedIn, GitHub,
  Email, Phone), **0 empty anchors**, no `undefined` anywhere, and the old EmailJS form is gone.
- Decisions:
  - **Certifications empty state:** rather than inventing certificates from `content-seed.md`, the card
    states plainly that none are listed yet and names the file to edit. Filling `certs` in
    `src/data/certs.js` and adding the images makes the rows and the lightbox appear automatically.
  - **Facebook / Messenger** render as non-interactive tiles because the existing site has no URLs.
    Adding a URL in `src/data/links.js` turns each into a link with no markup change.
  - **EmailJS form removed.** The reference contact section is a set of link tiles, not a form. The
    EmailJS public key and service/template IDs are therefore no longer present anywhere in the repo.
    If you want the form back, it can be re-added as a third card; say so in review.
  - **Phone privacy:** kept as a `tel:` link in `src/data/links.js` (code only). It is deliberately
    absent from `docs/`, the build log and the review report per AGENTS.md rule 9.
- Issues: none.

## Phase 6: GitHub contributions

- Plan:
  - Installed `@astrojs/react@3`, `react@18`, `react-dom@18`, `react-github-calendar@5` and registered
    `integrations: [react()]` in `astro.config.mjs`. **React 18 is used deliberately:** React 19
    requires `@astrojs/react@4` which requires Astro 5, and this project is on Astro 4.
  - `src/data/github.js` — username `EricJamesSonio` and profile URL in one place (taken from the
    existing navbar link and every project repo URL) plus the two orange 5-step palettes.
  - `src/components/react/GithubGraph.jsx` — the island: `GitHubCalendar` with `blockRadius={0}`
    (square cells), `showYearSelect`, orange palettes, and a listener on the `themechange` event so the
    palette and `colorScheme` follow the site theme instead of only the OS preference.
  - `GithubContributions.astro` — `CONSISTENCY` divider, a card with the title and a
    `View GitHub Profile ↗` link, and a `<noscript>` fallback that offers the plain profile link.
  - `src/styles/github.css` — the panel wraps in `overflow-x: auto` so the 53-week graph scrolls
    **inside its own panel** on phones instead of causing horizontal page scroll.
  - Hydrated with `client:visible`, so nothing React-related is downloaded until the section is scrolled to.
- Files created: `src/data/github.js`, `src/components/react/GithubGraph.jsx`,
  `src/components/GithubContributions.astro`, `src/styles/github.css`
- Files edited: `astro.config.mjs`, `src/pages/index.astro`, `src/layouts/Layout.astro`, `package.json`
- Gate results: **build ok** (1 page). Verified in `dist/index.html`: `CONSISTENCY` divider,
  `GITHUB CONTRIBUTIONS` title, `View GitHub Profile` link, `<noscript>` fallback, an `astro-island`
  wrapper with `client="visible"`, and the `EricJamesSonio` username in the payload. Verified in the CSS
  that `.gh-panel-wrap` exists with inner scrolling. Confirmed user media is still intact
  (**5 images, 15 videos** in `dist/assets/`).
- Island bundle sizes (gzip): `GithubGraph` 8.2 kB, `Tooltip` 17.5 kB, React runtime 43.1 kB.
  Loaded lazily via `client:visible`, so none of it affects first paint.
- Decisions:
  - **React 18, not 19.** The reference used React 19, but React 19 needs `@astrojs/react@4` + Astro 5.
    Upgrading Astro from 4 to 5 is a much larger change than the reference skill permits, so the island
    runs on React 18. Nothing in the UI differs.
  - **Block size** is 14 in light and 11 in dark mode. Dark mode uses a smaller cell so the 53-week
    graph fits the panel on more screens without needing a scrollbar.
  - The calendar fetches from GitHub's public API in the browser; if it is rate-limited or offline the
    component renders its own error state, which the card still frames correctly.
- Issues: none.

## Phase 5: Projects (Featured + video grid)

- Plan:
  - `src/data/projects.js` — one data list for featured rows (name, slug, description, tech, link, code,
    desktop, mobile, mockup) plus the video-grid list. Descriptions and repo URLs are copied **verbatim**
    from the old video cards. A build-time `fs.access` check resolves each row to a render mode and
    **drops rows with no image**, so the page can never request a missing file.
  - `FeaturedProjects.astro` — media column (composite image, or a CSS-built laptop + overlapping phone
    frame) and text column (name, description, chips, links). Phone placeholder is a striped navy panel
    with `role="img"` and an aria-label.
  - `Projects.astro` — rewritten: `ITERATE. BUILD. DEPLOY.` divider, the featured card, a quiet
    `MORE PROJECTS` sub-heading, the existing filter buttons, then the video grid.
  - `projects.css` — featured block + mockup geometry (laptop 88% with 16:10 screen and metal base,
    phone 27% overlapping bottom-right, 30% under 480px), restyled flat video cards,
    `max-height: 70svh` on phones and `800px` from `md` to avoid a nested-scroll trap.
  - `main.js` — videos no longer autoplay on page load: they load near the viewport, play when
    >=35% visible, pause when off screen.
  - Removed the 4 duplicate video cards (EduToolV2, EduTool V3, Voting System, Apptel). **The .mp4
    files are untouched on disk** and listed in the report.
- Files created: `src/data/projects.js`, `src/components/FeaturedProjects.astro`
- Files edited: `Projects.astro`, `src/styles/projects.css`, `public/scripts/main.js`
- Gate results: **build ok** (1 page). Verified in `dist/index.html`:
  `FEATURED PROJECTS` card present, `ITERATE. BUILD. DEPLOY.` divider present, **3 featured rows**
  (EduTool, Voting System, Apptel) in the default order, TechHub/NavSumaro/InterviewSpark/StartSmart/
  My Portfolio correctly **absent** (no images), **3 laptop mockups**, **2 placeholder phones**
  (Voting + Apptel) and 1 real phone (EduTool), **11 video cards**, no `undefined` leakage.
  Verified the 4 removed videos are no longer referenced anywhere in the HTML.
  Verified every referenced image resolves on disk (5/5) and user media is intact
  (**5 images, 15 videos**, unchanged).
- Acceptance criteria (featured-projects-spec.md):
  - [x] Three rows in order: EduTool, Voting System, Apptel
  - [x] Block sits above the video grid inside `#projects`; the anchor still works
  - [x] EduTool shows both images; Voting and Apptel show desktop + placeholder phone
  - [x] No link buttons for empty URLs (all `link` values are empty, so no "View Project" renders;
        only "View Code" renders, pointing at the real GitHub repos)
  - [x] Uses only Phase 1 tokens, so it is native to both themes
  - [x] One column at 900px and below, two columns above; no fixed widths that could overflow at 375px
  - [x] Old video cards for the four projects removed from the grid
  - [x] Build passes with no new warnings
- Decisions:
  - **Featured order:** the default order is used unchanged. The five reference projects have no
    screenshots, so per the Default decisions table ("hide a featured project whose image is missing")
    their rows are hidden and reported.
  - **Tech chips and live URLs** are empty because the existing site never listed a per-project stack or
    a deployed URL. They render nothing rather than invented content. The `Chip` list and the links row
    both appear automatically once the fields are filled in.
  - **Video grid columns:** 11 cards in a 3-column grid leaves a short last row (2 cards). Left as is;
    adding a card would mean inventing a project.
  - Videos got `preload="none"` and no `autoplay` attribute (the old markup autoplayed all 15 at once,
    which was the main performance cost). No posters exist to add.
- Issues: none.

## Phase 4: Bento (Experience, Education, About, Tech Stack)

- Plan:
  - New data files, all filled from the EXISTING site (no invention):
    `src/data/experience.js` (4th-year CS student, backend focus, project work),
    `src/data/education.js` (College of Mary Immaculate, earlier stages left as TODO),
    `src/data/stack.js` (the 26 technologies from the old badge labels, grouped as they were),
    `src/data/about.js` (the old four sections condensed into three paragraphs).
  - `Timeline.astro` — one shared timeline primitive used by both Experience and Education:
    vertical rail, filled orange dot + `Current` badge for the active item, hollow rings otherwise,
    connector line only between items, `max-height: 280px` inner scroll.
  - `Experience.astro`, `Education.astro`, `About.astro`, `TechStack.astro` — now thin wrappers around
    the shared `Card` primitive reading from the data files. The shields.io badge images are gone,
    replaced by the reference's `Chip` primitive.
  - `Bento.astro` + `src/styles/bento.css` — the grid: one column below `lg`, `35% 65%` from `lg`,
    left column Experience + Education, right column About + Tech Stack. Stack groups use a tiny
    micro-label followed by a hairline that fills the row.
  - Old anchors preserved: `id="about"` on the bento and `id="tech"` on the right column.
  - `about.css` / `tech.css` unimported; `bento.css` imported instead.
- Files created: `src/data/experience.js`, `education.js`, `stack.js`, `about.js`,
  `src/components/Timeline.astro`, `Experience.astro`, `Education.astro`, `Bento.astro`,
  `src/styles/bento.css`
- Files edited: `About.astro`, `TechStack.astro`, `index.astro`, `Layout.astro`
- Gate results: **build ok** (1 page). Verified in `dist/index.html`: bento grid present, `#about` and
  `#tech` anchors preserved, all four card titles render, timeline `<ol>` present, `Current` badge
  present, "4th Year" present, **26 chips** emitted (matching the 26 technologies in the original
  badges), **no `img.shields.io` requests left** (removes 26 third-party image requests), no
  `undefined` leakage.
- Decisions:
  - **CODING SINCE year:** the existing site never states when coding started, so `codingSince` is
    `null` and the Experience card omits the year instead of guessing one. Filling it in switches the
    header on with no markup change.
  - **Education timeline:** only the current degree is listed, because that is all the existing site
    states. Earlier stages are a marked TODO rather than invented schools and years.
  - **Timeline rows without a year:** inactive rows in Experience have no dates because none were
    supplied; the row renders the title and subtitle only, so no empty "undefined" cell appears.
  - Chips kept as `<li>` inside a `<ul>` for correct list semantics (Phase 5 reuses the same pattern).
- Issues: none. Both themes handled (only tokens used); no fixed widths, so no 375px overflow.

## Phase 3: Hero

- Plan:
  - `src/data/profile.js` — new single source of truth: name, role, location, email, `resume` (null),
    `portfolioYear`, portrait path, `portraitHoverVideo` (null). All values copied from the existing
    `Hero.astro` / `Contact.astro`.
  - `Hero.astro` rewritten to the reference: top caption `<NAME> || PORTFOLIO <YEAR>` from `profile`,
    portrait + text row, name, uppercase tracked role, location with pin icon, `GET RESUME` +
    `EMAIL ME` buttons, theme pill, and the `SOLVING THROUGH CODE` footer caption.
  - `hero.css` rewritten: `min-height: 95svh` (svh, not vh), stacked/centred on phones, side-by-side and
    left-aligned from `md`, portrait sizes 224px -> 220x320 -> 300x400, square buttons with press effect,
    pill theme switch with a sliding 20px knob that moves 28px in dark mode, tap targets >= 44px.
  - Theme controller in `Layout.astro`: reads `data-theme`, updates the label and `aria-pressed`, and
    uses `document.startViewTransition` with the ripple variables set **before** the transition.
    Falls back to an instant switch when the API is missing or reduced motion is on.
  - Ripple CSS added to `base.css` (`::view-transition-*`, `@keyframes ripple-reveal`).
  - Navbar removed from the page flow and `navbar.css` unimported. Files kept in the repo.
  - `public/scripts/main.js`: null-guarded the `.navbar` lookup (it would have thrown a TypeError once
    the navbar was removed) and made a bare `#` href a no-op.
- Files created: `src/data/profile.js`
- Files edited: `Hero.astro`, `src/styles/hero.css`, `Layout.astro`, `src/pages/index.astro`,
  `src/styles/base.css`, `public/scripts/main.js`, `src/components/Divider.astro` (bug fix, see below)
- **Bug found and fixed during the gate:** the first build rendered every divider caption as an **empty
  span**. `Divider` read a `children` prop, but Astro passes `<Divider>TEXT</Divider>` as **slot content**.
  The caption rendered as `<span class="divider-caption caption"></span>`. Fixed by rendering `<slot />`
  instead of `{children}`. Re-verified: both captions now emit the real text
  (`ERIC JAMES SONIO || PORTFOLIO 2026` and `SOLVING THROUGH CODE`). This is why the gate checks the
  built HTML text and not only element counts.
- Gate results: **build ok** (1 page). Verified in `dist/index.html`: no `<nav>` rendered, theme toggle
  present, `EMAIL ME` + working `mailto:` link, `GET RESUME` rendered disabled with a `TODO` marker,
  portrait `<img>` with alt text, location text, `aria-labelledby="hero-name"`, no `undefined` leakage.
  Verified in the CSS: `95svh` hero height, `.theme-switch`, `::view-transition-new(root)`,
  `@keyframes ripple-reveal`. Both themes handled (all hero colours are Phase 1 tokens).
- Decisions:
  - **Resume:** no `Resume.pdf` exists in the repo, so `GET RESUME` renders as a non-interactive
    `<span aria-disabled="true">` marked `TODO` rather than a link to a 404. Setting `resume` in
    `src/data/profile.js` and adding the file switches it to a real `<a download>` automatically.
  - **Portrait video:** no hover video exists, so the `<video>` element is not rendered at all
    (`portraitHoverVideo` is null). The markup, CSS and touch-toggle class are already in place, so
    dropping a file in and setting the field enables it with no other change.
  - **Ripple:** implemented now rather than in Phase 8 because the theme switch (Phase 3 task) needs it;
    Phase 8 verifies it across all sections.
- Issues: none.

## Phase 2: UI primitives

- Plan:
  - `Divider.astro` — signature caption row: two fading hairlines + `.caption` text, `role="separator"`,
    `strong` variant for a solid line, `aria-hidden` on the decorative hairlines.
  - `Card.astro` — the shared shell: `p-6`, accent-tinted border, backdrop blur, `overflow: hidden`, a
    header row with UPPERCASE title + optional aside, and a `.card-body` flex column for the content.
    Optional `as` heading level and `id`/`labelled` so a section can reference its title with
    `aria-labelledby` (used by the Featured Projects / Certifications cards in Phases 5 and 7).
  - `Chip.astro` — peach-tinted bordered tag.
  - `LinkTile.astro` — icon + label/sub + trailing arrow. **Never renders an `<a>` without an `href`**:
    with no `href` it renders a `div`. External links get `target="_blank" rel="noreferrer"`;
    `tel:` / `mailto:` / `#` links stay in place.
  - `src/styles/ui.css` — one shared stylesheet, imported once in `Layout.astro` after `base.css`.
    Every colour comes from a Phase 1 token, so both themes are complete automatically.
- Files created: `src/components/Divider.astro`, `Card.astro`, `Chip.astro`, `LinkTile.astro`,
  `src/styles/ui.css`
- Files edited: `src/layouts/Layout.astro` (added the `ui.css` import)
- Gate results: **build ok**. A temporary page (`src/pages/primitive-check.astro`) rendered all four
  primitives with a short caption, a long caption, a single-character caption, a `strong` divider, chips,
  a linked tile and an href-less tile. Verified in the built HTML: 4 `role="separator"` elements,
  4 caption spans, card shell present, `aria-labelledby="demo-card-title"` wired, 3 chips, tiles present,
  `target="_blank"` on the external tile, `<div class="tile">` for the href-less tile, and **no `undefined`
  string leaked into the output**. The temporary page was then deleted and the build re-run: 1 page,
  and neither `src/pages/primitive-check.astro` nor `dist/primitive-check/` remains.
- Divider at 320px: captions are `white-space: nowrap`, the hairlines are `flex: 1; min-width: 0` so they
  shrink before the caption does, and below 420px the caption padding drops to 10px with 0.3em tracking
  and the hairlines keep a 12px floor. Verified the media rule is emitted after the base rule in the
  built CSS.
- Decisions:
  - `Card` keeps its own header markup instead of a `SectionTitle` component: every card in the reference
    uses the same title + optional aside row, so one `Card` with a `title` prop covers it and avoids a
    redundant primitive.
  - Tap targets: `.tile` has `min-height: 44px` per the layout rules.
- Issues: none.

## Phase 1: Foundation (tokens, theme, base)

- Plan:
  - Rewrite the token block in `base.css` with light + dark CSS variables taken from `design-system.md`
    (page/card/panel backgrounds, borders, body/muted/faint/heading text, orange accent family, chip,
    tile, button, chat-button, rail, shadows).
  - Keep a small "legacy aliases" block mapping the old `--gold` / `--ink` / `--text-primary` names onto
    the new tokens so `hero.css`, `navbar.css` and `footer.css` keep rendering until their own phases.
  - Replace the global block: monospace everywhere, remove the all-caps body rule and the noise overlay,
    add heading defaults, visible `:focus-visible` ring in the accent colour, `img, video` max-width.
  - Add the page shell `.shell` (12px phones -> 100/130/150px at md/lg/xl) and the `--band-gap` vertical gap.
  - Themed scrollbars for both themes + `.custom-scroll` utility + global reduced-motion rule.
  - Add the type-scale utility classes (`.caption`, `.card-title`, `.micro-label`, `.tl-title`,
    `.tl-sub`, `.body-copy`, `.chip-text`, `.foot-text`) straight from the design system.
  - Theme mechanism: pre-paint inline script + `data-theme` on `<html>`, `<meta name="color-scheme">`,
    and a shared `window.__theme` API (get/set/toggle + localStorage + `themechange` event) that Phase 8
    upgrades to the ripple.
- Files created: none
- Files edited: `src/styles/base.css`, `src/layouts/Layout.astro`, `src/pages/index.astro`
- Gate results: **build ok** (1 page, no errors). Verified in `dist/index.html`:
  `color-scheme` meta present, pre-paint theme script present, `data-theme` present, `window.__theme` present,
  `class="shell"` present. Verified in the emitted CSS: all tokens present, **2** `[data-theme=dark]`
  selectors with `#000000` page bg and `#0f0f0f` card bg, `prefers-reduced-motion` block, ripple vars.
- Decisions:
  - Default theme follows the OS preference and is remembered; falls back to light if storage is blocked.
  - No web font is downloaded for body text (system monospace per the Default decisions table). The
    existing Google Fonts `<link>` is left in place for now and removed once no component uses Playfair /
    DM Sans (Phase 13 cleanup).
  - No old section CSS was deleted (Default decision: dead code is cleaned only in Phase 13).
- Issues: none. Both themes are handled for everything built so far; nothing overflows at 375px because
  only global rules changed (the old sections keep their own padding for now).

## Phase 0: Recon, plan, and setup

- Plan: read all source, styles, scripts and media; detect host; set up branch, `.gitignore`,
  `docs/PORTFOLIO_PROGRESS.md`, `docs/BUILD_LOG.md`; record the baseline build.
- Files created: `.gitignore`, `docs/PORTFOLIO_PROGRESS.md`, `docs/BUILD_LOG.md`
- Files edited: `astro.config.mjs` (removed `build.assets`)
- Gate results: **build ok** - baseline built before changes (1 page, no errors); rebuilt after the config
  change (1 page, no errors). Verified `dist/assets/` holds only the user's 5 images + 15 videos and
  bundles now emit to `dist/_astro/`.
- Issues: none blocking. Noted that `src/env.d.ts` is generated by `astro build` and is left untracked
  via `.gitignore`-adjacent handling (Astro regenerates it; it is committed below for completeness).
- Gate: `npm run build` passes; no section changes yet so the 375 px / both-themes checks are N/A for P0.


---

## Post-review change: folder reorganization

At the owner's request, everything needed to **build or run** the site was moved into a **`Code/`**
folder so the repo root holds only documentation and CI config.

- **Moved into `Code/`:** `api/`, `public/`, `src/`, `astro.config.mjs`, `package.json`,
  `package-lock.json`, `.env.example`, and `.nojekyll`. All done with `git mv` so file history is
  preserved (git records them as renames).
- **Moved out of the root:** `node_modules` was relocated to `Code/node_modules`; the stale root
  `.astro/` and `dist/` were deleted (both are regenerable and gitignored).
- **Stayed at the repo root:** `docs/`, `skills/`, `.github/`, `.gitignore`, `AGENTS.md`, `README.md`.
  `.github/` **must** stay at the root for GitHub Actions to find it.
- **Deploy workflow updated** (`.github/workflows/deploy.yml`): `working-directory: Code` on the
  install and build steps, and the artifact path changed from `./dist` to `Code/dist`.
- **`.nojekyll` moved into `Code/public/`.** This is a genuine bug fix: the file sat at the repo root
  and was therefore **never copied into `dist/`**, so GitHub Pages was never told to skip Jekyll.
  Now that it lives in `public/`, Astro copies it into the build output (verified present in
  `Code/dist/.nojekyll`).
- **Image path resolution made CWD-independent.** `src/data/projects.js` and `certs.js` resolved
  `public/assets/images/` through `process.cwd()`, which only worked when the build ran from the
  project root. They now resolve from `import.meta.url` (`../../public/assets/images/`), so they
  are correct regardless of the directory the build is launched from - which matters now that the
  working directory is `Code/`.
- **Docs updated:** `README.md` gained a "Folder structure" section with an explicit `cd Code`
  instruction (running `npm install` at the repo root will now fail), and both the README and the
  review report had their file paths re-prefixed with `Code/`.
- Verification: `npm run build` re-run from `Code/` -> **build ok**, output in `Code/dist`.
  All content preserved: 5 divider captions with correct text, 3 featured rows, 11 video cards,
  4 link tiles + 2 non-interactive tiles, 5 images with alt text, both React islands, no
  `undefined` leakage, and all 5 images / 15 videos present. Media inventory unchanged.
- Note: the first post-move build took ~300 s because Vite had to rebuild its dependency cache at
  the new `node_modules` path. Subsequent builds are back to the normal ~40 s.
- `base: '/Portfolio'` is unchanged, so the deployed site URL and every asset path are unaffected.
---

## Post-review repair: restoring `Code/` build config and media

**Symptom.** The GitHub Actions deploy workflow failed on `main`:

```
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory,
open '/home/runner/work/Portfolio/Portfolio/Code/package.json'
```

**The workflow was not at fault.** `working-directory: Code` was correct. Commit `5b2ce1b`
("Updated portfolio", merged into `main` via PR #2 as `527804a`) had genuinely deleted the files,
so Actions checked out a tree in which `Code/package.json` did not exist.

**Root cause.** That commit removed the project's build config and relocated media into generated
output. It was recovered in full from the previous good commit `63d0db9`.

### Files restored from `63d0db9`

- `Code/package.json`, `Code/package-lock.json` - the missing build manifest (the CI failure).
- `Code/astro.config.mjs` - restores `base: '/Portfolio'` and the `@astrojs/react` integration.
- `Code/api/chat.js` - the server-side Groq proxy that `src/components/react/Chatbot.jsx` calls
  at `/api/chat`.
- `Code/.env.example` - chatbot env var NAMES only (`GROQ_API_KEY`, `GROQ_MODEL`).
- `Code/public/.nojekyll` and 14 media files (6 images, 7 videos) that had been moved the wrong way
  into `Code/dist/`. `dist/` is regenerated by every build, so media living there was lost on the
  next clean build. Git recorded these as renames, so history is preserved.

**Impact that a config-only fix would have hidden.** `src/data/projects.js` and `certs.js` check
`public/assets/images/` on disk and silently hide rows with no image. With the images missing the
build would still have gone green while shipping **no portrait, no featured projects, no
certificate images, a 404 OG image and 7 broken video cards**. Restoring `public/` was required,
not cosmetic. `.nojekyll` must live in `public/` so Astro copies it into `dist/`; without it Pages
falls back to Jekyll and asset paths 404.

**Note:** `Code/src/` was verified byte-identical between `63d0db9` and `5b2ce1b` (45 files, empty
diff), so no source code was damaged by that commit.

### `.gitignore` rebuilt

The gutted one-line `.gitignore` (just `node_modules/`) is what allowed `Code/dist/` and
`Code/.astro/` to be committed in the first place. Rebuilt from the `63d0db9` version plus
`.vercel/`, `.netlify/` and `pnpm-debug.log*`. Then `git rm -r --cached Code/dist Code/.astro`
untracked the generated output (files remain on disk). `Code/dist` was ~50 MB of build output,
including copies of the user's media.

Note `desktop.ini` is in the ignore list but `Code/public/assets/images/desktop.ini` remains
tracked, because gitignore only affects untracked files and it was already in the index.

### Verification

- `npm run build` from `Code/` -> **ok**, 1 page in ~15 s. (In PowerShell, `npm run build` reports a
  spurious exit code 1 because `npm notice` is written to stderr; run it via `cmd /c` to see the
  real result.)
- `Code/dist/index.html` present; `.nojekyll` copied into `Code/dist/`.
- 6 images and 15 videos present in `dist/`; `scripts/main.js` copied.
- `/Portfolio/` base path applied (28 references); portrait and all 4 featured mockups referenced,
  confirming no featured project or certificate is hidden.
- `git ls-files Code/dist` and `Code/.astro` now return 0 entries; both match `.gitignore`.
- No user media deleted. No secrets added; `.env.example` holds NAMES only.

## Phase 14: Neon-blue retheme, larger type, tech-stack carousels, education history

- Goal (owner request): swap orange for neon blue, enlarge all fonts, replace the tech-stack
  paragraph/chips with left-to-right card carousels, and fill in the full education history.

- Accent (all in `Code/src/styles/base.css`, the single source of truth):
  - Light: `--accent #0090e6`, `--accent-strong #0077c4`, `--accent-text #005fb3`,
    chips `#eff8ff`/`#dbeefe`/`#b3ddff`, tiles `rgba(0,95,179,.10)`.
  - Dark: `--accent #00d4ff`, `--accent-strong #6ee7ff`, `--accent-text #7de9ff`,
    chips + tiles as accent rgba.
  - **New token `--accent-text`.** Pure neon fails on white (~2.4:1), so `--accent` is now
    decorative-only and every readable accent string (`.hero-role`, `.coding-year`,
    `.caption`, `.featured-name`, `.project-card h3`, `.cert-todo code`) uses `--accent-text`
    at 6.4:1 light / 13.6:1 dark. `--accent-link` mirrors it.
  - `::selection` moved to `--accent-text` so the inverted text keeps AA.
  - Neon-on-neon fix: `.filter-btn.active`, `.chat-avatar`, `.chat-mini-avatar` and
    `.chat-send` sit on a bright accent fill, so their label is now `#000` in BOTH themes
    (6.1:1 / 11:1). The old white-text-with-dark-override pairing only reached 2.7:1 in light.
  - Also: GitHub calendar palettes (`data/github.js`), favicon `E`, Divider/Timeline/Chip
    comments, AGENTS.md and PORTFOLIO_PROGRESS.md wording.

- Type scale (legibility pass): caption 8->11px (13px desktop), micro-label 9->11px,
  card-title 16->20px, timeline 12->15px, body-copy 14->17px, chip 12->14px, tile/aside/footer
  11->13px, buttons 12->14px, hero name 36->44px, plus projects/recognition/github/chatbot.
  Nothing decorative is under 8px now, and nothing readable is under 12px.
  Divider captions wrap to two lines below 560px (`white-space: normal`, 0.18em tracking)
  so the 35-character top caption cannot overflow at 320px.

- Tech stack (`TechStack.astro` + `tech-stack.css` + `data/stack.js` + `data/stackIcons.js`):
  - The chip list became one masked, auto-scrolling carousel per group. Each row renders 4
    identical runs inside a `width: max-content` track and translates by exactly one run width
    (`-25% -> 0`), which moves cards LEFT -> RIGHT as requested.
  - **Why 4 runs and not 2:** with only 2, a short row (4 cards, about 648px) is narrower than a
    wide viewport, so the wrap exposed an empty gap mid-loop. One-run translate over 4 runs is
    seamless at any viewport width.
  - Icons live in ONE hidden `<symbol>` sprite referenced by `<use href="#id">`, deduped by
    markup (ASP.NET and MSTest share the .NET mark -> 30 symbols for 31 techs). Without the
    sprite, 4 repeats would inline ~40 KB of path data four times over; with it the page is
    actually 21 KB SMALLER than the first 2-run version (167,624 vs 188,001 bytes).
  - Icons are inline Simple Icons paths committed to `data/stackIcons.js` (CC0), rendered
    `fill="currentColor"` so they inherit the neon accent. **No runtime CDN call and no new
    dependency.** The `<svg fill>` wrapper was stripped so brand hex codes do not fight the theme.
  - Added to Tools & Testing: OpenRouter, Cline, OpenCode, GitHub Copilot, Vercel.
  - Accessibility: pauses on hover AND keyboard focus (WCAG 2.2.2) with an on-page hint,
    only run 1 of each row is exposed to assistive tech (15 of 20 runs are `aria-hidden`),
    `overflow: hidden` on the viewport so the page never scrolls sideways, and
    `prefers-reduced-motion` disables the animation and makes the row horizontally scrollable.
  - `stack.js` `techs` changed from `string[]` to `{ name, icon }[]`; `chatbot.js` prompt
    builder was updated to `.map((t) => t.name)` so it still feeds the assistant.

- Education (`data/education.js`): 1 placeholder -> 5 owner-supplied entries (Matias V.
  Salvador Memorial Elementary 1-6, Holy Angels Academy 7-8, Virginia Ramirez National High
  School 9-10, College of Mary Immaculate 11-12, and CMI BS Computer Science Years 1-4 marked
  Current). The active entry keeps reusing `degree`/`school` from `profile.js` so the hero,
  About copy and chatbot prompt cannot drift. Timeline `max-height` 280 -> 380px.

- Duration is set inline per row (~2.2s per card, clamped 10-40s) so rows move at a similar
  speed regardless of length.
- Verification: `npm run build` clean, 0 errors/warnings (1 page, ~36s). Output audit:
  124 `.stack-card` (31 techs x 4 runs), 20 `.stack-run`, 30 sprite `<symbol>`, 124 `<use>`
  refs, 15 `aria-hidden` runs, 5 viewports, 5 inline durations (13.2/13.2/10/24.2/10s),
  8 timeline items (3 experience + 5 education), all 5 education titles and grade labels
  present. CSS audit: all neon tokens present, **zero** orange hex values (`#f97316 #ea580c
  #fb923c #ffedd5 #fed7aa #fff7ed #5f210d` and the three orange rgba families all return 0
  matches), `@keyframes stack-scroll` + `mask-image` + `animation-play-state: paused` emitted.
## Phase 15: Brand-coloured icons, standalone tech-stack band, alternating carousels, About reformat

- Goal (owner request): real brand colours instead of one neon blue; move the tech stack out of
  the bento into its own section; bigger cards; alternate the carousel direction per row; kill
  the scrollbars; make the About card longer and properly formatted.

- **Bug fixed first:** every tech row was showing a horizontal scrollbar. Cause: `projects.css`
  is imported AFTER `tech-stack.css` and re-declared `.stack-viewport { overflow-x: auto }`,
  which beat that file's `overflow: hidden`. `.stack-viewport` is no longer in that list, and
  tech-stack.css now hides scrollbars explicitly (`scrollbar-width: none`,
  `-ms-overflow-style: none`, and a `::-webkit-scrollbar` reset) so it cannot regress.

- **Brand colours** (`src/data/stackIcons.js`, regenerated):
  - Each entry is now `{ brand, light, dark, body }` instead of a bare markup string. `brand`
    is the official hex published by the technology owner.
  - Only 7 of 30 official hexes clear 3:1 on BOTH card backgrounds. Express `#0a0a0a`, Vercel /
    Render / OpenCode / Copilot `#000000` and Angular are black marks and vanish on the dark
    card; JavaScript `#f7df1e`, Swagger `#85ea2d`, React `#61dafb`, Agora, Postman, Selenium,
    MongoDB and Node vanish on the light card.
  - So each colour is corrected per theme. Chromatic colours are shifted in **HSL - same hue,
    same saturation, only lightness** - until they clear WCAG 1.4.11 (3:1). Achromatic
    near-black brands are inverted per theme instead of being pushed to muddy grey, because a
    black mark on a dark card is simply a white mark.
  - Examples: React `#61dafb` -> light `#058fb4` / dark `#61dafb`; JavaScript `#f7df1e` ->
    light `#958505`; FastAPI `#009688` unchanged on both; SQLite `#003b57` -> dark `#0072a9`;
    CSS `#663399` -> dark `#8a4fc4`. All 30 pass an automated 3:1 check on both backgrounds.
  - Colours ride in as two inline custom properties, so switching theme needs exactly two CSS
    rules instead of a 30-rule block: `.stack-icon { fill: var(--brand-light) }` and
    `[data-theme="dark"] .stack-icon { fill: var(--brand-dark) }`.
  - The generator was rewritten in Node (`node gen_icons.mjs`). The original PowerShell version
    silently produced wrong colours: PowerShell parses `@($h * 60, $s, $l)` as `$h * (60,$s,$l)`,
    which threw inside the helper, and the try/catch swallowed every error while still writing a
    truncated file. Failures are now loud and the script self-checks contrast before writing.

- **Tech stack is now its own section** (`TechStack.astro`, rendered from `index.astro` between
  the bento and Projects; removed from `Bento.astro`):
  - No `.card` wrapper, no border, no panel - just an `h2` heading and the rows. It owns the
    `#tech` anchor so existing links still land in the right place.
  - Full bleed via `margin-inline: calc(var(--shell-px) * -1)`. Deliberately not `100vw`, which
    includes the scrollbar and would reintroduce horizontal overflow. Scoped as
    `.shell > .stack-section` because `projects.css` sets `.shell > * { max-width: 100% }` and is
    imported later, so a bare `.stack-section` rule would lose and get clamped back inside.
  - Cards enlarged: padding 10x16 -> 16x24, icon 22 -> 30px, label 1rem -> 1.125rem,
    row gap 12 -> 16px, card gap 18 -> 26px.

- **Alternating direction:** two keyframes selected by `data-dir` on the row - row 1 travels
  left->right, row 2 right->left, and so on (3 right, 2 left for the five groups). Both
  translate exactly one run width (`-25%`) across four identical runs, so the loop stays
  seamless at any viewport width.

- **About** (`About.astro`, `data/about.js`, `bento.css`):
  - Paragraph formatting: the first paragraph is now a lead (19px, heading colour, tighter
    leading) with a drop cap, giving the block an entry point instead of three identical
    paragraphs of typed text. Prose gaps 12 -> 16px.
  - Length: with Tech Stack gone the right column was ~370px short of the left column, so a
    **Quick Facts** grid was added. IMPORTANT: every value is either read from `profile.js` or
    restates a claim already made in the About copy - no biography was invented. A `TODO` in
    `about.js` tells the owner to replace it with real paragraphs if they prefer.
  - (For the record the About text was never justified - `.body-copy` sets no `text-align`. The
    wide-spacing look in the screenshot was monospace rendering. It stays left-ragged.)

- **Bug caught in review:** ASP.NET and MSTest resolve to the same Simple Icons body. The first
  sprite-building loop `continue`d on a duplicate markup, so MSTest was emitted with no
  `symbolId` and rendered iconless. Dedupe now only skips emitting a second `<symbol>`; every
  card still receives an id. Verified 124 cards / 124 icons / 30 symbols.

- Verification: `npm run build` clean, 0 errors/warnings. Output audit: 1 `.stack-section`,
  `data-dir` 3 right + 2 left, 124 `.stack-card`, 124 `.stack-icon`, 124 `--brand-light`
  values, 30 `<symbol>`, 1 `.about-lead`, 5 `.about-fact` with correct values, 0 `tech-card`
  (confirmed no longer a `.card`). CSS audit: `.shell > .stack-section` bleed rule present,
  both `data-dir` animation rules present, `fill: var(--brand-light)` / `[data-theme=dark]
  fill: var(--brand-dark)` present, `scrollbar-width: none` x2 and the webkit scrollbar reset
  x2 emitted, and `stack-viewport,` (the old override) returns 0 matches.
## Phase 16: AI-Engineer rebrand, balanced About card, formal paragraphs, tech stack as a grid

- Goal (owner request): make the About container balanced and longer; give the About prose a
  formal paragraph format with indents; change "Backend Specialist" to "AI-Engineer"; retitle
  the Focus fact to agentic programming / automation; and replace the tech-stack carousel with a
  static, balanced grid of icon cards.

- **AI-Engineer rebrand** (`src/data/profile.js`): `role` is now `'Fullstack Developer ·
  AI-Engineer'`. Because `role` is defined exactly once and read by the hero, the About ROLE
  fact, the chatbot system prompt and the `<meta description>`, that ONE edit updated all four.
  Verified in the built HTML: hero reads `Fullstack Developer · AI-Engineer`, the meta
  description carries it, and `Backend Specialist` returns **0** matches anywhere.

- **Focus fact** (`src/data/about.js`): `'Robust APIs & maintainable backends'` ->
  `'Agentic programming & automation'`.

- **About lead reworded** to match the new positioning. The wording was proposed to the owner
  for approval before implementing, and is derived only from what the owner supplied
  (AI-Engineer, agentic programming, automation) - no new biography was invented:
  "...a full-stack developer focused on maintainable, scalable backends — robust APIs, agentic
  programming, and automation that hold up over time."

- **About container balance** (`src/styles/bento.css`): the bento grid stretched both columns,
  but `.bento-col` is a flex column and the card inside it sized to its own content, so About
  ended ~130px short of Experience + Education. Fix is two rules:
  - `.bento-col-right > .card { flex: 1 }` — the card now fills the column height.
  - `.about-facts { margin: auto 0 0 }` — the quick facts anchor to the BOTTOM, so the slack
    lands between prose and facts instead of as a hole under the card.

- **Formal paragraph formatting**: book convention, not loose blocks. The lead stays flush
  (19px + drop cap); every paragraph after it gets `text-indent: 1.5em`; the paragraph gap
  tightened from 16px to `0.5em` because the indent, not a large margin, is what signals a new
  paragraph. Left-ragged on purpose — justifying monospace opens rivers.

- **Tech stack: carousel -> static grid.** The marquee needed four identical runs to loop
  seamlessly, which meant every technology rendered **four times** (React, MySQL and the rest
  appeared four times in the screenshot). With no animation each tech renders exactly once:
  **124 cards -> 31**, and the page shrank from 174,129 to 146,678 bytes.
  - Five category blocks, each a `micro-label` + count badge + fading hairline + card grid.
  - Column count comes from `--stack-cols`, computed inline from the item count and capped at
    8 (6 / 6 / 4 / 8 / 4). A plain `auto-fit` was rejected because it stretched Database's and
    Deployment's four cards across the full width, which looked sparse.
  - Mobile-first: 2 columns on phones, 4 from 640px, per-block count from 1024px.
  - Dropped the full bleed — it only existed for the ticker effect and would just push cards off
    screen in a grid. Cards now align with the page content.
  - **Deleted as dead code:** both `@keyframes`, every `animation-*` declaration, `data-dir`,
    `.stack-viewport` / `.stack-track` / `.stack-run`, the `prefers-reduced-motion` marquee
    block, and the "Hover or focus to pause" hint. Deleting the animation also retires the
    whole WCAG 2.2.2 "auto-moving content must be pausable" requirement for this section.
  - The icon sprite and the per-theme brand colours are unchanged.

- Verification: `npm run build` clean, 0 errors/warnings. Output audit: 31 `.stack-card`,
  31 `.stack-icon`, 5 `.stack-grid`, 5 `--stack-cols` values (6/6/4/8/4), 30 `<symbol>`,
  **0** `stack-carousel|stack-track|stack-run`, `Backend Specialist` 0 matches, `Robust APIs`
  0 matches. CSS audit: `.stack-grid` present at all three breakpoints including
  `repeat(var(--stack-cols, 4),minmax(0,1fr))`; `.bento-col-right>.card{flex:1}`,
  `.about-prose p+p{text-indent:1.5em}`, `.about-facts{margin:auto 0 0}` and the drop-cap
  rule all emitted. Facts verified rendering with correct values.
- Privacy: no phone number, address or private email written to any file, doc or log here.
- Not pushed or deployed. Commit is local on `portfolio-upgrade` only.

---

## Phase 17: Featured de-scroll, adaptive tech grid, divider, smaller cards

Owner feedback, four items: (1) the Featured Projects card should not scroll, show everything;
(2) the tech cards that "try to fit" should adapt - the longest text wins and everything follows
it, always centred; (3) "MORE PROJECTS" should look like the other sections, not plain text;
(4) the featured rows are too big.

### 1. Featured Projects: nested scroll removed

The inner scrollbar came from three places, all removed:

- `.featured-list { max-height: 70svh; overflow-y: auto; padding-right: 4px }` and its
  `max-height: 800px` variant at >=768px - deleted.
- `.featured-list` was also a member of the shared `.timeline, .featured-list, .gh-panel-wrap,
  .cert-list { overflow-x: auto }` rule, i.e. it drew a second rail. Dropped from that list.
- The `custom-scroll` class on the wrapper in `FeaturedProjects.astro` - dropped.

All three rows (EduTool, Voting System, Apptel) now render at full height and the page does the
scrolling. `.card` is height:auto, so nothing clips and no JS was involved - `main.js` only
touches `.filter-btn` / `.project-card`.

### 2. Tech grid: columns sized from the text, not the item count

The ugly wrapping came from Phase 16 deriving the column count from the NUMBER of items
(`Math.min(techs.length, 8)`). Tools & Testing has 11 items, so it got 8 columns: after the
30px icon, the 12px gap and the 32px padding, roughly 101px of text - about 10 monospace
characters. Everything longer hit `overflow-wrap: anywhere` and split mid-word: *"Postma n"*,
*"Jasmin e"*, *"OpenRo uter"*, *"OpenCo de"*, *"Copilo t"*.

Now each group emits its longest label length in characters, and CSS turns that into the
minimum track width:

```js
const longest = cards.reduce((n, c) => Math.max(n, c.name.length), 0);
```
```css
--stack-col-raw: calc(var(--stack-icon) + var(--stack-gap) + var(--stack-label-ch, 10) * 1ch + var(--stack-pad-x) * 2);
--stack-col-min: min(var(--stack-col-raw), 100%);
grid-template-columns: repeat(auto-fit, minmax(var(--stack-col-min), 1fr));
```

`ch` is exact here because the whole site is monospace - one character is one `ch`. `auto-fit`
then decides how many columns fit, so the grid genuinely adapts instead of being forced.
`--stack-cols` and its `Math.min(..., 8)` are gone. Resolved per group: **11 / 7 / 10 / 14 / 10**
characters (Frontend / Backend / Database / Tools & Testing / Deployment).

Two details worth keeping:

- **`ch` must be measured at the label's own font size.** `.stack-grid` now declares an explicit
  `font-size` and `.stack-card-name` is sized `1em`, so the `1ch` in the maths and the rendered
  text are always the same size. Previously the name was `1rem` below 1024px and `1.0625rem`
  above while the grid inherited 16px - a 6% under-estimate that would still have wrapped the
  longest name.
- **A custom property must never clamp itself.** The first attempt was
  `--stack-col-min: min(var(--stack-col-min), 46%)` in the phone breakpoint. That is a
  self-reference, which is INVALID at computed-value time per CSS Variables spec, so
  `grid-template-columns` would have been silently dropped and the whole grid collapsed to one
  column on every phone. Split into `--stack-col-raw` (text-derived) + `--stack-col-min` (clamped).

Phone fallback: below 640px the minimum is additionally clamped to 46% so the grid stays 2-up,
and the label is allowed to wrap - at the space, never mid-word (`overflow-wrap: break-word`).
Verified at 320px: only "React Query" and "GitHub Copilot" wrap, and both wrap cleanly.

Centring: `.stack-card { justify-content: center }` + `.stack-card-name { text-align: center }`.
The icon lost its `width`/`height` attributes and is now sized from `--stack-icon`, the same
variable the grid maths uses, so the icon can never outgrow the space reserved for it.

### 3. "MORE PROJECTS" is now a Divider

`<p class="video-subhead">` -> `<Divider>MORE PROJECTS</Divider>` (the component was already
imported). It picks up the same fading hairlines and wide-tracked caption as "ITERATE. BUILD.
DEPLOY." and "SOLVING THROUGH CODE". The dead `.video-subhead` rule is deleted.

### 4. Featured rows compacted

`.featured-card` 24px -> 18px padding; `.featured-row` 20px -> 14px; media column 45% -> 38%;
media padding 12/24 -> 10/18px and mobile cap 420px -> 380px; composite 320px -> 260px;
`.featured-name` 1.375 -> 1.25rem; `.featured-desc` 1.0625rem/1.625 -> 1rem/1.55;
`.proj-link` 1rem/10px -> 0.9375rem/8px; `.featured-text` gap 12px -> 10px;
`.featured-list` gap 16px -> 12px. `.featured-desc` also loses `text-align: justify` - the
Phase 16 log already flagged that justifying monospace opens rivers, and the About prose is
left-ragged, so this makes the two consistent.

### Verification

`npm run build` clean, 0 errors/warnings. Output audit: **31** `.stack-card`, **31**
`.stack-icon`, **5** `.stack-grid`, **5** `--stack-label-ch` (11/7/10/14/10), **0** `--stack-cols`,
**0** `70svh`, **0** `video-subhead`, `MORE PROJECTS` present once inside `.divider-caption`.
CSS audit: `repeat(auto-fit,minmax(var(--stack-col-min),1fr))` emitted once, `.stack-card` has
`justify-content:center`, `.stack-card-name` has `white-space:nowrap`, `.featured-media` is
`flex:0 0 38%`, and `.featured-list` is just `display:flex;gap:12px`. The three surviving
`overflow-wrap:anywhere` rules are the unrelated card/bento/chat guards.

Rendered in headless Chrome over the DevTools Protocol at **320, 360, 375, 414, 640, 768, 900,
1024, 1280 and 1536px in BOTH themes**: `document.scrollWidth === innerWidth` at every width
(no horizontal scrollbar, AGENTS.md rule 10), no card wider than its grid, and
`.featured-list` never clipped (`scrollHeight === clientHeight`). Column counts adapt per group
and per width - at 1536px: Frontend 6, Backend 6, Database 4, Tools 5, Deployment 4. Zero
labels wrap from 414px up.

`npx astro check` was NOT run: it needs `@astrojs/check` + `typescript`, which are outside the
allowed dependency list (AGENTS.md rule 4). The build's own `[types]` step ran clean.

- Privacy: no phone number, address or private email written to any file, doc or log here.
- Not pushed or deployed. Commit is local on `portfolio-upgrade` only.
---

## Phase 18 - Education newest-first, Tech Stack divider, video cursor

Three owner-requested fixes, all verified in the compiled output.

### 1. Education: "Current" moved to the top

`src/data/education.js` rendered oldest-first, so `BS Computer Science - 4th Year` (the one entry
carrying `active: true` and the neon-blue dot + `Current` badge) sat at the BOTTOM of the card, below
four hollow-ring school entries. The owner asked for the current one at the top.

Reversed the array to newest-first: BS Computer Science -> Senior High 11-12 -> Senior High 9-10 ->
Junior High 7-8 -> Elementary 1-6.

No component or CSS change was needed, and none was made:
- `Timeline.astro` maps the array verbatim, so DOM order is array order.
- The rail connector is `.timeline-item:not(:last-child) .timeline-rail::after` (`bento.css`), which
  is DOM-order driven, so it re-flows with the reversal automatically.
- The filled-vs-hollow dot and the `Current` badge already follow the `active` flag per item, not
  position, so the visual hierarchy is unchanged - only the reading order is.

Content is untouched: same five entries, same school names, same grade ranges, and the current entry
still reuses `degree` / `school` from `profile.js`. The docblock was updated to state the
newest-first order and to record why no CSS was touched.

### 2. Tech Stack promoted to a real signature divider

The tech band was the ONLY band on the page without a `<Divider>`. It rendered a bare left-aligned
`<h2 class="stack-heading">TECH STACK</h2>`, while Projects, the video grid, GitHub and Recognition
all used the neon-blue fading-hairline + wide-tracked caption primitive. This was an open TODO
recorded in Phase 15.

`TechStack.astro` now imports `Divider` and renders:

```astro
<h2 id="stack-heading" class="visually-hidden">Tech Stack</h2>
<Divider>TECH STACK</Divider>
```

The h2 is kept - visually hidden - rather than deleted, because the `<section>` is
`aria-labelledby="stack-heading"`; dropping the element would have broken the accessible name and
left a `role="separator"` div as the band's only visible label. This is the same pattern
`Projects.astro` already uses for its own band title. `.visually-hidden` is defined in
`projects.css` and is global, so no new utility was introduced.

`tech-stack.css`: deleted the now-dead `.stack-heading` block (no dead CSS), and gave
`.stack-section` `gap: var(--band-gap)` + `width: 100%` so the band sits on the same vertical rhythm
as `.projects` / `.gh-section` / `.recognition` instead of its bespoke `padding-block: 8px`.

### 3. Typing cursor over the video cards

Clicking a demo card showed the text I-beam cursor, which made the video grid look like a set of
text fields the user could click into and type in.

Cause: `Projects.astro` renders `<video class="project-video">` with no `controls` attribute. Chrome
and Firefox treat a control-less `<video>` as an inline replaced element and paint the text cursor
over it, and `.project-card a` set no cursor of its own.

Fix: `cursor: pointer` on `.project-card a` (the whole card is a real link, so a pointer is the
honest affordance anyway) and on `.project-video` (the actual hit target that inherits the I-beam).

### Verification

`npm run build` from `Code/` -> **clean, 0 errors, 0 warnings**.

Compiled-CSS audit (`dist/_astro/index.DyfHr89Z.css`):
- `.project-card a{...;cursor:pointer}` present.
- `.project-video{...;background:var(--bg-panel);cursor:pointer}` present.
- `.stack-section{display:flex;flex-direction:column;gap:var(--band-gap);width:100%;...}` present.
- `stack-heading` appears **0 times** in the compiled CSS - the dead rule is genuinely gone.

Rendered-HTML audit (`dist/index.html`):
- The Education `<ol>` now opens with `<li class="timeline-item active">` -> `BS Computer Science`
  + `Current` badge, followed by Grades 11-12, 9-10, 7-8, 1-6.
- Divider captions present in page order: `ERIC JAMES SONIO || PORTFOLIO 2026`, `SOLVING THROUGH
  CODE`, **`TECH STACK`** (new), `ITERATE. BUILD. DEPLOY.`, `MORE PROJECTS`, `CONSISTENCY`,
  `RECOGNITION | SOCIALS` - 7 total.
- `id="tech"` anchor and `aria-labelledby="stack-heading"` both intact.

No media, data content or URLs were changed. No phone number, address or private email written to
any file. Not pushed or deployed; the commit is local on `portfolio-upgrade` only.

---

## Phase 19 - Owner fixes: email, socials, graph size, resume, theme switch, chat head

Six owner-requested fixes. Two were genuine bugs rather than restyling.

### 1. The email address was invisible

The Email contact tile said `sub: 'Send a message'`. The address existed only inside the
`mailto:` href, which a visitor cannot see - so the tile told them nothing about how to reach him.

`src/data/links.js` now sets `sub: email` (the value already imported from `profile.js`, still a
single source of truth). The tile keeps its icon and `mailto:` href, so it is now both readable and
clickable. `.tile-sub` truncates with an ellipsis, so a long address stays tidy.

### 2. Facebook and Messenger were dead tiles

Both had `url: ''`. `LinkTile.astro` deliberately renders an empty-href tile as a non-interactive
`<div>` rather than an `<a>` without href, so both were unclickable. The owner supplied the
Facebook profile:

- Facebook -> `https://www.facebook.com/ericjamessoni0`, `sub: 'ericjamessoni0'`
- Messenger -> `https://m.me/ericjamessoni0`, `sub: 'ericjamessoni0'` (standard Messenger deep
  link; resolves to the same profile)

Both now render as real `<a target="_blank" rel="noreferrer">` links automatically, because
`isExternal` is derived from the href. The icon paths were already correct and were left alone.

### 3. GitHub contributions graph was too small

`GithubGraph.jsx` hardcoded `blockSize={isDark ? 11 : 14}` - 11px in dark mode, which is the tiny
grid in the owner's screenshot. Cell size is now responsive state:

- >= 768px -> 18px
- >= 480px -> 14px
- below  -> 11px

Driven by two `matchMedia` listeners (768 and 480) rather than a resize handler, so it only fires
when a threshold is actually crossed; both are removed on unmount. `blockMargin` 4 -> 5 and
`fontSize` 13 -> 15 so the labels scale with the cells. `showYearSelect` was KEPT - the owner
confirmed it matches the reference. `blockRadius={0}` and the neon-blue per-theme palettes are
unchanged.

`.gh-panel-wrap` keeps `overflow-x: auto`, which is now load-bearing rather than decorative: at
18px the 53-week grid is wider than a phone, and that rule keeps the overflow INSIDE the panel so
the page never scrolls sideways (AGENTS.md rule 10). Wrapper padding 16 -> 20px for the bigger cells.

### 4. Resume is now live

`public/resume.docx` was already in the repo (16,376 bytes, magic bytes `50 4B 03 04` = valid
OOXML), but `profile.js` still had `resume = null`, so GET RESUME rendered as a disabled
`TODO` span. Set to `/Portfolio/resume.docx`, which activates the anchor and the `download`
attribute. Astro copies the file into `dist/` (verified: `dist/resume.docx`, 16,376 bytes).

Note: a `.docx` downloads rather than opening in the browser. A `.pdf` would open inline and is
friendlier to recruiters, but converting it needs Word/LibreOffice - outside the allowed dependency
list (rule 4) - so the supplied file is linked as-is. Flagged to the owner.

### 5. Theme switch looked broken (real bug)

The owner's screenshot showed a tall grey lozenge with the knob floating high inside it. Cause was
a CSS contradiction in `hero.css`:

```css
.theme-switch { height: 28px; min-height: 44px; }   /* min-height wins -> 44px tall */
.theme-knob   { margin-top: -8px; }                   /* hack to prop it back up */
```

The switch declared both a 28px height and a 44px min-height, so it rendered **44px tall** with a
20px knob, and a negative margin pulled the knob upward to compensate. `translateX(28px)` was also
hardcoded, so the slide could not track a change to the track width.

Rebuilt with the hit area and the pill as separate boxes:

- `.theme-switch` - transparent button, `min-height: 44px`, imposes NO height on the pill.
- `.theme-track` - the visible pill: 64x32, `padding: 4px`, owns `--switch-track` / `--switch-knob`
  / `--switch-pad` as custom properties.
- `.theme-knob` - 26x26, neon `--accent` fill with near-black glyph (same treatment as the chatbot
  FAB). The `margin-top: -8px` hack is **deleted**.
- Travel is computed: `translateX(calc(var(--switch-track) - var(--switch-knob) - var(--switch-pad) * 2))`
  = 30px, so the knob lands flush against the far padding and cannot drift from the geometry.
- Hover now tints the track border with the accent.

`Hero.astro` gained the `.theme-track` wrapper and both icons went 12px -> 14px.

### 6. Chat head redesigned

The header avatar was a round neon circle containing the letter "E" - the only rounded element on a
site that is otherwise flat and square-cornered (cards, tiles, dividers, chips).

`.chat-avatar` is now a 40px square with `border-radius: 0`, a 1px accent border and a panel
background, holding a `>_` terminal prompt mark (`.chat-prompt`). The prompt reads as a command line,
which suits a monospace portfolio and signals "assistant" without relying on an initial. Glyph
colour is `--accent-text`, so it stays AA-readable on the panel in both themes - the old neon fill
is decorative-only, so this is a contrast improvement too. `.chat-mini-avatar` (22px) got the same
treatment in each bot bubble and in the "Typing..." row.

All three marks are `aria-hidden`; the real accessible name is still the `.chat-name` text beside
them. `profile.name.charAt(0)` no longer appears anywhere in the Chatbot bundle.

### Verification

`npm run build` from `Code/` -> **clean, 0 errors, 0 warnings**.

Compiled-HTML audit (`dist/index.html`):
- `class="btn btn-primary" href="/Portfolio/resume.docx"` with text `Get Resume`; `btn-todo`
  appears **0 times** - the disabled TODO state is gone.
- `facebook.com/ericjamessoni0`, `m.me/ericjamessoni0` and the email address all present.
- `<div class="tile">` count is **0** - no non-interactive contact tiles remain.
- Theme switch markup nests correctly: `button.theme-switch > span.theme-track > span.theme-knob > svg`.
- Chatbot bundle contains `chat-prompt`; **0** occurrences of `charAt`.
- GithubGraph bundle contains the 768 / 480 breakpoints, `blockSize`, `blockMargin` and
  `showYearSelect`.

Compiled-CSS audit: `.theme-switch` has no `height`, `.theme-track` is 64x32, the dark knob transform
is the `calc(...)`, `.chat-avatar` / `.chat-mini-avatar` are square with `border-radius:0`, and
`.gh-panel-wrap` keeps `overflow-x:auto`.

`dist/resume.docx` present at 16,376 bytes.

No phone number or private email was written to any file, doc or log here (rule 9); the chatbot
prompt was re-checked and still contains no phone number. Not pushed or deployed.
