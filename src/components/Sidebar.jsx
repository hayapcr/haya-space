import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaShoppingCart,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-4 rounded-[2rem] font-semibold font-['Poppins'] transition-all duration-500 group relative overflow-hidden ${
      isActive
        ? "bg-[#F8B602] text-white shadow-[0_20px_50px_-15px_rgba(248,182,2,0.35)] scale-[1.03] z-10"
        : "text-[#6B7280] hover:text-[#F8B602] hover:bg-[#FFF8E1]"
    }`;

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-80 flex-col overflow-hidden border-r border-[#F3F4F6] bg-white p-8 font-['Poppins']">

      {/* BACKGROUND ACCENTS */}
      <div className="absolute top-[-10%] right-[-20%] w-64 h-64 bg-[#F8B602]/20 rounded-full blur-[100px] -z-10"></div>

      <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-[#FFCC00]/10 rounded-full blur-[100px] -z-10"></div>

      {/* LOGO SECTION */}
      <div className="flex items-center gap-4 mb-14 px-2 group cursor-pointer">
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-tr from-[#F8B602] to-[#FFCC00] rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-[#F8B602]/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <FaUtensils className="text-white text-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
          </div>

          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#22C55E] border-4 border-white rounded-full"></div>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1F2937] leading-none">
            CATER<span className="text-[#F8B602] italic">BOX</span>
          </h1>

          <p className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-[0.3em] mt-1">
            Partner Portal
          </p>
        </div>
      </div>

      {/* NAVIGATION SECTION */}
      <div className="space-y-2 flex-1">
        <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-[0.4em] mb-6 px-4">
          Overview
        </p>

        <nav className="flex flex-col gap-3">

          <NavLink to="/" className={linkClass}>
            <FaHome className="text-xl" />
            <span className="tracking-tight text-sm">Dashboard</span>

            <div className="absolute right-0 w-1.5 h-8 bg-white rounded-l-full opacity-0 group-[.active]:opacity-100 transition-opacity"></div>
          </NavLink>

          <NavLink to="/menu" className={linkClass}>
            <FaUtensils className="text-xl" />
            <span className="tracking-tight text-sm">Food Catalog</span>
          </NavLink>

          <NavLink to="/cart" className={linkClass}>
            <div className="relative">
              <FaShoppingCart className="text-xl" />

              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#FFCC00] text-[10px] text-white flex items-center justify-center rounded-full border-2 border-[#FFFFFF] font-semibold group-[.active]:bg-white group-[.active]:text-[#F8B602] transition-colors">
                3
              </span>
            </div>

            <span className="tracking-tight text-sm">My Orders</span>
          </NavLink>

          <NavLink to="/orders" className={linkClass}>
            <FaClipboardList className="text-xl" />
            <span className="tracking-tight text-sm">History Log</span>
          </NavLink>

        </nav>
      </div>

      {/* FOOTER SECTION */}
      <div className="mt-auto">
        <div className="relative bg-[#1F2937] rounded-[2.5rem] p-7 overflow-hidden group shadow-2xl shadow-[#F3F4F6]">

          {/* Glow Effect */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F8B602]/20 rounded-full blur-3xl group-hover:bg-[#F8B602]/40 transition-all duration-700"></div>

          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/10">
              <span className="text-white text-lg">✨</span>
            </div>

            <p className="text-white font-bold text-sm tracking-tight">
              CaterBox Premium
            </p>

            <p className="text-[#D1D5DB] text-[10px] font-medium mt-1 mb-5">
              Unlock 24/7 Priority Support
            </p>

            <button className="w-full py-3 bg-[#F8B602] hover:bg-[#FFCC00] text-white rounded-[1.2rem] text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 shadow-lg">
              Upgrade Now
            </button>
          </div>
        </div>

        {/* LOGOUT */}
        <button className="flex items-center justify-center gap-3 w-full mt-6 py-3 text-[#6B7280] hover:text-[#EF4444] font-medium text-xs transition-colors group">
          <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
          Sign Out Account
        </button>
      </div>

    </aside>
  );
}