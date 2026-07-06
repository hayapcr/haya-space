import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../services/db";
import Container from "../components/Container";
import {
  FaSearch, FaPlus, FaTrash, FaEdit, FaCheckCircle,
  FaClock, FaFire, FaTimesCircle, FaBoxOpen, FaUser,
  FaCalendarAlt, FaEye, FaMoneyBillWave,
} from "react-icons/fa";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CFG = {
  "Pending":     { color: "bg-amber-100 text-amber-700 border-amber-200",   dot: "bg-amber-400",   icon: <FaClock size={10} /> },
  "Diproses":    { color: "bg-blue-100 text-blue-700 border-blue-200",      dot: "bg-blue-400",    icon: <FaFire size={10} /> },
  "Selesai":     { color: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-400", icon: <FaCheckCircle size={10} /> },
  "Dibatalkan":  { color: "bg-rose-100 text-rose-700 border-rose-200",      dot: "bg-rose-400",    icon: <FaTimesCircle size={10} /> },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || STATUS_CFG["Pending"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${cfg.color}`}>
      {cfg.icon} {status}
    </span>
  );
}

// ── New Order Modal ───────────────────────────────────────────────────────────
function NewOrderModal({ customers, products, onClose, onSave }) {
  const [form, setForm] = useState({
    customer_id: "",
    items: [{ product_id: "", qty: 1 }],
    note: "",
    event_date: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleItemChange = (idx, field, val) => {
    const items = [...form.items];
    items[idx] = { ...items[idx], [field]: val };
    setForm(prev => ({ ...prev, items }));
  };

  const addItem = () => setForm(prev => ({ ...prev, items: [...prev.items, { product_id: "", qty: 1 }] }));

  const removeItem = (idx) => {
    if (form.items.length === 1) return;
    setForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
  };

  // Compute subtotal live
  const getProductPrice = (pid) => {
    const p = products.find(pr => pr.id === pid);
    return p ? Number(p.price) : 0;
  };

  const lineTotal = (item) => getProductPrice(item.product_id) * Number(item.qty || 0);
  const grandTotal = form.items.reduce((s, it) => s + lineTotal(it), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.customer_id) { setError("Pilih customer terlebih dahulu."); return; }
    const validItems = form.items.filter(it => it.product_id && Number(it.qty) > 0);
    if (!validItems.length) { setError("Tambahkan minimal 1 item pesanan."); return; }

    setSaving(true);
    try {
      const orderData = {
        customer_id: form.customer_id,
        total: grandTotal,
        note: form.note,
        event_date: form.event_date || null,
        status: "Pending",
      };
      const itemsPayload = validItems.map(it => ({
        product_id: it.product_id,
        qty: Number(it.qty),
        subtotal: lineTotal(it),
      }));
      await dbService.createOrder(orderData, itemsPayload);
      onSave();
    } catch (e) {
      setError(e.message || "Gagal membuat pesanan baru.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-['Poppins']">
      <div className="bg-white rounded-[28px] max-w-2xl w-full p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 bg-amber-50 text-[#FFB400] rounded-xl flex items-center justify-center text-lg">
            <FaPlus />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#1F2937]">Buat Pesanan Baru</h2>
            <p className="text-xs text-slate-400">Pesanan akan tersimpan ke Supabase</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-xs font-medium">⚠️ {error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Customer */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Customer <span className="text-rose-500">*</span></label>
            <select
              name="customer_id" value={form.customer_id} onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] bg-white cursor-pointer"
            >
              <option value="">-- Pilih Customer --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
              ))}
            </select>
          </div>

          {/* Event date + Note */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Tanggal Acara</label>
              <input type="date" name="event_date" value={form.event_date} onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Catatan</label>
              <input type="text" name="note" value={form.note} onChange={handleChange}
                placeholder="Catatan khusus pesanan..."
                className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
              />
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1F2937]">Item Pesanan <span className="text-rose-500">*</span></label>
              <button type="button" onClick={addItem}
                className="text-xs font-bold text-[#FFB400] hover:text-amber-600 flex items-center gap-1 transition">
                <FaPlus size={10} /> Tambah Item
              </button>
            </div>

            <div className="space-y-3">
              {form.items.map((item, idx) => {
                const price = getProductPrice(item.product_id);
                const subtotal = price * Number(item.qty || 0);
                return (
                  <div key={idx} className="grid grid-cols-[1fr_80px_auto] gap-2 items-start">
                    <select
                      value={item.product_id}
                      onChange={e => handleItemChange(idx, "product_id", e.target.value)}
                      className="rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-[#FFB400] bg-white cursor-pointer w-full"
                    >
                      <option value="">-- Pilih Menu --</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} — Rp {Number(p.price).toLocaleString("id-ID")}</option>
                      ))}
                    </select>
                    <input
                      type="number" min="1"
                      value={item.qty}
                      onChange={e => handleItemChange(idx, "qty", e.target.value)}
                      className="rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-[#FFB400] text-center"
                    />
                    <button type="button" onClick={() => removeItem(idx)}
                      className="p-3 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      disabled={form.items.length === 1}>
                      <FaTrash size={12} />
                    </button>
                    {subtotal > 0 && (
                      <div className="col-span-3 text-[10px] text-[#FFB400] font-bold pl-1">
                        Subtotal: Rp {subtotal.toLocaleString("id-ID")}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grand Total */}
          {grandTotal > 0 && (
            <div className="rounded-xl bg-amber-50 border border-amber-100 px-5 py-4 flex justify-between items-center">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Total Pesanan</span>
              <span className="text-xl font-black text-[#FFB400]">Rp {grandTotal.toLocaleString("id-ID")}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#ECECEC]">
            <button type="button" onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition">
              Batal
            </button>
            <button type="submit" disabled={saving}
              className="px-6 py-3 bg-[#FFB400] text-white rounded-xl text-xs font-bold hover:bg-[#E0A000] transition disabled:opacity-60 flex items-center gap-1.5 shadow-md">
              {saving ? (
                <><span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Membuat...</>
              ) : (
                <><FaCheckCircle /> Buat Pesanan</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Orders Page ──────────────────────────────────────────────────────────
export default function Orders() {
  const [orders, setOrders]           = useState([]);
  const [customers, setCustomers]     = useState([]);
  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [search, setSearch]           = useState("");
  const [success, setSuccess]         = useState("");
  const [error, setError]             = useState("");
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  const loadData = async () => {
    setError("");
    try {
      const [dbOrds, custs, details, prods] = await Promise.all([
        dbService.getOrders(),
        dbService.getCustomers(),
        dbService.getOrderDetails(),
        dbService.getProducts(),
      ]);

      setCustomers(custs || []);
      setProducts(prods || []);

      const formatted = (dbOrds || []).map(o => {
        const customer = (custs || []).find(c => c.id === o.customer_id);
        const oDetails = (details || []).filter(d => d.order_id === o.id);
        const menuSummary = oDetails
          .map(d => {
            const p = (prods || []).find(pr => pr.id === d.product_id);
            return p ? `${p.name} (×${d.qty})` : "Item";
          })
          .join(", ");

        const parsed = dbService.parseStatus(o.status);

        return {
          id: o.id,
          customer_id: o.customer_id,
          name: customer ? customer.name : "Pelanggan",
          phone: customer?.phone || "-",
          menu: menuSummary || "Paket Catering",
          itemCount: oDetails.length,
          status: parsed.status,
          order_date: o.order_date,
          event_date: parsed.event_date || o.event_date || "",
          date: o.order_date ? new Date(o.order_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-",
          total: Number(o.total || 0),
          note: parsed.note || o.note || "",
          discount_applied: parsed.discount_applied || 0,
          promo_code: parsed.promo_code || "",
        };
      });

      setOrders(formatted.sort((a, b) => new Date(b.order_date || 0) - new Date(a.order_date || 0)));
    } catch (e) {
      setError(e.message || "Gagal memuat pesanan dari Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setError("");
    try {
      await dbService.updateOrderStatus(orderId, newStatus);
      setSuccess(`✅ Status pesanan ${orderId} diubah ke "${newStatus}"`);
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal mengubah status.");
      setTimeout(() => setError(""), 6000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`Hapus pesanan ${id}? Tindakan ini tidak bisa dibatalkan.`)) return;
    setError("");
    try {
      await dbService.deleteOrder(id);
      setSuccess(`✅ Pesanan ${id} berhasil dihapus!`);
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menghapus pesanan.");
      setTimeout(() => setError(""), 6000);
    }
  };

  // Filter + Search
  const filtered = useMemo(() => {
    let list = orders;
    if (filterStatus !== "Semua") list = list.filter(o => o.status === filterStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(o =>
        o.name.toLowerCase().includes(q) ||
        String(o.id).includes(q) ||
        o.menu.toLowerCase().includes(q)
      );
    }
    return list;
  }, [orders, filterStatus, search]);

  // KPIs
  const totalRevenue   = orders.filter(o => o.status === "Selesai").reduce((s,o) => s + o.total, 0);
  const pendingCount   = orders.filter(o => o.status === "Pending").length;
  const processingCount= orders.filter(o => o.status === "Diproses").length;
  const doneCount      = orders.filter(o => o.status === "Selesai").length;

  if (loading) return (
    <div className="flex h-screen items-center justify-center font-['Poppins']">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFB400] border-t-transparent" />
    </div>
  );

  return (
    <Container>
      <div className="relative w-full min-h-screen bg-[#F8F9FB] p-4 md:p-6 lg:p-8 font-['Poppins'] text-[#4B5563] overflow-hidden">

        {/* BG orbs */}
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-[#FFB400]/8 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[350px] h-[350px] bg-amber-200/8 rounded-full blur-[100px] -z-10" />

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="border-b border-[#ECECEC] pb-8 mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-5 py-2 bg-[#1F2937] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">ORDER MANAGEMENT</span>
              <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">PESANAN MASUK</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] tracking-tight">
              Catering <span className="text-[#FFB400] italic">Orders.</span>
            </h1>
            <p className="mt-3 text-slate-500 text-sm max-w-xl">
              Kelola seluruh pesanan katering — dari pending, proses, hingga selesai. Tambah pesanan baru dan update status real-time.
            </p>
          </div>

          <button
            onClick={() => setIsNewOrderOpen(true)}
            className="px-6 py-3.5 bg-[#FFB400] hover:bg-[#E0A000] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition shadow-md shadow-amber-500/20 flex items-center gap-2 w-fit shrink-0"
          >
            <FaPlus /> Pesanan Baru
          </button>
        </div>

        {/* ── NOTIFICATIONS ─────────────────────────────────────── */}
        {success && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 flex items-center gap-3">
            <FaCheckCircle className="text-emerald-500 shrink-0" />
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 px-5 py-4 flex items-center gap-3">
            <span className="shrink-0">⚠️</span>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* ── KPI CARDS ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {[
            { label: "Total Pesanan", value: orders.length, sub: "semua waktu", c: "bg-slate-50 text-slate-500", icon: <FaBoxOpen /> },
            { label: "Menunggu", value: pendingCount, sub: "perlu diproses", c: "bg-amber-50 text-amber-500", icon: <FaClock /> },
            { label: "Diproses", value: processingCount, sub: "sedang berjalan", c: "bg-blue-50 text-blue-500", icon: <FaFire /> },
            { label: "Pendapatan Bersih", value: `Rp ${totalRevenue.toLocaleString("id-ID")}`, sub: "dari pesanan selesai", c: "bg-emerald-50 text-emerald-500", icon: <FaMoneyBillWave /> },
          ].map((k, i) => (
            <div key={i} className="bg-white rounded-[20px] p-5 border border-[#ECECEC] shadow-sm flex items-center gap-4">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center text-lg shrink-0 ${k.c}`}>{k.icon}</div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider truncate">{k.label}</p>
                <h3 className="text-xl font-black text-[#1F2937] mt-0.5 truncate">{k.value}</h3>
                <p className="text-[10px] text-slate-400 truncate">{k.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTER BAR ────────────────────────────────────────── */}
        <div className="bg-white rounded-[20px] p-5 border border-[#ECECEC] shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              placeholder="Cari customer, ID order, atau menu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FFB400] transition"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Semua", "Pending", "Diproses", "Selesai", "Dibatalkan"].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
                  filterStatus === s
                    ? "bg-[#1F2937] text-white shadow"
                    : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {s}
                {s !== "Semua" && (
                  <span className="ml-1.5 opacity-60">({orders.filter(o => o.status === s).length})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── ORDERS TABLE ──────────────────────────────────────── */}
        <div className="bg-white rounded-[20px] border border-[#ECECEC] shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-16 text-center text-slate-400">
              <FaBoxOpen className="text-5xl mx-auto mb-4 text-slate-200" />
              <h3 className="text-lg font-bold text-[#1F2937] mb-1">
                {orders.length === 0 ? "Belum Ada Pesanan" : "Tidak Ada Pesanan Ditemukan"}
              </h3>
              <p className="text-xs">
                {orders.length === 0
                  ? "Klik tombol Pesanan Baru untuk mencatat pesanan pertama Anda."
                  : "Coba ubah filter atau kata kunci pencarian."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-[#FFF8E1] text-[#FFB400] border-b border-[#ECECEC]">
                  <tr className="text-left uppercase tracking-wider font-bold">
                    <th className="px-5 py-4">ID Pesanan</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Menu</th>
                    <th className="px-5 py-4">Tgl. Pesan</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC]">
                  {filtered.map(order => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition group">
                      {/* ID */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-black text-[#1F2937] font-mono text-[11px]">{order.id}</span>
                          {order.note && (
                            <p className="text-[10px] text-slate-400 truncate max-w-[120px]" title={order.note}>📝 {order.note}</p>
                          )}
                          {order.promo_code && (
                            <div className="w-fit">
                              <span className="inline-flex items-center text-[9px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-100 px-1.5 py-0.5 rounded mt-0.5">
                                🎟️ {order.promo_code}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                            <FaUser size={10} />
                          </div>
                          <div>
                            <p className="font-bold text-[#1F2937]">{order.name}</p>
                            {order.phone !== "-" && <p className="text-[10px] text-slate-400">{order.phone}</p>}
                          </div>
                        </div>
                      </td>

                      {/* Menu */}
                      <td className="px-5 py-4 max-w-[200px]">
                        <p className="truncate text-slate-600" title={order.menu}>{order.menu}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{order.itemCount} item</p>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <FaCalendarAlt size={10} className="text-slate-300" />
                          {order.date}
                        </div>
                        {order.event_date && (
                          <p className="text-[10px] text-amber-600 mt-0.5 font-bold">
                            🎉 Acara: {new Date(order.event_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        )}
                      </td>

                      {/* Total */}
                      <td className="px-5 py-4">
                        <span className="font-black text-[#1F2937]">
                          Rp {order.total.toLocaleString("id-ID")}
                        </span>
                      </td>

                      {/* Status dropdown */}
                      <td className="px-5 py-4">
                        <select
                          value={order.status}
                          onChange={e => handleStatusChange(order.id, e.target.value)}
                          className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold outline-none focus:border-[#FFB400] bg-white cursor-pointer transition hover:border-[#FFB400]"
                        >
                          {["Pending", "Diproses", "Selesai", "Dibatalkan"].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <div className="mt-1.5">
                          <StatusBadge status={order.status} />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/orders/${order.id}`}
                            className="p-2 text-slate-400 hover:text-[#FFB400] transition"
                            title="Lihat Detail"
                          >
                            <FaEye size={13} />
                          </Link>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 transition"
                            title="Hapus Pesanan"
                          >
                            <FaTrash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── FOOTER INFO ───────────────────────────────────────── */}
        <p className="text-center text-[10px] text-slate-300 mt-6 font-mono">
          Menampilkan {filtered.length} dari {orders.length} pesanan • Last refreshed {new Date().toLocaleTimeString("id-ID")}
        </p>

        {/* ── NEW ORDER MODAL ───────────────────────────────────── */}
        {isNewOrderOpen && (
          <NewOrderModal
            customers={customers}
            products={products}
            onClose={() => setIsNewOrderOpen(false)}
            onSave={() => {
              setIsNewOrderOpen(false);
              setSuccess("✅ Pesanan baru berhasil dibuat dan tersimpan ke Supabase!");
              loadData();
              setTimeout(() => setSuccess(""), 5000);
            }}
          />
        )}
      </div>
    </Container>
  );
}