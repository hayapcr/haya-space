import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../services/db";
import Container from "../components/Container";
import { FaUsers, FaUserShield, FaPlus, FaTrash, FaEdit, FaEye } from "react-icons/fa";

export default function Users() {
  const [activeTab, setActiveTab] = useState("customers");
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [points, setPoints] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Customer Form State
  const [isCustOpen, setIsCustOpen] = useState(false);
  const [custForm, setCustForm] = useState({ name: "", phone: "", email: "" });
  const [editCustId, setEditCustId] = useState(null);

  // User Form State
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [userForm, setUserForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [editUserId, setEditUserId] = useState(null);

  const loadAllData = async () => {
    setError("");
    try {
      const [dbCusts, dbUsers, pts, ords] = await Promise.all([
        dbService.getCustomers(),
        dbService.getUsers(),
        dbService.getAllCustomerPoints(),
        dbService.getOrders(),
      ]);
      setCustomers(dbCusts);
      setUsers(dbUsers);
      setPoints(pts);
      setOrders(ords);
    } catch (e) {
      setError(e.message || "Gagal memuat data dari Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // --- CUSTOMER CRUD HANDLERS ---
  const handleCustChange = (e) => {
    setCustForm({ ...custForm, [e.target.name]: e.target.value });
  };

  const handleEditCust = (c) => {
    setEditCustId(c.id);
    setCustForm({ name: c.name, phone: c.phone || "", email: c.email || "" });
    setIsCustOpen(true);
  };

  const handleDeleteCust = async (id) => {
    if (!confirm("Hapus customer ini? Semua data poin dan riwayat order akan disesuaikan.")) return;
    setError("");
    try {
      await dbService.deleteCustomer(id);
      setSuccess("Customer berhasil dihapus!");
      loadAllData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menghapus customer.");
      setTimeout(() => setError(""), 6000);
    }
  };

  const handleCustSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editCustId) {
        await dbService.updateCustomer(editCustId, custForm);
        setSuccess("✅ Data customer berhasil diupdate!");
      } else {
        await dbService.createCustomer({ ...custForm, membership_id: "MBR-SLV" });
        setSuccess("✅ Customer baru berhasil ditambahkan ke Supabase!");
      }
      setIsCustOpen(false);
      setCustForm({ name: "", phone: "", email: "" });
      setEditCustId(null);
      loadAllData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menyimpan customer. Pastikan tabel sudah dibuat di Supabase.");
      setTimeout(() => setError(""), 8000);
    }
  };

  // --- USER (STAFF) CRUD HANDLERS ---
  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleEditUser = (u) => {
    setEditUserId(u.id);
    setUserForm({ name: u.name, email: u.email, password: u.password || "", role: u.role });
    setIsUserOpen(true);
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("Hapus akun staff ini?")) return;
    setError("");
    try {
      await dbService.deleteUser(id);
      setSuccess("✅ Akun staff berhasil dihapus!");
      loadAllData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menghapus staff.");
      setTimeout(() => setError(""), 6000);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editUserId) {
        await dbService.updateUser(editUserId, userForm);
        setSuccess("✅ Akun staff berhasil diupdate!");
      } else {
        await dbService.createUser(userForm);
        setSuccess("✅ Staff baru berhasil terdaftar di Supabase!");
      }
      setIsUserOpen(false);
      setUserForm({ name: "", email: "", password: "", role: "user" });
      setEditUserId(null);
      loadAllData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menyimpan staff. Pastikan tabel sudah dibuat di Supabase.");
      setTimeout(() => setError(""), 8000);
    }
  };

  // Helper calculations
  const getPointsForCust = (id) => {
    return points.find((p) => p.customer_id === id)?.points || 0;
  };

  const getTierForCust = (membershipId) => {
    if (membershipId === "MBR-PLT") return "Platinum";
    if (membershipId === "MBR-GLD") return "Gold";
    return "Silver";
  };

  const getTierColor = (membershipId) => {
    if (membershipId === "MBR-PLT") return "bg-purple-100 text-purple-700";
    if (membershipId === "MBR-GLD") return "bg-[#FFF8E1] text-[#FFB400]";
    return "bg-slate-100 text-slate-500";
  };

  const getPurchasesForCust = (id) => {
    const custOrders = orders.filter((o) => o.customer_id === id && o.status !== "Dibatalkan");
    const totalSpent = custOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    return {
      count: custOrders.length,
      amount: totalSpent
    };
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
                CRM & ACCOUNTS
              </span>
              <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full"></div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">
                USER DIRECTORY
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] tracking-tight">
              Customer <span className="text-[#FFB400] italic">CRM.</span>
            </h1>
            <p className="mt-3 text-slate-500 text-sm max-w-xl">
              Kelola direktori customer katering (membership & riwayat) serta otentikasi login akun staff portal.
            </p>
          </div>

          <div className="flex gap-2">
            {activeTab === "customers" ? (
              <button
                onClick={() => {
                  setEditCustId(null);
                  setCustForm({ name: "", phone: "", email: "" });
                  setIsCustOpen(true);
                }}
                className="px-6 py-3.5 bg-[#FFB400] hover:bg-[#E0A000] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition duration-300 shadow-md shadow-amber-500/10 flex items-center gap-2"
              >
                <FaPlus /> Tambah Customer
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditUserId(null);
                  setUserForm({ name: "", email: "", password: "", role: "user" });
                  setIsUserOpen(true);
                }}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition duration-300 flex items-center gap-2"
              >
                <FaPlus /> Tambah Staff
              </button>
            )}
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
          <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 px-5 py-4 shadow-sm flex items-center gap-3">
            <span>⚠️</span>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* TAB NAVIGATION */}
        <div className="flex border-b border-[#ECECEC] mb-8 gap-4">
          <button
            onClick={() => setActiveTab("customers")}
            className={`pb-4 px-2 text-sm font-extrabold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "customers"
                ? "border-[#FFB400] text-[#1F2937]"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <FaUsers /> Catering Customers ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab("staff")}
            className={`pb-4 px-2 text-sm font-extrabold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "staff"
                ? "border-[#FFB400] text-[#1F2937]"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <FaUserShield /> Akun Staff & Login ({users.length})
          </button>
        </div>

        {/* LIST TABLE CARD */}
        <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm">
          {activeTab === "customers" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#ECECEC] text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Telepon</th>
                    <th className="pb-3 text-center">Membership</th>
                    <th className="pb-3 text-center">Poin</th>
                    <th className="pb-3 text-center">Order Count</th>
                    <th className="pb-3 text-right">Total Transaksi</th>
                    <th className="pb-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC]">
                  {customers.map((c) => {
                    const purchase = getPurchasesForCust(c.id);
                    return (
                      <tr key={c.id} className="hover:bg-slate-50/50 transition text-sm">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-700">
                              {c.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-[#1F2937]">{c.name}</h4>
                              <p className="text-xs text-[#9CA3AF]">{c.email || "No email"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 font-semibold text-slate-600">{c.phone || "-"}</td>
                        <td className="py-4 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getTierColor(c.membership_id)}`}>
                            {getTierForCust(c.membership_id)}
                          </span>
                        </td>
                        <td className="py-4 text-center font-mono font-bold">{getPointsForCust(c.id)} pts</td>
                        <td className="py-4 text-center font-bold">{purchase.count}x</td>
                        <td className="py-4 text-right font-mono font-bold text-[#FFB400]">
                          Rp {purchase.amount.toLocaleString("id-ID")}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-1">
                            <Link
                              to={`/customers/${c.id}`}
                              className="p-2 text-slate-400 hover:text-blue-500 transition rounded-lg hover:bg-slate-50"
                            >
                              <FaEye />
                            </Link>
                            <button
                              onClick={() => handleEditCust(c)}
                              className="p-2 text-slate-400 hover:text-[#FFB400] transition rounded-lg hover:bg-slate-50"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteCust(c.id)}
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
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#ECECEC] text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">
                    <th className="pb-3">Nama Staff</th>
                    <th className="pb-3">Email Login</th>
                    <th className="pb-3 text-center">Otoritas / Role</th>
                    <th className="pb-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC]">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition text-sm">
                      <td className="py-4 font-bold text-[#1F2937]">{u.name}</td>
                      <td className="py-4 font-mono font-semibold text-slate-600">{u.email}</td>
                      <td className="py-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          u.role === "admin" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => handleEditUser(u)}
                            className="p-2 text-slate-400 hover:text-[#FFB400] transition rounded-lg hover:bg-slate-50"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 transition rounded-lg hover:bg-slate-50"
                          >
                            <FaTrash />
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

        {/* CUSTOMER FORM MODAL */}
        {isCustOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-['Poppins']">
            <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl animate-in zoom-in duration-200">
              <h2 className="text-xl font-bold text-[#1F2937] mb-5">
                {editCustId ? "Edit Customer" : "Tambah Customer"}
              </h2>

              <form onSubmit={handleCustSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    value={custForm.name}
                    onChange={handleCustChange}
                    placeholder="Contoh: Joko Widodo"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">No. Telepon</label>
                    <input
                      type="text"
                      name="phone"
                      value={custForm.phone}
                      onChange={handleCustChange}
                      placeholder="08XXXXXXXXXX"
                      required
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={custForm.email}
                      onChange={handleCustChange}
                      placeholder="joko@gmail.com"
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 border-t border-[#ECECEC] pt-4">
                  <button
                    type="button"
                    onClick={() => setIsCustOpen(false)}
                    className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#FFB400] text-white rounded-xl text-xs font-bold hover:bg-[#E0A000] shadow-md shadow-amber-500/10 transition"
                  >
                    Simpan Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* USER (STAFF) FORM MODAL */}
        {isUserOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-['Poppins']">
            <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl animate-in zoom-in duration-200">
              <h2 className="text-xl font-bold text-[#1F2937] mb-5">
                {editUserId ? "Edit Akun Staff" : "Daftarkan Staff Baru"}
              </h2>

              <form onSubmit={handleUserSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Nama Staff</label>
                  <input
                    type="text"
                    name="name"
                    value={userForm.name}
                    onChange={handleUserChange}
                    placeholder="Contoh: Admin Katering"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Email Login</label>
                  <input
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleUserChange}
                    placeholder="staff@caterbox.com"
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={userForm.password}
                      onChange={handleUserChange}
                      placeholder="******"
                      required
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-2">Role Otoritas</label>
                    <select
                      name="role"
                      value={userForm.role}
                      onChange={handleUserChange}
                      className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400] font-bold text-slate-700 bg-slate-50 cursor-pointer"
                    >
                      <option value="user">User / Staff</option>
                      <option value="admin">Admin / Supervisor</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 border-t border-[#ECECEC] pt-4">
                  <button
                    type="button"
                    onClick={() => setIsUserOpen(false)}
                    className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition shadow-md"
                  >
                    Simpan Staff
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