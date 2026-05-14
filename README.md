<p align="center">
  <strong>English</strong> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a>
</p>

<h1 align="center">HTML Artifact Best Practices</h1>

<p align="center">
  <strong>An Agent Skill for producing, reviewing, and improving standalone single-file HTML artifacts</strong><br>
  <sub><i>Vanilla HTML only — no frameworks, no CDN, no build chain</i></sub>
</p>

<p align="center">
  <a href="https://github.com/ClawEnable/html-artifact-best-practices/releases">
    <img src="https://img.shields.io/github/v/release/ClawEnable/html-artifact-best-practices?style=flat-square&label=release&color=2563eb" alt="Release">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-Apache%202.0-brightgreen?style=flat-square" alt="License">
  </a>
  <img src="https://img.shields.io/badge/dependencies-zero-16a34a?style=flat-square" alt="Dependencies">
</p>

---

## Quick Start

**Claude Code:**
```bash
/plugin marketplace add ClawEnable/html-artifact-best-practices
/plugin install html-artifact-guide
```

**Any agent (npx):**
```bash
npx skills add ClawEnable/html-artifact-best-practices
```

**Then try:**
> "Create a comparison matrix for these 3 database options — I need to evaluate performance, cost, and ecosystem support with collapsible details"

The agent judges whether HTML adds value over Markdown, picks the right pattern, and generates a standalone `.html` file.

## What It Does

| Capability | Description |
|:-----------|:------------|
| **Judge** | Decide whether HTML is appropriate, or Markdown suffices |
| **Create** | Generate standalone artifacts using vanilla HTML + inline CSS + vanilla JS |
| **Review** | Audit existing artifacts for quality, accessibility, and anti-patterns |
| **Improve** | Refine information architecture, interaction quality, and remove waste |

## Why This Skill

In May 2026, Thariq Shihipar (Claude Code team, Anthropic) published ["The Unreasonable Effectiveness of HTML"](https://thariqs.github.io/html-effectiveness/) — 20 interactive demos proving HTML delivers higher information density than Markdown for LLM outputs. [Andrej Karpathy endorsed it](https://x.com/karpathy/status/2053872850101285137) (960K+ views): *"ask your LLM to 'structure your response as HTML', then view the generated file in your browser."* [Simon Willison validated it](https://simonwillison.net/2026/May/8/unreasonable-effectiveness-of-html/) the same day, using it to explain a real security vulnerability. Omar Sar proposed the architectural framing: *"HTML doesn't replace Markdown. They are a much better combination working together."*

The emerging consensus: **Markdown is the source of truth; HTML is the human review surface.** This skill operationalizes that principle — with judgment rules that prevent HTML overuse, 10 anti-patterns that catch common failures, and an 11-dimension quality checklist.

### When to use

- Multi-option comparison matrices with filtering
- Interactive reports, dashboards, or visual explanations
- Decision support pages with risk matrices
- Roadmap or timeline views for team review
- Research synthesis requiring non-linear navigation

### When **not** to use

Simple documentation, knowledge base articles, meeting minutes — anything Markdown handles well.

### Not web-artifacts-builder

| | web-artifacts-builder | html-artifact-guide |
|:--|:--|:--|
| Stack | React, Vite, Tailwind, shadcn/ui | Vanilla HTML, inline CSS, vanilla JS |
| Use when | Complex interactive web apps | Standalone review/report artifacts |
| Build | Requires init + bundle | No build chain, single file |

## What's Included

- **SKILL.md** — Judgment rules, output contract, 10 anti-patterns, creation/review workflows
- **8 Artifact Patterns** — Decision Brief, Comparison Matrix, Research Synthesis, Dashboard, Timeline, Interactive Checklist, Visual Explainer, Review Surface
- **11-Dimension Review Checklist** — Content fidelity, information architecture, semantic HTML, responsive layout, accessibility, interaction quality, dependency policy, copyability, print readiness, visual emphasis, source-of-truth preservation
- **Validator-Passing Standalone Template** — Responsive, focus-visible, print-aware baseline for new artifacts
- **Trigger Eval Scenarios** — 20 structured cases covering HTML generation, Markdown fallback, and clarification boundaries
- **Artifact Validator** — Zero-dependency Node.js release gate for metadata, dependency policy, focus, print, copyability, and mobile-risk checks

## Install

<details>
<summary><strong>Claude Code</strong> — Marketplace</summary>

```bash
/plugin marketplace add ClawEnable/html-artifact-best-practices
/plugin install html-artifact-guide
```

</details>

<details>
<summary><strong>Claude Code</strong> — Plugin Dir (dev)</summary>

```bash
claude --plugin-dir /path/to/html-artifact-best-practices
```

</details>

<details>
<summary><strong>Codex CLI</strong> (OpenAI)</summary>

```bash
# Enable skills (first time only)
codex --enable skills

# Install manually
mkdir -p ~/.codex/skills/html-artifact-guide
cp -r skills/html-artifact-guide/* ~/.codex/skills/html-artifact-guide/
```

</details>

<details>
<summary><strong>Gemini CLI</strong></summary>

```bash
gemini skills install https://github.com/ClawEnable/html-artifact-best-practices

# Workspace scope only
gemini skills install https://github.com/ClawEnable/html-artifact-best-practices --scope workspace
```

</details>

<details>
<summary><strong>Cursor</strong></summary>

```bash
# Project-level
mkdir -p .cursor/skills/html-artifact-guide
cp -r skills/html-artifact-guide/* .cursor/skills/html-artifact-guide/

# Or use "Import Agent Skills" in Settings > Rules and Commands
```

</details>

<details>
<summary><strong>OpenClaw</strong></summary>

```bash
# Via CLI
openclaw skills add /path/to/html-artifact-best-practices/skills/html-artifact-guide

# Or manually
mkdir -p ~/.openclaw/workspace/skills/html-artifact-guide
cp -r skills/html-artifact-guide/* ~/.openclaw/workspace/skills/html-artifact-guide/
```

</details>

<details>
<summary><strong>Hermes</strong></summary>

```bash
# Global
mkdir -p ~/.hermes/skills/html-artifact-guide
cp -r skills/html-artifact-guide/* ~/.hermes/skills/html-artifact-guide/

# Project-level (run from YOUR project root)
mkdir -p skills/html-artifact-guide
cp -r /path/to/html-artifact-best-practices/skills/html-artifact-guide/* skills/html-artifact-guide/

hermes reload
```

</details>

<details>
<summary><strong>Cross-Agent</strong> (npx skills add)</summary>

Works with Claude Code, Codex, Cursor, Copilot, and other agent CLIs.

```bash
npx skills add ClawEnable/html-artifact-best-practices        # current project
npx skills add ClawEnable/html-artifact-best-practices -g      # global
npx skills add ClawEnable/html-artifact-best-practices -a claude-code  # specific agent
```

</details>

<details>
<summary><strong>Manual</strong></summary>

```bash
git clone https://github.com/ClawEnable/html-artifact-best-practices.git \
  ~/.claude/skills/html-artifact-best-practices
```

</details>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Conventional Commits: `feat:` / `fix:` / `docs:` / `refactor:`.

## License

[Apache-2.0](LICENSE) — free for commercial use, modification, and distribution.
<br>Copyright © 2026 ClawEnable
