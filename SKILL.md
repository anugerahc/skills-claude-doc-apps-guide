---
name: app-user-guide-generator
description: Use when asked to write, generate, or extract an end-user guide / help doc / manual for a software module or app from its source code or repo — especially "generate a user guide for module X", "document how to use this feature", or "what does the in-app help say about Y". Works across stacks (not tied to any framework). Core rule: find and copy the app's own existing user-facing help content verbatim before ever writing new guide text from reading code structure.
---

# App User Guide Generator

Methodology for producing an **accurate, end-user-facing guide** for any app/module, from its codebase. Not a developer/architecture doc (that's a different task — don't mix the two).

## The one rule that matters

**An app's own in-product help content (if it exists) is ground truth. Find it before you write anything.** Writing a guide by reading controllers/views and inferring "how this is probably used" produces a developer's mental model dressed up as user docs — close enough to look right, wrong enough to mislead. If the real thing exists, extract it verbatim. Only fall back to reconstructing from code when nothing exists.

This came from a real failure: a first pass inferred a guide from reading the module's MVC code (views, JS, controller) and got the shape right but wasn't what the user wanted — the app actually ships a full interactive "User Guide" page with hand-written, maintained copy, sitting unused in a different git branch than the one checked out. Always check for that before reconstructing anything.

## Step 1 — Clarify what "guide" means here

Ambiguous by default. Before touching code, confirm:
- A **how-to-use-the-software** guide (buttons, screens, workflow, error messages) — the common case.
- A **business-domain document the app generates as output** (e.g. the app produces "User Guide" as a deliverable type, like a product manual). Different thing entirely — don't assume.

If unclear, ask. Guessing wrong wastes a full pass.

## Step 2 — Hunt for an existing in-app guide BEFORE reading anything else

Checklist, in order:

1. `grep`/search the whole repo, case-insensitive, for `user guide|panduan|help|manual|petunjuk` across views/templates, not just the current module's folder — guide content is often in its own file (`UserGuide.*`, `_UserGuide*`, `Guide.*`, `HelpModal.*`).
2. **Check every git branch, not just the one checked out.** `git grep` only searches the working tree. Use `git grep -i "user guide" $(git branch -r | sed 's/origin\///')` or loop branches — content can live on a dev/feature branch never merged to what you have checked out. This is the single most likely reason a search "finds nothing."
3. Look for a dedicated standalone route/page (e.g. `Guide.cshtml`, a `/help` or `/guide` endpoint, a modal triggered by a "User Guide" / "Help" button) — these often render a large, separately-authored content partial, distinct from the feature's own views.
4. If still nothing, ask the user directly where they've seen it (menu label, screenshot) rather than guessing further — don't burn another full read-the-codebase pass on a wrong assumption.

## Step 3 — If a real guide exists: extract verbatim, don't paraphrase

- Pull the raw source (the exact file, exact branch/ref).
- Strip markup only (HTML tags, `<style>`/`<script>` blocks, template directives) — never reword sentences, rename buttons, or "clean up" phrasing. The literal on-screen strings (button labels, error messages, status names) are what the end user matches against; changing them breaks that.
- Preserve structure: headings → `#`/`##`, list items → `-`, tables → markdown tables. Watch for markup that *looks* like a heading but is actually inline dialog chrome (e.g. an alert/confirm box title rendered as `<h2>`) — don't let it become a false section header.
- Keep the original nav/topic order if the in-app guide has one (sidebar, table of contents) — it's already organized the way the app's own authors meant users to read it.

## Step 4 — If no in-app guide exists: reconstruct from code, carefully

Only now read the feature itself, in this order, and quote exact strings wherever you can — never invent a plausible-sounding label or message:

1. **Views/templates** — real field labels, button text, required-field markers, layout grouping (these ARE the screen).
2. **Client-side JS** — confirm dialogs, validation messages, what a button click actually triggers (AJAX call, which one), disabled/enabled conditions.
3. **Controllers / API layer** — server-side validation messages (the ones the client can't fully replicate), what a successful action actually changes.
4. **Constants/enums** — status names and their human labels, role/department names, any `GetLabel()`-style mapping — these give you the exact vocabulary the app uses for states and roles.
5. **Entities/DB schema** — only for understanding data shape, not for user-facing wording.

Write the guide around *what the user sees and does*, using the exact on-screen labels — not around the code's internal structure. A guide organized by controller method names is a dev doc wearing a disguise.

## Step 5 — Structure the output

Mirror whatever structure the app itself uses if there was one (Step 3). Otherwise a solid default shape:

- Quick start / overview (one paragraph: what the module is for)
- Roles — who can do what
- Status / document lifecycle (if the module has workflow states)
- Step-by-step per screen/stage, in the order a user actually moves through them
- Button index (alphabetical, cross-referenced to the relevant step)
- FAQ / error-message lookup (verbatim error strings → what they mean / what to do)

## Step 6 — Package it as a portable skill

Once the guide content is written/extracted:

- `GUIDE.md` (or similarly named) — the actual content, standalone, no platform-specific markup.
- A thin per-platform wrapper (see this repo's [README.md](./README.md)) so the same `GUIDE.md` works as a Claude Skill, a ChatGPT Custom GPT knowledge file, a Gemini Gem knowledge file, or a plain system-prompt attachment elsewhere.
- Don't build an MCP server for this unless the guide needs live data (the content is static reference text — a skill/knowledge file is the right weight, not a tool-calling server).

## Scope note

This methodology is generic across stacks and companies. `examples/iclause-user-guide/` in this repo is one real worked example (ASP.NET MVC app, Indonesian pharma/nutrition company) kept to show the method actually produces something usable — read it as a sample, not as something to copy literally into an unrelated app's guide.
