# Guide gates (reference, jsdom)

Static gates that proved a Guided Tour correct before it was opened in a browser. They come from a working
project (i-Clause) — copy this folder next to the generated guide and adjust the CONFIG at the top of each file
(`GUIDE_ROOT`, the guide body / fragment / page-builder / step file names, the walk and screen plan).

| File | Gate | Pass when |
|---|---|---|
| `harness.js` | every sub-step finds its element on the assembled page | `notfound 0` |
| `ordercheck.js` | sub-steps follow DOM order (top to bottom, left to right); `act: true` skipped | `order inversions 0` |
| `duplicheck.js` | every page piece appears once per screen | `duplicates 0` |
| `leakcheck.js` | a variant screen shows none of the other variant's data | `leaks: 0` |
| `../lint-id-text.js` | casual words (ID and EN) and text format | no output / exit 0 |
| `enginetest.js` | self-test of `guide-tour.template.js` | numbering, core-first, act, no role button |

Setup: `npm i jsdom@24.1.3 jquery` (jsdom 24 because Node 22.11 cannot `require()` newer jsdom).
jsdom has no layout: it proves existence and order, not appearance. Always run the whole tour in a real browser too.
Prove each gate can fail: run it once against a deliberately broken copy.
