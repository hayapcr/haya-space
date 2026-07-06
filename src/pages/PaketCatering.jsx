import { useState, useEffect, useMemo } from "react";
import { dbService } from "../services/db";
import Container from "../components/Container";
import {
  FaPlus, FaTrash, FaEdit, FaSearch, FaBoxOpen,
  FaUtensils, FaUsers, FaCheckCircle, FaClock,
  FaFire, FaTag,
} from "react-icons/fa";

// ── Package tier config ──────────────────────────────────────────────────────
const TIERS = {
  "Basic":    { color: "from-slate-400 to-slate-600",   badge: "bg-slate-100 text-slate-600",   label: "Basic",    min: 0,       max: 100000  },
  "Standard": { color: "from-amber-400 to-orange-500",  badge: "bg-amber-100 text-amber-700",    label: "Standard", min: 100000,  max: 300000  },
  "Premium":  { color: "from-rose-500 to-pink-600",     badge: "bg-rose-100 text-rose-700",      label: "Premium",  min: 300000,  max: 700000  },
  "Eksklusif":{ color: "from-violet-500 to-purple-700", badge: "bg-violet-100 text-violet-700",  label: "Eksklusif",min: 700000,  max: Infinity},
};

function getPriceTier(price) {
  const p = Number(price);
  if (p >= 700000) return "Eksklusif";
  if (p >= 300000) return "Premium";
  if (p >= 100000) return "Standard";
  return "Basic";
}

const PACKAGE_IMAGES = [
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
];

// ── Package Card ─────────────────────────────────────────────────────────────
function PackageCard({ item, onEdit, onDelete }) {
  const tier      = getPriceTier(item.price);
  const tierCfg   = TIERS[tier];
  const imgSrc    = item.image || PACKAGE_IMAGES[Math.abs(item.name.charCodeAt(0)) % PACKAGE_IMAGES.length];
  const minPax    = item.min_pax || 25;
  const includes  = item.includes || item.description || "Nasi putih, lauk pauk, sayuran, buah, air mineral";

  return (
    <div className="group bg-white rounded-[28px] border border-[#ECECEC] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">

      {/* Gradient top strip */}
      <div className={`h-2 w-full bg-gradient-to-r ${tierCfg.color}`} />

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imgSrc} alt={item.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={e => { e.target.src = PACKAGE_IMAGES[0]; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Tier badge */}
        <span className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border ${tierCfg.badge}`}>
          ✦ {tier}
        </span>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button onClick={() => onEdit(item)} className="p-2 bg-white/95 rounded-xl shadow text-slate-600 hover:text-[#FFB400] transition" title="Edit paket">
            <FaEdit size={12} />
          </button>
          <button onClick={() => onDelete(item.id)} className="p-2 bg-white/95 rounded-xl shadow text-slate-600 hover:text-rose-500 transition" title="Hapus paket">
            <FaTrash size={12} />
          </button>
        </div>

        {/* Price absolute bottom */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-white text-lg font-black drop-shadow`}>
            Rp {Number(item.price).toLocaleString("id-ID")}
          </span>
          <span className="text-white/80 text-[10px] font-bold ml-1">/pax</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-black text-[#1F2937] text-lg leading-snug">{item.name}</h3>

        {/* Min pax */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <FaUsers className="text-amber-400 shrink-0" />
          <span>Min. pemesanan: <strong>{minPax} pax</strong></span>
        </div>

        {/* Includes */}
        {includes && (
          <div className="text-[11px] text-slate-500 bg-slate-50 rounded-xl p-3 leading-relaxed border border-slate-100 flex-1">
            <span className="text-[10px] font-black text-[#1F2937] block mb-1 uppercase tracking-wider">Sudah Termasuk:</span>
            {includes}
          </div>
        )}

        {/* ID */}
        <p className="text-[10px] text-slate-300 font-mono mt-auto pt-2 border-t border-slate-50">{item.id}</p>
      </div>
    </div>
  );
}

// ── Main Paket Catering Page ─────────────────────────────────────────────────
export default function PaketCatering() {
  const [packages, setPackages]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [search, setSearch]         = useState("");
  const [filterTier, setFilterTier] = useState("Semua");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId]         = useState(null);
  const [success, setSuccess]       = useState("");
  const [error, setError]           = useState("");

  const [form, setForm] = useState({
    name: "", price: "", min_pax: "25", image: "",
    description: "", includes: "",
  });

  // Load only Catering Paket category
  const loadData = async () => {
    setError("");
    try {
      const all = await dbService.getProducts();
      setPackages((all || []).filter(p =>
        (p.category || "").toLowerCase().includes("paket") ||
        (p.category || "").toLowerCase().includes("catering")
      ));
    } catch (e) {
      setError(e.message || "Gagal memuat paket dari Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const openAdd = () => {
    setEditId(null);
    setForm({ name: "", price: "", min_pax: "25", image: "", description: "", includes: "" });
    setError("");
    setIsFormOpen(true);
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setForm({
      name: p.name, price: p.price,
      min_pax: p.min_pax || "25",
      image: p.image || "",
      description: p.description || "",
      includes: p.includes || "",
    });
    setError("");
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus paket catering ini?")) return;
    setError("");
    try {
      await dbService.deleteProduct(id);
      setSuccess("✅ Paket berhasil dihapus!");
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menghapus paket.");
      setTimeout(() => setError(""), 6000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const data = {
      name: form.name.trim(),
      price: Number(form.price),
      min_pax: Number(form.min_pax) || 25,
      category: "Catering Paket",
      image: form.image.trim() || "",
      description: form.description.trim(),
      includes: form.includes.trim(),
    };
    try {
      if (editId) {
        await dbService.updateProduct(editId, data);
        setSuccess("✅ Paket berhasil diperbarui!");
      } else {
        await dbService.createProduct(data);
        setSuccess("✅ Paket catering baru berhasil ditambahkan!");
      }
      setIsFormOpen(false);
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menyimpan paket. Pastikan tabel products ada di Supabase.");
    } finally {
      setSaving(false);
    }
  };

  // Filter
  const filtered = useMemo(() => {
    let list = packages;
    if (filterTier !== "Semua") list = list.filter(p => getPriceTier(p.price) === filterTier);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    return list;
  }, [packages, filterTier, search]);

  // KPIs
  const cheapest = packages.length ? Math.min(...packages.map(p => p.price)) : 0;
  const mostExpensive = packages.length ? Math.max(...packages.map(p => p.price)) : 0;

  if (loading) return (
    <div className="flex h-screen items-center justify-center font-['Poppins']">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFB400] border-t-transparent" />
    </div>
  );

  return (
    <Container>
      <div className="relative w-full min-h-screen bg-[#F8F9FB] p-4 md:p-6 lg:p-8 font-['Poppins'] text-[#4B5563] overflow-hidden">

        {/* BG orbs */}
        <div className="absolute right-[-10%] top-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-rose-400/6 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-amber-300/6 blur-[120px]" />

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="border-b border-[#ECECEC] pb-8 mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-5 py-2 bg-[#1F2937] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">PAKET CATERING</span>
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">PREMIUM PACKAGES</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] tracking-tight">
              Paket <span className="text-[#FFB400] italic">Catering.</span>
            </h1>
            <p className="mt-3 text-slate-500 text-sm max-w-xl">
              Kelola paket catering untuk acara pernikahan, seminar, gathering, dan ulang tahun. Tersimpan real-time ke Supabase.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="px-6 py-3.5 bg-[#FFB400] hover:bg-[#E0A000] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition shadow-md shadow-amber-500/20 flex items-center gap-2 w-fit shrink-0"
          >
            <FaPlus /> Tambah Paket
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

        {/* ── KPI ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Total Paket", value: packages.length, sub: "paket aktif", icon: <FaBoxOpen className="text-xl" />, c: "bg-amber-50 text-amber-500" },
            { label: "Harga Terendah", value: `Rp ${cheapest.toLocaleString("id-ID")}`, sub: "per pax", icon: <FaTag className="text-xl" />, c: "bg-emerald-50 text-emerald-500" },
            { label: "Harga Tertinggi", value: `Rp ${mostExpensive.toLocaleString("id-ID")}`, sub: "per pax", icon: <FaFire className="text-xl" />, c: "bg-rose-50 text-rose-500" },
          ].map((k, i) => (
            <div key={i} className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm flex items-center gap-5">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${k.c}`}>{k.icon}</div>
              <div>
                <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">{k.label}</p>
                <h3 className="text-xl font-black text-[#1F2937] mt-0.5">{k.value}</h3>
                <p className="text-[10px] text-slate-400">{k.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── SEARCH & TIER FILTER ──────────────────────────────── */}
        <div className="bg-white rounded-[20px] p-5 border border-[#ECECEC] shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              placeholder="Cari nama paket..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FFB400] transition"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {["Semua", "Basic", "Standard", "Premium", "Eksklusif"].map(t => (
              <button
                key={t}
                onClick={() => setFilterTier(t)}
                className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition ${
                  filterTier === t
                    ? "bg-[#1F2937] text-white shadow"
                    : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── PACKAGE GRID ─────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[20px] p-16 text-center border border-dashed border-[#ECECEC] text-slate-400">
            <FaBoxOpen className="text-5xl mx-auto mb-4 text-slate-200" />
            <h3 className="text-lg font-bold text-[#1F2937] mb-1">
              {packages.length === 0 ? "Belum Ada Paket Catering" : "Tidak Ada Paket Ditemukan"}
            </h3>
            <p className="text-xs">
              {packages.length === 0
                ? "Klik tombol Tambah Paket untuk mulai mengisi katalog paket."
                : "Coba ubah filter atau kata kunci pencarian."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map(item => (
              <PackageCard key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}

        {/* ── ADD/EDIT MODAL ───────────────────────────────────── */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-['Poppins']">
            <div className="bg-white rounded-[28px] max-w-lg w-full p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-amber-50 text-[#FFB400] rounded-xl flex items-center justify-center text-lg">
                  <FaBoxOpen />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#1F2937]">
                    {editId ? "Edit Paket Catering" : "Tambah Paket Baru"}
                  </h2>
                  <p className="text-xs text-slate-400">Tersimpan real-time ke Supabase</p>
                </div>
              </div>

              {error && (
                <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-xs font-medium">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Nama Paket <span className="text-rose-500">*</span></label>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Contoh: Paket Wedding Eksklusif 500 Pax" required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                  />
                </div>

                {/* Price + Min Pax */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Harga /Pax (Rp) <span className="text-rose-500">*</span></label>
                    <input type="number" name="price" value={form.price} onChange={handleChange}
                      placeholder="250000" min="1000" required
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Minimal Pax</label>
                    <input type="number" name="min_pax" value={form.min_pax} onChange={handleChange}
                      placeholder="25" min="1"
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                    />
                  </div>
                </div>

                {/* Tier preview */}
                {form.price && (
                  <div className={`text-xs font-black px-3 py-2 rounded-xl ${TIERS[getPriceTier(form.price)].badge}`}>
                    Tier Paket: {getPriceTier(form.price)} • Rp {Number(form.price).toLocaleString("id-ID")}/pax
                  </div>
                )}

                {/* Includes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Yang Sudah Termasuk</label>
                  <textarea name="includes" value={form.includes} onChange={handleChange}
                    placeholder="Nasi putih, lauk pauk 3 pilihan, sayuran, buah, air mineral, peralatan makan..."
                    rows="3"
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition resize-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Deskripsi Tambahan</label>
                  <textarea name="description" value={form.description} onChange={handleChange}
                    placeholder="Detail event, area coverage, sertifikasi halal, dll..."
                    rows="2"
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition resize-none"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">URL Foto Paket</label>
                  <input type="text" name="image" value={form.image} onChange={handleChange}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#ECECEC]">
                  <button type="button" onClick={() => setIsFormOpen(false)}
                    className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition">
                    Batal
                  </button>
                  <button type="submit" disabled={saving}
                    className="px-6 py-3 bg-[#FFB400] text-white rounded-xl text-xs font-bold hover:bg-[#E0A000] transition disabled:opacity-60 flex items-center gap-1.5 shadow-md">
                    {saving ? (
                      <><span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...</>
                    ) : (
                      <><FaCheckCircle /> {editId ? "Perbarui Paket" : "Simpan Paket"}</>
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
