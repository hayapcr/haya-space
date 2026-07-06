import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../services/db";
import Container from "../components/Container";
import {
  FaUsers, FaClipboardList, FaFileInvoiceDollar, FaCrown,
  FaBullhorn, FaArrowUp, FaChevronRight, FaRegClock, FaCalendarAlt,
  FaExclamationTriangle, FaStar, FaWarehouse, FaTag, FaComments
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    customersCount: 0,
    ordersCount: 0,
    revenue: 0,
    membershipsCount: 0,
    promoCount: 0,
    productsCount: 0,
    suppliersCount: 0,
    lowStockCount: 0,
    avgFeedbackRating: 0,
    pendingFeedbackReplies: 0
  });

  const [weeklySales, setWeeklySales] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [activePromosList, setActivePromosList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [custs, ords, proms, prods, invs, sups, fdbs] = await Promise.all([
          dbService.getCustomers(),
          dbService.getOrders(),
          dbService.getPromotions(),
          dbService.getProducts(),
          dbService.getInventory(),
          dbService.getSuppliers(),
          dbService.getFeedback()
        ]);

        const completed = (ords || []).filter((o) => {
          const parsed = dbService.parseStatus(o.status);
          return parsed.status !== "Dibatalkan";
        });
        const totalRevenue = completed.reduce((sum, o) => sum + Number(o.total || 0), 0);

        const activeMembers = (custs || []).filter(
          (c) => c.membership_id === "MBR-PLT" || c.membership_id === "MBR-GLD"
        ).length;

        const todayStr = new Date().toISOString().split("T")[0];
        const activePromos = (proms || []).filter(
          (p) => (!p.start_date || p.start_date <= todayStr) && (!p.end_date || p.end_date >= todayStr)
        );

        const lowStock = (invs || []).filter(item => Number(item.stock) < 100);

        const validFdbs = (fdbs || []).filter(f => f.rating);
        const avgRating = validFdbs.length
          ? (validFdbs.reduce((sum, f) => sum + f.rating, 0) / validFdbs.length).toFixed(1)
          : 0;
        const pendingReplies = (fdbs || []).filter(f => !f.reply || f.reply.trim() === "").length;

        setStats({
          customersCount: custs?.length || 0,
          ordersCount: ords?.length || 0,
          revenue: totalRevenue,
          membershipsCount: activeMembers,
          promoCount: activePromos.length,
          productsCount: prods?.length || 0,
          suppliersCount: sups?.length || 0,
          lowStockCount: lowStock.length,
          avgFeedbackRating: avgRating,
          pendingFeedbackReplies: pendingReplies
        });

        // Weekly sales
        const salesByDay = [0, 0, 0, 0, 0, 0, 0];
        completed.forEach((o) => {
          const dayIndex = new Date(o.order_date).getDay();
          salesByDay[dayIndex] += Number(o.total || 0);
        });
        setWeeklySales(salesByDay);

        // Low stock items mapped with supplier names (vertical list)
        const mappedLowStock = lowStock.map(item => {
          const sup = (sups || []).find(s => s.id === item.supplier_id);
          return {
            ...item,
            supplierName: sup ? sup.name : "Tanpa Supplier"
          };
        }).slice(0, 4);
        setLowStockItems(mappedLowStock);

        // Feedbacks mapped with customer names
        const mappedFeedbacks = (fdbs || [])
          .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
          .slice(0, 4)
          .map(f => {
            const cust = (custs || []).find(c => c.id === f.customer_id);
            return {
              ...f,
              customerName: cust ? cust.name : "Pelanggan"
            };
          });
        setRecentFeedbacks(mappedFeedbacks);

        // Active promotions list
        setActivePromosList(activePromos.slice(0, 4));

        // Sorted recent orders
        const sortedOrders = (ords || [])
          .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
          .slice(0, 4);

        const ordersWithDetails = [];
        const details = await dbService.getOrderDetails();

        for (const order of sortedOrders) {
          const customer = (custs || []).find((c) => c.id === order.customer_id);
          const oDetails = (details || []).filter((d) => d.order_id === order.id);
          const itemsSummary = oDetails
            .map((d) => {
              const p = (prods || []).find((pr) => pr.id === d.product_id);
              return p ? `${p.name} (x${d.qty})` : "Menu";
            })
            .join(", ");

          const parsed = dbService.parseStatus(order.status);

          ordersWithDetails.push({
            id: order.id,
            name: customer?.name || "Pelanggan",
            menu: itemsSummary || "Catering Box Set",
            status: parsed.status,
            total: Number(order.total || 0),
            date: order.order_date ? new Date(order.order_date).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) : ""
          });
        }
        setRecentOrders(ordersWithDetails);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-['Poppins']">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFB400] border-t-transparent" />
      </div>
    );
  }

  const daysLabel = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const maxWeeklySale = Math.max(...weeklySales, 100000);

  return (
    <Container>
      <div className="w-full min-h-screen bg-[#F8F9FB] p-4 md:p-6 lg:p-8 font-['Poppins'] text-[#4B5563] relative overflow-hidden space-y-10">
        
        {/* Glow Backgrounds */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#FFB400]/8 rounded-full blur-[140px] -z-10 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-400/6 rounded-full blur-[120px] -z-10" />

        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#ECECEC] pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-5 py-2 bg-[#1F2937] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                ADMIN SYSTEM
              </span>
              <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full animate-ping" />
              <span className="text-[#9CA3AF] text-[11px] font-bold tracking-widest uppercase">
                ENTERPRISE PORTAL
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#1F2937] leading-[0.9]">
              CaterBox <span className="text-[#FFB400] italic font-semibold font-['Poppins']">Dashboard.</span>
            </h1>
            <p className="text-xs text-slate-400">Monitoring real-time dari data catering, inventaris gudang, program promo, dan loyalitas member.</p>
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="px-6 py-4 bg-[#FFB400] text-white rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-[#E0A000] transition shadow-md shadow-amber-500/10 hover:scale-[1.02] active:scale-95"
          >
            + Buat Pesanan Baru
          </button>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {[
            { label: "Pendapatan Bersih", value: `Rp ${stats.revenue.toLocaleString("id-ID")}`, icon: <FaFileInvoiceDollar />, bg: "bg-emerald-50 text-emerald-500" },
            { label: "Pesanan Masuk", value: stats.ordersCount, icon: <FaClipboardList />, bg: "bg-blue-50 text-blue-600" },
            { label: "Total Customer", value: stats.customersCount, icon: <FaUsers />, bg: "bg-amber-50 text-[#FFB400]" },
            { label: "Katalog Hidangan", value: stats.productsCount, icon: <FaWarehouse />, bg: "bg-violet-50 text-violet-500" },
            { label: "Stok Menipis", value: stats.lowStockCount, icon: <FaExclamationTriangle />, bg: stats.lowStockCount > 0 ? "bg-rose-50 text-rose-500" : "bg-slate-50 text-slate-400" },
            { label: "Feedback Member", value: `${stats.avgFeedbackRating} ★`, icon: <FaStar />, bg: "bg-purple-50 text-purple-500" },
          ].map((k, i) => (
            <div key={i} className="bg-white rounded-[24px] p-5 shadow-sm border border-[#ECECEC] flex items-center gap-4">
              <div className={`h-11 w-11 rounded-2xl flex items-center justify-center text-lg shrink-0 ${k.bg}`}>
                {k.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[9px] text-[#9CA3AF] font-bold uppercase tracking-wider truncate">{k.label}</p>
                <h3 className="text-base font-black text-[#1F2937] mt-0.5 truncate">{k.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 2: CHARTS & RECENT ORDERS (Takes full width, prevents cramped feeling) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Weekly Sales Chart */}
          <div className="lg:col-span-7 bg-[#1F2937] p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl min-h-[440px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB400]/8 rounded-full blur-[90px]" />
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Tren Penjualan Mingguan</h2>
                <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest mt-1">Live Database Analytics</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#FFB400] rounded-full animate-ping" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Sistem Aktif</span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-4 h-64 relative z-10 pt-6">
              {weeklySales.map((val, idx) => {
                const heightPct = (val / maxWeeklySale) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group h-full justify-end">
                    <span className="text-[9px] font-bold text-[#FFB400] opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                      Rp {(val / 1000).toFixed(0)}k
                    </span>
                    <div
                      className="bg-[#374151] group-hover:bg-[#FFB400] transition-all duration-300 w-full rounded-t-xl"
                      style={{ height: `${Math.max(4, heightPct)}%` }}
                    />
                    <p className="text-[9px] font-semibold text-[#9CA3AF] mt-3 group-hover:text-white uppercase tracking-wider">
                      {daysLabel[idx].slice(0, 3)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Orders List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black tracking-tight text-[#1F2937]">Pesanan Terbaru</h2>
              <span
                onClick={() => navigate("/orders")}
                className="text-xs font-bold text-[#FFB400] hover:text-amber-600 transition flex items-center gap-1 cursor-pointer"
              >
                Semua Pesanan <FaChevronRight size={9} />
              </span>
            </div>

            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <div className="bg-white rounded-[24px] border border-[#ECECEC] p-10 text-center text-xs text-[#9CA3AF]">
                  Belum ada aktivitas pesanan masuk.
                </div>
              ) : (
                recentOrders.map((order, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="bg-white rounded-[24px] p-4.5 border border-[#ECECEC] shadow-sm hover:shadow-md transition flex items-start gap-4 cursor-pointer group"
                  >
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold uppercase ${
                      order.status === "Selesai" ? "bg-emerald-50 text-emerald-600" :
                      order.status === "Diproses" ? "bg-blue-50 text-blue-600" :
                      order.status === "Dibatalkan" ? "bg-rose-50 text-rose-600" :
                      "bg-amber-50 text-[#FFB400]"
                    }`}>
                      {order.status.slice(0, 3)}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-center gap-2">
                        <h4 className="font-extrabold text-sm text-[#1F2937] truncate group-hover:text-[#FFB400] transition">
                          {order.name}
                        </h4>
                        <span className="text-[9px] text-slate-400 font-mono flex items-center gap-1">
                          <FaRegClock size={9} /> {order.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{order.menu}</p>
                      
                      <div className="flex justify-between items-center mt-2.5 pt-2.5 border-t border-slate-50">
                        <span className="font-mono text-[9px] text-slate-300">#{order.id}</span>
                        <span className="font-black text-xs text-slate-700">Rp {order.total.toLocaleString("id-ID")}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: OPERATIONS & PROMOS (3-Column Layout, Clean Vertical Lists) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Low Stock Alert (Gudang) */}
          <div className="bg-white rounded-[2.5rem] border border-[#ECECEC] p-6 shadow-sm flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center text-xs">
                    <FaExclamationTriangle />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">Bahan Baku Menipis</h3>
                  </div>
                </div>
                <span onClick={() => navigate("/stock")} className="text-[9px] font-black uppercase text-[#FFB400] hover:text-amber-600 transition cursor-pointer">
                  Buka Gudang
                </span>
              </div>

              <div className="space-y-3">
                {lowStockItems.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Semua stok bahan baku aman.</p>
                ) : (
                  lowStockItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100/70 transition border border-slate-100">
                      <div className="min-w-0">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">{item.id}</span>
                        <h4 className="text-xs font-black text-slate-800 truncate">{item.product_name}</h4>
                        <p className="text-[9px] text-slate-400 truncate mt-0.5">Supplier: {item.supplierName}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg text-[10px] font-black shrink-0">
                        {item.stock} unit
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Feedback Summary */}
          <div className="bg-white rounded-[2.5rem] border border-[#ECECEC] p-6 shadow-sm flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center text-xs">
                    <FaStar />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">Feedback Member</h3>
                  </div>
                </div>
                <span onClick={() => navigate("/feedback")} className="text-[9px] font-black uppercase text-[#FFB400] hover:text-amber-600 transition cursor-pointer">
                  Inbox ({stats.pendingFeedbackReplies})
                </span>
              </div>

              <div className="space-y-3">
                {recentFeedbacks.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada ulasan masuk.</p>
                ) : (
                  recentFeedbacks.map(f => (
                    <div key={f.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-1.5">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-slate-700 truncate max-w-[120px]">{f.customerName}</span>
                        <div className="flex gap-0.5 shrink-0">
                          {[...Array(f.rating)].map((_, idx) => (
                            <FaStar key={idx} className="text-[#FFB400] text-[8px]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 italic truncate">"{f.comment}"</p>
                      <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 rounded ${f.reply ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                        {f.reply ? "✓ Dibalas" : "⌛ Pending"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Column 3: Active Promotions List (New Card as requested) */}
          <div className="bg-white rounded-[2.5rem] border border-[#ECECEC] p-6 shadow-sm flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center text-xs">
                    <FaTag />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">Promo Berjalan</h3>
                  </div>
                </div>
                <span onClick={() => navigate("/campaign-promo")} className="text-[9px] font-black uppercase text-[#FFB400] hover:text-amber-600 transition cursor-pointer">
                  Kelola Promo
                </span>
              </div>

              <div className="space-y-3">
                {activePromosList.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Tidak ada promo aktif berjalan.</p>
                ) : (
                  activePromosList.map(p => {
                    const cleanTitle = p.title.replace(/\[.*?\]/g, "").trim();
                    const match = p.title.match(/\[(.*?)\]/);
                    const category = match ? match[1] : "Promo";
                    return (
                      <div key={p.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex justify-between items-center gap-2">
                        <div className="min-w-0">
                          <span className="text-[8px] font-bold text-rose-500 uppercase tracking-wider block">{category}</span>
                          <h4 className="text-xs font-black text-slate-800 truncate">{cleanTitle}</h4>
                          <p className="text-[8px] text-slate-400 font-mono mt-0.5">S/D: {p.end_date || "Selesai"}</p>
                        </div>
                        <span className="px-2 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-bold shrink-0">
                          {Number(p.discount) <= 1 ? `${Number(p.discount)*100}%` : `Rp ${Number(p.discount)/1000}k`}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </Container>
  );
}