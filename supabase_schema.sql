-- ============================================================
--  CaterBox CRM – Supabase SQL Schema
--  Paste this ENTIRE script into:
--  Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- ============================================================
--  TABLE 1: memberships
--  Tier loyalty pelanggan (Silver / Gold / Platinum)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.memberships (
    id          VARCHAR PRIMARY KEY,
    name        VARCHAR NOT NULL,
    point       INT     DEFAULT 0,       -- minimum poin untuk tier ini
    discount    NUMERIC DEFAULT 0        -- 0.10 = diskon 10%
);

-- ============================================================
--  TABLE 2: customers
--  Data pelanggan + poin reward (disimpan langsung di sini)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.customers (
    id            VARCHAR PRIMARY KEY,
    name          VARCHAR NOT NULL,
    phone         VARCHAR,
    email         VARCHAR,
    membership_id VARCHAR REFERENCES public.memberships(id) ON DELETE SET NULL,
    points        INT     DEFAULT 0      -- total poin reward pelanggan
);

-- ============================================================
--  TABLE 3: products
--  Menu makanan / paket catering
-- ============================================================
CREATE TABLE IF NOT EXISTS public.products (
    id       VARCHAR PRIMARY KEY,
    category VARCHAR NOT NULL,           -- Nasi Box, Snack Box, dll.
    name     VARCHAR NOT NULL,
    price    NUMERIC NOT NULL DEFAULT 0,
    image    VARCHAR                     -- URL gambar produk
);

-- ============================================================
--  TABLE 4: suppliers
--  Vendor / pemasok bahan baku
-- ============================================================
CREATE TABLE IF NOT EXISTS public.suppliers (
    id    VARCHAR PRIMARY KEY,
    name  VARCHAR NOT NULL,
    phone VARCHAR
);

-- ============================================================
--  TABLE 5: inventory
--  Stok bahan baku (berelasi ke suppliers)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.inventory (
    id           VARCHAR PRIMARY KEY,
    product_name VARCHAR NOT NULL,       -- nama bahan baku
    stock        INT     DEFAULT 0,      -- jumlah stok saat ini
    supplier_id  VARCHAR REFERENCES public.suppliers(id) ON DELETE SET NULL
);

-- ============================================================
--  TABLE 6: orders
--  Header transaksi pesanan
-- ============================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id          VARCHAR PRIMARY KEY,
    customer_id VARCHAR REFERENCES public.customers(id) ON DELETE SET NULL,
    order_date  TIMESTAMPTZ DEFAULT NOW(),
    total       NUMERIC     NOT NULL DEFAULT 0,
    status      VARCHAR     DEFAULT 'Pending'
    -- status: Pending | Diproses | Selesai | Dibatalkan
);

-- ============================================================
--  TABLE 7: order_details
--  Item-item dalam setiap pesanan (berelasi ke orders & products)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.order_details (
    id         VARCHAR PRIMARY KEY,
    order_id   VARCHAR REFERENCES public.orders(id)   ON DELETE CASCADE,
    product_id VARCHAR REFERENCES public.products(id) ON DELETE SET NULL,
    qty        INT     NOT NULL DEFAULT 1,
    subtotal   NUMERIC NOT NULL DEFAULT 0
);

-- ============================================================
--  TABLE 8: promotions
--  Program diskon / promo penjualan
-- ============================================================
CREATE TABLE IF NOT EXISTS public.promotions (
    id         VARCHAR PRIMARY KEY,
    title      VARCHAR NOT NULL,
    discount   NUMERIC DEFAULT 0,        -- 0.10 = 10% ATAU 15000 = flat Rp
    start_date DATE,
    end_date   DATE
);

-- ============================================================
--  TABLE 9: feedback
--  Ulasan & rating dari pelanggan
-- ============================================================
CREATE TABLE IF NOT EXISTS public.feedback (
    id          VARCHAR PRIMARY KEY,
    customer_id VARCHAR REFERENCES public.customers(id) ON DELETE CASCADE,
    rating      INT     CHECK (rating >= 1 AND rating <= 5),
    comment     TEXT,
    reply       TEXT        DEFAULT '',  -- balasan admin
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
--  INDEXES (untuk mempercepat query JOIN & filter)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_customers_membership  ON public.customers(membership_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer       ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status         ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_details_order   ON public.order_details(order_id);
CREATE INDEX IF NOT EXISTS idx_order_details_product ON public.order_details(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_supplier    ON public.inventory(supplier_id);
CREATE INDEX IF NOT EXISTS idx_feedback_customer     ON public.feedback(customer_id);

-- ============================================================
--  ROW LEVEL SECURITY (RLS)
--  Aktifkan RLS lalu beri izin baca-tulis untuk anon key
--  (anon key = kunci yang dipakai aplikasi Anda)
-- ============================================================
ALTER TABLE public.memberships   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback      ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all for anon" ON public.memberships;
DROP POLICY IF EXISTS "Allow all for anon" ON public.customers;
DROP POLICY IF EXISTS "Allow all for anon" ON public.products;
DROP POLICY IF EXISTS "Allow all for anon" ON public.suppliers;
DROP POLICY IF EXISTS "Allow all for anon" ON public.inventory;
DROP POLICY IF EXISTS "Allow all for anon" ON public.orders;
DROP POLICY IF EXISTS "Allow all for anon" ON public.order_details;
DROP POLICY IF EXISTS "Allow all for anon" ON public.promotions;
DROP POLICY IF EXISTS "Allow all for anon" ON public.feedback;

CREATE POLICY "Allow all for anon" ON public.memberships   FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.customers     FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.products      FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.suppliers     FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.inventory     FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.orders        FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.order_details FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.promotions    FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON public.feedback      FOR ALL TO anon USING (true) WITH CHECK (true);

-- ============================================================
--  SEED DATA (data awal – aman dijalankan berulang kali)
-- ============================================================

-- Tier Membership
INSERT INTO public.memberships (id, name, point, discount) VALUES
  ('MBR-SLV', 'Silver',     0,   0.00),
  ('MBR-GLD', 'Gold',     200,   0.05),
  ('MBR-PLT', 'Platinum', 500,   0.10)
ON CONFLICT (id) DO NOTHING;

-- Pelanggan
INSERT INTO public.customers (id, name, phone, email, membership_id, points) VALUES
  ('CST-001', 'Haya Nur Rizky', '08123456789', 'haya@gmail.com', 'MBR-PLT', 550),
  ('CST-002', 'Hana Haura',     '08129876543', 'hana@gmail.com', 'MBR-GLD', 280),
  ('CST-003', 'Awa Salsabila',  '08134567890', 'awa@gmail.com',  'MBR-SLV',  40),
  ('CST-004', 'Joko Nugroho',   '08561122334', 'joko@gmail.com', 'MBR-SLV',  10)
ON CONFLICT (id) DO NOTHING;

-- Produk / Menu
INSERT INTO public.products (id, category, name, price, image) VALUES
  ('PRD-001', 'Nasi Box',        'Nasi Box Ayam Bakar',  50000, 'https://images.unsplash.com/photo-1604908176997-125f25cc500f'),
  ('PRD-002', 'Nasi Box',        'Nasi Box Rendang',     55000, 'https://images.unsplash.com/photo-1541832676-9b763b0239ab'),
  ('PRD-003', 'Snack Box',       'Snack Box Premium',    45000, 'https://images.unsplash.com/photo-1551024506-0bccd828d307'),
  ('PRD-004', 'Snack Box',       'Snack Box Simple',     30000, 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0'),
  ('PRD-005', 'Coffee & Drinks', 'Coffee Break Set',    120000, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'),
  ('PRD-006', 'Catering Paket',  'Paket Tumpeng Mini',  250000, 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec')
ON CONFLICT (id) DO NOTHING;

-- Supplier
INSERT INTO public.suppliers (id, name, phone) VALUES
  ('SPL-001', 'PD Sayur Makmur',     '08125555666'),
  ('SPL-002', 'Toko Sembako Berkah', '08574444999')
ON CONFLICT (id) DO NOTHING;

-- Stok Bahan Baku
INSERT INTO public.inventory (id, product_name, stock, supplier_id) VALUES
  ('STK-001', 'Beras Cianjur (kg)',   150, 'SPL-002'),
  ('STK-002', 'Daging Ayam (ekor)',    80, 'SPL-001'),
  ('STK-003', 'Sayur Sop Mix (pack)', 40,  'SPL-001'),
  ('STK-004', 'Kopi Arabica (kg)',     15, 'SPL-002')
ON CONFLICT (id) DO NOTHING;

-- Pesanan
INSERT INTO public.orders (id, customer_id, order_date, total, status) VALUES
  ('ORD-001', 'CST-001', '2026-07-04 12:00:00+07', 500000, 'Selesai'),
  ('ORD-002', 'CST-002', '2026-07-05 09:30:00+07', 130000, 'Diproses'),
  ('ORD-003', 'CST-003', '2026-07-06 15:00:00+07',  50000, 'Pending')
ON CONFLICT (id) DO NOTHING;

-- Detail Pesanan
INSERT INTO public.order_details (id, order_id, product_id, qty, subtotal) VALUES
  ('DTL-001', 'ORD-001', 'PRD-006', 2, 500000),
  ('DTL-002', 'ORD-002', 'PRD-001', 2, 100000),
  ('DTL-003', 'ORD-002', 'PRD-004', 1,  30000),
  ('DTL-004', 'ORD-003', 'PRD-001', 1,  50000)
ON CONFLICT (id) DO NOTHING;

-- Promosi
INSERT INTO public.promotions (id, title, discount, start_date, end_date) VALUES
  ('PRM-001', 'Diskon Opening 10%',    0.10,  '2026-07-01', '2026-07-31'),
  ('PRM-002', 'Voucher Hemat Rp 15k', 15000, '2026-07-01', '2026-07-15'),
  ('PRM-003', 'Flash Sale 20%',        0.20,  '2026-07-06', '2026-07-07')
ON CONFLICT (id) DO NOTHING;

-- Feedback Pelanggan
INSERT INTO public.feedback (id, customer_id, rating, comment, reply, created_at) VALUES
  ('FDB-001', 'CST-001', 5,
   'Makanannya lezat sekali, porsinya pas untuk meeting kantor!',
   'Terima kasih banyak atas feedback positifnya Kak Haya!',
   '2026-07-05 14:22:00+07'),
  ('FDB-002', 'CST-002', 4,
   'Pengiriman tepat waktu, ayam bakarnya bumbunya meresap.',
   '',
   '2026-07-06 10:05:00+07')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
--  SELESAI! Struktur relasi antar tabel:
--
--  memberships
--      └──► customers ◄──────── feedback
--              └──► orders
--                      └──► order_details ◄── products
--
--  suppliers ──► inventory
-- ============================================================
