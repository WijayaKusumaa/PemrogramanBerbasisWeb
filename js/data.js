/* ============================================================
   SITTA UT – Tugas Praktik 1 STSI4209 Pemrograman Berbasis Web
   File: data.js
   Deskripsi: Menyediakan data dummy untuk simulasi login, stok,
              dan tracking bahan ajar.
   ============================================================ */

// 🧑‍💼 Data Pengguna Demo (Login)
const usersDemo = [
  { email: "admin@ut.ac.id", password: "admin123", role: "Administrator", name: "Admin SITTA", lokasi: "Pusat" },
  { email: "mahasiswa@ut.ac.id", password: "mahasiswa123", role: "Mahasiswa", name: "Mahasiswa UT", lokasi: "-" },
  { email: "staff@ut.ac.id", password: "staff123", role: "Staff UPBJJ", name: "Staff UPBJJ", lokasi: "UPBJJ" },
  { email: "rina@ut.ac.id", password: "rina123", role: "UPBJJ-UT", name: "Rina Wulandari", lokasi: "UPBJJ Jakarta" },
  { email: "agus@ut.ac.id", password: "agus123", role: "UPBJJ-UT", name: "Agus Pranoto", lokasi: "UPBJJ Makassar" },
  { email: "siti@ut.ac.id", password: "siti123", role: "Puslaba", name: "Siti Marlina", lokasi: "Pusat" },
  { email: "doni@ut.ac.id", password: "doni123", role: "Fakultas", name: "Doni Setiawan", lokasi: "FISIP" }
];

// 📚 Data Bahan Ajar (Stok) - Update dengan gambar yang ada
const dataBahanAjar = [
  { id: "ASIP4301", judul: "Pengantar Ilmu Komunikasi", penerbit: "UT Press", stok: 548, harga: 50000, cover: "assets/img/pengantar_komunikasi.jpg" },
  { id: "MKU4201", judul: "Kepemimpinan", penerbit: "UT Press", stok: 123, harga: 48000, cover: "assets/img/kepemimpinan.jpg" },
  { id: "MANA4302", judul: "Manajemen Keuangan", penerbit: "UT Press", stok: 221, harga: 52000, cover: "assets/img/manajemen_keuangan.jpg" },
  { id: "BIO4305", judul: "Mikrobiologi", penerbit: "UT Press", stok: 150, harga: 54000, cover: "assets/img/mikrobiologi.jpg" },
  { id: "PAUD4204", judul: "Perkembangan Anak Usia Dini", penerbit: "UT Press", stok: 324, harga: 47000, cover: "assets/img/paud_perkembangan.jpeg" }
];

// 🚚 Data Tracking Pengiriman (Simulasi DO)
const dataTracking = [
  { doNumber: "DO001", nama: "Siti Marlina", status: "Dalam Pengiriman", progress: 60, ekspedisi: "JNE", tanggalKirim: "2025-09-10", jenisPaket: "Reguler", totalBayar: 75000 },
  { doNumber: "DO002", nama: "Agus Pranoto", status: "Terkirim", progress: 100, ekspedisi: "J&T", tanggalKirim: "2025-09-05", jenisPaket: "Kilat", totalBayar: 90000 },
  { doNumber: "DO003", nama: "Rina Wulandari", status: "Disiapkan", progress: 25, ekspedisi: "SiCepat", tanggalKirim: "2025-09-12", jenisPaket: "Reguler", totalBayar: 65000 },
  { doNumber: "DO004", nama: "Doni Setiawan", status: "Dalam Pengiriman", progress: 45, ekspedisi: "POS", tanggalKirim: "2025-09-11", jenisPaket: "Reguler", totalBayar: 80000 }
];

/* ============================================================
   🔧 FUNGSI TAMBAHAN – Untuk Kemudahan Akses di Semua Halaman
   ============================================================ */
function getDataBahanAjar() {
  const saved = localStorage.getItem("dataBahanAjar");
  return saved ? JSON.parse(saved) : dataBahanAjar;
}

function saveDataBahanAjar(data) {
  localStorage.setItem("dataBahanAjar", JSON.stringify(data));
}

function getActiveUser() {
  const user = localStorage.getItem("activeUser");
  return user ? JSON.parse(user) : null;
}

function logoutUser() {
  localStorage.removeItem("activeUser");
  window.location.href = "index.html";
}

// Placeholder default cover
const defaultCover = "assets/img/Default.jpg";