import { useEffect, useState } from "react";
import { dbService } from "../services/db";
import { FaBoxes, FaPlus, FaTrash, FaEdit, FaExclamationTriangle, FaTruck } from "react-icons/fa";
import Container from "../components/Container";

export default function Stock() {
  const [inventory, setInventory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    product_name: "",
    stock: 0,
    supplier_id: "",
  });

  const loadData = async () => {
    setError("");
    try {
      const [inv, spl] = await Promise.all([
        dbService.getInventory(),
        dbService.getSuppliers(),
      ]);
      setInventory(inv);
      setSuppliers(spl);
    } catch (e) {
      setError(e.message || "Gagal memuat data stok dari Supabase.");
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

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      product_name: item.product_name,
      stock: item.stock,
      supplier_id: item.supplier_id || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus stok bahan ini?")) return;
    setError("");
    try {
      await dbService.deleteInventory(id);
      setSuccess("✅ Bahan berhasil dihapus dari Supabase!");
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menghapus bahan.");
      setTimeout(() => setError(""), 6000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const data = {
      product_name: form.product_name,
      stock: Number(form.stock),
      supplier_id: form.supplier_id || null,
    };

    try {
      if (editId) {
        await dbService.updateInventory(editId, data);
        setSuccess("✅ Data stok berhasil diupdate di Supabase!");
      } else {
        await dbService.createInventory(data);
        setSuccess("✅ Bahan baru berhasil ditambahkan ke Supabase!");
      }
      setIsFormOpen(false);
      setForm({ product_name: "", stock: 0, supplier_id: "" });
      setEditId(null);
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menyimpan bahan. Pastikan tabel sudah dibuat di Supabase.");
      setTimeout(() => setError(""), 8000);
    }
  };

  const getSupplierName = (id) => {
    return suppliers.find((s) => s.id === id)?.name || "Tanpa Supplier";
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-['Poppins']">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFB400] border-t-transparent" />
      </div>
    );
  }

  const lowStockItems = inventory.filter((item) => item.stock < 20);

  return (
    <Container>
      <div className="w-full min-h-screen bg-[#F8F9FB] p-4 md:p-6 lg:p-8 font-['Poppins'] text-[#4B5563]">
        
        {/* HEADER */}
        <div className="border-b border-[#ECECEC] pb-8 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-5 py-2 bg-[#1F2937] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                INVENTORY MANAGEMENT
              </span>
              <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full"></div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">
                STOCK BAHAN
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] tracking-tight">
              Inventory <span className="text-[#FFB400] italic">Stock.</span>
            </h1>
            <p className="mt-3 text-slate-500 text-sm max-w-xl">
              Pantau persediaan bahan mentah catering, kelola stok aman, dan hubungan dengan supplier.
            </p>
          </div>

          <button
            onClick={() => {
              setEditId(null);
              setForm({ product_name: "", stock: 0, supplier_id: "" });
              setIsFormOpen(true);
            }}
            className="px-6 py-3.5 bg-[#FFB400] hover:bg-[#E0A000] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition duration-300 shadow-md shadow-amber-500/10 flex items-center gap-2 w-fit h-fit"
          >
            <FaPlus /> Tambah Stok Bahan
          </button>
        </div>

        {/* NOTIFICATIONS */}
        {success && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 shadow-sm flex items-center gap-3">
            <span>✨</span>
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}

        {/* LOW STOCK ALERT */}
        {lowStockItems.length > 0 && (
          <div className="mb-8 p-5 bg-rose-50 border border-rose-200 rounded-3xl text-rose-800 flex items-start gap-4 shadow-sm">
            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-rose-600 shadow-sm shrink-0 mt-0.5 text-lg">
              <FaExclamationTriangle />
            </div>
            <div>
              <h4 className="font-extrabold text-sm mb-1 text-slate-900">Peringatan: Stok Bahan Menipis!</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Terdapat {lowStockItems.length} bahan makanan dengan stok di bawah 20 unit. Harap hubungi supplier untuk restock segera.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {lowStockItems.map((item) => (
                  <span key={item.id} className="px-2.5 py-1 bg-white border border-rose-200 rounded-full text-[10px] font-bold text-rose-700">
                    {item.product_name} ({item.stock})
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STOCK TABLE CARD */}
        <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECECEC] text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">
                  <th className="pb-3">Bahan Makanan</th>
                  <th className="pb-3 text-center">Stok</th>
                  <th className="pb-3">Supplier</th>
                  <th className="pb-3 text-center">Status</th>
                  <th className="pb-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECECEC]">
                {inventory.map((item) => {
                  const isLow = item.stock < 20;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg text-slate-500">
                            <FaBoxes />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1F2937] text-sm">{item.product_name}</h4>
                            <p className="text-xs text-[#9CA3AF]">{item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center font-mono font-bold text-sm text-[#1F2937]">
                        {item.stock}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <FaTruck className="text-[#FFB400] text-xs" />
                          {getSupplierName(item.supplier_id)}
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          isLow ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {isLow ? "Kritis" : "Aman"}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-slate-400 hover:text-[#FFB400] transition rounded-lg hover:bg-slate-50"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 transition rounded-lg hover:bg-slate-50"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL DIALOG FORM */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-['Poppins']">
            <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl animate-in zoom-in duration-200">
              <h2 className="text-xl font-bold text-[#1F2937] mb-5">
                {editId ? "Edit Bahan Makanan" : "Tambah Bahan Makanan"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Nama Bahan Makanan</label>
                  <input
                    type="text"
                    name="product_name"
                    value={form.product_name}
                    onChange={handleChange}
                    placeholder="Contoh: Daging Sapi (kg), Wortel (pack)"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400] focus:ring-4 focus:ring-amber-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Jumlah Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400] focus:ring-4 focus:ring-amber-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Pilih Supplier</label>
                    <select
                      name="supplier_id"
                      value={form.supplier_id}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
                    >
                      <option value="">-- Tanpa Supplier --</option>
                      {suppliers.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
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
                    Simpan Bahan
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
