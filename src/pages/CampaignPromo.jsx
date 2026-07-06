import { useEffect, useState, useMemo } from "react";
import { dbService } from "../services/db";
import Container from "../components/Container";
import {
  FaBullhorn, FaPlus, FaTrash, FaFire, FaClock,
  FaCheckCircle, FaTimesCircle, FaPercent,
  FaRocket, FaGift, FaTag, FaCalendarAlt, FaSearch,
} from "react-icons/fa";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Hitung sisa hari dari hari ini ke end_date */
function daysLeft(endDate) {
  if (!endDate) return null;
  const diff = new Date(endDate) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/** Apakah promo sedang aktif (dalam rentang tanggal) */
function isActive(promo) {
  const now   = new Date();
  const start = promo.start_date ? new Date(promo.start_date) : null;
  const end   = promo.end_date   ? new Date(promo.end_date)   : null;
  if (start && now < start) return false;
  if (end   && now > end)   return false;
  return true;
}

/** Apakah diskon berupa persen atau flat Rupiah */
function isPercent(val) {
  return Number(val) > 0 && Number(val) <= 1;
}

/** Format nilai diskon untuk ditampilkan */
function fmtDiscount(val) {
  const n = Number(val);
  if (n <= 0) return "Gratis Ongkir";
  if (n <= 1)  return `${(n * 100).toFixed(0)}%`;
  return `Rp ${n.toLocaleString("id-ID")}`;
}

/** Warna gradient per kategori promo */
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

/** Menghitung kategori promo berdasarkan awalan kurung siku [Category] atau kata kunci title */
function getPromotionCategory(title) {
  const match = (title || "").match(/^\[(.*?)\]/);
  if (match && CATEGORY_COLORS[match[1]]) {
    return match[1];
  }
  
  // Fallback keyword parsing
  const t = (title || "").toLowerCase();
  if (t.includes("flash") || t.includes("kilat")) return "Flash Sale";
  if (t.includes("ongkir") || t.includes("delivery") || t.includes("kirim") || t.includes("antar")) return "Delivery";
  if (t.includes("member") || t.includes("loyal") || t.includes("privilege")) return "Member";
  if (t.includes("paket") || t.includes("box") || t.includes("tumpeng") || t.includes("prasmanan")) return "Paket Catering";
  if (t.includes("lebaran") || t.includes("natal") || t.includes("tahun baru") || t.includes("kemerdekaan") || t.includes("seasonal")) return "Seasonal";
  return "Lainnya";
}

/** Membersihkan awalan [Category] dari judul promo saat ditampilkan */
function cleanPromotionTitle(title) {
  return (title || "").replace(/^\[.*?\]\s*/, "");
}

// ─── Status Badge ────────────────────────────────────────────────────────────
function StatusBadge({ promo }) {
  const active = isActive(promo);
  const days   = daysLeft(promo.end_date);

  if (!active && days !== null && days < 0) {
    return (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
        <FaTimesCircle /> Berakhir
      </span>
    );
  }
  if (active && days !== null && days <= 3) {
    return (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 animate-pulse">
        <FaFire /> Berakhir {days === 0 ? "Hari Ini" : `${days} Hari`}
      </span>
    );
  }
  if (active) {
    return (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
        <FaCheckCircle /> Aktif
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
      <FaClock /> Akan Datang
    </span>
  );
}

// ─── Promo Card ───────────────────────────────────────────────────────────────
function PromoCard({ promo, onDelete }) {
  const cat = getPromotionCategory(promo.title);
  const [from, to, textColor] = getCategoryColor(cat);
  const days   = daysLeft(promo.end_date);
  const active = isActive(promo);
  const pct    = isPercent(promo.discount);

  return (
    <div className={`relative group rounded-[24px] overflow-hidden border border-[#ECECEC] shadow-sm hover:shadow-xl transition-all duration-300 ${!active ? "opacity-60 grayscale-[30%]" : ""}`}>

      {/* Gradient top strip */}
      <div className={`h-2 w-full bg-gradient-to-r ${from} ${to}`} />

      <div className="bg-white p-6">
        {/* Top row: category + status */}
        <div className="flex items-center justify-between mb-5">
          <span className={`text-[10px] font-black uppercase tracking-widest ${textColor} bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100`}>
            {cat}
          </span>
          <StatusBadge promo={promo} />
        </div>

        {/* Big discount display */}
        <div className={`mb-4 inline-block bg-gradient-to-br ${from} ${to} bg-clip-text`}>
          <span className="text-5xl font-black text-transparent">
            {fmtDiscount(promo.discount)}
          </span>
        </div>

        <h3 className="text-lg font-black text-[#1F2937] mb-2 leading-tight">
          {cleanPromotionTitle(promo.title)}
        </h3>

        {/* Date range */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <FaCalendarAlt className="shrink-0" />
          <span>
            {promo.start_date
              ? new Date(promo.start_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
              : "—"
            }
            {" "}&rarr;{" "}
            {promo.end_date
              ? new Date(promo.end_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
              : "—"
            }
          </span>
        </div>

        {/* Countdown bar */}
        {active && days !== null && days <= 30 && (
          <div className="mb-4">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>Sisa waktu promo</span>
              <span className="font-bold text-[#1F2937]">{days} hari lagi</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${from} ${to} transition-all`}
                style={{ width: `${Math.min(100, (days / 30) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Discount type pill */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-full">
            {pct ? <FaPercent className="text-[10px]" /> : <FaTag className="text-[10px]" />}
            {pct ? "Diskon Persen" : Number(promo.discount) === 0 ? "Gratis Ongkir" : "Flat Rupiah"}
          </span>
        </div>

        {/* Delete button (appears on hover) */}
        <button
          onClick={() => onDelete(promo.id)}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-xl border border-rose-100"
          title="Hapus promo"
        >
          <FaTrash size={11} />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CampaignPromo() {
  const [promos, setPromos]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [success, setSuccess]       = useState("");
  const [error, setError]           = useState("");
  const [search, setSearch]         = useState("");
  const [filterTab, setFilterTab]   = useState("semua"); // semua | aktif | soon | ended

  const [form, setForm] = useState({
    title:      "",
    category:   "Paket Catering",
    type:       "persen",   // "persen" | "flat" | "ongkir"
    discount:   "",
    start_date: "",
    end_date:   "",
  });

  // ── Load promos from Supabase ──────────────────────────────
  const loadData = async () => {
    setError("");
    try {
      const data = await dbService.getPromotions();
      setPromos(data || []);
    } catch (e) {
      setError(e.message || "Gagal memuat promo dari Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // ── Filter + Search ────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = promos;

    // tab filter
    if (filterTab === "aktif")  list = list.filter(isActive);
    if (filterTab === "soon")   list = list.filter(p => {
      const days = daysLeft(p.start_date);
      return days !== null && days > 0 && !isActive(p);
    });
    if (filterTab === "ended")  list = list.filter(p => {
      const days = daysLeft(p.end_date);
      return days !== null && days < 0;
    });

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        getPromotionCategory(p.title).toLowerCase().includes(q)
      );
    }

    return list;
  }, [promos, filterTab, search]);

  // ── KPIs ───────────────────────────────────────────────────
  const activeCount  = promos.filter(isActive).length;
  const endingSoon   = promos.filter(p => { const d = daysLeft(p.end_date); return d !== null && d <= 3 && d >= 0 && isActive(p); }).length;
  const avgDiscount  = (() => {
    const pcts = promos.filter(p => isPercent(p.discount));
    if (!pcts.length) return "0%";
    const avg = pcts.reduce((s, p) => s + Number(p.discount), 0) / pcts.length;
    return `${(avg * 100).toFixed(0)}%`;
  })();

  // ── Form handlers ──────────────────────────────────────────
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({ title: "", category: "Paket Catering", type: "persen", discount: "", start_date: "", end_date: "" });
    setError("");
  };

  // ── Submit ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    // Hitung nilai discount berdasarkan type
    let discountVal = 0;
    if (form.type === "persen") {
      const n = parseFloat(form.discount);
      if (isNaN(n) || n <= 0 || n > 100) {
        setError("Masukkan diskon persen antara 1–100.");
        setSaving(false);
        return;
      }
      discountVal = n / 100; // simpan 0.10 untuk 10%
    } else if (form.type === "flat") {
      const n = parseInt(form.discount, 10);
      if (isNaN(n) || n <= 0) {
        setError("Masukkan nominal diskon yang valid.");
        setSaving(false);
        return;
      }
      discountVal = n;
    } else {
      discountVal = 0; // Gratis ongkir = 0
    }

    // Validasi tanggal
    if (form.start_date && form.end_date && form.start_date > form.end_date) {
      setError("Tanggal mulai tidak boleh lebih besar dari tanggal berakhir.");
      setSaving(false);
      return;
    }

    try {
      await dbService.createPromotion({
        title:      `[${form.category}] ${form.title}`,
        discount:   discountVal,
        start_date: form.start_date || null,
        end_date:   form.end_date   || null,
      });
      setSuccess("✅ Campaign promo berhasil dibuat di Supabase!");
      setIsFormOpen(false);
      resetForm();
      loadData();
      setTimeout(() => setSuccess(""), 5000);
    } catch (e) {
      setError(e.message || "Gagal membuat promo. Pastikan tabel promotions sudah ada di Supabase.");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Hapus campaign promo ini?")) return;
    setError("");
    try {
      await dbService.deletePromotion(id);
      setSuccess("✅ Promo berhasil dihapus!");
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menghapus promo.");
      setTimeout(() => setError(""), 6000);
    }
  };

  // ─────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex h-screen items-center justify-center font-['Poppins']">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFB400] border-t-transparent" />
    </div>
  );

  return (
    <Container>
      <div className="w-full min-h-screen bg-[#F8F9FB] p-4 sm:p-6 lg:p-8 font-['Poppins'] text-[#4B5563]">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="border-b border-[#ECECEC] pb-8 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-5 py-2 bg-[#1F2937] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                MARKETING
              </span>
              <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">
                CAMPAIGN & PROMO
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] leading-tight">
              Campaign <span className="italic text-[#FFB400]">Promo.</span>
            </h1>
            <p className="mt-3 text-slate-500 text-sm max-w-lg">
              Kelola semua campaign diskon, promo flash sale, dan voucher reward pelanggan katering Anda.
            </p>
          </div>
          <button
            onClick={() => { resetForm(); setIsFormOpen(true); }}
            className="shrink-0 flex items-center gap-2 px-6 py-3.5 bg-[#FFB400] hover:bg-[#E0A000] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition shadow-md shadow-amber-500/20"
          >
            <FaPlus /> Buat Campaign
          </button>
        </div>

        {/* ── NOTIFICATIONS ──────────────────────────────────── */}
        {success && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 flex items-center gap-3">
            <span>✨</span><p className="text-sm font-medium">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 px-5 py-4 flex items-start gap-3">
            <span className="text-lg">⚠️</span><p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* ── KPI CARDS ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm flex items-center gap-5">
            <div className="h-12 w-12 rounded-xl bg-amber-50 text-[#FFB400] flex items-center justify-center text-xl">
              <FaBullhorn />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Total Campaign</p>
              <h3 className="text-2xl font-black text-[#1F2937] mt-0.5">{promos.length}</h3>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm flex items-center gap-5">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl">
              <FaRocket />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Sedang Aktif</p>
              <h3 className="text-2xl font-black text-[#1F2937] mt-0.5">{activeCount}</h3>
            </div>
          </div>

          <div className={`bg-white rounded-[20px] p-6 border shadow-sm flex items-center gap-5 ${endingSoon > 0 ? "border-rose-200 bg-rose-50/30" : "border-[#ECECEC]"}`}>
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl ${endingSoon > 0 ? "bg-rose-100 text-rose-500" : "bg-slate-100 text-slate-400"}`}>
              <FaFire />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Berakhir ≤ 3 Hari</p>
              <h3 className={`text-2xl font-black mt-0.5 ${endingSoon > 0 ? "text-rose-600" : "text-[#1F2937]"}`}>
                {endingSoon}
              </h3>
            </div>
          </div>
        </div>

        {/* ── SEARCH + TABS ───────────────────────────────────── */}
        <div className="bg-white rounded-[20px] border border-[#ECECEC] shadow-sm p-5 mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              placeholder="Cari campaign..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FFB400] transition"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: "semua", label: `Semua (${promos.length})` },
              { key: "aktif", label: `Aktif (${activeCount})` },
              { key: "soon",  label: "Akan Datang" },
              { key: "ended", label: "Berakhir" },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setFilterTab(t.key)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
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

        {/* ── PROMO GRID ─────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <FaGift className="text-5xl mx-auto mb-4 text-slate-200" />
            <p className="font-bold text-lg text-slate-500">Belum ada campaign</p>
            <p className="text-sm mt-1">Klik "Buat Campaign" untuk memulai promo pertama Anda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(promo => (
              <PromoCard key={promo.id} promo={promo} onDelete={handleDelete} />
            ))}
          </div>
        )}

        {/* ── MODAL FORM ─────────────────────────────────────── */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-['Poppins']">
            <div className="bg-white rounded-[28px] max-w-lg w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto">

              {/* Modal header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-[#FFB400] flex items-center justify-center">
                  <FaBullhorn />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#1F2937]">Buat Campaign Baru</h2>
                  <p className="text-xs text-slate-400">Data akan langsung tersimpan ke Supabase</p>
                </div>
              </div>

              {/* Error di dalam modal */}
              {error && (
                <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-xs font-medium">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Judul */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">
                    Judul Campaign <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Contoh: Flash Sale Akhir Bulan 20%"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Kategori</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] bg-white transition"
                  >
                    {Object.keys(CATEGORY_COLORS).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Tipe Diskon */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-3">Tipe Diskon</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "persen",  label: "% Persen",   icon: <FaPercent /> },
                      { key: "flat",    label: "Rp Flat",     icon: <FaTag /> },
                      { key: "ongkir",  label: "Gratis Ongkir", icon: <FaGift /> },
                    ].map(t => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, type: t.key, discount: "" }))}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-bold transition ${
                          form.type === t.key
                            ? "bg-[#FFB400] border-[#FFB400] text-white"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {t.icon}
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nilai diskon (hanya kalau bukan ongkir) */}
                {form.type !== "ongkir" && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">
                      {form.type === "persen" ? "Besar Diskon (%)" : "Nominal Diskon (Rp)"}
                      <span className="text-rose-500"> *</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
                        {form.type === "persen" ? "%" : "Rp"}
                      </span>
                      <input
                        type="number"
                        name="discount"
                        value={form.discount}
                        onChange={handleChange}
                        placeholder={form.type === "persen" ? "Contoh: 15" : "Contoh: 15000"}
                        min="1"
                        max={form.type === "persen" ? "100" : undefined}
                        required
                        className="w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm outline-none focus:border-[#FFB400] transition"
                      />
                    </div>
                    {/* Live preview */}
                    {form.discount && (
                      <p className="mt-2 text-xs text-[#FFB400] font-bold">
                        Preview: {form.type === "persen"
                          ? `Diskon ${form.discount}%`
                          : `Potongan Rp ${Number(form.discount).toLocaleString("id-ID")}`
                        }
                      </p>
                    )}
                  </div>
                )}

                {/* Tanggal */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">
                      Tanggal Mulai
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={form.start_date}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">
                      Tanggal Berakhir
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={form.end_date}
                      onChange={handleChange}
                      min={form.start_date}
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                    />
                  </div>
                </div>

                {/* Durasi otomatis */}
                {form.start_date && form.end_date && (
                  <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 flex items-center gap-2">
                    <FaCalendarAlt className="text-[#FFB400]" />
                    <p className="text-xs font-bold text-amber-700">
                      Durasi promo:{" "}
                      {Math.ceil(
                        (new Date(form.end_date) - new Date(form.start_date)) / (1000 * 60 * 60 * 24)
                      )}{" "}
                      hari
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-end gap-3 pt-2 border-t border-[#ECECEC]">
                  <button
                    type="button"
                    onClick={() => { setIsFormOpen(false); resetForm(); }}
                    className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-[#FFB400] text-white rounded-xl text-xs font-bold hover:bg-[#E0A000] shadow-md shadow-amber-500/10 transition disabled:opacity-60 flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <><FaRocket /> Launch Campaign</>
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