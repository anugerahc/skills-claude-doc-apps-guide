# Contoh prompt buat hasil paling maksimal

Sebut nama module/app DAN lokasi repo-nya — jangan cuma nama module doang, biar skill langsung
tahu di mana harus cari.

## Prompt minimal (OK, tapi bakal ditanya balik kalau ambigu)

> "Buatkan user guide untuk module Payment di repo ini."

## Prompt optimal

> "Buatkan end-user guide (cara pakai, bukan dokumentasi teknis) untuk module Payment di
> `apps/billing`. Repo ini punya beberapa branch — cek dulu ada gak 'User Guide'/help bawaan yang
> udah ditulis sebelumnya (bisa aja di branch lain), baru rekonstruksi dari kode kalau beneran gak
> ada. Simpan hasilnya di `docs/payment-user-guide.md`."

Yang bikin beda:
- **Sebut jenis guide-nya** ("end-user guide, bukan dokumentasi teknis") — hilangin ambiguitas di
  langkah 1 metodologi.
- **Minta cek guide bawaan dulu, lintas branch** — eksplisit ngingetin step paling sering
  kelewat, meskipun skill-nya udah tau ini wajib.
- **Kasih lokasi output** — biar gak nanya balik di tengah jalan.

## Follow-up yang berguna

> "Guide-nya ketemu bawaan atau rekonstruksi dari kode? Kalau rekonstruksi, bagian mana yang
> kurang yakin match sama behavior aslinya?"

Ini maksa skill transparan soal sumbernya — rekonstruksi dari kode selalu lebih riskan salah
dibanding extract verbatim dari guide asli.
