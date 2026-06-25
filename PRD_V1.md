# DOKUMEN REQUIREMENT PRODUK (PRD) — VERSI V1 (BASIC VERSION)
## Landing Page & Landing Page Core untuk CaterBox CRM

---

## 1. PENJELASAN UMUM

PRD V1 berfokus pada **Minimum Viable Product (MVP)** untuk memperkenalkan CaterBox CRM kepada pemilik usaha catering. Tujuannya adalah edukasi pasar mengenai sistem CRM dan menarik minat pendaftaran awal.

---

## 2. PERSYARATAN FITUR & STRUKTUR

- **Navbar**: Logo CaterBox CRM, menu navigasi sederhana (Home, Our Menu, About Us, Contact), dan tombol redirect ke Login.
- **Hero Section**:
  - *Headline*: "Kelola Bisnis Catering Lebih Mudah Bersama CaterBox CRM"
  - *Subheadline*: "Satukan data pelanggan, pemesanan, pembayaran, membership, dan promosi dalam satu platform modern."
  - *CTA*: Tombol "Mulai Gratis" (mengarahkan ke registrasi) dan "Lihat Demo" (mengarahkan ke visualisasi).
- **Features Section**: Menampilkan 4 pilar fitur CRM dasar dalam bentuk kartu/grid:
  - *Customer Management* (Manajemen data pelanggan dasar)
  - *Order Management* (Pencatatan pesanan katering)
  - *Membership Management* (Loyalty program dasar)
  - *Payment Management* (Konfirmasi pembayaran transfer)
- **Footer**: Kontak e-mail resmi, tautan media sosial, dan hak cipta.

---

## 3. LOKASI IMPLEMENTASI (DIREKTORI & BERKAS)

Bagi Developer dan UI/UX Designer, berikut adalah lokasi tepat di mana fitur-fitur PRD V1 ini diimplementasikan di dalam proyek React:

### A. Tampilan Landing Page & Komponen
- **Berkas Utama**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Implementasikan struktur Navbar, Hero Section dengan Headline & Subheadline V1, Grid untuk 4 fitur utama, dan Footer kontak.
- **Layout Dasar Tamu**: [GuestLayout.jsx](file:///C:/Users/ASUS/haya-space/src/layouts/GuestLayout.jsx)
  - Layout pembungkus untuk halaman tamu yang tidak memerlukan login.

### B. Konfigurasi Gaya & Font
- **Tema & Warna Dasar**: [index.css](file:///C:/Users/ASUS/haya-space/src/index.css)
  - Pengaturan impor Google Fonts (Poppins & Inter) serta deklarasi variabel tema warna primer orange (`#FF7A1A`) dan aksen merah-orange (`#FF4D2D`).

### C. Alur Navigasi & Routing
- **Routing Aplikasi**: [App.jsx](file:///C:/Users/ASUS/haya-space/src/App.jsx)
  - Mendaftarkan rute index `/` ke komponen `Landing.jsx` di bawah pembungkus `GuestLayout`.
  - Mendaftarkan rute login `/login` dan register `/register` di bawah pembungkus `AuthLayout`.
