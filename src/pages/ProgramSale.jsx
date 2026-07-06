import { useEffect, useState, useMemo } from "react";
import { dbService } from "../services/db";
import {
  FaTag, FaPlus, FaTrash, FaEdit, FaCalendarAlt,
  FaSearch, FaPercent, FaGift, FaFire, FaClock,
  FaCheckCircle, FaTimesCircle
} from "react-icons/fa";
import Container from "../components/Container";

// ─── Helper Functions ────────────────────────────────────────────────────────

const CATEGORY_COLORS = {
  "Flash Sale":    ["from-rose-500",   "to-pink-600",    "text-rose-500"],
  "Seasonal":      ["from-violet-500", "to-purple-600",  "text-violet-500"],
  "Paket Catering":["from-amber-400",  "to-orange-500",  "text-amber-500"],
  "Member":        ["from-blue-500",   "to-cyan-500",    "text-blue-500"],
  "Delivery":      ["from-emerald-400","to-teal-500",    "text-emerald-500"],
  "Lainnya":       ["from-slate-400",  "to-slate-600",   "text-slate-500"],
};

function getCategoryColor(cat) {
  return CATEGORY_COLORS[cat] || CATEGORY_COLORS["Lainnya"];
}

function getPromotionCategory(title) {
  const match = (title || "").match(/^\[(.*?)\]/);
  if (match && CATEGORY_COLORS[match[1]]) {
    return match[1];
  }
  const t = (title || "").toLowerCase();
  if (t.includes("flash") || t.includes("kilat")) return "Flash Sale";
  if (t.includes("ongkir") || t.includes("delivery") || t.includes("kirim") || t.includes("antar")) return "Delivery";
  if (t.includes("member") || t.includes("loyal") || t.includes("privilege")) return "Member";
  if (t.includes("paket") || t.includes("box") || t.includes("tumpeng") || t.includes("prasmanan")) return "Paket Catering";
  if (t.includes("lebaran") || t.includes("natal") || t.includes("tahun baru") || t.includes("kemerdekaan") || t.includes("seasonal")) return "Seasonal";
  return "Lainnya";
}

function cleanPromotionTitle(title) {
  return (title || "").replace(/^\[.*?\]\s*/, "");
}

/** Calculate days left from today to the end date */
function calculateDaysLeft(endDate) {
  if (!endDate) return null;
  const diff = new Date(endDate) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/** Check if promo is currently active */
function isPromoActive(promo) {
  const now = new Date();
  const start = promo.start_date ? new Date(promo.start_date) : null;
  const end = promo.end_date ? new Date(promo.end_date) : null;
  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
}

/** Check if promo has expired */
function isPromoExpired(promo) {
  if (!promo.end_date) return false;
  const end = new Date(promo.end_date);
  end.setHours(23, 59, 59, 999);
  return new Date() > end;
}

/** Determine if discount is a percentage (<= 1) */
function isPercentageDiscount(val) {
  return Number(val) > 0 && Number(val) <= 1;
}

/** Format discount amount/percentage display */
function formatDiscountValue(val) {
  const num = Number(val);
  if (num <= 0) return "Gratis Ongkir";
  if (num <= 1) return `${(num * 100).toFixed(0)}%`;
  return `Rp ${num.toLocaleString("id-ID")}`;
}

// ─── Status Badge ────────────────────────────────────────────────────────────
function StatusBadge({ promo }) {
  const active = isPromoActive(promo);
  const expired = isPromoExpired(promo);
  const days = calculateDaysLeft(promo.end_date);

  if (expired) {
    return (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
        <FaTimesCircle /> Kedaluwarsa
      </span>
    );
  }
  if (active && days !== null && days <= 3) {
    return (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 border border-rose-200 animate-pulse">
        <FaFire /> Berakhir {days === 0 ? "Hari Ini" : `${days} Hari`}
      </span>
    );
  }
  if (active) {
    return (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
        <FaCheckCircle /> Aktif
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
      <FaClock /> Terjadwal
    </span>
  );
}

// ─── Promotion Card ──────────────────────────────────────────────────────────
function PromotionCard({ promo, onEdit, onDelete }) {
  const active = isPromoActive(promo);
  const expired = isPromoExpired(promo);
  const days = calculateDaysLeft(promo.end_date);
  const isPct = isPercentageDiscount(promo.discount);
  
  const cat = getPromotionCategory(promo.title);
  const [from, to, textColor] = getCategoryColor(cat);

  return (
    <div className={`relative group bg-white rounded-[24px] border border-[#ECECEC] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${expired ? "opacity-60 grayscale-[20%]" : ""}`}>
      {/* Top Accent Strip */}
      <div className={`h-2 w-full bg-gradient-to-r ${from} ${to}`} />

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row */}
          <div className="flex justify-between items-center mb-5">
            <span className="text-[10px] text-[#9CA3AF] font-bold font-mono tracking-wider">{promo.id}</span>
            <div className="flex items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${textColor} bg-slate-50 border border-slate-100`}>
                {cat}
              </span>
              <StatusBadge promo={promo} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-black text-[#1F2937] leading-snug mb-2">{cleanPromotionTitle(promo.title)}</h3>
          
          {/* Discount Value */}
          <div className="text-4xl font-black text-[#FFB400] tracking-tight mb-4 flex items-baseline gap-1">
            {formatDiscountValue(promo.discount)}
            <span className="text-xs text-[#9CA3AF] font-black uppercase tracking-wider">OFF</span>
          </div>

          {/* Dates */}
          <div className="space-y-2 text-xs text-slate-500 border-t border-[#ECECEC] pt-4 mb-6">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-slate-400 shrink-0" />
              <span>Mulai: {promo.start_date ? new Date(promo.start_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-"}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-slate-400 shrink-0" />
              <span>Selesai: {promo.end_date ? new Date(promo.end_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-"}</span>
            </div>
          </div>

          {/* Time Remaining Bar */}
          {active && days !== null && days <= 30 && (
            <div className="mb-6">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>Durasi Promo</span>
                <span className="font-bold text-[#1F2937]">{days} Hari Tersisa</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all"
                  style={{ width: `${Math.min(100, (days / 30) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 border-t border-[#ECECEC] pt-4 mt-auto">
          <button
            onClick={() => onEdit(promo)}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={() => onDelete(promo.id)}
            className="py-2.5 px-3.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs rounded-xl flex items-center justify-center transition border border-red-100"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Program Sale Manager ───────────────────────────────────────────────
export default function ProgramSale() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("semua"); // semua | aktif | soon | ended
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    discount: "",
    type: "percentage", // percentage or fixed
    category: "Paket Catering",
    start_date: "",
    end_date: "",
  });

  const loadData = async () => {
    setError("");
    try {
      const data = await dbService.getPromotions();
      setPromotions(data || []);
    } catch (e) {
      setError(e.message || "Gagal memuat data promosi dari Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    const isPct = isPercentageDiscount(p.discount);
    const cat = getPromotionCategory(p.title);
    setForm({
      title: cleanPromotionTitle(p.title),
      discount: isPct ? Number(p.discount) * 100 : p.discount,
      type: isPct ? "percentage" : "fixed",
      category: cat,
      start_date: p.start_date || "",
      end_date: p.end_date || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus program promo ini?")) return;
    setError("");
    try {
      await dbService.deletePromotion(id);
      setSuccess("✅ Promo berhasil dihapus dari Supabase!");
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menghapus promo.");
      setTimeout(() => setError(""), 6000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const discountVal = form.type === "percentage"
      ? Number(form.discount) / 100
      : Number(form.discount);

    // Form validations
    if (form.type === "percentage" && (discountVal <= 0 || discountVal > 1)) {
      setError("Masukkan nilai diskon persentase antara 1 dan 100.");
      setSaving(false);
      return;
    }

    if (form.start_date && form.end_date && form.start_date > form.end_date) {
      setError("Tanggal mulai tidak boleh lebih besar dari tanggal selesai.");
      setSaving(false);
      return;
    }

    const data = {
      title: `[${form.category}] ${form.title}`,
      discount: discountVal,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
    };

    try {
      if (editId) {
        await dbService.updatePromotion(editId, data);
        setSuccess("✅ Program promo berhasil diperbarui!");
      } else {
        await dbService.createPromotion(data);
        setSuccess("✅ Program promo baru berhasil ditambahkan!");
      }
      setIsFormOpen(false);
      setForm({ title: "", discount: "", type: "percentage", category: "Paket Catering", start_date: "", end_date: "" });
      setEditId(null);
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menyimpan program promo. Pastikan tabel promotions sudah dibuat di Supabase.");
    } finally {
      setSaving(false);
    }
  };

  // ── Search & Filter Logic ──────────────────────────────────────────────────
  const filteredPromotions = useMemo(() => {
    let result = promotions;

    // Status Tab Filtering
    if (filterTab === "aktif") {
      result = result.filter(p => isPromoActive(p) && !isPromoExpired(p));
    } else if (filterTab === "soon") {
      result = result.filter(p => {
        const days = calculateDaysLeft(p.start_date);
        return days !== null && days > 0 && !isPromoActive(p);
      });
    } else if (filterTab === "ended") {
      result = result.filter(isPromoExpired);
    }

    // Search query filtering
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q));
    }

    return result;
  }, [promotions, filterTab, search]);

  // ── Dashboard Calculations ─────────────────────────────────────────────────
  const activeCount = promotions.filter(p => isPromoActive(p) && !isPromoExpired(p)).length;
  const expiringSoonCount = promotions.filter(p => {
    const days = calculateDaysLeft(p.end_date);
    return isPromoActive(p) && !isPromoExpired(p) && days !== null && days <= 3;
  }).length;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-['Poppins']">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFB400] border-t-transparent" />
      </div>
    );
  }

  return (
    <Container>
      <div className="w-full min-h-screen bg-[#F8F9FB] p-4 md:p-6 lg:p-8 font-['Poppins'] text-[#4B5563]">
        
        {/* HEADER */}
        <div className="border-b border-[#ECECEC] pb-8 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-5 py-2 bg-[#1F2937] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                MARKETING TOOLS
              </span>
              <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full"></div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">
                PROGRAM SALE MANAGER
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] tracking-tight">
              Promo & <span className="text-[#FFB400] italic">Discounts.</span>
            </h1>
            <p className="mt-3 text-slate-500 text-sm max-w-xl">
              Atur promosi menu, voucher potongan harga, dan flash sale katering Anda untuk meningkatkan volume pesanan.
            </p>
          </div>

          <button
            onClick={() => {
              setEditId(null);
              setForm({ title: "", discount: "", type: "percentage", start_date: "", end_date: "" });
              setError("");
              setIsFormOpen(true);
            }}
            className="px-6 py-3.5 bg-[#FFB400] hover:bg-[#E0A000] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition duration-300 shadow-md shadow-amber-500/10 flex items-center gap-2 w-fit h-fit shrink-0"
          >
            <FaPlus /> Tambah Program Promo
          </button>
        </div>

        {/* NOTIFICATIONS */}
        {success && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 shadow-sm flex items-center gap-3">
            <span>✨</span>
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 px-5 py-4 shadow-sm flex items-center gap-3">
            <span>⚠️</span>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm flex items-center gap-5">
            <div className="h-12 w-12 rounded-xl bg-amber-50 text-[#FFB400] flex items-center justify-center text-xl">
              <FaTag />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Total Program</p>
              <h3 className="text-2xl font-black text-[#1F2937] mt-0.5">{promotions.length}</h3>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm flex items-center gap-5">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl">
              <FaCheckCircle />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Promo Aktif</p>
              <h3 className="text-2xl font-black text-[#1F2937] mt-0.5">{activeCount}</h3>
            </div>
          </div>

          <div className={`bg-white rounded-[20px] p-6 border shadow-sm flex items-center gap-5 transition ${expiringSoonCount > 0 ? "border-rose-200 bg-rose-50/20" : "border-[#ECECEC]"}`}>
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl ${expiringSoonCount > 0 ? "bg-rose-100 text-rose-500 animate-pulse" : "bg-slate-100 text-slate-400"}`}>
              <FaFire />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Hampir Berakhir</p>
              <h3 className="text-2xl font-black text-[#1F2937] mt-0.5">{expiringSoonCount} promo</h3>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="bg-white rounded-[20px] p-5 shadow-sm border border-[#ECECEC] mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:w-[360px]">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              placeholder="Cari program promo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FFB400] transition"
            />
          </div>

          <div className="flex gap-2.5 flex-wrap">
            {[
              { key: "semua", label: "Semua Promo" },
              { key: "aktif", label: "Sedang Aktif" },
              { key: "soon", label: "Mendatang" },
              { key: "ended", label: "Berakhir" }
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setFilterTab(t.key)}
                className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition ${
                  filterTab === t.key
                    ? "bg-[#1F2937] text-white"
                    : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* PROMOTION LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.length === 0 ? (
            <div className="col-span-full bg-white rounded-[20px] p-16 text-center border border-[#ECECEC] text-[#9CA3AF]">
              <div className="h-16 w-16 bg-slate-50 text-slate-400 flex items-center justify-center rounded-full mx-auto mb-4 text-2xl">
                <FaGift />
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] mb-1">Belum Ada Program Promo</h3>
              <p className="text-xs">Ubah filter pencarian Anda atau buat promo baru untuk menarik minat pelanggan.</p>
            </div>
          ) : (
            filteredPromotions.map((p) => (
              <PromotionCard
                key={p.id}
                promo={p}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        {/* MODAL DIALOG FORM */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-['Poppins']">
            <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl animate-in zoom-in duration-200">
              <h2 className="text-xl font-bold text-[#1F2937] mb-1">
                {editId ? "Edit Program Promo" : "Tambah Program Promo"}
              </h2>
              <p className="text-xs text-slate-400 mb-5">Data tersimpan real-time di database katering.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Promo Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Nama Program Promo</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Contoh: Flash Sale Kemerdekaan"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                  />
                </div>

                {/* Category Configuration */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Kategori Promo</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] bg-white cursor-pointer transition"
                  >
                    {Object.keys(CATEGORY_COLORS).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Discount Configuration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Tipe Diskon</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] bg-white cursor-pointer"
                    >
                      <option value="percentage">Persentase (%)</option>
                      <option value="fixed">Nominal Flat (Rp)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Nilai Diskon</label>
                    <input
                      type="number"
                      name="discount"
                      value={form.discount}
                      onChange={handleChange}
                      placeholder={form.type === "percentage" ? "10" : "15000"}
                      min="1"
                      required
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                    />
                  </div>
                </div>

                {/* Live Discount Value Preview */}
                {form.discount && (
                  <div className="text-xs text-[#FFB400] font-black">
                    Live Preview: Diskon {form.type === "percentage" ? `${form.discount}%` : `Rp ${Number(form.discount).toLocaleString("id-ID")}`}
                  </div>
                )}

                {/* Date Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Tanggal Mulai</label>
                    <input
                      type="date"
                      name="start_date"
                      value={form.start_date}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Tanggal Selesai</label>
                    <input
                      type="date"
                      name="end_date"
                      value={form.end_date}
                      onChange={handleChange}
                      required
                      min={form.start_date}
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition bg-white"
                    />
                  </div>
                </div>

                {/* Duration Calculation */}
                {form.start_date && form.end_date && form.start_date <= form.end_date && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs font-bold text-amber-700">
                    Durasi Promo: {Math.ceil((new Date(form.end_date) - new Date(form.start_date)) / (1000 * 60 * 60 * 24))} Hari
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6 border-t border-[#ECECEC] pt-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-3 bg-[#FFB400] text-white rounded-xl text-xs font-bold hover:bg-[#E0A000] shadow-md shadow-amber-500/10 transition disabled:opacity-60 flex items-center justify-center gap-1.5"
                  >
                    {saving ? (
                      <>
                        <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Menyimpan...
                      </>
                    ) : (
                      "Simpan Promo"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </Container>
  );
}
