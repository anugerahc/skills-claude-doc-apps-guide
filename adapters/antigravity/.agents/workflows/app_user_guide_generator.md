---
description: Generate end-user guide untuk 1 module/app dari guide bawaan app (kalau ada) atau investigasi source code
---

When the user types `/app-user-guide-generator`, jalankan skill `app-user-guide-generator`
(`.agents/skills/app-user-guide-generator/SKILL.md`):
1. Kalau argumen module/app belum disebut di prompt, tanya dulu — jangan asumsi.
2. Ikuti Instructions di `SKILL.md` langkah demi langkah (cari guide bawaan dulu, lintas branch
   git, sebelum rekonstruksi dari kode).
3. Laporkan ke user path file guide yang dihasilkan, dan apakah itu hasil extract verbatim dari
   guide bawaan atau rekonstruksi dari kode.

> v1.6.0: the guide shell (modal/page, search, menu, topics, role walkthroughs) is bundled generic in `template/shell/` (read `SHELL-SPEC.md`), do not rebuild it per project.
