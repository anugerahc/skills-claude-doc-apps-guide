# App User Guide Generator — metodologi lengkap

Metodologi buat generate **end-user guide** (cara pakai software, bukan dokumentasi dev/arsitektur)
untuk 1 module/app, dari codebase-nya. Tool-agnostic — jalan di Claude Code, Google Antigravity,
Cursor, Kiro, Codex CLI, atau cuma di-upload sebagai knowledge file di ChatGPT/Gemini.

## Aturan paling penting

**Konten help bawaan app itu sendiri (kalau ada) adalah ground truth. Cari itu dulu sebelum nulis
apapun.** Nulis guide dengan cara baca controller/view terus nebak "kira-kira dipakainya gini" itu
hasilnya mental model developer yang dipoles jadi dokumentasi user — bentuknya mirip, tapi salah
cukup buat nyesatin user. Kalau yang asli ada, extract verbatim. Rekonstruksi dari kode cuma
fallback kalau beneran gak ada.

Lahir dari kegagalan nyata: percobaan pertama nebak isi guide dari baca kode MVC module (view, JS,
controller) — bentuknya kelihatan bener tapi bukan yang user maksud. App-nya ternyata punya halaman
"User Guide" interaktif, isinya ditulis tangan & dirawat, tapi nganggur di branch git lain dari yang
di-checkout. Selalu cek itu dulu sebelum rekonstruksi apapun.

## 1. Klarifikasi dulu maksud "guide"

Default-nya ambigu. Sebelum sentuh kode, pastikan:

- **Guide cara pakai software** (tombol, screen, workflow, pesan error) — kasus paling umum.
- **Dokumen domain bisnis yang DIHASILKAN app sebagai output** (misal app-nya menghasilkan "User
  Guide" sebagai jenis deliverable, kayak manual produk). Beda total — jangan asumsi.

Kalau gak jelas, tanya. Nebak salah arah = buang satu full pass.

## 2. Cari guide bawaan app SEBELUM baca apapun lagi

Checklist, berurutan:

1. `grep`/search seluruh repo, case-insensitive, buat `user guide|panduan|help|manual|petunjuk` di
   seluruh views/templates — bukan cuma folder module yang dimaksud. Konten guide biasanya di file
   sendiri (`UserGuide.*`, `_UserGuide*`, `Guide.*`, `HelpModal.*`).
2. **Cek SEMUA branch git, bukan cuma yang di-checkout.** `grep` biasa cuma nyari di working tree.
   Pakai `git grep` per branch, atau `git log --all` / `git branch -a` dulu buat lihat branch apa
   aja yang ada, baru grep tiap kandidat (`git grep -i "user guide" <branch>` atau
   `git show <branch>:<path>`) — konten bisa ada di branch dev/feature yang belum di-merge ke yang
   lagi di-checkout. **Ini penyebab paling sering "gak ketemu" pas searching.**
3. Cari route/page standalone khusus (misal `Guide.cshtml`, endpoint `/help` atau `/guide`, modal
   yang dipicu tombol "User Guide"/"Help") — biasanya render content partial besar yang ditulis
   terpisah dari view fitur itu sendiri.
4. Kalau masih nihil, tanya user langsung di mana dia pernah lihat itu (nama menu, screenshot) —
   jangan buang full-read-codebase pass lagi cuma buat nebak-nebak.

## 3. Kalau guide asli ketemu: extract verbatim, jangan diparafrase

- Tarik source mentahnya (file exact, branch/ref exact).
- Strip markup doang (tag HTML, blok `<style>`/`<script>`, directive template) — JANGAN pernah
  reword kalimat, ganti nama tombol, atau "rapihin" susunan kata. String literal di layar (label
  tombol, pesan error, nama status) itu yang dicocokin user — ubah dikit aja putus kecocokannya.
- Pertahankan struktur: heading → `#`/`##`, list item → `-`, table → markdown table. Hati-hati
  markup yang KELIHATAN kayak heading tapi sebenernya chrome dialog inline (misal title alert/
  confirm box yang di-render pakai `<h2>`) — jangan sampai jadi section header palsu.
- Pertahankan urutan topik asli kalau guide bawaannya punya nav/TOC — itu udah diorganisir sesuai
  maksud penulis aslinya.

## 4. Kalau gak ada guide bawaan: rekonstruksi dari kode, hati-hati

Baru di titik ini baca fitur-nya langsung, urutannya begini, dan kutip string exact sebisa mungkin
— jangan pernah ngarang label/pesan yang "kedengerannya masuk akal":

1. **Views/template** — label field asli, teks tombol, tanda wajib-isi, pengelompokan layout (ini
   LITERAL yang dilihat user di screen).
2. **JS client-side** — dialog konfirmasi, pesan validasi, apa yang beneran terjadi pas tombol
   diklik (AJAX call apa), kondisi disabled/enabled.
3. **Controller / API layer** — pesan validasi server-side (yang gak bisa direplikasi penuh di
   client), apa yang beneran berubah pas action sukses.
4. **Constants/enum** — nama status & label manusianya, nama role/departemen, mapping ala
   `GetLabel()` — ini kasih vocab exact yang dipakai app buat state & role.
5. **Entity/skema DB** — cuma buat paham bentuk data, bukan buat kata-kata yang dilihat user.

Tulis guide berdasar *apa yang user lihat dan lakukan*, pakai label on-screen exact — bukan
berdasar struktur internal kode. Guide yang diorganisir per nama method controller itu dev doc
pakai topeng.

## 5. Struktur output

Ikutin struktur app-nya sendiri kalau ada (poin 3). Kalau gak ada, default yang solid:

- Quick start / overview (1 paragraf: module ini buat apa)
- Roles — siapa boleh ngapain
- Status / lifecycle dokumen (kalau module-nya punya workflow state)
- Step-by-step per screen/stage, urut sesuai user beneran lewatinnya
- Button index (alfabetis, cross-reference ke step yang relevan)
- FAQ / lookup pesan error (string error verbatim → artinya / cara ngatasinnya)

Skeleton siap-isi: [`template/GUIDE.template.md`](../template/GUIDE.template.md) (konten layer
detail) + [`template/guide-walkthrough.template.html`](../template/guide-walkthrough.template.html)
(tampilan layer IK, lihat poin 5b).

## 5b. Format tampilan: 2 layer digabung, SEMUA di dalam guide — gak ada yang nongol di real app

Konten lengkap (poin 5) itu beda hal sama **cara dia ditampilin**. Dua layer ini DIGABUNG dalam
satu paket guide, dan **keduanya hidup di dalam guide/modal "User Guide" itu sendiri** — dipicu
tombol "User Guide"/"Panduan", bukan sesuatu yang auto-overlay di atas halaman real app yang
sedang dipakai user buat kerja beneran. Ini batasan keras: guide gak pernah nyuntik elemen/overlay
ke halaman real di luar dirinya sendiri.

1. **Layer "Guided Tour" interaktif — yang pertama keliatan saat guide dibuka.** Simulasi 1 alur
   end-to-end lewat **mock screens** (replika HTML/CSS tangan dari tiap halaman/langkah real app —
   bukan screenshot/iframe, dan bukan elemen app yang sebenernya), dengan interaksi gaya
   product-tour/coachmark (kayak Intro.js/Shepherd.js, tapi dibangun ulang vanilla biar portable,
   dan nyorot elemen DI DALAM mock screen-nya sendiri, bukan DOM app yang asli):
   - **Granular**: tiap kontrol di satu mock screen (termasuk tombol kecil/icon-only) dapet step
     spotlight + tooltip-nya sendiri, bukan cuma aksi utama. Spotlight = highlight pada elemen mock
     yang lagi dijelasin; tooltip di sebelahnya berisi judul + teks, indicator "Langkah x dari y",
     tombol Lewati / Kembali / Lanjut-Selesai.
   - **Teks tooltip muncul pelan-pelan (efek ngetik/typewriter)**, bukan langsung nongol semua —
     ini yang bikin kerasa "jalan sendiri" kayak dialog tutorial game.
   - **Toggle bahasa EN/ID** di tiap tooltip, tiap step nyimpen 2 versi teks, pilihan bahasa
     ke-persist (localStorage) sepanjang sesi guide.
   - Abis step terakhir 1 mock screen, lanjut ke **mock screen berikutnya** (simulasi "sekarang
     bayangin abis submit, pindah ke halaman detail") — masih di dalam guide yang sama, bukan
     navigasi beneran.
   - Kalau isi 1 mock screen panjang, **area itu yang scroll** (bukan seluruh guide) — judul &
     nav Lewati/Kembali/Lanjut tetap keliatan.
   - Kalau module-nya punya beberapa role/persona beda alur — kasih role picker di awal, pilih
     dulu baru masuk tour sesuai rolenya.
   - Data di contoh (nama, nomor, tanggal) SEMUA karangan/placeholder, dikasih keterangan eksplisit
     "contoh, bukan data asli".
   - Progress (mock screen mana yang udah ditour, step terakhir, bahasa) boleh ke-persist di
     localStorage scoped ke guide ini doang, biar kalau modal ditutup-buka lagi inget posisi —
     TIDAK ADA hubungannya sama navigasi halaman real app.
2. **Layer detail — tetep ada, diakses dari dalam guide yang sama** (nav/topic list/search), isinya
   struktur lengkap poin 5 (Overview, Roles, Lifecycle, step-by-step per screen, Button index, FAQ)
   — buat kasus yang gak ke-cover Guided Tour (edge case, pesan error spesifik, role yang gak
   dijalanin di tour).

Skeleton siap pakai: [`template/guide-tour.template.js`](../template/guide-tour.template.js) (engine
spotlight/tooltip/step-nav/EN-ID — generic, `selector`-nya diarahkan ke elemen DI DALAM mock screen
guide, bukan ke elemen real app) dipasangkan sama markup mock screen dari
[`template/guide-walkthrough.template.html`](../template/guide-walkthrough.template.html).

Sudah ada contoh kerja arah pola ini (bukan konsep kosong) di `examples/iclause-user-guide/GUIDE.md`
bagian "Quick start" — role picker, mock UI field mirip form asli, highlight animasi, reveal
"what happens", progress Back/Next, semuanya di dalam modal guide. Bagian lain di file yang sama
(Overview s/d FAQ) itu layer detailnya.

Modal `#modalFlexFormGuide` (accordion collapsed, liat langsung di module Flex Form Builder) BUKAN
pola ini — itu lebih statis/kurang menarik dibanding yang dimaksud di sini, jangan dipakai sebagai
acuan tampilan.

## 6. Kemas jadi skill portable

Setelah konten guide ditulis/di-extract:

- `GUIDE.md` (atau nama sejenis) — konten aktual, berdiri sendiri, gak ada markup khusus platform.
- Wrapper tipis per platform (lihat [README.md](../README.md) di root repo ini) biar `GUIDE.md`
  yang sama jalan sebagai Claude Skill, knowledge file Custom GPT, knowledge file Gemini Gem, atau
  attachment system-prompt biasa di platform lain.
- Jangan bikin MCP server buat ini kecuali guide-nya butuh data live (kontennya referensi statis —
  skill/knowledge file itu beratnya pas, bukan server tool-calling).

## Hal lain yang perlu dipegang

- Jangan narasikan proses trial-error investigasi sendiri (percobaan yang salah, branch yang
  ke-skip, dst) di DALAM dokumen guide final — itu cerita buat laporan ke user, bukan buat isi
  guide. Guide final cuma isinya: cara pakai yang bener.
- Kalau module/project yang dimaksud ambigu, tanya user dulu — jangan asumsi dan langsung eksekusi.
- Scope: metodologi ini generic lintas stack & lintas perusahaan. `examples/` di repo ini isinya
  contoh kerja nyata (1 biji) buat nunjukin metodenya beneran jalan — dibaca sebagai sample, bukan
  buat dicopy literal ke guide app lain yang gak berkaitan.
