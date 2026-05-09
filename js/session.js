/* ============================================================
   SITTA UT – Session & User Info Global
   Deskripsi: Menangani login session, user info, dan logout
   ============================================================ */

// Event listener yang memastikan skrip berjalan hanya setelah seluruh struktur HTML (DOM) dimuat
document.addEventListener("DOMContentLoaded", () => {
  
  // Mengambil data pengguna yang sedang login dari localStorage.
  // JSON.parse digunakan untuk mengubah data string kembali menjadi objek JavaScript.
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  // --- Proteksi Halaman (Session Check) ---
  // Jika variabel activeUser bernilai null (artinya tidak ada yang login atau data dihapus)
  if (!activeUser) {
    alert("Silakan login terlebih dahulu."); // Menampilkan peringatan
    window.location.href = "index.html"; // Mengarahkan paksa (redirect) kembali ke halaman login
    return; // Menghentikan eksekusi kode di bawahnya agar halaman tidak dirender
  }

  // --- Menampilkan Sapaan Dinamis (Dynamic Greeting) ---
  // Mencari elemen HTML dengan ID 'greeting' (biasanya ada di header dashboard atau halaman lainnya)
  const greet = document.getElementById("greeting");
  if (greet) {
    const hour = new Date().getHours(); // Mengambil jam saat ini dari sistem perangkat pengguna
    let waktu = "pagi"; // Default sapaan
    
    // Logika percabangan untuk menentukan waktu sapaan
    if (hour >= 12 && hour < 15) waktu = "siang";
    else if (hour >= 15 && hour < 18) waktu = "sore";
    else if (hour >= 18) waktu = "malam";
    
    // Menyisipkan teks sapaan dan nama pengguna yang diambil dari variabel activeUser ke dalam elemen HTML
    greet.textContent = `Selamat ${waktu}, ${activeUser.name}!`;
  }

  // --- Menampilkan Informasi Peran & Lokasi Pengguna ---
  const infoUser = document.getElementById("userInfo");
  if (infoUser) {
    // Menyisipkan teks berupa Role (misal: Administrator) dan Lokasi (misal: Pusat)
    infoUser.textContent = `${activeUser.role} (${activeUser.lokasi})`;
  }

  // --- Logika Logout (Keluar Sistem) ---
  // Mencari tombol logout di seluruh halaman
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // Menghapus data sesi 'activeUser' dari localStorage.
      // Ini membuat fungsi proteksi halaman di baris atas tadi akan bekerja jika user mencoba back/kembali.
      localStorage.removeItem("activeUser");
      
      // Mengarahkan kembali ke halaman login
      window.location.href = "index.html";
    });
  }
});