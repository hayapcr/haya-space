import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Target,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  Layers,
  Map,
  Copy,
  Check,
  Users,
  Rocket,
  History,
  Briefcase,
  Smile,
  Quote,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  MessageSquare
} from "lucide-react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

export default function CompanyProfile() {
  // State for PRD Documentation Drawer
  const [showPrd, setShowPrd] = useState(false);
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

  const teamMembers = [
    {
      name: "Haya Nur Rizky",
      role: "Founder & Chief Executive Officer (Owner)",
      desc: "Visioner di balik CaterBox CRM. Memiliki mimpi mendigitalisasi 10.000+ usaha katering di Indonesia agar berdaya saing global.",
      avatar: "👑",
      tag: "Owner"
    },
    {
      name: "Andi Wijaya",
      role: "Chief Technology Officer (CTO)",
      desc: "Frontend Architect senior dengan spesialisasi ekosistem React. Bertanggung jawab atas performa, keamanan, dan integrasi API.",
      avatar: "👨‍💻",
      tag: "Tech Lead"
    },
    {
      name: "Siska Amelia",
      role: "Head of Product & Customer Relations",
      desc: "CRM Specialist yang memastikan alur kerja otomatisasi notifikasi WhatsApp dan membership program berjalan mulus demi kepuasan klien.",
      avatar: "👩‍💼",
      tag: "Product"
    }
  ];

  const companyValues = [
    {
      icon: <Rocket className="h-6 w-6 text-[#FF7A1A]" />,
      title: "Inovasi Tanpa Henti",
      desc: "Terus mengembangkan fitur otomatisasi CRM termutakhir untuk mempermudah bisnis kuliner."
    },
    {
      icon: <Smile className="h-6 w-6 text-[#FF7A1A]" />,
      title: "Mengutamakan Pengguna",
      desc: "Setiap tombol, alur, dan grafik dirancang agar sangat mudah digunakan oleh staf dapur sekalipun."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#FF7A1A]" />,
      title: "Keamanan & Keandalan",
      desc: "Menggunakan enkripsi database cloud terpercaya demi menjamin kerahasiaan data pembeli."
    },
    {
      icon: <Briefcase className="h-6 w-6 text-[#FF7A1A]" />,
      title: "Integritas Bisnis",
      desc: "Membangun kemitraan yang transparan dan saling menguntungkan bersama pengusaha catering lokal."
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Pendirian & Validasi Ide",
      desc: "CaterBox didirikan dari keresahan pemilik catering lokal dalam merekap pesanan berulang via chat WhatsApp."
    },
    {
      year: "2025",
      title: "Peluncuran MVP (PRD V1)",
      desc: "Merilis modul pesanan dan database pelanggan dasar untuk 50 mitra katering pertama di Pekanbaru."
    },
    {
      year: "2026",
      title: "Ekspansi Skalabilitas (PRD V3)",
      desc: "Peluncuran modul payment gateway otomatis, pelacakan Google Maps, dan membership loyalty point."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EE] to-[#FFFDF9] font-sans text-gray-800 antialiased selection:bg-[#FF7A1A] selection:text-white">
      
      {/* HEADER (ORANGE STYLE) */}
      <nav className="sticky top-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-orange-100/50 shadow-sm transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍱</span>
            <span className="text-xl font-bold font-poppins tracking-tight text-gray-900">
              Cater<span className="text-[#FF7A1A]">Box</span> <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#FF7A1A] text-white px-2 py-0.5 rounded ml-1">Company Profile</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#FF7A1A] hover:underline"
            >
              ← Kembali ke Landing Page
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-28 text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-30" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        
        <div className="mx-auto max-w-4xl px-6 md:px-8 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/30 px-4 py-1.5 text-xs font-bold text-[#FF7A1A]">
            <Sparkles className="h-3.5 w-3.5 text-[#FF7A1A] animate-pulse" />
            <span>Membangun Masa Depan Kuliner Digital</span>
          </div>
          
          <h1 className="text-4xl font-black font-poppins sm:text-5xl lg:text-6xl leading-tight">
            Revolusi Manajemen Katering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#FF7A1A]">
              Terbesar di Indonesia
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-xs md:text-sm text-gray-300 leading-relaxed">
            CaterBox CRM lahir untuk mengakhiri cara-cara manual yang melelahkan. Kami memberdayakan pemilik katering dengan perangkat otomatisasi terbaik untuk memajukan relasi pelanggan, mempercepat verifikasi transaksi, dan mengunci loyalitas pembeli secara berkelanjutan.
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => setShowPrd(!showPrd)}
              className="rounded-full bg-[#FF7A1A] hover:bg-[#e0650d] px-8 py-3 text-xs font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
            >
              {showPrd ? "Tutup Dokumen PRD" : "Buka Dokumen Teknis (PRD V3)"}
            </button>
            <a
              href="#tim"
              className="rounded-full border border-gray-600 bg-white/5 hover:bg-white/10 px-8 py-3 text-xs font-bold text-white transition-all"
            >
              Kenali Tim Kami
            </a>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC PRD DRAWER (INTEGRATED PROJECT RESOURCE PANEL) */}
      {showPrd && (
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-8 border-b border-orange-100 bg-[#FFF8F0]/40 rounded-[2.5rem] mt-8 animate-in fade-in slide-in-from-top-6 duration-300">
          <div className="border-b border-orange-100 pb-4 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[10px] font-black text-[#FF7A1A] uppercase tracking-widest">Resource Center</span>
              <h2 className="text-2xl font-black text-gray-900 font-poppins mt-1">Dokumentasi Teknis Proyek (PRD V3)</h2>
            </div>
            <button
              onClick={() => setShowPrd(false)}
              className="text-xs font-bold text-gray-500 hover:text-gray-900 cursor-pointer"
            >
              ✕ Tutup Panel
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 items-start">
            {/* Sidebar Tabs */}
            <aside className="bg-white border border-orange-100 rounded-2xl p-4 shadow-sm space-y-1 text-left">
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
              <div className="pt-3 mt-3 border-t border-gray-100 px-3">
                <a
                  href="file:///C:/Users/ASUS/haya-space/CATERBOX_CRM_PRD_DOCUMENT.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[9px] font-bold text-[#FF7A1A] hover:underline"
                >
                  Buka File Raw MD <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </aside>

            {/* Tab Contents */}
            <div className="bg-white border border-orange-100 rounded-3xl p-6 md:p-8 shadow-sm text-left min-h-[350px]">
              
              {/* TAB 1 */}
              {activeTab === "bab1" && (
                <div className="space-y-5">
                  <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">BAB I</span>
                  <h3 className="text-xl font-black text-gray-900 font-poppins">Executive Summary</h3>
                  <div className="rounded-xl bg-[#FFF8F0] p-4 border border-orange-100/50 space-y-1.5 text-xs">
                    <h4 className="font-bold text-[#FF7A1A]">1.1 Visi Produk</h4>
                    <p className="text-gray-600 leading-relaxed">Menjadi platform Customer Relationship Management (CRM) berbasis SaaS khusus catering nomor satu yang membantu pengusaha catering mengotomasi operasional mereka, meningkatkan retensi pelanggan melalui loyalty program, serta menyajikan analitik bisnis berbasis data yang mendalam.</p>
                  </div>
                  <div className="space-y-2 text-xs">
                    <h4 className="font-bold text-gray-800">1.2 Latar Belakang</h4>
                    <p className="text-gray-500 leading-relaxed">Sebagian besar pengusaha catering mengelola data pesanan, langganan harian harian, membership point, dan promo menggunakan spreadsheet manual atau chat WhatsApp. Ketiadaan sistem terintegrasi memicu kesalahan pencatatan dan tingkat retensi yang rendah.</p>
                  </div>
                </div>
              )}

              {/* TAB 2 */}
              {activeTab === "bab2" && (
                <div className="space-y-4 text-xs">
                  <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">BAB II</span>
                  <h3 className="text-xl font-black text-gray-900 font-poppins">PRD V1 — Versi Dasar (MVP)</h3>
                  <p className="text-gray-500 leading-relaxed">Memperkenalkan konsep digitalisasi CRM CaterBox kepada pengusaha catering lokal serta memicu minat pendaftaran awal. Terfokus pada 4 pilar dasar: Customer, Order, Payment, dan Membership dasar.</p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-gray-50 rounded-lg"><b>Customer CRM:</b> Data profil nama & WA.</div>
                    <div className="p-3 bg-gray-50 rounded-lg"><b>Order:</b> Rekap pemesanan harian.</div>
                  </div>
                </div>
              )}

              {/* TAB 3 */}
              {activeTab === "bab3" && (
                <div className="space-y-4 text-xs">
                  <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">BAB III</span>
                  <h3 className="text-xl font-black text-gray-900 font-poppins">PRD V2 — Versi Menengah</h3>
                  <p className="text-gray-500">Meningkatkan konversi dengan widget interaktif dasbor produk, 3 pilar solusi, slider testimoni, dan 10 pertanyaan FAQ accordion dropdown.</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-[#FFF8F0] border border-orange-100/50 rounded-xl">
                      <b>3 Pilar Solusi:</b> Pencatatan Rapi (No Lost Orders), Invoice & Bayar Otomatis (Midtrans QRIS), Kunci Loyalitas VIP (Loyalty Points).
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4 */}
              {activeTab === "bab4" && (
                <div className="space-y-4 text-xs">
                  <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">BAB IV</span>
                  <h3 className="text-xl font-black text-gray-900 font-poppins">PRD V3 — Versi Lengkap SaaS</h3>
                  <p className="text-gray-500">Integrasi 3rd-party APIs (Supabase SQL database, WhatsApp Gateway, Midtrans checkout, Google Maps, Google Calendar) dan table metrik KPI dashboard bisnis.</p>
                </div>
              )}

              {/* TAB 5 */}
              {activeTab === "diagrams" && (
                <div className="space-y-6 text-xs">
                  <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">DIAGRAM ALUR</span>
                  <h3 className="text-xl font-black text-gray-900 font-poppins">Sitemap & User Flow Proyek</h3>
                  <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                    <div>
                      <h5 className="font-extrabold text-gray-800 mb-2">1. User Flow Transaksi Katering</h5>
                      <div className="flex flex-wrap items-center gap-2 text-[8px] font-bold text-gray-500">
                        <span className="px-2 py-1 bg-white rounded border">Visitor Web</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="px-2 py-1 bg-[#FF7A1A] text-white rounded">Daftar Trial</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="px-2 py-1 bg-white rounded border">Member Dashboard</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="px-2 py-1 bg-white rounded border">Bayar QRIS</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded">Invoice Lunas</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6 */}
              {activeTab === "copywriting" && (
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold text-gray-700">Teks Copywriting Utama</span>
                    <button
                      onClick={() => copyToClipboard("Kelola Bisnis Catering Lebih Praktis, Naikkan Omzet dengan CRM Modern", "copy")}
                      className="text-[10px] text-[#FF7A1A] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedText === "copy" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedText === "copy" ? "Tersalin!" : "Salin"}
                    </button>
                  </div>
                  <p className="font-extrabold text-gray-900">"Kelola Bisnis Catering Lebih Praktis, Naikkan Omzet dengan CRM Modern"</p>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* 3. VISI & MISI PERUSAHAAN */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A1A]">Pilar Perusahaan</span>
          <h2 className="text-3xl font-black font-poppins text-gray-900 sm:text-4xl">Visi & Misi CaterBox</h2>
          <p className="text-xs leading-relaxed text-gray-500">
            Kami berkomitmen penuh untuk menghadirkan otomatisasi CRM berkualitas tinggi yang dapat diakses oleh semua skala usaha katering.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4 items-start p-4 bg-white rounded-2xl border border-orange-100 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-[#FFF8F0] text-[#FF7A1A] flex items-center justify-center font-bold">
                <Target className="h-5 w-5" />
              </div>
              <div className="text-xs flex-1">
                <h4 className="font-extrabold text-gray-900 font-poppins">Visi Utama</h4>
                <p className="text-gray-400 mt-1">Mendorong digitalisasi masif industri kuliner katering di Asia Tenggara melalui ekosistem perangkat lunak CRM terintegrasi.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 bg-white rounded-2xl border border-orange-100 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-[#FFF8F0] text-[#FF7A1A] flex items-center justify-center font-bold">
                <Award className="h-5 w-5" />
              </div>
              <div className="text-xs flex-1">
                <h4 className="font-extrabold text-gray-900 font-poppins">Misi Utama</h4>
                <p className="text-gray-400 mt-1">Menyederhanakan rekap transaksi, mengotomatisasi pengiriman notifikasi pembeli, dan meningkatkan pendapatan berulang mitra kuliner.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Showcase Card */}
        <div className="relative flex justify-center">
          <div className="absolute -inset-4 bg-orange-100 rounded-[2.5rem] blur-xl opacity-40 -z-10" />
          <div className="bg-white rounded-[2.5rem] border border-orange-100 p-8 text-left shadow-xl w-full max-w-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              <h4 className="font-extrabold text-gray-900 font-poppins">Pencapaian Mitra</h4>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <p className="text-gray-400">Peningkatan Repeat Order</p>
                <div className="flex items-center gap-3 mt-1">
                  <h3 className="text-2xl font-black text-emerald-600">+35%</h3>
                  <span className="text-[10px] font-bold text-gray-400">Rata-rata kenaikan omzet mitra</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400">Penghematan Waktu Rekap</p>
                <div className="flex items-center gap-3 mt-1">
                  <h3 className="text-2xl font-black text-[#FF7A1A]">-60%</h3>
                  <span className="text-[10px] font-bold text-gray-400">Mengurangi waktu kerja admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEJARAH & TIMELINE MILESTONE */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 border-t border-orange-100/50">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A1A]">Sejarah & Jejak Langkah</span>
          <h2 className="text-3xl font-black font-poppins sm:text-4xl text-gray-900">Perjalanan CaterBox</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {milestones.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl border border-orange-100 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl font-black font-poppins text-[#FF7A1A]/30">{item.year}</span>
              <h3 className="text-sm font-extrabold text-gray-900 font-poppins">{item.title}</h3>
              <p className="text-xs leading-relaxed text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PILAR NILAI UTAMA PERUSAHAAN */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 border-t border-orange-100/50 bg-[#FFF8F0]/30 rounded-[3rem]">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A1A]">Budaya & Filosofi</span>
          <h2 className="text-3xl font-black font-poppins sm:text-4xl text-gray-900">Nilai-Nilai Utama Kami</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {companyValues.map((value, i) => (
            <div key={i} className="bg-white rounded-2xl border border-orange-100 p-5 space-y-3 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-[#FFF8F0] flex items-center justify-center">
                {value.icon}
              </div>
              <h4 className="text-xs font-extrabold text-gray-900 font-poppins">{value.title}</h4>
              <p className="text-[11px] leading-relaxed text-gray-400">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TIM UTAMA (OUR TEAM) */}
      <section id="tim" className="mx-auto max-w-7xl px-6 py-16 md:px-8 border-t border-orange-100/50">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A1A]">Team Terpercaya</span>
          <h2 className="text-3xl font-black font-poppins sm:text-4xl text-gray-900">Tokoh di Balik Dapur CaterBox</h2>
          <p className="mx-auto max-w-md text-sm text-gray-500">Kombinasi founder visioner dan tim teknisi berpengalaman di bidang retail & kuliner.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <div key={i} className="bg-white rounded-3xl border border-orange-100 p-6 text-center space-y-4 shadow-sm hover:-translate-y-1.5 transition-transform duration-300">
              <div className="h-20 w-20 rounded-full bg-[#FFF8F0] flex items-center justify-center text-4xl mx-auto border-2 border-orange-200 shadow-sm">
                {member.avatar}
              </div>
              <div>
                <span className="text-[8px] font-bold uppercase tracking-wider bg-orange-100 text-[#FF7A1A] px-2 py-0.5 rounded-full">{member.tag}</span>
                <h4 className="text-xs font-extrabold text-gray-900 font-poppins mt-2">{member.name}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">{member.role}</p>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-400 px-2">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. HUBUNGI KAMI */}
      <section className="mx-auto max-w-5xl px-6 py-12 md:px-8 border-t border-orange-100/50">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white text-left shadow-xl md:p-12">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-orange-500/10 blur-3xl" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black font-poppins">Tertarik Bermitra Bersama Kami?</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Hubungi tim pemasaran kami untuk integrasi kustom katering berskala besar atau jadwalkan sesi pelatihan staf dapur secara offline.
              </p>
              <div className="space-y-2 text-xs pt-2">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-[#FF7A1A]" />
                  <span>Pekanbaru, Riau, Indonesia</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#FF7A1A]" />
                  <span>partnership@caterbox.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#FF7A1A]" />
                  <span>+62 812-3456-7890</span>
                </div>
              </div>
            </div>

            {/* Mock message box */}
            <div className="bg-white rounded-2xl p-5 text-gray-800 space-y-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Kirim Pesan Instan (Owner Partner)</span>
              <div className="space-y-2 text-xs font-semibold">
                <input disabled type="text" placeholder="Nama Lengkap" className="w-full rounded-xl border p-2.5 bg-gray-50 outline-none text-[11px]" />
                <input disabled type="email" placeholder="E-mail Usaha" className="w-full rounded-xl border p-2.5 bg-gray-50 outline-none text-[11px]" />
                <textarea disabled placeholder="Tuliskan pesan kemitraan Anda di sini..." rows="2" className="w-full rounded-xl border p-2.5 bg-gray-50 outline-none text-[11px] resize-none" />
                <button type="button" className="w-full py-2.5 bg-[#FF7A1A] hover:bg-[#e0650d] text-white rounded-xl font-bold text-center text-[10px]">
                  Kirim Pesan Kemitraan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs text-gray-400 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍱</span>
            <span className="font-bold text-gray-900 font-poppins">CaterBox CRM</span>
          </div>
          <p className="text-[11px]">© 2026 CaterBox CRM. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-3 text-gray-400">
            <a href="#" className="hover:text-[#FF7A1A]"><FaInstagram /></a>
            <a href="#" className="hover:text-[#FF7A1A]"><FaWhatsapp /></a>
            <a href="#" className="hover:text-[#FF7A1A]"><FaFacebook /></a>
          </div>
        </div>
      </footer>

    </div>
  );
}
