import { Link } from "react-router-dom";
import {
  FaStar,
  FaTruck,
  FaUtensils,
  FaRocket,
  FaBoxOpen,
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaMapMarkerAlt,
  FaArrowRight,
  FaQuoteLeft,
} from "react-icons/fa";

export default function Landing() {
  const menuItems = [
    {
      title: "Nasi Box Special",
      price: "Rp25.000",
      emoji: "🥗",
      tag: "Best Seller",
    },
    {
      title: "Snack Box Premium",
      price: "Rp15.000",
      emoji: "🍝",
      tag: "Popular",
    },
    {
      title: "Paket Ayam Bakar",
      price: "Rp35.000",
      emoji: "🍗",
      tag: "Rekomendasi",
    },
    {
      title: "Lunch Box Hemat",
      price: "Rp20.000",
      emoji: "🥪",
      tag: "Hemat",
    },
    {
      title: "Paket Prasmanan",
      price: "Rp45.000",
      emoji: "🍛",
      tag: "Acara Besar",
    },
    {
      title: "Catering Wedding",
      price: "Rp75.000",
      emoji: "🍽️",
      tag: "Premium",
    },
  ];

  const features = [
    {
      icon: <FaUtensils />,
      title: "Quality Food",
      desc: "Menu catering dibuat dari bahan pilihan dan disiapkan secara higienis.",
    },
    {
      icon: <FaRocket />,
      title: "Fast Service",
      desc: "Proses pemesanan lebih cepat dan mudah melalui sistem digital.",
    },
    {
      icon: <FaTruck />,
      title: "On Time Delivery",
      desc: "Pesanan dikirim tepat waktu sesuai kebutuhan acara customer.",
    },
    {
      icon: <FaBoxOpen />,
      title: "Quality Package",
      desc: "Kemasan makanan rapi, aman, dan cocok untuk berbagai acara.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EE] to-[#FFFDF9] font-['Poppins'] text-[#2D2D2D] selection:bg-[#FF4D2D] selection:text-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <h1 className="text-2xl font-black tracking-tight">
            🍱 Cater<span className="italic text-[#FF7A1A]">Box</span>
          </h1>

          <div className="hidden items-center gap-8 text-sm font-semibold text-gray-600 md:flex">
            <a href="#home" className="text-[#FF7A1A] transition-colors">Home</a>
            <a href="#features" className="hover:text-[#FF7A1A] transition-colors">Features</a>
            <a href="#about" className="hover:text-[#FF7A1A] transition-colors">About Us</a>
            <a href="#menu" className="hover:text-[#FF7A1A] transition-colors">Our Menu</a>
            <a href="#contact" className="hover:text-[#FF7A1A] transition-colors">Contact</a>
          </div>

          <Link
            to="/login"
            className="rounded-full bg-gradient-to-r from-[#FF7A1A] to-[#FF4D2D] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-12 md:grid-cols-2 md:px-8 lg:pt-20"
      >
        {/* Decorative Blob */}
        <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-black leading-[1.15] text-[#2B2B2B] sm:text-5xl lg:text-6xl">
            Desire{" "}
            <span className="inline-block -rotate-3 rounded-2xl bg-gradient-to-r from-[#FF9800] to-[#FF7A1A] px-5 py-1.5 text-white shadow-md">
              Food
            </span>
            <br />
            for Your Taste
          </h1>

          <p className="mx-auto max-w-md text-base leading-relaxed text-gray-500 md:mx-0">
            CaterBox menyediakan layanan catering praktis untuk acara kantor,
            keluarga, seminar, dan wedding dengan pilihan menu berkualitas tinggi.
          </p>

          <div className="pt-2">
            <a
              href="#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF4D2D] to-[#FF3300] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:scale-105 hover:shadow-2xl"
            >
              Order Now 
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="relative flex justify-center pt-8 md:pt-0">
          <div className="absolute -right-4 top-4 z-10 animate-bounce rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-xl border border-orange-50">
            <span className="text-lg">🚚</span>
            <div className="inline-block text-left ml-2">
              <p className="text-xs font-black text-gray-800">Fast Delivery</p>
              <p className="text-[10px] font-bold text-gray-400">Within 30 mins</p>
            </div>
          </div>

          <div className="absolute bottom-12 -left-4 z-10 rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-xl border border-orange-50">
            <div className="flex items-center gap-1 text-[#FF4D2D] text-xs font-black">
              <FaStar /> <span className="text-gray-800">4.9 Rating</span>
            </div>
            <p className="text-[10px] font-medium text-gray-400 mt-0.5">From 1k+ happy clients</p>
          </div>

          <div className="absolute bottom-4 right-4 z-10 rounded-xl bg-white p-3 text-xs font-bold shadow-lg border border-orange-50">
            <FaMapMarkerAlt className="mr-1 inline text-[#FF4D2D]" />
            <span className="text-gray-700">Pekanbaru</span>
          </div>

          <div className="relative flex h-[340px] w-[340px] items-center justify-center rounded-[3rem] bg-gradient-to-br from-[#FFB000] to-[#FF9800] text-[140px] shadow-2xl sm:h-[400px] sm:w-[400px] sm:text-[160px]">
            <div className="absolute inset-4 rounded-[2.5rem] border-2 border-dashed border-white/30" />
            👩‍🍳
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        {features.map((item, index) => (
          <div
            key={index}
            className="group rounded-2xl bg-white p-6 border border-orange-100/50 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-orange-200"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0EC] text-2xl text-[#FF4D2D] transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </div>

            <h3 className="text-lg font-black text-gray-800">{item.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-8"
      >
        <div className="relative flex justify-center">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-orange-100 to-orange-50/50 -z-10 blur-xl" />
          <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-xl border border-orange-100/60 w-full max-w-md">
            <div className="flex h-[360px] items-center justify-center bg-gradient-to-b from-[#FFE9D6] to-[#FFF3E7] text-[150px]">
              🥘
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF4D2D]">Kenapa Kami</span>
            <h2 className="text-3xl font-black sm:text-4xl">Why People Choose us?</h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-orange-50/60 hover:border-orange-100 transition-colors">
              <h3 className="font-black text-gray-800">Convenient and Reliable</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                Pemesanan catering lebih mudah, cepat, dan dapat dipantau langsung melalui sistem terintegrasi.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm border border-orange-50/60 hover:border-orange-100 transition-colors">
              <h3 className="font-black text-gray-800">Variety of Options</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                Tersedia banyak pilihan menu variatif mulai dari nasi box harian, snack box, hingga paket prasmanan premium.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm border border-orange-50/60 hover:border-orange-100 transition-colors">
              <h3 className="font-black text-gray-800">Catering CRM System</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                Didukung manajemen otomatis untuk mengelola feedback, poin membership, serta promo menarik khusus Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLER */}
      <section id="menu" className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="mb-12 text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF4D2D]">Daftar Menu</span>
          <h2 className="text-3xl font-black sm:text-4xl">
            Our Best Seller Dishes 🔥
          </h2>
          <p className="mx-auto max-w-md text-xs text-gray-500">
            Pilihan hidangan catering favorit pelanggan yang dikurasi khusus untuk menyempurnakan setiap momen berharga Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <div key={index} className="group overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative flex h-48 items-center justify-center bg-gradient-to-b from-[#FFF5EC] to-[#FFE9D6] text-7xl transition-transform duration-500 group-hover:scale-105">
                  <span className="absolute left-4 top-4 rounded-full bg-white/80 backdrop-blur-sm px-3 py-1 text-[10px] font-extrabold text-[#FF4D2D] uppercase tracking-wider border border-orange-100">
                    {item.tag}
                  </span>
                  {item.emoji}
                </div>

                <div className="p-5">
                  <h3 className="font-black text-lg text-gray-800 tracking-tight">{item.title}</h3>
                  <div className="my-2 flex items-center gap-0.5 text-[#FFB000] text-xs">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    <span className="text-gray-400 text-[11px] ml-1 font-medium">(5.0)</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-50 mt-2">
                <span className="text-xs font-bold text-gray-400">Harga mulai</span>
                <p className="text-xl font-black text-[#FF4D2D]">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#2B2B2B] to-[#1A1A1A] p-8 text-white shadow-2xl md:p-12">
          {/* Decorative shapes inside testimonial banner */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/10 blur-2xl" />
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-red-500/10 blur-2xl" />

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-5">
            <div className="md:col-span-3 space-y-4">
              <FaQuoteLeft className="text-3xl text-[#FF4D2D]/60" />
              <p className="text-base font-medium leading-relaxed text-gray-300">
                “Pelayanan CaterBox sangat memuaskan! Makanan datang dalam kondisi hangat, packaging rapi, dan rasanya konsisten enak. Sangat direkomendasikan untuk event kantor maupun syukuran keluarga.”
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF7A1A] to-[#FF4D2D] font-bold text-white shadow-md">
                  H
                </div>
                <div>
                  <h4 className="font-bold text-sm">Haya Nur Rizky</h4>
                  <p className="text-[11px] text-gray-400">Corporate Customer</p>
                </div>
              </div>
            </div>

            <div className="hidden justify-center md:col-span-2 md:flex">
              <div className="relative flex h-[220px] w-[220px] items-center justify-center rounded-full bg-[#FFB000] text-8xl shadow-lg">
                👨‍🍳
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & NEWSLETTER */}
      <footer id="contact" className="bg-white border-t border-gray-100 px-6 py-12 md:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          
          {/* Newsletter Box */}
          <div className="flex flex-col gap-6 border-b border-gray-100 pb-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-black sm:text-2xl">
                Join Our <span className="text-[#FF4D2D]">Newsletter</span>
              </h2>
              <p className="text-xs text-gray-400">
                Dapatkan info menu baru dan penawaran diskon exclusive mingguan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:w-72 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-[#FF4D2D] focus:bg-white transition-colors"
              />
              <button className="rounded-xl bg-gradient-to-r from-[#FF4D2D] to-[#FF3300] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-red-100 hover:opacity-95 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>

          {/* Grid Footer Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
            <div className="col-span-2 sm:col-span-3 md:col-span-1 space-y-3">
              <h1 className="text-xl font-black">
                Cater<span className="italic text-[#FF4D2D]">Box</span>
              </h1>
              <p className="text-xs leading-relaxed text-gray-400">
                Modern Catering Management & CRM System untuk solusi pemesanan makanan praktis dan modern.
              </p>
              <div className="flex gap-3 text-sm text-gray-400 pt-1">
                <a href="#" className="hover:text-[#FF4D2D] transition-colors"><FaInstagram /></a>
                <a href="#" className="hover:text-[#FF4D2D] transition-colors"><FaWhatsapp /></a>
                <a href="#" className="hover:text-[#FF4D2D] transition-colors"><FaFacebook /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider">Product</h4>
              <ul className="mt-3 space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-gray-600">Nasi Box</a></li>
                <li><a href="#" className="hover:text-gray-600">Snack Box</a></li>
                <li><a href="#" className="hover:text-gray-600">Prasmanan</a></li>
                <li><a href="#" className="hover:text-gray-600">Wedding Catering</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider">Services</h4>
              <ul className="mt-3 space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-gray-600">Office Event</a></li>
                <li><a href="#" className="hover:text-gray-600">Family Gathering</a></li>
                <li><a href="#" className="hover:text-gray-600">Seminar Package</a></li>
                <li><a href="#" className="hover:text-gray-600">Custom Order</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider">Support</h4>
              <ul className="mt-3 space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-gray-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-600">FAQ</a></li>
                <li><a href="#" className="hover:text-gray-600">Order Tracking</a></li>
                <li><a href="#" className="hover:text-gray-600">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider">Company</h4>
              <ul className="mt-3 space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-gray-600">About Us</a></li>
                <li><a href="#" className="hover:text-gray-600">CRM System</a></li>
                <li><a href="#" className="hover:text-gray-600">Membership</a></li>
                <li><a href="#" className="hover:text-gray-600">Partnership</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 text-center text-[11px] text-gray-400">
            © 2026 CaterBox Catering. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}