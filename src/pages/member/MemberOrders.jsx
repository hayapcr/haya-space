import { useState, useEffect } from "react";
import { FaBoxOpen, FaClock, FaCheckCircle, FaTimesCircle, FaFire, FaCalendarAlt, FaUser, FaRegFileAlt, FaMapMarkerAlt, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { dbService } from "../../services/db";

const TRACKING_STEPS = ["Pending", "Diproses", "Selesai"];

const STATUS_CONFIGS = {
  "Pending":    { color: "bg-amber-100 text-amber-700 border-amber-200", icon: <FaClock />, label: "Menunggu Konfirmasi" },
  "Diproses":   { color: "bg-blue-100 text-blue-700 border-blue-200",    icon: <FaFire className="animate-pulse" />, label: "Sedang Dimasak / Diproses" },
  "Selesai":    { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <FaCheckCircle />, label: "Pesanan Selesai / Terkirim" },
  "Dibatalkan": { color: "bg-rose-100 text-rose-700 border-rose-200",    icon: <FaTimesCircle />, label: "Pesanan Dibatalkan" }
};

export default function MemberOrders() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Member",
    email: "member@gmail.com",
  };

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);

  const loadMemberOrders = async () => {
    try {
      const [custs, allOrders, details, prods] = await Promise.all([
        dbService.getCustomers(),
        dbService.getOrders(),
        dbService.getOrderDetails(),
        dbService.getProducts(),
      ]);

      const matchedCust = custs.find(c => c.email === user.email);
      if (!matchedCust) {
        setLoading(false);
        return;
      }
      setCustomer(matchedCust);

      // Filter orders for this customer
      const myOrders = allOrders.filter(o => o.customer_id === matchedCust.id);

      const formatted = myOrders.map(o => {
        const oDetails = details.filter(d => d.order_id === o.id);
        const itemsList = oDetails.map(d => {
          const p = prods.find(pr => pr.id === d.product_id);
          return p ? `${p.name} (x${d.qty})` : "Item Makanan";
        }).join(", ");

        const parsed = dbService.parseStatus(o.status);

        return {
          id: o.id,
          order_date: o.order_date,
          dateFormatted: new Date(o.order_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
          total: Number(o.total || 0),
          status: parsed.status,
          event_date: parsed.event_date || o.event_date || "",
          note: parsed.note || o.note || "",
          discount_applied: parsed.discount_applied || 0,
          promo_code: parsed.promo_code || "",
          menuSummary: itemsList || "Catering Set"
        };
      });

      setOrders(formatted.sort((a, b) => new Date(b.order_date) - new Date(a.order_date)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemberOrders();
  }, [user.email]);

  const getStepIndex = (status) => {
    return TRACKING_STEPS.indexOf(status);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-['Poppins']">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FF7A1A] border-t-transparent" />
      </div>
    );
  }

  const activeOrders = orders.filter(o => o.status !== "Dibatalkan" && o.status !== "Selesai");
  const pastOrders = orders.filter(o => o.status === "Dibatalkan" || o.status === "Selesai");

  return (
    <div className="space-y-10 font-['Poppins'] text-slate-700">
      
      {/* ACCESS CARD OVERVIEW */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.8fr_1fr]">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#1F2937] via-[#2C2C2C] to-[#FF7A1A] p-10 text-white shadow-2xl">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#FFD166]">
            CaterBox Privilege
          </p>

          <h2 className="mt-3 text-4xl font-black">VIP ACCESS CARD</h2>

          <div className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-300">
              Tracking Status
            </p>
            <h3 className="mt-2 text-3xl font-black">Lacak Pesanan Saya</h3>
          </div>

          <div className="mt-14 flex justify-between border-t border-white/20 pt-6">
            <p className="text-sm font-bold">Email: {user.email}</p>
            <p className="text-sm font-black text-[#FFD166]">
              {customer?.membership_id === "MBR-PLT" ? "Platinum Tier ✦ 10%" :
               customer?.membership_id === "MBR-GLD" ? "Gold Tier ✦ 5%" : "Silver Tier ✦ Benefit"}
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#F2E7DB] bg-white p-10 shadow-lg flex flex-col justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Order Counter
            </p>
            <h2 className="mt-4 text-6xl font-black text-[#FF7A1A]">
              {orders.length} <span className="text-xl text-slate-500">ORDERS</span>
            </h2>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-slate-500">
            Berikut adalah seluruh riwayat pesanan Anda yang tercatat secara real-time.
          </p>
        </div>
      </section>

      {/* TRACKING LIST (ACTIVE ORDERS) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-800">Pelacakan Pesanan Aktif</h2>

        {activeOrders.length === 0 ? (
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#F2E7DB] bg-white p-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF5EC] text-2xl text-[#FF7A1A]">
              <FaBoxOpen />
            </div>
            <h3 className="mt-6 text-2xl font-black">Tidak Ada Pesanan Aktif</h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
              Anda tidak memiliki pesanan katering yang sedang berjalan. Lakukan pemesanan di beranda katalog.
            </p>
            <Link
              to="/member"
              className="mt-6 inline-block rounded-xl bg-[#FF7A1A] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#E86A0A] transition"
            >
              Mulai Pemesanan
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {activeOrders.map(order => {
              const statusCfg = STATUS_CONFIGS[order.status] || STATUS_CONFIGS["Pending"];
              const currentStepIdx = getStepIndex(order.status);

              return (
                <div key={order.id} className="bg-white border border-[#ECECEC] rounded-[24px] p-6 shadow-sm space-y-6">
                  {/* Card Header info */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-slate-800">{order.id}</span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusCfg.color}`}>
                          {statusCfg.icon} {order.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Dipesan pada: {order.dateFormatted}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Total Belanja</p>
                      <span className="text-base font-black text-[#FF7A1A]">Rp {order.total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  {/* Order Details & Notes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <p className="text-slate-600"><strong className="text-slate-800">Menu:</strong> {order.menuSummary}</p>
                      {order.note && <p className="text-slate-500 font-medium">📝 <strong className="text-slate-700">Catatan:</strong> {order.note}</p>}
                    </div>
                    <div className="space-y-2 md:text-right">
                      {order.event_date && (
                        <p className="text-slate-600">
                          📅 <strong className="text-slate-800">Rencana Acara:</strong> {new Date(order.event_date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      )}
                      {order.promo_code && (
                        <p className="text-slate-500">
                          🎟️ <strong className="text-slate-700">Promo:</strong> <span className="px-2 py-0.5 bg-rose-50 text-rose-600 border border-rose-100 rounded text-[10px] font-bold">{order.promo_code}</span> (Potongan Rp {order.discount_applied.toLocaleString("id-ID")})
                        </p>
                      )}
                    </div>
                  </div>

                  {/* VISUAL PROGRESS TRACKER */}
                  <div className="pt-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-6">Status Pelacakan</p>
                    
                    <div className="relative flex justify-between items-center max-w-xl mx-auto">
                      {/* Bar Background */}
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0" />
                      
                      {/* Active Fill Bar */}
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#FF7A1A] z-0 transition-all duration-500"
                        style={{ width: `${currentStepIdx === 0 ? "0%" : currentStepIdx === 1 ? "50%" : "100%"}` }}
                      />

                      {TRACKING_STEPS.map((step, idx) => {
                        const isDone = idx < currentStepIdx;
                        const isActive = idx === currentStepIdx;

                        return (
                          <div key={step} className="relative z-10 flex flex-col items-center">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition ${
                              isDone ? "bg-[#FF7A1A] border-[#FF7A1A] text-white" :
                              isActive ? "bg-white border-[#FF7A1A] text-[#FF7A1A] scale-110 shadow-md" :
                              "bg-white border-slate-200 text-slate-300"
                            }`}>
                              {idx === 0 ? <FaClock size={11} /> : idx === 1 ? <FaFire size={11} /> : <FaCheckCircle size={11} />}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-wider mt-2.5 transition ${
                              isActive ? "text-[#FF7A1A]" : isDone ? "text-slate-700" : "text-slate-300"
                            }`}>{step}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* PAST ORDERS RIWAYAT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-800">Riwayat Pesanan Selesai</h2>

        {pastOrders.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Belum ada riwayat pesanan selesai.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastOrders.map(order => {
              const statusCfg = STATUS_CONFIGS[order.status] || STATUS_CONFIGS["Selesai"];
              return (
                <div key={order.id} className="bg-white border border-[#ECECEC] rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-xs font-black text-slate-800">{order.id}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{order.dateFormatted}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${statusCfg.color}`}>
                      {statusCfg.icon} {order.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="truncate"><strong className="text-slate-700">Menu:</strong> {order.menuSummary}</p>
                    {order.note && <p className="truncate">📝 <strong>Catatan:</strong> {order.note}</p>}
                    {order.promo_code && <p className="text-rose-600 font-medium">🎟️ Voucher {order.promo_code} digunakan</p>}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-500">Total</span>
                    <span className="font-black text-[#FF7A1A]">Rp {order.total.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}