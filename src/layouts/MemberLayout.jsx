import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function MemberLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition ${
      isActive
        ? "bg-[#FF7A1A] text-white shadow-lg shadow-orange-200"
        : "text-slate-500 hover:text-[#FF7A1A]"
    }`;

  return (
    <div className="min-h-screen bg-[#FFFDF9] font-['Poppins'] text-[#111827]">
      <header className="sticky top-0 z-50 border-b border-[#F2E7DB] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#FF7A1A]">
              CaterBox Catering
            </p>
            <h1 className="text-3xl font-black leading-none">
              MEMBER PORTAL
            </h1>
          </div>

          <nav className="flex items-center gap-6">
            <NavLink end to="/member" className={navClass}>
              Belanja
            </NavLink>

            <NavLink to="/member/orders" className={navClass}>
              Lacak Pesanan
            </NavLink>

            <NavLink to="/member/promo" className={navClass}>
              Profil Akun
            </NavLink>

            <span className="h-8 w-px bg-slate-200"></span>

            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-red-500 hover:text-red-600"
            >
              <FaSignOutAlt />
              Keluar
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-8 py-12">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-[#F2E7DB] bg-white py-8">
        <div className="mx-auto flex max-w-7xl justify-between px-8 text-sm font-semibold text-slate-400">
          <p>© 2026 CaterBox Member Portal.</p>
          <p>Privacy Policy • Terms of Service</p>
        </div>
      </footer>
    </div>
  );
}