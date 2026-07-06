# PRD V2 - CaterBox CRM & Catering Management

## Project Overview
CaterBox adalah sistem CRM dan manajemen catering yang membantu mengelola pelanggan, pesanan, menu, promosi, stok, dan laporan dalam satu dashboard.

---

# Tujuan

- Memperbaiki tampilan dashboard menjadi lebih modern.
- Membuat semua modul saling terhubung.
- Mempermudah pengelolaan pelanggan dan pesanan.
- Menampilkan informasi bisnis secara real-time.

---

# Design Style

## Tema

- Modern
- Soft UI
- Clean
- Professional

## Warna

Primary

```
#FFB400
```

Background

```
#F8F9FB
```

Card

```
#FFFFFF
```

Text

```
#4B5563
```

Border

```
#ECECEC
```

Radius

```
20px
```

Shadow

```
Soft Shadow
```

Gunakan font **Poppins** dan **Inter** dengan icon Lucide.

---

# Sidebar

- Dashboard
- CRM Center
- Customer CRM
- Membership
- Campaign Promo
- Program Sale
- Feedback
- Food Catalog
- Paket Catering
- Stock Bahan
- Supplier
- Pesanan Masuk
- Riwayat Pesanan
- Laporan
- Pengaturan

---

# Fitur

## Dashboard

Menampilkan:

- Total Customer
- Total Pesanan
- Pendapatan
- Membership Aktif
- Promo Berjalan
- Grafik Penjualan

---

## Customer CRM

- Data Customer
- Riwayat Pesanan
- Membership
- Total Pembelian

---

## Membership

- Silver
- Gold
- Platinum

Setiap transaksi otomatis menambah poin.

---

## Program Sale

- Diskon
- Voucher
- Flash Sale
- Promo Paket

---

## Food Catalog

- Kelola Menu
- Harga
- Kategori
- Gambar Menu

---

## Inventory

- Stock Bahan
- Supplier
- Update Stock

---

## Pesanan

- Pesanan Baru
- Diproses
- Selesai
- Dibatalkan

---

## Feedback

- Rating
- Komentar
- Balasan Admin

---

# Database

tabel users ada id name email password role created_at

## customers

- id
- name
- phone
- email
- membership_id

## memberships

- id
- name
- point
- discount

## products

- id
- category
- name
- price
- image

## orders

- id
- customer_id
- order_date
- total
- status

## order_details

- id
- order_id
- product_id
- qty
- subtotal

## promotions

- id
- title
- discount
- start_date
- end_date

## inventory

- id
- product_name
- stock
- supplier_id

## suppliers

- id
- name
- phone

## feedback

- id
- customer_id
- rating
- comment

---

# Relasi

Customer → Orders

Orders → Order Details

Products → Order Details

Membership → Customer

Supplier → Inventory

Customer → Feedback

---

# Komponen UI

- KPI Card
- Statistic Card
- Chart
- Data Table
- Search
- Filter
- Modal
- Drawer
- Toast Notification
- Badge
- Empty State

---


BUATKAN HALAMAN DETAILS NYA SEKALIAN YANG MEMERLUKAN HALAMAN DETAILS,MISAL NYA ORDERDETAILS DAN DLL,
# Hasil yang Diharapkan

Dashboard terlihat lebih modern dengan warna putih dan kuning seperti referensi. Seluruh modul saling terhubung melalui database sehingga data customer, pesanan, membership, promosi, stok, dan feedback dapat dikelola dalam satu sistem CRM yang rapi dan mudah digunakan.