# Project Data and Image Conventions

Contents: data fields · image naming · where files live · adding a project · adding a mobile image later · content rules

## Single data list
Featured projects are described by **one data list** at the top of the new component (or a small data file the repo already has a convention for). The markup renders from this list. Adding a project means adding one entry, never copying markup.

### Fields per project
| Field | Required | Notes |
|---|---|---|
| name | yes | Display name (EduTool, Voting System, Apptel) |
| slug | yes | lowercase, no spaces; used for image names |
| description | yes | 3 to 5 sentences; `TODO` marker if the user has not provided it |
| tech | yes | list of short names; `TODO` marker if unknown |
| desktop | yes | desktop screenshot file name |
| mobile | no | mobile screenshot file name; empty means show placeholder |
| link | no | live URL; empty means hide the button |
| code | no | repository URL; empty means hide the button |

## Image naming
`<slug>-desktop.png` and `<slug>-mobile.png`, all lowercase. A ready-made laptop+phone picture is named `<slug>-mockup.png` (composite mode, see featured-projects-spec).

All slugs and expected files:
| Slug | Project | Files |
|---|---|---|
| techhub | TechHub | `techhub-mockup.png` (or desktop/mobile) |
| navsumaro | NavSumaro | `navsumaro-mockup.png` |
| interviewspark | InterviewSpark | `interviewspark-mockup.png` |
| startsmart | StartSmart | `startsmart-mockup.png` |
| portfolio | My Portfolio | `portfolio-mockup.png` |
| edutool | EduTool | `edutool-desktop.png`, `edutool-mobile.png` |
| voting | Voting System | `voting-desktop.png` (mobile pending) |
| apptel | Apptel | `apptel-desktop.png` (mobile pending) |
A project with none of its image files present is hidden and reported.

Current set the user has provided or will provide:
| Project | Desktop | Mobile |
|---|---|---|
| EduTool | `edutool-desktop.png` | `edutool-mobile.png` |
| Voting System | `voting-desktop.png` | not yet (placeholder) |
| Apptel | `apptel-desktop.png` | not yet (placeholder) |

Note: the Voting System slug is `voting`, matching the file name the user chose, even though the old video is `votingsystem.mp4`.

## Where files live
`public/assets/images/` (served at `/assets/images/<file>`). If the user stores them elsewhere, find them with a search and use that path consistently; mention the location in your report. Do not move the user's files.

If the images are not in the folder yet, still build the component and let the missing-image placeholders show; list the missing files in the report.

## Image guidance (suggest, do not auto-process)
- Desktop screenshots: about 1600x1000 (16:10), top of the app visible, no browser chrome or personal data in view.
- Mobile screenshots: about 750x1600 portrait.
- Prefer WebP/optimized PNG under about 300 KB each. Mention oversized files in the report; do not recompress without being asked.

## Adding another featured project later
1. Ask for or confirm: name, description, tech, links, and the two image names.
2. Add one entry to the list.
3. If the same project exists in the video grid, remove that video card.
4. Run the build and report.

## Adding a mobile image later
When the user says a new mobile image is ready (for example `apptel-mobile.png`): confirm the file exists in the images folder, set that project's `mobile` field to the file name, and check that the placeholder is gone. Nothing else changes.

## Content rules
- Never invent facts about a project. Use only what the user wrote, what is visible in the existing site (for example EduTool: a teacher helper tool for scheduling, attendance, lessons, and grading), or what the repo's README says.
- Description style: what it is, who it is for, the standout features. Plain, first-person-neutral, no hype words.
- Keep tech names consistent with the TechStack section spelling (for example "Node.js", "PostgreSQL").
- Keep a running list of every `TODO` you left so the final report can show it.
