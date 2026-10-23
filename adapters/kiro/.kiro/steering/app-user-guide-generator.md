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
4. Guide-nya 3 layer digabung (poin 5b/5c core doc): Tour/Coachmark (otomatis jalan duluan, nempel
   ke elemen ASLI di halaman, granular sampai tombol terkecil, lintas halaman, toggle EN/ID;
   skeleton `_app-user-guide-generator/template/guide-tour.template.js`) → IK interaktif
   (walkthrough E2E gaya tutorial game — mock UI niru form asli, highlight animasi, reveal "what
   happens", role picker kalau multi-role; skeleton
   `_app-user-guide-generator/template/guide-walkthrough.template.html`, dibuka manual) → layer
   detail lengkap (skeleton `_app-user-guide-generator/template/GUIDE.template.md`).
5. Jangan narasikan proses trial-error pencarian sendiri di dalam dokumen final.

Kalau module/app yang dimaksud, atau maksud "guide"-nya (cara-pakai vs dokumen domain-bisnis),
belum jelas, tanya user dulu sebelum mulai investigasi.
