/* ============================================================
   SITTA UT – Tugas Praktik 1 STSI4209 Pemrograman Berbasis Web
   File: auth.js
   Deskripsi: Login, validasi form, modal box, & pendaftaran real.
   ============================================================ */

// Event listener ini memastikan seluruh file HTML (DOM) selesai dimuat 
// sebelum JavaScript mulai mencari elemen dan menjalankan aksinya.
document.addEventListener("DOMContentLoaded", () => {
  // Mengambil elemen-elemen dari HTML berdasarkan ID-nya agar bisa dimanipulasi
  const form = document.getElementById("loginForm");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const closeModal = document.getElementById("closeModal");
  const openRegister = document.getElementById("openRegister");
  const openForgot = document.getElementById("openForgot");

  /* ============================================================
     🔐 LOGIN FORM VALIDATION
     ============================================================ */
  // Menangkap aksi saat tombol "Login" (submit) ditekan
  form.addEventListener("submit", e => {
    e.preventDefault(); // Mencegah halaman me-refresh secara otomatis saat form dikirim

    // Mengambil nilai input email dan password, lalu menghapus spasi berlebih di awal/akhir menggunakan trim()
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validasi dasar: memastikan form tidak kosong
    if (!email || !password) {
      alert("Email dan password harus diisi!");
      return; // Menghentikan eksekusi kode di bawahnya jika form kosong
    }

    // Mengambil seluruh data user (gabungan dari data.js dan localStorage)
    const allUsers = getAllUsers();
    
    // Mencari user yang email dan password-nya cocok dengan yang diinputkan
    // toLowerCase() digunakan agar email tidak sensitif terhadap huruf besar/kecil
    const user = allUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    // Jika user tidak ditemukan di array allUsers
    if (!user) {
      alert("Email atau password yang Anda masukkan salah!");
      form.reset(); // Mengosongkan form input
      return;
    }

    // Jika berhasil login, simpan data user ke 'activeUser' di localStorage
    // JSON.stringify mengubah objek JavaScript menjadi string agar bisa disimpan di localStorage
    localStorage.setItem("activeUser", JSON.stringify(user));

    alert(`Selamat datang, ${user.name}!`);
    window.location.href = "dashboard.html"; // Mengarahkan user ke halaman dashboard
  });

  /* ============================================================
     💬 MODAL BOX: DAFTAR & LUPA PASSWORD
     ============================================================ */

  // --- Daftar Pengguna Baru ---
  // Aksi ketika tombol "Daftar" diklik
  openRegister.addEventListener("click", () => {
    modalTitle.textContent = "Form Pendaftaran Pengguna Baru"; // Mengubah judul modal
    
    // Memasukkan struktur HTML form pendaftaran ke dalam body modal
    modalBody.innerHTML = `
      <form id="formRegister" class="form">
        <div class="form-group">
          <label>Nama Lengkap</label>
          <input type="text" id="regName" required placeholder="Nama Lengkap">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="regEmail" required placeholder="email@ut.ac.id">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="regPassword" minlength="4" required placeholder="Minimal 4 karakter">
        </div>
        <button type="submit" class="btn primary">Daftar</button>
      </form>
    `;
    showModal(); // Memanggil fungsi untuk menampilkan modal

    // Menangani aksi submit khusus pada form pendaftaran (yang baru saja di-inject di atas)
    const regForm = document.getElementById("formRegister");
    regForm.addEventListener("submit", e => {
      e.preventDefault();
      
      // Mengambil nilai dari form pendaftaran
      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value.trim();

      if (!name || !email || !password) {
        alert("Semua field harus diisi!");
        return;
      }

      // Mengecek apakah email yang didaftarkan sudah pernah ada di sistem
      // some() akan mengembalikan nilai true jika ada minimal 1 kecocokan
      const allUsers = getAllUsers();
      if (allUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        alert("Email sudah terdaftar. Silakan login.");
        hideModal();
        return;
      }

      // Membuat objek user baru dan menyimpannya menggunakan fungsi saveNewUser
      const newUser = { email, password, role: "Mahasiswa", name, lokasi: "UPBJJ Lokal" };
      saveNewUser(newUser);

      alert("Pendaftaran berhasil! Silakan login menggunakan email dan password Anda.");
      hideModal(); // Menutup modal setelah berhasil daftar
    });
  });

  // --- Lupa Password ---
  // Aksi ketika tombol "Lupa Password" diklik
  openForgot.addEventListener("click", () => {
    modalTitle.textContent = "Form Lupa Password";
    
    // Inject elemen HTML form ke dalam modal
    modalBody.innerHTML = `
      <form id="formForgot" class="form">
        <div class="form-group">
          <label>Masukkan Email Anda</label>
          <input type="email" id="forgotEmail" required placeholder="email@ut.ac.id">
        </div>
        <div class="form-group">
          <label>Password Baru</label>
          <input type="password" id="newPassword" minlength="4" required placeholder="Password baru minimal 4 karakter">
        </div>
        <button type="submit" class="btn primary">Reset Password</button>
      </form>
    `;
    showModal();

    // Menangani submit pada form lupa password
    const forgotForm = document.getElementById("formForgot");
    forgotForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("forgotEmail").value.trim();
      const newPassword = document.getElementById("newPassword").value.trim();
      
      if (!email || !newPassword) {
        alert("Semua field harus diisi!");
        return;
      }

      const allUsers = getAllUsers();
      // findIndex() mencari posisi/index user di dalam array
      const userIndex = allUsers.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

      // Jika findIndex mengembalikan -1, artinya data tidak ditemukan
      if (userIndex === -1) {
        alert("Email tidak ditemukan di sistem!");
        return;
      }

      // Jika user ditemukan, timpa password lamanya dengan password baru
      allUsers[userIndex].password = newPassword;
      
      // Simpan kembali array yang sudah diperbarui ke localStorage.
      // filter() di sini memastikan kita hanya menyimpan user yang baru didaftarkan ke localStorage 
      // (tidak ikut menyimpan user bawaan dari usersDemo agar tidak duplikat)
      localStorage.setItem("registeredUsers", JSON.stringify(allUsers.filter(user => !usersDemo.includes(user))));

      alert(`Password berhasil direset untuk ${email}!`);
      hideModal();
    });
  });

  // --- Tutup modal box ---
  // Aksi jika tombol 'X' di pojok kanan atas diklik
  closeModal.addEventListener("click", hideModal);
  
  // Aksi jika area gelap di luar kotak modal diklik (untuk menutup modal)
  modal.addEventListener("click", e => {
    if (e.target === modal) hideModal(); 
  });

  /* ============================================================
     ⚙️ Fungsi Show / Hide Modal
     ============================================================ */
  // Menghapus class "hide" dari CSS agar elemen modal terlihat di layar
  function showModal() {
    modal.classList.remove("hide");
  }

  // Menambahkan kembali class "hide" agar elemen modal sembunyi, 
  // serta membersihkan teks dan form yang ada di dalamnya
  function hideModal() {
    modal.classList.add("hide");
    modalTitle.textContent = "";
    modalBody.innerHTML = "";
  }
});

/* ============================================================
   💾 FUNGSI GLOBAL UNTUK REGISTRASI & LOGIN
   ============================================================ */

// Fungsi untuk mengambil seluruh user
function getAllUsers() {
  // Mengambil user hasil registrasi dari localStorage (atau array kosong [] jika belum ada)
  const localUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  
  // Menggabungkan array usersDemo (dari data.js) dengan localUsers menggunakan spread operator (...)
  return [...usersDemo, ...localUsers];
}

// Fungsi untuk menyimpan user pendaftar baru
function saveNewUser(newUser) {
  // Tarik data user lama dari localStorage
  const localUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  
  // Masukkan data user baru ke dalam array tersebut
  localUsers.push(newUser);
  
  // Simpan kembali array yang sudah ditambahkan user baru tersebut ke localStorage
  localStorage.setItem("registeredUsers", JSON.stringify(localUsers));
}