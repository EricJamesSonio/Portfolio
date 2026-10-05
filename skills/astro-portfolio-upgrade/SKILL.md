---
name: astro-portfolio-upgrade
description: Autonomous phase-by-phase plan for upgrading an EXISTING Astro portfolio (Hero, About, TechStack, Projects, Contact, Navbar, Footer, per-section CSS, video project cards) so the whole site matches the mono and orange editorial reference portfolio (ehrvayn/Portfolio) with CSS-variable light/dark theming and a ripple toggle, divider captions, bento timelines and tech chips, Featured Projects with laptop and phone mockups above the video grid, GitHub graph, certificates lightbox, contact tiles, and a secure Groq AI chatbot. Includes a loop protocol so an agent runs every phase non-stop with a progress file, build gates, per-phase commits, and one final review stop. Use whenever the user wants to update, redesign, or continue upgrading their Astro portfolio, run the phases or the loop, resume after an interruption, or review the result, even if they never say Astro.
---

# Astro Portfolio Upgrade (full reference parity, phased, loop-driven)

## Mission
The user has a working **Astro** portfolio. Upgrade the **entire site** so it matches the reference design captured in the companion skill **`react-portfolio-builder`** (mono type, one orange accent, flat bordered cards, divider captions, bento layout, featured projects with device mockups, GitHub graph, certificates, contact tiles, dark/light with ripple, AI chatbot).

- **Stay on Astro.** Do not convert to React. React is used only for small islands (chatbot, GitHub graph, optionally the theme toggle).
- **Keep the existing CSS approach** (plain CSS, one file per section). The reference uses Tailwind class names; treat those as *design values* and translate them into CSS variables and classes. Do **not** add Tailwind.
- **Edit in place.** Reuse existing files and names where possible; add new files following the repo's conventions.

The work is split into **phases** (`references/phases.md`) and executed by a **loop** (`references/loop-protocol.md`) that runs from start to finish without asking questions, then stops **once** for the user's review.

## Required companion material
Read these as needed during phases (they hold the design values and patterns):
- `react-portfolio-builder/references/design-system.md` (colors, type, cards, chips, dividers)
- `.../layout-and-responsive.md`, `.../sections.md`, `.../theming-dark-mode.md`, `.../ai-chatbot.md`, `.../content-and-data.md`, `.../quality-and-pitfalls.md`
If the companion skill is not available, use `references/target-summary.md` (condensed design values) instead.

## How to run
1. Read `references/loop-protocol.md` (rules for autonomous operation).
2. Read `references/phases.md` (what to build, in what order, with gates).
3. Create/read the progress file (`docs/PORTFOLIO_PROGRESS.md`, template in `references/progress-template.md`) and continue from the first unfinished phase.
4. Loop through phases. After the last phase, write `docs/REVIEW_REPORT.md` and **stop for review**.

## File map
| File | Purpose |
|---|---|
| `references/loop-protocol.md` | Non-stop operating rules, per-phase cycle, decision policy, stop conditions, resume |
| `references/phases.md` | Phases 0 to 13 with tasks, dependencies, verification gates, default decisions |
| `references/featured-projects-spec.md` | Detailed spec for the Featured Projects block (Phase 5) |
| `references/project-data-and-images.md` | Project data fields, image naming, mockup modes |
| `references/content-seed.md` | The owner's real content from the reference portfolio (bio, timelines, stack, projects, certs) |
| `references/target-summary.md` | Condensed design values if the companion skill is missing |
| `references/video-cards.md` | Handling the existing video-card grid |
| `references/react-islands.md` | Chatbot, theme toggle, GitHub graph, lightbox islands |
| `references/progress-template.md` | Templates: progress file, build log, review report |
| `references/quality-checklist.md` | Gate checklist used by phases 11 to 13 |
| `references/agent-prompts.md` | Ready-to-paste prompts: MASTER LOOP, RESUME, single phase, review fixes |

## Hard rules (apply in every phase)
1. Inspect before editing; never guess structure, colors, or class names.
2. Match the reference design; where the existing site and reference conflict, **the reference wins** (this is the point of the upgrade), except for content and links, which come from the existing site.
3. Never invent facts. Missing content becomes a `TODO` and goes in the report.
4. Never delete or overwrite the user's images or videos. Report unused files instead.
5. No secrets in client code. API keys only in server environment variables.
6. Do not push, deploy, or publish. Local commits on a work branch only.
7. Only the allowed new dependencies listed in `phases.md`.
8. Accessible, responsive, and reduced-motion-safe by default.
9. Do not write phone numbers, addresses, or private emails into new code, logs, or reports; read contact details from the existing site's own components when needed.
10. Stop only at the final review point, or when truly blocked (see loop protocol).
