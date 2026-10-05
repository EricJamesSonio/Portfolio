# Content and Data Organization

Contents: single source of truth · data shapes · copywriting guide · assets and media · links · keeping the chatbot in sync

## Single source of truth

The original keeps arrays inline inside each component and a separate hand-written chatbot prompt, so edits must be made in two places. Move content to `src/data/` and import it into both the UI and the chatbot prompt builder.

```
src/data/
├── profile.js      name, role, location, age, about[], tone, publicEmail, resume path
├── experience.js   timeline items
├── education.js    timeline items
├── stack.js        grouped technologies
├── projects.js     featured projects
├── certs.js        certificates and awards
└── links.js        socials + contact
```

## Data shapes

```js
// profile.js
export default {
  name: "Your Name",
  role: "Aspiring Full Stack Developer",
  location: "City, Province, Country",
  age: 22,
  codingSince: 2022,
  about: [ "Paragraph 1...", "Paragraph 2...", "Paragraph 3..." ],
  resume: "/Resume.pdf",
  publicEmail: "you@example.com",
};

// experience.js / education.js
export const experience = [
  { title: "BS Information Systems - 4th Year", sub: "School", year: "2026", active: true },
  { title: "OJT / Internship", sub: "Actively seeking", year: "Ongoing" },
  { title: "Capstone Project", sub: "One-line description", year: "Ongoing" },
];

// stack.js
export const stack = [
  { label: "Frontend", techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind", "Bootstrap", "Next.js"] },
  { label: "Backend",  techs: ["Node.js", "ExpressJS", "PostgreSQL", "MySQL"] },
  { label: "Mobile",   techs: ["React Native", "Expo", "NativeWind"] },
  { label: "Tools",    techs: ["GitHub", "VSCode", "Figma", "Canva"] },
  { label: "Security", techs: ["JWT", "bcrypt", "OAuth", "Auth0"] },
  { label: "AI",       techs: ["Groq", "Gemini"] },
  { label: "Cloud",    techs: ["GCP"] },
];

// projects.js
export const projects = [{
  name: "Project",
  pitch: "One-line summary used by the chatbot.",
  description: "3-5 sentence card copy.",
  tech: ["TypeScript", "Next.js", "Postgres"],
  link: "project.vercel.app",         // stored without https://
  code: "github.com/user/project",
  image: ProjectImg,
  status: "Completed",
  role: "Solo developer",
}];

// certs.js
export const certs = [{ name: "JavaScript Developer Certification 2026", issuer: "freeCodeCamp", img: JSCert }];

// links.js
export const socials  = [{ name: "LinkedIn", icon: "bi-linkedin", url: "https://..." }];
export const contacts = [{ label: "Email", sub: "you@example.com", icon: "bi-envelope", url: "mailto:you@example.com" }];
```
Rule: adding a project, skill, or certificate must be a **one-object change**.

## Copywriting guide

- **Hero:** name, a 3-word role (`ASPIRING FULL STACK DEVELOPER`), location. No taglines longer than a line.
- **About (3 paragraphs):** (1) what you build and why, (2) how you learn and your tools incl. AI as an accelerator, (3) what you want now and where you are. First person, specific, humble, and honest about being early in your career.
- **Projects:** lead with what it is, then the audience, then technical depth, then outcome. Mention real-time features, auth model, roles, analytics, payments, and deployment. Name your role on team projects.
- **Timeline subtitles:** institution or one-liner; `Ongoing`/`Current` for active items.
- **Dividers:** punchy, 1-3 beats.
- **Tone:** plain, lightly casual, no buzzwords ("passionate" at most once).

## Media assets

| Asset | Spec |
|---|---|
| Portrait (light/dark) | 3:4 crop, ~900x1200, WebP/JPG under 200 KB; clean background that suits the theme |
| Hover video | 3-6 s loop, muted, 480-720px, under 1.5 MB, MP4 (H.264) + optional WebM, `poster` frame |
| Project mockups | Laptop+phone composite, ~1200x800, PNG/WebP with transparent or neutral background, under 300 KB |
| Certificates | JPG/PNG under 300 KB each, for the lightbox |
| Resume | `public/Resume.pdf`, current, under 500 KB |
| Favicon / OG image | 512px icon; 1200x630 social card |

Import images through Vite (`import img from "../assets/img/x.png"`) so they are hashed and cached. Always include `alt` text.

## Links

Store URLs without protocol if you must (original does), but prefer full `https://` URLs. External links: `target="_blank" rel="noreferrer"`. Email: `mailto:` (or Gmail compose URL). Phone: `tel:+<country><number>`. Use public contact details only, and think twice before publishing a phone number on a public site.

## Keep the chatbot in sync

Build the chatbot system prompt from `profile.js`, `education.js`, `stack.js`, `projects.js` (see ai-chatbot.md). Then updating a project updates the card and the assistant's knowledge together.
