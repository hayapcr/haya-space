# DOKUMEN REQUIREMENT PRODUK (PRD) — VERSI V3 (COMPLETE VERSION)
## Integrasi Pihak Ketiga, Alur Kerja Otomatisasi, dan Dashboard KPI Bisnis

---

## 1. PENJELASAN UMUM

PRD V3 mendefinisikan ekosistem CRM katering SaaS yang lengkap dan saling terhubung. Ini mencakup integrasi API eksternal (pembayaran, chat WA, peta lokasi), visualisasi diagram alur perjalanan pengguna, pemantauan metrik KPI bisnis, serta copywriting landing page siap rilis.

---

## 2. PERSYARATAN FITUR & STRUKTUR

- **Integrasi API Pihak Ketiga**:
  - *Supabase*: Otentikasi pengguna, penyimpanan data SQL, database aman terenkripsi.
  - *WhatsApp Notification API*: Notifikasi tagihan invoice, konfirmasi lunas, dan status kurir otomatis.
  - *Midtrans Payment Gateway*: Checkout e-wallet (QRIS/GoPay) dan transfer VA bank real-time.
  - *Google Maps API*: Perhitungan tarif ongkir otomatis berbasis jarak kilometer dan navigasi kurir.
  - *Google Calendar API*: Jadwal sinkronisasi pengiriman katering pesta/event ke kalender operasional dapur.
- **Workflow Visualizer**: Peta alur langkah-langkah perjalanan transaksi dari tamu -> registrasi -> pesan -> bayar -> kurir -> feedback bintang -> loyalitas member VIP.
- **KPI Dashboard**: Metrik bisnis terbagi dalam Awareness (Web Visitors), Engagement (Time on Page), Conversion (Trial/Demo Signups), dan Business Growth (Churn Rate, Repeat Order Rate).
- **Interactive Modals**: Form modal pendaftaran free trial dan booking demo meeting lengkap dengan feedback notifikasi sukses.

---

## 3. LOKASI IMPLEMENTASI (DIREKTORI & BERKAS)

Berikut adalah panduan lengkap mengenai di mana Anda harus mengimplementasikan fitur-fitur PRD V3 ini dalam arsitektur aplikasi:

### A. Integrasi Layanan (Services & APIs)
- **Supabase Client & Auth**: [usersAPI.js](file:///C:/Users/ASUS/haya-space/src/services/usersAPI.js)
  - Tempat implementasi query SQL dan integrasi authentikasi database backend untuk login/register staf katering.
- **WhatsApp & Email Gateway**: `src/services/notificationService.js` (atau langsung dipanggil via API fetch di form submit)
  - Lokasi pengiriman notifikasi templat pesan WhatsApp kepada pelanggan setelah pembayaran terverifikasi.
- **Midtrans Webhook & Payment Checkout**: `src/pages/Cart.jsx` dan [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Implementasikan status pembayaran sukses dan link QRIS di dalam modal checkout member maupun demo pembayaran di landing page.
- **Google Maps Jarak Pengiriman**: `src/services/mapsAPI.js` (atau helper jarak kirim)
  - Digunakan di halaman checkout kurir untuk menghitung tarif ongkos kirim secara otomatis berbasis radius.

### B. Antarmuka Interaktif Landing Page V3
- **Workflow Visualizer**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Implementasikan state `workflowStep` (1-7) yang merender secara dinamis cuplikan visualisasi mockup di sisi kanan (mockup QRIS, mockup notifikasi WA, peta kurir) saat diklik.
- **Modal Booking Demo & Trial**: [Landing.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/Landing.jsx)
  - Implementasikan state `showDemoModal` dan `showTrialModal`. Data form pendaftaran trial gratis disimpan ke `localStorage` untuk memalsukan proses registrasi sebelum diarahkan ke dasbor.

### C. Portal Dokumentasi PRD & Copywriting Developer
- **Interactive PRD Viewer**: [CompanyProfile.jsx](file:///C:/Users/ASUS/haya-space/src/pages/guest/CompanyProfile.jsx)
  - Halaman `/company-profile` berfungsi sebagai pusat acuan developer. Di halaman ini terdapat visualisasi sitemap, diagram alur user flow, diagram alur CRM workflow, tabel KPI, dan tab salin cepat teks copywriting landing page.
