# DOKUMEN REQUIREMENT PRODUK (PRD) — VERSI V2 (INTERMEDIATE VERSION)
## CRM Dashboard Preview, Komparasi Solusi, dan Kepercayaan Sosial (Tema Orange)

---

## 1. PENJELASAN UMUM

PRD V2 bertujuan untuk meningkatkan konversi pendaftaran uji coba dan pemesanan sesi demo langsung. Ini dicapai dengan menampilkan mockup dasbor interaktif bertema orange, serta menghadirkan ulasan testimoni dan FAQ terstruktur.

---

## 2. PERSYARATAN FITUR & STRUKTUR LOKAL

- **Sticky Navbar**: Navbar melayang yang menempel saat scroll dengan warna putih/transparan glassmorphism.
- **Dashboard Preview (Interaktif)**: Mockup dasbor admin CaterBox CRM dengan tab filter waktu (Minggu Ini, Bulan Ini, Tahun Ini). Mengubah visualisasi metrik (Revenue, Customers) dan grafik bar secara real-time.
- **Social Proof**: Statistik ringkasan data yang diakumulasikan sistem:
  - Customers Terdaftar (10.000+), Total Order Diproses (500.000+), Transaksi Terverifikasi (Rp12M+), Active VIP Members (8.500+).
- **3 Pilar Solusi Utama (Pengganti Komparasi Manual)**:
  - *Pencatatan Rapi*: Tidak ada kertas pesanan hilang, semua tersimpan otomatis di basis data.
  - *Invoice & Bayar Otomatis*: Verifikasi pembayaran real-time menggunakan Midtrans.
  - *Kunci Loyalitas VIP*: Perhitungan poin loyalty member secara otomatis.
- **Testimonial Slider**: Carousel testimoni kustom (Siska Amelia, Hendra Wijaya, Dewi Lestari).
- **FAQ Accordion**: 10 tanya-jawab umum tentang harga, integrasi, keamanan data, WhatsApp gateway, dan trial gratis.

---

## 3. LOKASI IMPLEMENTASI (DIREKTORI & BERKAS)

Berikut adalah lokasi berkas di mana fitur-fitur PRD V2 ini telah diimplementasikan dalam kode proyek:

### A. Fitur Halaman Utama & Elemen Interaktif
- **Sticky Navbar & Header Navigasi**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Tambahkan kelas `sticky top-0 bg-white/80 backdrop-blur-md` pada tag `<nav>`.
- **Preview Dasbor & Grafik Dinamis**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Diimplementasikan menggunakan React State `dashboardTab` yang menyaring `dashboardData` untuk merender angka metrik dan grafik bar secara instan.
- **3 Pilar Solusi**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Ditampilkan dalam bentuk grid 3 kolom yang menjelaskan manfaat utama CaterBox CRM.
- **Testimonial Carousel & FAQ Accordion**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Carousel testimoni dikendalikan state `activeTestimonial` (0, 1, 2) dan FAQ dikendalikan state `openFaq` untuk membuka/menutup accordion dropdown.

### B. Portal Otentikasi & Akun
- **Pintu Masuk Login**: [Login.jsx](file:///C:/Users/ASUS/haya-space/src/pages/auth/Login.jsx)
  - Menghubungkan formulir masuk staf ke rute dasbor admin atau member berdasarkan peran (role) pengguna.
- **Formulir Registrasi Staf**: [Register.jsx](file:///C:/Users/ASUS/haya-space/src/pages/auth/Register.jsx)
  - Formulir pembuatan akun admin katering baru.

### C. Dasbor Sistem Nyata (Setelah Login)
- **Dasbor Admin**: [Dashboard.jsx](file:///C:/Users/ASUS/haya-space/src/pages/Dashboard.jsx)
  - Halaman internal tempat admin mengelola pesanan riil, melihat analitik pendapatan, dan menambahkan pesanan baru.
- **Dasbor Member**: [MemberHome.jsx](file:///C:/Users/ASUS/haya-space/src/pages/member/MemberHome.jsx)
  - Halaman internal tempat pelanggan melihat sisa poin loyalti dan daftar pesanan aktif mereka.
