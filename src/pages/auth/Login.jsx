import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Mail, LockKeyhole } from "lucide-react";
import { usersAPI } from "../../services/usersAPI";

export default function Login() {
  const navigate = useNavigate();
  const { AuthIllustration } = useOutletContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
    role: "member",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const users = await usersAPI.loginUser(
        dataForm.email,
        dataForm.password,
        dataForm.role
      );

      if (users.length === 0) {
        alert("Akun belum terdaftar, silakan registrasi terlebih dahulu");
        navigate("/register");
        return;
      }

      const user = users[0];

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/member");
      }
    } catch (err) {
      alert("Akun belum terdaftar, silakan registrasi terlebih dahulu");
      navigate("/register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex h-[350px] w-full max-w-[940px] bg-white">
        <AuthIllustration />

        <div className="flex w-full items-center justify-center py-8 md:w-1/2">
          <div className="w-[285px]">
            <h1 className="mb-8 text-[24px] font-extrabold">
              Welcome Back!
            </h1>

            {error && (
              <div className="mb-3 rounded bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff7a1a]"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={dataForm.email}
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
                  value={dataForm.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="h-[38px] w-full rounded-[3px] border border-[#eeeeee] pl-9 pr-3 text-[11px] outline-none focus:border-[#ff7a1a]"
                />
              </div>

              <select
                name="role"
                value={dataForm.role}
                onChange={handleChange}
                disabled={loading}
                className="mb-4 h-[38px] w-full rounded-[3px] border border-[#eeeeee] px-3 text-[11px] outline-none focus:border-[#ff7a1a]"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>

              <div className="mb-7 text-right">
                <Link
                  to="/forgot"
                  className="text-[10px] font-semibold text-[#ff7a1a]"
                >
                  Forget Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-[38px] w-full rounded-[4px] bg-[#ff7a1a] text-[11px] font-bold text-white disabled:opacity-60"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-[10px] text-[#b8b8b8]">
              <span className="h-px flex-1 bg-[#eeeeee]"></span>
              Or
              <span className="h-px flex-1 bg-[#eeeeee]"></span>
            </div>

            <div className="mb-5 flex justify-center gap-4">
              <button
                type="button"
                className="h-[28px] w-[82px] rounded-[3px] border border-[#eeeeee] text-[10px] font-semibold"
              >
                Google
              </button>

              <button
                type="button"
                className="h-[28px] w-[82px] rounded-[3px] border border-[#eeeeee] text-[10px] font-semibold"
              >
                Facebook
              </button>
            </div>

            <p className="text-center text-[10px] text-[#777]">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-semibold text-[#ff7a1a]">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}