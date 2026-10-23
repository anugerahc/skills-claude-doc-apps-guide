---
version: "1.0.0"
category: "documentation"
description: "Metodologi generate end-user guide untuk 1 module/app dari guide bawaan app (kalau ada) atau investigasi source code"
inclusion: "manual"
---

# App User Guide Generator

Aktifkan steering ini dengan `#app-user-guide-generator` saat user minta dibuatkan user guide/
dokumentasi cara-pakai untuk sebuah module.

Metodologi lengkap ada di `_app-user-guide-generator/core/app-user-guide-generator-core.md` (root
project atau path yang user tunjuk) — baca file itu dulu sebelum eksekusi apapun. Ringkasan aturan
paling penting:

1. Guide bawaan app itu sendiri (kalau ada) = ground truth. Cari itu dulu — grep seluruh repo DAN
   semua branch git (bukan cuma `git grep` di working tree yang lagi di-checkout; cek
   `git branch -a` dan grep tiap kandidat) — sebelum pernah coba rekonstruksi dari kode.
2. Ketemu guide bawaan → extract verbatim: strip markup doang, jangan reword kalimat/label tombol/
   pesan error.
3. Gak ketemu guide bawaan → rekonstruksi dari kode, urut: view (label/tombol asli) → JS (dialog
   konfirmasi/validasi) → controller (pesan server) → constants/enum (nama status/role). Kutip
   string exact, jangan ngarang.
4. Guide-nya 2 layer digabung (poin 5b core doc), SEMUA di dalam guide — gak ada overlay di halaman
   real app: layer Guided Tour = mock screen gaya tutorial game (niru UI form asli, highlight
   animasi, reveal "what happens", role picker kalau multi-role; skeleton
   `_app-user-guide-generator/template/guide-walkthrough.template.html`) + engine coachmark
   granular di atasnya (sampai tombol terkecil, toggle EN/ID, typewriter; skeleton
   `_app-user-guide-generator/template/guide-tour.template.js` — selector nunjuk elemen MOCK di
   dalam guide, bukan elemen app asli) → layer detail lengkap (skeleton
   `_app-user-guide-generator/template/GUIDE.template.md`).
5. Jangan narasikan proses trial-error pencarian sendiri di dalam dokumen final.
6. Verifikasi wajib sebelum selesai (poin 5b-F): `GuideTour.verifySelectors()`/`verifyOrder()`
   semua lolos, `_app-user-guide-generator/template/lint-id-text.js` buat teks ID (formal, pakai
   "Anda", tanpa slang), jalanin tour-nya di browser semua role (no console error, no area kosong).
   Hasil sub-agent/worker verifikasi ulang, jangan percaya mentah.

Kalau module/app yang dimaksud, atau maksud "guide"-nya (cara-pakai vs dokumen domain-bisnis),
belum jelas, tanya user dulu sebelum mulai investigasi.
