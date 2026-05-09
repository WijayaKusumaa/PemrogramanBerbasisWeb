# SITTA UT — Sistem Informasi Tiras dan Transaksi Bahan Ajar
### Tugas Praktik 1 — STSI4209 Pemrograman Web
Universitas Terbuka (UT)

---

## Identitas Mahasiswa
- Nama: Wijaya Kusuma
- NIM: 050263657
- Pemrograman Berbasis Web

---

## Deskripsi Proyek
Proyek ini merupakan implementasi Tugas Praktik 1 untuk mata kuliah STSI4209 – Pemrograman Web, dengan tujuan mengimplementasikan konsep fundamental HTML, CSS, dan JavaScript DOM.

Aplikasi ini mensimulasikan Sistem Informasi Tiras dan Transaksi Bahan Ajar (SITTA) di Universitas Terbuka (UT), yaitu sistem yang digunakan untuk mengelola pemesanan, pengiriman, dan distribusi bahan ajar.

Pengembangan proyek ini berdasarkan dua penelitian utama oleh Unggul Utan Sufandi yang menjadi landasan ilmiah sistem SITTA UT.

---

## Referensi Akademik

1. Sufandi, U. U., Aprijani, D. A., & Pandiangan, P. (2021).  
   Evaluasi dan hasil review desain user interface prototype aplikasi mobile SITTA Universitas Terbuka.  
   Jurnal Nasional Pendidikan Teknik Informatika (JANAPATI), 10(3), 147–156.  
   [https://doi.org/10.23887/janapati.v10i3.40281](https://doi.org/10.23887/janapati.v10i3.40281)  

   ➤ Penelitian ini menjadi acuan dalam desain antarmuka (UI) dengan pendekatan Human-Centered Design (HCD) dan evaluasi heuristik.  
   Implementasinya pada proyek ini tampak pada desain yang:
   - Konsisten secara visual dan warna (biru UT)
   - Responsif dan mudah digunakan
   - Memberikan umpan balik pengguna melalui alert dan modal box

2. Sufandi, U. U. (2022).  
   Analisis kebutuhan dan dokumentasi Sistem Informasi Tiras dan Transaksi Bahan Ajar Universitas Terbuka.  
   Jurnal Nasional Pendidikan Teknik Informatika (JANAPATI), 11(2), 112–122.  
   [https://doi.org/10.23887/janapati.v11i2.42966](https://doi.org/10.23887/janapati.v11i2.42966)

   ➤ Penelitian ini digunakan untuk menentukan alur proses dan fitur aplikasi, seperti:
   - Pemesanan bahan ajar dan manajemen stok
   - Tracking pengiriman dengan nomor DO
   - Dashboard rekap data distribusi bahan ajar

---

## Fitur Aplikasi
1. Empat Halaman Terpisah
   - `index.html` – Login pengguna  
   - `dashboard.html` – Menu utama  
   - `tracking.html` – Tracking pengiriman bahan ajar  
   - `stok.html` – Manajemen stok bahan ajar  

2. HTML Semantik dan Valid
   - Menggunakan elemen `<header>`, `<main>`, `<section>`, `<table>`  
   - Validasi form dan atribut `required`  
   - Modal box interaktif untuk "Lupa Password" dan "Daftar"

3. CSS External dan Responsif
   - File `css/style.css` terpisah  
   - Layout berbasis Flexbox & Grid  
   - Responsif untuk desktop dan mobile  

4. JavaScript DOM Manipulation
   - Manipulasi tabel stok secara dinamis  
   - Validasi form login dan input  
   - Progress bar pada tracking pengiriman  
   - Session management menggunakan Local Storage

5. Fitur Kreatif Tambahan
   - Greeting otomatis berdasarkan waktu (pagi/siang/sore/malam)  
   - Modal box untuk interaksi pengguna  
   - Animasi transisi halus  
   - Desain UI profesional dengan warna khas UT

---

## Struktur Folder

sitta-praktik/
├── index.html
├── dashboard.html
├── stok.html
├── tracking.html
├── css/
│   └── style.css
├── js/
│   ├── auth.js
│   ├── data.js
│   ├── script.js
│   └── session.js
├── assets/
│   └── img/
│       ├── logo-ut.jpg
│       ├── Default.jpg
│       ├── pengantar_komunikasi.jpg
│       ├── kepemimpinan.jpg
│       ├── manajemen_keuangan.jpg
│       ├── mikrobiologi.jpg
│       └── paud_perkembangan.jpeg
└── README.md


---

## Cara Menjalankan Aplikasi
1. Ekstrak semua file ke dalam satu folder (`sitta-praktik/`)  
2. Buka file `index.html` di browser (disarankan: Google Chrome)  
3. Login menggunakan salah satu akun berikut:

| Email | Password | Role |
|-------|-----------|------|
| admin@ut.ac.id | admin123 | Admin |
| mahasiswa@ut.ac.id | mahasiswa123 | Mahasiswa |
| staff@ut.ac.id | staff123 | Staff UPBJJ |
| rina@ut.ac.id | rina123 | UPBJJ-UT |
| agus@ut.ac.id | agus123 | UPBJJ-UT |
| siti@ut.ac.id | siti123 | Puslaba |
| doni@ut.ac.id | doni123 | Fakultas |

4. Navigasikan menu dashboard untuk melihat fitur:
   - Tracking Pengiriman: cari nomor DO seperti `DO001`, `DO002`
   - Manajemen Stok: tambah, edit, hapus bahan ajar secara dinamis

---

## Keterkaitan Ilmiah dengan Referensi

| Konsep dari Jurnal | Implementasi pada Proyek |
|--------------------|---------------------------|
| Human-Centered Design (Sufandi et al., 2021) | UI bersih, warna UT, feedback visual |
| Evaluasi Heuristik (Sufandi et al., 2021) | Validasi form, alert error, konsistensi layout |
| Analisis kebutuhan fitur SITTA (Sufandi, 2022) | Menu Dashboard, Tracking DO, Stok bahan ajar |
| Proses distribusi & tracking bahan ajar | Progress bar dan data ekspedisi simulasi |
| Modularitas dokumentasi sistem (Sufandi, 2022) | Folder terpisah CSS/JS dan struktur rapi |

---

##Teknologi yang Digunakan
- HTML5 — struktur semantik  
- CSS3 — Flexbox, Grid, Media Queries  
- JavaScript (ES6+) — DOM Manipulation, Local Storage API  
- Browser Support: Chrome, Edge, Firefox, Safari  

## Catatan
- Aplikasi ini front-end only, tanpa backend atau database.  
- Data dummy disimpan dalam file `data.js`.  
- Semua interaksi bersifat simulatif untuk tujuan pembelajaran.  
- Tema, warna, dan istilah mengacu pada desain resmi SITTA Universitas Terbuka.

---

### © 2025 — Universitas Terbuka  
Tugas Praktik 1 STSI4209 — Pemrograman Web  
Dibuat berdasarkan penelitian:
> Sufandi, U. U., Aprijani, D. A., & Pandiangan, P. (2021)  
> Sufandi, U. U. (2022)
