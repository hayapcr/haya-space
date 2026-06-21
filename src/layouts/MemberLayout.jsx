import { Outlet, Link, useNavigate } from "react-router-dom";

export default function MemberLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Poppins']">
      <nav className="flex items-center justify-between bg-white px-10 py-5 shadow-sm">
        <h1 className="text-2xl font-bold text-[#0F1B3D]">
          Member <span className="text-[#F8B602]">CaterBox</span>
        </h1>

        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link to="/member">Home</Link>
          <Link to="/member/orders">Pesanan Saya</Link>
          <Link to="/member/promo">Promo</Link>
          <span>{user?.name || "Member"}</span>
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        </div>
      </nav>

      <main className="p-10">
        <Outlet />
      </main>
    </div>
  );
}