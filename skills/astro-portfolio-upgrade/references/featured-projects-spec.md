# Featured Projects: Specification

Contents: purpose · placement · structure · mockup rules · placeholder · text column · responsive · states · accessibility · acceptance criteria

## Purpose
Showcase the strongest projects with real screenshots instead of video thumbnails. Initial featured projects: **EduTool**, **Voting System**, **Apptel**. They appear in a block **above** the existing video-card grid, which keeps showing all other projects.

## Placement
- Inside the existing projects section, before the video grid.
- Own sub-heading (for example "Featured Projects") styled like the site's other section/card headings. The existing grid may stay under its current heading or get a quiet sub-heading such as "More Projects" if the page otherwise reads ambiguously. Ask only if unsure.
- Rows are stacked vertically, one featured project per row, with consistent spacing between rows.

## Row structure (per project)
Two columns on desktop:
1. **Media column** (about 45%): the device mockup.
2. **Text column** (about 55%): name, description, tech tags, links.

The row sits in a card using the site's existing card style (same background, border, padding feel as the video cards or other cards). A slightly darker panel behind the mockup helps the devices stand out; derive its color from the existing palette.

### Text column, top to bottom
1. **Project name**: accent color used for the site's card titles. Sentence or title case as the site does.
2. **Description**: 3 to 5 short sentences, comfortable line length (about 60 to 70 characters), readable line height, muted text color.
3. **Tech tags**: small bordered chips in the site's chip/tag style (if none exists, derive from the accent color at low opacity with a thin border). Wrap onto multiple lines.
4. **Links**: "View Project" and "View Code" in the accent color, separated by a thin divider character, each with a small up-right arrow. **Render a link only if its URL exists**; if neither exists, render no links row at all. External links open in a new tab with `rel="noreferrer"`.

## Mockup rules (media column)
Build the mockup with CSS from the plain screenshots; do not require pre-composited images.

- **Laptop:** screen area with 16:10 aspect ratio, dark bezel (about 6px), slightly rounded top corners, thin metallic base bar below. Laptop width about 88% of the media area, left-aligned. Screenshot fills the screen with `object-fit: cover` and `object-position: top` so the top of the app is visible.
- **Phone:** tall rounded rectangle (about 9:19), dark bezel (about 4px), small notch, soft shadow. Width about 27% of the media area. **Overlaps the laptop's bottom-right corner**: anchored to the right and bottom of the media area and extending slightly beyond the laptop's right edge and base. Screenshot fills it with `object-fit: cover`, `object-position: top`.
- Add a little bottom padding to the media area so the phone overlap is not clipped.
- Images: `loading="lazy"`, `decoding="async"`, meaningful alt text ("<Project> desktop screenshot", "<Project> mobile screenshot").
- Optional hover: very subtle zoom on the laptop image only (about 1.03) with a short transition, disabled under `prefers-reduced-motion`.

## Placeholder phone (when no mobile image exists)
If a project has no mobile image, still render the phone frame in the same position and size, with striped dark-navy background (two close navy shades at 135 degrees) and centered tiny muted text: "Mobile preview / coming soon". The placeholder gets `role="img"` and an `aria-label` that says the mobile preview is coming soon. When the user later adds the mobile image and sets its field, the placeholder disappears with no other change.

If the **desktop** image (or the composite mockup image) is missing, **do not render that project row**; skip it silently on the page, and list it under "Missing images" in the progress file and report. Never show a broken image.

## Mockup modes (per project, decided by which files exist)
1. **Built mockup (default):** `<slug>-desktop.png` exists -> laptop frame + phone frame as described above (phone shows `<slug>-mobile.png` or the placeholder).
2. **Composite mockup:** `<slug>-mockup.png` exists (already a laptop+phone picture) -> show it as a single image, `object-fit: contain`, centered in the media panel (no extra frames). Used for the reference projects (TechHub, NavSumaro, InterviewSpark, StartSmart, My Portfolio).
3. If both exist, prefer the composite.
Determine file existence at build time (for example by checking the images folder from the Astro frontmatter), so the page never requests missing files.

## Scroll behavior
The featured list lives inside a titled card (`FEATURED PROJECTS`). Desktop: the list may scroll inside the card with a capped height (about 800px). Phones: cap with a viewport-based height (about 70svh) or let the list flow naturally to avoid nested-scroll traps; prefer natural flow if rows are few.

## Responsive
| Width | Behavior |
|---|---|
| above 900px | Two columns, media left, text right |
| 900px and below | One column: media first, then text; reduce card padding; media max width about 420px, centered |
| 480px and below | Section side padding about 12px; phone width about 30% with a slightly thinner bezel; placeholder text smaller |

Rules: no horizontal page scroll at 320 to 1536px; text never overlaps the mockup; tags and links wrap; tap targets for links at least 44px tall on touch (add vertical padding).

## States and motion
- Links: underline on hover and keyboard focus (visible focus outline in the accent color).
- No autoplay motion, no entrance animations, no scroll jacking. If any animation is added, wrap it in `prefers-reduced-motion: no-preference`.

## Accessibility
- Section uses a heading with an id; the section references it with `aria-labelledby`.
- Each project is an `article` with an `h3` for the name.
- Tags are a list. Decorative arrows are `aria-hidden`. Placeholder has an accessible label.
- Contrast of description and tags on the card background is at least 4.5:1; adjust the muted color if the existing one is too dim.

## Acceptance criteria
- [ ] Three featured rows render in order: EduTool, Voting System, Apptel
- [ ] Block appears above the video grid and inside the projects section; `#projects` anchor still works
- [ ] EduTool shows both desktop and mobile images; Voting System and Apptel show desktop image and placeholder phone
- [ ] No link buttons render for empty URLs; no broken links
- [ ] Looks native to the existing theme (colors, fonts, borders)
- [ ] Stacks cleanly at 900px and below; no sideways scroll at 375px
- [ ] Old video cards for EduTool, Voting System, Apptel removed from the grid and from any script lists
- [ ] Build passes with no new warnings
