# Changelog

## 1.6.1

- Shell: topics fill the whole content width by default (`--gw-sec-max`, was a fixed 1120px column); `.gw-svg` for inline SVG flowcharts (a status flow is drawn as boxes + labelled arrows + dashed reject loops instead of rows of chips); z-index default 20000; tour tooltip is sized for its full text and kept inside the viewport (fixes a last step whose button ended below the screen).

## 1.6.0

- **New: guide shell** (`template/shell/`): framework-agnostic, vanilla JS + CSS (no jQuery, Bootstrap, Vuexy or Razor). Modal or standalone page with
  "Open in new tab", whole-guide search with highlight, topic filter, collapsible menu groups, "In short" + "Show full details", Previous/Next, role
  walkthroughs, language switch, tour chrome (chapter chips, progress, a title and intro above every mock). Themed with `--gw-*` tokens, driven by one config
  object and plain-HTML content. Includes `SHELL-SPEC.md`, a plain-HTML demo (`demo/`) and host notes (`host/README.md`: Razor/MVC, React/Vue, custom element).
- **Tour engine** (`guide-tour.template.js`): the four project patches of 1.5.0 are folded in (`onLangChange`, `chapter` as `{ lang: text }`, `stop()` removes
  the running tooltip and keeps the saved position, `reset()` clears it), and the UI is language-agnostic (`opts.langs`, `opts.strings`, built-in id/en). `GwTour` is
  an alias of `GuideTour`. `enginetest.js` covers it.
- **New gate**: `template/tools/browser-verify.js` (paste in the console): selectors, order, every topic, search, whole tour to the end.
- **Core doc**: 5b-C corrected (mock = the page content, not the application frame; one filter cell per column) and new section 5c (the shell).
- Proof of generality: the RASIO guide of IDC System was migrated to this shell (Vuexy/ASP.NET host) and the same shell runs the plain-HTML demo.

## 1.5.0

One end-to-end Guided Tour (no role picker), global numbering + chapters, full-page mocks, static gates.
