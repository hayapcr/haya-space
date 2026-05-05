import { useState } from "react";
import data from "../data/menuData.json";

export default function Dashboard() {
  const [openForm, setOpenForm] = useState(false);

  const totalMenu = data.length;
  const totalRevenue = data.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6 lg:p-12 font-['Poppins'] text-[#1F2937] relative overflow-hidden">

      {/* BACKGROUND DECOR */}
      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-[#F8B602]/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#FFCC00]/20 rounded-full blur-[100px] -z-10"></div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-[#1F2937] text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg">
              Admin Panel
            </span>
            <div className="w-1.5 h-1.5 bg-[#D1D5DB] rounded-full"></div>
            <span className="text-[#6B7280] text-xs font-medium tracking-widest uppercase">
              System Overview
            </span>
          </div>

          <h1 className="text-6xl font-bold tracking-tight text-[#1F2937] leading-[0.9]">
            Main{" "}
            <span className="text-[#F8B602] italic font-semibold tracking-normal block md:inline">
              Control.
            </span>
          </h1>
        </div>

        <div className="flex items-center p-1.5 bg-white rounded-[2rem] shadow-xl border border-[#F3F4F6]">
          <button
            onClick={() => setOpenForm(true)}
            className="px-8 py-4 bg-[#F8B602] text-white rounded-[1.5rem] text-xs font-semibold uppercase tracking-widest hover:bg-[#FFCC00] transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            + Pesanan Baru
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {[
          { label: "Menu List", value: totalMenu, color: "text-[#F8B602]" },
          { label: "Total Revenue", value: `Rp ${totalRevenue.toLocaleString()}`, color: "text-[#1F2937]" },
          { label: "Daily Orders", value: "120", color: "text-[#22C55E]" }
        ].map((stat, i) => (
          <div
            key={i}
            className="group bg-white p-10 rounded-[3.5rem] border border-[#F3F4F6] shadow-lg hover:shadow-[#F8B602]/10 transition-all duration-500 hover:-translate-y-2"
          >
            <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-[0.3em] mb-4 group-hover:text-[#F8B602] transition-colors">
              {stat.label}
            </p>
            <h2 className={`text-4xl font-bold tracking-tight ${stat.color}`}>
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* GRID CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* REVENUE INSIGHTS */}
        <div className="lg:col-span-7 bg-[#1F2937] p-12 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F8B602]/20 rounded-full blur-[80px]"></div>

          <div className="flex justify-between items-center mb-12 relative z-10">
            <h2 className="text-2xl font-bold tracking-tight">Revenue Insights</h2>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-[#F8B602] rounded-full animate-ping"></div>
              <span className="text-[10px] font-medium text-[#D1D5DB] uppercase tracking-widest">
                Live Data
              </span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-6 h-72 relative z-10">
            {[30, 60, 45, 90, 55, 80, 100].map((h, i) => (
              <div key={i} className="flex-1 group">
                <div
                  className="bg-[#374151] group-hover:bg-[#F8B602] transition-all duration-700 rounded-[1rem] relative flex justify-center items-end overflow-hidden"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <p className="text-[9px] font-semibold text-center mt-4 text-[#9CA3AF] uppercase tracking-tighter group-hover:text-white transition-colors">
                  W-{i + 1}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
            <span className="text-[10px] font-semibold text-[#F8B602] uppercase cursor-pointer hover:underline">
              View All
            </span>
          </div>

          {[
            { name: "Andi", menu: "Nasi Box Special", status: "Done", color: "bg-[#22C55E]" },
            { name: "Siti", menu: "Snack Box Premium", status: "Pending", color: "bg-[#F59E0B]" },
            { name: "Budi", menu: "Coffee Arabica", status: "Cancel", color: "bg-[#EF4444]" },
          ].map((order, i) => (
            <div
              key={i}
              className="group bg-white p-6 rounded-[2rem] border border-[#F3F4F6] flex justify-between items-center hover:shadow-xl transition-all duration-500 border-l-4 border-l-transparent hover:border-l-[#F8B602]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F9FAFB] rounded-2xl flex items-center justify-center font-bold text-[#9CA3AF] group-hover:bg-[#FFF8E1] group-hover:text-[#F8B602] transition-colors">
                  {order.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-[#1F2937] leading-none mb-1">
                    {order.name}
                  </p>
                  <p className="text-[11px] text-[#6B7280] font-medium uppercase tracking-tighter">
                    {order.menu}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${order.color}`}></div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6B7280]">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP FORM */}
      {openForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl transform animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF8E1] rounded-full blur-3xl -z-10"></div>

            <h2 className="text-3xl font-bold tracking-tight mb-8 italic">
              New <span className="text-[#F8B602]">Order.</span>
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280] ml-2">
                  Customer Name
                </label>
                <input
                  placeholder="Ex: John Doe"
                  className="w-full p-4 bg-[#F9FAFB] border-none rounded-2xl focus:ring-2 focus:ring-[#F8B602] transition-all font-medium placeholder:text-[#9CA3AF] text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280] ml-2">
                  Menu Item
                </label>
                <input
                  placeholder="Ex: Nasi Goreng"
                  className="w-full p-4 bg-[#F9FAFB] border-none rounded-2xl focus:ring-2 focus:ring-[#F8B602] transition-all font-medium placeholder:text-[#9CA3AF] text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280] ml-2">
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full p-4 bg-[#F9FAFB] border-none rounded-2xl focus:ring-2 focus:ring-[#F8B602] transition-all font-medium placeholder:text-[#9CA3AF] text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-10">
              <button className="w-full py-4 bg-[#F8B602] text-white rounded-2xl font-semibold uppercase tracking-widest text-xs shadow-lg hover:bg-[#FFCC00] transition-all">
                Create Order
              </button>

              <button
                onClick={() => setOpenForm(false)}
                className="w-full py-4 bg-transparent text-[#6B7280] rounded-2xl font-semibold uppercase tracking-widest text-[10px] hover:text-[#EF4444] transition-all"
              >
                Cancel Process
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}