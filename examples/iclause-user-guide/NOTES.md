# About this example

`GUIDE.md` in this folder is a real worked example of [`SKILL.md`](../../SKILL.md)'s methodology, Step 2–3 (found an existing in-app guide, extracted it verbatim).

- **Source:** the i-Clause module (Post-Launch Evaluation) of a company's internal IDC System (ASP.NET MVC). The app has a built-in, hand-written "User Guide" page (`_UserGuideBody.cshtml`), opened from a "User Guide" button in the module itself — it just hadn't been merged from its dev branch into the branch that was checked out when this was first looked for.
- **Extraction:** pulled the exact file from its git ref, stripped HTML/CSS/Razor markup, kept the wording unchanged (button labels, error messages, status names all verbatim).
- **Not included:** anything inferred from reading the module's controllers/views as a developer would — that was tried first, was wrong, and was thrown out. Only the real, existing guide content is in `GUIDE.md`.

This is here so the generic skill has a concrete, non-trivial proof that the method works — not as a template to copy into an unrelated module's guide. The module's internal role names (PSD/PDV/QFS), workflow and field names are specific to that one company's business process.
