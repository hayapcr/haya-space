import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function MemberPromo() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Member",
    email: "member@gmail.com",
  };

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const saveProfile = () => {
    alert("Profil berhasil disimpan");
  };

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
              Card Holder
            </p>
            <h3 className="mt-2 text-3xl font-black">{user.name}</h3>
          </div>

          <div className="mt-14 flex justify-between border-t border-white/20 pt-6">
            <p className="text-sm font-bold">Member Since: 12 Januari 2026</p>
            <p className="text-sm font-black text-[#FFD166]">Gold Tier</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#F2E7DB] bg-white p-10 shadow-lg">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Member Benefit
          </p>

          <h2 className="mt-4 text-5xl font-black text-[#FF7A1A]">GOLD</h2>

          <p className="mt-6 text-sm leading-relaxed text-slate-500">
            Member mendapatkan diskon khusus, voucher, dan akses promo catering.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-[2rem] border border-[#F2E7DB] bg-white shadow-sm">
        <div className="border-b border-[#F2E7DB] p-10">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5EC] text-2xl text-[#FF7A1A]">
              <FaUser />
            </div>

            <div>
              <h2 className="text-3xl font-black">Pengaturan Profil Akun</h2>
              <p className="mt-1 text-slate-500">
                Perbarui data personal, alamat pengiriman, dan kontak resmi.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 p-10 md:grid-cols-2">
          <div>
            <label className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF7A1A]">
              <FaUser />
              Nama Lengkap
            </label>
            <input
              value={user.name}
              readOnly
              className="w-full rounded-2xl border border-[#F2E7DB] bg-[#FFFDF9] px-5 py-4 outline-none"
            />
          </div>

          <div>
            <label className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF7A1A]">
              <FaEnvelope />
              Alamat Email
            </label>
            <input
              value={user.email}
              readOnly
              className="w-full rounded-2xl border border-[#F2E7DB] bg-[#FFFDF9] px-5 py-4 outline-none"
            />
          </div>

          <div>
            <label className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF7A1A]">
              <FaPhoneAlt />
              No. Telepon / WhatsApp
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Masukkan nomor WhatsApp"
              className="w-full rounded-2xl border border-[#F2E7DB] bg-[#FFFDF9] px-5 py-4 outline-none focus:border-[#FF7A1A]"
            />
          </div>

          <div>
            <label className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF7A1A]">
              <FaCalendarAlt />
              Terdaftar Sejak
            </label>
            <input
              value="12 Januari 2026"
              readOnly
              className="w-full rounded-2xl border border-[#F2E7DB] bg-[#FFFDF9] px-5 py-4 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF7A1A]">
              <FaMapMarkerAlt />
              Alamat Pengiriman Utama
            </label>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Masukkan alamat pengiriman utama"
              className="h-32 w-full rounded-2xl border border-[#F2E7DB] bg-[#FFFDF9] px-5 py-4 outline-none focus:border-[#FF7A1A]"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end border-t border-[#F2E7DB] p-10">
          <button
            onClick={saveProfile}
            className="rounded-2xl bg-[#FF7A1A] px-8 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-[#E86A0A]"
          >
            Simpan Perubahan
          </button>
        </div>
      </section>
    </div>
  );
}