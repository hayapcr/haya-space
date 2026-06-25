# DOKUMEN REQUIREMENT PRODUK (PRD) — VERSI V2 (INTERMEDIATE VERSION)
## CRM Dashboard Preview, Komparasi Solusi, dan Kepercayaan Sosial

---

## 1. PENJELASAN UMUM

PRD V2 bertujuan untuk meningkatkan tingkat konversi pengunjung (dari melihat-lihat menjadi mendaftar trial atau menjadwalkan demo). Ini dicapai dengan menampilkan preview antarmuka dasbor produk yang meyakinkan, menyoroti testimoni pelanggan asli, serta menjawab keraguan umum melalui FAQ.

---

## 2. PERSYARATAN FITUR & STRUKTUR

- **Sticky Navbar**: Navbar melayang yang tetap menempel di atas layar saat digulirkan (scroll), lengkap dengan tombol Login dan Register.
- **Dashboard Preview**: Mockup visual dasbor admin CaterBox CRM untuk meyakinkan calon pelanggan mengenai kualitas software.
- **Social Proof**: Statistik ringkasan data yang dikelola sistem:
  - Total Customers (10.000+), Total Orders (500.000+), Total Revenue (Rp12M+), Active Members (8.500+).
- **Problem & Solution Grid**: Sisi-komparasi masalah manajemen katering tradisional (manual WhatsApp/Excel) vs solusi otomatisasi CaterBox CRM.
- **8 Fitur Inti CRM**: Customer CRM, Order Management, Payment, Membership, Campaign Promo, Feedback, Analytics, dan Admin Management.
- **Testimonial Slider**: Komponen carousel yang menampilkan minimal 3 ulasan pelanggan sukses (Siska Amelia, Hendra Wijaya, Dewi Lestari).
- **FAQ Accordion**: 10 tanya-jawab umum tentang harga, integrasi, keamanan data, WhatsApp gateway, dan trial gratis.

---

## 3. LOKASI IMPLEMENTASI (DIREKTORI & BERKAS)

Berikut adalah petunjuk lokasi berkas untuk mengimplementasikan fitur-fitur PRD V2 di dalam proyek React:

### A. Fitur Halaman Utama & Elemen Interaktif
- **Sticky Navbar & Animasi Kontrol**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Tambahkan kelas `sticky top-0 bg-white/80 backdrop-blur-md` pada tag `<nav>`.
- **Preview Dasbor & Grafik Dinamis**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Implementasikan status tab (`weekly`, `monthly`, `yearly`) yang mengubah angka metrik ringkasan (Revenue, Orders) dan tinggi grafik bar secara dinamis.
- **Problem & Solution & Fitur Grid**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Tulis komponen kartu grid untuk komparasi masalah vs solusi dan buat tab filter fitur CRM.
- **Testimonial Carousel & FAQ Accordion**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Gunakan React state untuk mengontrol indeks testimoni aktif (`activeTestimonial`) dan array/objek state untuk membuka/menutup accordion FAQ (`openFaq`).

### B. Portal Otentikasi & Akun
- **Pintu Masuk Login**: [Login.jsx](file:///C:/Users/ASUS/haya-space/src/pages/auth/Login.jsx)
  - Menghubungkan formulir masuk ke rute dasbor admin atau member berdasarkan peran (role) pengguna.
- **Formulir Registrasi Staf**: [Register.jsx](file:///C:/Users/ASUS/haya-space/src/pages/auth/Register.jsx)
  - Formulir pembuatan akun admin katering baru.

### C. Dasbor Sistem Nyata (Setelah Login)
- **Dasbor Admin**: [Dashboard.jsx](file:///C:/Users/ASUS/haya-space/src/pages/Dashboard.jsx)
  - Halaman internal tempat admin mengelola pesanan riil, melihat analitik pendapatan, dan menambahkan pesanan baru.
- **Dasbor Member**: [MemberHome.jsx](file:///C:/Users/ASUS/haya-space/src/pages/member/MemberHome.jsx)
  - Halaman internal tempat pelanggan melihat sisa poin loyalti dan daftar pesanan aktif mereka.
