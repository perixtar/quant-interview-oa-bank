# Quant Interview & OA Bank

A standalone, source-safe catalogue of practice problems for quant trader, quant researcher, and quant developer recruiting. The repository name is `quant-interview-oa-bank`.

The name is intentionally timeless. Recruiting-cycle metadata carries freshness without forcing a repository rename or product migration each year. The first catalogue slice is labeled `2026`, and every item has a last-reviewed date.

This repository was created as a sibling to an existing software-engineering OA tracker in the same workspace, but it has a separate, neutral public identity. It is deliberately not a mirror of reported assessment questions. Its entries are original problem archetypes or high-level syntheses of public, textbook-level role competencies.

## What is included

- A responsive React catalogue with free-text search.
- Filters for target role, topic/skill, interview stage, difficulty, firm context, and format.
- A recruiting-cycle filter and per-item `lastReviewed` date for future archive slices.
- Keyboard quick search with <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd>.
- 24 initial practice archetypes across trading, research, and systems work.
- Editorial labels that distinguish original archetypes from public-skill syntheses.
- Tests for filter composition, metadata completeness, unique IDs, topic coverage, and source-policy wording.

Firm labels use the form `Jane Street-style`, `HRT-style`, and so on. They describe a broad competency mix for navigation; they do **not** claim that the named firm has used, reviewed, or endorsed a problem.

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`.

Useful checks:

```bash
npm run lint
npm run test
npm run build
npm run check
npm run preview
```

## Project layout

```text
src/
  components/        listing and keyboard-search UI
  data/problems.ts   typed editorial catalogue
  lib/               pure filter logic and tests
  App.tsx             page composition and filter state
tokens.css            portable colour, type, spacing, and motion tokens
```

## Data model

Each `Problem` in `src/data/problems.ts` has:

| Field | Meaning |
| --- | --- |
| `id` | Stable, URL-safe identifier |
| `title`, `summary` | Original, source-safe catalogue copy |
| `roles` | One or more of trader, researcher, developer |
| `topics` | Skills such as probability, market making, time series, or C++ systems |
| `stage` | Online assessment, technical screen, or onsite |
| `difficulty` | Foundation, intermediate, or advanced |
| `firm` | High-level style/context label, never an attribution |
| `format` | Mental math, probability, coding, data analysis, market game, research case, or systems design |
| `timeMinutes` | Suggested practice-box duration |
| `recruitingCycle` | Filterable archive/freshness slice, currently `2026` |
| `lastReviewed` | ISO date of the most recent editorial review |
| `origin` | `Original archetype` or `Public-skill synthesis` |
| `practicePrompt` | A short original exercise brief |
| `signal` | What the exercise is intended to evaluate |
| `sourceNote` | Per-entry provenance and non-attribution wording |

The filter engine is a pure function in `src/lib/filterProblems.ts`, so it can be tested without rendering the UI.

## Editorial and source policy

Acceptable entries:

- Original problems written for practice.
- High-level archetypes built from standard probability, statistics, algorithms, finance, or systems material.
- Syntheses of competencies that firms publicly describe for a role.
- Firm-style labels used only to help candidates navigate likely skill mixes.

Do not add:

- Leaked or copied assessment statements.
- Confidential screenshots, account-only pages, or private recruiter messages.
- Candidate-identifying details.
- Recollections presented as verified firm facts.
- A firm name without `-style` (unless the value is `General / multi-firm`).
- Claims that a problem was "asked by," "used by," or "from" a firm without an authorized public primary source and maintainer review.

When a public source informs an entry, keep only the general competency signal and write a new prompt from first principles. Prefer uncertainty in the label over false precision in the attribution.

## Relationship to the adjacent software-engineering tracker

The visual and editorial cues intentionally echo the adjacent workspace collection:

- Compact, search-first navigation.
- Dense question-bank organization.
- Terminal/editorial typography.
- Explicit “how to use this” metadata.
- A strong contribution boundary around confidential or proprietary material.

The repositories are otherwise independent. This project does not modify, import at runtime, or depend on the adjacent tracker.

## Status

This is a useful first edition, not a claim of comprehensive market coverage. Expand the catalogue by improving role/topic balance and editorial quality before increasing raw item count.
