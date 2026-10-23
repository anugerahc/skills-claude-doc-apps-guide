# App User Guide Generator

Metodologi + scaffold buat generate **end-user guide** (cara pakai, bukan dokumentasi teknis) per
module/app dari codebase nyata — wajib cari & pakai konten help bawaan app itu sendiri (kalau ada)
secara verbatim, baru rekonstruksi dari kode kalau beneran gak ada. Tool-agnostic: jalan di Claude
Code, Google Antigravity, Cursor, Kiro, Codex CLI — atau cuma di-upload sebagai knowledge file di
ChatGPT/Gemini.

## Isi repo

```
core/app-user-guide-generator-core.md   ← metodologi lengkap (sumber kebenaran tunggal)
template/guide-tour.template.js         ← skeleton layer Tour/Coachmark (nempel ke DOM asli, lintas halaman, EN/ID)
template/guide-walkthrough.template.html ← skeleton layer IK interaktif (walkthrough E2E, mock UI + animasi)
template/GUIDE.template.md              ← skeleton layer detail lengkap
adapters/                                ← file aktivasi per tool (Claude Code, Antigravity, Kiro, Cursor, Codex)
install.sh / install.ps1                 ← installer otomatis, deteksi tool & pasang adapter yang cocok
INSTALL.md                               ← panduan instalasi manual (kalau gak mau pakai script)
PROMPTS.md                               ← contoh prompt optimal buat hasil generate paling maksimal
examples/iclause-user-guide/             ← satu contoh kerja nyata (lihat Kenapa ini ada)
```

## Quick start

### Claude Code — install plugin (cara resmi, 1x setup)

1. Buka Claude Code di project mana pun (interactive terminal atau desktop app).
2. Tambahkan marketplace-nya:
   ```
   /plugin marketplace add anugerahc/skills-claude-doc-apps-guide
   ```
3. Install plugin-nya dari marketplace tadi:
   ```
   /plugin install app-user-guide-generator@app-user-guide-generator-marketplace
   ```
4. Kalau muncul `Run /reload-plugins to activate.`, jalankan:
   ```
   /reload-plugins
   ```
5. Verifikasi ke-install dengan benar:
   ```
   /plugin
   ```
   → tab **Installed**, cari `app-user-guide-generator`.
6. Selesai. Skill otomatis aktif — tinggal minta di chat: *"buatkan user guide untuk module X"*,
   atau panggil eksplisit dengan `/app-user-guide-generator:app-user-guide-generator`. Buat hasil
   paling maksimal, pakai template prompt di [PROMPTS.md](PROMPTS.md) — bukan asal sebut nama
   module doang.

Gak perlu clone repo atau copy file manual sama sekali — plugin sudah bundle `core/` +
`template/`-nya sendiri.

> Update ke versi terbaru: `/plugin marketplace update app-user-guide-generator-marketplace` lalu
> install ulang. Uninstall: `/plugin uninstall app-user-guide-generator@app-user-guide-generator-marketplace`.

### Tool lain (Antigravity, Cursor, Kiro, Codex CLI) — installer script

```bash
git clone https://github.com/anugerahc/skills-claude-doc-apps-guide.git
cd /path/to/your-project
bash /path/to/skills-claude-doc-apps-guide/install.sh
```

Lihat [INSTALL.md](INSTALL.md) untuk detail & instalasi manual per tool.

### ChatGPT (Custom GPT / Project)

1. Buat Custom GPT (atau ChatGPT Project) baru.
2. Upload `core/app-user-guide-generator-core.md` sebagai **Knowledge file**.
3. Instructions: *"Ikuti metodologi di file yang di-upload kalau diminta bikin/extract user guide
   untuk suatu module. Selalu cari guide bawaan app lintas SEMUA branch git dulu sebelum nulis
   dari hasil baca kode."*

### Google Gemini (Gem)

1. Buat Gem baru.
2. Di "Knowledge", upload `core/app-user-guide-generator-core.md`.
3. Instruction Gem: sama seperti poin ChatGPT di atas.

### Platform lain / generic (system prompt manual)

Tempel isi `core/app-user-guide-generator-core.md` sebagai system prompt / context attachment.

## Kenapa ini ada

Guide yang dibikin asal tebak dari baca controller/view gampang salah — bentuknya mirip dokumentasi
user tapi isinya mental model developer. Lahir dari kegagalan nyata: percobaan pertama generate
guide buat module i-Clause (lihat [`examples/iclause-user-guide/`](examples/iclause-user-guide/))
dengan cara baca kode MVC-nya — hasilnya ketolak, karena app itu ternyata punya halaman "User
Guide" interaktif, ditulis tangan, tapi nganggur di branch git lain dari yang lagi di-checkout.
Metodologi ini maksa alur kerja: cari konten help bawaan app dulu (lintas SEMUA branch), extract
verbatim kalau ketemu, baru rekonstruksi dari kode (view → JS → controller → constants/enum) kalau
beneran gak ada — dan selalu pakai string on-screen exact, gak pernah ngarang.

Contoh di `examples/iclause-user-guide/` itu cuma pembuktian metodenya jalan di kasus nyata, bukan
template buat dicopy ke module lain — isinya proses bisnis internal 1 perusahaan tertentu.

## Lisensi

MIT.
