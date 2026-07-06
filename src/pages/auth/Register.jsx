import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Mail, LockKeyhole, User, Award, ArrowRight } from "lucide-react";
import { usersAPI } from "../../services/usersAPI";

export default function Register() {
  const navigate = useNavigate();
  const { AuthIllustration } = useOutletContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "member",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (form.password !== form.confirmPassword) {
        setError("Password dan konfirmasi password tidak cocok.");
        setLoading(false);
        return;
      }

      await usersAPI.createUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.details ||
        err.message ||
        "Gagal melakukan pendaftaran."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-[960px] bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 font-['Poppins'] min-h-[560px]">
      <AuthIllustration />

      <div className="flex w-full items-center justify-center md:w-1/2 p-8 sm:p-12">
        <div className="w-full max-w-[340px] space-y-6">
          
          {/* Title */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-[#ff7a1a] text-[10px] font-black uppercase tracking-wider rounded-full mb-3">
              ✦ JOIN US
            </span>
            <h1 className="text-3xl font-black text-[#1F2937] tracking-tight">
              Create <span className="text-[#ff7a1a] italic">Account.</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Daftar sekarang untuk nikmati layanan catering terbaik.</p>
          </div>

          {error && (
            <div className="rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-xs font-semibold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div className="relative">
              <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text" name="name" placeholder="Nama Lengkap"
                value={form.name} onChange={handleChange} disabled={loading} required
                className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-xs outline-none focus:border-[#ff7a1a] focus:ring-4 focus:ring-orange-50 transition"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email" name="email" placeholder="Alamat Email"
                value={form.email} onChange={handleChange} disabled={loading} required
                className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-xs outline-none focus:border-[#ff7a1a] focus:ring-4 focus:ring-orange-50 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <LockKeyhole size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password" name="password" placeholder="Password"
                value={form.password} onChange={handleChange} disabled={loading} required
                className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-xs outline-none focus:border-[#ff7a1a] focus:ring-4 focus:ring-orange-50 transition"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <LockKeyhole size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password" name="confirmPassword" placeholder="Konfirmasi Password"
                value={form.confirmPassword} onChange={handleChange} disabled={loading} required
                className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-xs outline-none focus:border-[#ff7a1a] focus:ring-4 focus:ring-orange-50 transition"
              />
            </div>

            {/* Role selection */}
            <div className="relative">
              <Award size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                name="role" value={form.role} onChange={handleChange} disabled={loading}
                className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-xs outline-none focus:border-[#ff7a1a] transition bg-white cursor-pointer"
              >
                <option value="member">Daftar sebagai Member</option>
                <option value="admin">Daftar sebagai Admin / Staff</option>
              </select>
            </div>

            {/* Terms info */}
            <p className="text-[10px] leading-relaxed text-slate-400">
              Dengan mendaftar, Anda menyetujui <span className="font-bold text-[#ff7a1a] cursor-pointer hover:underline">Ketentuan Penggunaan</span> & <span className="font-bold text-[#ff7a1a] cursor-pointer hover:underline">Kebijakan Privasi</span> CaterBox.
            </p>

            {/* Submit Button */}
            <button
              type="submit" disabled={loading}
              className="w-full h-12 rounded-2xl bg-[#ff7a1a] hover:bg-[#e86a0a] text-white text-xs font-black uppercase tracking-wider transition shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? "Memproses..." : <><Award size={14} /> Daftar Sekarang</>}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-xs text-slate-400">
            Sudah punya akun?{" "}
            <Link to="/login" className="font-bold text-[#ff7a1a] hover:underline flex items-center justify-center gap-1 mt-1">
              Login disini <ArrowRight size={12} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}