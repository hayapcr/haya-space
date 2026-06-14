import { useState } from "react";
import {
  FaBullhorn,
  FaGift,
  FaPercent,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";

export default function CampaignPromo() {
  const [promos] = useState([
    {
      id: 1,
      title: "Promo Paket Nasi Box",
      description: "Diskon khusus untuk pemesanan minimal 20 box.",
      discount: "15%",
      category: "Paket Catering",
      validUntil: "30 Juni 2026",
      status: "Aktif",
    },
    {
      id: 2,
      title: "Gratis Ongkir Area Pekanbaru",
      description: "Gratis biaya pengantaran untuk area tertentu.",
      discount: "Free Delivery",
      category: "Delivery",
      validUntil: "15 Juli 2026",
      status: "Aktif",
    },
    {
      id: 3,
      title: "Promo Member Baru",
      description: "Potongan harga untuk pelanggan yang baru mendaftar.",
      discount: "10%",
      category: "Member",
      validUntil: "31 Juli 2026",
      status: "Aktif",
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-['Poppins'] min-h-screen bg-slate-50/50 text-slate-800">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-5 py-2 bg-[#0F1B3D] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full">
            MEMBER AREA
          </span>

          <span className="text-gray-300">•</span>

          <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium">
            CAMPAIGN PROMO
          </span>
        </div>

        <h1 className="text-[72px] font-black leading-none text-[#0F1B3D]">
          Campaign <span className="italic text-[#FF6B00]">Promo.</span>
        </h1>

        <p className="mt-5 text-gray-500 text-sm font-medium">
          Menampilkan daftar promo dan campaign catering untuk member.
        </p>
      </div>

      {/* Info Card */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-[#F8B602] flex items-center justify-center text-white shadow-lg">
            <FaBullhorn className="text-2xl" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-[#0F1B3D]">
              Promo Catering Aktif
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Gunakan promo yang tersedia untuk mendapatkan penawaran terbaik.
            </p>
          </div>
        </div>
      </div>

      {/* Promo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 text-[#F8B602] flex items-center justify-center">
                <FaGift className="text-xl" />
              </div>

              <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-[11px] font-bold border border-green-100">
                {promo.status}
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-slate-900 mb-2">
              {promo.title}
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              {promo.description}
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-600">
                <FaPercent className="text-[#F8B602]" />
                <span className="font-semibold">{promo.discount}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <FaTag className="text-[#F8B602]" />
                <span>{promo.category}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <FaCalendarAlt className="text-[#F8B602]" />
                <span>Berlaku sampai {promo.validUntil}</span>
              </div>
            </div>

            <button className="mt-6 w-full py-3 bg-[#F8B602] hover:bg-amber-500 text-white rounded-2xl font-bold text-sm transition-all">
              Gunakan Promo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}