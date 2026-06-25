# DOKUMEN REQUIREMENT PRODUK (PRD) — VERSI V3 (COMPLETE VERSION)
## Integrasi Pihak Ketiga, Alur Kerja Otomatisasi, dan Dashboard KPI Bisnis (Tema Orange)

---

## 1. PENJELASAN UMUM

PRD V3 mendefinisikan ekosistem CRM katering SaaS yang lengkap dan saling terhubung. Ini mencakup integrasi API eksternal, visualisasi diagram alur perjalanan pengguna, pemantauan metrik KPI bisnis, serta copywriting landing page bertema orange kustom.

---

## 2. PERSYARATAN FITUR & STRUKTUR LOKAL

- **Integrasi API Pihak Ketiga**:
  - *Supabase*: Penyimpanan data SQL, database aman terenkripsi.
  - *WhatsApp Notification API*: Notifikasi tagihan invoice, konfirmasi lunas, dan status kurir otomatis.
  - *Midtrans Payment Gateway*: Checkout e-wallet (QRIS/GoPay) dan transfer VA bank real-time.
  - *Google Maps API*: Perhitungan tarif ongkir otomatis berbasis jarak kilometer dan navigasi kurir harian.
  - *Google Calendar API*: Jadwal sinkronisasi pengiriman katering operasional dapur.
- **Ecosystem CRM 360 & Preview Mockup**:
  - *Operational CRM*: Manajemen Pemesanan, Delivery Tracking, Invoice & Midtrans (mockup: Pesanan Masuk Live panel).
  - *Analytical CRM*: Revenue Insights, Segmentasi Pelanggan, Analisis Menu Terlaris (mockup: Segmentasi Pelanggan VIP Gold).
  - *Collaborative CRM*: WhatsApp Notification, Feedback Rating (mockup: Pesan WhatsApp Gateway).
  - *Strategic CRM*: Loyalty Program, Tingkatan Membership VIP, Campaign Voucher (mockup: Progress bar Gold VIP & Voucher).
- **Workflow Visualizer (Timeline & Mockup)**:
  - *Langkah 1: Kunjungan Halaman* (Visualisasi: Halaman depan Haya Catering Pekanbaru).
  - *Langkah 2: Daftar Akun Member* (Visualisasi: Form input pendaftaran).
  - *Langkah 3: Masuk Dashboard Member* (Visualisasi: Silver Member, 1420 Poin).
  - *Langkah 4: Pemesanan Menu Katering* (Visualisasi: Pemilihan porsi Nasi Box Ayam Bakar).
  - *Langkah 5: Bayar Instan Otomatis* (Visualisasi: Pembayaran Terkonfirmasi QRIS).
  - *Langkah 6: Pelacakan Rute Kurir* (Visualisasi: Jarak 3.2 KM, Kurir Andi Wijaya).
  - *Langkah 7: Loyalty & Feedback* (Visualisasi: Rating 5 bintang, +100 poin loyalty).
- **KPI Dashboard**: Metrik bisnis terbagi dalam Awareness (Web Visitors), Engagement (Time on Page), Conversion (Trial/Demo Signups), dan Business Growth (Churn Rate, Repeat Order Rate).
- **Interactive Modals**: Form modal pendaftaran free trial (Nama, Catering, E-mail, Password) dan booking demo meeting (Nama, Catering, WA, Tanggal, Waktu).

---

## 3. LOKASI IMPLEMENTASI (DIREKTORI & BERKAS)

Berikut adalah lokasi berkas di mana fitur-fitur PRD V3 ini telah diimplementasikan dalam kode proyek:

### A. Integrasi Layanan (Services & APIs)
- **Supabase Client & Auth**: [usersAPI.js](file:///C:/Users/ASUS/haya-space/src/services/usersAPI.js)
  - Tempat implementasi query SQL dan integrasi database untuk login/register staf katering.
- **WhatsApp & Email Gateway**: `src/services/notificationService.js` (atau langsung dipanggil via API fetch di form submit)
  - Lokasi pengiriman notifikasi templat pesan WhatsApp kepada pelanggan setelah pembayaran terverifikasi.
- **Midtrans Webhook & Payment Checkout**: `src/pages/Cart.jsx` dan [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Implementasikan status pembayaran sukses dan link QRIS di dalam modal checkout member maupun demo pembayaran di landing page.
- **Google Maps Jarak Pengiriman**: `src/services/mapsAPI.js` (atau helper jarak kirim)
  - Digunakan di halaman checkout kurir untuk menghitung tarif ongkos kirim secara otomatis berbasis radius.

### B. Antarmuka Interaktif Landing Page V3
- **Workflow Visualizer**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Diimplementasikan dengan state `workflowStep` (1-7) yang merender secara dinamis cuplikan visualisasi mockup di sisi kanan (mockup QRIS, mockup notifikasi WA, peta kurir) saat diklik.
- **Feature Hub Tabs**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Diaktifkan menggunakan state `featureTab` untuk merender informasi deskripsi fitur CRM di kiri dan mockup panel kontrol di kanan.
- **Modal Booking Demo & Trial**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Diimplementasikan dengan state `showDemoModal` dan `showTrialModal`. Data form pendaftaran trial gratis disimpan ke `localStorage` untuk memalsukan proses registrasi sebelum diarahkan ke dasbor.

### C. Portal Dokumentasi PRD & Copywriting Developer
- **Interactive PRD Viewer**: [CompanyProfile.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/CompanyProfile.jsx)
  - Halaman `/company-profile` berfungsi sebagai pusat acuan developer. Di halaman ini terdapat visualisasi sitemap, diagram alur user flow, diagram alur CRM workflow, tabel KPI, dan tab salin cepat teks copywriting landing page.
