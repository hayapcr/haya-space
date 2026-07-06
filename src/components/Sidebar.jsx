import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaShoppingCart,
  FaClipboardList,
  FaSignOutAlt,
  FaUsers,
  FaBullhorn,
  FaCrown,
  FaComments,
  FaTags,
  FaBoxOpen,
  FaTruck,
  FaCog,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center justify-between px-5 py-3 rounded-[1.5rem] font-semibold font-['Poppins'] transition-all duration-300 ${
      isActive
        ? "bg-[#F8B602] text-white shadow-lg shadow-[#F8B602]/25"
        : "text-[#6B7280] hover:text-[#F8B602] hover:bg-[#FFF8E1]"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const SectionTitle = ({ children }) => (
    <p className="mt-8 mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.45em] text-[#9CA3AF]">
      {children}
    </p>
  );

  const Badge = ({ children }) => (
    <span className="rounded-full bg-[#FFF8E1] px-2 py-1 text-[9px] font-black text-[#F8B602]">
      {children}
    </span>
  );

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-80 flex-col overflow-y-auto border-r border-[#F3F4F6] bg-white px-6 py-7 font-['Poppins']">
      {/* LOGO */}
      <div className="mb-10 flex items-center gap-4">
        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-gradient-to-tr from-[#F8B602] to-[#FFCC00] text-white shadow-xl">
            <FaUtensils className="text-2xl" />
          </div>
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-white bg-[#22C55E]" />
        </div>

        <div>
          <h1 className="text-2xl font-bold leading-none text-[#1F2937]">
            CATER<span className="italic text-[#F8B602]">BOX</span>
          </h1>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-[#9CA3AF]">
            Partner Portal
          </p>
        </div>
      </div>

      <nav className="flex-1">
        <SectionTitle>Utama</SectionTitle>

        <NavLink to="/dashboard" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaHome />
            Dashboard
          </span>
        </NavLink>

        <SectionTitle>CRM & Pemasaran</SectionTitle>

        <NavLink to="/crm" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaShieldAlt />
            CRM Center
          </span>
        </NavLink>

        <NavLink to="/users" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaUsers />
            Customer CRM
          </span>
        </NavLink>

        <NavLink to="/membership" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaCrown />
            Membership
          </span>
          <Badge>LOYAL</Badge>
        </NavLink>

        <NavLink to="/campaign-promo" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaBullhorn />
            Campaign Promo
          </span>
          <Badge>NEW</Badge>
        </NavLink>

        <NavLink to="/feedback" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaComments />
            Feedback
          </span>
        </NavLink>

        <NavLink to="/program-sale" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaTags />
            Program Sale
          </span>
          <Badge>50%</Badge>
        </NavLink>

        <SectionTitle>Menu & Produk</SectionTitle>

        <NavLink to="/menu" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaUtensils />
            Food Catalog
          </span>
        </NavLink>

        <NavLink to="/paket-catering" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaBoxOpen />
            Paket Catering
          </span>
          <Badge>VIP</Badge>
        </NavLink>

        <NavLink to="/stock" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaBoxOpen />
            Stock Bahan
          </span>
        </NavLink>

        <NavLink to="/supplier" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaTruck />
            Data Supplier
          </span>
        </NavLink>

        <SectionTitle>Transaksi Catering</SectionTitle>

        <NavLink to="/cart" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaShoppingCart />
            Pesanan Masuk
          </span>
          <Badge>3</Badge>
        </NavLink>

        <NavLink to="/orders" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaClipboardList />
            Riwayat Pesanan
          </span>
        </NavLink>

        <NavLink to="/laporan" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaChartLine />
            Laporan Bisnis
          </span>
        </NavLink>

        <SectionTitle>Sistem & Otentikasi</SectionTitle>

        <NavLink to="/settings" className={linkClass}>
          <span className="flex items-center gap-3">
            <FaCog />
            Pengaturan
          </span>
        </NavLink>
      </nav>

      <div className="mt-8 border-t border-slate-200 pt-5">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-5 py-3 text-sm font-semibold text-[#EF4444] hover:bg-red-50"
        >
          <FaSignOutAlt />
          Keluar Portal
        </button>
      </div>
    </aside>
  );
}