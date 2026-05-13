# Trigger Test Scenarios

Eval scenarios for verifying HTML artifact trigger behavior. Each scenario includes a prompt and the expected agent response.

---

## Should Trigger (5)

These prompts describe deliverables that genuinely benefit from interactivity, structured layout, or visual affordances that only HTML can provide.

### 1. Product Research Review Page

**Prompt:** "Organize this product research into an interactive review page where I can filter by category and expand details"

**Expected behavior:** Agent should trigger HTML artifact. Filtering and expand/collapse are interactive features that require JavaScript and structured DOM rendering. Markdown cannot satisfy the "filter by category" requirement.

---

### 2. Tech Stack Comparison Matrix

**Prompt:** "Generate a tech stack comparison matrix for these 4 frameworks — I need to compare them on performance, DX, ecosystem, and learning curve, with collapsible details"

**Expected behavior:** Agent should trigger HTML artifact. A comparison matrix across four frameworks on four dimensions with collapsible sections is a structured interactive view. Static tables in Markdown lose the collapsible-detail affordance.

---

### 3. Multi-Round Agent Collaboration Review

**Prompt:** "Turn the multi-round agent collaboration results into a reviewable HTML artifact with sections for each round's output"

**Expected behavior:** Agent should trigger HTML artifact. The user explicitly asks for an HTML artifact. Multi-round output with per-round sections benefits from navigation, collapsible panels, and visual separation between rounds.

---

### 4. Roadmap Timeline Page

**Prompt:** "Build a roadmap timeline page showing Q3-Q4 milestones for team review"

**Expected behavior:** Agent should trigger HTML artifact. A timeline is a spatial/visual layout. Milestones along a timeline axis with date markers and team-review context call for a styled, potentially interactive page.

---

### 5. Research Findings Dashboard

**Prompt:** "Create a dashboard from these research findings — show key metrics, evidence strength, and action items"

**Expected behavior:** Agent should trigger HTML artifact. Dashboards are inherently visual. Key metrics demand prominent display (cards, progress bars), evidence strength implies visual indicators, and the "dashboard" framing signals interactive structure.

---

## Should Not Trigger (3)

These prompts ask for document formatting, cleanup, or content work where Markdown is the correct output format. HTML would add no functional value.

### 1. Meeting Minutes Cleanup

**Prompt:** "Organize these meeting minutes into clean Markdown with action items highlighted"

**Expected behavior:** Agent should NOT trigger HTML artifact. The user explicitly requests Markdown. Meeting minutes are a sequential text document. Highlighting action items is achievable with Markdown formatting.

---

### 2. Knowledge Base Article

**Prompt:** "Write a long-term knowledge base article about our deployment process"

**Expected behavior:** Agent should NOT trigger HTML artifact. This is a prose document destined for a knowledge base (likely Markdown-based). No interactivity, no structured data views, no visual layout requirements.

---

### 3. PRD Polish

**Prompt:** "Polish this PRD — fix typos, tighten the language, add missing sections"

**Expected behavior:** Agent should NOT trigger HTML artifact. This is a text-editing task on an existing document. The deliverable is improved prose, not a visual or interactive artifact.

---

## Boundary Cases (3)

These prompts sit at the edge of the trigger threshold. The agent should pause and reason before acting, rather than automatically triggering or declining.

### 1. Article to Webpage

**Prompt:** "Make this article into a webpage"

**Expected behavior:** Agent should ask a clarifying question: does HTML add value beyond decoration here? If the article is purely prose with no interactive or structural needs, Markdown (or a plain styled page) is sufficient. The agent should surface this tradeoff before committing to an HTML artifact.

---

### 2. HTML Meeting Minutes

**Prompt:** "Give me an HTML version of these meeting minutes"

**Expected behavior:** Agent should suggest that Markdown is sufficient for meeting minutes. The user asked for HTML explicitly, but meeting minutes are sequential text with no interactive requirements. The agent should explain that Markdown formatting handles this case better and ask if there is a specific reason HTML is needed.

---

### 3. Table to Dashboard

**Prompt:** "Turn this table into a dashboard"

**Expected behavior:** Agent should check whether the data contains real metrics and relationships that warrant a dashboard. If the table is simple tabular data with no KPIs, trends, or visual indicators, the agent should ask what dashboard features the user actually needs. A styled table or a chart may be more appropriate than a full dashboard artifact.
