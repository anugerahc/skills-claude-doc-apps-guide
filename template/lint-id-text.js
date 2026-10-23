/*
 * Lint sederhana: tolak kata casual di teks bahasa Indonesia yang ditulis buat guide end-user
 * (poin 5b-E core doc). Teks guide WAJIB formal baku ("Anda", bukan slang) — beda total dari gaya
 * ngobrol santai yang dipakai pas sesi kerja sama user yang minta dibuatin guide-nya.
 *
 * Vanilla, no deps. Jalan di Node (`node lint-id-text.js`) ATAU di-import sebagai module
 * (CommonJS) buat dipanggil dari script lain, ATAU langsung di-paste ke browser console buat cek
 * cepat satu string.
 *
 * Cakupan: daftar kata di bawah ini MINIMAL, bukan lengkap — tambahin kata lain yang kedapetan
 * lolos. False positive mungkin ada untuk kata yang kebetulan jadi substring kata lain (jarang di
 * konteks guide formal) — review manual hasil flag-nya, jangan auto-reject tanpa baca.
 */
var CASUAL_WORDS_ID = [
  'gak', 'ga ', 'enggak', 'nggak',
  'banget', 'bgt',
  'dong', 'donk',
  'nih', 'tuh',
  '\\blu\\b', '\\bgue\\b', '\\bgua\\b', '\\baku\\b(?!\\s*(account|akun))',
  '\\byaa+\\b', '\\bdeh\\b', '\\bsih\\b',
  'kayak', 'kyk', 'kaya gitu',
  'emang', 'emg',
  'udah', 'udh', 'blm', 'belom',
  'aja ', 'doang',
  'gini ', 'gitu ',
  'ngga', 'kagak',
  'bisa dong', 'coba deh',
];

function lintIdText(text) {
  var hits = [];
  CASUAL_WORDS_ID.forEach(function (pattern) {
    var re = new RegExp(pattern, 'gi');
    var m;
    while ((m = re.exec(text))) {
      hits.push({ word: m[0], index: m.index, pattern: pattern });
    }
  });
  return hits;
}

// Terima array step guide (shape sama kayak `steps` di guide-tour.template.js: [{ id: { title,
// text }, ... }]) dan lint field `id.title` + `id.text` tiap step. Balikin cuma yang ada hit.
function lintSteps(steps, screenKeyForReport) {
  var report = [];
  (steps || []).forEach(function (step, i) {
    if (!step.id) return;
    ['title', 'text'].forEach(function (field) {
      var val = step.id[field];
      if (!val) return;
      var hits = lintIdText(val);
      if (hits.length) {
        report.push({
          screen: screenKeyForReport || null,
          stepIndex: i,
          field: field,
          text: val,
          hits: hits.map(function (h) { return h.word; }),
        });
      }
    });
  });
  return report;
}

function lintAllScreens(screens) {
  var all = [];
  (screens || []).forEach(function (scr) {
    all = all.concat(lintSteps(scr.steps, scr.screenKey));
  });
  return all;
}


// Aturan format (poin 5b-E): judul <= 60 karakter, teks <= 300 karakter, diakhiri titik (tanda kutip
// setelah titik boleh), teks ID tidak identik dengan EN, tidak ada kata casual di EN.
var CASUAL_WORDS_EN = ['gonna', 'wanna', 'gotta', 'kinda', 'stuff', 'basically', 'actually', 'simply', 'awesome', 'cool', 'oops', 'hey', 'yeah'];
function lintFormat(steps, screenKey) {
  var out = [];
  (steps || []).forEach(function (step, i) {
    var id = function (msg) { out.push({ screen: screenKey || null, stepIndex: i, issue: msg }); };
    ['en', 'id'].forEach(function (L) {
      var c = step[L];
      if (!c || !c.title || !c.text) { id(L + ' title/text missing'); return; }
      if (c.title.length > 60) id(L + ' title > 60 chars');
      if (c.text.length > 300) id(L + ' text > 300 chars (' + c.text.length + ')');
      if (!/[.:)]("|”)?$/.test(c.text.trim())) id(L + ' text should end with a full stop');
    });
    if (step.en && step.id && step.en.text === step.id.text) id('id text identical to en');
    if (step.en) {
      CASUAL_WORDS_EN.forEach(function (w) {
        if (new RegExp('\b' + w + '\b', 'i').test(step.en.title + ' ' + step.en.text)) id('en casual word: ' + w);
      });
    }
  });
  return out;
}
function lintFormatAllScreens(screens) {
  var all = [];
  (screens || []).forEach(function (scr) { all = all.concat(lintFormat(scr.steps, scr.screenKey)); });
  return all;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { lintIdText: lintIdText, lintSteps: lintSteps, lintAllScreens: lintAllScreens, lintFormat: lintFormat, lintFormatAllScreens: lintFormatAllScreens, CASUAL_WORDS_ID: CASUAL_WORDS_ID };
}
if (typeof window !== 'undefined') {
  window.GuideLintID = { lintIdText: lintIdText, lintSteps: lintSteps, lintAllScreens: lintAllScreens, lintFormat: lintFormat, lintFormatAllScreens: lintFormatAllScreens };
}

/* ── Contoh pemakaian (hapus di produksi) ───────────────────────────────────────────────────
 * Node: node lint-id-text.js path/ke/steps.json  (file JSON array of screens, shape di atas)
 */
if (typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module) {
  var fs = require('fs');
  var path = process.argv[2];
  if (!path) {
    console.log('Usage: node lint-id-text.js <steps.json>');
    process.exit(1);
  }
  var screens = JSON.parse(fs.readFileSync(path, 'utf8'));
  var report = lintAllScreens(screens);
  var fmt = lintFormatAllScreens(screens);
  fmt.forEach(function (f) { console.log('- [' + (f.screen || '?') + ' step ' + f.stepIndex + '] ' + f.issue); });
  if (report.length === 0 && fmt.length === 0) {
    console.log('Lint bersih — gak ada kata casual dan format teks sesuai aturan.');
    process.exit(0);
  }
  if (report.length === 0) process.exit(1);
  console.log('Ketemu ' + report.length + ' teks ID yang kedengeran casual:');
  report.forEach(function (r) {
    console.log('- [' + (r.screen || '?') + ' step ' + r.stepIndex + ' .' + r.field + '] "' + r.text + '" -> kata: ' + r.hits.join(', '));
  });
  process.exit(1);
}
