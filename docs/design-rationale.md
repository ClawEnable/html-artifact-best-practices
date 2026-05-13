# Design Rationale

This document explains the design decisions behind `html-artifact-best-practices` — not what the skill does (see `SKILL.md`), but why it does it this way.

---

## Theoretical Foundation: HTML as Review Surface

Agent outputs fall into two categories:

1. **Structured data** — Markdown, YAML, JSON. Lightweight, diffable, versionable, cheap to tokenize. Suitable for long-term storage, cross-tool portability, and model consumption.

2. **Review surfaces** — HTML artifacts. Interactive, visual, shareable. Suitable for human judgment tasks: comparing options, scanning dashboards, annotating work product, making decisions.

These layers are complementary, not competing:

> **Markdown / structured data is the source of truth. HTML artifacts are the human review and action surface.**

This principle comes from observing a real pattern in agent workflows: agents that produce only Markdown force users to read long linear documents when they actually need to scan, compare, filter, or interact. HTML artifacts solve this — but only when they add genuine functional value beyond visual decoration.

The skill's entire decision rule, output contract, and anti-pattern list flow from this principle.

---

## Why a Skill, Not a Plugin

The first version is a Skill (procedural instructions loaded on demand), not a Plugin (a package with tools, MCP servers, or runtime services). This decision was deliberate:

- The core value comes from **judgment rules, patterns, and checklists** — not from external tooling.
- No external accounts, API keys, or long-running services are needed.
- Progressive disclosure (metadata → instructions → references) keeps the agent's context clean.
- A Skill is simpler to distribute, audit, and trust than a Plugin with executable hooks.

The skill may evolve toward a Plugin if real usage demands:
- Automated browser rendering or visual diff
- Accessibility audit automation
- HTML linting
- Multi-template management or artifact publishing

But these should emerge from observed failure patterns, not speculative design.

---

## Why Vanilla HTML Only

The skill explicitly prohibits React, Vue, Tailwind, Vite, shadcn/ui, and all frameworks. Reasons:

1. **Single-file constraint.** Frameworks require build chains, bundling, and external dependencies. A standalone HTML file with inline CSS and vanilla JS opens in any browser, works offline, and requires no tooling.

2. **Complementarity with web-artifacts-builder.** Anthropic's official `web-artifacts-builder` skill already covers complex multi-component UIs with React, Vite, Tailwind, and shadcn/ui. This skill handles a different tier: reports, matrices, dashboards, and review surfaces where the value comes from information structure, not component architecture.

3. **Artifact longevity.** A vanilla HTML file is stable across years. Framework-based artifacts depend on specific versions, CDNs, and build configurations that may not exist in the future.

4. **Auditability.** A single HTML file with inline styles and scripts is fully transparent. No hidden bundler transforms, no dependency tree, no supply chain risk.

| | web-artifacts-builder | html-artifact-guide |
|---|---|---|
| **Stack** | React, Vite, Tailwind, shadcn/ui | Vanilla HTML, inline CSS, vanilla JS |
| **Complexity** | Multi-component, state management | Reports, matrices, dashboards, light interaction |
| **Build** | Requires init + bundle scripts | No build chain, single file |
| **Use when** | Complex interactive web apps | Standalone review/report artifacts |

---

## Key Design Decisions

### Decision Rule: Reject HTML Before Creating It

The skill's first action is always to ask: "Does this task actually need HTML?" If Markdown suffices, the agent must say so and use Markdown instead. This prevents the most common failure mode — agents generating HTML for content that Markdown handles perfectly well.

### Anti-Pattern List: Learn From Observed Failures

The 10 anti-patterns (Markdown-in-a-card, Framework default, Forced HTML, AI slop aesthetics, Empty dashboard, False certainty, Network dependency, Mobile-hostile, Dead interactions, Data lock-in) come from observing real agent outputs. Each one describes a specific, recurring mistake — not a theoretical risk.

### Pattern Library: Structure, Not Templates

The 8 artifact patterns (Decision Brief, Comparison Matrix, Research Synthesis, Dashboard, Timeline/Roadmap, Interactive Checklist, Visual Explainer, Review Surface) describe structural layouts and interaction models. They are not visual templates — they tell the agent what sections to include, how information should flow, and what interactions to build. The visual treatment is left to the agent's judgment within the output contract constraints.

### Review Checklist: Actionable, Not Abstract

Each of the 11 review dimensions includes a concrete pass/fail signal and a specific fix direction. "Responsive Layout" doesn't say "make it responsive" — it says "no horizontal scrolling at 375px, replace fixed widths with max-width: 100%."

---

## What This Skill Does NOT Do

- **Frontend engineering.** For complex web applications, use `web-artifacts-builder`.
- **Visual design guidance.** The skill constrains quality, not aesthetics. It says what to avoid (purple gradients, Inter font), not what to use.
- **Automated validation.** No scripts, no linters, no browser automation in v1. These may come in v2 if real usage shows repeated, mechanically-checkable issues.
- **Content generation.** The skill teaches the agent how to structure and constrain HTML output, not what content to generate.

---

## v1 Acceptance Criteria

The skill is complete when:

- [x] Skill description triggers correctly on relevant prompts
- [x] Agent does not default to React/Vue/Tailwind frameworks
- [x] Agent can reject unnecessary HTML requests (suggests Markdown instead)
- [x] Generated artifacts are standalone single files, openable offline
- [x] Review checklist catches common issues (AI slop, empty dashboards, forced HTML)
- [x] Users can distinguish this skill from web-artifacts-builder
- [x] SKILL.md is under 500 lines and 5000 tokens
- [x] All frontmatter fields comply with agentskills.io specification

---

## Roadmap

### v1.1 — Hardening

Focus on real-world failure modes observed in production use:
- HTML overuse (generating HTML when Markdown would suffice)
- Markdown visual wrapping (cards and gradients with no added value)
- External dependency misuse
- Mobile table issues
- Dashboard emptiness (layout without real metrics)
- Dead interactions (buttons that do nothing useful)
- Over-decoration

### v2 — Tool-Assisted Validation

Add `scripts/validate-artifact.js` only when real usage shows repeated, mechanically-checkable issues:
- Missing doctype, charset, viewport
- External script or style dependencies
- Empty title, duplicate IDs
- Buttons without readable labels
- Images without alt text
- Obviously too-wide fixed layouts

---

## Industry Context

This skill's design is informed by a rapidly forming industry consensus around HTML as a complement to Markdown in LLM workflows.

### Timeline

| Date | Event |
|------|-------|
| 2026-05-08 | Thariq Shihipar (Claude Code team, Anthropic) publishes ["The Unreasonable Effectiveness of HTML"](https://thariqs.github.io/html-effectiveness/) with 20 example demos |
| 2026-05-08 | [Simon Willison](https://simonwillison.net/2026/May/8/unreasonable-effectiveness-of-html/) blogs about it the same day, testing with GPT-5.5 on a real security vulnerability POC |
| 2026-05-09 | [Omar Sar](https://x.com/omarsar0/status/2053144364268863593) proposes "LLM Wikis + HTML Artifacts" as a dual-layer architecture |
| 2026-05-11 | [Andrej Karpathy endorses](https://x.com/karpathy/status/2053872850101285137): *"ask your LLM to 'structure your response as HTML', then view the generated file in your browser"* (959.7K views) |

### Key Perspectives

**Andrej Karpathy** — Endorsed HTML as an LLM output format, noting that it enables richer presentations including slideshows. His broader narrative arc (LLM Knowledge Bases → CLAUDE.md → HTML artifacts) establishes the Markdown-for-knowledge + HTML-for-presentation workflow.

**Simon Willison** — Immediately validated the approach by generating an HTML explanation of the copy.fail Linux vulnerability. His focus is practical: HTML enables "SVG diagrams, interactive widgets, in-page navigation and all sorts of other neat ways of making the information more pleasant to navigate."

**Omar Sar** — Most closely aligned with this skill's design. His formulation — "HTML artifacts on top of an LLM wiki is the right size unit, bigger than a chat reply, smaller than a deployed app" — directly maps to our artifact patterns. He explicitly states: *"HTML doesn't replace Markdown. They are a much better combination working together."*

### What This Means for the Skill

The industry is converging on the same principle this skill was designed around. The skill's contribution is not the insight itself (Karpathy, Willison, and Omar Sar have articulated it clearly) but the **operationalization**: judgment rules that prevent HTML overuse, quality constraints that eliminate common agent failures, and a review checklist that catches anti-patterns mechanically.

---

## References

- [Agent Skills specification](https://agentskills.io/specification)
- [Anthropic web-artifacts-builder](https://github.com/anthropics/skills/blob/main/skills/web-artifacts-builder/SKILL.md)
- [Thariq Shihipar, The unreasonable effectiveness of HTML](https://thariqs.github.io/html-effectiveness/)
