import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaArrowRight,
  FaQuoteLeft,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import {
  Users,
  ShoppingBag,
  Receipt,
  Award,
  Bell,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Mail,
  Building,
  UserCheck,
  Check,
  Send,
  RefreshCw,
  Search,
  Plus
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  // State Management
  const [dashboardTab, setDashboardTab] = useState("weekly");
  const [featureTab, setFeatureTab] = useState("operational");
  const [workflowStep, setWorkflowStep] = useState(1);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState({});
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);

  // Form State
  const [demoForm, setDemoForm] = useState({ name: "", catering: "", phone: "", date: "", time: "" });
  const [trialForm, setTrialForm] = useState({ name: "", email: "", password: "", catering: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Submited States
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [trialSuccess, setTrialSuccess] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Mock Dashboard Data
  const dashboardData = {
    weekly: {
      revenue: "Rp28.450.000",
      revenueGrowth: "+12.4% vs w-prev",
      customers: "342",
      customerGrowth: "+8.2%",
      orders: "1,120",
      orderGrowth: "+5.1%",
      activeMembers: "215",
      memberGrowth: "+15.3%",
      chartHeights: [45, 75, 55, 90, 60, 85, 100],
      chartLabels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
      bestSeller: [
        { name: "Nasi Box Ayam Bakar Madu", sold: "245 porsi" },
        { name: "Tumpeng Mini Nusantara", sold: "180 porsi" },
        { name: "Snack Box Premium", sold: "155 porsi" }
      ],
      activities: [
        { user: "Ibu Ratna", desc: "mendaftar member VIP baru", time: "2 menit yang lalu" },
        { user: "Catering Berkah", desc: "memproses order Rp1.250.000", time: "10 menit yang lalu" },
        { user: "Doni (Instansi)", desc: "memberikan feedback bintang 5", time: "1 jam yang lalu" }
      ]
    },
    monthly: {
      revenue: "Rp124.900.000",
      revenueGrowth: "+18.9% vs m-prev",
      customers: "1,240",
      customerGrowth: "+14.6%",
      orders: "4,850",
      orderGrowth: "+12.3%",
      activeMembers: "850",
      memberGrowth: "+22.1%",
      chartHeights: [60, 45, 80, 70, 95, 75, 100],
      chartLabels: ["M-1", "M-2", "M-3", "M-4", "M-5", "M-6", "M-7"],
      bestSeller: [
        { name: "Nasi Box Ayam Bakar Madu", sold: "1,040 porsi" },
        { name: "Snack Box Premium", sold: "890 porsi" },
        { name: "Paket Prasmanan Syukuran", sold: "620 porsi" }
      ],
      activities: [
        { user: "PT Angkasa Pura", desc: "kontrak catering bulanan baru", time: "1 hari yang lalu" },
        { user: "Budi Santoso", desc: "redeem voucher diskon 20%", time: "2 hari yang lalu" },
        { user: "Catering Mama", desc: "mencapai omzet Rp30jt", time: "3 hari yang lalu" }
      ]
    },
    yearly: {
      revenue: "Rp1.482.000.000",
      revenueGrowth: "+42.5% vs y-prev",
      customers: "12,450",
      customerGrowth: "+38.2%",
      orders: "54,200",
      orderGrowth: "+34.8%",
      activeMembers: "8,500",
      memberGrowth: "+65.2%",
      chartHeights: [30, 45, 60, 50, 70, 65, 80, 75, 90, 85, 95, 100],
      chartLabels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"],
      bestSeller: [
        { name: "Nasi Box Ayam Bakar Madu", sold: "12,400 porsi" },
        { name: "Snack Box Premium", sold: "9,850 porsi" },
        { name: "Catering Wedding Premium", sold: "4,120 porsi" }
      ],
      activities: [
        { user: "CaterBox CRM", desc: "mengakuisisi partner ke-150", time: "1 minggu yang lalu" },
        { user: "Haya Catering", desc: "menyelesaikan 10,000+ total order", time: "2 minggu yang lalu" },
        { user: "Layanan Cloud", desc: "otomatisasi backup data sukses", time: "1 bulan yang lalu" }
      ]
    }
  };

  const selectedDashboard = dashboardData[dashboardTab];

  // Features classification list
  const featuresList = {
    operational: {
      title: "Operational CRM",
      subtitle: "Kekuatan Utama Otomatisasi Operasional Dapur & Pesanan",
      description: "Hilangkan pusing akibat pesanan manual lewat chat. Sistem kami menangani transaksi masuk, pembuatan invoice instan, hingga rute pengantaran logistik secara digital.",
      items: [
        { icon: <ShoppingBag className="h-5 w-5 text-[#FF7A1A]" />, name: "Manajemen Pemesanan Online", desc: "Pelanggan bisa langsung pesan mandiri via link web khusus catering Anda." },
        { icon: <MapPin className="h-5 w-5 text-[#FF7A1A]" />, name: "Delivery Tracking (Google Maps)", desc: "Perhitungan jarak kirim presisi dan peta rute kurir pengantaran harian." },
        { icon: <Receipt className="h-5 w-5 text-[#FF7A1A]" />, name: "Invoice & Midtrans Integration", desc: "Pembayaran otomatis terverifikasi dengan VA bank, QRIS, maupun e-wallet." },
        { icon: <Sparkles className="h-5 w-5 text-[#FF7A1A]" />, name: "Label Pengiriman Otomatis", desc: "Cetak label alamat lengkap porsi masakan sekali klik dari dapur." }
      ],
      mockup: (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-[10px] font-black text-gray-800">📋 Pesanan Masuk (Live)</span>
            <span className="text-[8px] bg-amber-50 text-[#FF7A1A] font-bold px-2 py-0.5 rounded-full">Dalam Antrean</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] bg-gray-50 p-2 rounded-lg">
              <div>
                <p className="font-extrabold text-gray-800">#1092 - PT Mahkota</p>
                <p className="text-[8px] text-gray-400">120 Box Nasi Ayam Bakar</p>
              </div>
              <span className="font-bold text-gray-700">Rp3.000.000</span>
            </div>
            <div className="flex justify-between items-center text-[10px] bg-[#FFF8F0] border border-[#FF7A1A]/20 p-2 rounded-lg">
              <div>
                <p className="font-extrabold text-[#FF7A1A]">#1093 - Ibu Ratna</p>
                <p className="text-[8px] text-gray-500">20 Box Catering Harian</p>
              </div>
              <span className="font-bold text-[#FF7A1A]">Rp500.000</span>
            </div>
          </div>
          <div className="h-8 rounded-lg bg-[#FF7A1A] text-white flex items-center justify-center text-[9px] font-bold cursor-pointer">
            Kirim Notifikasi Invoice Tagihan ke WA
          </div>
        </div>
      )
    },
    analytical: {
      title: "Analytical CRM",
      subtitle: "Wawasan Laporan Bisnis Berbasis Data untuk Kembangkan Omzet",
      description: "Ketahui menu terlaris, kembangkan loyalitas pelanggan, dan monitor penurunan (churn) langganan secara visual untuk keputusan bisnis yang tepat.",
      items: [
        { icon: <BarChart3 className="h-5 w-5 text-[#FF7A1A]" />, name: "Revenue Insights Dashboard", desc: "Pantau grafik pendapatan harian, mingguan, hingga laporan laba rugi." },
        { icon: <Users className="h-5 w-5 text-[#FF7A1A]" />, name: "Segmentasi Pelanggan Otomatis", desc: "Pengelompokan otomatis pelanggan VIP, pelanggan baru, dan pelanggan pasif." },
        { icon: <TrendingUp className="h-5 w-5 text-[#FF7A1A]" />, name: "Analisis Produk & Menu Terlaris", desc: "Ketahui menu makanan mana yang paling menghasilkan profit tinggi." },
        { icon: <Sparkles className="h-5 w-5 text-[#FF7A1A]" />, name: "Laporan Churn Rate & Retensi", desc: "Lacak persentase pelanggan yang berhenti berlangganan katering harian." }
      ],
      mockup: (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-md space-y-3">
          <span className="text-[10px] font-black text-gray-800 block">📊 Segmentasi Pelanggan</span>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[9px] border-b pb-1.5">
              <span className="font-semibold text-gray-600">Pelanggan VIP (Silver/Gold)</span>
              <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">142 User (Aktif)</span>
            </div>
            <div className="flex items-center justify-between text-[9px] border-b pb-1.5">
              <span className="font-semibold text-gray-600">Pelanggan Pasif (&gt;30 Hari)</span>
              <span className="font-extrabold text-red-500 bg-red-50 px-2 py-0.5 rounded">54 User</span>
            </div>
            <div className="flex items-center justify-between text-[9px]">
              <span className="font-semibold text-gray-600">Pelanggan Baru (Bulan Ini)</span>
              <span className="font-extrabold text-[#FF7A1A] bg-[#FFF8F0] px-2 py-0.5 rounded">82 User</span>
            </div>
          </div>
          <div className="h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-[9px] font-bold cursor-pointer">
            Kirim Broadcast Campaign Diskon
          </div>
        </div>
      )
    },
    collaborative: {
      title: "Collaborative CRM",
      subtitle: "Komunikasi Lancar Tanpa Hambatan Antara Admin, Dapur, Kurir, & Klien",
      description: "Hubungkan pelanggan langsung ke dapur dan kurir. Mengirim notifikasi update otomatis ke WhatsApp mereka demi meningkatkan rasa percaya.",
      items: [
        { icon: <FaWhatsapp className="h-5 w-5 text-emerald-500" />, name: "WhatsApp Notification Gateway", desc: "Konfirmasi pesanan, invoice tagihan, dan notifikasi kiriman instan dikirim ke WA pembeli." },
        { icon: <MessageSquare className="h-5 w-5 text-[#FF7A1A]" />, name: "Feedback & Ulasan Pelanggan", desc: "Pelanggan bisa memberikan rating bintang dan kritik masukan untuk kualitas makanan." },
        { icon: <Bell className="h-5 w-5 text-[#FF7A1A]" />, name: "Notifikasi Instan Bagian Dapur", desc: "Setiap ada pesanan baru masuk, koki dapur langsung menerima log rekap porsi." },
        { icon: <UserCheck className="h-5 w-5 text-[#FF7A1A]" />, name: "Sistem Manajemen Staf & Role", desc: "Akses login khusus untuk admin input, koki masak, hingga kurir lapangan." }
      ],
      mockup: (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-md space-y-3 text-left">
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-extrabold">
            <FaWhatsapp className="text-emerald-500" /> WhatsApp Gateway
          </div>
          <div className="rounded-xl bg-emerald-50 p-2.5 text-[9px] leading-relaxed text-gray-700 relative">
            <p className="font-extrabold text-emerald-800">Halo Ibu Ratna,</p>
            <p className="mt-1">Pesanan Anda <b>#1093 (20 Box Katering)</b> telah selesai dimasak oleh dapur kami dan saat ini sedang diantar oleh kurir kami, <b>Andi</b>.</p>
            <p className="mt-1 font-bold text-[#FF7A1A] underline cursor-pointer">Lacak pengantaran real-time di sini</p>
          </div>
        </div>
      )
    },
    strategic: {
      title: "Strategic CRM",
      subtitle: "Tahan Pelanggan Agar Tidak Pindah ke Kompetitor",
      description: "Bangun basis pelanggan setia melalui program membership bertingkat, kumpulkan poin loyalitas belanja, dan jalankan e-mail kampanye diskon otomatis.",
      items: [
        { icon: <Award className="h-5 w-5 text-amber-500" />, name: "Loyalty Program & Poin", desc: "Poin otomatis bertambah tiap transaksi dan siap ditukar dengan menu gratis." },
        { icon: <Building className="h-5 w-5 text-[#FF7A1A]" />, name: "Tingkatan Membership VIP", desc: "Sistem klasifikasi keanggotaan bertingkat (Bronze, Silver, Gold) dengan diskon tetap." },
        { icon: <Sparkles className="h-5 w-5 text-[#FF7A1A]" />, name: "Campaign Generator Voucher", desc: "Kirim pesan kampanye voucher potongan harga untuk pelanggan yang sudah lama tidak order." },
        { icon: <Calendar className="h-5 w-5 text-[#FF7A1A]" />, name: "Otomatisasi Kado Ulang Tahun", desc: "Kirimkan kode voucher diskon khusus secara otomatis saat pelanggan berulang tahun." }
      ],
      mockup: (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-md space-y-3">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-[10px] font-black text-gray-800">👑 Level Membership</span>
            <span className="text-[9px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">VIP Gold</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] text-gray-500">
              <span>Loyalty Poin</span>
              <span className="font-extrabold text-gray-800">4,850 Poin</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-[#FF7A1A] w-[75%]"></div>
            </div>
            <p className="text-[8px] text-gray-400 mt-1">Sisa 1,150 poin lagi untuk diskon VIP 15%</p>
          </div>
          <div className="border border-dashed border-[#FF7A1A]/30 bg-[#FFF8F0] p-2 rounded-lg text-center text-[9px] text-[#FF7A1A] font-bold">
            Voucher Diskon Aktif: HAYA20%
          </div>
        </div>
      )
    }
  };

  const activeFeatureData = featuresList[featureTab];

  // User Workflow Steps Details
  const workflowSteps = [
    { step: 1, title: "Kunjungan Halaman", desc: "Pengusaha catering memperkenalkan platform pemesanan web digital kepada pelanggan barunya." },
    { step: 2, title: "Daftar Akun Member", desc: "Pelanggan mendaftar lewat form instan secara mandiri di halaman web katering mitra." },
    { step: 3, title: "Masuk Dashboard Member", desc: "Pelanggan melihat catalog menu, riwayat poin member, dan promo aktif miliknya." },
    { step: 4, title: "Pemesanan Menu Katering", desc: "Pelanggan memilih jenis menu harian, porsi, jadwal kirim, dan mengisi alamat pengantaran." },
    { step: 5, title: "Bayar Instan Otomatis", desc: "Melakukan transfer VA Bank/QRIS yang terverifikasi instan tanpa verifikasi admin manual." },
    { step: 6, title: "Pelacakan Rute Kurir", desc: "Dapur memproses order harian, kurir mengantar, pelanggan memantau peta Maps real-time." },
    { step: 7, title: "Feedback & Repeat Order", desc: "Memberi ulasan kepuasan, menerima poin loyalti VIP, lalu kembali order karena ketagihan." }
  ];

  const workflowMockups = {
    1: (
      <div className="bg-[#FFF8F0] border border-[#FF7A1A]/20 rounded-2xl p-5 space-y-2.5">
        <h4 className="text-xs font-black text-[#FF7A1A] font-poppins">🌐 Halaman Depan Katering</h4>
        <div className="h-20 bg-white rounded-xl border border-gray-100 flex flex-col justify-center items-center p-2 text-center">
          <p className="text-[9px] font-black text-gray-800">"Selamat Datang di Haya Catering Pekanbaru"</p>
          <p className="text-[8px] text-gray-400 mt-0.5">Nikmati makanan box higienis harian terbaik.</p>
          <div className="mt-2 bg-[#FF7A1A] text-white text-[7px] font-bold px-3 py-1 rounded-full">Jelajahi Menu Harian</div>
        </div>
      </div>
    ),
    2: (
      <div className="bg-[#FFF8F0] border border-[#FF7A1A]/20 rounded-2xl p-5 space-y-2">
        <h4 className="text-xs font-black text-[#FF7A1A] font-poppins">📝 Pendaftaran Akun Cepat</h4>
        <div className="space-y-1 bg-white rounded-xl border border-gray-100 p-3">
          <input disabled type="text" placeholder="Nama Lengkap" className="w-full text-[8px] p-1.5 border rounded bg-gray-50 outline-none" />
          <input disabled type="email" placeholder="E-mail Bisnis" className="w-full text-[8px] p-1.5 border rounded bg-gray-50 outline-none" />
          <div className="h-6 rounded bg-[#FF7A1A] text-white flex items-center justify-center text-[7px] font-bold">Daftar Akun Member</div>
        </div>
      </div>
    ),
    3: (
      <div className="bg-[#FFF8F0] border border-[#FF7A1A]/20 rounded-2xl p-5 space-y-2">
        <h4 className="text-xs font-black text-[#FF7A1A] font-poppins">👤 Dashboard Member Klien</h4>
        <div className="bg-white rounded-xl border border-gray-100 p-3 space-y-2 text-[8px]">
          <div className="flex justify-between items-center border-b pb-1">
            <span className="font-extrabold text-gray-700">Halo, Haya Nur Rizky 👋</span>
            <span className="font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Silver Member</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Point Aktif: <b>1,420 Poin</b></span>
            <span>Voucher: <b>3 Aktif</b></span>
          </div>
        </div>
      </div>
    ),
    4: (
      <div className="bg-[#FFF8F0] border border-[#FF7A1A]/20 rounded-2xl p-5 space-y-2">
        <h4 className="text-xs font-black text-[#FF7A1A] font-poppins">🍱 Pilih & Pesan Menu</h4>
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-[8px] space-y-1.5">
          <div className="flex justify-between items-center">
            <span>Nasi Box Special Ayam Bakar</span>
            <span className="font-extrabold text-[#FF7A1A]">Rp25.000</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Jumlah:</span>
            <span className="border px-2 py-0.5 rounded text-gray-700 font-bold bg-gray-50">10 Porsi</span>
          </div>
          <div className="h-6 bg-[#FF7A1A] text-white rounded flex items-center justify-center font-bold text-[7px]">Lanjut Pembayaran</div>
        </div>
      </div>
    ),
    5: (
      <div className="bg-[#FFF8F0] border border-[#FF7A1A]/20 rounded-2xl p-5 space-y-2">
        <h4 className="text-xs font-black text-[#FF7A1A] font-poppins">💳 Verifikasi Pembayaran Instan</h4>
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-center space-y-2">
          <div className="h-10 w-10 bg-gray-100 rounded-lg mx-auto flex items-center justify-center text-[18px]">📱</div>
          <p className="text-[7px] text-gray-400">Pindai kode QRIS di atas untuk membayar invoice.</p>
          <div className="h-5 bg-emerald-50 border border-emerald-200 rounded text-[7px] text-emerald-600 font-bold flex items-center justify-center gap-1">
            ✓ Pembayaran Terkonfirmasi Lunas
          </div>
        </div>
      </div>
    ),
    6: (
      <div className="bg-[#FFF8F0] border border-[#FF7A1A]/20 rounded-2xl p-5 space-y-2">
        <h4 className="text-xs font-black text-[#FF7A1A] font-poppins">🚚 Pengiriman & Tracking</h4>
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-[8px] space-y-1">
          <div className="flex justify-between text-gray-500">
            <span>Kurir: <b>Andi Wijaya</b></span>
            <span>Jarak: <b>3.2 KM</b></span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#FF7A1A] animate-pulse w-[65%]"></div>
          </div>
          <p className="text-[7px] text-emerald-600 font-semibold">Kurir berada dekat lokasi Anda...</p>
        </div>
      </div>
    ),
    7: (
      <div className="bg-[#FFF8F0] border border-[#FF7A1A]/20 rounded-2xl p-5 space-y-2">
        <h4 className="text-xs font-black text-[#FF7A1A] font-poppins">⭐ Loyalty & Feedback</h4>
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-center space-y-2 text-[8px]">
          <p className="font-extrabold text-gray-700">Beri Rating Makanan Anda</p>
          <div className="flex justify-center gap-1 text-amber-400 text-[10px]">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          <div className="h-5 bg-[#FF7A1A] text-white rounded flex items-center justify-center font-bold text-[7px]">
            +100 Poin Loyalty Ditambahkan
          </div>
        </div>
      </div>
    )
  };

  // Testimonials list
  const testimonials = [
    {
      name: "Siska Amelia",
      role: "Pemilik Delish Catering, Jakarta",
      quote: "Semenjak menggunakan CaterBox CRM, repeat order dari klien korporat kami naik hingga 40%. Manajemen poin loyalitas otomatis membuat klien kami betah dan enggan melirik kompetitor lain!",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      name: "Hendra Wijaya",
      role: "Manajer Operasional Royal Bento, Bandung",
      quote: "Fitur verifikasi invoice otomatis via Payment Gateway dan integrasi WhatsApp Notification sangat menghemat waktu. Admin operasional kami tidak perlu lagi memeriksa mutasi rekening satu per satu secara manual.",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      name: "Dewi Lestari",
      role: "Pendiri Dapur Bunda, Surabaya",
      quote: "Input pesanan langganan bulanan ratusan porsi menjadi sangat rapi. Dashboard koki di dapur bisa langsung membaca rekap kuantitas porsi harian tanpa slip komunikasi. Sangat direkomendasikan!",
      avatar: "👩‍🍳",
      rating: 5
    }
  ];

  // FAQ list
  const faqs = [
    { q: "Apa itu CaterBox CRM?", a: "CaterBox CRM adalah platform manajemen hubungan pelanggan (CRM) dan manajemen pemesanan berbasis cloud yang dirancang khusus untuk membantu pengusaha catering mengotomatisasi transaksi, pembayaran, keanggotaan member, kampanye promosi, dan pelaporan analisis bisnis." },
    { q: "Apakah saya bisa mencoba CaterBox CRM secara gratis?", a: "Ya! Kami menyediakan program uji coba gratis (Free Trial) selama 14 hari dengan akses penuh ke seluruh fitur premium kami. Anda tidak perlu memasukkan kartu kredit untuk mendaftar." },
    { q: "Bagaimana cara kerja fitur Loyalty Points dan Membership?", a: "Sistem akan otomatis menghitung akumulasi poin setiap kali pelanggan melakukan transaksi selesai. Pemilik catering dapat menetapkan jumlah poin per nominal transaksi dan membuat tingkat member (misal: Bronze, Silver, Gold) dengan diskon khusus kustom." },
    { q: "Apakah CaterBox CRM terintegrasi dengan WhatsApp?", a: "Tentu saja. CaterBox CRM memiliki integrasi bawaan dengan WhatsApp API Gateway untuk mengirimkan notifikasi tagihan invoice, konfirmasi pesanan berhasil, rincian status kurir, hingga ucapan ulang tahun otomatis." },
    { q: "Metode pembayaran apa saja yang didukung?", a: "Kami terintegrasi dengan Midtrans Payment Gateway, sehingga pelanggan Anda dapat membayar menggunakan Transfer Virtual Account (VA) Bank, kartu kredit/debit, QRIS, GoPay, OVO, ShopeePay, dan LinkAja secara real-time." },
    { q: "Apakah data pelanggan catering saya aman?", a: "Keamanan data adalah prioritas utama kami. Seluruh database dienkripsi menggunakan standar keamanan industri, di-hosting di infrastruktur cloud Supabase yang aman, dan dilengkapi dengan backup otomatis harian." },
    { q: "Apakah saya bisa membuat akun khusus staf, dapur, dan kurir?", a: "Ya. Fitur Role & User Management kami memungkinkan pemilik catering membatasi hak akses. Koki di dapur hanya melihat menu & porsi masak, kurir hanya melihat alamat kirim, dan admin pemasar melihat laporan penjualan." },
    { q: "Bagaimana integrasi Google Maps membantu pengiriman?", a: "Sistem menghitung jarak tempuh dari dapur Anda ke lokasi pengiriman pelanggan secara otomatis guna menghitung tarif ongkos kirim yang tepat dan memberikan visualisasi peta jalan bagi kurir." },
    { q: "Bagaimana cara kerja fitur Campaign Promo?", a: "Anda dapat memfilter database pelanggan berdasarkan perilaku belanja (misal: pelanggan langganan yang tidak order dalam 30 hari) dan mengirimkan e-mail atau WhatsApp voucher potongan harga kepada mereka sekaligus." },
    { q: "Siapa yang dapat saya hubungi jika membutuhkan bantuan teknis?", a: "Tim Customer Support kami siap siaga mendampingi Anda 24 jam sehari, 7 hari seminggu. Anda bisa menghubungi kami melalui live chat WhatsApp di pojok kanan bawah halaman atau e-mail ke support@caterbox.com." }
  ];

  const handleFaqToggle = (index) => {
    setOpenFaq((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSuccess(true);
    setTimeout(() => {
      setDemoSuccess(false);
      setShowDemoModal(false);
      setDemoForm({ name: "", catering: "", phone: "", date: "", time: "" });
    }, 2500);
  };

  const handleTrialSubmit = (e) => {
    e.preventDefault();
    setTrialSuccess(true);
    const mockUser = {
      name: trialForm.name,
      email: trialForm.email,
      role: "admin",
      catering: trialForm.catering
    };
    localStorage.setItem("user", JSON.stringify(mockUser));
    setTimeout(() => {
      setTrialSuccess(false);
      setShowTrialModal(false);
      navigate("/dashboard");
    }, 2000);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EE] to-[#FFFDF9] font-sans text-gray-800 antialiased selection:bg-[#FF7A1A] selection:text-white">
      
      {/* 1. STICKY NAVBAR GLASSMORPHISM (ORANGE STYLE) */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100/50 shadow-sm transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍱</span>
            <span className="text-xl font-bold font-poppins tracking-tight text-gray-900">
              Cater<span className="text-[#FF7A1A]">Box</span> <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#FF7A1A] text-white px-2 py-0.5 rounded-md ml-1">CRM</span>
            </span>
          </div>

          <div className="hidden items-center gap-8 text-sm font-semibold text-gray-600 md:flex">
            <a href="#home" className="text-[#FF7A1A] hover:opacity-85 transition-opacity">Home</a>
            <a href="#features" className="hover:text-[#FF7A1A] transition-colors">Solusi CRM</a>
            <a href="#workflow" className="hover:text-[#FF7A1A] transition-colors">Alur Kerja</a>
            <a href="#pricing" className="hover:text-[#FF7A1A] transition-colors">Harga Paket</a>
            <a href="#faq" className="hover:text-[#FF7A1A] transition-colors">FAQ</a>
            <Link to="/company-profile" className="hover:text-[#FF7A1A] transition-colors font-bold flex items-center gap-1">
              Doc PRD <Sparkles className="h-3 w-3 text-[#FF7A1A] animate-pulse" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-bold text-[#FF7A1A] hover:underline"
            >
              Masuk
            </Link>
            <button
              onClick={() => setShowTrialModal(true)}
              className="rounded-full bg-[#FF7A1A] hover:bg-[#e0650d] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Mulai Gratis
            </button>
          </div>
        </div>
      </nav>

      {/* 2. REDESIGNED HERO SECTION (SPLIT-CARD OVERLAYING INTERFACE) */}
      <section
        id="home"
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-[1.1fr_1fr] md:px-8 lg:pt-24"
      >
        <div className="absolute top-10 left-10 -z-10 h-72 w-72 rounded-full bg-orange-100/50 blur-3xl" />
        <div className="absolute bottom-20 right-10 -z-10 h-80 w-80 rounded-full bg-red-100/40 blur-3xl" />

        <div className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF8F0] px-4 py-1.5 text-xs font-bold text-[#FF7A1A] border border-orange-200/50">
            <Sparkles className="h-3.5 w-3.5 text-[#FF7A1A]" />
            <span>SaaS CRM Catering Pertama di Indonesia</span>
          </div>

          <h1 className="text-4xl font-black leading-[1.15] text-gray-900 font-poppins sm:text-5xl lg:text-6xl">
            Kelola Bisnis Catering Lebih{" "}
            <span className="inline-block -rotate-2 rounded-2xl bg-gradient-to-r from-[#FF7A1A] to-[#FF4D2D] px-5 py-1.5 text-white shadow-md">
              Mudah
            </span>
            <br />
            Bersama CaterBox CRM
          </h1>

          <p className="mx-auto max-w-lg text-base leading-relaxed text-gray-500 md:mx-0">
            Satukan database data pelanggan, pemesanan katering berkala, status pembayaran terverifikasi otomatis, dan manajemen campaign loyalty membership dalam satu dasbor terintegrasi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
            <button
              onClick={() => setShowTrialModal(true)}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A1A] to-[#FF4D2D] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-orange-500/20 transition-all hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              Mulai Uji Coba Gratis
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setShowDemoModal(true)}
              className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-7 py-4 text-sm font-bold text-[#FF7A1A] hover:bg-[#FFF8F0] transition-all hover:scale-105 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              Jadwalkan Sesi Demo
            </button>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6 pt-4 text-xs font-semibold text-gray-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#FF7A1A]" />
              <span>Free 14-day Trial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#FF7A1A]" />
              <span>Instan Setup</span>
            </div>
          </div>
        </div>

        {/* HERO APP PREVIEW / OVERLAY CARD DESIGN */}
        <div className="relative flex flex-col justify-center items-center py-6">
          {/* Decorative Back Card */}
          <div className="absolute -top-4 -left-4 w-72 bg-gradient-to-br from-amber-400 to-[#FF7A1A] h-48 rounded-3xl -rotate-6 shadow-xl opacity-20" />
          
          {/* Main Mockup Screen */}
          <div className="relative w-full max-w-md bg-white rounded-[2rem] border border-orange-100 shadow-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b pb-3 mb-1">
              <div className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 bg-red-400 rounded-full"></div>
                <div className="h-2.5 w-2.5 bg-yellow-400 rounded-full"></div>
                <div className="h-2.5 w-2.5 bg-green-400 rounded-full"></div>
              </div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Dashboard Panel</span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="bg-[#FFF8F0] p-3 rounded-2xl border border-orange-100/50">
                <span className="text-[8px] font-bold text-gray-400 uppercase">Omzet Minggu Ini</span>
                <p className="text-xs font-extrabold text-[#FF7A1A] mt-0.5">Rp28.450.000</p>
              </div>
              <div className="bg-[#FFF8F0] p-3 rounded-2xl border border-orange-100/50">
                <span className="text-[8px] font-bold text-gray-400 uppercase">Pelanggan Aktif</span>
                <p className="text-xs font-extrabold text-gray-900 mt-0.5">342 Pembeli</p>
              </div>
            </div>

            {/* Simulated Live Order Bar */}
            <div className="rounded-xl border border-gray-100 p-3 text-left space-y-2 bg-gray-50/50">
              <div className="flex items-center justify-between text-[9px]">
                <span className="font-extrabold text-gray-700 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Pembayaran Sukses
                </span>
                <span className="text-gray-400 font-bold">1 menit yang lalu</span>
              </div>
              <div className="text-[9px]">
                <span className="font-bold text-[#FF7A1A]">Haya Catering</span> menerima transfer lunas <b>Rp500.000</b> untuk pesanan <b>#1093</b> via QRIS.
              </div>
            </div>

            {/* WhatsApp notification simulation overlay card */}
            <div className="absolute -bottom-8 -right-4 w-64 bg-white rounded-2xl border border-emerald-100 shadow-xl p-3 text-left flex gap-2.5 items-start rotate-2 animate-bounce-slow">
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-base">
                <FaWhatsapp />
              </div>
              <div className="text-[9px] flex-1">
                <div className="flex justify-between font-bold text-emerald-800">
                  <span>WhatsApp Notif</span>
                  <span>Instan</span>
                </div>
                <p className="text-gray-600 mt-0.5 leading-relaxed">Invoice Lunas dikirim ke nomor WA pelanggan otomatis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF COUNTERS */}
      <section className="bg-[#FF7A1A] text-white py-10 my-8">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black font-poppins">10.000+</h2>
            <p className="text-xs text-orange-100/90 font-medium mt-1">Customers Terdaftar</p>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-black font-poppins">500.000+</h2>
            <p className="text-xs text-orange-100/90 font-medium mt-1">Total Order Diproses</p>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-black font-poppins">Rp 12M+</h2>
            <p className="text-xs text-orange-100/90 font-medium mt-1">Transaksi Terverifikasi</p>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-black font-poppins">8.500+</h2>
            <p className="text-xs text-orange-100/90 font-medium mt-1">Active VIP Members</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-3xl lg:text-4xl font-black font-poppins">150+</h2>
            <p className="text-xs text-orange-100/90 font-medium mt-1">Mitra Dapur Catering</p>
          </div>
        </div>
      </section>

      {/* 4. PREVIEW DASHBOARD DETAILS (INTERACTIVE VIEW) */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A1A]">Preview Dasbor CRM</span>
          <h2 className="text-3xl font-black font-poppins sm:text-4xl text-gray-900">Kendali Penuh Manajemen Bisnis Anda</h2>
          <p className="mx-auto max-w-md text-sm text-gray-500">Klik tab di bawah untuk menyaring data simulasi omzet dan grafik operasional.</p>
        </div>

        <div className="mx-auto max-w-4xl bg-white rounded-3xl border border-orange-100 shadow-2xl p-6 md:p-8">
          
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#FF7A1A] animate-pulse"></span>
              <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest">CaterBox CRM Live Monitor</h4>
            </div>

            <div className="flex p-0.5 bg-[#FFF8F0] rounded-xl border border-orange-100/50">
              {["weekly", "monthly", "yearly"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDashboardTab(tab)}
                  className={`px-4 py-1.5 text-[10px] font-bold rounded-lg capitalize transition-all cursor-pointer ${
                    dashboardTab === tab ? "bg-[#FF7A1A] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab === "weekly" ? "Minggu Ini" : tab === "monthly" ? "Bulan Ini" : "Tahun Ini"}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { title: "Total Revenue", value: selectedDashboard.revenue, growth: selectedDashboard.revenueGrowth },
              { title: "Customers", value: selectedDashboard.customers, growth: selectedDashboard.customerGrowth },
              { title: "Total Orders", value: selectedDashboard.orders, growth: selectedDashboard.orderGrowth },
              { title: "Active Members", value: selectedDashboard.activeMembers, growth: selectedDashboard.memberGrowth }
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left">
                <span className="text-[9px] font-bold text-gray-400 uppercase">{stat.title}</span>
                <h3 className="text-base font-extrabold text-gray-900 mt-1 font-poppins">{stat.value}</h3>
                <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1.5 inline-block">{stat.growth}</span>
              </div>
            ))}
          </div>

          {/* Analytical Bar Graph */}
          <div className="bg-[#FF7A1A] rounded-2xl p-5 text-white relative overflow-hidden mb-8 min-h-[180px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            <div className="flex justify-between items-center z-10 text-[10px] font-bold">
              <span>GRAFIK PENJUALAN CATERING</span>
              <span className="bg-white/10 px-2.5 py-0.5 rounded-full">Otomatis Ter-update</span>
            </div>
            
            <div className="flex items-end justify-between gap-3 h-24 mt-4 z-10">
              {selectedDashboard.chartHeights.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div
                    className="w-full bg-white/35 group-hover:bg-white rounded-t-md transition-all duration-300 relative"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-[8px] font-black px-1.5 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                      {height}%
                    </div>
                  </div>
                  <span className="text-[8px] font-bold text-orange-100 uppercase">{selectedDashboard.chartLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Staf Activities & Best Sellers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase block mb-3">Makanan Terlaris</span>
              <div className="space-y-2">
                {selectedDashboard.bestSeller.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-orange-100 transition-colors">
                    <span className="text-xs font-bold text-gray-800">{item.name}</span>
                    <span className="text-[10px] font-extrabold text-[#FF7A1A] bg-[#FFF8F0] px-2 py-0.5 rounded-lg border border-orange-100/50">{item.sold}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase block mb-3">Aktivitas Sistem Real-Time</span>
              <div className="space-y-2">
                {selectedDashboard.activities.map((activity, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-[10px] space-y-1">
                    <p className="text-gray-600">
                      <b className="text-gray-800">{activity.user}</b> {activity.desc}
                    </p>
                    <span className="text-[8px] text-gray-400 font-bold block">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PROBLEM & SOLUTION SECTION (REDESIGNED LAYOUT) */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 border-t border-gray-100">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A1A]">Solusi Kunci</span>
          <h2 className="text-3xl font-black font-poppins sm:text-4xl text-gray-900">Ubah Kekacauan Menjadi Keuntungan</h2>
          <p className="mx-auto max-w-md text-sm text-gray-500">Bagaimana CaterBox CRM menyelesaikan pusing harian operasional katering Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 bg-white rounded-3xl border border-orange-100 text-left space-y-4">
            <span className="text-3xl">📝</span>
            <h3 className="text-sm font-extrabold text-gray-900 font-poppins">Pencatatan Rapi</h3>
            <p className="text-xs leading-relaxed text-gray-500">
              Tidak ada lagi kertas pesanan hilang. Semua data pembeli, jadwal porsi menu harian, dan alamat kurir tersimpan rapi di basis data.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-orange-100 text-left space-y-4">
            <span className="text-3xl">🤖</span>
            <h3 className="text-sm font-extrabold text-gray-900 font-poppins">Invoice & Bayar Otomatis</h3>
            <p className="text-xs leading-relaxed text-gray-500">
              Midtrans memverifikasi status pembayaran pembeli Anda dalam hitungan detik. Admin tidak perlu bolak-balik memeriksa bukti transfer WhatsApp.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-orange-100 text-left space-y-4">
            <span className="text-3xl">📈</span>
            <h3 className="text-sm font-extrabold text-gray-900 font-poppins">Kunci Loyalitas VIP</h3>
            <p className="text-xs leading-relaxed text-gray-500">
              Biarkan sistem menghitung poin loyalty anggota dan memicu pengiriman campaign WhatsApp voucher diskon secara terjadwal otomatis.
            </p>
          </div>

        </div>
      </section>

      {/* 6. REDESIGNED FEATURE HUB (INTERACTIVE HOVER PREVIEW ON THE RIGHT) */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16 md:px-8 border-t border-gray-100">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A1A]">Klasifikasi Fitur 360</span>
          <h2 className="text-3xl font-black font-poppins sm:text-4xl text-gray-900">Solusi CRM End-to-End</h2>
        </div>

        {/* Feature Hub Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: "operational", name: "Operational CRM" },
            { id: "analytical", name: "Analytical CRM" },
            { id: "collaborative", name: "Collaborative CRM" },
            { id: "strategic", name: "Strategic CRM" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFeatureTab(tab.id)}
              className={`px-6 py-3 text-xs font-bold rounded-full border transition-all cursor-pointer ${
                featureTab === tab.id
                  ? "bg-[#FF7A1A] text-white border-[#FF7A1A] shadow-md shadow-orange-500/10"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-[#FFF8F0]"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Layout: Info Grid Left, Mockup App Screen Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center bg-[#FFF8F0]/40 rounded-[2.5rem] border border-orange-100 p-8 lg:p-12 text-left">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black text-gray-900 font-poppins">{activeFeatureData.title}</h3>
              <p className="text-xs font-bold text-[#FF7A1A] mt-1 uppercase">{activeFeatureData.subtitle}</p>
            </div>
            <p className="text-xs leading-relaxed text-gray-500">{activeFeatureData.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeFeatureData.items.map((item, index) => (
                <div key={index} className="flex gap-3 items-start p-3 bg-white rounded-xl border border-orange-100/30">
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <h5 className="text-[11px] font-extrabold text-gray-900 font-poppins">{item.name}</h5>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Feature Visual Preview Mockup on the right */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm rotate-1 hover:rotate-0 transition-transform duration-300">
              {activeFeatureData.mockup}
            </div>
          </div>

        </div>
      </section>

      {/* 7. REDESIGNED WORKFLOW VISUALIZER (VERTICAL TIMELINE WITH LIVE MOCKUPS) */}
      <section id="workflow" className="mx-auto max-w-7xl px-6 py-16 md:px-8 border-t border-gray-100">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A1A]">Alur Pengguna</span>
          <h2 className="text-3xl font-black font-poppins sm:text-4xl text-gray-900">Bagaimana Sistem Berjalan Harian</h2>
          <p className="mx-auto max-w-md text-sm text-gray-500">Klik langkah-langkah di sisi kiri untuk melihat tampilan simulasi aplikasinya di sisi kanan.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-center bg-white rounded-[2.5rem] border border-orange-100 p-6 md:p-10 shadow-sm text-left">
          
          {/* Vertical step list */}
          <div className="space-y-3">
            {workflowSteps.map((step) => (
              <button
                key={step.step}
                onClick={() => setWorkflowStep(step.step)}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  workflowStep === step.step
                    ? "bg-[#FFF8F0] border-[#FF7A1A] shadow-sm"
                    : "bg-white border-transparent hover:bg-gray-50/50"
                }`}
              >
                <span className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs font-poppins ${
                  workflowStep === step.step ? "bg-[#FF7A1A] text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {step.step}
                </span>
                <div className="flex-1">
                  <h4 className="text-xs font-extrabold text-gray-900 font-poppins">{step.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Step Visualizer Mockup Panel on the Right */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <div className="bg-white rounded-3xl border border-orange-100 shadow-xl p-4 text-center space-y-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Visualisasi Langkah {workflowStep}</span>
                
                {workflowMockups[workflowStep]}
                
                <div className="flex justify-between text-[10px] font-bold text-[#FF7A1A] pt-2">
                  <button
                    disabled={workflowStep === 1}
                    onClick={() => setWorkflowStep((prev) => Math.max(1, prev - 1))}
                    className="disabled:opacity-30 cursor-pointer hover:underline"
                  >
                    ← Kembali
                  </button>
                  <button
                    disabled={workflowStep === 7}
                    onClick={() => setWorkflowStep((prev) => Math.min(7, prev + 1))}
                    className="disabled:opacity-30 cursor-pointer hover:underline"
                  >
                    Lanjut →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIAL CAROUSEL */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:px-8 border-t border-gray-100">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A1A]">Testimoni Pengguna</span>
          <h2 className="text-3xl font-black font-poppins sm:text-4xl text-gray-900">Kisah Sukses Mitra Katering</h2>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-white shadow-2xl md:p-12 text-left">
          <FaQuoteLeft className="text-5xl text-orange-500/20 absolute left-6 top-6" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="space-y-4 max-w-xl">
              <div className="flex gap-1 text-amber-400 text-sm">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-sm md:text-base font-medium leading-relaxed text-gray-300">
                “{testimonials[activeTestimonial].quote}”
              </p>
              <div>
                <h4 className="font-extrabold text-xs text-white font-poppins">{testimonials[activeTestimonial].name}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">{testimonials[activeTestimonial].role}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="h-24 w-24 rounded-full bg-orange-500/10 border-4 border-[#FF7A1A] flex items-center justify-center text-5xl shadow-lg">
                {testimonials[activeTestimonial].avatar}
              </div>
              
              <div className="flex gap-2 mt-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
                      activeTestimonial === i ? "bg-[#FF7A1A] w-6" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ GRID ACCORDIONS (10 ITEMS) */}
      <section id="faq" className="mx-auto max-w-4xl px-6 py-16 md:px-8 border-t border-gray-100">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A1A]">FAQ Accordion</span>
          <h2 className="text-3xl font-black font-poppins sm:text-4xl text-gray-900">Pertanyaan yang Sering Diajukan</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq[index] || false;
            return (
              <div key={index} className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden hover:border-orange-200/60 transition-colors">
                <button
                  onClick={() => handleFaqToggle(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-800 text-xs sm:text-sm font-poppins cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <FaChevronUp className="text-gray-400 text-xs" /> : <FaChevronDown className="text-gray-400 text-xs" />}
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 border-t border-gray-50 mt-2 text-left">
                    <p className="text-xs leading-relaxed text-gray-500">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. FINAL CTA BANNER (ORANGE STYLE) */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 py-12 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#FF7A1A] p-8 text-white text-center shadow-xl md:p-16 space-y-6">
          <div className="absolute -right-20 -top-20 h-60 w-60 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-20 -bottom-20 h-60 w-60 bg-red-500/10 rounded-full blur-2xl" />

          <h2 className="text-3xl md:text-5xl font-black font-poppins leading-tight">Siap Mengotomasi Catering Anda?</h2>
          <p className="mx-auto max-w-lg text-xs md:text-sm text-orange-100/90 leading-relaxed">
            Hentikan pencatatan manual. Hemat puluhan jam operasional input pesanan katering harian, dan naikkan loyalitas pelanggan Anda hari ini.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setShowTrialModal(true)}
              className="rounded-full bg-white hover:bg-gray-50 px-8 py-4 text-sm font-bold text-[#FF7A1A] shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Mulai Uji Coba Gratis 14 Hari
            </button>
            <button
              onClick={() => setShowDemoModal(true)}
              className="rounded-full border border-white bg-transparent hover:bg-white/10 px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Jadwalkan Demo Langsung
            </button>
          </div>
        </div>
      </section>

      {/* 11. NEWSLETTER & FOOTER */}
      <footer className="bg-white border-t border-gray-100 px-6 py-12 md:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          
          {/* Newsletter Box */}
          <div className="flex flex-col gap-6 border-b border-gray-100 pb-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1 text-left">
              <h2 className="text-xl font-black font-poppins text-gray-900">
                Gabung <span className="text-[#FF7A1A]">Newsletter</span> Kami
              </h2>
              <p className="text-xs text-gray-400">
                Dapatkan e-mail info rilis fitur baru, kupon diskon khusus partner, dan tips memajukan bisnis kuliner.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="email"
                  required
                  placeholder="Masukkan alamat e-mail"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full sm:w-72 rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-xs outline-none focus:border-[#FF7A1A] focus:bg-white transition-colors"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-[#FF7A1A] hover:bg-[#e0650d] px-6 py-3 text-xs font-bold text-white shadow-lg cursor-pointer"
              >
                Langganan
              </button>
            </form>
          </div>

          {/* Success messages for newsletter */}
          {newsletterSuccess && (
            <div className="text-xs text-emerald-600 bg-emerald-50 p-3 rounded-lg text-center font-bold">
              ✓ Anda berhasil terdaftar ke newsletter kami!
            </div>
          )}

          {/* Grid Footer Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5 text-left">
            <div className="col-span-2 sm:col-span-3 md:col-span-1 space-y-3">
              <h1 className="text-xl font-black font-poppins">
                Cater<span className="text-[#FF7A1A]">Box</span> <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FF7A1A] text-white px-2 py-0.5 rounded">CRM</span>
              </h1>
              <p className="text-xs leading-relaxed text-gray-400">
                Penyedia sistem Customer Relationship Management (CRM) SaaS khusus untuk mengoptimalkan operasional dan omzet bisnis catering modern.
              </p>
              <div className="flex gap-3 text-sm text-gray-400 pt-1">
                <a href="#" className="hover:text-[#FF7A1A] transition-colors"><FaInstagram /></a>
                <a href="#" className="hover:text-[#FF7A1A] transition-colors"><FaWhatsapp /></a>
                <a href="#" className="hover:text-[#FF7A1A] transition-colors"><FaFacebook /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider font-poppins">Produk</h4>
              <ul className="mt-3 space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-gray-600">Operational CRM</a></li>
                <li><a href="#" className="hover:text-gray-600">Analytical CRM</a></li>
                <li><a href="#" className="hover:text-gray-600">Collaborative CRM</a></li>
                <li><a href="#" className="hover:text-gray-600">Strategic CRM</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider font-poppins">Layanan</h4>
              <ul className="mt-3 space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-gray-600">Free Trial Setup</a></li>
                <li><a href="#" className="hover:text-gray-600">Custom Integration</a></li>
                <li><a href="#" className="hover:text-gray-600">Training Operasional</a></li>
                <li><a href="#" className="hover:text-gray-600">Premium Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider font-poppins">Bantuan</h4>
              <ul className="mt-3 space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-gray-600">Hubungi Kami</a></li>
                <li><a href="#faq" className="hover:text-gray-600">FAQ</a></li>
                <li><a href="#" className="hover:text-gray-600">Sistem Keamanan</a></li>
                <li><a href="#" className="hover:text-gray-600">Dokumentasi API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider font-poppins">Perusahaan</h4>
              <ul className="mt-3 space-y-2 text-xs text-gray-400">
                <li><Link to="/company-profile" className="hover:text-gray-600">Tentang Kami</Link></li>
                <li><a href="#" className="hover:text-gray-600">Karir Pemasar</a></li>
                <li><a href="#" className="hover:text-gray-600">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-gray-600">Kebijakan Privasi</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 text-center text-[11px] text-gray-400">
            © 2026 CaterBox CRM SaaS Platform. Hak Cipta Dilindungi Undang-Undang.
          </div>
        </div>
      </footer>

      {/* ================= MODALS ================= */}

      {/* MODAL 1: BOOKING DEMO FORM */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl relative border border-gray-100 text-left animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-lg font-bold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-gray-900 font-poppins flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#FF7A1A]" />
              Jadwalkan Live Demo
            </h3>
            <p className="text-xs text-gray-400 mt-1 mb-6">Pilih jadwal meeting presentasi CaterBox CRM langsung bersama konsultan kami.</p>

            {demoSuccess ? (
              <div className="space-y-4 text-center py-6">
                <div className="h-12 w-12 rounded-full bg-orange-50 text-[#FF7A1A] flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-sm font-extrabold text-gray-900 font-poppins">Jadwal Demo Diterima!</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Terima kasih, <b>{demoForm.name}</b>. Tim kami akan menghubungi Anda via WhatsApp ke nomor <b>{demoForm.phone}</b> untuk konfirmasi link Zoom pada tanggal {demoForm.date} pukul {demoForm.time}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-gray-600 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={demoForm.name}
                    onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                    placeholder="Nama Anda"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF7A1A] bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Nama Usaha Catering</label>
                  <input
                    type="text"
                    required
                    value={demoForm.catering}
                    onChange={(e) => setDemoForm({ ...demoForm, catering: e.target.value })}
                    placeholder="Nama Catering Anda"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF7A1A] bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Nomor WhatsApp Aktif</label>
                  <input
                    type="tel"
                    required
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                    placeholder="Contoh: 081234567890"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF7A1A] bg-gray-50/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-600 mb-1">Tanggal</label>
                    <input
                      type="date"
                      required
                      value={demoForm.date}
                      onChange={(e) => setDemoForm({ ...demoForm, date: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF7A1A] bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Waktu</label>
                    <input
                      type="time"
                      required
                      value={demoForm.time}
                      onChange={(e) => setDemoForm({ ...demoForm, time: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF7A1A] bg-gray-50/50"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 bg-[#FF7A1A] hover:bg-[#e0650d] text-white rounded-xl font-bold cursor-pointer text-center text-xs shadow-md shadow-orange-500/10"
                >
                  Konfirmasi Jadwal Meeting Demo
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: REGISTER FREE TRIAL */}
      {showTrialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl relative border border-gray-100 text-left animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowTrialModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-lg font-bold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-gray-900 font-poppins flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#FF7A1A]" />
              Mulai Uji Coba Gratis
            </h3>
            <p className="text-xs text-gray-400 mt-1 mb-6">Coba seluruh kekuatan fitur CRM selama 14 hari penuh secara gratis tanpa komitmen kartu kredit.</p>

            {trialSuccess ? (
              <div className="space-y-4 text-center py-6">
                <div className="h-12 w-12 rounded-full bg-orange-50 text-[#FF7A1A] flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-sm font-extrabold text-gray-900 font-poppins">Pendaftaran Trial Berhasil!</h4>
                <p className="text-xs text-gray-500">
                  Selamat, akun trial untuk <b>{trialForm.catering}</b> sudah aktif. Kami akan segera mengarahkan Anda masuk ke Dashboard Admin.
                </p>
                <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-[#FF7A1A] animate-pulse w-full"></div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleTrialSubmit} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-gray-600 mb-1">Nama Pemilik Catering</label>
                  <input
                    type="text"
                    required
                    value={trialForm.name}
                    onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                    placeholder="Nama Lengkap Anda"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF7A1A] bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Nama Usaha Catering</label>
                  <input
                    type="text"
                    required
                    value={trialForm.catering}
                    onChange={(e) => setTrialForm({ ...trialForm, catering: e.target.value })}
                    placeholder="Contoh: Catering Sedap Rasa"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF7A1A] bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">E-mail Bisnis</label>
                  <input
                    type="email"
                    required
                    value={trialForm.email}
                    onChange={(e) => setTrialForm({ ...trialForm, email: e.target.value })}
                    placeholder="nama@cateringkamu.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF7A1A] bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Password Baru</label>
                  <input
                    type="password"
                    required
                    value={trialForm.password}
                    onChange={(e) => setTrialForm({ ...trialForm, password: e.target.value })}
                    placeholder="Minimal 6 karakter"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#FF7A1A] bg-gray-50/50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 bg-[#FF7A1A] hover:bg-[#e0650d] text-white rounded-xl font-bold cursor-pointer text-center text-xs shadow-md shadow-orange-500/10"
                >
                  Buat Akun & Mulai Gratis 14 Hari
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}