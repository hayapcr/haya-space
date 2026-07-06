import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../services/db";
import {
  FaCrown,
  FaGift,
  FaUsers,
  FaCheckCircle,
  FaSearch,
  FaPlus,
  FaDownload,
  FaEdit,
  FaTrash,
  FaStar,
} from "react-icons/fa";
import Container from "../components/Container";

// ─── Helper: hitung tier dari jumlah poin ────────────────────
function getTierFromPoints(pts) {
  const p = Number(pts) || 0;
  if (p >= 500) return "Platinum";
  if (p >= 200) return "Gold";
  return "Silver";
}

function getMembershipIdFromPoints(pts) {
  const p = Number(pts) || 0;
  if (p >= 500) return "MBR-PLT";
  if (p >= 200) return "MBR-GLD";
  return "MBR-SLV";
}

// ─── KPI Card ────────────────────────────────────────────────
function SummaryCard({ icon, title, value, accent = "#FFB400" }) {
  return (
    <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm flex items-center gap-5">
      <div
        className="h-12 w-12 rounded-xl flex items-center justify-center text-xl shadow-sm"
        style={{ background: `${accent}15`, color: accent }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-[#1F2937] mt-0.5">{value}</h3>
      </div>
    </div>
  );
}

// ─── Tier Badge ───────────────────────────────────────────────
function TierBadge({ tier }) {
  const styles = {
    Platinum: "bg-purple-100 text-purple-700 border border-purple-200",
    Gold: "bg-amber-50 text-amber-600 border border-amber-300",
    Silver: "bg-slate-100 text-slate-500 border border-slate-200",
  };
  const icons = { Platinum: "💎", Gold: "🥇", Silver: "🥈" };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${styles[tier] || styles.Silver}`}>
      {icons[tier]} {tier}
    </span>
  );
}

export default function Membership() {
  const [members, setMembers]       = useState([]);
  const [search, setSearch]         = useState("");
  const [filter, setFilter]         = useState("Semua");
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId]         = useState(null);
  const [success, setSuccess]       = useState("");
  const [error, setError]           = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    points: 0,
    membership_id: "MBR-SLV",
  });

  // ── Load data dari Supabase ─────────────────────────────────
  const loadData = async () => {
    setError("");
    try {
      const custs = await dbService.getCustomers();

      const merged = custs.map((c) => {
        const pts  = Number(c.points) || 0;
        const tier = getTierFromPoints(pts);
        return {
          id:            c.id,
          name:          c.name,
          email:         c.email  || "",
          phone:         c.phone  || "",
          tier,
          points:        pts,
          membership_id: c.membership_id || "MBR-SLV",
        };
      });

      setMembers(merged);
    } catch (e) {
      setError(e.message || "Gagal memuat data membership dari Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // ── Filter + Search ─────────────────────────────────────────
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const q = search.toLowerCase();
      const matchSearch =
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q);
      const matchFilter =
        filter === "Semua" || m.tier === filter;
      return matchSearch && matchFilter;
    });
  }, [members, search, filter]);

  // ── KPI ─────────────────────────────────────────────────────
  const vipCount    = members.filter((m) => m.tier === "Platinum" || m.tier === "Gold").length;
  const totalPoints = members.reduce((acc, m) => acc + Number(m.points), 0);

  // ── Form helpers ────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Auto-kalkulasi tier saat input poin berubah
    if (name === "points") {
      const pts = Number(value) || 0;
      setForm((prev) => ({
        ...prev,
        points: value,
        membership_id: getMembershipIdFromPoints(pts),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", points: 0, membership_id: "MBR-SLV" });
    setEditId(null);
    setError("");
  };

  const handleAdd = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleEdit = (member) => {
    setForm({
      name:          member.name,
      email:         member.email,
      phone:         member.phone,
      points:        member.points,
      membership_id: member.membership_id,
    });
    setEditId(member.id);
    setError("");
    setIsFormOpen(true);
  };

  // ── Delete ──────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data member ini?")) return;
    setError("");
    try {
      await dbService.deleteCustomer(id);
      setSuccess("✅ Member berhasil dihapus dari Supabase!");
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menghapus member.");
      setTimeout(() => setError(""), 6000);
    }
  };

  // ── Submit (Create / Update) ────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const pts          = Number(form.points) || 0;
    const membership_id = getMembershipIdFromPoints(pts);

    try {
      if (editId) {
        // Update semua field + poin + tier sekaligus
        await dbService.updateCustomer(editId, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          points: pts,
          membership_id,
        });
        setSuccess("✅ Data member berhasil diupdate di Supabase!");
      } else {
        // Buat customer baru dengan poin awal
        await dbService.createCustomer({
          name: form.name,
          email: form.email,
          phone: form.phone,
          points: pts,
          membership_id,
        });
        setSuccess("✅ Member baru berhasil didaftarkan ke Supabase!");
      }

      setIsFormOpen(false);
      resetForm();
      loadData();
      setTimeout(() => setSuccess(""), 5000);
    } catch (e) {
      setError(e.message || "Gagal menyimpan member. Pastikan tabel customers sudah dibuat di Supabase.");
      setTimeout(() => setError(""), 10000);
    } finally {
      setSaving(false);
    }
  };

  // ── Download CSV ────────────────────────────────────────────
  const downloadCSV = () => {
    const header = "ID,Nama,Email,Phone,Tier,Poin\n";
    const rows   = members
      .map((m) => `${m.id},${m.name},${m.email},${m.phone},${m.tier},${m.points}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "membership-catering.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-['Poppins']">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFB400] border-t-transparent" />
      </div>
    );
  }

  return (
    <Container>
      <div className="w-full min-h-screen bg-[#F8F9FB] p-4 sm:p-6 lg:p-8 font-['Poppins'] text-[#4B5563]">

        {/* HEADER */}
        <div className="border-b border-[#ECECEC] pb-8 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-5 py-2 bg-[#1F2937] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full">
                CRM & LOYALTY
              </span>
              <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                MEMBERSHIP CATERING
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-none text-[#1F2937]">
              Membership <span className="italic text-[#FFB400]">Rewards.</span>
            </h1>
            <p className="mt-4 text-gray-500 text-sm font-medium max-w-xl">
              Kelola program loyalitas, poin reward, dan status tier membership pelanggan katering.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={downloadCSV}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-[#1F2937] hover:bg-slate-50 transition flex items-center gap-2"
            >
              <FaDownload /> Download CSV
            </button>
            <button
              onClick={handleAdd}
              className="rounded-2xl bg-[#FFB400] px-5 py-3 text-xs font-bold text-white hover:bg-[#E0A000] shadow-md shadow-amber-500/10 transition flex items-center gap-2"
            >
              <FaPlus /> Tambah Member
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        {success && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 shadow-sm flex items-center gap-3">
            <span>✨</span>
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 px-5 py-4 shadow-sm flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <SummaryCard icon={<FaUsers />}        title="Total Member"   value={members.length} />
          <SummaryCard icon={<FaCrown />}         title="VIP & Gold"     value={vipCount} accent="#8B5CF6" />
          <SummaryCard icon={<FaGift />}          title="Total Poin"     value={totalPoints.toLocaleString("id-ID")} />
          <SummaryCard icon={<FaCheckCircle />}   title="Aktif Belanja"  value={members.filter((m) => m.points > 0).length} accent="#10B981" />
        </div>

        {/* SEARCH & FILTERS */}
        <div className="bg-white rounded-[20px] p-5 shadow-sm border border-[#ECECEC] mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:w-[400px]">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              placeholder="Cari nama, email, atau ID member..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#FFB400] transition"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Semua", "Silver", "Gold", "Platinum"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition ${
                  filter === item
                    ? "bg-[#1F2937] text-white"
                    : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* MEMBER GRID */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <FaStar className="text-4xl mx-auto mb-3 text-slate-200" />
            <p className="font-bold text-lg">Belum ada member</p>
            <p className="text-sm mt-1">Klik "Tambah Member" untuk mendaftarkan pelanggan pertama</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMembers.map((member) => {
              const pct500 = Math.min(100, Math.round((member.points / 500) * 100));
              return (
                <div
                  key={member.id}
                  className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-5">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 font-mono">
                        {member.id}
                      </span>
                      <TierBadge tier={member.tier} />
                    </div>

                    {/* Name */}
                    <Link
                      to={`/customers/${member.id}`}
                      className="text-xl font-black text-[#1F2937] hover:text-[#FFB400] transition block"
                    >
                      {member.name}
                    </Link>
                    <p className="text-xs text-slate-400 mt-1">{member.email || "Belum ada email"}</p>
                    <p className="text-xs text-slate-400 mt-0.5">📞 {member.phone || "Belum ada nomor"}</p>

                    {/* Points + progress */}
                    <div className="mt-5 p-4 bg-slate-50 rounded-2xl">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Poin Loyalty</p>
                          <p className="font-extrabold text-sm text-[#1F2937] mt-0.5">
                            {Number(member.points).toLocaleString("id-ID")} pts
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Diskon</p>
                          <p className="font-extrabold text-sm text-[#FFB400] mt-0.5">
                            {member.tier === "Platinum" ? "10%" : member.tier === "Gold" ? "5%" : "0%"}
                          </p>
                        </div>
                      </div>
                      {/* Progress bar menuju Platinum */}
                      <div className="mt-2">
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>Progress ke Platinum</span>
                          <span>{pct500}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#FFB400] to-purple-500 transition-all duration-500"
                            style={{ width: `${pct500}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 border-t border-[#ECECEC] pt-4 mt-4">
                    <button
                      onClick={() => handleEdit(member)}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-500 text-xs rounded-xl flex items-center justify-center transition border border-red-100"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── MODAL FORM ─────────────────────────────────────────── */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-['Poppins']">
            <div className="bg-white rounded-[24px] max-w-md w-full p-7 shadow-2xl">
              <h2 className="text-xl font-black text-[#1F2937] mb-1">
                {editId ? "Edit Member" : "Daftarkan Member Baru"}
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                {editId ? "Perubahan akan langsung tersimpan ke Supabase." : "Data akan langsung masuk ke database Supabase."}
              </p>

              {/* Error di dalam modal */}
              {error && (
                <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-xs font-medium">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nama */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Contoh: Budi Sudarsono"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="budi@gmail.com"
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">
                      No. Telepon <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="08XXXXXXXXXX"
                      required
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                    />
                  </div>
                </div>

                {/* Poin + preview tier */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">
                    Jumlah Poin Awal
                  </label>
                  <input
                    type="number"
                    name="points"
                    value={form.points}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#FFB400] transition"
                  />
                  {/* Live tier preview */}
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <span>Tier otomatis:</span>
                    <TierBadge tier={getTierFromPoints(form.points)} />
                    <span className="text-slate-400">
                      {form.membership_id === "MBR-SLV" && "(0 – 199 poin)"}
                      {form.membership_id === "MBR-GLD" && "(200 – 499 poin)"}
                      {form.membership_id === "MBR-PLT" && "(500+ poin)"}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3 mt-6 border-t border-[#ECECEC] pt-5">
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
                    className="px-6 py-3 bg-[#FFB400] text-white rounded-xl text-xs font-bold hover:bg-[#E0A000] shadow-md shadow-amber-500/10 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      "Simpan Member"
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