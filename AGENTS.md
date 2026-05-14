# Repository Guidelines

## Project Structure & Module Organization

This repository is a content-only Agent Skill package for standalone HTML artifacts. The distributable skill lives in `skills/html-artifact-guide/`.

- `skills/html-artifact-guide/SKILL.md` defines triggers, workflows, output requirements, and anti-patterns.
- `skills/html-artifact-guide/references/` contains deeper guidance, including artifact patterns and the review checklist.
- `skills/html-artifact-guide/assets/standalone-template.html` is the baseline single-file HTML template.
- `skills/html-artifact-guide/evals/trigger-scenarios.md` documents manual trigger scenarios.
- `scripts/validate-artifact.js` and `tests/validate-artifact.test.js` cover the validator.
- `docs/design-rationale.md`, localized READMEs, and `CONTRIBUTING.md` support distribution and contribution context.

## Build, Test, and Development Commands

There is no app build chain, install step, or runtime service. Use these checks before submitting changes:

```bash
node --test tests/validate-artifact.test.js
node scripts/validate-artifact.js skills/html-artifact-guide/assets/standalone-template.html tests/fixtures/valid-artifact.html
! rg "Replace with|<title></title>" skills/html-artifact-guide/assets tests/fixtures/valid-artifact.html
test "$(rg -c "expected_action" skills/html-artifact-guide/evals/trigger-scenarios.md)" -ge 20
git diff --check
```

For local installation testing, copy the skill contents with `cp -r skills/html-artifact-guide/* ~/.codex/skills/html-artifact-guide/`.

## Coding Style & Naming Conventions

Most source files are Markdown. Use concise headings, direct instructions, and concrete pass/fail criteria. Keep examples framework-free: vanilla HTML, inline CSS, and vanilla JavaScript only. Do not reference React, Vue, Tailwind, CDNs, remote fonts, or external scripts. Use kebab-case filenames, such as `review-checklist.md`.

## Testing Guidelines

Automated tests cover the validator with Node's built-in test runner. Manual review covers trigger behavior and content quality. When changing trigger language or the output contract, review `SKILL.md`, `evals/trigger-scenarios.md`, the template, the review checklist, and the validator for drift.

## Commit & Pull Request Guidelines

Use Conventional Commits, matching the existing history: `feat:`, `fix:`, `docs:`, `refactor:`, or `chore:`. Keep each commit focused on one intent.

Pull requests should explain what changed, why it changed, and which checks were performed. Include screenshots only when changing example artifact visuals or rendered HTML guidance.

## Agent-Specific Instructions

Do not restructure `skills/html-artifact-guide/` without a clear reason. Preserve the core constraints: no placeholders, no frameworks, no CDN dependencies, and actionable guidance over abstract advice. If `SKILL.md` changes the output contract, check the template, review checklist, trigger evals, validator, and tests for drift.
