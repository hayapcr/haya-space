import { useEffect, useState } from "react";
import { dbService } from "../services/db";
import { FaFileInvoiceDollar, FaChartLine, FaUtensils, FaUsers } from "react-icons/fa";
import Container from "../components/Container";

export default function Laporan() {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const ords = await dbService.getOrders();
        const details = await dbService.getOrderDetails();
        const prods = await dbService.getProducts();
        const custs = await dbService.getCustomers();
        setOrders(ords);
        setOrderDetails(details);
        setProducts(prods);
        setCustomers(custs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-['Poppins']">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFB400] border-t-transparent" />
      </div>
    );
  }

  // Calculate Metrics
  const completedOrders = orders.filter((o) => o.status === "Selesai" || o.status === "Diproses");
  const totalRevenue = completedOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const totalOrdersCount = orders.length;

  // Calculate top products sold
  const productSalesMap = {};
  orderDetails.forEach((d) => {
    // Only count details of completed/processed orders
    const matchedOrder = orders.find((o) => o.id === d.order_id);
    if (matchedOrder && matchedOrder.status !== "Dibatalkan") {
      productSalesMap[d.product_id] = (productSalesMap[d.product_id] || 0) + Number(d.qty);
    }
  });

  const topProducts = Object.keys(productSalesMap).map((prodId) => {
    const prodObj = products.find((p) => p.id === prodId);
    return {
      id: prodId,
      name: prodObj?.name || "Produk Terhapus",
      category: prodObj?.category || "N/A",
      price: prodObj?.price || 0,
      qtySold: productSalesMap[prodId]
    };
  }).sort((a, b) => b.qtySold - a.qtySold).slice(0, 5);

  // Membership distributions
  const platinumCount = customers.filter((c) => c.membership_id === "MBR-PLT").length;
  const goldCount = customers.filter((c) => c.membership_id === "MBR-GLD").length;
  const silverCount = customers.filter((c) => c.membership_id === "MBR-SLV" || !c.membership_id).length;

  // Render sales chart data (mocked or grouped by week day/date)
  const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const salesByDay = [0, 0, 0, 0, 0, 0, 0];
  
  completedOrders.forEach((o) => {
    const dayIndex = new Date(o.order_date).getDay();
    salesByDay[dayIndex] += Number(o.total || 0);
  });

  const maxDailySales = Math.max(...salesByDay, 100000);

  return (
    <Container>
      <div className="w-full min-h-screen bg-[#F8F9FB] p-4 md:p-6 lg:p-8 font-['Poppins'] text-[#4B5563]">
        
        {/* HEADER */}
        <div className="border-b border-[#ECECEC] pb-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-5 py-2 bg-[#1F2937] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
              FINANCIAL REPORTS
            </span>
            <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full"></div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">
              OPERATIONAL REPORT
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] tracking-tight">
            Business <span className="text-[#FFB400] italic">Reports.</span>
          </h1>
          <p className="mt-3 text-slate-500 text-sm max-w-xl">
            Analisis data penjualan catering, laporan produk terlaris, dan segmentasi keanggotaan customer.
          </p>
        </div>

        {/* REPORT STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-amber-50 text-[#FFB400] flex items-center justify-center text-2xl">
              <FaFileInvoiceDollar />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Total Pendapatan</p>
              <h3 className="text-2xl font-black text-[#1F2937] mt-1">Rp {totalRevenue.toLocaleString("id-ID")}</h3>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-[#1F2937]/5 text-[#1F2937] flex items-center justify-center text-2xl">
              <FaChartLine />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Total Pesanan</p>
              <h3 className="text-2xl font-black text-[#1F2937] mt-1">{totalOrdersCount} Transaksi</h3>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 border border-[#ECECEC] shadow-sm flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl">
              <FaUsers />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Segmentasi Customer</p>
              <h3 className="text-2xl font-black text-[#1F2937] mt-1">{customers.length} Terdaftar</h3>
            </div>
          </div>
        </div>

        {/* SALES CHART */}
        <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm mb-8">
          <h3 className="text-lg font-bold text-[#1F2937] mb-8">Grafik Penjualan Mingguan</h3>
          
          <div className="flex items-end justify-between gap-4 h-72 pt-4 border-b border-slate-100">
            {daysOfWeek.map((day, idx) => {
              const amount = salesByDay[idx];
              const pct = (amount / maxDailySales) * 100;
              return (
                <div key={day} className="flex-1 flex flex-col items-center group h-full justify-end">
                  <div className="text-[10px] font-bold text-slate-400 group-hover:text-[#FFB400] mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Rp {amount > 0 ? (amount / 1000).toFixed(0) + "k" : "0"}
                  </div>
                  <div
                    className="w-full bg-slate-100 group-hover:bg-[#FFB400] transition-all duration-300 rounded-t-xl relative"
                    style={{ height: `${Math.max(4, pct)}%` }}
                  ></div>
                  <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-wider">
                    {day.slice(0, 3)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* TOP PRODUCTS & CUSTOMER SEGMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
          
          {/* TOP PRODUCTS */}
          <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <FaUtensils className="text-[#FFB400] text-xl" />
              <h3 className="text-lg font-bold text-[#1F2937]">Menu Paling Terjual</h3>
            </div>

            {topProducts.length === 0 ? (
              <div className="text-center py-10 text-[#9CA3AF]">
                Belum ada data penjualan produk.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#ECECEC] text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">
                      <th className="pb-3">Menu</th>
                      <th className="pb-3">Kategori</th>
                      <th className="pb-3 text-center">Terjual</th>
                      <th className="pb-3 text-right">Harga Satuan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECECEC]">
                    {topProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition text-sm">
                        <td className="py-3 font-bold text-[#1F2937]">{p.name}</td>
                        <td className="py-3 text-slate-500 font-semibold">{p.category}</td>
                        <td className="py-3 text-center font-mono font-bold text-[#FFB400]">{p.qtySold} box</td>
                        <td className="py-3 text-right font-mono font-bold">
                          Rp {p.price.toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* CUSTOMER SEGMENTS */}
          <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#1F2937] mb-6">Segmentasi Membership</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-purple-50 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 bg-purple-500 rounded-full"></span>
                  <span className="text-xs font-bold text-purple-900">Platinum Tier</span>
                </div>
                <span className="text-sm font-black text-purple-950">{platinumCount} Customer</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 bg-[#FFB400] rounded-full"></span>
                  <span className="text-xs font-bold text-amber-900">Gold Tier</span>
                </div>
                <span className="text-sm font-black text-amber-950">{goldCount} Customer</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 bg-slate-400 rounded-full"></span>
                  <span className="text-xs font-bold text-slate-700">Silver Tier</span>
                </div>
                <span className="text-sm font-black text-slate-900">{silverCount} Customer</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </Container>
  );
}
