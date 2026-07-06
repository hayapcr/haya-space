import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../services/db";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaReceipt,
  FaArrowRight,
  FaUser,
  FaSearch,
  FaTicketAlt,
  FaBoxes
} from "react-icons/fa";
import Container from "../components/Container";

export default function Cart() {
  const navigate = useNavigate();

  // Data states
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cart configurations
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedPromoId, setSelectedPromoId] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [cartItems, setCartItems] = useState([]); // { product_id, qty, price, name }
  const [taxRate, setTaxRate] = useState(10); // default 10%
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const custs = await dbService.getCustomers();
      const prods = await dbService.getProducts();
      const proms = await dbService.getPromotions();
      const inv = await dbService.getInventory();

      setCustomers(custs);
      setProducts(prods);
      setPromotions(proms);
      setInventory(inv);

      // Load Settings
      const savedSettings = localStorage.getItem("caterbox_settings");
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        if (parsed.taxRate !== undefined) setTaxRate(parsed.taxRate);
      }
    } catch (e) {
      console.error("Gagal memuat data checkout", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getProductStock = (prodName) => {
    const matched = inventory.find((i) =>
      prodName.toLowerCase().includes(i.product_name.split(" ")[0].toLowerCase())
    );
    return matched ? matched.stock : 999; // fallback if not in inventory
  };

  const handleAddProduct = (prod) => {
    const maxStock = getProductStock(prod.name);
    const existing = cartItems.find((item) => item.product_id === prod.id);
    
    if (existing) {
      if (existing.qty >= maxStock) {
        setError(`Stok bahan baku '${prod.name}' tidak mencukupi di inventory!`);
        setTimeout(() => setError(""), 3000);
        return;
      }
      setCartItems(
        cartItems.map((item) =>
          item.product_id === prod.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      if (maxStock <= 0) {
        setError(`Stok bahan baku '${prod.name}' kosong di inventory!`);
        setTimeout(() => setError(""), 3000);
        return;
      }
      setCartItems([...cartItems, { product_id: prod.id, name: prod.name, price: prod.price, qty: 1 }]);
    }
  };

  const handleDecreaseQty = (prodId) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.product_id === prodId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleIncreaseQty = (item) => {
    const prod = products.find((p) => p.id === item.product_id);
    const maxStock = getProductStock(prod?.name || "");
    if (item.qty >= maxStock) {
      setError(`Stok bahan baku tidak mencukupi di inventory!`);
      setTimeout(() => setError(""), 3000);
      return;
    }
    setCartItems(
      cartItems.map((c) =>
        c.product_id === item.product_id ? { ...c, qty: c.qty + 1 } : c
      )
    );
  };

  const handleRemoveItem = (prodId) => {
    setCartItems(cartItems.filter((item) => item.product_id !== prodId));
  };

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);
  
  // Calculate membership discount rate
  let loyaltyDiscountRate = 0;
  if (selectedCustomer) {
    if (selectedCustomer.membership_id === "MBR-PLT") loyaltyDiscountRate = 0.10;
    else if (selectedCustomer.membership_id === "MBR-GLD") loyaltyDiscountRate = 0.05;
  }

  // Calculate pricing
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const loyaltyDiscount = subtotal * loyaltyDiscountRate;
  
  // Calculate promo discount
  let promoDiscount = 0;
  const selectedPromo = promotions.find((p) => p.id === selectedPromoId);
  if (selectedPromo) {
    if (Number(selectedPromo.discount) <= 1) {
      // Percentage promo
      promoDiscount = (subtotal - loyaltyDiscount) * Number(selectedPromo.discount);
    } else {
      // Flat value promo
      promoDiscount = Math.min(subtotal - loyaltyDiscount, Number(selectedPromo.discount));
    }
  }

  const discountTotal = loyaltyDiscount + promoDiscount;
  const taxableTotal = Math.max(0, subtotal - discountTotal);
  const tax = taxableTotal * (taxRate / 100);
  const total = taxableTotal + tax;

  const handleCheckout = async () => {
    if (!selectedCustomerId) {
      setError("Silakan pilih customer terlebih dahulu!");
      return;
    }
    if (cartItems.length === 0) {
      setError("Keranjang belanja masih kosong!");
      return;
    }

    const orderData = {
      customer_id: selectedCustomerId,
      total: total,
      discount_applied: discountTotal,
    };

    const details = cartItems.map((item) => ({
      product_id: item.product_id,
      qty: item.qty,
      subtotal: item.price * item.qty
    }));

    try {
      setLoading(true);
      await dbService.createOrder(orderData, details);
      setSuccess("Pemesanan berhasil diproses!");
      setTimeout(() => {
        navigate("/orders");
      }, 1500);
    } catch (err) {
      setError("Gagal membuat pemesanan.");
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  if (loading && cartItems.length === 0) {
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
              CASHIER PORTAL
            </span>
            <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full"></div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">
              PESANAN MASUK
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] tracking-tight">
            Order <span className="text-[#FFB400] italic">Creator.</span>
          </h1>
          <p className="mt-3 text-slate-500 text-sm max-w-xl">
            Input pemesanan baru, pilih customer untuk diskon member otomatis, kurangi stok, dan cetak invoice.
          </p>
        </div>

        {/* NOTIFICATIONS */}
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

        {/* POS GRID LAYOUT */}
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1.2fr] gap-8 items-start">
          
          {/* LEFT: PRODUCTS PICKER & SELECTED CART */}
          <div className="space-y-8">
            
            {/* STEP 1: SELECT CUSTOMER */}
            <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                <FaUser className="text-[#FFB400]" /> 1. Pilih Customer Pemesan
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400] font-bold text-slate-700 bg-slate-50 cursor-pointer"
                >
                  <option value="">-- Pilih Customer --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.membership_id === "MBR-PLT" ? "Platinum" : c.membership_id === "MBR-GLD" ? "Gold" : "Silver"})
                    </option>
                  ))}
                </select>

                {selectedCustomer && (
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-xs">
                    <span className="font-extrabold text-[#FFB400] block">
                      Membership Level: {selectedCustomer.membership_id === "MBR-PLT" ? "Platinum (Diskon 10%)" : selectedCustomer.membership_id === "MBR-GLD" ? "Gold (Diskon 5%)" : "Silver (Diskon 0%)"}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block">Kontak: {selectedCustomer.phone || "-"}</span>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 2: CHOOSE MENU */}
            <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h3 className="text-sm font-bold text-[#1F2937] flex items-center gap-2">
                  <FaBoxes className="text-[#FFB400]" /> 2. Pilih Menu Katering
                </h3>
                
                <div className="relative w-full md:w-64">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs" />
                  <input
                    type="text"
                    placeholder="Cari menu hidangan..."
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-4 text-xs outline-none focus:border-[#FFB400]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto pr-2">
                {filteredProducts.map((p) => {
                  const stock = getProductStock(p.name);
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleAddProduct(p)}
                      className="border border-[#ECECEC] rounded-2xl p-3 flex flex-col justify-between hover:border-[#FFB400] cursor-pointer transition bg-slate-50/20"
                    >
                      <h4 className="font-bold text-xs text-[#1F2937] leading-tight mb-2">{p.name}</h4>
                      <div>
                        <div className="text-[#FFB400] font-black text-xs">
                          Rp {p.price.toLocaleString("id-ID")}
                        </div>
                        <div className="flex justify-between items-center mt-2 border-t border-slate-100 pt-2 text-[10px] text-slate-400 font-bold">
                          <span>Stock: {stock}</span>
                          <span className="text-[#FFB400]">+ Add</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: SELECTED CART ITEMS */}
            <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#1F2937] mb-6">3. Keranjang Pemesanan</h3>

              {cartItems.length === 0 ? (
                <div className="text-center py-10 text-[#9CA3AF] text-xs">
                  Keranjang belanja kosong. Silakan tambahkan hidangan menu diatas.
                </div>
              ) : (
                <div className="divide-y divide-[#ECECEC]">
                  {cartItems.map((item) => (
                    <div key={item.product_id} className="py-4 flex justify-between items-center gap-4">
                      <div>
                        <h4 className="font-bold text-xs text-[#1F2937]">{item.name}</h4>
                        <p className="text-[10px] text-[#9CA3AF] font-bold mt-1 font-mono">
                          Rp {item.price.toLocaleString("id-ID")} / porsi
                        </p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2.5 bg-slate-50 p-1.5 rounded-lg border border-slate-150">
                          <button
                            type="button"
                            onClick={() => handleDecreaseQty(item.product_id)}
                            className="h-7 w-7 bg-white rounded-md flex items-center justify-center hover:text-red-500 transition shadow-sm border border-slate-100 text-xs"
                          >
                            <FaMinus size={9} />
                          </button>
                          <span className="w-5 text-center font-bold text-xs">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => handleIncreaseQty(item)}
                            className="h-7 w-7 bg-[#1F2937] text-white rounded-md flex items-center justify-center hover:bg-[#FFB400] transition shadow-sm text-xs"
                          >
                            <FaPlus size={9} />
                          </button>
                        </div>

                        <div className="w-24 text-right">
                          <span className="font-extrabold text-xs text-[#1F2937] font-mono">
                            Rp {(item.price * item.qty).toLocaleString("id-ID")}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item.product_id)}
                            className="block text-[9px] font-bold text-red-400 hover:text-red-600 mt-1 ml-auto"
                          >
                            <FaTrash className="inline mr-1" /> Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: ORDER SUMMARY BILL */}
          <div className="bg-[#1F2937] rounded-[2rem] p-7 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#FFB400]/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <FaReceipt className="text-[#FFB400] text-2xl" />
              </div>

              <h2 className="text-xl font-bold mb-1">Rincian Pembayaran</h2>
              <p className="text-xs text-slate-400 mb-8">Kalkulasi tagihan dan loyalty poin.</p>

              {/* Promotion Select */}
              <div className="mb-6">
                <label className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2 flex items-center gap-1.5">
                  <FaTicketAlt /> Pakai Promo / Voucher
                </label>
                <select
                  value={selectedPromoId}
                  onChange={(e) => setSelectedPromoId(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs outline-none text-white font-semibold cursor-pointer"
                >
                  <option value="">-- Tanpa Voucher --</option>
                  {promotions.map((p) => {
                    const pct = Number(p.discount) <= 1;
                    return (
                      <option key={p.id} value={p.id}>
                        {p.title} ({pct ? `${Number(p.discount) * 100}%` : `Rp ${Number(p.discount).toLocaleString("id-ID")}`})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal Belanja</span>
                  <span className="font-bold text-white font-mono">Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>

                {loyaltyDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Diskon Loyalty Member</span>
                    <span className="font-bold font-mono">- Rp {loyaltyDiscount.toLocaleString("id-ID")}</span>
                  </div>
                )}

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Diskon Promo/Voucher</span>
                    <span className="font-bold font-mono">- Rp {promoDiscount.toLocaleString("id-ID")}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-300">
                  <span>Pajak (PPN {taxRate}%)</span>
                  <span className="font-bold text-white font-mono">Rp {tax.toLocaleString("id-ID")}</span>
                </div>

                <div className="border-t border-white/10 pt-6 mt-4">
                  <p className="text-[10px] text-[#FFB400] font-bold uppercase tracking-[0.2em] mb-1">
                    Total Pembayaran
                  </p>
                  <h3 className="text-3xl font-black text-white font-mono">
                    Rp {total.toLocaleString("id-ID")}
                  </h3>
                </div>

                {selectedCustomer && (
                  <div className="bg-slate-800 border border-slate-700 rounded-xl p-3.5 mt-4 text-[10px] text-slate-400 leading-relaxed">
                    ✨ Customer akan mendapatkan <strong>+{Math.floor(total / 10000)}</strong> poin reward baru saat checkout selesai.
                  </div>
                )}
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}
                className="mt-8 w-full bg-[#FFB400] hover:bg-[#E0A000] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-amber-500/10 active:scale-[0.98]"
              >
                Proses Checkout
                <FaArrowRight />
              </button>

              <p className="mt-6 text-center text-[9px] text-slate-500 uppercase tracking-widest">
                Secure checkout • CaterBox CRM
              </p>
            </div>
          </div>

        </div>

      </div>
    </Container>
  );
}