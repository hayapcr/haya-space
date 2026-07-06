import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../services/db";
import { FaStar, FaCommentDots, FaReply, FaCheck } from "react-icons/fa";
import Container from "../components/Container";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    setError("");
    try {
      const fbs = await dbService.getFeedback();
      const custs = await dbService.getCustomers();
      setFeedbacks(fbs.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)));
      setCustomers(custs);
    } catch (e) {
      setError(e.message || "Gagal memuat feedback dari Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getCustomerName = (customerId) => {
    return customers.find((c) => c.id === customerId)?.name || "Anonim";
  };

  const handleSaveReply = async (id) => {
    if (!replyText[id]?.trim()) return;
    setError("");
    try {
      await dbService.replyFeedback(id, replyText[id]);
      setSuccess("✅ Balasan berhasil disimpan ke Supabase!");
      setActiveReplyId(null);
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menyimpan balasan.");
      setTimeout(() => setError(""), 6000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus feedback ini?")) return;
    setError("");
    try {
      await dbService.deleteFeedback(id);
      setSuccess("✅ Feedback berhasil dihapus dari Supabase!");
      loadData();
      setTimeout(() => setSuccess(""), 4000);
    } catch (e) {
      setError(e.message || "Gagal menghapus feedback.");
      setTimeout(() => setError(""), 6000);
    }
  };

  const handleTextChange = (id, val) => {
    setReplyText({ ...replyText, [id]: val });
  };

  // Stats
  const totalReviews = feedbacks.length;
  const averageRating = totalReviews > 0
    ? (feedbacks.reduce((sum, item) => sum + item.rating, 0) / totalReviews).toFixed(1)
    : "0.0";
  const positiveCount = feedbacks.filter((f) => f.rating >= 4).length;
  const positivePct = totalReviews > 0 ? ((positiveCount / totalReviews) * 100).toFixed(0) : "100";

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
        <div className="border-b border-[#ECECEC] pb-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-5 py-2 bg-[#1F2937] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
              CUSTOMER REVIEWS
            </span>
            <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full"></div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">
              FEEDBACK HUB
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] tracking-tight">
            Customer <span className="text-[#FFB400] italic">Feedback.</span>
          </h1>
          <p className="mt-3 text-slate-500 text-sm max-w-xl">
            Tinjau kepuasan pelanggan, ulasan hidangan, dan berikan respon resmi layanan catering.
          </p>
        </div>

        {/* NOTIFICATION */}
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

        {/* FEEDBACK KPI STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm">
            <h4 className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Total Ulasan</h4>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-[#1F2937]">{totalReviews}</span>
              <span className="text-xs text-[#9CA3AF]">ulasan masuk</span>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm">
            <h4 className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Rating Rata-Rata</h4>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-3xl font-black text-[#1F2937]">{averageRating}</span>
              <div className="flex text-yellow-400 text-lg">
                {Array.from({ length: Math.round(Number(averageRating)) }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm">
            <h4 className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Tingkat Kepuasan</h4>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-[#1F2937]">{positivePct}%</span>
              <span className="text-xs text-[#9CA3AF]">rating bintang 4 & 5</span>
            </div>
          </div>
        </div>

        {/* FEEDBACK LIST */}
        <div className="space-y-6">
          {feedbacks.length === 0 ? (
            <div className="bg-white rounded-[20px] p-16 text-center border border-[#ECECEC] text-[#9CA3AF]">
              <div className="h-16 w-16 bg-slate-50 text-slate-400 flex items-center justify-center rounded-full mx-auto mb-4 text-2xl">
                <FaCommentDots />
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] mb-1">Belum Ada Feedback</h3>
              <p className="text-xs">Semua feedback dari customer akan ditampilkan di sini.</p>
            </div>
          ) : (
            feedbacks.map((fb) => (
              <div key={fb.id} className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  
                  {/* Customer Info */}
                  <div>
                    <div className="flex items-center gap-3">
                      <Link to={`/customers/${fb.customer_id}`} className="font-extrabold text-[#1F2937] text-base hover:text-[#FFB400] transition">
                        {getCustomerName(fb.customer_id)}
                      </Link>
                      <span className="text-xs text-[#9CA3AF] font-mono">{fb.customer_id}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex text-yellow-400 text-sm">
                        {Array.from({ length: fb.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                        {Array.from({ length: 5 - fb.rating }).map((_, i) => (
                          <span key={i} className="text-slate-200">★</span>
                        ))}
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-[10px] text-[#9CA3AF] font-bold">
                        {fb.created_at ? new Date(fb.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        }) : "Baru"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setActiveReplyId(activeReplyId === fb.id ? null : fb.id);
                        if (!replyText[fb.id]) {
                          handleTextChange(fb.id, fb.reply || "");
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-[#FFB400] hover:text-[#FFB400] bg-white text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <FaReply /> {fb.reply ? "Edit Balasan" : "Balas"}
                    </button>
                    <button
                      onClick={() => handleDelete(fb.id)}
                      className="px-3.5 py-1.5 rounded-xl border border-red-100 bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition"
                    >
                      Hapus
                    </button>
                  </div>
                </div>

                {/* Comment Content */}
                <p className="text-slate-700 text-sm leading-relaxed bg-slate-50/50 p-4 rounded-xl italic">
                  "{fb.comment}"
                </p>

                {/* Existing Reply */}
                {fb.reply && activeReplyId !== fb.id && (
                  <div className="mt-4 p-4 rounded-xl border-l-4 border-[#FFB400] bg-[#FFF8E1]/30 text-xs">
                    <strong className="text-[#1F2937] flex items-center gap-1.5 mb-1 text-xs">
                      <FaCheck className="text-green-500" /> Balasan Resmi Admin:
                    </strong>
                    <p className="text-slate-600 font-medium">"{fb.reply}"</p>
                  </div>
                )}

                {/* Reply Editor Form */}
                {activeReplyId === fb.id && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-2">
                      Tulis Balasan Admin:
                    </label>
                    <textarea
                      value={replyText[fb.id] || ""}
                      onChange={(e) => handleTextChange(fb.id, e.target.value)}
                      placeholder="Ketik balasan Anda disini..."
                      rows="3"
                      className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-[#FFB400] focus:ring-4 focus:ring-amber-50 bg-white"
                    ></textarea>
                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        onClick={() => setActiveReplyId(null)}
                        className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => handleSaveReply(fb.id)}
                        className="px-4 py-2 bg-[#FFB400] text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/10 hover:bg-[#E0A000] transition"
                      >
                        Kirim Balasan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </Container>
  );
}
