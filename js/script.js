/* ============================================================
   SITTA UT – Tugas Praktik 1 STSI4209 Pemrograman Berbasis Web
   File: script.js
   Deskripsi:
   - DOM Manipulation
   - CRUD stok (Semua User Bisa Akses)
   - Simulasi transaksi SASI (Semua User Bisa Akses)
   - Ringkasan stok & status pengiriman
   ============================================================ */

// Event listener utama: Menjalankan kode hanya setelah seluruh elemen HTML selesai dimuat oleh browser
document.addEventListener("DOMContentLoaded", () => {
  // Mengambil data user yang sedang login dari localStorage dan mengubahnya dari bentuk string JSON menjadi objek JavaScript
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  // Proteksi Halaman: Jika tidak ada data user yang login, arahkan paksa (redirect) kembali ke halaman index.html
  if (!activeUser) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "index.html";
    return; // Menghentikan eksekusi kode di bawahnya
  }

  // --- Tampilkan Greeting Dinamis Berdasarkan Waktu ---
  const greet = document.getElementById("greeting");
  if (greet) { // Mengecek apakah elemen dengan ID 'greeting' ada di halaman saat ini
    const hour = new Date().getHours(); // Mengambil jam komputer saat ini (format 24 jam)
    let waktu = "pagi";
    
    // Logika penentuan waktu
    if (hour >= 12 && hour < 15) waktu = "siang";
    else if (hour >= 15 && hour < 18) waktu = "sore";
    else if (hour >= 18) waktu = "malam";
    
    // Memasukkan teks sapaan beserta nama user ke dalam elemen HTML
    greet.textContent = `Selamat ${waktu}, ${activeUser.name}!`;
  }

  // --- Tampilkan Role & Lokasi User ---
  const infoUser = document.getElementById("userInfo");
  if (infoUser) {
    infoUser.textContent = `${activeUser.role} (${activeUser.lokasi})`;
  }

  /* ============================================================
     📦 RENDER DATA STOK BAHAN AJAR - SEMUA USER BISA LIHAT
     ============================================================ */
  const tableBody = document.getElementById("stokBody");
  
  // Jika elemen tabel stok ada di halaman ini (berarti sedang buka stok.html), maka jalankan fungsi render
  if (tableBody) {
    renderTable();
    renderStokSummary();
  }

  // Fungsi untuk mencetak isi tabel dari data JavaScript ke HTML (Manipulasi DOM)
  function renderTable() {
    tableBody.innerHTML = ""; // Mengosongkan isi tabel sebelum diisi ulang untuk mencegah duplikasi
    const bahanAjar = getDataBahanAjar(); // Mengambil data dari data.js atau localStorage
    
    // Perulangan (looping) untuk setiap item bahan ajar
    bahanAjar.forEach(item => {
      const row = document.createElement("tr"); // Membuat elemen baris tabel <tr> baru
      
      // Mengisi baris tabel dengan data item menggunakan template literal (backtick `)
      // toLocaleString() digunakan untuk memformat angka harga menjadi format ribuan
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.judul}</td>
        <td>${item.penerbit}</td>
        <td>${item.stok}</td>
        <td>Rp ${item.harga.toLocaleString()}</td>
        <td><img src="${item.cover || 'assets/img/Default.jpg'}" alt="${item.judul}" width="60" onerror="this.src='assets/img/Default.jpg'"></td>
        <td>
          <button class="btnEdit" onclick="editStok('${item.id}')">Edit</button>
          <button class="btnDelete" onclick="hapusStok('${item.id}')">Hapus</button>
          <button class="btn primary" onclick="pesanBahanAjar('${item.id}')">Pesan</button>
        </td>
      `;
      tableBody.appendChild(row); // Menyisipkan baris yang sudah dibuat ke dalam tabel di HTML
    });
  }

  /* ============================================================
     ➕ TAMBAH DATA BARU (CRUD - SEMUA USER BISA AKSES)
     ============================================================ */
  const btnAdd = document.getElementById("btnAdd");
  if (btnAdd) {
    btnAdd.addEventListener("click", () => {
      // Menggunakan prompt bawaan browser untuk mengambil input sederhana dari pengguna
      const id = prompt("Masukkan Kode Bahan Ajar:");
      const judul = prompt("Masukkan Judul Buku:");
      const penerbit = prompt("Masukkan Nama Penerbit:");
      const stok = parseInt(prompt("Masukkan Jumlah Stok:")) || 0; // parseInt memastikan input diubah jadi angka bulat
      const harga = parseInt(prompt("Masukkan Harga:")) || 0;

      // Validasi: Cegah penyimpanan jika ada input teks yang kosong
      if (!id || !judul || !penerbit) {
        alert("Semua field wajib diisi!");
        return;
      }

      // Ambil data lama, tambahkan data baru (push), lalu simpan kembali
      const bahanAjar = getDataBahanAjar();
      bahanAjar.push({ 
        id, 
        judul, 
        penerbit, 
        stok, 
        harga, 
        cover: "assets/img/Default.jpg" // Menggunakan gambar default untuk buku baru
      });
      saveDataBahanAjar(bahanAjar); // Menyimpan array yang sudah di-update ke localStorage
      
      alert("Data berhasil ditambahkan!");
      renderTable(); // Refresh tabel agar data baru langsung muncul
      renderStokSummary(); // Refresh hitungan total stok
    });
  }
});

/* ============================================================
   ✏️ Fungsi Edit & Hapus (CRUD) - SEMUA USER BISA AKSES
   ============================================================ */

// Fungsi untuk mengedit jumlah stok
function editStok(id) {
  const bahanAjar = getDataBahanAjar();
  const item = bahanAjar.find(i => i.id === id); // Mencari buku spesifik berdasarkan ID
  if (!item) return alert("Data tidak ditemukan!");

  // Meminta input stok baru, nilai defaultnya adalah stok yang saat ini ada
  const stokBaru = parseInt(prompt(`Stok baru untuk ${item.judul}:`, item.stok));
  
  // isNaN (is Not a Number) memastikan bahwa yang diketik user benar-benar angka
  if (!isNaN(stokBaru)) {
    item.stok = stokBaru; // Memperbarui nilai stok
    saveDataBahanAjar(bahanAjar);
    alert("Data berhasil diperbarui!");
    location.reload(); // Me-refresh seluruh halaman untuk melihat perubahan
  }
}

// Fungsi untuk menghapus data bahan ajar
function hapusStok(id) {
  const bahanAjar = getDataBahanAjar();
  const index = bahanAjar.findIndex(i => i.id === id); // Mencari urutan index data di dalam array
  if (index === -1) return alert("Data tidak ditemukan!");
  
  // Menampilkan kotak konfirmasi Yes/No
  if (confirm("Yakin ingin menghapus data ini?")) {
    bahanAjar.splice(index, 1); // splice() digunakan untuk menghapus elemen array pada index tertentu
    saveDataBahanAjar(bahanAjar);
    alert("Data berhasil dihapus!");
    location.reload(); // Me-refresh seluruh halaman
  }
}

/* ============================================================
   💳 Simulasi Transaksi Pemesanan Bahan Ajar (SASI)
   ============================================================ */
// Fungsi ini dipanggil ketika tombol "Pesan" diklik pada baris tabel stok
function pesanBahanAjar(id) {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  if (!activeUser) {
    alert("Silakan login terlebih dahulu.");
    return;
  }

  const bahanAjar = getDataBahanAjar();
  const bahan = bahanAjar.find(item => item.id === id);
  if (!bahan) {
    alert("Data bahan ajar tidak ditemukan!");
    return;
  }

  // Mengambil daftar pesanan yang sudah ada di localStorage, jika tidak ada, buat array kosong []
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Membuat objek pesanan baru (mensimulasikan proses checkout e-commerce)
  const newOrder = {
    // Membuat nomor DO otomatis berurutan
    doNumber: `DO${(orders.length + 5).toString().padStart(3, "0")}`, 
    nama: activeUser.name,
    status: "Dalam Pengiriman",
    progress: 60, // Set default progress bar ke 60%
    ekspedisi: "JNE",
    tanggalKirim: new Date().toISOString().split("T")[0], // Mengambil tanggal hari ini format YYYY-MM-DD
    jenisPaket: "Reguler",
    totalBayar: bahan.harga
  };

  orders.push(newOrder); // Menambahkan pesanan baru ke array orders
  localStorage.setItem("orders", JSON.stringify(orders)); // Menyimpan kembali ke database lokal

  alert(`Transaksi berhasil!\nNomor DO: ${newOrder.doNumber}\nJudul: ${bahan.judul}`);
}

/* ============================================================
   📊 RINGKASAN TOTAL STOK (SEMUA USER BISA LIHAT)
   ============================================================ */
// Fungsi untuk menghitung otomatis total stok dan jenis buku yang ada di atas tabel
function renderStokSummary() {
  const summary = document.getElementById("stokSummary");
  if (!summary) return;

  const bahanAjar = getDataBahanAjar();
  
  // reduce() digunakan untuk menjumlahkan semua properti 'stok' dari seluruh item di array
  const totalStok = bahanAjar.reduce((sum, item) => sum + item.stok, 0); 
  
  // length mengambil jumlah total jenis buku (berapa banyak objek di dalam array)
  const totalJenis = bahanAjar.length;

  document.getElementById("totalStok").textContent = `Total Stok: ${totalStok}`;
  document.getElementById("totalJenis").textContent = `Total Jenis Buku: ${totalJenis}`;
}

/* ============================================================
   🚚 RENDER TABEL TRACKING PENGIRIMAN
   ============================================================ */
// Fungsi ini mengubah array daftar pesanan menjadi elemen tabel HTML
function renderTrackingTable(list) {
  const tbody = document.getElementById("trackingBody");
  if (!tbody) return;

  tbody.innerHTML = "";
  list.forEach(item => {
    const row = document.createElement("tr");
    
    // Perhatikan pada bagian class "progress-bar", nilai width-nya diubah secara dinamis melalui CSS inline
    row.innerHTML = `
      <td>${item.doNumber}</td>
      <td>${item.nama}</td>
      <td>${item.status}</td>
      <td>
        <div class="progress-container">
          <div class="progress-bar" style="width: ${item.progress}%;">${item.progress}%</div>
        </div>
      </td>
      <td>${item.ekspedisi}</td>
      <td>${item.tanggalKirim}</td>
      <td>${item.jenisPaket}</td>
      <td>Rp ${item.totalBayar.toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });
}

/* ============================================================
   🚦 RINGKASAN STATUS PENGIRIMAN
   ============================================================ */
// Fungsi untuk menghitung dan menampilkan berapa banyak paket yang terkirim, proses, dsb.
function renderTrackingSummary() {
  const summary = document.getElementById("trackingSummary");
  if (!summary) return;

  // Gabungkan data tracking default dengan pesanan baru buatan user
  const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
  const allTracking = [...dataTracking, ...localOrders];

  const totalDO = allTracking.length;
  
  // filter() digunakan untuk memisahkan array berdasarkan kondisi tertentu, lalu length menghitung jumlahnya
  const dalamPengiriman = allTracking.filter(i => i.status === "Dalam Pengiriman").length;
  const terkirim = allTracking.filter(i => i.status === "Terkirim").length;
  const disiapkan = allTracking.filter(i => i.status === "Disiapkan").length;

  document.getElementById("totalDO").textContent = `Total DO: ${totalDO}`;
  document.getElementById("dalamPengiriman").textContent = `Dalam Pengiriman: ${dalamPengiriman}`;
  document.getElementById("terkirim").textContent = `Terkirim: ${terkirim}`;
  document.getElementById("disiapkan").textContent = `Disiapkan: ${disiapkan}`;
}

// Load tracking data ketika halaman tracking dimuat
document.addEventListener("DOMContentLoaded", () => {
  const tableTracking = document.getElementById("trackingBody");
  if (tableTracking) {
    // Jika berada di halaman tracking.html, gabungkan data lama dan baru, lalu panggil fungsi render
    const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const allTracking = [...dataTracking, ...localOrders];
    renderTrackingTable(allTracking);
    renderTrackingSummary();
  }
});