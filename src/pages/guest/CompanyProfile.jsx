import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Layers,
  Map,
  Copy,
  Check,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Mail,
  User,
  HelpCircle,
  Activity,
  Workflow,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function CompanyProfile() {
  const [activeTab, setActiveTab] = useState("bab1");
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const tabs = [
    { id: "bab1", label: "BAB I: Ringkasan", icon: <FileText className="h-4 w-4" /> },
    { id: "bab2", label: "BAB II: PRD V1", icon: <Layers className="h-4 w-4" /> },
    { id: "bab3", label: "BAB III: PRD V2", icon: <Layers className="h-4 w-4" /> },
    { id: "bab4", label: "BAB IV: PRD V3", icon: <Layers className="h-4 w-4" /> },
    { id: "diagrams", label: "Sitemap & Alur", icon: <Map className="h-4 w-4" /> },
    { id: "copywriting", label: "Landing Page Copy", icon: <Copy className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] font-sans text-gray-800 selection:bg-[#FF7A1A] selection:text-white">
      
      {/* HEADER (ORANGE STYLE) */}
      <header className="bg-white border-b border-orange-100/50 sticky top-0 z-40 shadow-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍱</span>
            <span className="text-xl font-bold font-poppins text-gray-900">
              Cater<span className="text-[#FF7A1A]">Box</span> <span className="text-xs font-semibold uppercase tracking-wider bg-[#FF7A1A] text-white px-2 py-0.5 rounded-full ml-1">PRD Doc</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7A1A] hover:underline"
            >
              Kembali ke Landing Page <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-6 py-8 md:px-8 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 items-start">
        
        {/* SIDEBAR TABS (ORANGE STYLE) */}
        <aside className="sticky top-20 z-30 bg-white border border-orange-100/60 rounded-2xl p-4 shadow-sm space-y-1.5 text-left w-full">
          <div className="px-3 pb-3 mb-3 border-b border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Daftar Isi PRD</p>
            <h4 className="text-xs font-bold text-gray-800 mt-1">Evolusi CaterBox CRM</h4>
          </div>
          
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#FF7A1A] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          
          <div className="pt-4 mt-4 border-t border-gray-100 px-3">
            <a
              href="file:///C:/Users/ASUS/haya-space/CATERBOX_CRM_PRD_DOCUMENT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#FF7A1A] hover:underline"
            >
              Buka File Raw MD <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <section className="bg-white border border-orange-100/60 rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm text-left">
          
          {/* TAB 1: BAB I - EXECUTIVE SUMMARY */}
          {activeTab === "bab1" && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">BAB I</span>
                <h2 className="text-3xl font-black text-gray-900 font-poppins mt-1">Executive Summary</h2>
              </div>
              
              <div className="rounded-2xl bg-[#FFF8F0]/50 border border-orange-100/40 p-5 space-y-2">
                <h4 className="text-xs font-bold text-[#FF7A1A] uppercase">1.1 Visi Produk</h4>
                <p className="text-xs leading-relaxed text-gray-600">
                  Menjadi platform Customer Relationship Management (CRM) berbasis SaaS khusus catering nomor satu yang membantu pengusaha catering mengotomasi operasional mereka, meningkatkan retensi pelanggan melalui loyalty program, serta menyajikan analitik bisnis berbasis data yang mendalam.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins">1.2 Latar Belakang & Masalah</h3>
                <p className="text-xs leading-relaxed text-gray-500">
                  Industri kuliner catering menghadapi tantangan unik dalam mempertahankan pelanggan korporasi maupun individu. Sebagian besar pengusaha catering mengelola data pesanan, langganan harian, membership point, dan promo menggunakan spreadsheet manual atau pesan instan WhatsApp. Masalah utamanya meliputi:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <li className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                    <span className="text-lg font-bold">📋</span>
                    <h4 className="text-xs font-extrabold text-gray-800">Pelacakan Manual Lambat</h4>
                    <p className="text-[10px] leading-relaxed text-gray-400">Pencatatan pesanan berulang rawan selisih data dan memerlukan input ulang harian.</p>
                  </li>
                  <li className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                    <span className="text-lg font-bold">🤝</span>
                    <h4 className="text-xs font-extrabold text-gray-800">Hubungan Tidak Terstruktur</h4>
                    <p className="text-[10px] leading-relaxed text-gray-400">Sulit memetakan pelanggan mana yang loyal dan kapan waktu tepat mengirim diskon/promo.</p>
                  </li>
                  <li className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                    <span className="text-lg font-bold">⚠️</span>
                    <h4 className="text-xs font-extrabold text-gray-800">Churn Rate Tinggi</h4>
                    <p className="text-[10px] leading-relaxed text-gray-400">Riwayat keluhan pelanggan tidak terpusat menyebabkan respons perbaikan lambat.</p>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins">1.3 Tujuan Bisnis Utama</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2.5 text-xs text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A1A]"></span>
                    <span>Mengakuisisi minimal 200 pemilik catering aktif dalam 6 bulan pertama perilisan.</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A1A]"></span>
                    <span>Membantu partner catering menaikkan retensi pelanggan (repeat orders) mereka sebesar 35%.</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A1A]"></span>
                    <span>Mengurangi waktu administrasi pemrosesan pesanan katering hingga 60% menggunakan dashboard otomatis.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: BAB II - PRD V1 */}
          {activeTab === "bab2" && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">BAB II</span>
                <h2 className="text-3xl font-black text-gray-900 font-poppins mt-1">PRD V1 — Versi Dasar (MVP)</h2>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins">2.1 Sasaran Produk V1</h3>
                <p className="text-xs leading-relaxed text-gray-500">
                  Memperkenalkan konsep digitalisasi CRM CaterBox kepada pengusaha catering lokal serta memicu minat pendaftaran akun uji coba dasar. Poin krusial adalah edukasi pasar mengenai efisiensi otomatisasi katering.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins">2.2 Target Pengguna Awal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="text-xs font-extrabold text-[#FF7A1A] font-poppins">1. Pemilik & Admin Catering</h4>
                    <p className="text-[11px] leading-relaxed text-gray-400 mt-1">Staf operasional yang kewalahan menginput pesanan berkala dan menghitung total omzet bulanan.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="text-xs font-extrabold text-[#FF7A1A] font-poppins">2. Pelanggan Katering Korporat</h4>
                    <p className="text-[11px] leading-relaxed text-gray-400 mt-1">Perusahaan yang mengontrak makanan siang kantor secara bulanan dan membutuhkan invoice rapi.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins">2.3 4 Pilar Fitur Utama V1</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl border border-gray-100 text-center">
                    <span className="text-2xl block mb-2">👥</span>
                    <span className="text-xs font-bold text-gray-800">Customer Management</span>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-100 text-center">
                    <span className="text-2xl block mb-2">📦</span>
                    <span className="text-xs font-bold text-gray-800">Order Management</span>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-100 text-center">
                    <span className="text-2xl block mb-2">💳</span>
                    <span className="text-xs font-bold text-gray-800">Payment Status</span>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-100 text-center">
                    <span className="text-2xl block mb-2">🎖️</span>
                    <span className="text-xs font-bold text-gray-800">Basic Membership</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BAB III - PRD V2 */}
          {activeTab === "bab3" && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">BAB III</span>
                <h2 className="text-3xl font-black text-gray-900 font-poppins mt-1">PRD V2 — Versi Menengah</h2>
              </div>

              {/* User Persona */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins">3.1 Target User Personas & Pain Points</h3>
                <div className="space-y-4">
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">👩‍💼</span>
                      <h4 className="font-extrabold text-gray-800">Persona 1: Ibu Ratna (Pemilik Catering)</h4>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      <b>Pain Points:</b> Kesulitan melacak pelanggan langganan bulanan harian. Kadang salah rekap WhatsApp berujung pengiriman terlewat.
                      <br /><b>Goals:</b> Dasbor digital terpusat untuk jadwal otomatisasi pengantaran.
                    </p>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">👨‍💻</span>
                      <h4 className="font-extrabold text-gray-800">Persona 2: Budi (Admin Operasional)</h4>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      <b>Pain Points:</b> Lelah memeriksa mutasi rekening satu per satu dan mencatat poin loyalitas member secara manual di kertas/buku.
                      <br /><b>Goals:</b> Otomatisasi validasi pembayaran transfer bank dan poin keanggotaan ter-update instan.
                    </p>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">👤</span>
                      <h4 className="font-extrabold text-gray-800">Persona 3: Doni (Klien Korporat)</h4>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      <b>Pain Points:</b> Tidak tahu status keberadaan kurir makanan dan bingung cara menukar kode kupon diskon langganannya.
                      <br /><b>Goals:</b> Sistem pelacakan peta kurir mandiri dan dasbor penukaran poin membership.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins">3.2 Ringkasan FAQ Dokumen (10 Item Tanya Jawab)</h3>
                <p className="text-xs text-gray-500">Teks tanya jawab FAQ lengkap telah diimplementasikan pada Landing Page untuk mengedukasi dan mendorong rasio konversi pendaftaran trial secara optimal.</p>
              </div>
            </div>
          )}

          {/* TAB 4: BAB IV - PRD V3 */}
          {activeTab === "bab4" && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">BAB IV</span>
                <h2 className="text-3xl font-black text-gray-900 font-poppins mt-1">PRD V3 — Versi Lengkap SaaS</h2>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins">4.1 Integrasi Pihak Ketiga (3rd Party APIs)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex gap-3 text-xs">
                    <span className="text-xl">🗄️</span>
                    <div>
                      <h4 className="font-bold text-gray-800">Supabase Backend</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Penyimpanan database SQL terenkripsi, autentikasi login pengguna, dan storage menu makanan.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex gap-3 text-xs">
                    <span className="text-xl">💬</span>
                    <div>
                      <h4 className="font-bold text-gray-800">WhatsApp Notification API</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Kirim invoice, status lunas otomatis, dan info kurir pengirim via WA pembeli.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex gap-3 text-xs">
                    <span className="text-xl">💳</span>
                    <div>
                      <h4 className="font-bold text-gray-800">Midtrans Payment Gateway</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Pemrosesan transaksi VA bank (Mandiri, BCA, BNI), QRIS, Gopay, OVO secara instant.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex gap-3 text-xs">
                    <span className="text-xl">🗺️</span>
                    <div>
                      <h4 className="font-bold text-gray-800">Google Maps API</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Perhitungan tarif ongkir berbasis radius kilometer dan peta rute kurir pengantaran dapur.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Architecture Table */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins">4.2 Arsitektur Informasi Landing Page</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FFF8F0] text-gray-800 font-bold">
                      <tr>
                        <th className="p-3 border-b">Section</th>
                        <th className="p-3 border-b">Sub-Komponen</th>
                        <th className="p-3 border-b">Tujuan & Fungsi</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-500">
                      <tr className="border-b hover:bg-gray-50/50">
                        <td className="p-3 font-bold text-gray-700">TOP SECTION</td>
                        <td className="p-3">Sticky Navbar, Hero Banner, Dashboard Preview, Social Proof</td>
                        <td className="p-3">Menarik perhatian, memicu visual software dasbor admin, dan membangun kepercayaan.</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50/50">
                        <td className="p-3 font-bold text-gray-700">MIDDLE SECTION</td>
                        <td className="p-3">Problem & Solution, CRM Workflow, 360 Feature Grid, Testimonials, FAQ Accordion</td>
                        <td className="p-3">Menjawab ketakutan operasional bisnis, memetakan alur kerja CRM, dan mengedukasi detail fitur.</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50/50">
                        <td className="p-3 font-bold text-gray-700">BOTTOM SECTION</td>
                        <td className="p-3">Final CTA Banner, Newsletter Box, Footer Links</td>
                        <td className="p-3">Mendorong keputusan akhir pendaftaran trial gratis dan merapikan tautan regulasi.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* KPI Dashboard Table */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins">4.3 Metrik KPI Dashboard Analitik</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FFF8F0] text-gray-800 font-bold">
                      <tr>
                        <th className="p-3 border-b">Kategori KPI</th>
                        <th className="p-3 border-b">Nama Metrik</th>
                        <th className="p-3 border-b">Cara Mengukur & Target</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-500">
                      <tr className="border-b">
                        <td className="p-3 font-bold text-gray-700">Awareness</td>
                        <td className="p-3">Web Visitors</td>
                        <td className="p-3">Jumlah IP unik pengunjung baru landing page harian.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-bold text-gray-700">Engagement</td>
                        <td className="p-3">Time on Page / Scroll Depth</td>
                        <td className="p-3">Rata-rata durasi pengunjung membaca detail minimal 3 menit.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-bold text-gray-700">Conversion</td>
                        <td className="p-3">Trial Registration / Demo Bookings</td>
                        <td className="p-3">Jumlah formulir registrasi sukses terkirim. Target &gt; 15% dari visitor.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-bold text-gray-700">Business Growth</td>
                        <td className="p-3">Repeat Order Rate / Churn Rate</td>
                        <td className="p-3">Mengukur kesetiaan pelanggan. Menahan churn di bawah 5% per bulan.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DIAGRAMS & FLOWS */}
          {activeTab === "diagrams" && (
            <div className="space-y-8">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">VISUALISASI</span>
                <h2 className="text-3xl font-black text-gray-900 font-poppins mt-1">Sitemap & Alur Sistem</h2>
              </div>

              {/* Sitemap Chart */}
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#FF7A1A]" />
                  1. Arsitektur Struktur Sitemap Aplikasi
                </h3>
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center space-y-4">
                  <div className="bg-[#FF7A1A] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow">Landing Page SaaS (Home)</div>
                  <div className="h-6 w-0.5 bg-gray-300"></div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    <div className="p-3 bg-white rounded-xl border border-gray-200 text-center text-[10px] font-bold">Solusi Fitur CRM</div>
                    <div className="p-3 bg-white rounded-xl border border-gray-200 text-center text-[10px] font-bold">Daftar Paket Harga</div>
                    <div className="p-3 bg-white rounded-xl border border-gray-200 text-center text-[10px] font-bold">Portal Login / Daftar</div>
                    <div className="p-3 bg-white rounded-xl border border-gray-200 text-center text-[10px] font-bold">Doc & FAQ</div>
                  </div>
                  
                  <div className="h-6 w-0.5 bg-gray-300"></div>
                  <div className="bg-orange-100 text-gray-800 px-6 py-2.5 rounded-xl font-bold text-xs">Role Checker / Gatekeeper</div>
                  <div className="h-6 w-0.5 bg-gray-300"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
                    <div className="p-4 bg-white rounded-xl border border-gray-200 text-left space-y-2">
                      <span className="text-xs font-black text-gray-800 block border-b pb-1">Dasbor Admin (Owner)</span>
                      <ul className="text-[9px] text-gray-400 space-y-1">
                        <li>• Database Pelanggan & Segmentasi</li>
                        <li>• Rekap Pesanan & Jadwal Dapur</li>
                        <li>• Membership Point Manager</li>
                        <li>• Campaign Voucher Creator</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-200 text-left space-y-2">
                      <span className="text-xs font-black text-gray-800 block border-b pb-1">Dasbor Member (Klien)</span>
                      <ul className="text-[9px] text-gray-400 space-y-1">
                        <li>• Katalog & Checkout Katering</li>
                        <li>• Payment Invoice Verification</li>
                        <li>• Pelacakan Kurir Google Maps</li>
                        <li>• Rating Ulasan & Penukaran Kado</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Flow Chart */}
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins flex items-center gap-2">
                  <User className="h-5 w-5 text-[#FF7A1A]" />
                  2. User Flow Perjalanan Pelanggan Katering
                </h3>
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold">
                    <div className="px-3 py-2 bg-white rounded-lg border border-gray-200">Visitor Web</div>
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                    <div className="px-3 py-2 bg-[#FF7A1A] text-white rounded-lg shadow-sm">Registrasi Trial</div>
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                    <div className="px-3 py-2 bg-white rounded-lg border border-gray-200">Dasbor Member</div>
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                    <div className="px-3 py-2 bg-white rounded-lg border border-gray-200">Pemesanan Menu</div>
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                    <div className="px-3 py-2 bg-white rounded-lg border border-gray-200">Midtrans Checkout</div>
                  </div>
                  <div className="h-6 w-0.5 bg-gray-300 mx-auto my-3"></div>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold">
                    <div className="px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">Verifikasi Lunas</div>
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                    <div className="px-3 py-2 bg-white rounded-lg border border-gray-200">Koki Memasak Dapur</div>
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                    <div className="px-3 py-2 bg-white rounded-lg border border-gray-200">Kurir Pengantar</div>
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                    <div className="px-3 py-2 bg-white rounded-lg border border-gray-200">Kirim Feedback</div>
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                    <div className="px-3 py-2 bg-yellow-50 text-amber-600 rounded-lg border border-yellow-100">Poin Loyalty VIP</div>
                  </div>
                </div>
              </div>

              {/* CRM Workflow Chart */}
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-gray-900 font-poppins flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-[#FF7A1A]" />
                  3. CRM Workflow & Otomatisasi Sistem
                </h3>
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-left space-y-4 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-gray-100">
                    <span className="font-extrabold text-[#FF7A1A] block mb-1">Aksi 1: Pelanggan Baru Terdaftar</span>
                    <p className="text-[10px] text-gray-400">Sistem otomatis memasukkan e-mail dan WhatsApp pelanggan ke segmen pelanggan baru.</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100">
                    <span className="font-extrabold text-[#FF7A1A] block mb-1">Aksi 2: Invoice Menunggu Pembayaran</span>
                    <p className="text-[10px] text-gray-400">Jika 2 jam tagihan belum dibayar, WhatsApp gateway otomatis mengirim pengingat berisi link transfer instan.</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100">
                    <span className="font-extrabold text-[#FF7A1A] block mb-1">Aksi 3: Pemberian Rating Makanan</span>
                    <p className="text-[10px] text-gray-400">Pelanggan memberi rating &lt; 3 memicu sistem mengirim tiket keluhan otomatis ke dashboard admin agar segera diselesaikan.</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100">
                    <span className="font-extrabold text-[#FF7A1A] block mb-1">Aksi 4: Siklus Re-Engagement (Retensi)</span>
                    <p className="text-[10px] text-gray-400">Pelanggan harian yang pasif dalam 30 hari otomatis dikirimi WhatsApp voucher khusus potongan 20% agar melakukan pesanan kembali.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: COPYWRITING & ASSETS */}
          {activeTab === "copywriting" && (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">ASET DRAFT</span>
                <h2 className="text-3xl font-black text-gray-900 font-poppins mt-1">Landing Page Copywriting</h2>
              </div>
              
              <p className="text-xs text-gray-500">
                Salin teks copywriting resmi di bawah ini untuk digunakan langsung oleh tim pengembang front-end atau pemasar iklan.
              </p>

              {/* Copy Blocks */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                  <div className="flex justify-between items-center border-b pb-2 mb-1">
                    <span className="text-[11px] font-bold text-[#FF7A1A] uppercase tracking-wider">1. Headline Hero Banner Utama</span>
                    <button
                      onClick={() => copyToClipboard("Kelola Bisnis Catering Lebih Praktis, Naikkan Omzet dengan CRM Modern", "headline")}
                      className="text-[10px] font-bold text-gray-400 hover:text-[#FF7A1A] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedText === "headline" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedText === "headline" ? "Tersalin!" : "Salin Teks"}
                    </button>
                  </div>
                  <p className="text-xs font-extrabold text-gray-900">Kelola Bisnis Catering Lebih Praktis, Naikkan Omzet dengan CRM Modern</p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                  <div className="flex justify-between items-center border-b pb-2 mb-1">
                    <span className="text-[11px] font-bold text-[#FF7A1A] uppercase tracking-wider">2. Subheadline Hero Banner</span>
                    <button
                      onClick={() => copyToClipboard("Hentikan pencatatan pesanan manual. Kelola pelanggan, konfirmasi pembayaran otomatis, kirim notifikasi WhatsApp instan, dan kelola loyalty membership hanya dalam satu dasbor terintegrasi.", "subhead")}
                      className="text-[10px] font-bold text-gray-400 hover:text-[#FF7A1A] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedText === "subhead" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedText === "subhead" ? "Tersalin!" : "Salin Teks"}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Hentikan pencatatan pesanan manual. Kelola pelanggan, konfirmasi pembayaran otomatis, kirim notifikasi WhatsApp instan, dan kelola loyalty membership hanya dalam satu dasbor terintegrasi.</p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                  <div className="flex justify-between items-center border-b pb-2 mb-1">
                    <span className="text-[11px] font-bold text-[#FF7A1A] uppercase tracking-wider">3. Copy Masalah Bisnis</span>
                    <button
                      onClick={() => copyToClipboard("Kewalahan membalas chat pesanan katering, rekap pembayaran manual di mutasi bank, dan kebingungan melacak kurir pengirim makanan harian?", "problem")}
                      className="text-[10px] font-bold text-gray-400 hover:text-[#FF7A1A] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedText === "problem" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedText === "problem" ? "Tersalin!" : "Salin Teks"}
                    </button>
                  </div>
                  <p className="text-xs italic text-gray-500">"Kewalahan membalas chat pesanan katering, rekap pembayaran manual di mutasi bank, dan kebingungan melacak kurir pengirim makanan harian?"</p>
                </div>
              </div>
            </div>
          )}

        </section>

      </main>

    </div>
  );
}
