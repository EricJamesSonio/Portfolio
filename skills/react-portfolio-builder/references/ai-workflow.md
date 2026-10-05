# AI-Assisted Workflow (building this with Claude or another assistant)

Contents: principles · kickoff prompt · section prompts · refactor prompts · review prompts · debugging prompts · things to always provide

## Principles

1. **Give context once, reference it after.** Paste the design rules (mono font, single orange accent, flat bordered cards, divider captions) at the start or point the assistant at this skill.
2. **One section per prompt.** Small, verifiable steps beat one giant request.
3. **Always supply real content** (bio, project descriptions, links). Placeholder copy produces generic results.
4. **Ask for both themes and all breakpoints every time.**
5. **Review for security and accessibility explicitly**; assistants rarely volunteer it.
6. **Use AI to speed up, not to replace understanding**: read the diff, run the build, test on a phone.

## Kickoff prompt

> Build a single-page developer portfolio with React 19, Vite, and Tailwind CSS v4 (CSS-first, no config file). Style: monospace font only, a single orange accent, flat square-cornered cards with thin `border-orange-800/30`, UPPERCASE bold card titles, and centered orange divider captions with fading hairlines between sections. Include light and dark themes via a React Context. Sections in order: hero (portrait, name, role, location, Get Resume / Email Me, theme switch), bento grid (Experience + Education timelines on the left 35%, About + Tech Stack on the right 65%), Featured Projects (scrollable cards), GitHub contributions (orange palette, square cells), Certifications (lightbox), Find me on / Get in touch link tiles, floating AI chatbot. Mobile first with breakpoints at md/lg/xl. Put all content in `src/data/*.js`. Do not put API keys in client code.

## Section prompts (examples)

- "Create `Divider.jsx` matching this spec: [paste divider code]. No dynamic Tailwind class names."
- "Build the Experience timeline from `data/experience.js`: filled orange dot and a `Current` badge for `active`, hollow ring otherwise, vertical rail, scroll area max 280px."
- "Add a hero portrait that swaps to a muted looping video on hover, with a tap fallback for touch devices."
- "Implement the circular ripple theme transition with the View Transitions API, with a fallback and `prefers-reduced-motion` support."
- "Create a floating chatbot: bouncing button, teaser banner after 2s that disappears once opened, panel with header/messages/input, Enter to send, typing indicator, error fallback."
- "Write `api/chat.js` for Vercel using groq-sdk, with input validation, last-10-message history, and max_tokens 500."

## Refactor prompts

- "Replace repeated `darkMode ? ... : ...` ternaries with a `t(darkMode)` token helper without changing the output."
- "Convert the theme to Tailwind's `dark:` variant with `@custom-variant dark` and a `.dark` class on `<html>`."
- "Extract `Card`, `Chip`, `LinkTile`, and `Divider` into `components/ui` and update all usages."
- "Move inline arrays to `src/data/*.js` and generate the chatbot system prompt from them."

## Review prompts

- "Audit this component for accessibility: landmarks, labels, focus states, keyboard access, contrast in both themes."
- "Find any horizontal overflow risks at 320-414px and fix them."
- "Scan the repo for exposed secrets, `VITE_` keys, and personal data (phone, address) and list them."
- "Check Lighthouse-style issues: image sizes, lazy loading, layout shift, unused dependencies."

## Debugging prompts

Include: the exact error text, the component code, the browser and device, and what you expected. Examples of known gotchas to mention: Tailwind v4 (no config), dynamic class names not generating, `/api` returning 404 under plain `vite`, View Transitions unsupported in Firefox.

## Always provide

Real bio and project copy, brand colors if you deviate, image/video files and their dimensions, the data shapes in `content-and-data.md`, and the checklist in `quality-and-pitfalls.md` as acceptance criteria.
