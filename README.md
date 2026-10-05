# Eric James Sonio - Portfolio (Astro)

A single-page developer portfolio in the **mono + orange editorial** style: monospace type
throughout, one orange accent, flat bordered cards, letter-spaced divider captions, a bento
layout, featured projects with device mockups, a GitHub contribution graph, contact tiles,
light/dark theming with a circular ripple, and an AI assistant.

Built with **Astro 4 + plain CSS**. React is used only for two small islands
(the GitHub graph and the chatbot). No Tailwind, no UI kits.

---

## Quick start

```bash
cd Code            # package.json lives here
npm install
npm run dev      # http://localhost:4321/Portfolio/
npm run build    # -> Code/dist
npm run preview
```

> The site is served under the `/Portfolio` base path (`base` in `astro.config.mjs`).
> Open `http://localhost:4321/Portfolio/` in dev.

---

## Project structure

```
Code/                    <- run npm commands from HERE
  api/chat.js            serverless function for the AI assistant (Vercel style)
  public/assets/images/  screenshots, portrait, certificate images
  public/assets/videos/  project demo videos (.mp4)
  public/favicon.svg, robots.txt, sitemap.xml
  public/scripts/main.js video lazy loading, filters, lightbox, smooth scroll
  src/
    components/          .astro sections + react/ islands
    data/                ALL content lives here (see below)
    layouts/Layout.astro
    pages/index.astro
    styles/              one CSS file per section + base.css + ui.css
  astro.config.mjs
  package.json
  .env.example           chatbot env var NAMES only
docs/                    progress, build log, review report
skills/                  agent skill definitions
.github/workflows/       GitHub Actions
```

> All paths below are relative to `Code/`.

---

## Editing content

**Everything on the page comes from `src/data/`.** You should not need to touch any component
to change copy, links, projects or certificates.

| File | Contents |
|---|---|
| `src/data/profile.js` | name, role, location, email, degree, school, resume path, portrait, year |
| `src/data/about.js` | the three About paragraphs |
| `src/data/experience.js` | experience timeline + `codingSince` |
| `src/data/education.js` | education timeline |
| `src/data/stack.js` | tech stack groups |
| `src/data/projects.js` | featured projects (with images) + the video grid list |
| `src/data/certs.js` | certifications and awards |
| `src/data/links.js` | socials and contact links |
| `src/data/github.js` | GitHub username and calendar palettes |
| `src/data/chatbot.js` | builds the assistant's system prompt from all of the above |

The chatbot's knowledge is generated from the same files, so a change to a project updates the
card **and** the assistant at once.

### Adding a featured project

1. Drop `<slug>-desktop.png` (and optionally `<slug>-mobile.png`) into `public/assets/images/`.
2. Add one entry to the `featured` array in `src/data/projects.js`.
3. Run `npm run build`. The row appears with a CSS laptop + phone mockup.
   A project with **no** image is hidden automatically, and a project with no mobile image gets
   an intentional placeholder phone.

### Adding a certificate

1. Drop the image into `public/assets/images/`.
2. Add `{ name, issuer, image }` to `certs` in `src/data/certs.js`.
   The lightbox appears automatically once the image exists on disk.
---

## AI chatbot

The assistant is a React island plus a **serverless function**. The API key is read from a
server environment variable and is never shipped to the browser.

### 1. Environment variables

Copy `.env.example` to `.env` and fill it in:

| Variable | Required | Default | Notes |
|---|---|---|---|
| `GROQ_API_KEY` | yes | - | create one at https://console.groq.com/keys |
| `GROQ_MODEL` | no | `llama-3.3-70b-versatile` | any model your key can access |

> Never prefix these with `PUBLIC_` or `VITE_` - that would expose the key to the browser.
> `.env` is gitignored; `.env.example` (names only) is committed.

### 2. Hosting the function

`api/chat.js` is written for **Vercel** and works with zero configuration there.

**This repo currently deploys to GitHub Pages, which cannot run serverless functions.** Until the
site is hosted somewhere that can (Vercel or Netlify), the chat button still appears but replies
with a friendly "assistant unavailable" message.

To enable it:

- **Vercel** - keep `api/chat.js` as is, add `GROQ_API_KEY` (and optionally `GROQ_MODEL`) in the
  project environment variables. For local testing run `vercel dev`.
- **Netlify** - copy `api/chat.js` to `netlify/functions/chat.js` and set the same variables in
  Netlify's environment settings.

The function validates its input, keeps only the last 10 messages, caps message length and
response tokens, and returns generic errors.

---

## Theming

Light/dark follows the operating system preference on first visit and is then remembered in
`localStorage`. The theme is applied **before first paint** (inline script in `<head>`), so there is
no flash. Toggling uses the View Transitions API for a circular ripple, and falls back to an
instant switch in browsers without it or when the user prefers reduced motion.

All colours are CSS variables defined in `src/styles/base.css` under `:root` and
`[data-theme="dark"]`.

---

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.

If you move to a custom domain, update `base` and `site` in `astro.config.mjs`, plus the URLs in
`public/robots.txt` and `public/sitemap.xml`.

---

## Performance notes

- Videos use `preload="none"`, lazy-load when scrolled near the viewport, play when mostly in view
  and pause when off screen. **No poster images exist yet**, so a frame is only shown once the
  video has loaded.
- The GitHub island is hydrated with `client:visible` and the chatbot with `client:idle`, so the
  React runtime is never needed for first paint.
- Several demo videos are very large (up to ~35 MB). Compressing them would be the single biggest
  speed win. Originals are never modified by the build.

---

## Unused-but-kept files

`Code/src/components/Navbar.astro` and `Code/src/styles/navbar.css` are **not rendered** - the reference
design is a single scroll with no navbar - but they are kept in the repo so the navbar can be
restored. Delete them if you do not want them back.

`Code/public/assets/videos/` still contains four videos whose cards were replaced by featured project
rows (`edutool.mp4`, `edutool2.mp4`, `votingsystem.mp4`, `apptel.mp4`, ~59 MB total). They are
harmless but unused, and can be deleted.
---

## Folder structure

The repo root holds documentation and CI config only. Everything needed to **build or run** the
site lives in **`Code/`**.

```
Porttfolio/
+- Code/                    <- the application (run npm commands HERE)
�  +- api/chat.js           serverless function for the AI assistant (Vercel style)
�  +- public/               static files copied verbatim to dist/ (images, videos, favicon)
�  +- src/                  components, data, layouts, pages, styles
�  +- astro.config.mjs
�  +- package.json
�  +- .env.example
+- docs/                    progress, build log, review report
+- skills/                  agent skill definitions
+- .github/workflows/       GitHub Actions (builds Code/ -> publishes Code/dist)
+- .gitignore
+- AGENTS.md
+- README.md
```

### Running it

```bash
cd Code
npm install       # first time only
npm run dev       # http://localhost:4321/Portfolio/
npm run build     # -> Code/dist
npm run preview
```

> **Always `cd Code` first.** `npm install`, `npm run dev`, `npm run build` and `npm run preview`
> must be run from inside `Code/`, because that is where `package.json` lives.
> Opening a terminal at the repo root and running `npm install` will fail.