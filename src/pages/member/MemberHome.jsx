export default function MemberHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="rounded-[3rem] bg-white p-10 shadow-xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#F8B602]">
          Member Area
        </p>

        <h1 className="text-5xl font-black text-[#0F1B3D]">
          Halo, {user?.name || "Member"} 👋
        </h1>

        <p className="mt-4 text-gray-500">
          Di halaman ini member dapat melihat pesanan, promo, dan informasi
          membership catering.
        </p>
      </div>
    </div>
  );
}