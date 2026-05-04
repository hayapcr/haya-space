import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Register berhasil 🍽️");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-orange-50 overflow-hidden">

      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl shadow-orange-100/50">

        {/* TITLE */}
        <h2 className="text-3xl font-bold mb-2 text-center text-slate-800">
          Register 🍽️
        </h2>

        <p className="text-center text-slate-500 mb-8 text-sm">
          Buat akun untuk mulai menggunakan sistem
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Masukkan email"
              onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Masukkan password"
              onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Ulangi password"
              onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 active:scale-[0.98] transition-all shadow-lg shadow-orange-200 mt-2"
          >
            Register
          </button>

        </form>

        {/* FOOTER */}
        <p className="mt-8 text-center text-xs text-slate-400 uppercase tracking-widest font-semibold">
          Corporate Catering Service • 2026
        </p>

      </div>
    </div>
  );
}