import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Mail, LockKeyhole, ArrowRight } from "lucide-react";
import { usersAPI } from "../../services/usersAPI";

export default function Login() {
  const navigate = useNavigate();
  const { AuthIllustration } = useOutletContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const users = await usersAPI.loginUser(
        dataForm.email,
        dataForm.password
      );

      if (!users || users.length === 0) {
        setError("Email atau password salah. Periksa kembali detail Anda.");
        setLoading(false);
        return;
      }

      const user = users[0];
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "member") {
        navigate("/member");
      } else {
        setError("Peran akun Anda tidak sah.");
      }
    } catch (err) {
      setError("Gagal melakukan login. Masalah koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-[960px] bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 font-['Poppins'] min-h-[480px]">
      <AuthIllustration />

      <div className="flex w-full items-center justify-center md:w-1/2 p-8 sm:p-12">
        <div className="w-full max-w-[340px] space-y-6">
          
          {/* Title */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-[#ff7a1a] text-[10px] font-black uppercase tracking-wider rounded-full mb-3">
              ✦ WELCOME BACK
            </span>
            <h1 className="text-3xl font-black text-[#1F2937] tracking-tight">
              Sign <span className="text-[#ff7a1a] italic">In.</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Masuk untuk mengelola catering & melacak pesanan Anda.</p>
          </div>

          {error && (
            <div className="rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-xs font-semibold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email */}
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email" name="email" placeholder="Alamat Email"
                value={dataForm.email} onChange={handleChange} disabled={loading} required
                className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-xs outline-none focus:border-[#ff7a1a] focus:ring-4 focus:ring-orange-50 transition bg-white"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <LockKeyhole size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password" name="password" placeholder="Password"
                value={dataForm.password} onChange={handleChange} disabled={loading} required
                className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-xs outline-none focus:border-[#ff7a1a] focus:ring-4 focus:ring-orange-50 transition bg-white"
              />
            </div>

            {/* Forgot Link */}
            <div className="text-right">
              <Link to="/forgot" className="text-xs font-bold text-[#ff7a1a] hover:underline">
                Lupa Kata Sandi?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit" disabled={loading}
              className="w-full h-12 rounded-2xl bg-[#ff7a1a] hover:bg-[#e86a0a] text-white text-xs font-black uppercase tracking-wider transition shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-xs text-slate-400">
            Belum punya akun?{" "}
            <Link to="/register" className="font-bold text-[#ff7a1a] hover:underline flex items-center justify-center gap-1 mt-1">
              Daftar member disini <ArrowRight size={12} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}