---
name: app-user-guide-generator
description: Generate end-user guide untuk 1 module/app dari investigasi source code (+ guide bawaan app kalau ada). Pakai saat user minta dibuatkan user guide/dokumentasi cara-pakai untuk module tertentu.
---

# App User Guide Generator

## When to use this skill
User minta dibuatkan user guide / dokumentasi cara-pakai (bukan dokumentasi teknis/arsitektur)
untuk 1 module tertentu dalam sebuah app.

## How to use it

1. Baca metodologi lengkap di `_app-user-guide-generator/core/app-user-guide-generator-core.md`
   (root project, atau path yang user tunjuk) SEBELUM mulai — aturan "guide bawaan = ground truth"
   dan urutan investigasi ada di situ.
2. Kalau module/app yang dimaksud belum jelas, atau "guide" ambigu (cara-pakai vs dokumen domain-
   bisnis), tanya dulu — jangan asumsi.
3. Cari guide bawaan app dulu: grep seluruh repo DAN seluruh branch git (`git branch -a`, lalu grep
   per branch) untuk teks "user guide"/"help"/"panduan"/"manual", cari route/page/modal help
   standalone. Baru kalau beneran nihil, rekonstruksi dari kode: view (label/tombol) → JS (validasi/
   dialog) → controller (pesan server) → constants/enum (nama status/role).
4. Kalau guide bawaan ketemu: extract verbatim, cuma strip markup, jangan reword kalimat/nama
   tombol/pesan error.
5. Bangun 2 layer, gabung dalam 1 guide (poin 5b core doc) — SEMUA di dalam guide, gak ada yang
   overlay di halaman real app: layer **Guided Tour** = mock screen tangan niru UI app asli
   (skeleton `_app-user-guide-generator/template/guide-walkthrough.template.html`) + engine
   coachmark di atasnya (skeleton `_app-user-guide-generator/template/guide-tour.template.js` —
   selector-nya nunjuk elemen MOCK di dalam guide, bukan elemen app asli; granular sampai tombol
   terkecil, toggle EN/ID, typewriter) → layer **detail lengkap** (skeleton
   `_app-user-guide-generator/template/GUIDE.template.md`).
6. Jangan narasikan proses trial-error pencarian sendiri di dalam dokumen final — itu buat laporan
   ke user di chat, bukan buat isi guide.
7. Verifikasi wajib sebelum lapor selesai (poin 5b-F core doc): label tombol & pesan error di guide
   match sama kode/guide asli; `GuideTour.verifySelectors()`/`verifyOrder()` semua lolos;
   `_app-user-guide-generator/template/lint-id-text.js` buat teks ID bersih dari slang; jalanin
   tour-nya beneran di browser (semua role, no console error). Hasil sub-agent/worker verifikasi
   ulang, jangan percaya mentah.
