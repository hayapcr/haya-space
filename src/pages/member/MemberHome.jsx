import { useState } from "react";
import { FaGift, FaShoppingCart, FaStar } from "react-icons/fa";

export default function MemberHome() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Member",
    email: "member@gmail.com",
  };

  const [category, setCategory] = useState("All Categories");
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      name: "Nasi Box Special",
      category: "Nasi Box",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
      description:
        "Paket nasi box lengkap dengan ayam bakar, sayur, sambal, dan buah.",
      price: 25000,
      memberPrice: 20000,
      promo: true,
    },
    {
      id: 2,
      name: "Snack Box Premium",
      category: "Snack Box",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
      description: "Snack box premium untuk meeting, seminar, dan gathering.",
      price: 18000,
      memberPrice: 15000,
      promo: true,
    },
    {
      id: 3,
      name: "Paket Prasmanan",
      category: "Prasmanan",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
      description: "Paket prasmanan lengkap untuk acara keluarga maupun kantor.",
      price: 50000,
      memberPrice: 45000,
      promo: false,
    },
    {
      id: 4,
      name: "Paket Wedding",
      category: "Wedding",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      description: "Catering premium untuk pesta pernikahan.",
      price: 75000,
      memberPrice: 68000,
      promo: true,
    },
    {
      id: 5,
      name: "Healthy Lunch Box",
      category: "Healthy",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
      description: "Menu sehat dengan kalori seimbang.",
      price: 30000,
      memberPrice: 25000,
      promo: false,
    },
    {
      id: 6,
      name: "Coffee Break Box",
      category: "Coffee Break",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
      description: "Snack dan kopi untuk meeting atau seminar.",
      price: 20000,
      memberPrice: 17000,
      promo: true,
    },
  ];

  const categories = [
    "All Categories",
    "Nasi Box",
    "Snack Box",
    "Prasmanan",
    "Wedding",
    "Healthy",
    "Coffee Break",
  ];

  const filteredProducts =
    category === "All Categories"
      ? products
      : products.filter((item) => item.category === category);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    alert(`${item.name} berhasil dimasukkan ke keranjang`);
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong");
      return;
    }

    alert(`Checkout berhasil. Total item: ${cart.length}`);
  };

  return (
    <div>
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.8fr_1fr]">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#1F2937] via-[#2C2C2C] to-[#FF7A1A] p-10 text-white shadow-2xl">
          <div className="absolute right-10 top-10 h-16 w-20 rounded-xl bg-gradient-to-br from-[#FFD166] to-[#FFB000] shadow-lg"></div>

          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#FFD166]">
            CaterBox Privilege
          </p>

          <h2 className="mt-3 text-4xl font-black">VIP ACCESS CARD</h2>

          <div className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-300">
              Card Holder
            </p>
            <h3 className="mt-2 text-3xl font-black">{user.name}</h3>
          </div>

          <div className="mt-14 flex justify-between border-t border-white/20 pt-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                Member Since
              </p>
              <p className="mt-1 text-sm font-bold">12 Januari 2026</p>
            </div>

            <div className="text-right">
              <span className="rounded-full border border-[#FFD166]/60 bg-white/10 px-5 py-2 text-sm font-black text-[#FFD166]">
                ● GOLD TIER
              </span>

              <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                Exclusive Benefit
              </p>
              <p className="text-sm font-black text-[#FFD166]">
                20% Flat Discount
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#F2E7DB] bg-white p-10 shadow-lg">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Available Rewards Balance
          </p>

          <h2 className="mt-4 text-6xl font-black text-[#FF7A1A]">
            1,420 <span className="text-xl text-slate-500">POINTS</span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-slate-500">
            Poin diperoleh dari setiap transaksi catering. Tukarkan poin dengan
            voucher diskon, gratis ongkir, atau paket catering khusus.
          </p>

          <div className="my-6 border-t border-slate-100"></div>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5EC] text-2xl text-[#FF7A1A]">
              <FaGift />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Next Tier Progress
              </p>
              <h3 className="font-black">80 PTS to Platinum Tier</h3>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#F2E7DB] bg-white px-8 py-5 text-center shadow-sm">
        <span className="font-black tracking-[0.25em] text-[#FF7A1A]">
          1. Katalog
        </span>

        <span className="mx-8 text-slate-300">/</span>

        <button
          onClick={checkout}
          className="font-black tracking-[0.25em] text-slate-400 hover:text-[#FF7A1A]"
        >
          2. Checkout
        </button>
      </div>

      <section className="mt-14">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-4xl font-black">CaterBox Signature Menu</h2>
            <p className="mt-2 text-slate-500">
              Paket catering eksklusif khusus untuk member.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-2xl border px-5 py-3 text-xs font-black uppercase transition ${
                  category === item
                    ? "bg-[#FF7A1A] text-white"
                    : "bg-white text-slate-500 hover:text-[#FF7A1A]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
          <FaShoppingCart className="text-[#FF7A1A]" />

          <p className="font-bold text-slate-600">
            Total item di keranjang: {cart.length}
          </p>

          <button
            onClick={checkout}
            className="ml-auto rounded-xl bg-[#FF7A1A] px-5 py-2 text-sm font-bold text-white hover:bg-[#E86A0A]"
          >
            Checkout
          </button>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[2rem] border border-[#F2E7DB] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-lg bg-white px-4 py-2 text-[10px] font-black uppercase shadow">
                  {item.category}
                </span>

                {item.promo && (
                  <span className="absolute right-4 top-4 rounded-lg bg-red-500 px-4 py-2 text-[10px] font-black uppercase text-white shadow">
                    % Promo
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-black">{item.name}</h3>

                <div className="mt-3 flex gap-1 text-[#FFB000]">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} size={13} />
                  ))}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>

                <div className="mt-6 rounded-2xl bg-[#FFFDF9] p-4">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Harga Normal:</span>
                    <span className="line-through">
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="font-black text-[#FF7A1A]">
                      Harga Member:
                    </span>

                    <span className="text-xl font-black">
                      Rp {item.memberPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-6 w-full rounded-2xl bg-[#FF7A1A] py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-[#E86A0A]"
                >
                  Masukkan Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}