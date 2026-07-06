import { useState, useEffect, useMemo } from "react";
import { dbService } from "../services/db";
import Container from "../components/Container";
import {
  FaPlus, FaTrash, FaEdit, FaSearch, FaUtensils,
  FaBoxOpen, FaCoffee, FaStar, FaCheckCircle,
} from "react-icons/fa";

// ── Category config ──────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "Semua",        color: "bg-slate-800 text-white" },
  { key: "Nasi Box",     color: "bg-amber-500 text-white" },
  { key: "Snack Box",    color: "bg-orange-500 text-white" },
  { key: "Catering Paket", color: "bg-rose-500 text-white" },
  { key: "Coffee & Drinks", color: "bg-brown-500 text-white" },
  { key: "Prasmanan",    color: "bg-violet-500 text-white" },
  { key: "Dessert",      color: "bg-pink-500 text-white" },
];

const CATEGORY_BADGE = {
  "Nasi Box":       "bg-amber-100 text-amber-700 border-amber-200",
  "Snack Box":      "bg-orange-100 text-orange-700 border-orange-200",
  "Catering Paket": "bg-rose-100 text-rose-700 border-rose-200",
  "Coffee & Drinks":"bg-brown-100 text-yellow-700 border-yellow-200",
  "Prasmanan":      "bg-violet-100 text-violet-700 border-violet-200",
  "Dessert":        "bg-pink-100 text-pink-700 border-pink-200",
};

const DEFAULT_IMAGES = {
  "Nasi Box":        "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
  "Snack Box":       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "Catering Paket":  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
  "Coffee & Drinks": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
  "Prasmanan":       "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  "Dessert":         "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800",
};

// ── Menu Card Component ──────────────────────────────────────────────────────
function MenuCard({ item, onEdit, onDelete }) {
  const badgeClass = CATEGORY_BADGE[item.category] || "bg-slate-100 text-slate-600 border-slate-200";
  const imgSrc = item.image || DEFAULT_IMAGES[item.category] || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800";

  return (
    <div className="group relative bg-white rounded-[24px] border border-[#ECECEC] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imgSrc}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"; }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Category badge */}
        <span className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border ${badgeClass}`}>
          {item.category}
        </span>

        {/* Action buttons on hover */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={() => onEdit(item)}
            className="p-2 bg-white/95 rounded-xl shadow-md text-slate-600 hover:text-[#FFB400] transition"
            title="Edit menu"
          >
            <FaEdit size={13} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 bg-white/95 rounded-xl shadow-md text-slate-600 hover:text-rose-500 transition"
            title="Hapus menu"
          >
            <FaTrash size={13} />
          </button>
        </div>

        {/* Price badge bottom */}
        <div className="absolute bottom-3 left-3 bg-[#FFB400] text-white px-3 py-1 rounded-full text-xs font-black shadow-md">
          Rp {Number(item.price).toLocaleString("id-ID")}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-black text-[#1F2937] text-base leading-snug mb-1">{item.name}</h3>
        <p className="text-xs text-slate-400 font-mono mt-auto pt-3 border-t border-slate-50">{item.id}</p>
      </div>
    </div>
  );
}

// ── Main Food Catalog Page ───────────────────────────────────────────────────
export default function Menu() {
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [search, setSearch]         = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [sortBy, setSortBy]         = useState("default");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId]         = useState(null);
  const [success, setSuccess]       = useState("");
  const [error, setError]           = useState("");

  const [form, setForm] = useState({
    name: "", price: "", category: "Nasi Box", image: "", description: "",
  });

  // Load from Supabase
  const loadData = async () => {
    setError("");
    try {
      const data = await dbService.getProducts();
      setProducts(data || []);
    } catch (e) {
      setError(e.message || "Gagal memuat katalog dari Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const openAdd = () => {
    setEditId(null);
    setForm({ name: "", price: "", category: "Nasi Box", image: "", description: "" });
    setError("");
    setIsFormOpen(true);
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setForm({ name: p.name, price: p.price, category: p.category, image: p.image || "", description: p.description || "" });
    setError("");
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus menu makanan ini dari katalog?")) return;
    setError("");
    try {
      await dbService.deleteProduct(id);
      setSuccess("✅ Menu berhasil dihapus dari Supabase!");
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menghapus menu.");
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
      category: form.category,
      image: form.image.trim() || DEFAULT_IMAGES[form.category] || "",
      description: form.description.trim(),
    };
    try {
      if (editId) {
        await dbService.updateProduct(editId, data);
        setSuccess("✅ Menu berhasil diperbarui di Supabase!");
      } else {
        await dbService.createProduct(data);
        setSuccess("✅ Menu baru berhasil ditambahkan ke Supabase!");
      }
      setIsFormOpen(false);
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menyimpan menu. Pastikan tabel products ada di Supabase.");
    } finally {
      setSaving(false);
    }
  };

  // Filter + Sort
  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== "Semua") {
      list = list.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || (p.category || "").toLowerCase().includes(q));
    }
    if (sortBy === "name")  list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    if (sortBy === "price_asc")  list = [...list].sort((a,b) => a.price - b.price);
    if (sortBy === "price_desc") list = [...list].sort((a,b) => b.price - a.price);
    return list;
  }, [products, activeCategory, search, sortBy]);

  // Stats
  const totalItems    = products.length;
  const categories    = [...new Set(products.map(p => p.category))].length;
  const avgPrice      = products.length ? Math.round(products.reduce((s,p) => s + Number(p.price), 0) / products.length) : 0;

  if (loading) return (
    <div className="flex h-screen items-center justify-center font-['Poppins']">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFB400] border-t-transparent" />
    </div>
  );

  return (
    <Container>
      <div className="relative w-full min-h-screen bg-[#F8F9FB] p-4 md:p-6 lg:p-8 font-['Poppins'] text-[#4B5563] overflow-hidden">

        {/* Background blur orbs */}
        <div className="absolute right-[-10%] top-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-[#FFB400]/8 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-amber-300/8 blur-[120px]" />

        {/* ── HEADER ────────────────────────────────────────────── */}
        <div className="border-b border-[#ECECEC] pb-8 mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-5 py-2 bg-[#1F2937] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">FOOD CATALOG</span>
              <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">CATERING PREMIUM</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] tracking-tight">
              Food <span className="text-[#FFB400] italic">Catalog.</span>
            </h1>
            <p className="mt-3 text-slate-500 text-sm max-w-xl">
              Kelola koleksi menu katering Anda — tambah hidangan baru, edit harga, dan atur kategori dengan mudah.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="px-6 py-3.5 bg-[#FFB400] hover:bg-[#E0A000] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition shadow-md shadow-amber-500/20 flex items-center gap-2 w-fit shrink-0"
          >
            <FaPlus /> Tambah Menu
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
            <span>⚠️</span>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* ── KPI CARDS ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Total Menu", value: totalItems, sub: "item tersedia", icon: <FaUtensils className="text-xl" />, color: "bg-amber-50 text-amber-500" },
            { label: "Kategori", value: categories, sub: "kategori aktif", icon: <FaBoxOpen className="text-xl" />, color: "bg-violet-50 text-violet-500" },
            { label: "Harga Rata-Rata", value: `Rp ${avgPrice.toLocaleString("id-ID")}`, sub: "per porsi", icon: <FaStar className="text-xl" />, color: "bg-emerald-50 text-emerald-500" },
          ].map((k, i) => (
            <div key={i} className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm flex items-center gap-5">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${k.color}`}>{k.icon}</div>
              <div>
                <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">{k.label}</p>
                <h3 className="text-2xl font-black text-[#1F2937] mt-0.5">{k.value}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{k.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── SEARCH & FILTER BAR ───────────────────────────────── */}
        <div className="bg-white rounded-[20px] p-5 border border-[#ECECEC] shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              placeholder="Cari nama menu atau kategori..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FFB400] transition"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FFB400] bg-white cursor-pointer"
          >
            <option value="default">Urutan Default</option>
            <option value="name">Nama (A–Z)</option>
            <option value="price_asc">Harga Terendah</option>
            <option value="price_desc">Harga Tertinggi</option>
          </select>
        </div>

        {/* ── CATEGORY TABS ─────────────────────────────────────── */}
        <div className="flex gap-2.5 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition ${
                activeCategory === cat.key
                  ? "bg-[#1F2937] text-white shadow-md"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat.key}
              {cat.key !== "Semua" && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({products.filter(p => p.category === cat.key).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── MENU GRID ─────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[20px] p-16 text-center border border-[#ECECEC] border-dashed text-slate-400">
            <FaUtensils className="text-5xl mx-auto mb-4 text-slate-200" />
            <h3 className="text-lg font-bold text-[#1F2937] mb-1">
              {products.length === 0 ? "Katalog Masih Kosong" : "Tidak Ada Menu Ditemukan"}
            </h3>
            <p className="text-xs">
              {products.length === 0
                ? "Klik tombol Tambah Menu untuk mulai mengisi katalog Anda."
                : "Coba ubah kata kunci pencarian atau pilih kategori lain."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(item => (
              <MenuCard key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}

        {/* ── ADD/EDIT MODAL ────────────────────────────────────── */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-['Poppins']">
            <div className="bg-white rounded-[28px] max-w-lg w-full p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-amber-50 text-[#FFB400] rounded-xl flex items-center justify-center text-lg">
                  <FaUtensils />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#1F2937]">
                    {editId ? "Edit Menu Makanan" : "Tambah Menu Baru"}
                  </h2>
                  <p className="text-xs text-slate-400">Data tersimpan langsung ke Supabase</p>
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Nama Menu <span className="text-rose-500">*</span></label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Contoh: Nasi Box Ayam Bakar Special"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                  />
                </div>

                {/* Category + Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Kategori</label>
                    <select
                      name="category" value={form.category} onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] bg-white cursor-pointer"
                    >
                      {CATEGORIES.filter(c => c.key !== "Semua").map(c => (
                        <option key={c.key} value={c.key}>{c.key}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Harga (Rp) <span className="text-rose-500">*</span></label>
                    <input
                      type="number" name="price" value={form.price} onChange={handleChange}
                      placeholder="45000" min="1000" required
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                    />
                  </div>
                </div>

                {/* Price preview */}
                {form.price && (
                  <p className="text-xs font-black text-[#FFB400]">
                    Harga: Rp {Number(form.price).toLocaleString("id-ID")}
                  </p>
                )}

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Deskripsi Menu</label>
                  <textarea
                    name="description" value={form.description} onChange={handleChange}
                    placeholder="Deskripsikan isi paket, porsi, dan kelebihan menu ini..."
                    rows="3"
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition resize-none"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">URL Gambar</label>
                  <input
                    type="text" name="image" value={form.image} onChange={handleChange}
                    placeholder={`Kosongkan untuk gunakan gambar default kategori`}
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                  />
                  {/* Image preview */}
                  {(form.image || DEFAULT_IMAGES[form.category]) && (
                    <div className="mt-3 rounded-xl overflow-hidden h-32 border border-slate-100">
                      <img
                        src={form.image || DEFAULT_IMAGES[form.category]}
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={(e) => { e.target.src = DEFAULT_IMAGES[form.category]; }}
                      />
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#ECECEC]">
                  <button
                    type="button" onClick={() => setIsFormOpen(false)}
                    className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition"
                  >Batal</button>
                  <button
                    type="submit" disabled={saving}
                    className="px-6 py-3 bg-[#FFB400] text-white rounded-xl text-xs font-bold hover:bg-[#E0A000] transition disabled:opacity-60 flex items-center gap-1.5 shadow-md shadow-amber-500/10"
                  >
                    {saving ? (
                      <><span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...</>
                    ) : (
                      <><FaCheckCircle /> {editId ? "Perbarui Menu" : "Simpan Menu"}</>
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