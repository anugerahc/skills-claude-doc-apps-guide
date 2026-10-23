---
name: app-user-guide-generator
description: Use when asked to write, generate, or extract an end-user guide / help doc / manual for a software module or app from its source code or repo — especially "generate a user guide for module X", "document how to use this feature", or "what does the in-app help say about Y". Core rule: find and copy the app's own existing user-facing help content verbatim before ever writing new guide text from reading code structure.
---

# App User Guide Generator

Sumber metodologi lengkap (WAJIB dibaca dulu sebelum eksekusi): `../../core/app-user-guide-generator-core.md`

Skeleton siap-isi (3 layer digabung, lihat core doc poin 5b/5c): `../../template/guide-tour.template.js`
(layer Tour/Coachmark — otomatis jalan DULUAN, nempel ke elemen ASLI, lintas halaman, EN/ID) +
`../../template/guide-walkthrough.template.html` (layer IK interaktif, dibuka manual) +
`../../template/GUIDE.template.md` (layer detail lengkap).

## Ringkasan alur

1. Baca `core/app-user-guide-generator-core.md` — pegang aturan "guide bawaan app = ground truth",
   dan jangan rekonstruksi dari kode kalau yang asli ada.
2. Konfirmasi ke user: module/app mana, "guide" yang dimaksud itu cara-pakai-software atau dokumen
   domain-bisnis yang dihasilkan app. Kalau ambigu, tanya dulu.
3. Cari guide bawaan app dulu — grep seluruh repo DAN seluruh branch git (bukan cuma working tree),
   cari route/page standalone khusus help/guide. Baru kalau nihil, rekonstruksi dari kode (view →
   JS → controller → constants/enum).
4. Extract verbatim (kalau ketemu) atau tulis dari hasil investigasi (kalau rekonstruksi). Bangun
   ketiga layer dari situ: Tour (`template/guide-tour.template.js`, granular — tiap kontrol dapet
   step, lintas halaman) → IK interaktif (`template/guide-walkthrough.template.html`) → detail
   (`template/GUIDE.template.md`) — poin 5b/5c core doc.
5. Jangan narasikan proses trial-error pencarian sendiri di dalam dokumen final.

Jangan eksekusi kalau scope module/project ambigu — tanya user dulu.
