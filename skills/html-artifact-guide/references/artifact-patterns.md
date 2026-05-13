# Artifact Patterns

Eight patterns for structuring standalone HTML artifacts. Each pattern describes when to use it, how to lay it out, what sections are required, how interaction works, what typically goes wrong, and what a good result looks like.

## Table of Contents

1. [Decision Brief](#1-decision-brief)
2. [Comparison Matrix](#2-comparison-matrix)
3. [Research Synthesis](#3-research-synthesis)
4. [Dashboard](#4-dashboard)
5. [Timeline / Roadmap](#5-timeline--roadmap)
6. [Interactive Checklist](#6-interactive-checklist)
7. [Visual Explainer](#7-visual-explainer)
8. [Review Surface](#8-review-surface)

---

## 1. Decision Brief

**Use when:** The user needs a recommendation or decision with supporting evidence. The artifact exists to help a human make a judgment call — not just to present information. The reader should be able to absorb the verdict quickly and then verify the reasoning at their own pace.

**Layout pattern:** Summary and recommendation at the top (visible without scrolling). Below that, expandable evidence sections using `<details>` elements. Pros and cons in a side-by-side `<div>` pair using flexbox with equal-width children. Conclusion with numbered action items at the bottom. Use `<article>` for the overall brief and `<section>` for each logical division.

**Required sections:**
- One-sentence recommendation in a distinct visual block near the top (use a bordered `<div>` or `<section>` with a contrasting background)
- Evidence sections (each as a collapsible `<details>` with a `<summary>` that states the claim)
- Trade-off comparison (pros left, cons right — use a two-column flex layout, not a table)
- Risk or caveat callout (visually distinct from normal text — a left-border accent works well)
- Action items: concrete, numbered, with owners or next steps (use an `<ol>` element)
- Scope statement: what decision this brief covers and what it does not cover

**Interaction pattern:** Reader scans the recommendation, then expands evidence sections to verify reasoning. Pros/cons are always visible without interaction. No tabs, no filtering — the structure is linear by design. The entire flow is: read verdict, check trade-offs, optionally verify evidence, act on items.

**Common failure:** Markdown-in-a-card — wrapping a plain pros/cons list in styled cards without adding collapsible evidence or a scannable recommendation block. If the reader cannot absorb the recommendation in 5 seconds, the pattern failed. Also: False certainty — presenting a tentative recommendation with the same visual weight as confirmed facts.

**Good output signals:** The recommendation is immediately visible. A reader can verify the reasoning by expanding one or two sections. Action items are specific enough to act on without re-reading the full brief. Risks and caveats are not buried at the bottom.

---

## 2. Comparison Matrix

**Use when:** Comparing three or more options across multiple dimensions, and the user needs to filter, sort, or drill into differences. If comparing only two options, a side-by-side prose comparison may suffice — use Markdown instead.

**Layout pattern:** Use a `<table>` with `<thead>` for option names and `<tbody>` for dimension rows. Each cell contains a short evaluation (text label, rating, or verdict). Below the matrix, collapsible detail rows for each option provide deeper justification. On narrow screens (below 768px), restyle the table to stack vertically using a media query — for example, display each row as a block with `th` as a label and `td` as the value.

**Required sections:**
- Column headers: option names with one-line descriptions
- Dimension rows: clear labels, consistent evaluation format per cell
- Legend: what ratings or labels mean (placed near the matrix, not at the bottom)
- Detail rows: one collapsible section per option with supporting rationale
- Summary row or verdict: which option wins on which dimensions
- Scope note: what the comparison covers and what criteria were excluded

**Interaction pattern:** Reader scans the matrix for high-level patterns. Clicks a dimension header to highlight that row. Expands a detail row to see why a cell got its rating. Optional: column checkboxes to show/hide options. Filtering should hide entire columns, not just gray them out.

**Common failure:** Mobile-hostile — wide tables that require horizontal scrolling. Fix by stacking dimensions vertically on narrow screens, showing one option's evaluations per row. Also: Empty dashboard — a comparison matrix with no real differentiating data is just a formatted table. If every cell says essentially the same thing, the comparison does not justify an HTML artifact.

**Good output signals:** The reader can identify the best option for any given dimension at a glance. Differences between options are visually distinct. The matrix works on a phone without scrolling sideways. The detail rows add information not already visible in the matrix cells.

---

## 3. Research Synthesis

**Use when:** Multiple sources contribute findings on a topic, and the user needs a coherent view organized by theme rather than by source. This pattern is appropriate when synthesis requires showing where findings agree, conflict, or have gaps.

**Layout pattern:** Theme-based sections in logical order. Each finding within a section has source tags and a confidence indicator. Evidence details are collapsed by default using `<details>`. A filter bar at the top allows narrowing by source, theme, or confidence level. Use `<article>` for the whole page, `<section>` for each theme, and `<mark>` or styled `<span>` for source tags.

**Required sections:**
- Summary: 2-3 sentence synthesis of the overall finding
- Theme sections: grouped findings with inline source attribution
- Source tags: short labels on each finding identifying the origin
- Confidence levels: high/medium/low indicators on findings
- Collapsible evidence blocks: raw data or quotes supporting each finding
- Source list: all referenced sources with credibility notes
- Gaps section: what is not covered or where evidence is missing

**Interaction pattern:** Reader reads the summary, then browses themes. Clicks source tags to filter findings from a specific source. Toggles confidence filter to show only high-confidence findings. Expands evidence for specific claims. The filter bar should use `<input type="checkbox">` for toggles and update visibility with CSS class toggling.

**Common failure:** False certainty — presenting mixed or low-confidence findings with uniform visual weight, making everything look equally settled. Use visual distinction (opacity, border style, font weight) to signal confidence level. High-confidence findings should look different from speculative ones even at a glance.

**Good output signals:** The reader understands what is well-established vs. speculative. Source attribution is visible without expanding anything. The filter actually narrows the view meaningfully — not just hiding rows but reshaping the narrative. Gaps are acknowledged, not hidden.

---

## 4. Dashboard

**Use when:** Real metrics with actual relationships need to be displayed together. The metrics must have logical connections — not just a collection of numbers. Do not use this pattern if the metrics are independent numbers with no shared context. That is Forced HTML; use a list instead.

**Layout pattern:** Metric cards across the top (4-6 key numbers with labels). Below, detail sections show breakdowns, trends, or relationships between metrics. Each detail section connects to at least one metric card. Use a CSS Grid layout: `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` for metric cards to handle responsive behavior without media queries.

**Required sections:**
- Metric cards: number + label + trend indicator (up/down/flat using a styled `<span>`)
- Detail sections: breakdowns that explain the top-level numbers
- Relationship view: how metrics influence each other (even a simple text note, not a chart)
- Context: what time period, scope, or population the metrics cover
- Threshold callouts: any metric that crosses a defined boundary (visually distinct — e.g., a left-border accent in a warning color)
- Data provenance: where the numbers come from

**Interaction pattern:** Reader glances at metric cards for status. Clicks a card to scroll to its detail section. Detail sections may have collapsible sub-breakdowns. No complex drill-down or charting — keep it simple. All numbers should be selectable text.

**Common failure:** Empty dashboard — building a dashboard layout with placeholder metrics or numbers that have no relationship. If removing any metric card does not weaken the page, the dashboard is over-built. Also: AI slop aesthetics — gradient cards with large numbers and no context. Metric cards without trend indicators or thresholds are just formatted numbers.

**Good output signals:** Every metric card earns its place. The reader can explain why these metrics appear together. Detail sections actually explain the numbers, not just repeat them at a different font size. Thresholds and trends make it clear what needs attention.

---

## 5. Timeline / Roadmap

**Use when:** The user needs to see a sequence of events, milestones, or phases in temporal order — and potentially understand dependencies between them. A flat list of dates with no status tracking or phase structure does not justify this pattern.

**Layout pattern:** Vertical timeline on narrow screens, horizontal on wide screens. Each milestone is a node with a date, title, and optional status indicator. Phase groupings use visual bands or background shifts. Milestone details are collapsed by default. Use a vertical line (CSS `border-left`) with positioned circles for nodes on mobile; switch to a horizontal line (`border-top`) with a media query at wider breakpoints.

**Required sections:**
- Timeline header: project or sequence name with date range
- Phase groupings: labeled segments (e.g., Phase 1, Phase 2) with visual boundaries
- Milestone nodes: date + title + status (complete, in progress, upcoming)
- Detail expansions: description, deliverables, dependencies per milestone
- Current position indicator: visual marker for "today" or "current phase"
- Legend: what each status indicator means

**Interaction pattern:** Reader scans the timeline for overall structure. Expands a milestone to see deliverables and dependencies. Optionally filters by phase or status to focus on what is relevant. The current position indicator should always be visible without scrolling.

**Common failure:** Forced HTML — a simple chronological list that Markdown handles fine. Only use this pattern when phases, dependencies, or status tracking add real value. Also: Dead interactions — expand buttons that reveal one sentence of text. If the detail expansion does not add deliverables, blockers, or dependencies, it is not worth the click.

**Good output signals:** The reader can identify the current phase and next milestone in under 5 seconds. Dependencies between milestones are visible or at least mentioned. The timeline tells a story, not just a list of dates. The current position is immediately obvious.

---

## 6. Interactive Checklist

**Use when:** The user is tracking progress through a multi-step process — onboarding, deployment, migration, audit, etc. The checklist must have enough items and groupings to justify interactivity. Fewer than 8 items in a flat list does not justify this pattern; use Markdown instead.

**Layout pattern:** Grouped sections (e.g., "Prerequisites", "Setup", "Verification"). Each group has a list of checkable items. A progress bar or fraction indicator at the top shows overall completion. Groups collapse when fully checked. Use `<fieldset>` and `<legend>` for groups, `<input type="checkbox">` for items, and a `<progress>` element for the indicator.

**Required sections:**
- Progress indicator: fraction (e.g., 3/12) and a `<progress>` bar
- Grouped item lists: section headers with item counts (e.g., "Setup — 2 of 5")
- Checkable items: checkboxes with descriptive labels
- Optional notes field per item or per group (a `<textarea>` inside a `<details>`)
- Summary section: what remains, what is blocked, estimated effort remaining

**Interaction pattern:** Reader checks off items as they complete them. Progress updates in real time via a JS event listener on checkboxes. Groups can collapse to reduce clutter once complete. Optionally: item dependencies (checking X enables Y). The progress indicator must update on every check/uncheck — no stale state.

**Common failure:** Dead interactions — a checklist so short (3-5 items) that checkboxes add no value over a plain list. Also: Data lock-in — progress state trapped in the page with no way to copy the current status. Provide a "Copy status" button that outputs a text summary to clipboard using `navigator.clipboard.writeText()`.

**Good output signals:** The reader uses this artifact during actual execution, not just for planning. Progress is always visible. The checklist can be copied or printed in its current state. Groupings match how the work actually proceeds. Checking an item produces visible feedback.

---

## 7. Visual Explainer

**Use when:** The user needs to understand a concept, process, or system through a step-by-step walkthrough — where seeing the pieces in order matters more than reading a single narrative. If the concept can be explained in prose without visual aids, use Markdown.

**Layout pattern:** Numbered steps with a diagram area and an annotation area per step. Navigation controls (previous/next) at the bottom. An overview mode shows all steps in sequence. Each step has a title, a diagram or structured visual, and annotations. Use a container `<div>` for the diagram area with CSS `position: relative` for positioning child elements.

**Required sections:**
- Step navigation: numbered step indicators showing current position
- Diagram area: structured visual per step (use CSS shapes, tables, or positioned elements — no images, no SVG external references)
- Annotation area: labeled callouts explaining what changed in this step
- Overview mode: all steps visible in sequence for full picture
- Key terms: glossary or definition list for domain-specific vocabulary
- Step counter: "Step 2 of 7" displayed prominently

**Interaction pattern:** Reader advances through steps using next/previous buttons or clicking step numbers. Each step updates the diagram area and annotations. Overview mode lets the reader see the full sequence at once. Buttons must be `<button>` elements with clear labels, not icon-only controls.

**Common failure:** Network dependency — linking to external diagrams or images. All visuals must be built with CSS and HTML structure. Also: AI slop aesthetics — decorative gradients and rounded boxes that add no explanatory value. If removing the diagram area leaves a perfectly readable document, the visual is not earning its place.

**Good output signals:** The reader can explain the concept to someone else after going through the steps. The visual per step actually clarifies something — not just a text block with a decorative border. Navigation is obvious and keyboard-accessible. The overview mode provides a useful summary, not just a wall of text.

---

## 8. Review Surface

**Use when:** Presenting work product (document, code plan, analysis) for a human to review, annotate, and approve or reject. The artifact exists to collect structured feedback, not just display content. If the reader cannot annotate or verdict individual sections, this is the wrong pattern — use a Decision Brief or a static document instead.

**Layout pattern:** Content sections with inline annotation markers. Each section has a verdict selector (approve, revise, reject) and an expandable notes area. A summary bar at the top shows overall review status. Action items are collected at the bottom. Use `<fieldset>` per section to group verdict and notes controls with their content.

**Required sections:**
- Review summary bar: sections reviewed, sections pending, overall verdict count
- Content sections: the work being reviewed, clearly separated with visual boundaries
- Annotation markers: numbered pins or flags inline with the content (use `<sup>` or positioned `<span>`)
- Verdict controls: approve/revise/reject per section (radio buttons with clear labels)
- Notes areas: expandable `<textarea>` per section for reviewer comments
- Action items list: auto-collected from sections marked "revise" or "reject"
- Export control: a button to copy the full review (verdicts + notes) as plain text

**Interaction pattern:** Reader scans content sections. Clicks an annotation marker to see a comment. Selects a verdict per section. Adds notes where needed. The summary bar updates as verdicts are entered via JS listeners on the radio buttons. Action items aggregate from revision-marked sections automatically. The export button should produce a structured text format: section name, verdict, notes.

**Common failure:** Markdown-in-a-card — presenting the content as a static document with decorative formatting but no annotation or verdict capability. If the reader cannot give structured feedback per section, it is not a review surface, it is a document. Also: Data lock-in — verdicts and notes should be exportable as text. Without export, the review exists only in the browser session.

**Good output signals:** The reviewer can complete a full review without leaving the page. The summary bar reflects the review state accurately. Action items are specific and traceable to the section that generated them. The content sections are selectable and copyable. Verdict controls are obvious and easy to use. The exported review is readable and useful on its own.
