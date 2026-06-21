import { Outlet, Link } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-[#FFF9EC] font-['Poppins']">
      {/* <nav className="flex items-center justify-between px-10 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-[#1F2937]">
          CATER<span className="text-[#F8B602] italic">BOX</span>
        </h1>

        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link to="/">Home</Link>
          <Link to="/company-profile">Company Profile</Link>
          <Link
            to="/login"
            className="rounded-full bg-[#F8B602] px-6 py-3 text-white"
          >
            Login
          </Link>
        </div>
      </nav> */}

      <Outlet />
    </div>
  );
}