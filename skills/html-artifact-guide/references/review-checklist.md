# Review Checklist — html-artifact-guide

Use this checklist to evaluate any HTML artifact before delivery. Each dimension is independent; an artifact must pass all 11.

---

## 1. Content Fidelity

- No facts, numbers, or quotes distorted or fabricated relative to the source material
- Omissions are intentional scope decisions, not accidental gaps that change meaning
- Uncertain or inferred content is marked explicitly (e.g. "estimated", "unconfirmed")

**Pass:** Every claim traces directly to source information or is clearly flagged as uncertain.
**Fail:** Any statement contradicts, exaggerates, or silently paraphrases source material.
**Fix:** Replace fabricated details with verified source data. Flag remaining ambiguities with explicit uncertainty markers rather than presenting assumptions as fact (anti-pattern: False certainty).

## 2. Information Architecture

- Heading hierarchy follows a single logical outline (h1 > h2 > h3, no skipped levels)
- Reader can locate any key point within 10 seconds by scanning headings alone
- Related content is grouped; unrelated content is separated, not interleaved

**Pass:** A scan of headings alone gives an accurate table-of-contents view of the artifact.
**Fail:** Reader must read full paragraphs to understand what the artifact covers or where a topic lives.
**Fix:** Restructure headings to form a coherent outline. Split overloaded sections; merge fragments that belong together. Eliminate decorative headings that carry no information.

## 3. Semantic HTML

- `<main>`, `<section>`, `<nav>`, `<header>`, `<footer>` used instead of generic `<div>` where semantically appropriate
- `<details>`/`<summary>` used for optional or progressive-disclosure content
- Lists use `<ul>`/`<ol>`, tables use `<table>` with `<th>` headers — no faux-lists made of styled `<div>`s

**Pass:** The DOM tree alone communicates document structure without any CSS applied.
**Fail:** Structure is invisible in the DOM and exists only through visual styling (anti-pattern: Forced HTML).
**Fix:** Replace structural `<div>` soup with the correct semantic elements. Ensure every landmark role is conveyed by the element, not by a `role` attribute bolted onto a `<div>`.

## 4. Responsive Layout

- No horizontal scrolling at 375px viewport width
- No fixed pixel widths that exceed the viewport (e.g. `width: 800px`)
- Text remains readable without pinch-zoom at mobile sizes

**Pass:** All content is fully usable on a 375px-wide viewport with no horizontal overflow.
**Fail:** Any content is clipped, overlaps, or requires horizontal scrolling (anti-pattern: Mobile-hostile).
**Fix:** Replace fixed widths with `max-width: 100%` or relative units. Add `overflow-wrap: anywhere` on text containers. Test with browser devtools at 375px.

## 5. Accessibility

- All images have meaningful `alt` text (empty `alt=""` only for purely decorative images)
- Interactive elements are reachable via Tab and activatable via Enter/Space
- Color is not the sole indicator of state; text labels or icons accompany color changes

**Pass:** A screen reader can navigate and understand the full content; all controls are keyboard-operable.
**Fail:** Content is invisible to assistive technology or interactive elements trap focus (anti-pattern: Framework default).
**Fix:** Add missing `alt`, `aria-label`, or visually-hidden text. Ensure every click handler has a keyboard equivalent. Verify focus order follows reading order.

## 6. Interaction Quality

- Every interactive element (button, toggle, expandable) triggers a visible, meaningful change
- No decorative "clickable" styling on non-interactive content
- Hover/focus states provide clear feedback without relying on color alone

**Pass:** Every interactive control does something useful; nothing fakes interactivity.
**Fail:** Buttons or toggles exist that do nothing, or visual affordances suggest interaction where none exists (anti-pattern: Dead interactions).
**Fix:** Remove non-functional controls, or wire them to real behavior. Replace cosmetic hover effects on static content with plain text styling.

## 7. Dependency Policy

- Zero external CDN links (no Tailwind, Bootstrap, Google Fonts, icon libraries)
- No `<script src="...">` pointing to external domains
- No `<img src="https://...">` or background-image URLs to external hosts

**Pass:** The artifact renders fully offline with no network requests.
**Fail:** Any external resource is referenced that requires a network call (anti-pattern: Network dependency).
**Fix:** Inline all CSS. Replace external icons with Unicode characters or inline SVG. Remove web font references and use system font stacks instead.

## 8. Copyability

- All text content is selectable via cursor drag (not trapped in pseudo-elements or canvas)
- Pasted text preserves reading order, not visual layout order
- Code snippets, data values, and key terms are plain text, not rendered as background images

**Pass:** User can select-all, copy, and paste the full textual content into a plain text editor with coherent results.
**Fail:** Key content is unselectable, or pasted text arrives scrambled (anti-pattern: Data lock-in).
**Fix:** Move content out of `::before`/`::after` pseudo-elements and `content:` CSS into real DOM text. Ensure `user-select` is not set to `none` on content areas.

## 9. Print/Export Readiness

- `@media print` rules hide navigation, controls, and decorative elements
- No content is lost due to `overflow: hidden` or fixed positioning in print context
- Page breaks do not split critical tables or diagrams across pages

**Pass:** Browser Print Preview shows all content in a clean, readable, linear flow.
**Fail:** Print output is missing content, has blank pages, or layout is shattered.
**Fix:** Add a `@media print` block that removes interactive chrome, sets `position: static`, `overflow: visible`, and `width: 100%` on all containers.

## 10. Misleading Visual Emphasis

- The largest/boldest visual weight corresponds to the most important information, not decorative labels
- No gratuitous gradients, glows, or 3D effects that imply data depth where none exists
- Color intensity and size encode genuine importance, not aesthetic whim

**Pass:** A reader's eye is drawn first to the most important content; visual hierarchy matches information hierarchy.
**Fail:** Decorative elements dominate the visual field or styling implies significance the content does not warrant (anti-pattern: AI slop aesthetics).
**Fix:** Tone down decorative backgrounds, borders, and font sizes on non-essential elements. Increase visual weight on key data points. Remove drop shadows, gradients, and glows that add no information.

## 11. Source-of-Truth Preservation

- All data exists as real DOM text, not only in charts, canvases, or visual-only representations
- Tables or lists reproduce the full dataset, not just a top-N summary
- Exported/copied content is complete enough to reconstruct the original analysis

**Pass:** The full informational payload is recoverable by selecting all text and copying.
**Fail:** Data is locked in a visual rendering (SVG chart, canvas, image) with no text fallback (anti-pattern: Markdown-in-a-card).
**Fix:** Add a text-based representation (table, list, or `<details>` block) alongside every chart or visualization. Ensure the DOM contains the complete dataset, not just a visual subset.
