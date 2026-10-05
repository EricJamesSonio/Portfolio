# Loop Protocol (autonomous, non-stop, one review stop)

Contents: goal · state file · the cycle · decision policy · gates · errors and blocked phases · git policy · context resets · stop conditions · final stop

## Goal
Run **all phases in `phases.md` in order, back to back**, without asking the user anything, and stop **only** after the final phase when the review report is written (or when truly blocked).

## State lives in files, not memory
- `docs/PORTFOLIO_PROGRESS.md`: phase checklist with status (`TODO`, `IN PROGRESS`, `DONE`, `BLOCKED`, `SKIPPED`), timestamps, and one-line notes.
- `docs/BUILD_LOG.md`: append-only log of decisions, assumptions, files touched, and gate results.
- `docs/REVIEW_REPORT.md`: written at the very end.
Create these in Phase 0 from `progress-template.md`. **Update the progress file after every phase** before starting the next. If your context is reset or you are restarted, read the progress file and resume at the first phase that is not `DONE`, `BLOCKED`, or `SKIPPED`.

## The cycle (repeat for each phase)
1. **READ**: open the phase section in `phases.md` and any reference files it names. Re-read the files you are about to edit (they may have changed).
2. **PLAN**: write 3 to 6 bullets in `BUILD_LOG.md`: what you will create/edit and key decisions.
3. **IMPLEMENT**: make the changes. Smallest set of edits that satisfies the phase's "Done when" list.
4. **VERIFY (gate)**: run the phase's gate: always `npm run build` (and `npx astro check` if it exists); then the phase's specific checks. If a browser/screenshot tool is available, check 375, 768, and 1280 px; otherwise review CSS/markup against the responsive rules.
5. **FIX**: if a gate fails, fix and re-run. **Maximum 3 attempts** per failure.
6. **RECORD**: mark the phase `DONE` in the progress file, add notes, log files touched and any TODO content.
7. **COMMIT**: one local commit per phase (see git policy).
8. **NEXT**: immediately start the next phase. Do not pause, summarize to the user, or ask for confirmation between phases.

## Decision policy (no questions during the loop)
- Use the **Default decisions** table in `phases.md`. If a decision is not listed, choose the option that is (a) closest to the reference design, (b) smallest change, (c) reversible. Log it in `BUILD_LOG.md` under "Decisions".
- Missing content (descriptions, links, images): use `TODO` markers or placeholders, log them, **keep going**.
- Existing site vs reference conflict: reference wins for design; the existing site wins for personal content and URLs.
- Never block waiting for the user. The only user interaction is the final review.

## Gates
A phase is `DONE` only when:
- `npm run build` passes with no new errors, and
- the phase's "Done when" items are satisfied, and
- no horizontal scroll was introduced at 375px (by inspection or screenshot), and
- both light and dark themes are handled for everything built so far (from Phase 1 onward).

## Errors and blocked phases
- Build error you caused: fix it (max 3 attempts). If still failing, revert that phase's partial changes (git checkout of those files, or undo your edits), mark the phase `BLOCKED` with the exact error, log it, and **continue to the next phase that does not depend on it**.
- Dependency map is in `phases.md`. A phase depending on a `BLOCKED` phase becomes `SKIPPED` with the reason.
- Missing tool or permission (cannot install a package, no git, no network): log it, use the fallback in the phase, and continue.
- Never "fix" a problem by weakening a rule (for example putting an API key in client code).

## Git policy
- If the folder is a git repo: create and switch to branch `portfolio-upgrade` in Phase 0 (if not already on a non-main work branch). Commit after each phase: `phase N: <short title>`. Never push, never force, never rewrite history, never touch other branches.
- If not a git repo: do not initialize one; instead keep a copy of any file before a risky rewrite as `<name>.bak-phaseN` outside `src/` (for example in `docs/backup/`), and mention it in the log.

## Context resets and long runs
Keep each phase self-contained. At the start of every phase, re-read the progress file and `BUILD_LOG.md` tail so you pick up decisions made earlier. Do not rely on remembering earlier tool output.

## Stop conditions
Stop and hand control to the user only when:
1. **All phases are finished** (statuses `DONE`, `BLOCKED`, or `SKIPPED`) and `docs/REVIEW_REPORT.md` is written. This is the normal stop.
2. **The repo is not the expected project** (no Astro config, no `src/components`): stop at Phase 0 and explain.
3. **A safety rule would be broken** to continue (for example only possible fix requires deleting user media or exposing a key).

Anything else: keep going.

## Final stop message (and nothing before it)
After writing the review report, reply once with:
- Phases: counts of DONE / BLOCKED / SKIPPED
- Where to look: `docs/REVIEW_REPORT.md`, how to run (`npm run dev`)
- The top items the user must supply (TODO content, missing images, env vars)
- A short "what to check first" list (5 to 8 bullets)
- Invitation to review; list the prompts they can use to request fixes (from `agent-prompts.md`)
Then wait.
