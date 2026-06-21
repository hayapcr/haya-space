import { Link } from "react-router-dom";
import {
  FaStar,
  FaTruck,
  FaUtensils,
  FaClock,
  FaCheckCircle,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function Landing() {
  const menus = [
    {
      name: "Nasi Box Special",
      price: "Rp25.000",
      img: "🍱",
      tag: "Best Seller",
    },
    {
      name: "Snack Box Premium",
      price: "Rp15.000",
      img: "🧁",
      tag: "Popular",
    },
    {
      name: "Paket Prasmanan",
      price: "Rp45.000",
      img: "🍛",
      tag: "Favorite",
    },
    {
      name: "Paket Acara Kantor",
      price: "Rp35.000",
      img: "🥗",
      tag: "New Menu",
    },
    {
      name: "Lunch Box Hemat",
      price: "Rp20.000",
      img: "🍗",
      tag: "Promo",
    },
    {
      name: "Catering Wedding",
      price: "Rp75.000",
      img: "🍽️",
      tag: "Premium",
    },
  ];

  return (
    <div className="bg-[#FFF7ED] font-['Poppins'] text-[#1F2937]">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <h1 className="text-2xl font-black">
            Cater<span className="text-[#FF7A1A] italic">Box</span>
          </h1>

          <div className="hidden gap-8 text-sm font-semibold md:flex">
            <a href="#home" className="text-[#FF7A1A]">Home</a>
            <a href="#menu">Our Menu</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </div>

          <Link
            to="/login"
            className="rounded-full border border-[#FF7A1A] px-6 py-2 text-sm font-bold text-[#FF7A1A] hover:bg-[#FF7A1A] hover:text-white"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-8 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-5xl font-black leading-tight md:text-6xl">
            Desire <span className="rounded-2xl bg-[#FF7A1A] px-4 py-1 text-white rotate-[-8deg] inline-block">Food</span>
            <br />
            for Your Taste
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-gray-500">
            CaterBox menyediakan layanan catering praktis untuk acara kantor,
            keluarga, seminar, dan wedding dengan pilihan menu yang berkualitas.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="#menu"
              className="rounded-full bg-[#FF7A1A] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200"
            >
              Order Now
            </a>

            <Link
              to="/company-profile"
              className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#FF7A1A] shadow"
            >
              Company Profile
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute right-12 top-8 rounded-2xl bg-white px-4 py-3 text-xs font-bold shadow-lg">
            🚚 Delivery <br />
            <span className="text-gray-400">30 minute</span>
          </div>

          <div className="absolute bottom-12 left-8 rounded-2xl bg-white px-4 py-3 text-xs font-bold shadow-lg">
            ⭐ 4.9 Rating <br />
            <span className="text-gray-400">Best Service</span>
          </div>

          <div className="flex h-[430px] w-[430px] items-center justify-center rounded-full bg-[#FFB703] text-[180px] shadow-2xl">
            👩‍🍳
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-8 py-10 md:grid-cols-4">
        {[
          { icon: <FaUtensils />, title: "Quality Food" },
          { icon: <FaTruck />, title: "Fast Delivery" },
          { icon: <FaClock />, title: "On Time Service" },
          { icon: <FaCheckCircle />, title: "Best Package" },
        ].map((item, index) => (
          <div key={index} className="rounded-3xl bg-white p-6 text-center shadow-md">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-[#FF7A1A]">
              {item.icon}
            </div>
            <h3 className="font-black">{item.title}</h3>
            <p className="mt-2 text-xs text-gray-400">
              Layanan catering berkualitas untuk berbagai kebutuhan acara.
            </p>
          </div>
        ))}
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-8 py-16 md:grid-cols-2">
        <div className="rounded-[3rem] bg-white p-10 text-center text-[180px] shadow-xl">
          🍽️
        </div>

        <div>
          <h2 className="text-4xl font-black">
            Why People Choose us?
          </h2>

          <div className="mt-8 space-y-5">
            {[
              "Menu catering lengkap dan bisa disesuaikan kebutuhan acara.",
              "Pemesanan lebih mudah dengan sistem online dan CRM.",
              "Admin dapat memantau customer, pesanan, promo, dan membership.",
            ].map((text, index) => (
              <div key={index} className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="font-black text-[#FF7A1A]">
                  {index + 1}. Keunggulan CaterBox
                </h3>
                <p className="mt-2 text-sm text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="mx-auto max-w-7xl px-8 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black">
            Our Best Seller Dishes 🔥
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Pilihan menu catering favorit customer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {menus.map((menu, index) => (
            <div key={index} className="overflow-hidden rounded-3xl bg-white shadow-md">
              <div className="flex h-48 items-center justify-center bg-orange-100 text-8xl">
                {menu.img}
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-black">{menu.name}</h3>
                  <span className="rounded-full bg-[#FF7A1A] px-3 py-1 text-[10px] font-bold text-white">
                    {menu.tag}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-yellow-400">
                    <FaStar className="inline" />
                    <FaStar className="inline" />
                    <FaStar className="inline" />
                    <FaStar className="inline" />
                    <FaStar className="inline" />
                  </div>

                  <p className="font-black">{menu.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-8 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-black">
            Customer <span className="text-[#FF7A1A]">Feedback</span>
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-gray-500">
            “Pelayanan CaterBox sangat cepat, makanan enak, dan pesanan datang
            tepat waktu. Cocok untuk acara kantor dan keluarga.”
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF7A1A] text-white">
              H
            </div>
            <div>
              <h4 className="font-black">Haya Nur Rizky</h4>
              <p className="text-xs text-gray-400">Customer</p>
            </div>
          </div>
        </div>

        <div className="rounded-[3rem] bg-[#FFB703] p-10 text-center text-[180px]">
          👨‍🍳
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="contact" className="mx-auto max-w-7xl px-8 py-14">
        <div className="rounded-[3rem] bg-white p-10 shadow-lg md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black">
              Join Our <span className="text-[#FF7A1A]">Newsletter</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Dapatkan informasi promo catering terbaru.
            </p>
          </div>

          <div className="mt-6 flex gap-3 md:mt-0">
            <input
              type="email"
              placeholder="Enter your email address"
              className="rounded-full border border-gray-200 px-6 py-3 text-sm outline-none"
            />
            <button className="rounded-full bg-[#FF7A1A] px-7 py-3 text-sm font-bold text-white">
              Submit
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white px-8 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">
          <div>
            <h1 className="text-2xl font-black">
              Cater<span className="text-[#FF7A1A] italic">Box</span>
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Modern Catering Management & CRM System.
            </p>
          </div>

          <div className="flex gap-4 text-[#FF7A1A]">
            <FaInstagram />
            <FaWhatsapp />
          </div>
        </div>
      </footer>
    </div>
  );
}