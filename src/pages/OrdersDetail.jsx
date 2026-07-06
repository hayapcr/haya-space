import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { dbService } from "../services/db";
import { FaChevronLeft, FaReceipt, FaUser, FaBoxOpen, FaInfoCircle } from "react-icons/fa";
import Container from "../components/Container";

export default function OrdersDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [details, setDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState("");

  const loadOrderDetail = async () => {
    try {
      const ord = await dbService.getOrderById(id);
      if (!ord) {
        console.error("Order tidak ditemukan");
        return;
      }
      
      const parsed = dbService.parseStatus(ord.status);
      setOrder({
        ...ord,
        status: parsed.status,
        event_date: parsed.event_date || ord.event_date || "",
        note: parsed.note || ord.note || "",
        discount_applied: parsed.discount_applied || 0,
        promo_code: parsed.promo_code || "",
      });

      const cust = await dbService.getCustomerById(ord.customer_id);
      setCustomer(cust);

      const oDetails = await dbService.getOrderDetailsByOrderId(id);
      setDetails(oDetails);

      const prods = await dbService.getProducts();
      setProducts(prods);
    } catch (e) {
      console.error("Gagal memuat detail order", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderDetail();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      setUpdating(true);
      await dbService.updateOrderStatus(id, newStatus);
      setSuccess("Status pesanan berhasil diperbarui!");
      await loadOrderDetail();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-['Poppins']">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFB400] border-t-transparent" />
      </div>
    );
  }

  if (!order) {
    return (
      <Container>
        <div className="p-8 text-center text-red-500 font-['Poppins']">
          <p className="text-xl font-bold">Pesanan Tidak Ditemukan</p>
          <button onClick={() => navigate(-1)} className="mt-4 px-5 py-2 bg-slate-800 text-white rounded-xl">
            Kembali
          </button>
        </div>
      </Container>
    );
  }

  const getProductObj = (prodId) => {
    return products.find((p) => p.id === prodId) || {};
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-700 border border-green-200";
      case "Diproses":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "Dibatalkan":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    }
  };

  return (
    <Container>
      <div className="w-full min-h-screen bg-[#F8F9FB] p-4 md:p-6 lg:p-8 font-['Poppins'] text-[#4B5563]">
        
        {/* BACK ACTION */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-xs font-bold text-[#1F2937] hover:text-[#FFB400] transition"
        >
          <FaChevronLeft /> Kembali ke Riwayat Pesanan
        </button>

        {/* NOTIFICATION */}
        {success && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 shadow-sm flex items-center gap-3">
            <span>✨</span>
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}

        {/* MAIN DETAIL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* RECEIPT / BILL DETAILS */}
          <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-4">
              <div className="flex items-center gap-3">
                <FaReceipt className="text-[#FFB400] text-xl" />
                <h3 className="text-lg font-extrabold text-[#1F2937]">Rincian Transaksi #{order.id}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeClass(order.status)}`}>
                {order.status}
              </span>
            </div>

            {/* ORDER ITEMS TABLE */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Daftar Menu Dipilih</h4>
              <div className="divide-y divide-[#ECECEC]">
                {details.map((item) => {
                  const prod = getProductObj(item.product_id);
                  return (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={prod.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836"}
                          alt={prod.name}
                          className="h-12 w-12 rounded-xl object-cover border border-[#ECECEC]"
                        />
                        <div>
                          <h5 className="font-extrabold text-sm text-[#1F2937]">{prod.name || "Menu Makanan"}</h5>
                          <p className="text-xs text-slate-400 font-semibold">{prod.category || "Catering"}</p>
                        </div>
                      </div>
                      <div className="flex justify-between sm:justify-end items-center gap-8 w-full sm:w-auto">
                        <span className="text-xs font-bold text-slate-500 font-mono">
                          Rp {Number(prod.price || 0).toLocaleString("id-ID")} x {item.qty}
                        </span>
                        <span className="text-sm font-black text-[#1F2937] font-mono">
                          Rp {Number(item.subtotal || 0).toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BILL SUMMARY */}
            <div className="border-t border-[#ECECEC] pt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Tanggal Pesanan:</span>
                <span className="font-semibold text-slate-700">
                  {new Date(order.order_date).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3">
                <span className="text-slate-500">Subtotal Belanja:</span>
                <span className="font-bold text-slate-700 font-mono">
                  Rp {Number(details.reduce((sum, d) => sum + Number(d.subtotal), 0)).toLocaleString("id-ID")}
                </span>
              </div>
              {order.discount_applied > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>
                    Diskon Loyalty/Promo {order.promo_code ? `(${order.promo_code})` : ""}:
                  </span>
                  <span className="font-bold font-mono">
                    - Rp {Number(order.discount_applied).toLocaleString("id-ID")}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#ECECEC] pt-4 text-base">
                <span className="font-black text-[#1F2937]">Total Pembayaran:</span>
                <span className="font-black text-[#FFB400] font-mono text-lg">
                  Rp {Number(order.total || 0).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* CUSTOMER & ACTION PANEL */}
          <div className="space-y-6">
            {/* CUSTOMER CARD */}
            <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-[#ECECEC] pb-4 mb-2">
                <FaUser className="text-[#FFB400] text-lg" />
                <h3 className="font-extrabold text-base text-[#1F2937]">Informasi Customer</h3>
              </div>
              
              {customer ? (
                <div className="space-y-3">
                  <div>
                    <Link to={`/customers/${customer.id}`} className="font-extrabold text-[#1F2937] hover:text-[#FFB400] transition">
                      {customer.name}
                    </Link>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{customer.id}</p>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p>📧 {customer.email}</p>
                    <p>📞 {customer.phone}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Data customer tidak ditemukan</p>
              )}
            </div>

            {/* ACTION PANEL */}
            <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-[#ECECEC] pb-4 mb-2">
                <FaInfoCircle className="text-[#FFB400] text-lg" />
                <h3 className="font-extrabold text-base text-[#1F2937]">Status Pesanan</h3>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Perbarui Status</label>
                <select
                  value={order.status}
                  onChange={handleStatusChange}
                  disabled={updating || order.status === "Dibatalkan" || order.status === "Selesai"}
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400] bg-slate-50 font-bold text-slate-700 cursor-pointer disabled:opacity-50"
                >
                  <option value="Pending">Pending / Menunggu</option>
                  <option value="Diproses">Diproses / Dibuat</option>
                  <option value="Selesai">Selesai / Terkirim</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
                <p className="text-[10px] text-[#9CA3AF] mt-2 leading-relaxed">
                  Pesanan yang sudah <strong>Selesai</strong> atau <strong>Dibatalkan</strong> tidak dapat diperbarui statusnya kembali.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </Container>
  );
}