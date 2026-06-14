import { useState } from "react";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaTruck,
  FaReceipt,
  FaArrowRight,
} from "react-icons/fa";

export default function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Nasi Box Special",
      price: 25000,
      qty: 2,
      desc: "Ayam Bakar + Sambal Terasi",
      image: "🍱",
      category: "Lunch Box",
    },
    {
      id: 2,
      name: "Snack Box Premium",
      price: 15000,
      qty: 3,
      desc: "3 Kue + Air Mineral",
      image: "🧁",
      category: "Snack Box",
    },
    {
      id: 3,
      name: "Paket Prasmanan Mini",
      price: 45000,
      qty: 1,
      desc: "Nasi, lauk, sayur, dessert",
      image: "🍛",
      category: "Buffet",
    },
  ]);

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="ml-80 w-[calc(100vw-24rem)] max-w-[calc(100vw-24rem)] overflow-hidden font-['Poppins'] text-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-5 py-2 bg-[#0F1B3D] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full">
              ORDER CART
            </span>

            <span className="text-gray-300">•</span>

            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium">
              MY ORDERS
            </span>
          </div>

          <h1 className="text-5xl xl:text-[68px] font-black leading-none text-[#0F1B3D]">
            My <span className="italic text-[#FF6B00]">Orders.</span>
          </h1>

          <p className="mt-5 text-gray-500 text-sm font-medium">
            Total Items: {cart.length}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_390px] gap-8 items-start">
          {/* LEFT CONTENT */}
          <div className="space-y-5 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900">
                Selected Catering Menu
              </h2>

              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] font-black text-red-500 hover:text-red-700 uppercase tracking-[0.2em]"
                >
                  Clear All
                </button>
              )}
            </div>

            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-5"
                >
                  <div className="grid grid-cols-[90px_1fr_auto] gap-5 items-center">
                    <div className="w-[90px] h-[90px] rounded-[1.7rem] bg-orange-50 flex items-center justify-center text-4xl">
                      {item.image}
                    </div>

                    <div className="min-w-0">
                      <span className="inline-block mb-2 px-3 py-1 bg-[#FFF3D6] text-[#D97706] text-[10px] font-bold rounded-full uppercase tracking-widest">
                        {item.category}
                      </span>

                      <h3 className="text-lg font-black text-slate-900">
                        {item.name}
                      </h3>

                      <p className="text-xs text-slate-400 mt-1 italic">
                        {item.desc}
                      </p>

                      <p className="mt-3 text-[#FF6B00] font-black text-sm">
                        Rp {item.price.toLocaleString("id-ID")}
                        <span className="text-xs text-slate-400 font-medium">
                          {" "}
                          / porsi
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-2 border border-slate-100">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-slate-700 hover:text-red-500 shadow-sm"
                        >
                          <FaMinus size={12} />
                        </button>

                        <span className="w-7 text-center font-black">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-9 h-9 bg-[#0F1B3D] text-white rounded-xl flex items-center justify-center hover:bg-[#FF6B00] shadow-sm"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>

                      <div className="w-28 text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Subtotal
                        </p>

                        <p className="text-lg font-black text-slate-900 whitespace-nowrap">
                          Rp {(item.price * item.qty).toLocaleString("id-ID")}
                        </p>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-2 inline-flex items-center gap-2 text-[11px] font-bold text-red-400 hover:text-red-600"
                        >
                          <FaTrash size={11} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-[2rem] p-16 border-2 border-dashed border-slate-200 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-black text-slate-800">
                  Keranjang masih kosong
                </h3>
                <p className="text-sm text-slate-400 mt-2">
                  Silakan pilih menu catering terlebih dahulu.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT SUMMARY */}
          <div className="min-w-0">
            <div className="bg-[#0F1B3D] rounded-[2.3rem] p-7 text-white shadow-2xl overflow-hidden relative">
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#FF6B00]/30 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <FaReceipt className="text-[#F8B602] text-2xl" />
                </div>

                <h2 className="text-2xl font-black mb-2">Order Summary</h2>

                <p className="text-xs text-slate-400 mb-8">
                  Ringkasan pesanan catering yang akan diproses.
                </p>

                <div className="space-y-5 text-sm">
                  <div className="flex justify-between gap-4 text-slate-300">
                    <span className="flex items-center gap-2">
                      <FaShoppingBag />
                      Subtotal
                    </span>
                    <span className="font-bold text-white whitespace-nowrap">
                      Rp {subtotal.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-slate-300">
                    <span>Tax 10%</span>
                    <span className="font-bold text-white whitespace-nowrap">
                      Rp {tax.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-slate-300">
                    <span className="flex items-center gap-2">
                      <FaTruck />
                      Delivery
                    </span>
                    <span className="font-bold text-green-400">Free</span>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <p className="text-[10px] text-[#F8B602] font-bold uppercase tracking-[0.3em] mb-2">
                      Total Payment
                    </p>

                    <h3 className="text-4xl font-black">
                      Rp {total.toLocaleString("id-ID")}
                    </h3>
                  </div>
                </div>

                <button className="mt-8 w-full bg-[#FF6B00] hover:bg-white hover:text-[#FF6B00] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all duration-300">
                  Checkout Now
                  <FaArrowRight />
                </button>

                <p className="mt-6 text-center text-[10px] text-slate-500 uppercase tracking-[0.25em]">
                  Secure Order • CaterBox
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}