# Wiring gw-guide into a host

The shell has no opinion about the host. A host adapter is only: (1) load `gw-guide.css`, `gw-tour.js`, `gw-guide.js`; (2) render the content container;
(3) call `GwGuide.init(config)`; (4) for "Open in new tab", expose one more route that renders the same content in `mode: 'page'`.

## Plain HTML / any static site

See `../demo/index.html` and `../demo/guide.html` (the page mode opened by "Open in new tab"). Serve the folder with any static server.

## ASP.NET MVC / Razor (the i-Clause, i-Sure and RASIO guides)

Partial `_UserGuide.cshtml` (included on the module's list and detail pages; the trigger buttons are ordinary buttons with an id):

```cshtml
<div id="guideContent" hidden>
    <partial name="_UserGuideTopics.cshtml" />   @* <section data-gw-topic="..."> blocks *@
    <partial name="_UserGuideFrags.cshtml" />    @* the mock screens of the tour *@
</div>
<script>window.MyGuideCfg = { guideUrl: '@Url.Action("Guide", "MyModule")' };</script>
```

Page `Guide.cshtml` (`Layout = null`): the same partial, `<div id="guideRoot"></div>`, `window.MyGuideCfg.mode = 'page'`, plus the host's own CSS that the mocks need
(for a Vuexy app: its core CSS and icon fonts). Controller: `public IActionResult Guide() => View("~/Views/MyModule/Guide.cshtml");` (same access rule as the module).

Script order on a page: `gw-tour.js`, `gw-guide.js`, the tour step files (they push into one array), then the config file that calls `GwGuide.init`. Razor note:
a literal at-sign in HTML or CSS inside a .cshtml is written twice.

## React / Vue / Angular / Next

The shell is a plain browser script, so use it from a client-side effect. React:

```jsx
useEffect(() => {
  const g = window.GwGuide.init({ id: 'orders', mode: 'modal', content: '#gwContent', groups, tour, triggers: '#helpBtn', openInTab: { url: '/guide' } });
  return () => g.destroy && g.destroy();
}, []);
// render <div id="gwContent" hidden dangerouslySetInnerHTML={{ __html: contentHtml }} /> yourself (or build the sections with JSX: the shell only moves DOM nodes)
```

For a framework-neutral drop-in, register a custom element once:

```js
customElements.define('gw-guide', class extends HTMLElement {
  connectedCallback() { const cfg = window[this.getAttribute('config')]; this.guide = GwGuide.init(Object.assign({ mode: 'page', root: this }, cfg)); }
});
// <gw-guide config="ORDERS_GUIDE_CONFIG"></gw-guide>   (the content container must already be in the DOM)
```

## Mock screens from a UI library

The mocks reuse the real markup. When the real stylesheet is id-scoped, generate the copy that applies under a wrapper class (see SHELL-SPEC section 3). The
shell never loads the library: the host page (or the standalone page) loads it, exactly as the real screen does.
