import { FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MemberOrders() {
  return (
    <div>
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.8fr_1fr]">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#1F2937] via-[#2C2C2C] to-[#FF7A1A] p-10 text-white shadow-2xl">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#FFD166]">
            CaterBox Privilege
          </p>

          <h2 className="mt-3 text-4xl font-black">VIP ACCESS CARD</h2>

          <div className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-300">
              Tracking Status
            </p>
            <h3 className="mt-2 text-3xl font-black">Lacak Pesanan</h3>
          </div>

          <div className="mt-14 flex justify-between border-t border-white/20 pt-6">
            <p className="text-sm font-bold">Member Since: 12 Januari 2026</p>
            <p className="text-sm font-black text-[#FFD166]">
              20% Flat Discount
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#F2E7DB] bg-white p-10 shadow-lg">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Available Rewards Balance
          </p>

          <h2 className="mt-4 text-6xl font-black text-[#FF7A1A]">
            1,420 <span className="text-xl text-slate-500">POINTS</span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-slate-500">
            Poin dapat digunakan untuk potongan harga pesanan catering.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-5xl rounded-[2rem] border border-[#F2E7DB] bg-white p-20 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF5EC] text-3xl text-[#FF7A1A]">
          <FaBoxOpen />
        </div>

        <h2 className="mt-8 text-3xl font-black">Tidak Ada Pesanan Aktif</h2>

        <p className="mx-auto mt-4 max-w-lg text-slate-500">
          Anda belum memiliki pesanan catering aktif saat ini. Lakukan
          pemesanan pada halaman katalog untuk melihat pelacakan pesanan.
        </p>

        <Link
          to="/member"
          className="mt-8 inline-block rounded-2xl bg-[#FF7A1A] px-8 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-[#E86A0A]"
        >
          Mulai Belanja Sekarang
        </Link>
      </section>
    </div>
  );
}