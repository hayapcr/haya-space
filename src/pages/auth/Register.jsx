import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Mail, LockKeyhole, User } from "lucide-react";
import { usersAPI } from "../../services/usersAPI";

export default function Register() {
  const navigate = useNavigate();
  const { AuthIllustration } = useOutletContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "member",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (form.password !== form.confirmPassword) {
        setError("Password dan Confirm Password tidak sama");
        return;
      }

      await usersAPI.createUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      alert("Pendaftaran berhasil, silakan login");
      navigate("/login");
    } catch (err) {
      console.log("ERROR REGISTER:", err);
      console.log("ERROR RESPONSE:", err.response?.data);

      setError(
        err.response?.data?.message ||
          err.response?.data?.details ||
          err.message ||
          "Pendaftaran gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[350px] w-full max-w-[940px] bg-white">
      <AuthIllustration />

      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="w-[285px]">
          <h1 className="mb-5 text-[24px] font-extrabold">Registration</h1>

          {error && (
            <div className="mb-3 rounded bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="relative mb-3">
              <User
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff7a1a]"
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                required
                className="h-[38px] w-full rounded-[3px] border border-[#eeeeee] pl-9 pr-3 text-[11px] outline-none focus:border-[#ff7a1a]"
              />
            </div>

            <div className="relative mb-3">
              <Mail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff7a1a]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
                className="h-[38px] w-full rounded-[3px] border border-[#eeeeee] pl-9 pr-3 text-[11px] outline-none focus:border-[#ff7a1a]"
              />
            </div>

            <div className="relative mb-3">
              <LockKeyhole
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff7a1a]"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                required
                className="h-[38px] w-full rounded-[3px] border border-[#eeeeee] pl-9 pr-3 text-[11px] outline-none focus:border-[#ff7a1a]"
              />
            </div>

            <div className="relative mb-3">
              <LockKeyhole
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff7a1a]"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                required
                className="h-[38px] w-full rounded-[3px] border border-[#eeeeee] pl-9 pr-3 text-[11px] outline-none focus:border-[#ff7a1a]"
              />
            </div>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={loading}
              className="mb-4 h-[38px] w-full rounded-[3px] border border-[#eeeeee] px-3 text-[11px] outline-none focus:border-[#ff7a1a]"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>

            <p className="mb-4 text-[10px] leading-4 text-[#555]">
              By signing below, you agree to the{" "}
              <span className="font-semibold text-[#ff7a1a]">Term of use</span>
              <br />
              and{" "}
              <span className="font-semibold text-[#ff7a1a]">
                privacy notice
              </span>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="h-[38px] w-full rounded-[4px] bg-[#ff7a1a] text-[11px] font-bold text-white disabled:opacity-60"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-center text-[10px] text-[#777]">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#ff7a1a]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}