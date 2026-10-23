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
5. Bangun 2 layer, gabung dalam 1 guide: layer **IK interaktif** (walkthrough E2E gaya tutorial
   game — mock UI tangan niru form asli, highlight animasi di target klik, reveal "what happens",
   role picker kalau multi-role; skeleton `_app-user-guide-generator/template/guide-walkthrough.template.html`)
   DITAMPILKAN DULUAN, lalu layer **detail lengkap** (skeleton
   `_app-user-guide-generator/template/GUIDE.template.md`) nempel di sebelahnya/di baliknya — lihat
   core doc poin 5b.
6. Jangan narasikan proses trial-error pencarian sendiri di dalam dokumen final — itu buat laporan
   ke user di chat, bukan buat isi guide.
7. Verifikasi hasil sebelum lapor selesai: label tombol & pesan error di guide match sama yang ada
   di kode/guide asli.
