# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Agent Skill** (not a traditional software project). It provides procedural instructions that help AI agents produce high-quality standalone single-file HTML artifacts. The project has no app build chain, runtime service, or package install step. It does include a zero-dependency Node.js validator and tests for the validator.

The skill follows the [Agent Skills specification](https://agentskills.io/specification) and uses progressive disclosure: `plugin.json` metadata → `SKILL.md` instructions → `references/` detail on demand.

## Repository Structure

- `skills/html-artifact-guide/` — The skill itself (the only directory that ships to agents)
  - `SKILL.md` — Core skill definition: judgment rules, output contract, anti-patterns, workflows
  - `references/artifact-patterns.md` — 8 structural patterns for HTML artifacts
  - `references/review-checklist.md` — 11-dimension quality checklist
  - `assets/standalone-template.html` — Minimal HTML template baseline
  - `evals/trigger-scenarios.md` — Trigger test cases (should/should-not/boundary)
- `.claude-plugin/marketplace.json` — Marketplace listing for plugin distribution
- `.claude-plugin/plugin.json` — Plugin manifest (required for `cc --plugin-dir` and `/plugin install`)
- `docs/design-rationale.md` — Design decisions and industry context

## Development Commands

Run these checks before opening a pull request or cutting a release:

```bash
node --test tests/validate-artifact.test.js
node scripts/validate-artifact.js skills/html-artifact-guide/assets/standalone-template.html tests/fixtures/valid-artifact.html
! rg "Replace with|<title></title>" skills/html-artifact-guide/assets tests/fixtures/valid-artifact.html
test "$(rg -c "expected_action" skills/html-artifact-guide/evals/trigger-scenarios.md)" -ge 20
git diff --check
```

Trigger behavior and content quality still require manual review:

- Review `SKILL.md` against the output contract and anti-pattern list
- Run trigger scenarios from `evals/trigger-scenarios.md` when changing trigger language
- Use `references/review-checklist.md` to audit generated HTML artifacts

## Content Standards

These are non-negotiable constraints for all content in this repo:

- **No frameworks** — Vanilla HTML + inline CSS + vanilla JS only. No React, Vue, Tailwind, or any framework reference.
- **No CDN** — Every artifact must work offline. No external dependency references anywhere.
- **No placeholders** — No TODO, TBD, or "fill in later". Every section must contain usable content.
- **Actionable, not abstract** — Rules and checklists must include concrete pass/fail signals and fix directions.
- **Content over decoration** — Visual guidance must serve information structure, not aesthetics.

## Contribution Convention

Conventional Commits format:
- `feat:` new skill content, patterns, or checklists
- `fix:` corrections to existing content
- `docs:` README, CONTRIBUTING, or design-rationale changes
- `refactor:` restructure without changing meaning

## Relationship to web-artifacts-builder

These skills are complementary, not interchangeable. `web-artifacts-builder` handles complex multi-component UIs (React, Vite, Tailwind, shadcn/ui). This skill handles standalone reports, matrices, dashboards, and review surfaces (vanilla HTML, no build chain).
