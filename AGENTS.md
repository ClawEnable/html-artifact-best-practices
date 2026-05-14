# Repository Guidelines

## Project Structure & Module Organization

This is a content-only Agent Skill package for standalone HTML artifacts. The distributable skill lives in `skills/html-artifact-guide/`:

- `SKILL.md` defines trigger behavior, output requirements, workflows, and anti-patterns.
- `references/` contains deeper guidance such as artifact patterns and the review checklist.
- `assets/standalone-template.html` is the baseline single-file HTML template.
- `evals/trigger-scenarios.md` documents manual trigger test cases.

Supporting files include localized READMEs, `CONTRIBUTING.md`, `docs/design-rationale.md`, and `.claude-plugin/` metadata.

## Build, Test, and Development Commands

There is no app build chain, install step, or runtime service. The release gate is:

- `node --test tests/validate-artifact.test.js` runs the validator test suite.
- `node scripts/validate-artifact.js skills/html-artifact-guide/assets/standalone-template.html tests/fixtures/valid-artifact.html` checks the baseline template and valid fixture.
- `! rg "Replace with|<title></title>" skills/html-artifact-guide/assets tests/fixtures/valid-artifact.html` checks that template placeholders are absent.
- `test "$(rg -c "expected_action" skills/html-artifact-guide/evals/trigger-scenarios.md)" -ge 20` checks trigger eval coverage.
- `git diff --check` catches whitespace errors.
- Review `SKILL.md` and `evals/trigger-scenarios.md` when changing trigger language or the output contract.

For local installation testing, copy the skill directory, for example `cp -r skills/html-artifact-guide/* ~/.codex/skills/html-artifact-guide/`.

## Coding Style & Naming Conventions

Most source files are Markdown. Use concise headings, direct instructions, and concrete pass/fail criteria. Keep examples framework-free: vanilla HTML, inline CSS, and vanilla JavaScript only. Do not reference React, Vue, Tailwind, CDNs, remote fonts, or external scripts. Use kebab-case filenames, such as `review-checklist.md`.

## Testing Guidelines

Automated tests cover the validator; trigger behavior and content quality are reviewed manually. Before submitting content changes, verify:

- Skill instructions still satisfy the output contract in `SKILL.md`.
- Trigger changes match the should-trigger, should-not-trigger, and boundary cases in `evals/trigger-scenarios.md`.
- Artifact guidance remains offline, copyable, responsive, accessible, and print-aware.

## Commit & Pull Request Guidelines

Use Conventional Commits, matching the existing history: `feat:`, `fix:`, `docs:`, `refactor:`, or `chore:`. Keep each commit focused on one intent.

Pull requests should explain what changed, why it changed, and which checks were performed. Include screenshots only when changing example artifact visuals or rendered HTML guidance.

## Agent-Specific Instructions

Do not add new top-level files or restructure `skills/html-artifact-guide/` without a clear reason. Preserve the project’s core constraints: no placeholders, no frameworks, no CDN dependencies, and actionable guidance over abstract advice. If `SKILL.md` changes the output contract, update the template, review checklist, trigger evals, and validator when applicable.
