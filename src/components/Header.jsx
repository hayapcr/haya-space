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
    <header className="bg-[#FFFFFF] px-8 py-5 flex items-center justify-between border-b border-[#F3F4F6] shadow-sm font-['Poppins']">

      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-bold text-[#1F2937]">
          {pageTitle()} 🍽️
        </h1>

        <p className="text-sm text-[#6B7280] mt-1 font-medium">
          Manage your catering system easily
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* NOTIFICATION */}
        <button className="relative bg-[#F9FAFB] hover:bg-[#F3F4F6] transition p-3 rounded-2xl">
          <FaBell className="text-[#6B7280] text-lg" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </button>

        {/* CART */}
        <button className="bg-[#F8B602] hover:bg-[#FFCC00] transition text-white p-3 rounded-2xl shadow-lg">
          <HiOutlineShoppingBag className="text-xl" />
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 bg-[#F9FAFB] px-3 py-2 rounded-2xl cursor-pointer hover:bg-[#F3F4F6] transition">

          <img
            src={profile}
            alt="profile"
            className="w-11 h-11 rounded-full object-cover border-2 border-[#F8B602]"
          />

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-[#1F2937]">
              Haya Nur Rizky
            </p>

            <p className="text-xs text-[#6B7280] font-medium">
              Admin Catering
            </p>
          </div>

          <MdKeyboardArrowDown className="text-[#6B7280] text-xl" />
        </div>

      </div>
    </header>
  );
}