# Quality, Pitfalls, and Launch Checklist

Contents: issues found in the original · accessibility · performance · SEO and sharing · security and privacy · deployment · final checklist

## Issues found in the original source (fix when rebuilding)

| Area | Issue | Fix |
|---|---|---|
| Security | `VITE_GROQ_API_KEY` + `dangerouslyAllowBrowser: true` exposes the key | Serverless proxy, rotate the key |
| Privacy | Phone number rendered in the contact tile, home address and personal email inside the chatbot prompt, an email mismatch between hero and contact tile | Public contacts only; one email from `profile.js` |
| Honesty | Prompt forbids ever admitting it's an AI | Label as AI assistant; answer honestly if sincerely asked |
| Chat memory | Only last message sent to the model | Send last ~10 turns |
| README drift | README says Llama 3.3 70B, code uses `openai/gpt-oss-20b` | Env-var the model, update README |
| Theming | Dozens of duplicated ternaries; body class only for scrollbars | `t(dark)` tokens or `dark:` variant |
| Accent consistency | Blue active dot in Education (`bg-blue-500`) and `item.active` never set | Orange for active; single array |
| Hacks | Empty placeholder item in Experience; `w-[98.4%]`; `mr-[-15px]`; commented-up negative margins | Remove; fix layout properly |
| Undefined class | `custom-scroll` referenced but not defined | Define it in CSS |
| Links | "Reach me" tile gets `href={undefined}`; hero email vs contact email differ | `tel:` link; shared data |
| A11y | `<i onClick>` send icon, clickable `<div>` cards, images without alt, no focus styles, icon-only buttons unlabeled | Real `<button>`s, alt text, `aria-label`, focus rings |
| Perf | Hover state in parent re-renders all project cards; large unoptimized images/videos; `preload` unspecified on video | CSS `group-hover`, WebP, `loading="lazy"`, `preload="none"` |
| Mobile | `h-[95vh]` hero, 800px nested scroller, 8px captions, hover-only video | `min-h-[100svh]`, capped scroller, shorter captions, tap fallback |
| Dependencies | `bootstrap`, `bootstrap-icons`, `react-icons`, `lucide-react`, `tailwind` (extra package), `@google/generative-ai` partly unused | Remove unused; keep one icon strategy; drop the stray `tailwind` package |
| Naming | `Container1-4` are generic | Rename `Hero`, `Overview`, `Work`, `Recognition` |
| Typo/copy | "fot PC parts", "Live: techhub.vercel.app" stray line in the prompt | Proofread content |

## Accessibility checklist

- Landmarks: `header`/`main`/`section aria-labelledby`/`footer`; one `h1`, `h2` per card.
- Every image has meaningful `alt` (decorative -> `alt=""`); video is `muted`, no audio dependence.
- All interactive items are `<a>` or `<button>`, keyboard reachable, with visible `focus-visible:ring-2 ring-orange-500`.
- Theme switch: `role="switch"`, `aria-checked`, label.
- Modal/lightbox: `role="dialog"`, `aria-modal`, Esc closes, focus trapped and restored.
- Chat: labelled open/close/send, `aria-live` for new messages, usable with keyboard only.
- Contrast AA in both themes; do not rely on color alone (the "Current" badge has text).
- `prefers-reduced-motion`: disable bounce, scale, ripple.

## Performance checklist

- Images -> WebP/AVIF, sized to display, `loading="lazy"` (not the hero portrait), `decoding="async"`, explicit dimensions or aspect ratio.
- Videos: short, compressed, `preload="none"`, `poster`.
- Code-split heavy parts: `React.lazy` for `GithubContributions` and `ChatBot` (chat can load on first click).
- Remove unused packages; tree-shake icons (import individual icons).
- Fonts: system mono stack costs nothing; if loading a web font use `display=swap` and preload.
- Avoid layout shift: reserve space for images, calendar, and the chat button.
- Lighthouse targets: Performance, Accessibility, Best Practices, SEO all 90+ on mobile.

## SEO and sharing

In `index.html`: `<title>Name | Role</title>`, `<meta name="description">`, canonical URL, `og:title/description/image/url`, `twitter:card=summary_large_image`, favicon + apple-touch-icon, `theme-color`, `lang="en"`. Add JSON-LD `Person` schema (name, jobTitle, url, sameAs: [GitHub, LinkedIn]). Add `robots.txt` and (optionally) `sitemap.xml`. A custom domain and a real 1200x630 OG image make links look professional.

## Security and privacy

- No secrets in client code; `.env*` in `.gitignore`; rotate leaked keys.
- Serverless chat endpoint validates input, caps size, rate limits.
- Render model text as plain text only.
- External links: `rel="noreferrer"` (or `noopener noreferrer`).
- Publish only contact details you are comfortable having scraped; prefer a contact form or Messenger link to a bare phone number.
- Remove EXIF/location data from photos.
- Add a security headers config (`vercel.json`) with a sensible CSP if you embed nothing third-party beyond GitHub API and Groq proxy.

## Deployment (Vercel)

1. Push to GitHub (`main`).
2. Import to Vercel -> framework preset Vite (`npm run build`, output `dist`).
3. Add environment variables: `GROQ_API_KEY` (and optional `GROQ_MODEL`).
4. Put `Resume.pdf` in `public/`.
5. Add a custom domain; update README live link, OG URLs, and canonical tag.
6. Test the deployed `/api/chat` and the theme persistence on a real phone.
7. Preview deployments per PR let you review changes before they go live.

## Final checklist

- [ ] Only one font (mono) and one accent (orange) in use
- [ ] Every card: `p-6 border`, orange-tinted border, flat, no rounding
- [ ] Every section introduced by a divider caption; captions short
- [ ] Both themes complete and persistent, no flash on load
- [ ] Ripple transition has fallback and reduced-motion support
- [ ] Layout verified at 320, 375, 414, 768, 1024, 1280, 1536px; no horizontal page scroll
- [ ] Hero fits on phones (`svh`), hover video has tap fallback
- [ ] Project cards stack under `lg`; nested scrollers feel OK on touch
- [ ] GitHub graph orange, square cells, scrolls inside its panel on phones
- [ ] Certificates open in an accessible lightbox
- [ ] All content comes from `src/data`; chatbot prompt generated from it
- [ ] Chatbot uses serverless proxy, history, rate limit; discloses it is an AI
- [ ] No API keys, phone numbers, or private addresses in the repo or prompt
- [ ] `npm run lint` and `npm run build` pass; unused deps removed
- [ ] Lighthouse 90+; alt text, labels, focus styles in place
- [ ] Title, description, OG image, favicon, JSON-LD set
- [ ] README: features, screenshots, live demo, run steps, env vars, license (MIT)
