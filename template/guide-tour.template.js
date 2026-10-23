/*
 * Skeleton product-tour / coachmark engine — pola dari core doc poin 5c. Vanilla JS, no deps,
 * nempel ke CSS/HTML halaman manapun. Satu file ini di-include di SETIAP halaman real app yang
 * mau di-tour, dengan step list punya halaman itu doang (lihat contoh paling bawah file ini).
 *
 * API:
 *   GuideTour.init(steps, { tourId, pageKey, lang })
 *     -> daftarin tour buat halaman ini. Auto-mulai dari step 1 KALAU tour-nya belum pernah
 *        di-dismiss DAN pageKey ini belum pernah "selesai" di-tour sebelumnya (state di
 *        localStorage, persist lintas reload/halaman — itu yang bikin tour-nya nyambung lintas
 *        halaman tanpa perlu backend apapun).
 *   GuideTour.start(steps, { tourId, pageKey, lang })
 *     -> paksa mulai dari step 1 TERLEPAS dari state tersimpan. Pasang ini ke tombol
 *        "Mulai Tour"/"Take a Tour" manual.
 *
 * steps: [{ selector: 'CSS selector elemen ASLI', en: { title, text }, id: { title, text } }, ...]
 * Granularitas: SATU step per kontrol yang bisa dipencet user di halaman itu — termasuk tombol
 * kecil/icon-only, bukan cuma aksi utama (poin 5c core doc).
 */
(function (global) {
  'use strict';

  var LS_PREFIX = 'guideTour:';
  var reduceMotion = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ls(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function lsSet(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

  function getState(tourId) {
    var doneKeysRaw = ls(LS_PREFIX + tourId + ':doneKeys');
    return {
      dismissed: ls(LS_PREFIX + tourId + ':dismissed') === '1',
      doneKeys: doneKeysRaw ? JSON.parse(doneKeysRaw) : [],
      lang: ls(LS_PREFIX + tourId + ':lang') || null,
    };
  }
  function setLang(tourId, lang) { lsSet(LS_PREFIX + tourId + ':lang', lang); }
  function setDismissed(tourId) { lsSet(LS_PREFIX + tourId + ':dismissed', '1'); }
  function markPageDone(tourId, pageKey) {
    var state = getState(tourId);
    if (state.doneKeys.indexOf(pageKey) === -1) {
      state.doneKeys.push(pageKey);
      lsSet(LS_PREFIX + tourId + ':doneKeys', JSON.stringify(state.doneKeys));
    }
  }

  var STYLE_ID = 'guide-tour-style';
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var css = ''
      + '.gt-backdrop{position:fixed;inset:0;z-index:99990;background:transparent;pointer-events:auto;}'
      + '.gt-spot{position:fixed;z-index:99991;border-radius:8px;box-shadow:0 0 0 9999px rgba(10,15,13,.6);'
      + '  transition:' + (reduceMotion ? 'none' : 'top .25s ease,left .25s ease,width .25s ease,height .25s ease') + ';'
      + '  pointer-events:none;outline:2px solid #ffb648;outline-offset:3px;}'
      + '.gt-tip{position:fixed;z-index:99992;max-width:320px;background:#fff;border-radius:12px;'
      + '  box-shadow:0 12px 32px rgba(0,0,0,.25);padding:14px 16px;font:14px/1.5 system-ui,sans-serif;color:#2b3230;}'
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
      + '.gt-tip__lang.active{color:#1f9d57 !important;font-weight:700;}';
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

  function runTour(steps, opts, forceStart) {
    var tourId = opts.tourId;
    var pageKey = opts.pageKey;
    var state = getState(tourId);

    if (!forceStart) {
      if (state.dismissed) return null;
      if (state.doneKeys.indexOf(pageKey) !== -1) return null;
    }

    injectStyle();
    var lang = state.lang || opts.lang || 'id';
    var index = 0;

    var backdrop = document.createElement('div');
    backdrop.className = 'gt-backdrop';
    var spot = document.createElement('div');
    spot.className = 'gt-spot';
    var tip = document.createElement('div');
    tip.className = 'gt-tip';
    document.body.appendChild(backdrop);
    document.body.appendChild(spot);
    document.body.appendChild(tip);

    function cleanup() {
      backdrop.remove(); spot.remove(); tip.remove();
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
    }

    function findStepEl(i) {
      var s = steps[i];
      var el = s && document.querySelector(s.selector);
      return el;
    }

    // Lewatin step yang elemennya gak ketemu di halaman ini (belum render/hidden) — jangan
    // crash, lanjut ke step valid berikutnya; kalau gak ada satupun yang valid, batal diam-diam.
    function nextValidIndex(from, dir) {
      var i = from;
      while (i >= 0 && i < steps.length) {
        if (findStepEl(i)) return i;
        i += dir;
      }
      return -1;
    }

    function reposition() {
      var el = findStepEl(index);
      if (!el) return;
      var r = el.getBoundingClientRect();
      var pad = 6;
      spot.style.top = (r.top - pad) + 'px';
      spot.style.left = (r.left - pad) + 'px';
      spot.style.width = (r.width + pad * 2) + 'px';
      spot.style.height = (r.height + pad * 2) + 'px';

      var tipTop = r.bottom + 14;
      if (tipTop + 140 > window.innerHeight) tipTop = Math.max(10, r.top - 150);
      var tipLeft = Math.min(Math.max(10, r.left), window.innerWidth - 330);
      tip.style.top = tipTop + 'px';
      tip.style.left = tipLeft + 'px';
    }

    function render() {
      var el = findStepEl(index);
      if (!el) { finish(); return; }
      el.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });

      var s = steps[index];
      var copy = s[lang] || s.id || s.en;
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

      tip.querySelector('.gt-tip__progress').textContent =
        (lang === 'en' ? 'Step ' : 'Langkah ') + (index + 1) + (lang === 'en' ? ' of ' : ' dari ') + steps.length;
      tip.querySelector('.gt-tip__title').textContent = copy.title;
      typewrite(tip.querySelector('.gt-tip__text'), copy.text);

      var backBtn = tip.querySelector('[data-act="back"]');
      backBtn.disabled = index === 0;
      var nextBtn = tip.querySelector('[data-act="next"]');
      var isLast = nextValidIndex(index + 1, 1) === -1;
      nextBtn.textContent = isLast ? (lang === 'en' ? 'Finish' : 'Selesai') : (lang === 'en' ? 'Next' : 'Lanjut');

      tip.querySelectorAll('.gt-tip__lang').forEach(function (b) {
        b.classList.toggle('active', b.dataset.lang === lang);
        b.addEventListener('click', function () {
          lang = b.dataset.lang; setLang(tourId, lang); render();
        });
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
        setDismissed(tourId); cleanup();
      });

      reposition();
    }

    function finish() {
      markPageDone(tourId, pageKey);
      cleanup();
    }

    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);

    var start = nextValidIndex(0, 1);
    if (start === -1) { cleanup(); return null; } // gak ada elemen yang ketemu sama sekali di halaman ini
    index = start;
    render();

    return { cleanup: cleanup, finish: finish };
  }

  global.GuideTour = {
    init: function (steps, opts) { return runTour(steps, opts, false); },
    start: function (steps, opts) { return runTour(steps, opts, true); },
  };
})(window);

/* ── Contoh pemakaian (hapus di produksi, ini cuma referensi) ──────────────────────────────
   Catatan: tag di bawah ini sengaja ditulis dengan backslash (<\/script> dst) biar aman kalau
   file ini pernah di-inline langsung ke dalam <script> tag lain — parser HTML berhenti di
   literal tag penutup script pertama yang ditemukan WALAU itu di dalam comment/string JS. Kalau
   di-include normal lewat <script src="guide-tour.js"> (cara yang dianjurkan), ini gak masalah.
<script src="guide-tour.js"><\/script>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    GuideTour.init([
      {
        selector: '#btnAddFlexForm',
        id: { title: 'Tambah Formulir Baru', text: 'Klik di sini buat mulai bikin Flex Form baru dari nol.' },
        en: { title: 'Add New Form', text: 'Click here to start creating a new Flex Form from scratch.' }
      },
      {
        selector: '#btnISureGuide',
        id: { title: 'Panduan Pengguna', text: 'Tombol ini buka panduan lengkap kapan saja Anda butuh.' },
        en: { title: 'User Guide', text: 'This button opens the full guide any time you need it.' }
      }
      // ... 1 step per kontrol di halaman ini, sampai yang terkecil ...
    ], { tourId: 'flexform', pageKey: 'list' });

    // Tombol manual "Mulai Tour" / "Take a Tour":
    document.getElementById('btnStartTour').addEventListener('click', function () {
      GuideTour.start(stepsForThisPage, { tourId: 'flexform', pageKey: 'list' });
    });
  });
<\/script>
────────────────────────────────────────────────────────────────────────────────────────── */
