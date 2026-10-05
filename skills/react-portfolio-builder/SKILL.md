---
name: react-portfolio-builder
description: Complete playbook for building a developer portfolio in the "mono + orange editorial" style of ehrvayn/Portfolio with React 19, Vite, and Tailwind CSS v4. Covers the design system (monospace type, one orange accent, flat bordered cards, letter-spaced divider captions), mobile/tablet/desktop responsiveness, every section (hero with hover-video portrait, timelines, tech stack chips, project cards, GitHub graph, certificate lightbox, contact tiles), dark/light theming with a ripple transition, a secure Groq AI chatbot with persona prompt and guardrails, content/data structure, accessibility, performance, and Vercel deploy. Use whenever the user wants to build, redesign, extend, debug, or review a personal portfolio, resume site, or any part of one (dark mode, project cards, timeline, GitHub graph, chatbot, responsive hero), even without saying "portfolio".
---

# React Portfolio Builder

Recreates and improves the portfolio at github.com/ehrvayn/Portfolio (live: ehrvayn-portfolio.vercel.app). Everything here is derived from the real source code (`App.jsx`, `Container1-4`, `containers/*`, `ChatBot.jsx`, `DarkmodeProvider.jsx`, `index.css`, `MyInfo.js`) plus screenshots of the live site.

## How to use this skill

1. Read this file for the overview and rules.
2. Open **only** the reference files the task needs (table below).
3. Build in the order in "Build workflow".
4. Run the checklist in `references/quality-and-pitfalls.md` before calling it done.

| Task | Read |
|---|---|
| Colors, fonts, borders, shadows, chips, dividers, buttons | `references/design-system.md` |
| Page structure, grid, spacing, mobile/tablet/desktop behavior | `references/layout-and-responsive.md` |
| Building any section component (code) | `references/sections.md` |
| Dark/light mode, ripple transition, theme tokens | `references/theming-dark-mode.md` |
| Chatbot UI, persona prompt, Groq, security, guardrails | `references/ai-chatbot.md` |
| Where content lives, data shapes, writing copy | `references/content-and-data.md` |
| Prompts to give an AI assistant to build or extend the site | `references/ai-workflow.md` |
| Bugs seen in the original, a11y, perf, SEO, deploy, final checklist | `references/quality-and-pitfalls.md` |

## The style in one paragraph

A **terminal-meets-editorial** single-page site. White (or near-black) canvas, **monospace everywhere**, **one orange accent**, **flat square-cornered cards with thin orange-tinted borders**, UPPERCASE bold card titles, tiny ultra-wide-tracked orange divider captions between sections, peach-tinted chips and link tiles, orange `↗` links. Playful touches: hover on the portrait plays a short video, theme switch reveals via a circular ripple, a bouncing chat button with a "Hey there! Wanna chat?" tooltip.

## Stack

React 19 · Vite 7 · Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first `@theme`, no config file) · `react-icons` (Io5, Fa6, Bi) · `bootstrap-icons` (font, via `<i className="bi bi-...">`) · `react-github-calendar` · `groq-sdk` · ESLint 9 · Vercel. State via React Context only (no router, no state library).

```bash
npm create vite@latest portfolio -- --template react
cd portfolio
npm i tailwindcss @tailwindcss/vite react-icons bootstrap-icons react-github-calendar groq-sdk
```

## Non-negotiable rules

1. **One font (monospace), one accent (orange).** No second family, no second accent color.
2. **Flat and square.** No rounded cards, no heavy shadows. `rounded-md` only on the portrait, `rounded-full` only on dots, avatars, and the theme switch.
3. **Every section is introduced by a divider caption** (see design-system).
4. **Content lives in data arrays**, not scattered through JSX (see content-and-data).
5. **Never ship an API key to the browser.** Proxy chatbot calls through a serverless function (see ai-chatbot). The original exposes `VITE_GROQ_API_KEY`; do not copy that.
6. **Mobile first.** Write base classes for phones, then `md:`, `lg:`, `xl:` overrides.
7. **Both themes must be complete.** Every surface, text, border, and chip needs a dark variant.
8. **Keep personal data out of shared code.** Phone numbers and private emails belong in your own `data/profile.js`, not in examples, prompts, or commits you share.

## Build workflow

1. **Foundation:** `index.css` (`@import "tailwindcss"`, `@theme` mono font, scrollbar styles, view-transition keyframes), `main.jsx` (providers, bootstrap-icons CSS), theme context.
2. **Primitives:** `Divider`, `Card`, `SectionTitle`, `Chip`, `LinkTile`, and a theme-token helper.
3. **Hero** (`Container1`): portrait with hover video, name, role, location, buttons, theme switch.
4. **Bento** (`Container2`): Experience + Education (left 35%), About + Tech Stack (right 65%).
5. **Projects + GitHub** (`Container3`).
6. **Certifications + Contact** (`Container4`).
7. **Chatbot** UI, then serverless `/api/chat`.
8. **Footer**, then responsive pass at 375 / 768 / 1024 / 1280 px.
9. **Dark mode pass**, a11y pass, perf pass, SEO meta, deploy.

## Folder layout

```
src/
├── assets/
│   ├── img/        profile.jpg, DarkProfile.jpg, project mockups, cert images
│   ├── vid/        hover videos (light + dark), short and compressed
│   ├── info/       MyInfo.js  (chatbot persona/knowledge) -> move server-side
│   └── styles/     index.css
├── components/
│   ├── Dividers/   Container1..4  (page "bands": hero, bento, projects, recognition)
│   ├── containers/ About, Experience, Education, TechStack, FeaturedProjects,
│   │               GithubContributions, Certifications, Contact
│   ├── ui/         Divider, Card, Chip, LinkTile   (recommended extraction)
│   └── ChatBot.jsx
├── context/        DarkmodeProvider.jsx
├── data/           profile.js, experience.js, education.js, stack.js,
│                   projects.js, certs.js, links.js       (recommended)
├── App.jsx
└── main.jsx
api/chat.js         (Vercel serverless)
public/             Resume.pdf, favicon
```
