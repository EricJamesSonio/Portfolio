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

