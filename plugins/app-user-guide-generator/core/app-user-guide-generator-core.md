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

- Overview (1 paragraf: module ini buat apa)
- Quick start — ringkasan langkah-langkah, referensi manual self-paced (bukan interaktif; beda dari
  layer Guided Tour di poin 5b, yang itu topik TERSENDIRI, bukan bagian dari daftar ini)
- Roles — siapa boleh ngapain
- Status / lifecycle dokumen (kalau module-nya punya workflow state)
- Step-by-step per screen/stage, urut sesuai user beneran lewatinnya
- Button index (alfabetis, cross-reference ke step yang relevan)
- FAQ / lookup pesan error (string error verbatim → artinya / cara ngatasinnya)

Skeleton siap-isi: [`template/GUIDE.template.md`](../template/GUIDE.template.md) (konten layer
detail) + [`template/guide-walkthrough.template.html`](../template/guide-walkthrough.template.html)
(tampilan layer IK, lihat poin 5b).

## 5b. Format tampilan: Guided Tour (topik tersendiri) + layer detail, SEMUA di dalam guide

Konten lengkap (poin 5) itu beda hal sama **cara dia ditampilin**. Guide punya 2 layer, dan
**keduanya hidup di dalam guide/modal "User Guide" itu sendiri** — dipicu tombol "User
Guide"/"Panduan", bukan sesuatu yang auto-overlay di atas halaman real app yang sedang dipakai user
buat kerja beneran. Ini batasan keras: guide gak pernah nyuntik elemen/overlay ke halaman real di
luar dirinya sendiri.

### A. Struktur: Guided Tour adalah topik TERPISAH, bukan bagian dari daftar poin 5

- **Guided Tour jadi topik PERTAMA dan default** saat guide dibuka. Isinya, berurutan: sambutan
  singkat (1-2 kalimat), role picker (kalau multi-role), lalu tour jalan **otomatis lintas mock
  screen** begitu role dipilih.
- **Quick start** (daftar langkah ringkas, self-paced, dibaca manual — BUKAN interaktif) tetap ada
  sebagai topik tersendiri di layer detail (poin 5), terpisah dari Guided Tour.
- **Alur berkelanjutan**: begitu sub-step TERAKHIR sebuah mock screen selesai (tombol terakhirnya
  diklik), tampilkan hasilnya (lihat "auto-reveal" di bawah), lalu render bar **"Previous screen /
  Replay / Next screen"**. Klik "Next screen" langsung memulai tour mock screen berikutnya — TANPA
  klik tambahan lain (gak ada dialog konfirmasi perantara). Di mock screen terakhir, ganti bar itu
  jadi kartu **"Tour complete"** berisi: Replay (ulang dari screen 1), Change role (balik ke role
  picker), Open detail topic (pindah ke layer detail). Posisi terakhir (index screen + bahasa)
  disimpan di localStorage; tawarkan tombol "Continue" di entry point guide kalau ada progress
  tersimpan sebelumnya.
- **Kontrak engine**: engine tour (lihat poin di bawah) WAJIB menerima (1) `scope` — elemen/selector
  tempat `querySelector` dibatasi, BUKAN pencarian global `document.querySelector`; (2) callback
  `onFinish`/`onSkip`; (3) label tombol sub-step terakhir yang bisa di-override (defaultnya bukan
  "Selesai" kalau abis ini lanjut ke screen berikutnya, tapi semacam "Lihat hasil"/"See result").
  Target yang masih `hidden` di panel hasil WAJIB ke-reveal otomatis oleh engine, bukan nunggu klik.

### B. Layout: manfaatkan seluruh lebar modal

- Section Guided Tour (root, mock screen, bar antar-screen) **gak boleh punya max-width sempit**,
  dan mock screen **gak boleh dibatasi tinggi tetap** — tinggi ngikutin konten, lebar ngisi lebar
  konten modal. Dilarang nyisain area kosong besar di sisi kanan.
- **Wajib dicek** render-nya di 3 lebar viewport: 1366px, 1920px, dan lebar mobile (~375-414px).

### C. Mock screen = halaman UTUH, bukan potongan

- Tiap mock screen dirakit dari **seluruh komponen halaman asli** dengan urutan & proporsi layout
  asli (header/topbar, navigasi/stepper, kartu, panel, toolbar) — bukan cuma 1-2 tombol yang lagi
  dibahas doang.
- Area yang lagi dijelaskan **disorot** (highlight), sisanya **diredupkan tapi tetap keliatan**
  sebagai konteks — teknik yang dipakai: opacity turun pada elemen lain + outline pada target,
  BUKAN backdrop gelap/`position:fixed` yang nutupin konteks (lihat implementasi di
  `guide-tour.template.js`, fungsi `applyDimTarget`). Selector sub-step boleh nunjuk kontrol di
  mana aja dalam halaman itu (gak harus elemen yang paling mencolok).
- Dialog/modal yang jadi BAGIAN dari mock screen (misal mockup dialog konfirmasi/hasil) **wajib
  dirender statis di alur dokumen** — tanpa `position:fixed`/`absolute`, tanpa offset manual, tanpa
  backdrop sendiri — dan **gak boleh menutupi kontrol lain atau tombolnya sendiri**. Verifikasi
  wajib: gak ada bounding box elemen interaktif yang tumpang tindih dengan dialog manapun (poin F).

### D. Urutan

- Sub-step di tiap mock screen diurutkan **kaku**: atas ke bawah, lalu kiri ke kanan, sesuai posisi
  visual elemen di layar (bukan urutan penulisan di kode, bukan urutan "kepentingan").
- Kontrol yang HARUS diklik user (buat lanjut ke screen berikutnya) jadi **sub-step terakhir
  tersendiri** — tapi urutan visual tetap dipegang; gak boleh "dipaksa jadi terakhir" kalau posisi
  visualnya di tengah-tengah, kecuali kontrolnya memang berada paling bawah/kanan secara visual.
- Urutan mock screen (screen 1, 2, 3, dst) mengikuti **alur kerja nyata app** (status/lifecycle-nya,
  lihat poin 5's "Status / lifecycle" kalau module-nya punya workflow state) — diverifikasi
  terhadap kode (controller/constants yang mendefinisikan urutan status), bukan ditebak.

### E. Bahasa (profesional, bukan casual)

- **EN**: kalimat aktif, ringkas, satu ide per kalimat, label UI dikutip PERSIS seperti yang
  tertulis di layar (jangan diterjemahkan/diparafrase).
- **ID**: bahasa formal baku, pakai "Anda" (bukan "lu"/"kamu"), TANPA slang atau campur kode casual
  — istilah teknis dan label UI tetap dalam bahasa aslinya (jangan dipaksa terjemahin "Submit" jadi
  "Kirim" kalau tombolnya emang tertulis "Submit").
- Judul tiap sub-step = nama kontrol atau nama tindakannya (bukan kalimat panjang).
- **Lint wajib**: sebelum declare selesai, scan semua teks ID yang baru ditulis, tolak kalau
  mengandung kata casual (daftar minimal: `gak`, `banget`, `dong`, `nih`, `lu`, `gue`/`gua`, `yaa`,
  `deh`, `sih`, `nya` berlebihan, `kayak`/`kyk`) — ini ATURAN KONTEN GUIDE yang dihasilkan untuk
  end-user, beda total dari gaya bicara santai yang dipakai pas ngobrol sama user yang minta
  dibuatin guide-nya. Jangan campur dua konteks itu.

### F. Verifikasi wajib sebelum declare selesai

1. **Fakta per step dicek ke kode** — urutan: view/template → JS client-side → controller/API →
   constants/enum. Kalau sebagian isi guide ini dikerjakan oleh sub-agent/worker, hasilnya WAJIB
   di-verifikasi ULANG terhadap kode sebelum dipakai — JANGAN percaya hasil sub-agent mentah-mentah
   (pernah salah: label tombol keliru dikutip, lihat `examples/iclause-user-guide/NOTES.md` buat
   pola kegagalan serupa yang pernah kejadian pas rekonstruksi dari kode).
2. **Uji selector terhadap DOM nyata** (browser, atau jsdom buat cek exist/gaknya elemen — jsdom
   gak valid buat cek posisi visual karena `getBoundingClientRect` selalu 0 di situ): pakai
   `GuideTour.verifySelectors(screens)` — tiap sub-step harus nemu TEPAT 1 elemen yang dimaksud;
   laporkan & perbaiki yang `found: false`.
2b. Cek urutan visual pakai `GuideTour.verifyOrder(screens)` (BUTUH browser beneran, bukan jsdom) —
   laporkan & perbaiki step manapun yang keluar dari aturan D.
3. **Jalankan seluruh tour, semua role, di browser beneran**: pastikan (a) gak ada error di
   console, (b) gak ada mock screen yang kelewat tanpa tour-nya (setiap screen yang didaftarkan di
   alur kena tour), (c) tooltip gak pernah menutupi targetnya sendiri, (d) gak ada area kosong
   besar yang kelihatan (poin B), (e) gak ada dialog mock yang tumpang tindih kontrol lain (poin C).

Skeleton siap pakai: [`template/guide-tour.template.js`](../template/guide-tour.template.js) (engine
`runScreen`/`runSequence`/`verifySelectors`/`verifyOrder` — generic, `selector`/`scope`-nya
diarahkan ke elemen DI DALAM mock screen guide, bukan ke elemen real app) dipasangkan sama markup
mock screen dari [`template/guide-walkthrough.template.html`](../template/guide-walkthrough.template.html).

Sudah ada contoh kerja arah pola ini (bukan konsep kosong) di `examples/iclause-user-guide/GUIDE.md`
bagian "Quick start" — role picker, mock UI field mirip form asli, highlight animasi, reveal
"what happens", progress Back/Next, semuanya di dalam modal guide (versi sebelum pola Guided Tour
di atas diformalkan — treat sebagai bukti konsep, bukan contoh struktur final). Bagian lain di file
yang sama (Overview s/d FAQ) itu layer detailnya.

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
