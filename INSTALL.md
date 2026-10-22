# Cara Pasang App User Guide Generator di Project/Mesin Lain

Semua isi `_app-user-guide-generator/` (setelah dipasang) adalah file teks polos (markdown) — gak
ada dependency ke mesin ini, gak butuh install apapun secara khusus.

## Claude Code — instalasi resmi via plugin marketplace

```
/plugin marketplace add anugerahc/skills-claude-doc-apps-guide
/plugin install app-user-guide-generator@app-user-guide-generator-marketplace
```

Ini cara paling proper untuk Claude Code — plugin-nya bundle sendiri `core/` + `template/` di
dalam `plugins/app-user-guide-generator/`, jadi begitu terinstall langsung aktif, gak perlu copy
manual atau jalanin script apapun. Skill diaktifkan otomatis lewat
`/app-user-guide-generator:app-user-guide-generator` atau otomatis terpanggil pas konteksnya cocok.

## Cara cepat buat tool lain (otomatis)

Dari root project TARGET (project yang mau dipasangin skill ini):

```bash
# Linux / macOS / Git Bash / WSL
bash /path/to/skills-claude-doc-apps-guide/install.sh
```

```powershell
# Windows PowerShell
& "C:\path\to\skills-claude-doc-apps-guide\install.ps1"
```

Script otomatis: (1) copy `core/` + `template/` ke `_app-user-guide-generator/` di project target,
(2) deteksi tool AI coding apa yang kepake dari folder yang udah ada (`.claude/`, `.agents/`,
`.kiro/`, `.cursor/`, `AGENTS.md`), (3) pasang adapter yang cocok ke lokasi yang bener. Kalau gak
kedetek tool apapun, script nanya interaktif. Bisa juga paksa tool tertentu:
`--tool claude --tool cursor`, atau pasang semua sekaligus: `--all`.

Aman dijalankan berkali-kali (idempotent) — gak nimpa file lain yang gak berkaitan, dan untuk
`AGENTS.md` (Codex) nambah blok baru bukan nimpa isi existing.

## Cara manual (kalau gak mau/gak bisa jalanin script)

1. **Copy `core/` + `template/`** ke folder `_app-user-guide-generator/` di root project target.
2. **Copy adapter yang sesuai tool** ke lokasi yang tool itu baca:

   | Tool | Copy dari | Copy ke (root project target) |
   |---|---|---|
   | Claude Code | `adapters/claude-code/SKILL.md` | `.claude/skills/app-user-guide-generator/SKILL.md` |
   | Antigravity | `adapters/antigravity/.agents/` | `.agents/` (merge, jangan timpa isi lain) |
   | Kiro | `adapters/kiro/.kiro/` | `.kiro/` (merge) |
   | Cursor | `adapters/cursor/.cursor/` | `.cursor/` (merge) |
   | Codex CLI | isi `adapters/codex/AGENTS.md` | append ke `AGENTS.md` project (buat baru kalau belum ada) |

3. Pastikan `_app-user-guide-generator/core/app-user-guide-generator-core.md` dan
   `_app-user-guide-generator/template/` tetap bisa dijangkau dari path relatif yang dipakai di
   adapter (default: `_app-user-guide-generator/...` dari root project). Kalau struktur foldernya
   beda, sesuaikan path di adapter masing-masing.

## ChatGPT / Gemini / platform lain (tanpa sistem file project)

Lihat bagian "Non-coding-agent platforms" di [README.md](README.md) — upload
`core/app-user-guide-generator-core.md` sebagai knowledge file, gak perlu adapter apapun.

## Status instalasi resmi per tool

| Tool | Ada marketplace/install resmi? | Catatan |
|---|---|---|
| Claude Code | ✅ Sudah aktif | Repo ini sudah jadi marketplace (`.claude-plugin/marketplace.json`) + plugin (`plugins/app-user-guide-generator/`) yang bundle `core/`+`template/` sendiri. |
| Antigravity | ✅ Ya | Skill bisa didaftarkan ke marketplace Antigravity/`npx skills` untuk one-click install. Minimal tanpa marketplace pun tinggal copy folder ke `.agents/skills/`. |
| Cursor | ⚠️ Terbatas | Ada Marketplace resmi tapi publish ke situ baru kebuka penuh untuk akun Team/Enterprise. Untuk individual user, distribusi ya manual copy `.cursor/rules/`. |
| Kiro | ⚠️ Via extension pihak ketiga | Ada community extension buat install steering docs dari GitHub — bukan mekanisme resmi AWS. Tanpa extension itu, manual copy ke `.kiro/steering/`. |
| Codex CLI | ❌ Tidak ada | `AGENTS.md` murni file konvensi, gak ada sistem plugin/install. Selalu manual copy/append. |
