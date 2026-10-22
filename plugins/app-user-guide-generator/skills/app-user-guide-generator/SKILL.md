---
name: app-user-guide-generator
description: Use when asked to write, generate, or extract an end-user guide / help doc / manual for a software module or app from its source code or repo — especially "generate a user guide for module X", "document how to use this feature", or "what does the in-app help say about Y". Core rule: find and copy the app's own existing user-facing help content verbatim before ever writing new guide text from reading code structure.
---

# App User Guide Generator

> **PENTING — sumber file WAJIB dari plugin, bukan dari hasil pencarian disk.**
> File metodologi + skeleton yang dibutuhkan skill ini sudah dibundle DI DALAM plugin ini sendiri,
> di path `${CLAUDE_PLUGIN_ROOT}`. JANGAN pernah Glob/Grep/cari folder bernama
> `app-user-guide-generator`, `core`, atau `template` di lokasi lain di filesystem — kalau
> kebetulan ada folder dengan nama mirip di mesin ini (sisa clone/dev folder lama), itu BUKAN
> sumber yang dipakai skill ini dan isinya bisa beda/basi. Selalu resolve `${CLAUDE_PLUGIN_ROOT}`
> dulu (contoh: `ls "${CLAUDE_PLUGIN_ROOT}"`) dan pastikan operasi read mengarah ke path itu.
>
> **Read-only terhadap diri sendiri.** `${CLAUDE_PLUGIN_ROOT}/core` dan
> `${CLAUDE_PLUGIN_ROOT}/template` TIDAK BOLEH ditulis/diedit — itu bundle plugin, bukan folder
> kerja. Copy `template/GUIDE.template.md` ke lokasi output di project user dulu, baru edit
> salinannya di sana.

Sumber metodologi lengkap (WAJIB dibaca dulu sebelum eksekusi):
`${CLAUDE_PLUGIN_ROOT}/core/app-user-guide-generator-core.md`

Skeleton siap-isi: `${CLAUDE_PLUGIN_ROOT}/template/GUIDE.template.md`

## Ringkasan alur

1. Resolve `${CLAUDE_PLUGIN_ROOT}` dan konfirmasi lewat shell (`ls "${CLAUDE_PLUGIN_ROOT}"`) bahwa
   isinya ada `core/` dan `template/` sebelum lanjut.
2. Baca `${CLAUDE_PLUGIN_ROOT}/core/app-user-guide-generator-core.md` — pegang aturan "guide bawaan
   app = ground truth".
3. Konfirmasi ke user: module/app mana (dan project/repo-nya di mana), "guide" yang dimaksud itu
   cara-pakai-software atau dokumen domain-bisnis yang dihasilkan app. Kalau ambigu, tanya dulu —
   jangan asumsi.
4. **Cari guide bawaan app dulu, sebelum baca kode fitur-nya sama sekali:**
   - Grep seluruh repo (case-insensitive) untuk `user guide|panduan|help|manual|petunjuk`, bukan
     cuma folder module yang dimaksud.
   - **Cek semua branch git**, bukan cuma yang di-checkout: `git branch -a` dulu, lalu grep per
     branch kandidat (`git grep` / `git show <branch>:<path>`). Ini penyebab paling sering konten
     "gak ketemu" padahal ada.
   - Cari route/page/modal help standalone (`Guide.*`, `_UserGuide*`, `/help`, `/guide`).
   - Kalau masih nihil, tanya user langsung di mana dia pernah lihat itu — jangan ulang full-read
     pass lagi cuma buat nebak.
5. **Ketemu guide bawaan** → extract verbatim dari source exact (file + branch/ref-nya): strip
   markup doang (HTML tag, `<style>`/`<script>`, directive template), jangan reword kalimat/label
   tombol/pesan error. Pertahankan urutan topik asli kalau ada nav/TOC.
6. **Gak ketemu guide bawaan** → rekonstruksi dari kode, urut: view/template (label & tombol asli)
   → JS client-side (dialog konfirmasi, pesan validasi) → controller/API (pesan server) →
   constants/enum (nama status/role, mapping `GetLabel()`-style). Kutip string exact — dilarang
   ngarang label yang "kedengerannya masuk akal".
7. Copy `${CLAUDE_PLUGIN_ROOT}/template/GUIDE.template.md` (path yang sudah di-resolve di langkah
   1, bukan hasil pencarian lain) ke folder output di project user — isi section demi section di
   SALINAN itu, bukan di `${CLAUDE_PLUGIN_ROOT}/template/`.
8. Jangan narasikan proses trial-error pencarian sendiri (percobaan salah, branch yang ke-skip,
   dst) di DALAM dokumen final — itu buat laporan ke user di chat, bukan isi guide.
9. Sebelum declare selesai: grep hasil akhir cari `{{` yang kelewat, dan cek label tombol/pesan
   error di guide beneran match sama sumbernya (guide asli atau kode).

Jangan eksekusi kalau scope module/project ambigu — tanya user dulu.
