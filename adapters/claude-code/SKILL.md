---
name: app-user-guide-generator
description: Use when asked to write, generate, or extract an end-user guide / help doc / manual for a software module or app from its source code or repo — especially "generate a user guide for module X", "document how to use this feature", or "what does the in-app help say about Y". Core rule: find and copy the app's own existing user-facing help content verbatim before ever writing new guide text from reading code structure.
---

# App User Guide Generator

Sumber metodologi lengkap (WAJIB dibaca dulu sebelum eksekusi): `../../core/app-user-guide-generator-core.md`

Skeleton siap-isi: `../../template/GUIDE.template.md` (copy ke lokasi output, isi `{{PLACEHOLDER}}`
dengan hasil investigasi module yang diminta).

## Ringkasan alur

1. Baca `core/app-user-guide-generator-core.md` — pegang aturan "guide bawaan app = ground truth",
   dan jangan rekonstruksi dari kode kalau yang asli ada.
2. Konfirmasi ke user: module/app mana, "guide" yang dimaksud itu cara-pakai-software atau dokumen
   domain-bisnis yang dihasilkan app. Kalau ambigu, tanya dulu.
3. Cari guide bawaan app dulu — grep seluruh repo DAN seluruh branch git (bukan cuma working tree),
   cari route/page standalone khusus help/guide. Baru kalau nihil, rekonstruksi dari kode (view →
   JS → controller → constants/enum).
4. Extract verbatim (kalau ketemu) atau tulis dari hasil investigasi (kalau rekonstruksi), pakai
   struktur di `template/GUIDE.template.md` sebagai skeleton.
5. Jangan narasikan proses trial-error pencarian sendiri di dalam dokumen final.

Jangan eksekusi kalau scope module/project ambigu — tanya user dulu.
