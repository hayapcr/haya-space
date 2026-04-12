import { useState } from "react";
import data from "./TravellingData.json";

export default function TravelListSearchFilter() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.destination.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || item.category === category) &&
      (country === "" || item.country === country)
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto backdrop-blur-lg bg-white/95 rounded-[2rem] shadow-2xl overflow-hidden border border-white/20">

        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-700 to-indigo-800 p-10 text-white overflow-hidden">
          {/* Dekorasi Abstract */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-black tracking-tight mb-3 drop-shadow-md">
              ✈️ Explorer Dashboard
            </h1>
            <p className="text-blue-100 text-lg font-light tracking-wide">
              Temukan destinasi impian Anda dengan filter cerdas
            </p>
          </div>
        </div>

        <div className="p-6 md:p-10">
          {/* Search & Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 bg-slate-50/50 border border-slate-100 p-6 rounded-3xl shadow-inner">
            <div className="relative">
               <input
                type="text"
                placeholder="Cari destinasi..."
                className="w-full bg-white border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 p-4 pl-12 rounded-2xl transition-all shadow-sm outline-none"
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="absolute left-4 top-4 opacity-30">🔍</span>
            </div>

            <select
              className="bg-white border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 p-4 rounded-2xl transition-all shadow-sm outline-none appearance-none cursor-pointer"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">🌈 Semua Kategori</option>
              <option value="Pantai">Pantai</option>
              <option value="Pulau">Pulau</option>
              <option value="Gunung">Gunung</option>
              <option value="Kota">Kota</option>
              <option value="Sejarah">Sejarah</option>
            </select>

            <select
              className="bg-white border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 p-4 rounded-2xl transition-all shadow-sm outline-none appearance-none cursor-pointer"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">🌍 Semua Negara</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Japan">Japan</option>
              <option value="France">France</option>
            </select>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-2xl shadow-blue-900/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-200 uppercase text-xs tracking-[0.2em]">
                  <th className="p-5 font-semibold">ID</th>
                  <th className="p-5 font-semibold">Destinasi</th>
                  <th className="p-5 font-semibold">Kategori</th>
                  <th className="p-5 font-semibold">Negara</th>
                  <th className="p-5 font-semibold">Fasilitas</th>
                  <th className="p-5 font-semibold text-right">Harga</th>
                  <th className="p-5 font-semibold text-center">Rating</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="group transition-all hover:bg-blue-50/50"
                    >
                      <td className="p-5 text-slate-400 text-sm italic">#{item.id}</td>
                      <td className="p-5">
                        <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {item.destination}
                        </div>
                        <div className="text-xs text-slate-400">{item.location.city}</div>
                      </td>
                      <td className="p-5">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-5 text-slate-600 font-medium">{item.country}</td>
                      <td className="p-5">
                        {item.facilities.hotel ? (
                          <span className="flex items-center gap-1 text-emerald-600 text-sm font-semibold">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Hotel Tersedia
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm italic">Hanya Kunjungan</span>
                        )}
                      </td>
                      <td className="p-5 text-right font-mono font-bold text-slate-700">
                        Rp {item.price.toLocaleString()}
                      </td>
                      <td className="p-5 text-center">
                        <span className="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-600 rounded-lg border border-amber-100 font-bold">
                          ⭐ {item.rating}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-20 text-center">
                      <div className="flex flex-col items-center opacity-40">
                        <span className="text-6xl mb-4">🏝️</span>
                        <p className="text-xl font-medium">Ops! Destinasi tidak ditemukan</p>
                        <p className="text-sm italic">Coba gunakan kata kunci atau filter lain.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Status */}
          <div className="mt-8 flex justify-between items-center px-2">
            <div className="text-slate-500">
              Menampilkan <span className="text-blue-600 font-bold">{filteredData.length}</span> destinasi terbaik
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full opacity-20"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full opacity-40"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}