import { useState, useEffect, useMemo } from "react";
import { FaGift, FaShoppingCart, FaStar, FaCommentAlt, FaPaperPlane, FaUserAlt, FaReply, FaTrash, FaPlus, FaMinus, FaCheckCircle, FaTag, FaBoxes, FaCalendarAlt } from "react-icons/fa";
import { dbService } from "../../services/db";

export default function MemberHome() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Member",
    email: "member@gmail.com",
  };

  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Checkout Form States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPromoId, setSelectedPromoId] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [note, setNote] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  // Feedback form states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const loadData = async () => {
    try {
      const [prods, proms, custs, allFeedback] = await Promise.all([
        dbService.getProducts(),
        dbService.getPromotions(),
        dbService.getCustomers(),
        dbService.getFeedback(),
      ]);

      setProducts(prods || []);
      setPromotions(proms || []);

      let matched = custs.find(c => c.email === user.email);
      if (!matched) {
        matched = await dbService.createCustomer({
          name: user.name,
          email: user.email,
          phone: "08120000000",
          membership_id: "MBR-SLV",
          points: 0
        });
      }
      setCustomer(matched);

      const myFeedback = allFeedback.filter(f => f.customer_id === matched.id);
      setFeedbacks(myFeedback.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user.email]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmittingFeedback(true);
    setFeedbackSuccess("");
    setFeedbackError("");

    try {
      await dbService.createFeedback({
        customer_id: customer.id,
        rating: Number(rating),
        comment: comment.trim()
      });
      setFeedbackSuccess("Review katering Anda berhasil dikirim ke admin!");
      setComment("");
      setRating(5);
      loadData();
    } catch (err) {
      setFeedbackError(err.message || "Gagal mengirim review.");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  // Cart operations
  const addToCart = (product) => {
    const existing = cart.find(it => it.product_id === product.id);
    if (existing) {
      setCart(cart.map(it => it.product_id === product.id ? { ...it, qty: it.qty + 1 } : it));
    } else {
      setCart([...cart, { product_id: product.id, name: product.name, price: Number(product.price), image: product.image, qty: 1 }]);
    }
    setCheckoutSuccess("");
  };

  const updateCartQty = (prodId, delta) => {
    setCart(cart.map(it => {
      if (it.product_id === prodId) {
        const newQty = it.qty + delta;
        return newQty > 0 ? { ...it, qty: newQty } : null;
      }
      return it;
    }).filter(Boolean));
  };

  const removeFromCart = (prodId) => {
    setCart(cart.filter(it => it.product_id !== prodId));
  };

  // Pricing calculations
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);

  let loyaltyDiscountRate = 0;
  if (customer?.membership_id === "MBR-PLT") loyaltyDiscountRate = 0.10;
  else if (customer?.membership_id === "MBR-GLD") loyaltyDiscountRate = 0.05;

  const loyaltyDiscount = subtotal * loyaltyDiscountRate;

  let promoDiscount = 0;
  const selectedPromo = promotions.find(p => p.id === selectedPromoId);
  if (selectedPromo) {
    const discVal = Number(selectedPromo.discount);
    if (discVal <= 1) {
      promoDiscount = (subtotal - loyaltyDiscount) * discVal;
    } else {
      promoDiscount = Math.min(subtotal - loyaltyDiscount, discVal);
    }
  }

  const discountTotal = loyaltyDiscount + promoDiscount;
  const grandTotal = Math.max(0, subtotal - discountTotal);

  // Categories list
  const categories = useMemo(() => {
    return ["Semua", ...new Set(products.map(p => p.category))].filter(Boolean);
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    if (activeCategory === "Semua") return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setCheckoutError("");
    setCheckingOut(true);

    try {
      const orderPayload = {
        customer_id: customer.id,
        total: grandTotal,
        discount_applied: discountTotal,
        event_date: eventDate || null,
        note: note.trim(),
        promo_code: selectedPromo?.id || ""
      };

      const detailsPayload = cart.map(it => ({
        product_id: it.product_id,
        qty: it.qty,
        subtotal: it.price * it.qty
      }));

      await dbService.createOrder(orderPayload, detailsPayload);
      setCheckoutSuccess("✨ Pesanan Anda berhasil dibuat dan diteruskan ke admin!");
      setCart([]);
      setIsCheckoutOpen(false);
      setEventDate("");
      setNote("");
      setSelectedPromoId("");
      loadData();
    } catch (err) {
      setCheckoutError(err.message || "Gagal melakukan checkout.");
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-['Poppins']">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FF7A1A] border-t-transparent" />
      </div>
    );
  }

  const discountText =
    customer?.membership_id === "MBR-PLT" ? "10% VIP Discount" :
    customer?.membership_id === "MBR-GLD" ? "5% Gold Discount" : "0% Silver Benefit";

  const tierText =
    customer?.membership_id === "MBR-PLT" ? "PLATINUM TIER" :
    customer?.membership_id === "MBR-GLD" ? "GOLD TIER" : "SILVER TIER";

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-['Poppins'] min-h-screen bg-slate-50/50 text-slate-800">
      
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-5 py-2 bg-[#1F2937] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full">
            MEMBER AREA
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium">
            PRIVILEGE PORTAL
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black leading-none text-[#1F2937]">
          CaterBox <span className="italic text-[#FF7A1A]">Privilege.</span>
        </h1>
        <p className="mt-5 text-gray-500 text-sm font-medium">
          Dapatkan penawaran menu katering eksklusif, gunakan voucher promo, dan pantau riwayat pesanan Anda.
        </p>
      </div>

      {/* MEMBER CARD & CART SUMMARY */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.8fr_1fr] mb-12">
        {/* VIP Access Card */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#1F2937] via-[#2F3E50] to-[#FF7A1A] p-10 text-white shadow-xl shadow-slate-900/10">
          <div className="absolute right-10 top-10 h-16 w-20 rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg flex items-center justify-center font-bold text-slate-900">
            CB
          </div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-300">
            CaterBox Privilege
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-black">VIP ACCESS CARD</h2>
          <div className="mt-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-300">
              Card Holder
            </p>
            <h3 className="mt-2 text-2xl md:text-3xl font-black">{customer?.name || user.name}</h3>
          </div>
          <div className="mt-14 flex justify-between border-t border-white/20 pt-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                Customer ID
              </p>
              <p className="mt-1 text-sm font-bold font-mono">{customer?.id || "CST-000"}</p>
            </div>
            <div className="text-right">
              <span className="rounded-full border border-amber-300/60 bg-white/10 px-5 py-2 text-xs font-black text-amber-300">
                ● {tierText}
              </span>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                Exclusive Benefit
              </p>
              <p className="text-sm font-black text-amber-300">
                {discountText}
              </p>
            </div>
          </div>
        </div>

        {/* Loyalty Points / Cart Summary */}
        <div className="rounded-[2.5rem] border border-[#ECECEC] bg-white p-8 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Loyalty Points
            </p>
            <h2 className="mt-3 text-5xl font-black text-[#FF7A1A]">
              {customer?.points || 0} <span className="text-sm text-slate-500 font-bold">POINTS</span>
            </h2>
            <p className="mt-3 text-xs text-slate-400">
              Poin terakumulasi otomatis dari setiap pesanan catering yang selesai.
            </p>
          </div>
          {cart.length > 0 && (
            <div className="mt-6 pt-6 border-t border-[#ECECEC] space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Keranjang ({cart.length} item)</span>
                <span className="font-black text-[#FF7A1A]">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-3 bg-[#FF7A1A] hover:bg-[#E86A0A] text-white rounded-2xl text-xs font-black uppercase tracking-wider transition shadow-lg shadow-orange-500/10"
              >
                Checkout Sekarang
              </button>
            </div>
          )}
        </div>
      </section>

      {/* NOTIFICATIONS */}
      {checkoutSuccess && (
        <div className="mb-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 flex items-center gap-3">
          <FaCheckCircle className="text-emerald-500 text-lg" />
          <p className="text-sm font-bold">{checkoutSuccess}</p>
        </div>
      )}

      {/* PRODUCT CATALOG */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-800">Menu Eksklusif</h2>
            <p className="text-xs text-slate-400">Pilih menu catering terbaik kami untuk acara penting Anda.</p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeCategory === cat
                    ? "bg-[#1F2937] text-white"
                    : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <div key={p.id} className="bg-white border border-[#ECECEC] rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col">
              <div className="relative h-48 bg-slate-100">
                <img
                  src={p.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-slate-100 text-slate-700">
                  {p.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-slate-800 leading-snug">{p.name}</h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{p.description || "Hidangan premium segar disajikan higienis."}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Harga/Porsi</p>
                    <span className="font-black text-base text-[#FF7A1A]">Rp {Number(p.price).toLocaleString("id-ID")}</span>
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-[#FF7A1A] transition"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEEDBACK LOOP */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-12">
        <div className="bg-white rounded-[2.5rem] border border-[#ECECEC] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-orange-50 text-[#FF7A1A] rounded-xl flex items-center justify-center text-lg">
              <FaCommentAlt />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">Ulasan & Feedback</h3>
              <p className="text-xs text-slate-400">Bagikan saran/masukan Anda untuk admin</p>
            </div>
          </div>

          {feedbackSuccess && (
            <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-xs font-semibold">
              {feedbackSuccess}
            </div>
          )}
          {feedbackError && (
            <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 text-xs font-semibold">
              {feedbackError}
            </div>
          )}

          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star} type="button" onClick={() => setRating(star)}
                    className="text-2xl transition hover:scale-110"
                  >
                    <FaStar className={star <= rating ? "text-[#FF7A1A]" : "text-slate-200"} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Komentar / Masukan</label>
              <textarea
                value={comment} onChange={e => setComment(e.target.value)}
                placeholder="Komentar Anda..." rows="3" required
                className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FF7A1A] transition resize-none"
              />
            </div>
            <button
              type="submit" disabled={submittingFeedback}
              className="px-5 py-3 bg-[#FF7A1A] text-white text-xs font-bold rounded-xl hover:bg-[#E86A0A] transition disabled:opacity-60 flex items-center gap-2"
            >
              <FaPaperPlane /> Kirim Ulasan
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-800">Ulasan Saya Sebelumnya</h3>
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
            {feedbacks.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Belum ada review yang Anda kirimkan.</p>
            ) : (
              feedbacks.map(f => (
                <div key={f.id} className="bg-white border border-[#ECECEC] rounded-2xl p-4 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {[...Array(f.rating)].map((_, i) => (
                        <FaStar key={i} className="text-[#FF7A1A] text-xs" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{new Date(f.created_at).toLocaleDateString("id-ID")}</span>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{f.comment}"</p>
                  {f.reply && (
                    <div className="mt-3 bg-slate-50 border border-slate-100 rounded-xl p-3 flex gap-2.5 items-start">
                      <FaReply className="text-slate-400 mt-0.5 shrink-0 transform rotate-180" size={11} />
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Balasan Admin</p>
                        <p className="text-xs text-slate-600 mt-0.5">{f.reply}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-['Poppins']">
          <div className="bg-white rounded-[28px] max-w-xl w-full p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-orange-50 text-[#FF7A1A] rounded-xl flex items-center justify-center text-lg">
                <FaShoppingCart />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#1F2937]">Form Checkout Katering</h2>
                <p className="text-xs text-slate-400">Pastikan detail pesanan Anda sudah benar</p>
              </div>
            </div>

            {checkoutError && (
              <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-xs font-semibold">
                ⚠️ {checkoutError}
              </div>
            )}

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              {/* Event Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Tanggal Acara <span className="text-rose-500">*</span></label>
                <input
                  type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} required
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FF7A1A] transition bg-white"
                />
              </div>

              {/* Special Note */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Catatan Khusus</label>
                <input
                  type="text" value={note} onChange={e => setNote(e.target.value)}
                  placeholder="Contoh: Tanpa msg, sendok plastik disiapkan..."
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FF7A1A] transition"
                />
              </div>

              {/* Promo code */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Pilih Promo / Voucher</label>
                <select
                  value={selectedPromoId} onChange={e => setSelectedPromoId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FF7A1A] bg-white cursor-pointer"
                >
                  <option value="">-- Tidak Menggunakan Voucher --</option>
                  {promotions.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} — Diskon: {Number(p.discount) <= 1 ? `${Number(p.discount)*100}%` : `Rp ${Number(p.discount).toLocaleString("id-ID")}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cart items list preview */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Ringkasan Item</h4>
                {cart.map(it => (
                  <div key={it.product_id} className="flex justify-between items-center text-xs">
                    <span className="text-slate-600">{it.name} (x{it.qty})</span>
                    <span className="font-bold text-slate-700">Rp {(it.price * it.qty).toLocaleString("id-ID")}</span>
                  </div>
                ))}
              </div>

              {/* Bill Details */}
              <div className="border-t border-slate-150 pt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal:</span>
                  <span className="font-bold text-slate-700">Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                {loyaltyDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Diskon Member ({customer?.membership_id}):</span>
                    <span className="font-bold">- Rp {loyaltyDiscount.toLocaleString("id-ID")}</span>
                  </div>
                )}
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-rose-600">
                    <span>Voucher ({selectedPromo?.id}):</span>
                    <span className="font-bold">- Rp {promoDiscount.toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-100 pt-3 text-sm">
                  <span className="font-black text-slate-800">Total Pembayaran:</span>
                  <span className="font-black text-[#FF7A1A] text-base">Rp {grandTotal.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#ECECEC]">
                <button
                  type="button" onClick={() => setIsCheckoutOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition"
                >Batal</button>
                <button
                  type="submit" disabled={checkingOut}
                  className="px-6 py-3 bg-[#FF7A1A] text-white rounded-xl text-xs font-bold hover:bg-[#E86A0A] transition disabled:opacity-60 flex items-center gap-1.5 shadow-md shadow-orange-500/10"
                >
                  {checkingOut ? "Memproses..." : "Konfirmasi Checkout"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}