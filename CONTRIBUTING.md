# Contributing

Contributions are welcome. This project follows a few conventions to keep things consistent.

## Reporting Issues

- **Bug reports** — Describe the unexpected behavior, what you expected, and how to reproduce it. Include the agent you're using (Claude Code, Cursor, Copilot, etc.) if relevant.
- **Feature requests** — Describe the use case, not just the feature. "I need X" is less useful than "When doing Y, I needed X because Z."

## Submitting Changes

1. Fork the repository
2. Create a branch: `git checkout -b your-change-name`
3. Make your changes
4. Commit with a descriptive message using [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` new skill content, patterns, or checklists
   - `fix:` corrections to existing content
   - `docs:` README, CONTRIBUTING, or design-rationale changes
   - `refactor:` restructure without changing meaning
5. Open a pull request with a clear description of what changed and why

## Validation & Release Gate

Run these checks before opening a pull request or cutting a release:

```bash
node --test tests/validate-artifact.test.js
node scripts/validate-artifact.js skills/html-artifact-guide/assets/standalone-template.html tests/fixtures/valid-artifact.html
! rg "Replace with|<title></title>" skills/html-artifact-guide/assets tests/fixtures/valid-artifact.html
test "$(rg -c "expected_action" skills/html-artifact-guide/evals/trigger-scenarios.md)" -ge 20
git diff --check
```

Use `node scripts/validate-artifact.js path/to/artifact.html` when adding or changing example artifacts. The validator checks the standalone HTML contract: required metadata, no external dependencies, copyability, focus styles, print styles, and common mobile layout risks.

## Content Standards

All skill content (SKILL.md, references, evals) is Markdown. Follow these rules:

- **No placeholders.** Every section must contain actual, usable content. No "TODO", "TBD", or "fill in later".
- **No frameworks.** This skill is vanilla HTML only. Do not add references to React, Vue, Tailwind, or any framework.
- **No CDN.** Every artifact must work offline. Do not add external dependency references.
- **Actionable, not abstract.** Rules and checklists must include concrete pass/fail signals and fix directions.
- **Content over decoration.** Do not add visual guidance that doesn't serve information structure.

## Review Criteria

Pull requests are evaluated against:

1. **Spec compliance** — Does the change align with the skill's stated purpose and output contract?
2. **No anti-patterns** — Does the change avoid the 10 anti-patterns listed in SKILL.md?
3. **Consistency** — Does the change match existing style, tone, and terminology?
4. **Completeness** — Every claim has substance, no placeholders or vague instructions.

## Synchronization Rules

When changing the output contract in `skills/html-artifact-guide/SKILL.md`, also check whether these files need updates:

- `skills/html-artifact-guide/assets/standalone-template.html`
- `skills/html-artifact-guide/references/review-checklist.md`
- `skills/html-artifact-guide/evals/trigger-scenarios.md`
- `scripts/validate-artifact.js`
- `tests/validate-artifact.test.js`

When changing installation, positioning, or core constraints in `README.md`, review `README.zh-CN.md` and `README.ja.md` for drift.

## File Structure

```
AGENTS.md                              # Agent-facing contributor guide
CONTRIBUTING.md                        # Human contributor guide
docs/
└── design-rationale.md                # Design decisions and industry context
scripts/
└── validate-artifact.js               # Zero-dependency HTML artifact validator
skills/html-artifact-guide/
├── SKILL.md                         # Core skill definition
├── references/
│   ├── artifact-patterns.md         # 8 artifact patterns
│   └── review-checklist.md          # 11-dimension review checklist
├── assets/
│   └── standalone-template.html     # HTML template baseline
└── evals/
    └── trigger-scenarios.md         # Trigger test scenarios
tests/
├── validate-artifact.test.js          # Validator test suite
└── fixtures/                          # Valid and invalid validator fixtures
```

Do not add distributable skill files outside `skills/html-artifact-guide/` without discussion first. Validation scripts, tests, contributor docs, and design notes may live at the repository root when they support the skill package.
