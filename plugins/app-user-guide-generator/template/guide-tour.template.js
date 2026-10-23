/*
 * Skeleton coachmark/spotlight engine — pola dari core doc poin 5b. Vanilla JS, no deps.
 *
 * PENTING — target-nya SELALU elemen di dalam guide/modal "User Guide" itu sendiri (mock screen
 * hand-built dari template/guide-walkthrough.template.html), BUKAN PERNAH elemen di halaman real
 * app yang sedang dipakai user buat kerja beneran. Guide gak boleh nyuntik overlay ke luar dirinya
 * sendiri. `selector` di tiap sub-step di-resolve via `scope.querySelector(selector)` — scope WAJIB
 * di-pass eksplisit (elemen atau selector string), BUKAN `document.querySelector` global.
 *
 * Teknik highlight: BUKAN backdrop gelap + "lubang" spotlight (itu nutupin konteks sekitarnya).
 * Sebagai gantinya: semua elemen lain di dalam scope diredupkan (opacity turun, bukan
 * position:fixed apapun), target dapet outline + tetap full-opacity — konteks sekitarnya tetap
 * KELIATAN, cuma gak jadi pusat perhatian. Gak ada elemen position:fixed/absolute yang dibikin
 * buat efek ini — aman dipakai bareng dialog/modal mock yang statis di alur dokumen.
 *
 * Dua lapis API:
 *   GuideTour.runScreen(steps, opts) — jalanin satu urutan sub-step (1 mock screen). opts:
 *     { scope, tourId, screenKey, lang, lastButtonLabel:{en,id}, onFinish(), onSkip(),
 *       base, total, chapter }
 *     `base` + `total` = penomoran GLOBAL satu tour end-to-end ("Step 37 of 395 · <chapter>"):
 *     base = jumlah sub-step di semua screen sebelum ini, total = jumlah sub-step seluruh tour.
 *     Tanpa keduanya, penomoran jatuh ke per-screen. `chapter` = label bab yang ikut tampil.
 *     Selector sub-step dicari DULU di dalam elemen `[data-core]` (bagian inti layar = potongan
 *     yang lagi dibahas), baru di seluruh scope — jadi konteks halaman di sekitarnya (header,
 *     stepper, kartu) gak bikin selector nyasar ke elemen lain yang mirip.
 *     Sub-step dengan `act: true` = langkah penutup "Next action: ..." (kontrol yang sama boleh
 *     muncul dua kali: sekali di posisi alaminya, sekali sebagai ajakan klik); verifyOrder
 *     melewatinya.
 *     `lastButtonLabel` override teks tombol di sub-step TERAKHIR screen ini (defaultnya
 *     "Lanjut"/"Next" biasa — di alur berkelanjutan biasanya diganti jadi "Lihat hasil"/"See
 *     result" karena abis ini BUKAN akhir tour, cuma akhir screen itu).
 *   GuideTour.runSequence(screens, opts) — orkestrasi lintas screen (lihat core doc poin 5b-A):
 *     screens = [{ screenKey, scope, steps, chapter?, resultLabel? }, ...]
 *     opts = { tourId, lang, onOpenDetail(), onScreenChange(idx, screen), container, startAt }
 *     Satu tour end-to-end, TANPA role picker: semua peran dalam satu urutan alur kerja nyata.
 *     runSequence menghitung `base`/`total` sendiri dari jumlah sub-step tiap screen dan
 *     meneruskan `chapter` tiap screen; `onScreenChange` dipanggil di tiap pindah screen supaya
 *     integrator bisa nandain chip bab / progress bar screen.
 *     Abis 1 screen selesai (sub-step terakhir diklik): auto reveal elemen hasil
 *     ([hidden][data-mock-result] di dalam scope screen itu kalau ada), lalu render bar
 *     "Previous screen / Replay / Next screen" (di dalam `container` — elemen yang disediakan
 *     integrator buat nampung UI bar ini, biasanya tepat di bawah mock screen). "Next screen"
 *     langsung mulai tour screen berikutnya, gak perlu klik tambahan lain. Screen terakhir ->
 *     kartu "Tour complete" (Replay / Open detail topic). Posisi terakhir
 *     (index screen + lang) ke-save localStorage; `GuideTour.getSavedProgress(tourId)` buat cek
 *     ada progress tersimpan sebelum nawarin "Continue".
 *
 * Helper verifikasi (poin 5b-F core doc, dipanggil manual pas ngetes, bukan bagian runtime guide):
 *   GuideTour.verifySelectors(screens) -> { screenKey: [ { selector, found } ] } — jalan di jsdom
 *     atau browser; cuma cek elemen ketemu/gaknya, gak butuh elemen keliatan.
 *   GuideTour.verifyOrder(screens) -> { screenKey: [ 'ok' | 'OUT OF ORDER: ...' ] } — BUTUH browser
 *     beneran (pakai getBoundingClientRect), jsdom ngasih 0 buat semua rect jadi gak valid di situ.
 */
(function (global) {
  'use strict';

  var LS_PREFIX = 'guideTour:';
  var reduceMotion = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ls(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function lsSet(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function lsDel(key) { try { localStorage.removeItem(key); } catch (e) {} }

  function resolveScope(scope) {
    if (!scope) return document;
    if (typeof scope === 'string') return document.querySelector(scope);
    return scope;
  }

  // Cari elemen target: DULU di bagian inti layar ([data-core]), baru di seluruh scope.
  function lookup(scopeEl, selector) {
    if (!scopeEl) return null;
    var cores = scopeEl.querySelectorAll('[data-core]');
    for (var k = 0; k < cores.length; k++) {
      var hit = cores[k].querySelector(selector);
      if (hit) return hit;
    }
    return scopeEl.querySelector(selector);
  }

  // ── style (sekali injek) ──────────────────────────────────────────────────────────────────
  var STYLE_ID = 'guide-tour-style';
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var css = ''
      + '.gw-tour-active .gw-dim{opacity:.38;filter:grayscale(45%);transition:' + (reduceMotion ? 'none' : 'opacity .22s ease,filter .22s ease') + ';}'
      + '.gw-tour-active .gw-target{position:relative;z-index:2;outline:3px solid #ffb648;outline-offset:3px;'
      + '  border-radius:6px;' + (reduceMotion ? '' : 'animation:gwTargetPulse 1.6s ease-in-out infinite;') + '}'
      + '@keyframes gwTargetPulse{0%,100%{outline-color:rgba(255,182,72,1);}50%{outline-color:rgba(255,182,72,.35);}}'
      + '.gt-tip{position:fixed;z-index:99992;width:320px;max-width:calc(100vw - 24px);background:#fff;border-radius:12px;'
      + '  box-shadow:0 12px 32px rgba(0,0,0,.22);padding:14px 16px;font:14px/1.5 system-ui,sans-serif;color:#2b3230;}'
      + '.gt-tip__title{font-weight:700;margin:0 0 4px;}'
      + '.gt-tip__text{margin:0 0 10px;color:#5e6b66;min-height:1.2em;}'
      + '.gt-tip__progress{font-size:11px;color:#8a948f;margin-bottom:8px;}'
      + '.gt-tip__row{display:flex;justify-content:space-between;align-items:center;gap:8px;}'
      + '.gt-tip button{border:1px solid #1f9d57;background:#fff;color:#1f9d57;border-radius:7px;'
      + '  padding:5px 12px;font-size:12.5px;font-weight:600;cursor:pointer;}'
      + '.gt-tip button.gt-primary{background:#1f9d57;color:#fff;}'
      + '.gt-tip button:disabled{opacity:.35;cursor:default;}'
      + '.gt-tip__skip{border:0 !important;background:none !important;color:#8a948f !important;'
      + '  text-decoration:underline;padding:5px 0 !important;}'
      + '.gt-tip__lang{border:0 !important;background:none !important;color:#8a948f !important;font-size:11px !important;'
      + '  padding:2px 6px !important;}'
      + '.gt-tip__lang.active{color:#1f9d57 !important;font-weight:700;}'
      // Bar antar-screen & kartu "Tour complete" — full-width, gak ngasih max-width sempit (poin 5b-B).
      + '.gt-screenbar{display:flex;justify-content:space-between;align-items:center;gap:10px;'
      + '  width:100%;padding:12px 2px 2px;flex-wrap:wrap;}'
      + '.gt-screenbar button{border:1px solid #1f9d57;background:#fff;color:#1f9d57;border-radius:8px;'
      + '  padding:7px 16px;font-size:13px;font-weight:600;cursor:pointer;}'
      + '.gt-screenbar button.gt-primary{background:#1f9d57;color:#fff;}'
      + '.gt-screenbar button:disabled{opacity:.35;cursor:default;}'
      + '.gt-complete{width:100%;text-align:center;padding:28px 16px;border:1px dashed #cfe9da;'
      + '  border-radius:12px;background:#f1faf5;}'
      + '.gt-complete h3{margin:0 0 6px;}'
      + '.gt-complete p{margin:0 0 16px;color:#5e6b66;}'
      + '.gt-complete .gt-row{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;}';
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function typewrite(el, text) {
    el.textContent = '';
    if (reduceMotion) { el.textContent = text; return; }
    var i = 0;
    var timer = setInterval(function () {
      if (i >= text.length) { clearInterval(timer); return; }
      el.textContent += text[i];
      i++;
    }, 14);
  }

  // Redupin semua elemen di `scopeEl` KECUALI target & ancestor/descendant-nya. Gak ada backdrop/
  // elemen baru yang dibikin — murni toggle class di elemen yang udah ada di DOM.
  function applyDimTarget(scopeEl, targetEl) {
    scopeEl.classList.add('gw-tour-active');
    var keepAncestors = [];
    var n = targetEl;
    while (n && n !== scopeEl) { keepAncestors.push(n); n = n.parentElement; }
    var all = scopeEl.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      el.classList.remove('gw-target');
      if (el === targetEl || keepAncestors.indexOf(el) !== -1 || targetEl.contains(el)) {
        el.classList.remove('gw-dim');
      } else {
        el.classList.add('gw-dim');
      }
    }
    targetEl.classList.add('gw-target');
  }
  function clearDim(scopeEl) {
    scopeEl.classList.remove('gw-tour-active');
    scopeEl.querySelectorAll('.gw-dim, .gw-target').forEach(function (el) {
      el.classList.remove('gw-dim'); el.classList.remove('gw-target');
    });
  }

  // Auto-reveal: kalau target atau salah satu ancestornya (sampai scope) punya atribut `hidden`,
  // atau ada di dalam <details> yang belum `open`, buka otomatis — tour gak pernah berhenti di
  // elemen yang gak keliatan (poin 5b-A: "target hidden di panel hasil harus di-reveal otomatis").
  function autoReveal(scopeEl, targetEl) {
    var n = targetEl;
    while (n && n !== scopeEl.parentElement) {
      if (n.hasAttribute && n.hasAttribute('hidden')) n.removeAttribute('hidden');
      if (n.tagName === 'DETAILS' && !n.open) n.open = true;
      n = n.parentElement;
    }
  }

  function getState(tourId) {
    var raw = ls(LS_PREFIX + tourId + ':progress');
    return raw ? JSON.parse(raw) : null;
  }
  function saveProgress(tourId, data) { lsSet(LS_PREFIX + tourId + ':progress', JSON.stringify(data)); }
  function clearProgress(tourId) { lsDel(LS_PREFIX + tourId + ':progress'); }

  // ── runScreen: jalanin 1 urutan sub-step (1 mock screen) ────────────────────────────────────
  function runScreen(steps, opts) {
    var scopeEl = resolveScope(opts.scope);
    if (!scopeEl) return null;
    injectStyle();
    var lang = opts.lang || 'id';
    var index = 0;

    var tip = document.createElement('div');
    tip.className = 'gt-tip';
    document.body.appendChild(tip);

    function cleanup() {
      tip.remove();
      clearDim(scopeEl);
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
    }
    function findEl(i) {
      var s = steps[i];
      return s && lookup(scopeEl, s.selector);
    }
    function nextValidIndex(from, dir) {
      var i = from;
      while (i >= 0 && i < steps.length) { if (findEl(i)) return i; i += dir; }
      return -1;
    }
    function reposition() {
      var el = findEl(index);
      if (!el) return;
      var r = el.getBoundingClientRect();
      var tipTop = r.bottom + 14;
      if (tipTop + 150 > window.innerHeight) tipTop = Math.max(10, r.top - 160);
      var tipLeft = Math.min(Math.max(10, r.left), window.innerWidth - 332);
      tip.style.top = tipTop + 'px';
      tip.style.left = tipLeft + 'px';
    }

    function render() {
      var el = findEl(index);
      if (!el) { finish(); return; }
      autoReveal(scopeEl, el);
      el.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
      applyDimTarget(scopeEl, el);

      var s = steps[index];
      var copy = s[lang] || s.id || s.en;
      var isLast = nextValidIndex(index + 1, 1) === -1;
      var nextLabelDefault = isLast
        ? (opts.lastButtonLabel ? opts.lastButtonLabel[lang] : (lang === 'en' ? 'Finish' : 'Selesai'))
        : (lang === 'en' ? 'Next' : 'Lanjut');

      tip.innerHTML = ''
        + '<div class="gt-tip__progress"></div>'
        + '<p class="gt-tip__title"></p>'
        + '<p class="gt-tip__text"></p>'
        + '<div class="gt-tip__row">'
        + '  <span>'
        + '    <button type="button" class="gt-tip__lang" data-lang="id">ID</button>'
        + '    <button type="button" class="gt-tip__lang" data-lang="en">EN</button>'
        + '  </span>'
        + '  <span>'
        + '    <button type="button" class="gt-tip__skip" data-act="skip">' + (lang === 'en' ? 'Skip' : 'Lewati') + '</button>'
        + '    <button type="button" data-act="back">' + (lang === 'en' ? 'Back' : 'Kembali') + '</button>'
        + '    <button type="button" class="gt-primary" data-act="next"></button>'
        + '  </span>'
        + '</div>';

      var base = opts.base || 0, total = opts.total || steps.length;
      tip.querySelector('.gt-tip__progress').textContent =
        (lang === 'en' ? 'Step ' : 'Langkah ') + (base + index + 1) + (lang === 'en' ? ' of ' : ' dari ') + total
        + (opts.chapter ? ' \u00b7 ' + opts.chapter : '');
      tip.querySelector('.gt-tip__title').textContent = copy.title;
      typewrite(tip.querySelector('.gt-tip__text'), copy.text);

      var backBtn = tip.querySelector('[data-act="back"]');
      backBtn.disabled = index === 0;
      var nextBtn = tip.querySelector('[data-act="next"]');
      nextBtn.textContent = nextLabelDefault;

      tip.querySelectorAll('.gt-tip__lang').forEach(function (b) {
        b.classList.toggle('active', b.dataset.lang === lang);
        b.addEventListener('click', function () { lang = b.dataset.lang; render(); });
      });
      backBtn.addEventListener('click', function () {
        var p = nextValidIndex(index - 1, -1);
        if (p !== -1) { index = p; render(); }
      });
      nextBtn.addEventListener('click', function () {
        var n = nextValidIndex(index + 1, 1);
        if (n === -1) { finish(); } else { index = n; render(); }
      });
      tip.querySelector('[data-act="skip"]').addEventListener('click', function () {
        cleanup();
        if (opts.onSkip) opts.onSkip();
      });

      reposition();
    }

    function finish() {
      // Auto-reveal elemen hasil kalau ada — poin 5b-A.
      var resultEl = scopeEl.querySelector('[data-mock-result][hidden]');
      if (resultEl) resultEl.removeAttribute('hidden');
      cleanup();
      if (opts.onFinish) opts.onFinish();
    }

    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);

    var start = nextValidIndex(0, 1);
    if (start === -1) { cleanup(); return null; }
    index = start;
    render();

    return { cleanup: cleanup };
  }

  // ── runSequence: orkestrasi lintas screen, alur berkelanjutan (poin 5b-A) ──────────────────
  function runSequence(screens, opts) {
    var tourId = opts.tourId;
    var container = resolveScope(opts.container);
    var lang = opts.lang || (getState(tourId) && getState(tourId).lang) || 'id';
    // penomoran global: base tiap screen = jumlah sub-step screen-screen sebelumnya
    var bases = [], total = 0;
    screens.forEach(function (scr) { bases.push(total); total += scr.steps.length; });

    function renderBar(html) {
      if (!container) return;
      container.innerHTML = html;
    }
    function clearBar() { if (container) container.innerHTML = ''; }

    function startScreen(idx, label) {
      if (idx < 0 || idx >= screens.length) return;
      saveProgress(tourId, { screenIndex: idx, lang: lang });
      clearBar();
      var scr = screens[idx];
      if (opts.onScreenChange) opts.onScreenChange(idx, scr);
      runScreen(scr.steps, {
        scope: scr.scope,
        lang: lang,
        base: bases[idx],
        total: total,
        chapter: scr.chapter,
        lastButtonLabel: label || { id: 'Lihat hasil', en: 'See result' },
        onSkip: function () { clearProgress(tourId); clearBar(); if (opts.onSkip) opts.onSkip(); },
        onFinish: function () { onScreenDone(idx); },
      });
    }

    function onScreenDone(idx) {
      var isLast = idx === screens.length - 1;
      if (isLast) {
        clearProgress(tourId);
        renderBar(''
          + '<div class="gt-complete">'
          + '  <h3>' + (lang === 'en' ? 'Tour complete' : 'Tur selesai') + '</h3>'
          + '  <p>' + (lang === 'en' ? 'You have seen every screen in this flow.' : 'Anda telah melihat seluruh layar pada alur ini.') + '</p>'
          + '  <div class="gt-row">'
          + '    <button type="button" class="gt-primary" data-act="replay">' + (lang === 'en' ? 'Replay' : 'Ulangi') + '</button>'
          + '    <button type="button" data-act="detail">' + (lang === 'en' ? 'Open detail topics' : 'Buka topik detail') + '</button>'
          + '  </div>'
          + '</div>');
        container.querySelector('[data-act="replay"]').addEventListener('click', function () { startScreen(0); });
        container.querySelector('[data-act="detail"]').addEventListener('click', function () {
          clearBar(); if (opts.onOpenDetail) opts.onOpenDetail();
        });
        return;
      }
      renderBar(''
        + '<div class="gt-screenbar">'
        + '  <button type="button" data-act="prev"' + (idx === 0 ? ' disabled' : '') + '>'
        + '    ' + (lang === 'en' ? '← Previous screen' : '← Layar sebelumnya') + '</button>'
        + '  <button type="button" data-act="replay">' + (lang === 'en' ? 'Replay' : 'Ulangi') + '</button>'
        + '  <button type="button" class="gt-primary" data-act="next">'
        + '    ' + (lang === 'en' ? 'Next screen →' : 'Layar berikutnya →') + '</button>'
        + '</div>');
      var prevBtn = container.querySelector('[data-act="prev"]');
      if (!prevBtn.disabled) prevBtn.addEventListener('click', function () { startScreen(idx - 1); });
      container.querySelector('[data-act="replay"]').addEventListener('click', function () { startScreen(idx); });
      container.querySelector('[data-act="next"]').addEventListener('click', function () { startScreen(idx + 1); });
    }

    // "Continue" — kalau ada progress tersimpan, caller (role-picker/entry UI) yang nawarin;
    // runSequence sendiri SELALU mulai dari index yang dikasih di opts.startAt (default 0).
    startScreen(typeof opts.startAt === 'number' ? opts.startAt : 0);

    return {
      stop: function () { clearBar(); clearProgress(tourId); },
    };
  }

  function getSavedProgress(tourId) { return getState(tourId); }

  // ── Verifikasi (poin 5b-F) — dipanggil manual pas ngetes, bukan runtime guide ───────────────
  function verifySelectors(screens) {
    var report = {};
    screens.forEach(function (scr) {
      var scopeEl = resolveScope(scr.scope);
      report[scr.screenKey] = scr.steps.map(function (s) {
        var found = !!lookup(scopeEl, s.selector);
        return { selector: s.selector, found: found };
      });
    });
    return report;
  }
  function verifyOrder(screens) {
    var report = {};
    screens.forEach(function (scr) {
      var scopeEl = resolveScope(scr.scope);
      var prev = null;
      report[scr.screenKey] = scr.steps.map(function (s, i) {
        if (s.act) return 'ok (closing action)';
        var el = lookup(scopeEl, s.selector);
        if (!el) return 'NOT FOUND: ' + s.selector;
        var r = el.getBoundingClientRect();
        if (prev) {
          // top-to-bottom dulu (toleransi 8px buat elemen sebaris), baru left-to-right.
          var sameRow = Math.abs(r.top - prev.top) <= 8;
          var ok = sameRow ? r.left >= prev.left - 1 : r.top >= prev.top - 1;
          if (!ok) { prev = r; return 'OUT OF ORDER vs step ' + i + ': ' + s.selector; }
        }
        prev = r;
        return 'ok';
      });
    });
    return report;
  }

  global.GuideTour = {
    runScreen: runScreen,
    runSequence: runSequence,
    getSavedProgress: getSavedProgress,
    verifySelectors: verifySelectors,
    verifyOrder: verifyOrder,
  };
})(window);

/* ── Contoh pemakaian (hapus di produksi, ini cuma referensi) ──────────────────────────────
   Catatan: tag di bawah ini sengaja ditulis dengan backslash (<\/script> dst) biar aman kalau
   file ini pernah di-inline langsung ke dalam <script> tag lain — parser HTML berhenti di
   literal tag penutup script pertama yang ditemukan WALAU itu di dalam comment/string JS. Kalau
   di-include normal lewat <script src="guide-tour.js"> (cara yang dianjurkan), ini gak masalah.

   Selector-nya nunjuk ke elemen MOCK di dalam markup guide-walkthrough.template.html (data-mock=
   "btnAddFlexForm" di salah satu .gw-mockpage), BUKAN ke tombol asli di halaman app.
<script src="guide-tour.js"><\/script>
<script>
  var screens = [
    {
      screenKey: 'list',
      scope: '#gwMockScreenList',
      steps: [
        { selector: '[data-mock="navRacer"]', id: { title: 'Menu Racer', text: 'Grup menu tempat Flex Form berada.' }, en: { title: 'Racer Menu', text: 'The menu group where Flex Form lives.' } },
        { selector: '[data-mock="btnAddFlexForm"]', id: { title: 'Tambah Formulir Baru', text: 'Klik di sini buat mulai bikin Flex Form baru dari nol.' }, en: { title: 'Add New Form', text: 'Click here to start creating a new Flex Form from scratch.' } }
        // ... 1 sub-step per kontrol di mock screen "list" ini, urut atas->bawah lalu kiri->kanan ...
      ]
    },
    {
      screenKey: 'detail',
      scope: '#gwMockScreenDetail',
      steps: [
        // ... sub-step mock screen "detail" ...
      ]
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    GuideTour.runSequence(screens, {
      tourId: 'flexform-guide',
      container: '#gwScreenBar', // elemen tempat bar Previous/Replay/Next-screen & kartu Tour complete di-render
      onScreenChange: function (idx, screen) { }, // isi: tandai chip bab + progress bar screen
      onOpenDetail: function () { } // isi: pindah ke topik detail guide
    });
  });
<\/script>
────────────────────────────────────────────────────────────────────────────────────────── */
