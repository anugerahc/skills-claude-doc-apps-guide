/*! gw-guide 1.6.0 - framework-agnostic user guide shell. Vanilla JS, no dependencies (jQuery/Bootstrap/Vuexy not needed).
 *
 * What it gives you (each part can be switched off in cfg.features):
 *   modal OR standalone page (the modal has "Open in new tab"), whole-guide search with highlight, topic filter, collapsible menu groups,
 *   "in short" + "show full details" topics, Previous/Next, role walkthroughs, language switch, and the Guided Tour (needs guide-tour.js = GwTour).
 *
 * The host writes the CONTENT as plain HTML in a hidden container (see SHELL-SPEC.md for the markup contract) and calls:
 *   var guide = GwGuide.init({ id, title, subtitle, langs, ui, groups, content: '#gwContent', tour: {...}, triggers: '.my-help-btn', openInTab: { url } });
 *   guide.open({ topic, screen, at })   guide.close()   guide.show(topic)   guide.setLang(code)
 */
(function (global) {
    'use strict';

    var UI_DEFAULT = {
        search: 'Search the guide...', filter: 'Filter topics...', openTab: 'Open in new tab',
        openTabTitle: 'Open the guide in its own tab, so you can keep working while you read', close: 'Close',
        prev: 'Previous', next: 'Next', inShort: 'In short', showDetails: 'Show full details', hideDetails: 'Hide details',
        noTopic: 'No topic matches.', noText: 'Nothing in the guide matches your search.', language: 'Language', pickRole: 'Pick a role to see its steps.',
        step: 'Step', stepOf: 'of', popBlocked: 'Your browser blocked the new tab. Allow pop-ups for this site, then try again.',
        tourLead: '', tourHow: '', restart: 'Restart tour', chapter: 'Chapter', screen: 'Screen', seeInTour: 'See the screen in the Guided Tour'
    };

    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function q(sel, root) { return typeof sel === 'string' ? (root || document).querySelector(sel) : sel; }
    function qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    function mk(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
    function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked: the guide still works, it just forgets */ } }

    function Guide(cfg) {
        var self = this;
        cfg = self.cfg = Object.assign({ id: 'guide', mode: 'modal', title: 'User Guide', subtitle: '', icon: '', langs: [{ code: 'en', label: 'EN' }], ui: {}, features: {}, groups: [], content: null, tour: null, triggers: '', openInTab: null, root: null }, cfg);
        self.mode = cfg.mode === 'page' ? 'page' : 'modal';
        var f = self.f = Object.assign({ search: true, navFilter: true, groups: true, details: true, prevNext: true, highlight: true, langSwitch: cfg.langs.length > 1, openInTab: !!cfg.openInTab && self.mode === 'modal' }, cfg.features);
        self.lang = lsGet('gwLang:' + cfg.id) || cfg.lang || cfg.langs[0].code;
        if (!cfg.langs.some(function (l) { return l.code === self.lang; })) self.lang = cfg.langs[0].code;
        self.cur = null; self.seq = null; self.tourIdx = 0; self.langOverride = false;
        self.build();
        self.bind();
        self.applyLang();
        if (self.mode === 'page') self.openFromUrl();
    }

    var P = Guide.prototype;

    // ---------- text helpers ----------
    P.ui = function (key) {
        var u = this.cfg.ui || {}, own = (u[this.lang] && typeof u[this.lang] === 'object') ? u[this.lang] : u;
        return (own && own[key] != null) ? own[key] : UI_DEFAULT[key];
    };
    // string, or { code: text } -> one span per language (shown/hidden by applyLang)
    P.ml = function (v) {
        if (v == null) return '';
        if (typeof v !== 'object') return esc(v);
        return this.cfg.langs.map(function (l) { return '<span data-l="' + l.code + '">' + esc(v[l.code] != null ? v[l.code] : (v.en != null ? v.en : '')) + '</span>'; }).join('');
    };
    P.plain = function (v) { return v && typeof v === 'object' ? (v[this.lang] != null ? v[this.lang] : (v.en || '')) : (v || ''); };

    // ---------- build ----------
    P.build = function () {
        var self = this, cfg = self.cfg, f = self.f, content = cfg.content ? q(cfg.content) : null;
        var root = self.root = mk('div', 'gw-root' + (self.mode === 'page' ? ' gw-standalone' : ''));
        var head = '<div class="gw-head">' + (cfg.icon ? '<i class="gw-head-ic ' + esc(cfg.icon) + '"></i>' : '')
            + '<div class="gw-head-t"><h5 class="gw-title">' + self.ml(cfg.title) + '</h5><div class="gw-sub">' + self.ml(cfg.subtitle) + '</div></div>'
            + (f.search ? '<input type="search" class="gw-search" data-ui-ph="search" autocomplete="off">' : '')
            + (f.openInTab ? '<button type="button" class="gw-hbtn" data-gw="pop" data-ui-title="openTabTitle"><span class="gw-ico-ext"></span><span data-ui="openTab"></span></button>' : '')
            + (self.mode === 'modal' ? '<button type="button" class="gw-close" data-gw="close" data-ui-label="close">×</button>' : '')
            + '</div>';

        var topics = [], nav = '';
        if (f.navFilter) nav += '<div class="gw-navsearch"><input type="search" class="gw-navfilter" data-ui-ph="filter" autocomplete="off"></div>';
        nav += '<div class="gw-navnone" data-ui="noTopic" hidden></div>';
        cfg.groups.forEach(function (g, gi) {
            var open = g.open != null ? g.open : gi === 0;
            nav += '<div class="gw-group' + (open || !f.groups ? '' : ' collapsed') + '" data-gw-group="' + esc(g.id || gi) + '">'
                + '<div class="gw-grp" role="button" tabindex="0" aria-expanded="' + (open ? 'true' : 'false') + '"><span>' + self.ml(g.title) + '</span><i class="gw-chev"></i></div><div class="gw-items">';
            (g.topics || []).forEach(function (t) {
                topics.push(t.key);
                nav += '<button type="button" class="gw-ni" data-gw-topic="' + esc(t.key) + '" data-kw="' + esc(t.keywords || '') + '">' + (t.icon ? '<i class="' + esc(t.icon) + '"></i>' : '') + '<span>' + self.ml(t.title) + '</span></button>';
            });
            nav += '</div></div>';
        });
        if (f.langSwitch) nav += '<div class="gw-grp" style="cursor:default"><span data-ui="language"></span></div><div class="gw-lang">'
            + cfg.langs.map(function (l) { return '<button type="button" class="gw-langbtn" data-gw-lang="' + esc(l.code) + '">' + esc(l.label) + '</button>'; }).join('') + '</div>';
        self.topics = topics;

        root.innerHTML = head + '<div class="gw-body"><nav class="gw-nav">' + nav + '</nav><div class="gw-main"><div class="gw-sections"></div><div class="gw-none" data-ui="noText" hidden></div>'
            + (f.prevNext ? '<div class="gw-pn"><button type="button" data-gw="prev"><span data-ui="prev"></span></button><button type="button" data-gw="next"><span data-ui="next"></span></button></div>' : '')
            + '</div></div>';
        self.main = q('.gw-main', root);
        var sections = q('.gw-sections', root);

        topics.forEach(function (key) {
            var sec;
            if (key === 'tour' && cfg.tour) sec = self.buildTour();
            else {
                sec = content && q('[data-gw-topic="' + key + '"]', content);
                if (!sec) { if (global.console) console.warn('gw-guide: topic without content:', key); return; }
                sec.parentNode.removeChild(sec);
            }
            sec.classList.add('gw-sec'); sec.setAttribute('data-gw-topic', key);
            sections.appendChild(sec);
        });
        // "in short" boxes get a title, topics with details get the toggle
        qa('.gw-sec', root).forEach(function (sec) {
            qa('.gw-short', sec).forEach(function (s) { if (!q('.t', s)) s.insertBefore(mk('div', 't', '<span data-ui="inShort"></span>'), s.firstChild); });
            if (f.details && q('.gw-more', sec)) {
                var shorts = qa('.gw-short', sec), last = shorts[shorts.length - 1];
                var btn = mk('button', 'gw-moretoggle', '<span class="s-show" data-ui="showDetails"></span><span class="s-hide" data-ui="hideDetails"></span>');
                btn.type = 'button'; btn.setAttribute('data-gw', 'more');
                if (last) last.parentNode.insertBefore(btn, last.nextSibling); else sec.insertBefore(btn, q('.gw-more', sec));
            }
        });
        // role walkthroughs: progress bar, counter and Previous/Next are built from the steps
        qa('.gw-walk', root).forEach(function (w) {
            var n = qa('.gw-wstep', w).length, h = '';
            for (var k = 0; k < n; k++) h += '<span></span>';
            w.insertBefore(mk('div', 'gw-wcount'), w.firstChild); w.insertBefore(mk('div', 'gw-wprog', h), w.firstChild);
            w.appendChild(mk('div', 'gw-wnav', '<button type="button" class="wprev" data-ui="prev"></button><button type="button" class="wnext" data-ui="next"></button>'));
        });
        qa('.gw-roles', root).forEach(function (r) { if (!r.nextElementSibling || !r.nextElementSibling.classList.contains('gw-walkhint')) r.parentNode.insertBefore(mk('div', 'gw-walkhint', '<span data-ui="pickRole"></span>'), r.nextSibling); });

        if (self.mode === 'modal') {
            var ov = self.overlay = mk('div', 'gw-overlay'); ov.hidden = true;
            var md = mk('div', 'gw-modal'); md.setAttribute('role', 'dialog'); md.setAttribute('aria-modal', 'true'); md.appendChild(root); ov.appendChild(md);
            document.body.appendChild(ov);
        } else {
            var host = q(cfg.root) || document.body; host.appendChild(root);
        }
        if (lsGet('gwDetails:' + cfg.id) === '1') self.main.classList.add('gw-open');
    };

    P.buildTour = function () {
        var self = this, cfg = self.cfg, t = cfg.tour, sec = mk('section');
        sec.innerHTML = '<div class="gw-hero"><p class="gw-lead" data-tour="lead"></p><p class="gw-how" data-tour="how"></p></div>'
            + '<div class="gw-chaps" data-tour="chaps"></div>'
            + '<div class="gw-tourtop"><span class="gw-tcount" data-tour="count"></span><button type="button" class="gw-btn-sm" data-gw="restart" data-ui="restart"></button></div>'
            + '<div class="gw-tprog" data-tour="prog"></div>'
            + '<div class="gw-cap"><h6 data-tour="capT"></h6><p data-tour="capP"></p></div>'
            + '<div class="gw-walkarea"><div class="gw-screenbar"></div></div>';
        var area = q('.gw-walkarea', sec), bar = q('.gw-screenbar', sec);
        self.screenBar = bar;
        self.tourScreens().forEach(function (s) {
            var m = q(s.scope); if (!m) { if (global.console) console.warn('gw-guide: tour screen not found:', s.scope); return; }
            m.hidden = true; area.insertBefore(m, bar);
        });
        return sec;
    };
    P.tourScreens = function () { var s = this.cfg.tour && this.cfg.tour.screens; return typeof s === 'function' ? s() : (s || []); };

    // ---------- events ----------
    P.bind = function () {
        var self = this, root = self.root, cfg = self.cfg;
        root.addEventListener('click', function (e) {
            var t = e.target, a;
            if ((a = t.closest('[data-gw]'))) { var act = a.getAttribute('data-gw'); if (act === 'close') self.close(); else if (act === 'pop') self.openInTab(); else if (act === 'prev') self.step(-1); else if (act === 'next') self.step(1); else if (act === 'more') self.toggleDetails(); else if (act === 'restart') { if (self.seq) self.seq.reset(); self.startTour(0); } return; }
            if ((a = t.closest('.gw-ni'))) { self.show(a.getAttribute('data-gw-topic')); return; }
            if ((a = t.closest('.gw-grp[role="button"]'))) { self.toggleGroup(a); return; }
            if ((a = t.closest('[data-gw-lang]'))) { self.setLang(a.getAttribute('data-gw-lang'), true); return; }
            if ((a = t.closest('[data-gw-go]'))) { self.show(a.getAttribute('data-gw-go')); return; }
            if ((a = t.closest('[data-gw-tour]'))) { self.show('tour', self.screenIndex(a.getAttribute('data-gw-tour'))); return; }
            if ((a = t.closest('.gw-role'))) { self.walk(a.getAttribute('data-walk'), 0); return; }
            if ((a = t.closest('.gw-wprog span'))) { var w = a.closest('.gw-walk'); self.walk(w.getAttribute('data-walk'), Array.prototype.indexOf.call(a.parentNode.children, a)); return; }
            if ((a = t.closest('.gw-wnav button'))) { var w2 = a.closest('.gw-walk'); self.walk(w2.getAttribute('data-walk'), (w2._i || 0) + (a.classList.contains('wnext') ? 1 : -1)); return; }
            if ((a = t.closest('.gw-chap'))) { self.startTour(parseInt(a.getAttribute('data-first'), 10)); return; }
            if ((a = t.closest('.gw-tprog span'))) { self.startTour(parseInt(a.getAttribute('data-idx'), 10)); return; }
        });
        root.addEventListener('keydown', function (e) { var a = e.target.closest && e.target.closest('.gw-grp[role="button"]'); if (a && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); self.toggleGroup(a); } });
        var t1; root.addEventListener('input', function (e) { if (e.target.matches('.gw-search, .gw-navfilter')) { clearTimeout(t1); t1 = setTimeout(function () { self.refresh(); }, 150); } });
        if (self.overlay) {
            self.overlay.addEventListener('mousedown', function (e) { if (e.target === self.overlay) self.close(); });
            document.addEventListener('keydown', function (e) { if (!self.dead && e.key === 'Escape' && !self.overlay.hidden && !document.querySelector('.gt-tip:focus-within')) self.close(); });
        }
        if (cfg.triggers) {
            var seen = lsGet('gwSeen:' + cfg.id) === '1';
            qa(cfg.triggers).forEach(function (b) { b.classList.add('gw-trigger'); if (!seen) b.classList.add('gw-pulse'); });
            document.addEventListener('click', function (e) {
                var b = e.target.closest && e.target.closest(cfg.triggers); if (!b || self.dead) return;
                e.preventDefault();
                var start = cfg.resolveStart ? cfg.resolveStart(b) : { topic: b.getAttribute('data-gw-topic'), screen: b.getAttribute('data-gw-screen') };
                self.open(start || {});
            });
        }
    };

    // ---------- language / ui text ----------
    P.applyLang = function () {
        var self = this, l = self.lang;
        qa('[data-l]', self.root).forEach(function (e) { e.hidden = e.getAttribute('data-l') !== l; });
        qa('[data-ui]', self.root).forEach(function (e) { e.textContent = self.ui(e.getAttribute('data-ui')); });
        qa('[data-ui-ph]', self.root).forEach(function (e) { e.placeholder = self.ui(e.getAttribute('data-ui-ph')); });
        qa('[data-ui-title]', self.root).forEach(function (e) { e.title = self.ui(e.getAttribute('data-ui-title')); });
        qa('[data-ui-label]', self.root).forEach(function (e) { e.setAttribute('aria-label', self.ui(e.getAttribute('data-ui-label'))); });
        qa('.gw-langbtn', self.root).forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-gw-lang') === l); });
        if (self.cfg.tour) self.tourChrome(self.tourIdx);
        qa('.gw-walk.on', self.root).forEach(function (w) { self.walk(w.getAttribute('data-walk'), w._i || 0); });
    };
    P.setLang = function (code, restartTour) {
        this.lang = code; lsSet('gwLang:' + this.cfg.id, code); this.langOverride = true;
        this.applyLang();
        if (restartTour && this.seq) this.startTour(this.tourIdx);
        if (this.cfg.onLang) this.cfg.onLang(code);
    };

    // ---------- topics ----------
    P.order = function () { var self = this; return self.topics.filter(function (k) { var b = q('.gw-ni[data-gw-topic="' + k + '"]', self.root); return b && !b.classList.contains('gw-hide'); }); };
    P.show = function (key, tourAt) {
        var self = this, sec = q('.gw-sec[data-gw-topic="' + key + '"]', self.root);
        if (!sec) return;
        if (self.cur === 'tour' && key !== 'tour') self.stopTour();
        self.cur = key;
        qa('.gw-sec', self.root).forEach(function (s) { s.classList.remove('active'); }); sec.classList.add('active');
        var btn = qa('.gw-ni', self.root).map(function (b) { b.classList.remove('active'); return b; }).filter(function (b) { return b.getAttribute('data-gw-topic') === key; })[0];
        if (btn) {
            btn.classList.add('active');
            if (!q('.gw-nav', self.root).classList.contains('searching')) { var g = btn.closest('.gw-group'); if (g) { g.classList.remove('collapsed'); q('.gw-grp', g).setAttribute('aria-expanded', 'true'); } }
            if (btn.scrollIntoView) btn.scrollIntoView({ block: 'nearest' });
        }
        q('.gw-none', self.root).hidden = true;
        self.highlight(sec, q('.gw-search', self.root) ? q('.gw-search', self.root).value : '');
        self.main.scrollTop = 0;
        var vis = self.order(), i = vis.indexOf(key), pv = q('[data-gw="prev"]', self.root), nx = q('[data-gw="next"]', self.root);
        if (pv) { pv.disabled = i <= 0; pv._to = vis[i - 1]; }
        if (nx) { nx.disabled = i < 0 || i >= vis.length - 1; nx._to = vis[i + 1]; }
        if (key === 'tour' && self.cfg.tour) self.startTour(tourAt);
        if (self.cfg.onShow) self.cfg.onShow(key);
    };
    P.step = function (d) { var self = this, b = q('[data-gw="' + (d < 0 ? 'prev' : 'next') + '"]', self.root); if (b && b._to) self.show(b._to); };
    P.toggleGroup = function (h) { var g = h.closest('.gw-group'); g.classList.toggle('collapsed'); h.setAttribute('aria-expanded', !g.classList.contains('collapsed')); };
    P.toggleDetails = function () { var on = this.main.classList.toggle('gw-open'); lsSet('gwDetails:' + this.cfg.id, on ? '1' : '0'); };

    // ---------- search ----------
    P.highlight = function (rootEl, term) {
        qa('mark.gw-mark', rootEl).forEach(function (m) { m.replaceWith(document.createTextNode(m.textContent)); });
        rootEl.normalize();
        term = (term || '').trim();
        if (!this.f.highlight || term.length < 2) return;
        var re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), nodes = [], w = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
        while (w.nextNode()) { re.lastIndex = 0; if (re.test(w.currentNode.nodeValue) && !w.currentNode.parentNode.closest('script,style')) nodes.push(w.currentNode); }
        nodes.forEach(function (n) {
            var frag = document.createDocumentFragment(), txt = n.nodeValue, last = 0, m; re.lastIndex = 0;
            while ((m = re.exec(txt)) !== null) {
                frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
                var mm = document.createElement('mark'); mm.className = 'gw-mark'; mm.textContent = m[0]; frag.appendChild(mm);
                last = m.index + m[0].length; if (m[0].length === 0) re.lastIndex++;
            }
            frag.appendChild(document.createTextNode(txt.slice(last))); n.parentNode.replaceChild(frag, n);
        });
        var first = q('mark.gw-mark', rootEl); if (first && first.scrollIntoView) first.scrollIntoView({ block: 'center' });
    };
    // the header box searches the full text of every topic (and the tour steps), the menu box filters topic titles and keywords
    P.refresh = function () {
        var self = this, sb = q('.gw-search', self.root), nb = q('.gw-navfilter', self.root);
        var ct = (sb ? sb.value : '').trim().toLowerCase(), mt = (nb ? nb.value : '').trim().toLowerCase(), cOn = ct.length >= 2, mOn = mt.length >= 2, any = false;
        var tourText = '';
        if (cOn && self.cfg.tour) tourText = JSON.stringify(self.tourScreens().map(function (s) { return s.steps; })).toLowerCase();
        qa('.gw-sec', self.root).forEach(function (sec) {
            var key = sec.getAttribute('data-gw-topic'), b = q('.gw-ni[data-gw-topic="' + key + '"]', self.root);
            var hitC = !cOn || (key === 'tour' ? tourText.indexOf(ct) !== -1 : sec.textContent.toLowerCase().indexOf(ct) !== -1);
            var meta = (b.textContent + ' ' + (b.getAttribute('data-kw') || '') + ' ' + b.closest('.gw-group').querySelector('.gw-grp').textContent).toLowerCase();
            var hitM = !mOn || meta.indexOf(mt) !== -1;
            b.classList.toggle('gw-hide', !(hitC && hitM)); b.hidden = !(hitC && hitM);
            any = any || (hitC && hitM);
        });
        q('.gw-nav', self.root).classList.toggle('searching', cOn || mOn);
        self.main.classList.toggle('searching', cOn);
        qa('.gw-group', self.root).forEach(function (g) { g.hidden = !qa('.gw-ni', g).some(function (b) { return !b.hidden; }); });
        q('.gw-navnone', self.root).hidden = any;
        var pn = q('.gw-pn', self.root); if (pn) pn.hidden = !any;
        if (!any) { qa('.gw-sec', self.root).forEach(function (s) { s.classList.remove('active'); }); q('.gw-none', self.root).hidden = !cOn; return; }
        var vis = self.order(); self.show(vis.indexOf(self.cur) !== -1 ? self.cur : vis[0]);
    };

    // ---------- role walkthroughs ----------
    P.walk = function (name, i) {
        var self = this, w = q('.gw-walk[data-walk="' + name + '"]', self.root); if (!w) return;
        var steps = qa('.gw-wstep', w); i = Math.max(0, Math.min(i || 0, steps.length - 1)); w._i = i;
        qa('.gw-role', self.root).forEach(function (r) { r.classList.toggle('on', r.getAttribute('data-walk') === name); });
        qa('.gw-roles', self.root).forEach(function (r) { r.classList.add('picked'); });
        qa('.gw-walk', self.root).forEach(function (x) { x.classList.remove('on'); }); w.classList.add('on');
        steps.forEach(function (s, k) { s.classList.toggle('on', k === i); });
        qa('.gw-wprog span', w).forEach(function (s, k) { s.classList.toggle('done', k < i); s.classList.toggle('cur', k === i); });
        q('.gw-wcount', w).textContent = self.ui('step') + ' ' + (i + 1) + ' ' + self.ui('stepOf') + ' ' + steps.length;
        q('.wprev', w).disabled = i === 0; q('.wnext', w).disabled = i === steps.length - 1;
    };

    // ---------- Guided Tour ----------
    P.screenIndex = function (key) { var r; this.tourScreens().forEach(function (s, i) { if (r == null && s.screenKey === key) r = i; }); return r; };
    P.chapters = function () {
        var out = [], seen = {}, self = this;
        self.tourScreens().forEach(function (s, i) { var k = typeof s.chapter === 'object' ? JSON.stringify(s.chapter) : s.chapter; if (!seen[k]) { seen[k] = 1; out.push({ name: s.chapter, first: i }); } });
        return out;
    };
    P.tourChrome = function (idx) {
        var self = this, screens = self.tourScreens(), scr = screens[idx], sec = q('.gw-sec[data-gw-topic="tour"]', self.root);
        if (!sec) return;
        self.tourIdx = idx;
        var set = function (k, v) { var e = q('[data-tour="' + k + '"]', sec); if (e) e.textContent = v; };
        set('lead', self.ui('tourLead')); set('how', self.ui('tourHow'));
        var chaps = self.chapters(), cur = 0, hasLead = !!self.ui('tourLead') || !!self.ui('tourHow');
        q('.gw-hero', sec).hidden = !hasLead;
        if (!scr) return;
        chaps.forEach(function (c, n) { if (c.first <= idx) cur = n; });
        q('[data-tour="chaps"]', sec).innerHTML = chaps.map(function (c, n) { return '<button type="button" class="gw-chap' + (n === cur ? ' on' : '') + '" data-first="' + c.first + '"><span>' + (n + 1) + '</span>' + esc(self.plain(c.name)) + '</button>'; }).join('');
        var inChap = screens.filter(function (s) { return JSON.stringify(s.chapter) === JSON.stringify(scr.chapter); }), pos = inChap.indexOf(scr) + 1;
        set('count', self.ui('chapter') + ' ' + (cur + 1) + ' ' + self.ui('stepOf') + ' ' + chaps.length + ' · ' + self.plain(scr.chapter) + ' · ' + self.ui('screen') + ' ' + pos + ' ' + self.ui('stepOf') + ' ' + inChap.length);
        q('[data-tour="prog"]', sec).innerHTML = inChap.map(function (s) { var i = screens.indexOf(s); return '<span data-idx="' + i + '" class="' + (i < idx ? 'done' : (i === idx ? 'cur' : '')) + '"></span>'; }).join('');
        var cap = (self.cfg.tour.captions || {})[scr.screenKey] || scr.caption;
        set('capT', cap ? self.plain(cap.title) : ''); set('capP', cap ? self.plain(cap.intro) : '');
    };
    P.startTour = function (at) {
        var self = this, T = self.cfg.tour, screens = self.tourScreens();
        if (!T || !screens.length || !global.GwTour) { if (T && !global.GwTour && global.console) console.warn('gw-guide: GwTour (guide-tour.js) is not loaded'); return; }
        self.stopTour();
        var tourId = T.tourId || self.cfg.id, saved = global.GwTour.getSavedProgress(tourId);
        var idx = typeof at === 'number' && !isNaN(at) ? at : (saved && typeof saved.screenIndex === 'number' ? saved.screenIndex : 0);
        if (idx < 0 || idx >= screens.length) idx = 0;
        self.tourChrome(idx);
        self.seq = global.GwTour.runSequence(screens, {
            tourId: tourId, lang: self.lang, langs: self.cfg.langs, strings: T.strings, container: self.screenBar, startAt: idx,
            onScreenChange: function (i, scr) {
                qa('.gw-walkarea > [id], .gw-walkarea > section', self.root).forEach(function (e) { e.hidden = true; });
                var m = q(scr.scope); if (m) m.hidden = false;
                self.tourChrome(i);
            },
            onLangChange: function (l) { self.lang = l; lsSet('gwLang:' + self.cfg.id, l); self.applyLang(); },
            onOpenDetail: function () { var first = self.topics.filter(function (k) { return k !== 'tour'; })[0]; self.show(T.detailTopic || first); },
            onSkip: function () { self.seq = null; }
        });
    };
    P.stopTour = function () { if (this.seq) { this.seq.stop(); this.seq = null; } };

    // ---------- open / close ----------
    P.open = function (o) {
        var self = this; o = o || {};
        if (self.overlay) { self.lastFocus = document.activeElement; self.overlay.hidden = false; document.body.classList.add('gw-lock'); var c = q('.gw-close', self.root); if (c) c.focus(); }
        lsSet('gwSeen:' + self.cfg.id, '1'); qa('.gw-trigger').forEach(function (b) { b.classList.remove('gw-pulse'); });
        var topic = o.topic || (self.cfg.tour ? 'tour' : self.topics[0]);
        var at = o.at != null ? parseInt(o.at, 10) : (o.screen ? self.screenIndex(o.screen) : undefined);
        if (self.seq === null && topic === 'tour') self.cur = null;
        self.show(topic, at);
        if (self.cfg.onOpen) self.cfg.onOpen();
    };
    P.close = function () {
        var self = this; if (!self.overlay) return;
        self.stopTour(); self.cur = null; self.overlay.hidden = true; document.body.classList.remove('gw-lock');
        if (self.lastFocus && self.lastFocus.focus) self.lastFocus.focus();
        if (self.cfg.onClose) self.cfg.onClose();
    };
    P.openInTab = function () {
        var self = this, o = self.cfg.openInTab; if (!o) return;
        var url = o.url + (o.url.indexOf('?') < 0 ? '?' : '&') + 'topic=' + encodeURIComponent(self.cur || 'tour') + '&at=' + (self.tourIdx || 0) + '&lang=' + encodeURIComponent(self.lang);
        var w = window.open(url, o.name || ('gwGuide_' + self.cfg.id));
        if (!w) { if (global.toastr) global.toastr.warning(self.ui('popBlocked')); else window.alert(self.ui('popBlocked')); return; }
        w.focus(); lsSet('gwSeen:' + self.cfg.id, '1'); self.close();
    };
    P.openFromUrl = function () {
        var qs = new URLSearchParams(location.search), l = qs.get('lang'), self = this;
        if (l && self.cfg.langs.some(function (x) { return x.code === l; })) { self.lang = l; self.applyLang(); }
        var topic = qs.get('topic'), at = parseInt(qs.get('at'), 10), scr = qs.get('screen');
        if (!topic || self.topics.indexOf(topic) < 0) topic = self.cfg.tour ? 'tour' : self.topics[0];
        self.show(topic, !isNaN(at) ? at : (scr ? self.screenIndex(scr) : undefined));
    };

    // remove the guide from the page (SPA route change); the document-level listeners go inert
    P.destroy = function () { this.dead = true; this.stopTour(); document.body.classList.remove('gw-lock'); var n = this.overlay || this.root; if (n && n.parentNode) n.parentNode.removeChild(n); delete GwGuide.instances[this.cfg.id]; };

    var GwGuide = { version: '1.6.0', instances: {}, current: null, init: function (cfg) { var g = new Guide(cfg); GwGuide.instances[g.cfg.id] = g; GwGuide.current = g; return g; } };
    global.GwGuide = GwGuide;
})(window);
