import { useState, useEffect } from "react";
import { FaCog, FaStore, FaCalculator, FaShieldAlt } from "react-icons/fa";
import Container from "../components/Container";

export default function Settings() {
  const [settings, setSettings] = useState({
    name: "CaterBox CRM & Catering Management",
    email: "partner@caterbox.com",
    phone: "021-5555666",
    address: "Sudirman Central Business District, Jakarta",
    taxRate: 10,
    pointFormula: 10000,
  });

  const [success, setSuccess] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("caterbox_settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: name === "taxRate" || name === "pointFormula" ? Number(value) : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("caterbox_settings", JSON.stringify(settings));
    setSuccess("Pengaturan portal berhasil disimpan!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <Container>
      <div className="w-full min-h-screen bg-[#F8F9FB] p-4 md:p-6 lg:p-8 font-['Poppins'] text-[#4B5563]">
        
        {/* HEADER */}
        <div className="border-b border-[#ECECEC] pb-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-5 py-2 bg-[#1F2937] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
              SYSTEM CONFIGURATION
            </span>
            <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full"></div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-bold">
              SETTINGS PORTAL
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#1F2937] tracking-tight">
            System <span className="text-[#FFB400] italic">Settings.</span>
          </h1>
          <p className="mt-3 text-slate-500 text-sm max-w-xl">
            Atur parameter operasional catering, detail kontak perusahaan, kalkulasi poin member, dan rasio pajak.
          </p>
        </div>

        {/* NOTIFICATION */}
        {success && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 shadow-sm flex items-center gap-3">
            <span>✨</span>
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}

        {/* SETTINGS CARD */}
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* SECTION 1: SHOP INFO */}
          <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3 border-b border-[#ECECEC] pb-4 mb-4">
              <FaStore className="text-[#FFB400] text-lg" />
              <h3 className="font-extrabold text-base text-[#1F2937]">Informasi Outlet & Katering</h3>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Nama Outlet / Portal</label>
              <input
                type="text"
                name="name"
                value={settings.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Layanan</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Nomor Telepon Kantor</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Alamat Utama Outlet</label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows="3"
                required
                className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
              ></textarea>
            </div>
          </div>

          {/* SECTION 2: CALCULATIONS */}
          <div className="space-y-6">
            <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-[#ECECEC] pb-4 mb-2">
                <FaCalculator className="text-[#FFB400] text-lg" />
                <h3 className="font-extrabold text-base text-[#1F2937]">Kalkulasi Keuangan</h3>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Pajak Pertambahan Nilai (PPN %)</label>
                <input
                  type="number"
                  name="taxRate"
                  value={settings.taxRate}
                  onChange={handleChange}
                  required
                  min="0"
                  max="100"
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Formula Poin Member (Rp per 1 pts)</label>
                <input
                  type="number"
                  name="pointFormula"
                  value={settings.pointFormula}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs outline-none focus:border-[#FFB400]"
                />
                <p className="text-[10px] text-[#9CA3AF] mt-1.5 leading-relaxed">
                  Default: Rp 10.000 = 1 reward point. Transaksi di bawah nominal ini tidak mendapat poin.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[20px] border border-[#ECECEC] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-[#ECECEC] pb-4 mb-2">
                <FaShieldAlt className="text-[#FFB400] text-lg" />
                <h3 className="font-extrabold text-base text-[#1F2937]">Otoritas & Akses</h3>
              </div>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Anda login menggunakan akun Administrator. Semua perubahan konfigurasi di atas akan langsung sinkron di sisi partner portal dan katering pelanggan.
              </p>
              <button
                type="submit"
                className="w-full py-3.5 bg-[#FFB400] hover:bg-[#E0A000] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/10 transition"
              >
                Simpan Konfigurasi
              </button>
            </div>
          </div>

        </form>

      </div>
    </Container>
  );
}
