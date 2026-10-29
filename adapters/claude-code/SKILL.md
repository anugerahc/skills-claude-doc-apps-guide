---
name: app-user-guide-generator
description: Use when asked to write, generate, or extract an end-user guide / help doc / manual for a software module or app from its source code or repo — especially "generate a user guide for module X", "document how to use this feature", or "what does the in-app help say about Y". Core rule: find and copy the app's own existing user-facing help content verbatim before ever writing new guide text from reading code structure.
---

# App User Guide Generator

Sumber metodologi lengkap (WAJIB dibaca dulu sebelum eksekusi): `../../core/app-user-guide-generator-core.md`

Skeleton siap-isi — 2 layer, SEMUA di dalam guide (gak ada yang overlay di halaman real app), lihat
core doc poin 5b (A-F): `../../template/guide-walkthrough.template.html` (mock screen — HALAMAN
UTUH, bukan potongan) + `../../template/guide-tour.template.js` (engine `runScreen`/`runSequence`
— granular, EN/ID, alur berkelanjutan lintas screen) jadi layer "Guided Tour" (topik PERTAMA &
default, terpisah dari Quick start), ditambah `../../template/GUIDE.template.md` (layer detail) dan
`../../template/lint-id-text.js` (lint kata casual teks ID, wajib dijalankan sebelum selesai).

## Ringkasan alur

1. Baca `core/app-user-guide-generator-core.md` — pegang aturan "guide bawaan app = ground truth",
   dan jangan rekonstruksi dari kode kalau yang asli ada.
2. Konfirmasi ke user: module/app mana, "guide" yang dimaksud itu cara-pakai-software atau dokumen
   domain-bisnis yang dihasilkan app. Kalau ambigu, tanya dulu.
3. Cari guide bawaan app dulu — grep seluruh repo DAN seluruh branch git (bukan cuma working tree),
   cari route/page standalone khusus help/guide. Baru kalau nihil, rekonstruksi dari kode (view →
   JS → controller → constants/enum).
4. Extract verbatim (kalau ketemu) atau tulis dari hasil investigasi (kalau rekonstruksi). Bangun
   mock screen (`template/guide-walkthrough.template.html`) + pasang engine coachmark
   (`template/guide-tour.template.js`, selector-nya nunjuk elemen MOCK di dalam guide, granular —
   tiap kontrol dapet step-nya sendiri) jadi layer Guided Tour, lalu layer detail
   (`template/GUIDE.template.md`) — poin 5b core doc. Gak ada yang nyuntik overlay ke halaman real
   app di luar guide.
5. Jangan narasikan proses trial-error pencarian sendiri di dalam dokumen final.
6. Verifikasi wajib sebelum selesai (poin 5b-F core doc): `GuideTour.verifySelectors()` (semua
   ketemu), `GuideTour.verifyOrder()` (semua urut), `lint-id-text.js` (teks ID bersih dari slang),
   jalanin tour-nya beneran di browser (semua role, no console error, no area kosong, poin B/C).
   Kalau sebagian guide dikerjakan sub-agent/worker, verifikasi ulang — jangan percaya mentah.

Jangan eksekusi kalau scope module/project ambigu — tanya user dulu.

> v1.6.0: the guide shell (modal/page, search, menu, topics, role walkthroughs) is bundled generic in `template/shell/` (read `SHELL-SPEC.md`), do not rebuild it per project.
