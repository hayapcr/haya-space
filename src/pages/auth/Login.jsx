import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: dataForm.email,
          password: dataForm.password,
        }
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  const errorInfo = error ? (
    <div className="bg-orange-50 text-orange-700 border border-orange-200 p-3 mb-4 rounded text-sm font-medium">
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-orange-50 text-orange-500 p-3 mb-4 rounded text-sm font-medium animate-pulse text-center">
      Mohon tunggu...
    </div>
  ) : null;

  return (
    /* ✅ FIX UTAMA DI SINI */
    <div className="fixed inset-0 flex items-center justify-center bg-orange-50 overflow-hidden">

      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl shadow-orange-100/50">

        <h2 className="text-3xl font-bold mb-2 text-center text-slate-800">
          Login Catering 🍽️
        </h2>

        <p className="text-center text-slate-500 mb-8 text-sm">
          Masuk untuk mengelola pesanan Anda
        </p>

        {errorInfo}
        {loadingInfo}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Username
            </label>
            <input
              type="text"
              name="email"
              placeholder="Masukkan username"
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Masukkan password"
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 active:scale-[0.98] transition-all shadow-lg shadow-orange-200 mt-2"
          >
            Masuk Sekarang
          </button>

        </form>

        <p className="mt-8 text-center text-xs text-slate-400 uppercase tracking-widest font-semibold">
          Corporate Catering Service • 2026
        </p>

      </div>
    </div>
  );
}