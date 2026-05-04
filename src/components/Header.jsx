import { FaBell, FaSearch } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useLocation } from "react-router-dom";
import profile from "../assets/profile.jpeg";

export default function Header({ search, setSearch }) {
  const location = useLocation();

  const pageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/menu":
        return "Food Menu";
      case "/cart":
        return "Cart";
      case "/orders":
        return "Orders";
      case "/login":
        return "Login";
      case "/register":
        return "Register";
      default:
        return "Catering App";
    }
  };

  return (
    <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-200 shadow-sm">

      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {pageTitle()} 🍽️
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Manage your catering system easily
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">


        {/* NOTIFICATION */}
        <button className="relative bg-slate-100 hover:bg-slate-200 transition p-3 rounded-2xl">
          <FaBell className="text-slate-600 text-lg" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* CART */}
        <button className="bg-orange-500 hover:bg-orange-600 transition text-white p-3 rounded-2xl shadow-lg">
          <HiOutlineShoppingBag className="text-xl" />
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 bg-slate-100 px-3 py-2 rounded-2xl cursor-pointer hover:bg-slate-200 transition">

          <img
            src={profile}
            alt="profile"
            className="w-11 h-11 rounded-full object-cover border-2 border-orange-400"
          />

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-700">
              Haya Nur Rizky
            </p>
            <p className="text-xs text-slate-400">
              Admin Catering
            </p>
          </div>

          <MdKeyboardArrowDown className="text-slate-500 text-xl" />
        </div>

      </div>
    </header>
  );
}