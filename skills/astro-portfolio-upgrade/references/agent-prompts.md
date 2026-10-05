# Prompts for the User

Paste into your AI agent (Claude Code, Cursor, Copilot agent, etc.). The agent needs both skills available: `astro-portfolio-upgrade` and `react-portfolio-builder`, and the repo's `AGENTS.md`.

Before running: work in a git repo, put your images in `public/assets/images/` (see `project-data-and-images.md`), and have a Groq API key ready for later (the agent never needs to see it; you add it to your hosting env vars).

---

## 1. MASTER LOOP PROMPT (run everything, stop once for review)

```
You are upgrading my EXISTING Astro portfolio so the whole site follows the reference
design from the `react-portfolio-builder` skill. Use the `astro-portfolio-upgrade` skill
as your operating manual.

OPERATING MODE: AUTONOMOUS LOOP.
1. Read, in this order: AGENTS.md, astro-portfolio-upgrade/SKILL.md,
   references/loop-protocol.md, references/phases.md.
2. Create docs/PORTFOLIO_PROGRESS.md and docs/BUILD_LOG.md (templates in
   references/progress-template.md) and work on the git branch `portfolio-upgrade`.
3. Run Phase 0 through Phase 13 IN ORDER, back to back. For every phase follow the cycle:
   READ -> PLAN -> IMPLEMENT -> VERIFY (npm run build + the phase gate) -> FIX (max 3 tries)
   -> RECORD in the progress file -> COMMIT locally -> NEXT.
4. DO NOT ask me questions and DO NOT stop between phases. Use the "Default decisions" in
   phases.md. If content or images are missing, use TODO markers/placeholders, log them,
   and keep going. If a phase is blocked after 3 attempts, mark it BLOCKED with the exact
   error, skip dependents, and continue.
5. Rules that never bend: stay on Astro (React only for islands); keep plain CSS (no
   Tailwind); never delete or overwrite my images/videos; no API keys in client code;
   never push or deploy; no phone numbers/addresses/private emails in new files or reports;
   only the allowed dependencies listed in phases.md.
6. After Phase 13, write docs/REVIEW_REPORT.md and then STOP and send me the final message
   described in loop-protocol.md. That is the ONLY time you stop for me.

If you are interrupted or your context resets, read docs/PORTFOLIO_PROGRESS.md and resume at
the first phase that is not DONE, BLOCKED, or SKIPPED.

Start now with Phase 0.
```

## 2. RESUME PROMPT (if the agent stopped early or hit a limit)
```
Continue the portfolio upgrade loop. Read AGENTS.md, then astro-portfolio-upgrade/references/
loop-protocol.md, then docs/PORTFOLIO_PROGRESS.md and the tail of docs/BUILD_LOG.md.
Resume at the first phase that is not DONE, BLOCKED, or SKIPPED, follow the same cycle, do not
ask me questions, and stop only after docs/REVIEW_REPORT.md is written.
```

## 3. Run one specific phase
```
Using astro-portfolio-upgrade, run ONLY Phase [N] from references/phases.md following the
loop-protocol cycle (read, plan, implement, verify, record, commit). Update the progress file.
Then stop and summarize what changed.
```

## 4. After review: request fixes
```
Review feedback on the portfolio upgrade. Make ONLY these changes, in this order, then run
npm run build and update docs/BUILD_LOG.md and docs/PORTFOLIO_PROGRESS.md:
1. [describe issue / section / screen size]
2. [...]
Do not touch anything else. Commit as `fix: <short title>` on the same branch.
```

## 5. Restore the navbar (if you prefer it)
```
Restore the original Navbar in the page flow above the hero, restyled to the new design
tokens (mono type, orange accent, flat border, theme-aware). Keep the hero's theme switch or
move it into the navbar, your pick, then verify mobile (hamburger or horizontal scroll) and
keep section anchors working.
```

## 6. Add or change a project
```
Add/modify a featured project: name [..], slug [..], description [..], tech [..], live [..],
code [..]. Images [slug]-desktop.png / [slug]-mobile.png (or [slug]-mockup.png) are in
public/assets/images. If it exists in the video grid, remove it there. Update the chatbot
knowledge through the data files. Build and report.
```

## 7. I added a mobile screenshot
```
I added [apptel-mobile.png] to public/assets/images. Make Apptel use it instead of the
placeholder. Change nothing else.
```

## 8. Optimize media
```
Follow references/video-cards.md: lazy-load videos with posters, play on hover/in view, pause
off-screen. Write compressed copies of oversized images/videos into a NEW folder
(public/assets/optimized/), never overwrite originals, and report sizes before/after.
```

## 9. Audit only (no changes)
```
Audit the site against references/quality-checklist.md and the reference design. Change
nothing. Give me a prioritized list of issues with file names and suggested fixes.
```

## Tips
- Agents have session limits. If one stops mid-way, use the RESUME prompt. The progress file makes this safe.
- Review on the `portfolio-upgrade` branch. Merge only when you are happy.
- The agent leaves `TODO` for anything it cannot know. Fill those in and run prompt 4 or 6.
