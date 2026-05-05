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
    <div className="fixed inset-0 flex items-center justify-center bg-[#E7E5E3] overflow-hidden font-['Poppins'] px-6">

      <div className="w-full max-w-5xl bg-white rounded-[10px] shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT SECTION */}
        <div className="hidden md:flex items-center justify-center p-10 bg-[#F8F6F5] relative">
          

          <div className="text-center text-[#8F4738] font-semibold text-xl">
            Join Our Catering System 🍽️
          </div>
        </div>

        

        {/* RIGHT FORM SECTION */}
        <div className="p-10 md:p-14">

          <div className="flex justify-center gap-10 mb-10 text-sm font-semibold">
            <button className="text-[#8F4738] border-b-2 border-[#8F4738] pb-1">
              Sign Up
            </button>

            <button className="text-[#B7B7B7] hover:text-[#8F4738] transition">
              Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-[12px] font-medium text-[#8F4738] mb-2">
                Email *
              </label>

              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full border border-[#D7C8C3] px-4 py-2.5 text-sm outline-none focus:border-[#8F4738] transition bg-white"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#8F4738] mb-2">
                Password *
              </label>

              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full border border-[#D7C8C3] px-4 py-2.5 text-sm outline-none focus:border-[#8F4738] transition bg-white"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#8F4738] mb-2">
                Confirm Password *
              </label>

              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                className="w-full border border-[#D7C8C3] px-4 py-2.5 text-sm outline-none focus:border-[#8F4738] transition bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#8F4738] text-white py-3 text-sm font-semibold tracking-wide hover:bg-[#7A3D30] transition-all"
            >
              REGISTER
            </button>

          </form>

          <p className="mt-8 text-[10px] text-[#A3A3A3] text-center">
            By creating an account, you agree to Terms of Use and Privacy Policy.
          </p>

        </div>
      </div>
    </div>
  );
}