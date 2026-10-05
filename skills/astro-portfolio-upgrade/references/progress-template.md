# Templates

## docs/PORTFOLIO_PROGRESS.md
```
# Portfolio Upgrade Progress
Branch: portfolio-upgrade   Started: <date>   Last update: <date>

| # | Phase | Status | Notes |
|---|-------|--------|-------|
| 0 | Recon, plan, setup | TODO | |
| 1 | Foundation (tokens, theme, base) | TODO | |
| 2 | UI primitives | TODO | |
| 3 | Hero | TODO | |
| 4 | Bento (Experience, Education, About, Tech Stack) | TODO | |
| 5 | Projects (Featured + video grid) | TODO | |
| 6 | GitHub contributions | TODO | |
| 7 | Certifications and Contact | TODO | |
| 8 | Theme polish (ripple + audit) | TODO | |
| 9 | AI chatbot | TODO | |
| 10 | Content and data consolidation | TODO | |
| 11 | Responsive pass | TODO | |
| 12 | Accessibility, performance, SEO | TODO | |
| 13 | Cleanup and release readiness | TODO | |

Statuses: TODO, IN PROGRESS, DONE, BLOCKED, SKIPPED
Open TODO content: (list)
Missing images: (list)
Blocked/skipped reasons: (list)
```

## docs/BUILD_LOG.md (append-only)
```
# Build Log
## Baseline (Phase 0)
- Build result before changes: ...
- Section map: existing -> target
- Content inventory: ...
- Image inventory: present / missing
- Host detection: ...
## Decisions
- [Phase N] <decision> because <reason>
## Phase N: <title>
- Plan: ...
- Files created: ...
- Files edited: ...
- Gate results: build ok/fail, checks ...
- Issues: ...
```

## docs/REVIEW_REPORT.md
```
# Review Report
## Summary
Phases: X done, Y blocked, Z skipped. Branch: portfolio-upgrade. Commits: N.
## What changed (by section)
Hero, Bento, Projects, GitHub, Certifications, Contact, Theme, Chatbot, Data, SEO/A11y/Perf
## Decisions that may need your approval
(Navbar removed, accent color switch, featured order, hosting choice, default theme, ...)
## Content you need to provide (TODO)
## Images missing / unused media
## Environment and setup
Variables: GROQ_API_KEY, GROQ_MODEL (optional). Hosting notes. Commands.
## Blocked or skipped work (with exact errors)
## Known limitations
## What to check first (manual review)
1. Open in light and dark ... (5 to 8 items)
## How to request changes
(list of prompts from agent-prompts.md)
```
