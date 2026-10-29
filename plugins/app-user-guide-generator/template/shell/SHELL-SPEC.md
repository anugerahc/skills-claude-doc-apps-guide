# gw-guide shell (v1.6.0)

The **shell** is everything around the Guided Tour and the topics: header, search, menu, modal or standalone page,
"Open in new tab", language switch, "in short / full details", Previous/Next, role walkthroughs, and the tour chrome
(chapter chips, progress, captions). It is **framework-agnostic**: vanilla JS + one CSS file, no jQuery, Bootstrap, Vuexy,
Razor, React or build step. The host project only supplies **content** (plain HTML) and one **config** object.

Why it exists: before 1.6 the skill covered the tour engine and the content method, but every project hand-built the
shell (the i-Clause guide did it well, others had to rediscover it). This file is the spec of that shell, taken from the
i-Clause guide, but written so it does not depend on i-Clause, IDC System or any UI library.

```
template/guide-tour.template.js   tour engine (global GwTour, alias GuideTour)  -> copy as gw-tour.js
template/shell/gw-guide.css       shell styles (tokens --gw-*)
template/shell/gw-guide.js        shell (global GwGuide)
template/shell/demo/              plain-HTML demo: index.html (modal) + guide.html (page) - run it with any static server
template/shell/host/              how to wire it into Razor / MVC and SPA (React, Vue, custom element)
template/tools/browser-verify.js  paste in the console: selectors, order, full tour run, topics, search
```

## 1. Wiring (any host)

```html
<link rel="stylesheet" href="gw-guide.css">
<div id="gwContent" hidden> ...topics and mock screens, see section 3... </div>
<button id="helpBtn">Guide</button>
<script src="gw-tour.js"></script><script src="gw-guide.js"></script>
<script>
  var guide = GwGuide.init({
    id: 'orders',                         // namespaces localStorage (language, details switch, tour position, "seen")
    mode: 'modal',                        // 'modal' | 'page' (standalone page: root = element to render in)
    root: '#guideRoot',                   // page mode only
    content: '#gwContent',                // container that holds the topic sections and the mock screens
    title: 'Orders User Guide', subtitle: 'How to create and send an order',   // string or { en:..., id:... }
    icon: 'ti ti-book-2',                 // optional: any icon-font class string, the shell only prints it
    langs: [{ code: 'en', label: 'EN' }, { code: 'id', label: 'ID' }], lang: 'en',
    ui: { id: { search: 'Cari di panduan...' } },  // overrides of UI labels per language (see 5)
    groups: [{ id: 'start', title: 'Start here', topics: [{ key: 'tour', title: 'Guided Tour', icon: '...' }, { key: 'overview', title: { en: 'Overview', id: 'Gambaran umum' } }] }],
    tour: { tourId: 'orders-guide', screens: [ /* same screen objects as the engine */ ], captions: { screenKey: { title: ..., intro: ... } } },
    triggers: '#helpBtn',                 // clicking opens the modal; the button gets the .gw-trigger style and pulses until the guide was opened once
    resolveStart: function (btn) { return { screen: 'detail' }; },   // optional: open at a tour screen / topic depending on the button
    openInTab: { url: '/orders/guide' }   // modal only: adds "Open in new tab" -> the same guide as a page (?topic=&at=&lang=)
  });
</script>
```

API: `guide.open({ topic, screen, at })`, `guide.close()`, `guide.show(topic)`, `guide.setLang(code)`, `guide.walk(name, i)`, `guide.startTour(at)`.
Hooks in the config: `onOpen`, `onClose`, `onShow(key)`, `onLang(code)`.

`features` (all default true except `langSwitch`, which is true when there is more than one language): `search`, `navFilter`, `groups`,
`details`, `prevNext`, `highlight`, `openInTab`. Switch off what a small app does not need.

## 2. Page mode and "Open in new tab"

`mode: 'page'` renders the guide full-window in `cfg.root` (no close button, no "Open in new tab"). It reads `?topic=`, `?at=` (tour screen index),
`?screen=` (tour screen key) and `?lang=`. The modal's "Open in new tab" opens `openInTab.url` with those parameters (a named window, so a second click
reuses the tab), closes the modal and marks the guide as seen. The host needs one extra route/page that renders the same content in page mode.

## 3. Content contract (what the host writes)

All content lives in the hidden `content` container and is **moved** into the shell at start-up.

| Markup | Meaning |
|---|---|
| `<section data-gw-topic="key">` | one topic. `key` must match a `groups[].topics[].key`. Use `h2` for the title, `h3`/`h4` inside. |
| any element with `data-l="en"` | text per language: only the element whose code equals the current language is shown. Write every visible text once per language. |
| `.gw-short` | the "in short" box (shell adds the title). Several allowed (one per language, with `data-l`). |
| `.gw-more` | the details of a topic: hidden until "Show full details" (a single global switch, remembered). If a topic has `.gw-more` the shell inserts the toggle after the last `.gw-short`. A text search always opens them. |
| `.gw-roles` > `button.gw-role[data-walk="x"]` + `.gw-walk[data-walk="x"] > .gw-wstep` | role picker + step-by-step walkthrough. The shell builds progress bar, counter and Previous/Next. |
| `[data-gw-go="topic"]` / `[data-gw-tour="screenKey"]` | a link that opens a topic / jumps to a tour screen. Style it with `.gw-go`. |
| `section#...` named in `tour.screens[].scope` | a mock screen of the tour: the shell moves it into the tour area, keeps it `hidden`, and shows only the screen that is running. |
| `.gw-table`, `.gw-tblwrap`, `.gw-co.tip/warn/note/ex/stop`, `.gw-b.green/yellow/blue/red/grey`, `.gw-flow > .node/.arr`, `.gw-lead`, `.gw-go` | ready-made content blocks styled by `gw-guide.css`. |

The `tour` topic needs no markup: the shell builds it (hero text from `ui.tourLead/tourHow`, chapter chips from the screens' `chapter`, one progress segment per
screen of the chapter, caption from `tour.captions[screenKey]` or `screen.caption`, the engine's bar between screens). Tour screens are the engine's objects:
`{ screenKey, scope, chapter, steps: [{ selector, id: {title,text}, en: {...}, act? }] }`, `chapter` is a string or `{ code: text }`.

### Mock screens (important, this is where guides go wrong)

* The mock is **the page content only**, like the i-Clause guide. Do **not** draw the application's own sidebar, topbar or window frame around it: it wastes
  width and the user already knows it. (The 1.5.0 template said "whole page with topbar and nav"; that is superseded: a whole *page* means the page's own
  header, toolbar, cards and table, not the application chrome.) A frame stays possible per screen if one is truly needed.
* The mock uses the real page's markup and classes. The real stylesheet usually scopes rules to ids (`#MyForm .card`), which a mock cannot reuse (duplicate
  ids): generate a copy of those rules scoped to a wrapper class (e.g. `.my-real`), with ids replaced by classes. Keep a script for it in the project.
* One mock element per control, marked `data-mock="..."` and found through the screen's `scope`. Never use ids inside the mock except on the screen root.
* The shell's CSS never touches the mock; its own modal width rule is on `.gw-modal` only, so dialogs drawn inside mocks keep their real width.
* A tab strip / filter row / table header must keep the **same column cells as the real table** (one filter cell per column), or it looks misaligned.
* Dialogs inside mocks are static: no fixed/absolute, no backdrop.

## 4. Theming (tokens)

Override on `:root`, `.gw-overlay` or `.gw-root`: `--gw-accent`, `--gw-accent-2`, `--gw-accent-soft`, `--gw-accent-line`, `--gw-accent-ink`, `--gw-text`,
`--gw-heading`, `--gw-muted`, `--gw-border`, `--gw-border-2`, `--gw-nav-bg`, `--gw-nav-hover`, `--gw-radius`, `--gw-font`, `--gw-nav-w` (300px),
`--gw-max-w` (1640px), `--gw-body-h` (84vh), `--gw-z` (20000, above fixed navbars and sidebars of common admin themes; the tour bubble is 99992, above everything).

## 5. UI labels

`ui[lang]` (or a flat `ui` for a one-language guide) overrides any of: `search, filter, openTab, openTabTitle, close, prev, next, inShort, showDetails, hideDetails,
noTopic, noText, language, pickRole, step, stepOf, popBlocked, tourLead, tourHow, restart, chapter, screen`. Missing keys fall back to English. The tour
bubble strings (`next, back, skip, step, of, complete, replay, ...`) have built-in `id`/`en`; any other language: `tour.strings = { fr: { next: 'Suivant', ... } }`.

## 6. Parity with the i-Clause guide (measured)

Modal `min(1640px, 96vw)`, body height `84vh`, menu 300px, main padding `22px 30px 30px`, text `.9375rem/1.55`, gradient header with title/subtitle, search on the right
(260px), "Open in new tab" + close, collapsible menu groups (first open), menu filter + whole-text search with `<mark>` highlight, topics with "In short" box and
"Show full details" (global, remembered), Previous/Next at the bottom of the content, role cards with walkthrough, tour with hero text, numbered chapter chips,
progress segments, "Screen n of m", a title + intro above every mock, mobile layout (column) under 992px. The shell reproduces all of these.

## 7. Verify before you say it is done

1. `node template/tools/lint-id-text.js` on the texts (ID text rules unchanged).
2. Open the guide in a real browser and paste `template/tools/browser-verify.js` in the console: it reports missing selectors, order violations, opens every
   topic, runs the search, and clicks the whole tour to the end counting console errors.
3. Look at screenshots of: the modal (wide), a topic with details, a mock screen next to the real page (columns aligned?), a dialog mock, the page mode.
4. Real-browser widths 1366 / 1920 and a phone width. Say plainly if a width was not tested.
