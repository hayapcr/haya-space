import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../services/db";
import {
  FaUsers,
  FaCrown,
  FaHeart,
  FaArrowRight,
  FaStar,
  FaBullhorn,
  FaChartPie
} from "react-icons/fa";
import Container from "../components/Container";

export default function CRM() {
  const [customers, setCustomers] = useState([]);
  const [points, setPoints] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const custs = await dbService.getCustomers();
        const pts = await dbService.getAllCustomerPoints();
        const ords = await dbService.getOrders();
        const fbs = await dbService.getFeedback();
        setCustomers(custs);
        setPoints(pts);
        setOrders(ords);
        setFeedbacks(fbs);
      } catch (err) {
        console.error("Gagal memuat data CRM", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getPointsForCustomer = (id) => {
    return points.find((p) => p.customer_id === id)?.points || 0;
  };

  const getTierForCustomer = (membershipId) => {
    if (membershipId === "MBR-PLT") return "Platinum";
    if (membershipId === "MBR-GLD") return "Gold";
    return "Silver";
  };

  const getTierColor = (membershipId) => {
    if (membershipId === "MBR-PLT") return "bg-purple-100 text-purple-700 border border-purple-200";
    if (membershipId === "MBR-GLD") return "bg-amber-100 text-amber-700 border border-amber-300";
    return "bg-slate-100 text-slate-600 border border-slate-200";
  };

  // Calculations
  const totalCustomers = customers.length;
  const vipCount = customers.filter(c => c.membership_id === "MBR-PLT" || c.membership_id === "MBR-GLD").length;
  
  const averageRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, item) => sum + item.rating, 0) / feedbacks.length).toFixed(1)
    : "5.0";

  // Calculate top spending customers
  const customersWithTotals = customers.map((c) => {
    const custOrders = orders.filter((o) => o.customer_id === c.id && o.status !== "Dibatalkan");
    const totalSpent = custOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    return {
      ...c,
      totalSpent,
      orderCount: custOrders.length,
      points: getPointsForCustomer(c.id)
    };
  }).sort((a, b) => b.totalSpent - a.totalSpent);

  const topCustomers = customersWithTotals.slice(0, 5);

  const repeatOrderRate = totalCustomers > 0
    ? ((customersWithTotals.filter(c => c.orderCount > 1).length / totalCustomers) * 100).toFixed(0)
    : "0";

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
              CRM CENTER
            </span>
            <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full"></div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">
              LOYALTY & RETENTION
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] tracking-tight">
            Customer <span className="text-[#FFB400] italic">Relationship.</span>
          </h1>
          <p className="mt-3 text-slate-500 text-sm max-w-xl">
            Pusat monitoring data pelanggan, pembagian tier membership, loyalitas poin, dan rasio pembelian ulang.
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#ECECEC] flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-amber-50 text-[#FFB400] flex items-center justify-center text-2xl shadow-sm">
              <FaUsers />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Total Customer</p>
              <h3 className="text-3xl font-black text-[#1F2937] mt-1">{totalCustomers}</h3>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#ECECEC] flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center text-2xl shadow-sm">
              <FaCrown />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Loyal VIP & Gold</p>
              <h3 className="text-3xl font-black text-[#1F2937] mt-1">{vipCount}</h3>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#ECECEC] flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-2xl shadow-sm">
              <FaHeart />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Repeat Order Rate</p>
              <h3 className="text-3xl font-black text-[#1F2937] mt-1">{repeatOrderRate}%</h3>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#ECECEC] flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center text-2xl shadow-sm">
              <FaStar className="text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Average Rating</p>
              <h3 className="text-3xl font-black text-[#1F2937] mt-1">{averageRating} / 5.0</h3>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
          
          {/* TOP CUSTOMERS */}
          <div className="bg-white rounded-[20px] border border-[#ECECEC] shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#1F2937]">Pelanggan Paling Loyal</h2>
                <p className="text-xs text-[#9CA3AF] mt-1">Daftar customer dengan total transaksi terbanyak</p>
              </div>
              <Link to="/users" className="text-xs font-bold text-[#FFB400] flex items-center gap-2 hover:underline">
                Kelola Semua <FaArrowRight />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#ECECEC] text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">
                    <th className="pb-3">Customer</th>
                    <th className="pb-3 text-center">Membership</th>
                    <th className="pb-3 text-center">Poin</th>
                    <th className="pb-3 text-center">Total Order</th>
                    <th className="pb-3 text-right">Total Transaksi</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECEC]">
                  {topCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-[#1F2937]">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1F2937] text-sm">{c.name}</h4>
                            <p className="text-xs text-[#9CA3AF]">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTierColor(c.membership_id)}`}>
                          {getTierForCustomer(c.membership_id)}
                        </span>
                      </td>
                      <td className="py-4 text-center font-mono font-bold text-sm text-[#1F2937]">{c.points} pts</td>
                      <td className="py-4 text-center font-bold text-sm text-[#1F2937]">{c.orderCount}x</td>
                      <td className="py-4 text-right font-bold text-sm text-[#FFB400]">
                        Rp {Number(c.totalSpent).toLocaleString("id-ID")}
                      </td>
                      <td className="py-4 text-center pl-2">
                        <Link to={`/customers/${c.id}`} className="p-2 text-slate-400 hover:text-[#FFB400] transition">
                          <FaArrowRight />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SIDEBAR CAMPAIGNS */}
          <div className="space-y-6">
            <div className="bg-gradient-to-tr from-[#1F2937] to-[#374151] rounded-[20px] p-6 text-white relative overflow-hidden shadow-md">
              <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-[#FFB400]/10 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-3 text-[#FFB400] mb-4">
                <FaBullhorn className="text-xl" />
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#FFB400]/10 px-3 py-1 rounded-full">CRM Promo</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Kirim Promosi</h3>
              <p className="text-xs text-[#D1D5DB] leading-relaxed mb-6">
                Ingin meningkatkan repeat order rate? Kirim promo personal atau voucher belanja ke segmen loyalitas tertentu.
              </p>
              <Link to="/campaign-promo" className="w-full py-3 bg-[#FFB400] hover:bg-[#E0A000] text-white rounded-xl text-xs font-bold text-center block transition">
                Mulai Campaign Baru
              </Link>
            </div>

            <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FaChartPie className="text-[#FFB400] text-xl" />
                <h3 className="text-sm font-bold text-[#1F2937]">Demografi Membership</h3>
              </div>
              
              <div className="space-y-3">
                {["Platinum", "Gold", "Silver"].map((tier) => {
                  const count = customers.filter(
                    (c) => getTierForCustomer(c.membership_id) === tier
                  ).length;
                  const pct = totalCustomers > 0 ? ((count / totalCustomers) * 100).toFixed(0) : 0;
                  
                  let barColor = "bg-purple-500";
                  if (tier === "Gold") barColor = "bg-[#FFB400]";
                  if (tier === "Silver") barColor = "bg-slate-400";

                  return (
                    <div key={tier} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#1F2937]">{tier}</span>
                        <span className="text-[#9CA3AF]">{count} Member ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className={`${barColor} h-full`} style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </Container>
  );
}
