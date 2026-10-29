/* Demo content + config for the plain-HTML demo (no framework, no jQuery, no Bootstrap). Shows the whole shell contract. */
(function () {
    var tourScreens = [
        {
            screenKey: 'orders', scope: '#demoMockOrders', chapter: { en: 'Orders list', id: 'Daftar pesanan' },
            steps: [
                { selector: '[data-mock="title"]', en: { title: 'Page title', text: 'This is the Orders page.' }, id: { title: 'Judul halaman', text: 'Ini halaman Pesanan.' } },
                { selector: '[data-mock="btnNew"]', en: { title: 'New order', text: 'Starts an empty order.' }, id: { title: 'Pesanan baru', text: 'Memulai pesanan kosong.' } },
                { selector: '[data-mock="table"]', en: { title: 'Orders table', text: 'One row per order. Click a number to open it.' }, id: { title: 'Tabel pesanan', text: 'Satu baris per pesanan. Klik nomor untuk membukanya.' } }
            ]
        },
        {
            screenKey: 'detail', scope: '#demoMockDetail', chapter: { en: 'Order detail', id: 'Detail pesanan' },
            steps: [
                { selector: '[data-mock="customer"]', en: { title: 'Customer', text: 'Required. Pick it with the search button.' }, id: { title: 'Pelanggan', text: 'Wajib. Pilih lewat tombol cari.' } },
                { selector: '[data-mock="btnSave"]', en: { title: 'Save', text: 'Saves the order as a draft.' }, id: { title: 'Simpan', text: 'Menyimpan pesanan sebagai draf.' } }
            ]
        }
    ];

    var content =
        '<section data-gw-topic="overview">'
        + '<h2 data-l="en">Overview</h2><h2 data-l="id">Gambaran umum</h2>'
        + '<div class="gw-short" data-l="en"><ul><li>Orders are created, saved as draft, then submitted.</li><li>Every order has one owner.</li></ul></div>'
        + '<div class="gw-short" data-l="id"><ul><li>Pesanan dibuat, disimpan sebagai draf, lalu dikirim.</li><li>Setiap pesanan punya satu pemilik.</li></ul></div>'
        + '<div class="gw-more">'
        + '<h3 data-l="en">Statuses</h3><h3 data-l="id">Status</h3>'
        + '<div class="gw-flow"><span class="node">Draft</span><span class="arr">→</span><span class="node">Submitted</span><span class="arr">→</span><span class="node ok">Done</span></div>'
        + '<div class="gw-co tip" data-l="en"><b>Tip.</b> Save often, a draft is never lost.</div><div class="gw-co tip" data-l="id"><b>Tips.</b> Sering-seringlah menyimpan, draf tidak pernah hilang.</div>'
        + '<div class="gw-tblwrap"><table class="gw-table"><thead><tr><th>Status</th><th data-l="en">Meaning</th><th data-l="id">Arti</th></tr></thead><tbody>'
        + '<tr><td><span class="gw-b yellow">Draft</span></td><td data-l="en">Not sent yet.</td><td data-l="id">Belum dikirim.</td></tr>'
        + '<tr><td><span class="gw-b green">Done</span></td><td data-l="en">Finished and locked.</td><td data-l="id">Selesai dan terkunci.</td></tr></tbody></table></div>'
        + '</div></section>'

        + '<section data-gw-topic="roles">'
        + '<h2 data-l="en">Who does what</h2><h2 data-l="id">Siapa mengerjakan apa</h2>'
        + '<div class="gw-roles">'
        + '<button type="button" class="gw-role" data-walk="owner"><span class="rt" data-l="en">Order owner</span><span class="rt" data-l="id">Pemilik pesanan</span><span class="rd" data-l="en">Creates and sends</span><span class="rd" data-l="id">Membuat dan mengirim</span></button>'
        + '<button type="button" class="gw-role" data-walk="viewer"><span class="rt" data-l="en">Viewer</span><span class="rt" data-l="id">Pembaca</span><span class="rd" data-l="en">Read only</span><span class="rd" data-l="id">Hanya melihat</span></button>'
        + '</div>'
        + '<div class="gw-walk" data-walk="owner">'
        + '<div class="gw-wstep"><h4 data-l="en">Create</h4><h4 data-l="id">Buat</h4><p data-l="en">Choose New order and fill the customer.</p><p data-l="id">Pilih Pesanan baru dan isi pelanggan.</p><span class="gw-go" data-gw-tour="detail"><span data-l="en">See the screen in the Guided Tour</span><span data-l="id">Lihat layarnya di Guided Tour</span></span></div>'
        + '<div class="gw-wstep"><h4 data-l="en">Send</h4><h4 data-l="id">Kirim</h4><p data-l="en">Save, then submit.</p><p data-l="id">Simpan, lalu kirim.</p></div>'
        + '</div>'
        + '<div class="gw-walk" data-walk="viewer"><div class="gw-wstep"><h4 data-l="en">Read</h4><h4 data-l="id">Baca</h4><p data-l="en">Open any order. You cannot change it.</p><p data-l="id">Buka pesanan mana pun. Anda tidak dapat mengubahnya.</p></div></div>'
        + '</section>'

        + '<section data-gw-topic="faq"><h2>FAQ</h2><p data-l="en">Why can I not edit an order? It is Done, or you are not its owner.</p><p data-l="id">Mengapa saya tidak bisa mengubah pesanan? Statusnya Done, atau Anda bukan pemiliknya.</p></section>'

        // mock screens of the tour: the host's own markup + CSS (here: two tiny fake pages). The shell never styles them.
        + '<section id="demoMockOrders" hidden style="border:1px solid #dde4e0;border-radius:10px;padding:14px;background:#fff">'
        + '<h3 data-mock="title" style="margin:0 0 8px">Orders</h3><button type="button" data-mock="btnNew" style="margin-bottom:8px">New order</button>'
        + '<table data-mock="table" style="width:100%;border-collapse:collapse"><tr><th align="left">No</th><th align="left">Customer</th><th align="left">Status</th></tr><tr><td>ORD-001</td><td>PT Contoh</td><td>Draft</td></tr><tr><td>ORD-002</td><td>CV Sample</td><td>Done</td></tr></table></section>'
        + '<section id="demoMockDetail" hidden style="border:1px solid #dde4e0;border-radius:10px;padding:14px;background:#fff">'
        + '<h3 style="margin:0 0 8px">Order ORD-003</h3><label data-mock="customer">Customer * <input value="PT Contoh" disabled></label><br><br><button type="button" data-mock="btnSave">Save</button></section>';

    window.demoGuide = function (mode) {
        var host = document.createElement('div'); host.id = 'gwContent'; host.hidden = true; host.innerHTML = content; document.body.appendChild(host);
        return GwGuide.init({
            id: 'demo', mode: mode, root: '#guideRoot', content: '#gwContent',
            title: { en: 'Orders User Guide', id: 'Panduan Pengguna Pesanan' }, subtitle: { en: 'How to create and send an order', id: 'Cara membuat dan mengirim pesanan' },
            langs: [{ code: 'en', label: 'EN' }, { code: 'id', label: 'ID' }],
            ui: {
                en: { tourLead: 'One tour, start to finish.', tourHow: 'Read the bubble, then choose Next.' },
                id: { search: 'Cari di panduan...', filter: 'Saring topik...', openTab: 'Buka di tab baru', prev: 'Sebelumnya', next: 'Berikutnya', inShort: 'Ringkas', showDetails: 'Tampilkan detail', hideDetails: 'Sembunyikan detail', language: 'Bahasa', pickRole: 'Pilih peran untuk melihat langkahnya.', restart: 'Mulai ulang tur', tourLead: 'Satu tur dari awal sampai akhir.', tourHow: 'Baca gelembung, lalu pilih Lanjut.' }
            },
            groups: [
                { id: 'start', title: { en: 'Start here', id: 'Mulai di sini' }, topics: [{ key: 'tour', title: 'Guided Tour' }, { key: 'overview', title: { en: 'Overview', id: 'Gambaran umum' } }, { key: 'roles', title: { en: 'Who does what', id: 'Siapa mengerjakan apa' } }] },
                { id: 'ref', title: { en: 'Reference', id: 'Referensi' }, topics: [{ key: 'faq', title: 'FAQ' }] }
            ],
            tour: {
                screens: tourScreens,
                captions: {
                    orders: { title: { en: 'Orders list', id: 'Daftar pesanan' }, intro: { en: 'The start page.', id: 'Halaman awal.' } },
                    detail: { title: { en: 'Order detail', id: 'Detail pesanan' }, intro: { en: 'One order.', id: 'Satu pesanan.' } }
                }
            },
            triggers: '#openGuide', openInTab: { url: 'guide.html' }
        });
    };
})();
