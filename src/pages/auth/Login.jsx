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
    <div className="bg-[#F8F1EF] text-[#8F4738] border border-[#D9B8B0] p-3 mb-4 rounded text-sm font-medium">
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-[#F8F1EF] text-[#8F4738] p-3 mb-4 rounded text-sm font-medium animate-pulse text-center">
      Mohon tunggu...
    </div>
  ) : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#E7E5E3] overflow-hidden font-['Poppins'] px-6">

      <div className="w-full max-w-5xl bg-white rounded-[10px] shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT IMAGE SECTION */}
        <div className="hidden md:flex items-center justify-center p-10 bg-[#F8F6F5] relative">


          <div className="grid grid-cols-3 gap-2">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"
              alt=""
              className="w-24 h-24 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400"
              alt=""
              className="w-24 h-24 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400"
              alt=""
              className="w-24 h-24 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400"
              alt=""
              className="w-24 h-24 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400"
              alt=""
              className="w-24 h-24 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=400"
              alt=""
              className="w-24 h-24 object-cover"
            />
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="p-10 md:p-14">

          <div className="flex justify-center gap-10 mb-10 text-sm font-semibold">
            <button className="text-[#B7B7B7] hover:text-[#8F4738] transition">
              Sign Up
            </button>

            <button className="text-[#8F4738] border-b-2 border-[#8F4738] pb-1">
              Sign In
            </button>
          </div>

          {errorInfo}
          {loadingInfo}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-[12px] font-medium text-[#8F4738] mb-2">
                Email *
              </label>

              <input
                type="text"
                name="email"
                placeholder=""
                className="w-full border border-[#D7C8C3] px-4 py-2.5 text-sm outline-none focus:border-[#8F4738] transition bg-white"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#8F4738] mb-2">
                Password *
              </label>

              <input
                type="password"
                name="password"
                placeholder=""
                className="w-full border border-[#D7C8C3] px-4 py-2.5 text-sm outline-none focus:border-[#8F4738] transition bg-white"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#A3A3A3]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" />
                Stay signed in
              </label>

              <button
                type="button"
                className="hover:text-[#8F4738] transition"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8F4738] text-white py-3 text-sm font-semibold tracking-wide hover:bg-[#7A3D30] transition-all"
            >
              {loading ? "Loading..." : "SIGN IN"}
            </button>

          </form>

          {/* SOCIAL LOGIN */}

        </div>
      </div>
    </div>
  );
}