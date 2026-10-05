# AGENTS.md

Read this first. This repo is an **existing Astro portfolio** that is being upgraded, in phases, to match the reference design (mono + orange editorial). Update it **in place**; do not convert it to React or rebuild it from scratch.

## Mission

Make the **whole site** follow the reference defined in the `react-portfolio-builder` skill: monospace type, one orange accent, flat bordered cards, divider captions, bento layout (timelines, tech chips), Featured Projects with device mockups above the video grid, GitHub graph, certificates lightbox, contact tiles, light/dark with ripple, and a secure AI chatbot.

## Skills

- `astro-portfolio-upgrade` (operating manual): start with `SKILL.md`, then `references/loop-protocol.md` and `references/phases.md`.
- `react-portfolio-builder` (design reference): `design-system.md`, `layout-and-responsive.md`, `sections.md`, `theming-dark-mode.md`, `ai-chatbot.md`.

## How work is done

- Work proceeds in **phases 0 to 13** (`phases.md`), driven by the **loop protocol**: do all phases back to back, without asking questions, then stop **once** with a review report.
- State lives in `docs/PORTFOLIO_PROGRESS.md` and `docs/BUILD_LOG.md`. Read them at the start of every session and resume at the first unfinished phase.
- Work on git branch `portfolio-upgrade`, one local commit per phase. Never push or deploy.
- Ready-to-paste prompts (MASTER LOOP, RESUME, single phase, fixes): `astro-portfolio-upgrade/references/agent-prompts.md`.

## Project map

```
public/
├─ assets/images/        screenshots/mockups, portraits, certificate images (user supplied)
├─ assets/videos/        project demo videos (.mp4), used by the video-card grid
└─ scripts/main.js       client-side behavior
src/
├─ components/           Hero, About, TechStack, Projects, Contact, Footer, Navbar (.astro) + new components
├─ layouts/Layout.astro  HTML shell, head, theme init script
├─ pages/index.astro     page composition
├─ styles/               one CSS file per section + base.css + responsive.css (+ new files)
├─ data/                 (created in the upgrade) profile, experience, education, stack, projects, certs, links
└─ components/react/     (created in the upgrade) islands: chatbot, GitHub graph, optional theme toggle
api/ or netlify/functions/   chatbot function (created in Phase 9, depends on host)
docs/                    progress, build log, review report
```

## Target page flow

Divider `NAME || PORTFOLIO YEAR` -> Hero -> Divider `SOLVING THROUGH CODE` -> Bento (Experience, Education | About, Tech Stack) -> Divider `ITERATE. BUILD. DEPLOY.` -> Projects (Featured, then video grid) -> Divider `CONSISTENCY` -> GitHub contributions -> Divider `RECOGNITION | SOCIALS` -> Certifications | Contact -> Footer -> floating chatbot.
(The navbar is removed from the flow by default; files are kept.)

## Rules

1. **Inspect before editing.** Never guess colors, class names, or structure.
2. **Reference wins for design; existing site wins for personal content and URLs.**
3. **Stay on Astro with plain CSS.** React only for islands. No Tailwind, no UI kits.
4. **Allowed new dependencies only:** `@astrojs/react`, `react`, `react-dom`, `react-github-calendar`, `groq-sdk` (server only), types.
5. **Never invent content.** Use `TODO` markers; list them in the report.
6. **Never delete or overwrite user media.** Report unused files; write optimized copies to a new folder only.
7. **No secrets in client code.** `GROQ_API_KEY` and `GROQ_MODEL` live in server env vars only; commit `.env.example` with names only.
8. **Do not push, deploy, or publish.**
9. **Privacy:** do not write phone numbers, addresses, or private emails into new code, docs, logs, or reports.
10. **Accessible and responsive:** alt text, visible focus, reduced motion, no horizontal scroll at 375px, both themes complete.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # must pass at every phase
npm run preview
npx astro check    # if available
```

## Definition of done (whole project)

- [ ] All phases DONE (or BLOCKED/SKIPPED with reasons)
- [ ] Build clean; no secrets in repo; `.env.example` present
- [ ] Verified at 320 to 1536px, light and dark
- [ ] No duplicate projects; missing images handled (hidden or placeholder per spec)
- [ ] `docs/REVIEW_REPORT.md` written; agent has stopped for review
