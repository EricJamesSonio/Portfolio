# Portfolio Upgrade Progress
Branch: portfolio-upgrade   Started: 2026-10-05   Last update: 2026-10-05

| # | Phase | Status | Notes |
|---|-------|--------|-------|
| 0 | Recon, plan, setup | DONE | Host=GitHub Pages; base=/Portfolio; media collision fixed |
| 1 | Foundation (tokens, theme, base) | DONE | Light+dark tokens, pre-paint theme, shell, type scale |
| 2 | UI primitives | DONE | Divider, Card, Chip, LinkTile + ui.css; demo block removed |
| 3 | Hero | DONE | Navbar removed, portrait+text hero, theme pill, ripple; fixed empty-divider bug |
| 4 | Bento (Experience, Education, About, Tech Stack) | DONE | 4 data files, Timeline primitive, 35/65 grid, 26 chips, shields.io removed |
| 5 | Projects (Featured + video grid) | DONE | 3 featured rows (laptop+phone mockups), 5 rows hidden, 4 dup cards removed |
| 6 | GitHub contributions | DONE | React island (React 18 for Astro 4), neon-blue palettes, inner scroll |
| 7 | Certifications and Contact | DONE | Empty cert state + lightbox, contact tiles, footer; fixed empty href bug |
| 8 | Theme polish (ripple + audit) | DONE | WCAG AA contrast pass (light theme was failing), dead CSS unimported |
| 9 | AI chatbot | DONE | Island + api/chat.js, prompt from data files, no secrets; needs non-GH-Pages host |
| 10 | Content and data consolidation | DONE | Removed 3 duplications, shared degree/school/email/location, proofread copy |
| 11 | Responsive pass | DONE | Overflow guards, wrapping, svh/dvh, hover gating, 320-1536px reviewed |
| 12 | Accessibility, performance, SEO | DONE | Heading-order fix, canonical/OG/Twitter/JSON-LD, favicon, robots, sitemap |
| 13 | Cleanup and release readiness | DONE | Dead CSS/aliases removed, README rewritten, final build clean |
| 14 | Neon-blue retheme, larger type, stack carousels, education history | DONE | Accent orange -> neon blue (--accent-text added for AA), full type-scale bump, 5 scrolling tech carousels with brand icons, 5 education entries |

Statuses: TODO, IN PROGRESS, DONE, BLOCKED, SKIPPED

## Open TODO content
- `Resume.pdf` missing -> `GET RESUME` renders disabled with a TODO marker
- Portrait hover video(s) missing -> portrait is a still image
- `vote-mobile` / `apptel-mobile` phone screenshots missing (Phase 5 placeholders)
- Featured projects: tech chips and live URLs not supplied (Phase 5)
- Certifications: none exist for this owner and no certificate images (Phase 7)
- Facebook + Messenger contact URLs not present on the existing site (Phase 7)
- Coding-since year not stated on the existing site (Phase 4 timeline header)
- Role tagline: using the existing wording; a shorter 3-word tagline is optional
- Phase 14: "ominorute" was read as **OpenRouter** (sits with Cline / OpenCode / Copilot).
  Confirm or correct `src/data/stack.js`. Vercel was added under Tools as requested, though
  it also fits Deployment.
- Phase 14: the owner asked for 4 carousels (Frontend, Backend, Tools, Deployment); the
  existing **Database** group was kept as a 5th so real content was not deleted.
  Say the word and it is dropped.
- Phase 14: no Simple Icons mark exists for Karma, MSTest or Aiven. Substitutes are documented
  in `src/data/stackIcons.js` (Selenium, .NET, and a neutral cloud glyph).

## Missing images
- `Resume.pdf` (no resume file in `public/`) -> GET RESUME disabled with a TODO marker
- Portrait hover video (no light/dark hover videos) -> portrait is a still image
- `techhub-mockup.png`, `navsumaro-mockup.png`, `interviewspark-mockup.png`, `startsmart-mockup.png`,
  `portfolio-mockup.png` -> those 5 featured rows are HIDDEN (EduTool, Voting System, Apptel show)
- `voting-mobile.png`, `apptel-mobile.png` -> placeholder phones (EduTool has a real mobile image)
- All certificate images -> Certifications renders an honest empty state (Phase 7)
- No video posters exist for the 11 video cards

## Unused media (kept on disk, never deleted)
- `videos/edutool.mp4` (EduToolV2, 1.3 MB), `videos/edutool2.mp4` (EduTool V3, 19.9 MB),
  `videos/votingsystem.mp4` (Voting System, 3.4 MB), `videos/apptel.mp4` (Apptel, 34.5 MB)
  -> no longer referenced after the featured block was added. ~59 MB total.

## Blocked/skipped reasons
- (none yet)
