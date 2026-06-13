import { useEffect, useState } from "react";
import { usersAPI } from "../services/usersAPI";
import LoadingState from "../components/Loadings";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await usersAPI.fetchUsers();
            setUsers(data);
        } catch (err) {
            setError("Gagal memuat data user");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();

        const loginData = localStorage.getItem("user");
        if (loginData) {
            setCurrentUser(JSON.parse(loginData));
        }
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setForm({
            name: "",
            email: "",
            password: "",
            role: "user",
        });
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            if (editId) {
                await usersAPI.updateUser(editId, form);
                setSuccess("Data user berhasil diupdate");
            } else {
                await usersAPI.createUser(form);
                setSuccess("Data user berhasil ditambahkan");
            }

            resetForm();
            loadUsers();

            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError("Gagal menyimpan data user");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setEditId(user.id);
        setForm({
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
        });
    };

    const handleDelete = async (id) => {
        const confirmDelete = confirm("Yakin ingin menghapus user ini?");
        if (!confirmDelete) return;

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await usersAPI.deleteUser(id);
            setSuccess("Data user berhasil dihapus");
            loadUsers();
        } catch (err) {
            setError("Gagal menghapus data user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-['Poppins'] min-h-screen bg-slate-50/50 text-slate-800 selection:bg-amber-200">

            {/* Header Section */}
            <div className="border-b border-slate-200 pb-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-5 py-2 bg-[#0F1B3D] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full">
                        USER MANAGEMENT
                    </span>

                    <span className="text-gray-300">•</span>

                    <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                        REGISTERED USERS
                    </span>
                </div>

                <h1 className="text-[72px] font-black leading-none text-[#0F1B3D]">
                    Registered <span className="italic text-[#FF6B00]">Users.</span>
                </h1>

                <p className="mt-5 text-gray-500 text-sm font-medium">
                    Total Users: {users.length}
                </p>
            </div>

            {/* Current User Card */}
            {currentUser && (
                <div className="mb-8 rounded-2xl bg-gradient-to-r from-amber-50/70 to-orange-50/40 border border-amber-200/60 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">User yang sedang login:</p>
                            <h2 className="font-bold text-slate-900 text-lg leading-tight mt-0.5">{currentUser.name}</h2>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">{currentUser.email}</p>
                        </div>
                    </div>
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                            Role: {currentUser.role}
                        </span>
                    </div>
                </div>
            )}

            {/* Alert Notifications */}
            {success && (
                <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 shadow-sm flex items-center gap-3 transition-all">
                    <span className="text-xl">✨</span>
                    <p className="text-sm font-medium">{success}</p>
                </div>
            )}

            {error && (
                <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 px-5 py-4 shadow-sm flex items-center gap-3 transition-all">
                    <span className="text-xl">⚠️</span>
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Form Container Card */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50">
                    <h2 className="font-extrabold text-xl text-slate-900 mb-5 tracking-tight flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${editId ? "bg-blue-500 animate-pulse" : "bg-[#F8B602]"}`} />
                        {editId ? "Edit User" : "Tambah User"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Nama user"
                                required
                                disabled={loading}
                                className="w-full p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 disabled:opacity-60 text-sm font-medium"
                            />
                        </div>

                        <div className="space-y-1">
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                                disabled={loading}
                                className="w-full p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 disabled:opacity-60 text-sm font-medium"
                            />
                        </div>

                        <div className="space-y-1">
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                                disabled={loading}
                                className="w-full p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 disabled:opacity-60 text-sm font-medium"
                            />
                        </div>

                        <div className="space-y-1 relative">
                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200 outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 disabled:opacity-60 text-sm font-semibold text-slate-700 appearance-none cursor-pointer"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-white shadow-md active:scale-[0.99] transition-all duration-200 text-sm mt-2 flex items-center justify-center ${loading
                                    ? "bg-slate-400 cursor-not-allowed shadow-none"
                                    : editId
                                        ? "bg-blue-600 hover:bg-blue-700 shadow-blue-600/10"
                                        : "bg-[#F8B602] hover:bg-amber-500 shadow-amber-500/20"
                                }`}
                        >
                            {loading ? "Mohon Tunggu..." : editId ? "Update User" : "Tambah User"}
                        </button>

                        {editId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-[0.99]"
                            >
                                Batal Edit
                            </button>
                        )}
                    </form>
                </div>

                {/* Table Data Card */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-extrabold text-xl text-slate-900 tracking-tight">
                            Daftar User
                        </h2>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                            {users.length} Total
                        </span>
                    </div>

                    {loading && (
                        <div className="py-12 flex justify-center">
                            <LoadingState />
                        </div>
                    )}

                    {!loading && users.length === 0 && (
                        <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                            <span className="text-3xl block mb-2">📁</span>
                            <p className="text-sm font-medium text-slate-400">Belum ada data user</p>
                        </div>
                    )}

                    {!loading && users.length > 0 && (
                        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 font-bold text-xs uppercase border-b border-slate-100">
                                        <th className="p-4 w-12 text-center">No</th>
                                        <th className="p-4">Nama</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4 text-center">Role</th>
                                        <th className="p-4 text-center">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {users.map((user, index) => (
                                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors duration-150 group">
                                            <td className="p-4 text-center font-bold text-slate-300 group-hover:text-slate-400 transition-colors">{index + 1}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-xl bg-slate-100 text-slate-600 font-black text-xs flex items-center justify-center group-hover:bg-amber-100 group-hover:text-amber-800 transition-all duration-200">
                                                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                                    </div>
                                                    <span className="font-bold text-slate-800 tracking-tight">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-500 font-medium text-xs font-mono">{user.email}</td>
                                            <td className="p-4 text-center">
                                                <span className={`inline-flex px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide border ${user.role === 'admin'
                                                        ? 'bg-rose-50 text-rose-700 border-rose-100'
                                                        : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 font-bold text-xs transition-colors border border-slate-200/60 hover:border-blue-100"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold text-xs transition-colors border border-slate-200/60 hover:border-rose-100"
                                                    >
                                                        Hapus
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
            </div>
        </div>
    );
}