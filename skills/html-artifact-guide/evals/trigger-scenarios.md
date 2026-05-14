# Trigger Eval Scenarios

Use these scenarios to verify whether `html-artifact-guide` triggers at the right time. Each case uses the same fields so it can be reviewed manually or converted to a JSON eval later.

## Expected Actions

- `generate_html` — Load this skill and create or review a standalone HTML artifact.
- `use_markdown` — Do not load this skill; Markdown is the better output.
- `ask_clarifying_question` — Pause before choosing HTML because the prompt is underspecified or ambiguous.

## Scenarios

### T01 Product Research Review

- `prompt`: "Organize this product research into an interactive review page where I can filter by category and expand details."
- `expected_action`: `generate_html`
- `expected_pattern`: `Research Synthesis`
- `reason`: Filtering and expandable evidence require structured DOM and JavaScript.
- `must_not_do`: Produce a static Markdown summary.

### T02 Tech Stack Comparison

- `prompt`: "Generate a tech stack comparison matrix for these 4 frameworks with collapsible details."
- `expected_action`: `generate_html`
- `expected_pattern`: `Comparison Matrix`
- `reason`: Multiple options, dimensions, and drill-down detail justify an HTML matrix.
- `must_not_do`: Use decorative cards instead of a semantic table.

### T03 Agent Collaboration Review

- `prompt`: "Turn these multi-round agent collaboration results into a reviewable HTML artifact with verdicts per round."
- `expected_action`: `generate_html`
- `expected_pattern`: `Review Surface`
- `reason`: Per-section verdicts and exportable review notes are interaction requirements.
- `must_not_do`: Present the rounds as static sections without review controls.

### T04 Roadmap Timeline

- `prompt`: "Build a roadmap timeline page showing Q3-Q4 milestones, current status, and blockers."
- `expected_action`: `generate_html`
- `expected_pattern`: `Timeline / Roadmap`
- `reason`: Milestones, phases, status, and blockers benefit from a visual sequence.
- `must_not_do`: Flatten the roadmap into an unordered list.

### T05 Research Findings Dashboard

- `prompt`: "Create a dashboard from these research findings showing key metrics, evidence strength, and action items."
- `expected_action`: `generate_html`
- `expected_pattern`: `Dashboard`
- `reason`: Metrics and thresholds need scannable layout and linked detail sections.
- `must_not_do`: Invent metrics or build an empty dashboard.

### T06 Deployment Checklist

- `prompt`: "Make an interactive deployment checklist with progress tracking and a copyable status summary."
- `expected_action`: `generate_html`
- `expected_pattern`: `Interactive Checklist`
- `reason`: Checkboxes, progress updates, and exportable state require interactivity.
- `must_not_do`: Generate a flat Markdown checklist.

### T07 Architecture Walkthrough

- `prompt`: "Create a visual explainer showing how requests move through our auth, API, queue, and worker layers."
- `expected_action`: `generate_html`
- `expected_pattern`: `Visual Explainer`
- `reason`: Step navigation and diagram annotations add value beyond prose.
- `must_not_do`: Link to external diagrams or images.

### T08 Decision Recommendation

- `prompt`: "Create a decision brief recommending one vendor, with expandable evidence and risks."
- `expected_action`: `generate_html`
- `expected_pattern`: `Decision Brief`
- `reason`: A scannable verdict plus collapsible evidence fits the brief pattern.
- `must_not_do`: Hide caveats below decorative summary cards.

### N01 Meeting Minutes

- `prompt`: "Organize these meeting minutes into clean Markdown with action items highlighted."
- `expected_action`: `use_markdown`
- `expected_pattern`: `none`
- `reason`: The user explicitly requests Markdown and the content is linear prose.
- `must_not_do`: Create an HTML page for simple meeting notes.

### N02 Knowledge Base Article

- `prompt`: "Write a long-term knowledge base article about our deployment process."
- `expected_action`: `use_markdown`
- `expected_pattern`: `none`
- `reason`: Durable documentation should remain easy to edit and diff.
- `must_not_do`: Convert ordinary documentation into a styled artifact.

### N03 PRD Polish

- `prompt`: "Polish this PRD, fix typos, tighten language, and add missing sections."
- `expected_action`: `use_markdown`
- `expected_pattern`: `none`
- `reason`: This is a text-editing task on a document, not a review surface.
- `must_not_do`: Redesign the PRD as a webpage.

### N04 Short Explanation

- `prompt`: "Explain OAuth scopes in five bullet points."
- `expected_action`: `use_markdown`
- `expected_pattern`: `none`
- `reason`: A short explanation does not need layout or interaction.
- `must_not_do`: Add HTML decoration around plain bullets.

### N05 Simple Two-Option Comparison

- `prompt`: "Compare SQLite and Postgres for a weekend prototype."
- `expected_action`: `use_markdown`
- `expected_pattern`: `none`
- `reason`: Two options can be handled with concise prose or a small Markdown table.
- `must_not_do`: Force a comparison matrix without enough dimensions.

### N06 Changelog Draft

- `prompt`: "Draft release notes from these commits."
- `expected_action`: `use_markdown`
- `expected_pattern`: `none`
- `reason`: Release notes are sequential text intended for editing and publishing.
- `must_not_do`: Create a dashboard or timeline unless explicitly requested.

### N07 Agent Instruction File

- `prompt`: "Write an AGENTS.md contributor guide for this repo."
- `expected_action`: `use_markdown`
- `expected_pattern`: `none`
- `reason`: Contributor guides are source-of-truth Markdown documents.
- `must_not_do`: Generate HTML for a repository instruction file.

### B01 Article to Webpage

- `prompt`: "Make this article into a webpage."
- `expected_action`: `ask_clarifying_question`
- `expected_pattern`: `none`
- `reason`: The prompt asks for a webpage but does not state what HTML adds beyond presentation.
- `must_not_do`: Automatically generate a decorated article page.

### B02 HTML Meeting Minutes

- `prompt`: "Give me an HTML version of these meeting minutes."
- `expected_action`: `ask_clarifying_question`
- `expected_pattern`: `none`
- `reason`: The user asked for HTML, but meeting minutes usually remain better as Markdown.
- `must_not_do`: Ignore the mismatch between format request and content type.

### B03 Table to Dashboard

- `prompt`: "Turn this table into a dashboard."
- `expected_action`: `ask_clarifying_question`
- `expected_pattern`: `Dashboard`
- `reason`: A dashboard requires real metrics, relationships, thresholds, or trends.
- `must_not_do`: Build metric cards from arbitrary table columns.

### B04 Visualize This Document

- `prompt`: "Visualize this document so executives can review it faster."
- `expected_action`: `ask_clarifying_question`
- `expected_pattern`: `none`
- `reason`: The agent needs to know whether the goal is comparison, decision, timeline, or review.
- `must_not_do`: Choose a pattern before understanding the review task.

### B05 Interactive Report

- `prompt`: "Make this report interactive."
- `expected_action`: `ask_clarifying_question`
- `expected_pattern`: `none`
- `reason`: Interactivity must map to a real user action such as filtering, drill-down, or annotation.
- `must_not_do`: Add dead buttons or tabs that do not change the review workflow.
