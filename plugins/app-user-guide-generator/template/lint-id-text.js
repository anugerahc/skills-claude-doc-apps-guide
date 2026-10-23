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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { lintIdText: lintIdText, lintSteps: lintSteps, lintAllScreens: lintAllScreens, CASUAL_WORDS_ID: CASUAL_WORDS_ID };
}
if (typeof window !== 'undefined') {
  window.GuideLintID = { lintIdText: lintIdText, lintSteps: lintSteps, lintAllScreens: lintAllScreens };
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
  if (report.length === 0) {
    console.log('Lint ID bersih — gak ada kata casual ketemu.');
    process.exit(0);
  }
  console.log('Ketemu ' + report.length + ' teks ID yang kedengeran casual:');
  report.forEach(function (r) {
    console.log('- [' + (r.screen || '?') + ' step ' + r.stepIndex + ' .' + r.field + '] "' + r.text + '" -> kata: ' + r.hits.join(', '));
  });
  process.exit(1);
}
