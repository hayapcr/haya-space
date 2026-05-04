import { useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([
    { id: 1, name: "Nasi Box Special", price: 25000, qty: 2, desc: "Ayam Bakar + Sambal Terasi" },
    { id: 2, name: "Snack Box Premium", price: 15000, qty: 3, desc: "3 Kue + Air Mineral" },
  ]);

  const increaseQty = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-12 font-sans text-slate-900 relative overflow-hidden">
      {/* Background Decor (Menggunakan div standar tanpa import) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-100 rounded-full blur-[100px] opacity-50 -z-10"></div>
      
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 relative">

        {/* LEFT SIDE: LIST */}
        <div className="lg:col-span-8">
          <header className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-5xl font-black tracking-tighter italic text-slate-900">
                MY <span className="text-orange-500">CART</span>
              </h1>
              <p className="text-slate-400 font-medium mt-2 tracking-wide uppercase text-xs">
                {cart.length} Premium Selection Items
              </p>
            </div>

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-black text-red-500 uppercase tracking-widest hover:text-red-700 transition"
              >
                [ Clear All ]
              </button>
            )}
          </header>

          <div className="space-y-6">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-[2.5rem] p-6 flex flex-col md:flex-row items-center gap-8 border border-transparent hover:border-orange-200 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-orange-900/5 transition-all duration-500"
                >
                  {/* ICON BOX */}
                  <div className="relative">
                    <div className="w-28 h-28 bg-slate-50 rounded-[2rem] flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                      🍱
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center text-xs font-black">
                      #{item.id}
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-black text-xl text-slate-800 tracking-tight">{item.name}</h3>
                    <p className="text-sm text-slate-400 font-medium italic mt-1">"{item.desc}"</p>
                    <p className="text-orange-500 font-black mt-3">
                      Rp {item.price.toLocaleString()} <span className="text-slate-300 font-medium text-xs">/ unit</span>
                    </p>
                  </div>

                  {/* QTY CONTROLLER */}
                  <div className="flex items-center gap-5 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-10 h-10 bg-white rounded-xl shadow-sm font-black hover:bg-red-50 hover:text-red-500 transition active:scale-90"
                    >
                      -
                    </button>
                    <span className="font-black text-lg w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-10 h-10 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-200 font-black hover:bg-orange-500 transition active:scale-90"
                    >
                      +
                    </button>
                  </div>

                  {/* ITEM TOTAL */}
                  <div className="text-right flex flex-col items-center md:items-end gap-2">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Subtotal</p>
                    <p className="font-black text-2xl text-slate-900 tracking-tighter">
                      Rp {(item.price * item.qty).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] font-black text-slate-300 uppercase tracking-tighter hover:text-red-500 transition mt-1"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                <span className="text-6xl block mb-4 opacity-20">🛒</span>
                <p className="font-black text-slate-300 uppercase tracking-[0.3em]">Your tray is empty</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: SUMMARY */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white sticky top-10 shadow-2xl shadow-slate-400/20 overflow-hidden group">
            {/* Glossy Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-[80px] opacity-20 -mr-10 -mt-10 group-hover:opacity-40 transition duration-700"></div>
            
            <h2 className="text-2xl font-black mb-10 tracking-tight flex items-center gap-3">
              Order <span className="text-orange-400 italic font-medium tracking-normal text-lg">Summary</span>
            </h2>

            <div className="space-y-5 mb-10 relative z-10">
              <div className="flex justify-between text-slate-400 font-bold text-sm tracking-wide">
                <span>ITEMS TOTAL</span>
                <span className="text-white">Rp {total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-slate-400 font-bold text-sm tracking-wide">
                <span>TAX (10%)</span>
                <span className="text-white">Rp {(total * 0.1).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Delivery</span>
                <span className="text-green-400 font-black text-xs px-3 py-1 bg-green-400/10 rounded-full">FREE SHIPPING</span>
              </div>

              <div className="pt-6 flex flex-col gap-1">
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-[.3em]">Total Amount</p>
                <div className="flex justify-between items-end font-black">
                  <span className="text-4xl tracking-tighter">
                    Rp {(total + total * 0.1).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button className="relative w-full bg-orange-500 py-5 rounded-2xl font-black text-lg tracking-tight overflow-hidden hover:bg-white hover:text-orange-600 transition-all duration-300 transform active:scale-95 shadow-xl shadow-orange-500/20">
              <span className="relative z-10">CHECKOUT NOW</span>
            </button>
            
            <p className="text-center text-[9px] font-bold text-slate-500 mt-8 uppercase tracking-[0.3em]">
              Secure Transaction &bull; 2026
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}