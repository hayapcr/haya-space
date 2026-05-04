import { useState } from "react";
import data from "../data/menuData.json";

export default function Dashboard() {
  const [openForm, setOpenForm] = useState(false);

  const totalMenu = data.length;
  const totalRevenue = data.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-6 lg:p-12 font-sans text-slate-800 relative overflow-hidden">

      {/* BACKGROUND DECOR - Enhanced Opacity & Blur */}
      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] -z-10"></div>

      {/* HEADER - More Editorial Look */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-slate-200">
              Admin Panel
            </span>
            <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
            <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">System Overview</span>
          </div>

          <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            Main <span className="text-orange-500 italic font-medium tracking-normal block md:inline">Control.</span>
          </h1>
        </div>

        <div className="flex items-center p-1.5 bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100/50 backdrop-blur-sm">
          <button
            onClick={() => setOpenForm(true)}
            className="px-8 py-4 bg-orange-500 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-orange-200"
          >
            + Pesanan Baru
          </button>
        </div>
      </div>

      {/* STAT CARDS - Floating Effect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {[
          { label: "Menu List", value: totalMenu, color: "text-orange-500" },
          { label: "Total Revenue", value: `Rp ${totalRevenue.toLocaleString()}`, color: "text-slate-900" },
          { label: "Daily Orders", value: "120", color: "text-blue-500" }
        ].map((stat, i) => (
          <div key={i} className="group bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4 group-hover:text-orange-500 transition-colors">{stat.label}</p>
            <h2 className={`text-4xl font-black tracking-tighter ${stat.color}`}>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* GRID CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* REVENUE INSIGHTS - Dark Mode Premium */}
        <div className="lg:col-span-7 bg-slate-900 p-12 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]"></div>
          
          <div className="flex justify-between items-center mb-12 relative z-10">
            <h2 className="text-2xl font-black tracking-tight">Revenue Insights</h2>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Data</span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-6 h-72 relative z-10">
            {[30, 60, 45, 90, 55, 80, 100].map((h, i) => (
              <div key={i} className="flex-1 group">
                <div
                  className="bg-slate-800 group-hover:bg-orange-500 transition-all duration-700 rounded-[1rem] relative flex justify-center items-end overflow-hidden"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <p className="text-[9px] font-black text-center mt-4 text-slate-500 uppercase tracking-tighter group-hover:text-white transition-colors">W-{i + 1}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY - Clean & Minimal */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-black tracking-tight">Recent Activity</h2>
            <span className="text-[10px] font-black text-orange-500 uppercase cursor-pointer hover:underline">View All</span>
          </div>

          {[
            { name: "Andi", menu: "Nasi Box Special", status: "Done", color: "bg-green-500" },
            { name: "Siti", menu: "Snack Box Premium", status: "Pending", color: "bg-orange-400" },
            { name: "Budi", menu: "Coffee Arabica", status: "Cancel", color: "bg-red-400" },
          ].map((order, i) => (
            <div key={i} className="group bg-white p-6 rounded-[2rem] border border-slate-50 flex justify-between items-center hover:shadow-xl hover:shadow-slate-100 transition-all duration-500 border-l-4 border-l-transparent hover:border-l-orange-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-300 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                  {order.name[0]}
                </div>
                <div>
                  <p className="font-black text-slate-800 leading-none mb-1">{order.name}</p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">{order.menu}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${order.color}`}></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP FORM - Modern Overlay */}
      {openForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl transform animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -z-10"></div>
            
            <h2 className="text-3xl font-black tracking-tighter mb-8 italic">New <span className="text-orange-500">Order.</span></h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Customer Name</label>
                <input placeholder="Ex: John Doe" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all font-bold placeholder:text-slate-300 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Menu Item</label>
                <input placeholder="Ex: Nasi Goreng" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all font-bold placeholder:text-slate-300 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Quantity</label>
                <input type="number" placeholder="0" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all font-bold placeholder:text-slate-300 text-sm" />
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-10">
              <button className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-200 hover:bg-slate-900 transition-all">
                Create Order
              </button>
              <button
                onClick={() => setOpenForm(false)}
                className="w-full py-4 bg-transparent text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:text-red-500 transition-all"
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