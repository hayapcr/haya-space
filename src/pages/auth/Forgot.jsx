import { useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

export default function Forgot() {
  const { AuthIllustration } = useOutletContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    setTimeout(() => {
      setSuccess("Tautan pemulihan sandi telah dikirim ke email Anda.");
      setLoading(false);
      setTimeout(() => {
        navigate("/password-changed");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex w-full max-w-[960px] bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 font-['Poppins'] min-h-[480px]">
      <AuthIllustration />

      <div className="flex w-full items-center justify-center md:w-1/2 p-8 sm:p-12">
        <div className="w-full max-w-[340px] space-y-6">
          
          {/* Back button */}
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#ff7a1a] transition"
          >
            <ArrowLeft size={12} /> Kembali ke Login
          </Link>

          {/* Title */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-[#ff7a1a] text-[10px] font-black uppercase tracking-wider rounded-full mb-3">
              ✦ SECURITY
            </span>
            <h1 className="text-3xl font-black text-[#1F2937] tracking-tight">
              Reset <span className="text-[#ff7a1a] italic">Password.</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Masukkan alamat email Anda untuk menerima tautan verifikasi.</p>
          </div>

          {success && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-xs font-semibold flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-500 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Address */}
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="Alamat Email Terdaftar"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading || !!success}
                className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-xs outline-none focus:border-[#ff7a1a] focus:ring-4 focus:ring-orange-50 transition bg-white"
              />
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={loading || !!success || !email}
              className="w-full h-12 rounded-2xl bg-[#ff7a1a] hover:bg-[#e86a0a] text-white text-xs font-black uppercase tracking-wider transition shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? "Mengirim..." : <><span className="normal-case">Kirim Tautan</span> <ArrowRight size={14} /></>}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}