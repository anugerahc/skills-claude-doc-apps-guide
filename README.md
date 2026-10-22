# App User Guide Generator — portable AI skill

A skill that teaches an AI assistant how to produce an **accurate end-user guide** for any app/module from its source code — and, critically, how to find and reuse an app's *own* existing help content instead of reconstructing one from reading controllers/views (which produces a developer's mental model dressed up as user docs).

Works cross-stack, cross-company. Not tied to Claude — see platform instructions below.

- [`SKILL.md`](./SKILL.md) — the methodology (read this first).
- [`examples/iclause-user-guide/`](./examples/iclause-user-guide/) — one real worked example, kept to prove the method produces something usable.

## Claude Code / Claude.ai Projects

Plug-and-play: put this whole repo (or just `SKILL.md`) at `.claude/skills/app-user-guide-generator/` in a project and Claude Code auto-detects it. For claude.ai, upload `SKILL.md` as Project Knowledge.

## ChatGPT (Custom GPT / Project)

1. Create a Custom GPT (or ChatGPT Project).
2. Upload `SKILL.md` as a **Knowledge file**.
3. Instructions: *"Follow the methodology in the uploaded SKILL.md when asked to write or extract a user guide for an app module. Always look for an existing in-app guide across all git branches before writing anything from reading code."*

## Google Gemini (Gem)

1. Create a new Gem.
2. Under "Knowledge", upload `SKILL.md`.
3. Instruction: same as the ChatGPT one above.

## Other platforms / generic (plain system prompt)

If the platform only takes a system prompt plus files (no dedicated "knowledge" feature):

1. Paste the content of `SKILL.md` as the system prompt.
2. Attach it as a reference file too if the platform supports file context, so long guides don't get summarized away.

## Using it

Once loaded, just ask the assistant to generate a user guide for a given module/app — point it at the repo/codebase and (if you know it) where the module's own help/guide content might live. It will look for the real thing first, extract verbatim if found, and only reconstruct from code as a fallback — following `SKILL.md`.
