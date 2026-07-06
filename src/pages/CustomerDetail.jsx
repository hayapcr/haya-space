import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { dbService } from "../services/db";
import {
  FaChevronLeft,
  FaCrown,
  FaEnvelope,
  FaPhone,
  FaHistory,
  FaComment,
  FaTag
} from "react-icons/fa";
import Container from "../components/Container";

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [points, setPoints] = useState(0);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomerData() {
      try {
        const cust = await dbService.getCustomerById(id);
        if (!cust) {
          console.error("Customer tidak ditemukan");
          return;
        }
        setCustomer(cust);

        const pts = await dbService.getCustomerPoints(id);
        setPoints(pts);

        const allOrders = await dbService.getOrders();
        const custOrders = allOrders.filter((o) => o.customer_id === id);
        setOrders(custOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date)));

        const allFbs = await dbService.getFeedback();
        const custFbs = allFbs.filter((f) => f.customer_id === id);
        setFeedbacks(custFbs);
      } catch (err) {
        console.error("Gagal memuat detail customer", err);
      } finally {
        setLoading(false);
      }
    }
    loadCustomerData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-['Poppins']">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFB400] border-t-transparent" />
      </div>
    );
  }

  if (!customer) {
    return (
      <Container>
        <div className="p-8 text-center text-red-500 font-['Poppins']">
          <p className="text-xl font-bold">Customer Tidak Ditemukan</p>
          <button onClick={() => navigate(-1)} className="mt-4 px-5 py-2 bg-slate-800 text-white rounded-xl">
            Kembali
          </button>
        </div>
      </Container>
    );
  }

  const getTierName = (membershipId) => {
    if (membershipId === "MBR-PLT") return "Platinum";
    if (membershipId === "MBR-GLD") return "Gold";
    return "Silver";
  };

  const getTierDiscount = (membershipId) => {
    if (membershipId === "MBR-PLT") return "10%";
    if (membershipId === "MBR-GLD") return "5%";
    return "0%";
  };

  const getTierColor = (membershipId) => {
    if (membershipId === "MBR-PLT") return "from-purple-500 to-indigo-600 text-white shadow-purple-500/20";
    if (membershipId === "MBR-GLD") return "from-amber-400 to-amber-500 text-white shadow-amber-500/20";
    return "from-slate-400 to-slate-500 text-white shadow-slate-500/20";
  };

  const totalSpent = orders
    .filter((o) => o.status !== "Dibatalkan")
    .reduce((sum, o) => sum + Number(o.total || 0), 0);

  // Next tier progress
  let nextTierPoints = 200;
  let nextTierName = "Gold";
  let progressPct = Math.min(100, (points / 200) * 100);

  if (customer.membership_id === "MBR-GLD") {
    nextTierPoints = 500;
    nextTierName = "Platinum";
    progressPct = Math.min(100, ((points - 200) / (500 - 200)) * 100);
  } else if (customer.membership_id === "MBR-PLT") {
    nextTierPoints = points;
    nextTierName = "Max Tier";
    progressPct = 100;
  }

  return (
    <Container>
      <div className="w-full min-h-screen bg-[#F8F9FB] p-4 md:p-6 lg:p-8 font-['Poppins'] text-[#4B5563]">
        
        {/* BACK ACTION */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-xs font-bold text-[#1F2937] hover:text-[#FFB400] transition"
        >
          <FaChevronLeft /> Kembali ke CRM Center
        </button>

        {/* CUSTOMER TOP CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start mb-8">
          
          {/* PROFILE SUMMARY */}
          <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center font-black text-4xl text-[#1F2937] border-4 border-[#ECECEC] mb-4">
              {customer.name.charAt(0)}
            </div>
            
            <h2 className="text-2xl font-bold text-[#1F2937] leading-tight">{customer.name}</h2>
            <span className="text-xs text-[#9CA3AF] mt-1 font-semibold uppercase tracking-wider">{customer.id}</span>
            
            <div className={`mt-5 w-full bg-gradient-to-tr ${getTierColor(customer.membership_id)} rounded-2xl p-4 shadow-lg text-center`}>
              <div className="flex justify-center text-2xl mb-1">
                <FaCrown />
              </div>
              <h3 className="font-black text-lg">{getTierName(customer.membership_id)} Member</h3>
              <p className="text-xs opacity-90 mt-0.5">Diskon loyalty: {getTierDiscount(customer.membership_id)}</p>
            </div>

            <div className="w-full mt-6 space-y-4 text-left text-sm border-t border-[#ECECEC] pt-6">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-slate-400" />
                <span className="truncate">{customer.email || "Tidak ada email"}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-slate-400" />
                <span>{customer.phone || "Tidak ada telepon"}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaTag className="text-slate-400" />
                <span>Total Belanja: <strong className="text-[#FFB400]">Rp {totalSpent.toLocaleString("id-ID")}</strong></span>
              </div>
            </div>
          </div>

          {/* MEMBERSHIP PROGRESS & HISTORY */}
          <div className="space-y-8">
            
            {/* LOYALTY CARD */}
            <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#1F2937] mb-4">Loyalty Reward Points</h3>
              <div className="flex items-end justify-between mb-2">
                <div>
                  <span className="text-4xl font-black text-[#1F2937]">{points}</span>
                  <span className="text-xs text-[#9CA3AF] ml-1 font-bold">Points</span>
                </div>
                {customer.membership_id !== "MBR-PLT" && (
                  <span className="text-xs text-[#9CA3AF] font-bold">
                    {nextTierPoints - points} pts lagi ke {nextTierName}
                  </span>
                )}
              </div>

              {customer.membership_id !== "MBR-PLT" ? (
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
                  <div className="bg-[#FFB400] h-full" style={{ width: `${progressPct}%` }}></div>
                </div>
              ) : (
                <div className="w-full bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-xl p-3 text-xs font-semibold mb-3">
                  🎉 Selamat! Anda telah mencapai level tertinggi (Platinum). Nikmati diskon flat 10% untuk setiap order.
                </div>
              )}
              <p className="text-xs text-[#9CA3AF]">
                Poin otomatis bertambah 1 point untuk setiap kelipatan Rp 10.000 transaksi catering yang selesai.
              </p>
            </div>

            {/* TRANSACTION HISTORY */}
            <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <FaHistory className="text-[#FFB400] text-xl" />
                <h3 className="text-lg font-bold text-[#1F2937]">Riwayat Pesanan</h3>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-10 text-[#9CA3AF]">
                  Belum ada riwayat pesanan untuk customer ini.
                </div>
              ) : (
                <div className="divide-y divide-[#ECECEC] max-h-96 overflow-y-auto pr-2">
                  {orders.map((order) => (
                    <div key={order.id} className="py-4 flex justify-between items-center hover:bg-slate-50/50 px-2 rounded-xl transition">
                      <div>
                        <div className="flex items-center gap-2">
                          <Link to={`/orders/${order.id}`} className="font-bold text-[#1F2937] hover:text-[#FFB400] transition">
                            #{order.id}
                          </Link>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            order.status === "Selesai" ? "bg-green-100 text-green-700" :
                            order.status === "Diproses" ? "bg-blue-100 text-blue-700" :
                            order.status === "Dibatalkan" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#9CA3AF] mt-1">{new Date(order.order_date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}</p>
                      </div>
                      <span className="font-bold text-sm text-[#1F2937]">
                        Rp {Number(order.total || 0).toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FEEDBACK CORNER */}
            <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <FaComment className="text-[#FFB400] text-xl" />
                <h3 className="text-lg font-bold text-[#1F2937]">Feedback & Ulasan</h3>
              </div>

              {feedbacks.length === 0 ? (
                <div className="text-center py-6 text-[#9CA3AF] text-sm">
                  Belum menulis feedback apapun.
                </div>
              ) : (
                <div className="space-y-4">
                  {feedbacks.map((fb) => (
                    <div key={fb.id} className="p-4 bg-slate-50 rounded-2xl border border-[#ECECEC]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex gap-1 text-yellow-400 text-sm">
                          {Array.from({ length: fb.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                          {Array.from({ length: 5 - fb.rating }).map((_, i) => (
                            <span key={i} className="text-slate-200">★</span>
                          ))}
                        </div>
                        <span className="text-[10px] text-[#9CA3AF] font-bold">{fb.id}</span>
                      </div>
                      <p className="text-sm text-slate-700 italic">"{fb.comment}"</p>
                      {fb.reply && (
                        <div className="mt-3 pl-3 border-l-2 border-[#FFB400] text-xs">
                          <strong className="text-[#1F2937]">Balasan Admin: </strong>
                          <span className="text-slate-500">"{fb.reply}"</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </Container>
  );
}
