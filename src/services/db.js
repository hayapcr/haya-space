import axios from "axios";

const API_URL = "https://sokrabecddiicnejkqyf.supabase.co/rest/v1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNva3JhYmVjZGRpaWNuZWprcXlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMjA2NjAsImV4cCI6MjA5Njg5NjY2MH0.aUZ-AdEhOCLIBwb5aTcUWr4A3FZ5g-pQpTnmlysguyk";

// Headers standar Supabase REST API
const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

// Helper: buat Axios instance yang selalu throw error agar tertangkap oleh caller
const api = axios.create({ baseURL: API_URL, headers });

// Helper: parse pesan error Supabase agar mudah dibaca
const parseError = (error) => {
  const msg =
    error?.response?.data?.message ||
    error?.response?.data?.hint ||
    error?.message ||
    "Terjadi kesalahan koneksi ke Supabase";
  const code = error?.response?.status;
  if (code === 406 || code === 401) {
    throw new Error(
      "Akses ditolak Supabase (RLS). Pastikan sudah menjalankan supabase_schema.sql di SQL Editor."
    );
  }
  if (code === 404 || error?.response?.data?.code === "PGRST205") {
    throw new Error(
      `Tabel belum ada di Supabase. Jalankan supabase_schema.sql terlebih dahulu.`
    );
  }
  throw new Error(msg);
};

// Helper: generate next sequential ID safely to prevent database primary key collisions on delete
const getNextSequentialId = (existingData, prefix, startVal = 100) => {
  const ids = existingData
    .map((item) => {
      if (!item.id) return null;
      const numPart = item.id.replace(prefix, "");
      const parsed = parseInt(numPart, 10);
      return isNaN(parsed) ? null : parsed;
    })
    .filter((val) => val !== null);
  const max = ids.length > 0 ? Math.max(...ids) : startVal;
  return `${prefix}${String(max + 1).padStart(3, "0")}`;
};

// ============================================================
//  dbService — semua operasi CRUD langsung ke Supabase
// ============================================================
export const dbService = {
  // ──────────────────────────────────────────────────────────
  //  USERS (akun staff)
  // ──────────────────────────────────────────────────────────
  async getUsers() {
    try {
      const res = await api.get("/users");
      return res.data;
    } catch (e) { parseError(e); }
  },

  async createUser(data) {
    try {
      const res = await api.post("/users", data);
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async updateUser(id, data) {
    try {
      const res = await api.patch(`/users?id=eq.${id}`, data);
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async deleteUser(id) {
    try {
      await api.delete(`/users?id=eq.${id}`);
      return true;
    } catch (e) { parseError(e); }
  },

  async loginUser(email, password) {
    try {
      const res = await api.get(
        `/users?email=eq.${email}&password=eq.${password}`
      );
      return res.data;
    } catch (e) { parseError(e); }
  },

  // ──────────────────────────────────────────────────────────
  //  CUSTOMERS
  // ──────────────────────────────────────────────────────────
  async getCustomers() {
    try {
      const res = await api.get("/customers");
      return res.data;
    } catch (e) { parseError(e); }
  },

  async getCustomerById(id) {
    try {
      const res = await api.get(`/customers?id=eq.${id}`);
      return res.data[0] || null;
    } catch (e) { parseError(e); }
  },

  async createCustomer(data) {
    try {
      // Generate ID urut secara aman dari existing max ID
      const existing = await api.get("/customers?select=id");
      const newId = getNextSequentialId(existing.data, "CST-", 0);

      const payload = {
        id: newId,
        membership_id: "MBR-SLV",
        points: 0,
        ...data,
      };
      const res = await api.post("/customers", payload);
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async updateCustomer(id, data) {
    try {
      const res = await api.patch(`/customers?id=eq.${id}`, data);
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async deleteCustomer(id) {
    try {
      // Hapus feedback dulu (cascade)
      await api.delete(`/feedback?customer_id=eq.${id}`).catch(() => {});
      await api.delete(`/customers?id=eq.${id}`);
      return true;
    } catch (e) { parseError(e); }
  },

  // ──────────────────────────────────────────────────────────
  //  CUSTOMER POINTS & MEMBERSHIP TIER
  // ──────────────────────────────────────────────────────────
  async getCustomerPoints(customerId) {
    try {
      const res = await api.get(`/customers?id=eq.${customerId}&select=points`);
      return res.data[0]?.points || 0;
    } catch (e) { parseError(e); }
  },

  async getAllCustomerPoints() {
    try {
      const res = await api.get("/customers?select=id,points");
      return res.data.map((c) => ({ customer_id: c.id, points: c.points || 0 }));
    } catch (e) { parseError(e); }
  },

  async getMemberships() {
    try {
      const res = await api.get("/memberships");
      return res.data;
    } catch (e) { parseError(e); }
  },

  async addPointsAndRecalculateTier(customerId, totalSpent) {
    try {
      const pointsToAdd = Math.floor(totalSpent / 10000);
      if (pointsToAdd <= 0) return;

      const custRes = await api.get(
        `/customers?id=eq.${customerId}&select=points`
      );
      const currentPoints = custRes.data[0]?.points || 0;
      const newPoints = currentPoints + pointsToAdd;

      let newTierId = "MBR-SLV";
      if (newPoints >= 500) newTierId = "MBR-PLT";
      else if (newPoints >= 200) newTierId = "MBR-GLD";

      await api.patch(`/customers?id=eq.${customerId}`, {
        points: newPoints,
        membership_id: newTierId,
      });
    } catch (e) {
      console.error("Gagal update poin:", e.message);
    }
  },

  // ──────────────────────────────────────────────────────────
  //  PRODUCTS
  // ──────────────────────────────────────────────────────────
  async getProducts() {
    try {
      const res = await api.get("/products");
      return res.data;
    } catch (e) { parseError(e); }
  },

  async getProductById(id) {
    try {
      const res = await api.get(`/products?id=eq.${id}`);
      return res.data[0] || null;
    } catch (e) { parseError(e); }
  },

  async createProduct(data) {
    try {
      const existing = await api.get("/products?select=id");
      const newId = getNextSequentialId(existing.data, "PRD-", 0);
      const res = await api.post("/products", { id: newId, ...data });
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async updateProduct(id, data) {
    try {
      const res = await api.patch(`/products?id=eq.${id}`, data);
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async deleteProduct(id) {
    try {
      await api.delete(`/products?id=eq.${id}`);
      return true;
    } catch (e) { parseError(e); }
  },

  // ──────────────────────────────────────────────────────────
  //  ORDERS
  // ──────────────────────────────────────────────────────────
  async getOrders() {
    try {
      const res = await api.get("/orders?order=order_date.desc");
      return res.data;
    } catch (e) { parseError(e); }
  },

  async getOrderById(id) {
    try {
      const res = await api.get(`/orders?id=eq.${id}`);
      return res.data[0] || null;
    } catch (e) { parseError(e); }
  },
  parseStatus(statusStr) {
    const status = (statusStr || "Pending").split("[")[0].trim();
    const eventMatch = (statusStr || "").match(/\[Event:\s*([^\]]+)\]/);
    const noteMatch = (statusStr || "").match(/\[Note:\s*([^\]]+)\]/);
    const discountMatch = (statusStr || "").match(/\[Discount:\s*([^\]]+)\]/);
    const promoMatch = (statusStr || "").match(/\[Promo:\s*([^\]]+)\]/);

    return {
      status,
      event_date: eventMatch ? eventMatch[1] : "",
      note: noteMatch ? noteMatch[1] : "",
      discount_applied: discountMatch ? Number(discountMatch[1]) : 0,
      promo_code: promoMatch ? promoMatch[1] : "",
    };
  },

  async createOrder(orderData, items) {
    try {
      const existing = await api.get("/orders?select=id");
      const orderId = getNextSequentialId(existing.data, "ORD-", 0);

      // Pack metadata into status column to avoid schema constraints
      let packedStatus = orderData.status || "Pending";
      if (orderData.event_date) packedStatus += `[Event: ${orderData.event_date}]`;
      if (orderData.note) packedStatus += `[Note: ${orderData.note}]`;
      if (orderData.discount_applied) packedStatus += `[Discount: ${orderData.discount_applied}]`;
      if (orderData.promo_code) packedStatus += `[Promo: ${orderData.promo_code}]`;

      const dbOrderPayload = {
        id: orderId,
        customer_id: orderData.customer_id,
        order_date: new Date().toISOString(),
        total: orderData.total,
        status: packedStatus,
      };

      await api.post("/orders", dbOrderPayload);

      // Insert setiap item detail
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const detailId = `DTL-${orderId}-${i + 1}`;
        await api.post("/order_details", {
          id: detailId,
          order_id: orderId,
          product_id: item.product_id,
          qty: item.qty,
          subtotal: item.subtotal,
        });
        // Kurangi stok bahan baku
        await this._deductInventory(item.product_id, item.qty);
      }

      // Tambah poin & update tier
      await this.addPointsAndRecalculateTier(orderData.customer_id, orderData.total);

      return { ...dbOrderPayload, ...orderData };
    } catch (e) { parseError(e); }
  },

  async updateOrderStatus(id, newStatus) {
    try {
      const currentRes = await api.get(`/orders?id=eq.${id}`);
      const currentOrder = currentRes.data[0];
      
      let finalStatus = newStatus;
      if (currentOrder && currentOrder.status) {
        const bracketIndex = currentOrder.status.indexOf("[");
        if (bracketIndex !== -1) {
          finalStatus = newStatus + currentOrder.status.substring(bracketIndex);
        }
      }

      // Kalau dibatalkan, kembalikan stok
      if (newStatus === "Dibatalkan") {
        const details = await this.getOrderDetailsByOrderId(id);
        for (const item of details) {
          await this._restockInventory(item.product_id, item.qty);
        }
      }
      const res = await api.patch(`/orders?id=eq.${id}`, { status: finalStatus });
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async deleteOrder(id) {
    try {
      await api.delete(`/order_details?order_id=eq.${id}`);
      await api.delete(`/orders?id=eq.${id}`);
      return true;
    } catch (e) { parseError(e); }
  },

  // ──────────────────────────────────────────────────────────
  //  ORDER DETAILS
  // ──────────────────────────────────────────────────────────
  async getOrderDetails() {
    try {
      const res = await api.get("/order_details");
      return res.data;
    } catch (e) { parseError(e); }
  },

  async getOrderDetailsByOrderId(orderId) {
    try {
      const res = await api.get(`/order_details?order_id=eq.${orderId}`);
      return res.data;
    } catch (e) { parseError(e); }
  },

  // ──────────────────────────────────────────────────────────
  //  INVENTORY (Stok Bahan Baku)
  // ──────────────────────────────────────────────────────────
  async getInventory() {
    try {
      const res = await api.get("/inventory");
      return res.data;
    } catch (e) { parseError(e); }
  },

  async createInventory(data) {
    try {
      const existing = await api.get("/inventory?select=id");
      const newId = getNextSequentialId(existing.data, "STK-", 0);
      const res = await api.post("/inventory", { id: newId, ...data });
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async updateInventory(id, data) {
    try {
      const res = await api.patch(`/inventory?id=eq.${id}`, data);
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async deleteInventory(id) {
    try {
      await api.delete(`/inventory?id=eq.${id}`);
      return true;
    } catch (e) { parseError(e); }
  },

  // Internal: kurangi stok bahan baku berdasarkan nama produk
  async _deductInventory(productId, qty) {
    try {
      const prodRes = await api.get(`/products?id=eq.${productId}&select=name`);
      const prodName = prodRes.data[0]?.name?.toLowerCase() || "";
      const invRes = await api.get("/inventory");
      const matched = invRes.data.find((i) =>
        prodName.includes(i.product_name.split(" ")[0].toLowerCase())
      );
      if (matched) {
        const newStock = Math.max(0, matched.stock - qty);
        await api.patch(`/inventory?id=eq.${matched.id}`, { stock: newStock });
      }
    } catch (e) {
      console.warn("_deductInventory skip:", e.message);
    }
  },

  // Internal: kembalikan stok bahan baku
  async _restockInventory(productId, qty) {
    try {
      const prodRes = await api.get(`/products?id=eq.${productId}&select=name`);
      const prodName = prodRes.data[0]?.name?.toLowerCase() || "";
      const invRes = await api.get("/inventory");
      const matched = invRes.data.find((i) =>
        prodName.includes(i.product_name.split(" ")[0].toLowerCase())
      );
      if (matched) {
        await api.patch(`/inventory?id=eq.${matched.id}`, {
          stock: matched.stock + qty,
        });
      }
    } catch (e) {
      console.warn("_restockInventory skip:", e.message);
    }
  },

  // ──────────────────────────────────────────────────────────
  //  SUPPLIERS
  // ──────────────────────────────────────────────────────────
  async getSuppliers() {
    try {
      const res = await api.get("/suppliers");
      return res.data;
    } catch (e) { parseError(e); }
  },

  async createSupplier(data) {
    try {
      const existing = await api.get("/suppliers?select=id");
      const newId = getNextSequentialId(existing.data, "SPL-", 0);
      const res = await api.post("/suppliers", { id: newId, ...data });
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async updateSupplier(id, data) {
    try {
      const res = await api.patch(`/suppliers?id=eq.${id}`, data);
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async deleteSupplier(id) {
    try {
      await api.delete(`/suppliers?id=eq.${id}`);
      return true;
    } catch (e) { parseError(e); }
  },

  // ──────────────────────────────────────────────────────────
  //  PROMOTIONS
  // ──────────────────────────────────────────────────────────
  async getPromotions() {
    try {
      const res = await api.get("/promotions");
      return res.data;
    } catch (e) { parseError(e); }
  },

  async createPromotion(data) {
    try {
      const existing = await api.get("/promotions?select=id");
      const newId = getNextSequentialId(existing.data, "PRM-", 0);
      const res = await api.post("/promotions", { id: newId, ...data });
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async updatePromotion(id, data) {
    try {
      const res = await api.patch(`/promotions?id=eq.${id}`, data);
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async deletePromotion(id) {
    try {
      await api.delete(`/promotions?id=eq.${id}`);
      return true;
    } catch (e) { parseError(e); }
  },

  // ──────────────────────────────────────────────────────────
  //  FEEDBACK
  // ──────────────────────────────────────────────────────────
  async getFeedback() {
    try {
      const res = await api.get("/feedback?order=created_at.desc");
      return res.data;
    } catch (e) { parseError(e); }
  },

  async createFeedback(data) {
    try {
      const existing = await api.get("/feedback?select=id");
      const newId = getNextSequentialId(existing.data, "FDB-", 0);
      const res = await api.post("/feedback", {
        id: newId,
        created_at: new Date().toISOString(),
        reply: "",
        ...data,
      });
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async replyFeedback(id, replyText) {
    try {
      const res = await api.patch(`/feedback?id=eq.${id}`, { reply: replyText });
      return res.data[0];
    } catch (e) { parseError(e); }
  },

  async deleteFeedback(id) {
    try {
      await api.delete(`/feedback?id=eq.${id}`);
      return true;
    } catch (e) { parseError(e); }
  },
};
