# DOKUMEN REQUIREMENT PRODUK (PRD) — VERSI V1 (BASIC VERSION)
## Landing Page & Landing Page Core untuk CaterBox CRM (Tema Orange)

---

## 1. PENJELASAN UMUM

PRD V1 berfokus pada **Minimum Viable Product (MVP)** untuk memperkenalkan CaterBox CRM kepada pemilik usaha catering. Tujuannya adalah memperkenalkan brand digital dan memicu pendaftaran awal.

---

## 2. PERSYARATAN FITUR & STRUKTUR LOKAL

- **Navbar**: Logo 🍱 CaterBox CRM (dengan badge orange CRM), menu navigasi sederhana (Home, Our Menu, About Us, Contact), dan tombol Login (mengarahkan ke `/login`).
- **Hero Section**:
  - *Headline*: "Kelola Bisnis Catering Lebih Mudah Bersama CaterBox CRM"
  - *Subheadline*: "Satukan database data pelanggan, pemesanan katering berkala, status pembayaran terverifikasi otomatis, dan manajemen campaign loyalty membership dalam satu dasbor terintegrasi."
  - *CTA*: Tombol "Mulai Gratis" (membuka modal pendaftaran) dan "Jadwalkan Sesi Demo" (membuka modal demo meeting).
- **Features Section**: Menampilkan 4 pilar fitur CRM dasar dalam bentuk kartu/grid:
  - *Customer Management* (Manajemen data pelanggan dasar)
  - *Order Management* (Pencatatan pesanan katering)
  - *Membership Management* (Loyalty program dasar)
  - *Payment Management* (Konfirmasi pembayaran transfer)
- **Footer**: Kontak e-mail resmi, tautan media sosial, dan hak cipta.

---

## 3. LOKASI IMPLEMENTASI (DIREKTORI & BERKAS)

Berikut adalah lokasi berkas di mana fitur-fitur PRD V1 ini telah diimplementasikan dalam kode proyek:

### A. Tampilan Landing Page & Komponen
- **Berkas Utama**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Implementasi struktur Navbar bertema orange, Hero Section dengan Headline & Subheadline V1 kustom, dan footer kontak.
- **Layout Dasar Tamu**: [GuestLayout.jsx](file:///C:/Users/ASUS/haya-space/src/layouts/GuestLayout.jsx)
  - Layout pembungkus halaman tamu yang bersih tanpa header yang mengganggu.

### B. Konfigurasi Gaya & Font
- **Tema & Warna Orange**: [index.css](file:///C:/Users/ASUS/haya-space/src/index.css)
  - Deklarasi warna primer orange (`#FF7A1A`), sekunder cream (`#FFF8F0`), dan aksen merah-orange (`#FF4D2D`) menggunakan konfigurasi `@theme` Tailwind CSS v4.

### C. Alur Navigasi & Routing
- **Routing Aplikasi**: [App.jsx](file:///C:/Users/ASUS/haya-space/src/App.jsx)
  - Rute `/` memanggil komponen `Landing.jsx` di bawah pembungkus `GuestLayout`.
