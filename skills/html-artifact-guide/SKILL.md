---
name: html-artifact-guide
description: Use when creating, reviewing, or improving standalone single-file HTML artifacts for comparison matrices, dashboards, timelines, review surfaces, visual explainers, research synthesis, or interactive checklists. Do not use for simple documentation, meeting notes, knowledge base articles, or content where Markdown suffices.
license: Apache-2.0
---

# HTML Artifact Best Practices

Produce readable, interactive, shareable, and reviewable single-file HTML artifacts. Avoid treating HTML as a visual wrapper for Markdown or as a substitute for proper frontend engineering.

## Purpose

This skill covers four capabilities:

1. **Judge** — Decide whether HTML is appropriate, or whether Markdown suffices.
2. **Create** — Generate standalone single-file HTML artifacts using inline CSS and vanilla JS.
3. **Review** — Audit existing HTML artifacts for quality, accessibility, and anti-patterns.
4. **Improve** — Refine information architecture, interaction quality, and remove decorative waste.

This skill does NOT use React, Vue, Tailwind, Vite, shadcn/ui, or any framework. If the task requires complex multi-component UIs with state management, use the `web-artifacts-builder` skill instead. These skills are complementary, not interchangeable.

## When to Use

Use this skill when:
- Multi-option comparison with filtering, collapsing, or side-by-side layout
- Interactive reports, dashboards, or visual explanations
- Decision support pages with risk matrices or priority sorting
- Roadmap or timeline views for team review
- Research synthesis requiring non-linear navigation
- Review surfaces for multi-round agent collaboration outputs
- Any output where the user needs to scan, compare, filter, or interact

Do NOT use this skill when:
- Short explanations, notes, or documentation
- Long-term knowledge base articles
- Content needing frequent human editing
- Content primarily consumed by other agents or tools
- Simple tables and lists that Markdown handles well
- Meeting minutes without visual complexity

## Decision Rule

Before generating HTML, apply this decision flow:

1. Does the task involve human review, comparison, interaction, or sharing?
   - No → Use Markdown. Stop here.
   - Yes → Continue.
2. Is Markdown sufficient for the user's goal?
   - Yes → Use Markdown. Explain why.
   - No → Use HTML artifact. Continue to creation workflow.

Boundary signals — judge before acting:
- "Make this into a webpage" → Ask: does HTML add value beyond visual decoration?
- "HTML version of this document" → Ask: is Markdown insufficient?
- "Make a dashboard" → Ask: are there real metrics and relationships to display?

## Output Contract

Every HTML artifact must satisfy these requirements:

- **Single file** — All HTML, CSS, and JS in one `.html` file
- **Valid structure** — `<!doctype html>`, `<meta charset="utf-8">`, viewport meta tag
- **Semantic HTML** — Use `<table>` for tabular data, `<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<details>` for document structure. Never use `<div>` + CSS to simulate tables.
- **Inline CSS** — All styles in a single `<style>` block, no external stylesheets
- **Vanilla JS** — All scripts in a single `<script>` block, no frameworks or libraries
- **No CDN** — No external stylesheets, scripts, fonts, or images
- **Responsive** — Readable on mobile (375px width) without horizontal scrolling
- **Copyable** — Key content selectable and copyable as plain text. No `user-select: none` on content areas.
- **Labeled controls** — Use native `<button>` for interactive elements (inherently keyboard-focusable). Add `:focus-visible` outline styles.
- **Clear hierarchy** — Title, summary, body, and action items or conclusions visible
- **Structured data** — Important data not locked into visual-only presentation
- **AI disclaimer** — Include "AI-generated. Verify critical decisions independently."
- **No generation metadata** — Do not display model names, token counts, or process details
- **Print-ready** — Include `@media print` rules: hide interactive controls, expand `<details>`, set `overflow: visible`, add `break-inside: avoid` on key sections

## Anti-Patterns

These are the most common mistakes. Check against them before presenting any artifact:

1. **Markdown-in-a-card** — Wrapping plain text in cards, gradients, and backgrounds without adding information density or interaction
2. **Framework default** — Using React, Vue, Tailwind, or any framework when vanilla HTML suffices
3. **Forced HTML** — Generating HTML for simple text that Markdown handles better
4. **AI slop aesthetics** — Purple gradients, excessive rounded corners, centered card layouts, Inter font
5. **Empty dashboard** — Building a dashboard layout without real metric relationships
6. **False certainty** — Using visual weight to create an impression of certainty that the content does not support
7. **Network dependency** — Requiring internet access to render or function
8. **Mobile-hostile** — Wide tables, fixed-width layouts, or tiny text on mobile
9. **Dead interactions** — Buttons, filters, or tabs that do not add actual value
10. **Data lock-in** — Presenting data only visually with no way to copy, select, or extract it

## Creation Workflow

1. **Understand the goal** — What is the user trying to accomplish? Who will read or use this artifact?
2. **Decide: HTML or Markdown?** — Apply the Decision Rule. If Markdown suffices, say so and use Markdown.
3. **Choose a pattern** — Read `references/artifact-patterns.md` and select the pattern that fits. If no pattern fits, create a minimal custom structure.
4. **Organize content** — Separate information into: title/summary, structured body, interaction points, conclusions or action items.
5. **Generate HTML** — Follow the Output Contract. Use `assets/standalone-template.html` as the structural baseline if helpful.
6. **Self-check** — Before presenting, verify every Output Contract requirement is met (all 14 items). Check: does every section serve the user's goal? Are there any anti-patterns? Is the content copyable?

## Review Workflow

1. **Content fidelity** — Does the artifact faithfully represent the source information?
2. **Information architecture** — Is the hierarchy clear? Can a reader scan and find what they need?
3. **Interaction quality** — Does every interactive element serve a purpose?
4. **Anti-pattern scan** — Check against all 10 anti-patterns listed above.
5. **Mobile readiness** — Test mentally at 375px width.
6. **Dependency check** — Any external resources? If so, are they justified?
7. **Data accessibility** — Can key data be copied, selected, or exported?

For a comprehensive checklist, read `references/review-checklist.md`.

## References

- **Patterns** — Read `references/artifact-patterns.md` when creating a new artifact and selecting an appropriate structure
- **Review** — Read `references/review-checklist.md` when reviewing or auditing an existing HTML artifact
- **Template** — Use `assets/standalone-template.html` as a structural baseline when starting a new artifact
