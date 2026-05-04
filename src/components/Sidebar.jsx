import { NavLink } from "react-router-dom";
import { FaHome, FaUtensils, FaShoppingCart, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-4 rounded-[2rem] font-black transition-all duration-500 group relative overflow-hidden ${
      isActive
        ? "bg-slate-900 text-white shadow-[0_20px_50px_-15px_rgba(15,23,42,0.4)] scale-[1.03] z-10"
        : "text-slate-400 hover:text-orange-500 hover:bg-orange-50/50"
    }`;

  return (
    <aside className="w-80 h-screen bg-[#FCFCFC] border-r border-slate-100 p-8 flex flex-col relative overflow-hidden">
      
      {/* BACKGROUND ACCENTS (Hanya menggunakan DIV bawaan) */}
      <div className="absolute top-[-10%] right-[-20%] w-64 h-64 bg-orange-100/40 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-blue-100/30 rounded-full blur-[100px] -z-10"></div>

      {/* LOGO SECTION - More Dynamic */}
      <div className="flex items-center gap-4 mb-14 px-2 group cursor-pointer">
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-orange-200 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <FaUtensils className="text-white text-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
            CATER<span className="text-orange-500 italic">BOX</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] mt-1">Partner Portal</p>
        </div>
      </div>

      {/* NAVIGATION SECTION */}
      <div className="space-y-2 flex-1">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6 px-4">
          Overview
        </p>
        
        <nav className="flex flex-col gap-3">
          <NavLink to="/" className={linkClass}>
            <FaHome className="text-xl" /> 
            <span className="tracking-tight text-sm">Dashboard</span>
            <div className="absolute right-0 w-1.5 h-8 bg-orange-500 rounded-l-full opacity-0 group-[.active]:opacity-100 transition-opacity"></div>
          </NavLink>

          <NavLink to="/menu" className={linkClass}>
            <FaUtensils className="text-xl" /> 
            <span className="tracking-tight text-sm">Food Catalog</span>
          </NavLink>

          <NavLink to="/cart" className={linkClass}>
            <div className="relative">
               <FaShoppingCart className="text-xl" />
               <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-[10px] text-white flex items-center justify-center rounded-full border-2 border-[#FCFCFC] font-black group-[.active]:bg-white group-[.active]:text-orange-500 transition-colors">3</span>
            </div>
            <span className="tracking-tight text-sm">My Orders</span>
          </NavLink>

          <NavLink to="/orders" className={linkClass}>
            <FaClipboardList className="text-xl" /> 
            <span className="tracking-tight text-sm">History Log</span>
          </NavLink>
        </nav>
      </div>

      {/* FOOTER SECTION - Glassmorphism Card */}
      <div className="mt-auto">
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-7 overflow-hidden group shadow-2xl shadow-slate-200">
          {/* Animated Glow Effect */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/40 transition-all duration-700"></div>
          
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/10">
              <span className="text-white text-lg">✨</span>
            </div>
            <p className="text-white font-black text-sm tracking-tight">CaterBox Premium</p>
            <p className="text-slate-400 text-[10px] font-bold mt-1 mb-5">Unlock 24/7 Priority Support</p>
            
            <button className="w-full py-3 bg-orange-500 hover:bg-white hover:text-orange-600 text-white rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-orange-950/20">
              Upgrade Now
            </button>
          </div>
        </div>

        {/* LOGOUT MINI */}
        <button className="flex items-center justify-center gap-3 w-full mt-6 py-3 text-slate-400 hover:text-red-500 font-bold text-xs transition-colors group">
          <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
          Sign Out Account
        </button>
      </div>
      
    </aside>
  );
}