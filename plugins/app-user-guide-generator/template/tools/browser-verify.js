/* Paste into the browser console on the page that holds the guide (modal or page mode), or load it with a <script> tag after gw-guide.js.
 *   GwVerify.run()            -> promise with a report object (also console.table-ed)
 *   GwVerify.run(guide, { clicks: 400 })
 * Checks: every tour selector found, DOM order (top to bottom, then left to right; a child inside its own container is not a violation),
 * every topic opens, the whole-text search finds a known word, and the full tour is clicked to the end with window errors counted.
 * It does not judge looks: take screenshots too. */
(function (global) {
    'use strict';
    var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

    function checkOrder(screens) {
        var bad = {};
        screens.forEach(function (s) {
            var scope = document.querySelector(s.scope), prev = null, list = [], was = scope && scope.hidden;
            if (!scope) { bad[s.screenKey] = ['scope not found']; return; }
            scope.hidden = false;
            s.steps.forEach(function (st, i) {
                if (st.act) return;
                var el = scope.querySelector(st.selector);
                if (!el) { list.push((i + 1) + ': missing ' + st.selector); return; }
                var r = el.getBoundingClientRect(), cur = { el: el, t: r.top, c: (r.top + r.bottom) / 2, l: r.left };
                if (prev && !prev.el.contains(el) && !el.contains(prev.el)) {
                    if (cur.t < prev.t - 2 && cur.c < prev.c - 2) list.push((i + 1) + ': above the previous step ' + st.selector);
                    else if (Math.abs(cur.c - prev.c) <= 20 && cur.l < prev.l - 2) list.push((i + 1) + ': left of the previous step ' + st.selector);
                }
                prev = cur;
            });
            scope.hidden = was;
            if (list.length) bad[s.screenKey] = list;
        });
        return bad;
    }

    async function run(guide, opts) {
        guide = guide || global.GwGuide.current; opts = opts || {};
        var report = { errors: [], missingSelectors: {}, order: {}, topics: {}, search: null, tour: null };
        var onErr = function (e) { report.errors.push(e.message); };
        window.addEventListener('error', onErr);
        if (guide.overlay && guide.overlay.hidden) guide.open({});
        await sleep(600);

        var screens = guide.tourScreens();
        if (screens.length) {
            var v = global.GwTour.verifySelectors(screens);
            Object.keys(v).forEach(function (k) { var m = v[k].filter(function (x) { return !x.found; }).map(function (x) { return x.selector; }); if (m.length) report.missingSelectors[k] = m; });
            report.order = checkOrder(screens);
        }
        for (var i = 0; i < guide.topics.length; i++) {
            var k = guide.topics[i]; guide.show(k); await sleep(120);
            var act = document.querySelector('.gw-sec.active');
            report.topics[k] = act && act.getAttribute('data-gw-topic') === k ? 'ok' : 'NOT SHOWN';
        }
        // search: take the first word of 6+ letters from any topic text, expect that topic to stay in the menu
        var sb = document.querySelector('.gw-search');
        if (sb) {
            var para = Array.prototype.filter.call(document.querySelectorAll('.gw-sec:not([data-gw-topic="tour"]) p, .gw-sec:not([data-gw-topic="tour"]) li'), function (e) { return !e.hidden && /[A-Za-z]{6,}/.test(e.textContent); })[0];
            var word = ((para ? para.textContent : '').match(/[A-Za-z]{6,}/) || [''])[0];
            sb.value = word; sb.dispatchEvent(new Event('input', { bubbles: true })); await sleep(400);
            report.search = { word: word, topicsLeft: Array.prototype.filter.call(document.querySelectorAll('.gw-ni'), function (b) { return !b.hidden; }).length, marks: document.querySelectorAll('mark.gw-mark').length };
            sb.value = ''; sb.dispatchEvent(new Event('input', { bubbles: true })); await sleep(300);
        }
        if (screens.length) {
            guide.show('tour', 0); await sleep(900);
            var clicks = 0, seen = [], max = opts.clicks || 600;
            for (var n = 0; n < max; n++) {
                var vis = Array.prototype.filter.call(document.querySelectorAll('.gw-walkarea > *'), function (e) { return !e.hidden && e.id; }).map(function (e) { return e.id; })[0];
                if (vis && seen[seen.length - 1] !== vis) seen.push(vis);
                var b = Array.prototype.filter.call(document.querySelectorAll('.gt-tip button'), function (x) { return x.offsetParent && /next|lanjut|see result|lihat hasil|finish|selesai/i.test(x.textContent); })[0]
                    || Array.prototype.filter.call(document.querySelectorAll('.gt-screenbar [data-act="next"]'), function (x) { return x.offsetParent; })[0];
                if (!b) break;
                b.click(); clicks++; await sleep(200);
            }
            report.tour = { clicks: clicks, screensSeen: seen.length, screensTotal: screens.length, completeCard: !!document.querySelector('.gt-complete') };
        }
        window.removeEventListener('error', onErr);
        report.pass = !report.errors.length && !Object.keys(report.missingSelectors).length && !Object.keys(report.order).length
            && Object.keys(report.topics).every(function (k) { return report.topics[k] === 'ok'; }) && (!report.tour || (report.tour.completeCard && report.tour.screensSeen === report.tour.screensTotal));
        console.log(report.pass ? 'GwVerify: PASS' : 'GwVerify: ISSUES', report);
        return report;
    }
    global.GwVerify = { run: run, checkOrder: checkOrder };
})(window);
