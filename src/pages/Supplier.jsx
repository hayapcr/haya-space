import { useEffect, useState } from "react";
import { dbService } from "../services/db";
import { FaTruck, FaPlus, FaTrash, FaEdit, FaPhoneAlt } from "react-icons/fa";
import Container from "../components/Container";

export default function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const loadData = async () => {
    setError("");
    try {
      const data = await dbService.getSuppliers();
      setSuppliers(data);
    } catch (e) {
      setError(e.message || "Gagal memuat supplier dari Supabase.");
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

  const handleEdit = (s) => {
    setEditId(s.id);
    setForm({
      name: s.name,
      phone: s.phone,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus supplier ini? Tindakan ini akan memutus relasi bahan baku terkait.")) return;
    setError("");
    try {
      await dbService.deleteSupplier(id);
      setSuccess("✅ Supplier berhasil dihapus dari Supabase!");
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menghapus supplier.");
      setTimeout(() => setError(""), 6000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const data = {
      name: form.name,
      phone: form.phone,
    };

    try {
      if (editId) {
        await dbService.updateSupplier(editId, data);
        setSuccess("✅ Supplier berhasil diupdate di Supabase!");
      } else {
        await dbService.createSupplier(data);
        setSuccess("✅ Supplier baru berhasil didaftarkan ke Supabase!");
      }
      setIsFormOpen(false);
      setForm({ name: "", phone: "" });
      setEditId(null);
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menyimpan supplier. Pastikan tabel sudah dibuat di Supabase.");
      setTimeout(() => setError(""), 8000);
    }
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
      <div className="w-full min-h-screen bg-[#F8F9FB] p-4 md:p-6 lg:p-8 font-['Poppins'] text-[#4B5563]">
        
        {/* HEADER */}
        <div className="border-b border-[#ECECEC] pb-8 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-5 py-2 bg-[#1F2937] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                PARTNER DIRECTORY
              </span>
              <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full"></div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">
                SUPPLIER PARTNERS
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] tracking-tight">
              Supplier <span className="text-[#FFB400] italic">Data.</span>
            </h1>
            <p className="mt-3 text-slate-500 text-sm max-w-xl">
              Kelola daftar mitra penyedia bahan makanan, sayuran, beras, daging, dan perlengkapan catering.
            </p>
          </div>

          <button
            onClick={() => {
              setEditId(null);
              setForm({ name: "", phone: "" });
              setIsFormOpen(true);
            }}
            className="px-6 py-3.5 bg-[#FFB400] hover:bg-[#E0A000] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition duration-300 shadow-md shadow-amber-500/10 flex items-center gap-2 w-fit h-fit"
          >
            <FaPlus /> Tambah Partner Supplier
          </button>
        </div>

        {/* NOTIFICATIONS */}
        {success && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 shadow-sm flex items-center gap-3">
            <span>✨</span>
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}

        {/* SUPPLIER CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.length === 0 ? (
            <div className="col-span-full bg-white rounded-[20px] p-16 text-center border border-[#ECECEC] text-[#9CA3AF]">
              <div className="h-16 w-16 bg-slate-50 text-slate-400 flex items-center justify-center rounded-full mx-auto mb-4 text-2xl">
                <FaTruck />
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] mb-1">Belum Ada Supplier</h3>
              <p className="text-xs">Daftarkan mitra supplier Anda dengan mengklik tombol diatas.</p>
            </div>
          ) : (
            suppliers.map((s) => (
              <div key={s.id} className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 bg-amber-50 text-[#FFB400] flex items-center justify-center rounded-xl text-lg">
                      <FaTruck />
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] font-mono">{s.id}</span>
                  </div>

                  <h3 className="text-lg font-black text-[#1F2937] leading-tight mb-3">{s.name}</h3>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <FaPhoneAlt className="text-slate-400" />
                    <span className="font-semibold text-slate-700">{s.phone || "Tidak ada telepon"}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <FaEdit /> Edit Partner
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="py-2.5 px-3.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs rounded-xl flex items-center justify-center transition border border-red-100"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* MODAL DIALOG FORM */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-['Poppins']">
            <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl animate-in zoom-in duration-200">
              <h2 className="text-xl font-bold text-[#1F2937] mb-5">
                {editId ? "Edit Partner Supplier" : "Daftarkan Supplier"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Nama Perusahaan / Supplier</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Contoh: PD Ayam Segar Jaya"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400] focus:ring-4 focus:ring-amber-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Nomor Telepon / Kontak</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Contoh: 0812XXXXXXXX"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400] focus:ring-4 focus:ring-amber-50"
                  />
                </div>

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
                    className="px-5 py-3 bg-[#FFB400] text-white rounded-xl text-xs font-bold hover:bg-[#E0A000] shadow-md shadow-amber-500/10 transition"
                  >
                    Simpan Supplier
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
