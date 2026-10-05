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

