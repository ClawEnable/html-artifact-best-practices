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

## File Structure

```
skills/html-artifact-guide/
├── SKILL.md                         # Core skill definition
├── references/
│   ├── artifact-patterns.md         # 8 artifact patterns
│   └── review-checklist.md          # 11-dimension review checklist
├── assets/
│   └── standalone-template.html     # HTML template baseline
└── evals/
    └── trigger-scenarios.md         # Trigger test scenarios
```

Do not add files outside this structure without discussion first.
