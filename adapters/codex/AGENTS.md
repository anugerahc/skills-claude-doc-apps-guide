<!--
  Snippet ini ditujukan buat di-append ke AGENTS.md project (root atau home directory), bukan
  dipakai berdiri sendiri. Codex CLI membaca AGENTS.md sebagai standing instruction tiap session.
-->

## App User Guide Generator (generate end-user guide per-module)

Saat user minta dibuatkan user guide/dokumentasi cara-pakai untuk sebuah module:

1. Baca `_app-user-guide-generator/core/app-user-guide-generator-core.md` dulu — itu sumber
   metodologi lengkap.
2. Guide bawaan app itu sendiri (kalau ada) = ground truth. Cari itu dulu — grep seluruh repo DAN
   semua branch git (`git branch -a` lalu grep tiap kandidat, bukan cuma working tree yang
   di-checkout) — sebelum pernah coba rekonstruksi dari kode.
3. Ketemu guide bawaan → extract verbatim: strip markup doang, jangan reword label tombol/pesan
   error/nama status.
4. Gak ketemu → rekonstruksi dari kode: view (label asli) → JS (dialog/validasi) → controller
   (pesan server) → constants/enum (nama status/role). Dilarang ngarang string yang "kedengerannya
   masuk akal".
5. Bangun 2 layer (poin 5b core doc), SEMUA di dalam guide — gak ada overlay di halaman real app:
   layer Guided Tour = mock screen (skeleton
   `_app-user-guide-generator/template/guide-walkthrough.template.html`) + engine coachmark
   (skeleton `_app-user-guide-generator/template/guide-tour.template.js` — selector nunjuk elemen
   MOCK di dalam guide, bukan elemen app asli; granular, EN/ID) → detail lengkap (skeleton
   `_app-user-guide-generator/template/GUIDE.template.md`).
6. Jangan narasikan proses trial-error pencarian sendiri di dalam dokumen final.
7. Kalau module/app atau maksud "guide"-nya ambigu, tanya user dulu sebelum mulai.
