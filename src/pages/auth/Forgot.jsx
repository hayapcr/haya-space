export default function Forgot() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-orange-50 overflow-hidden p-4">

      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl shadow-orange-100/50">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-slate-800">
          Lupa Password?
        </h2>

        <p className="text-center text-slate-500 mt-2 mb-8 text-sm">
          Masukkan email kamu untuk mendapatkan link reset password
        </p>

        {/* FORM */}
        <form className="space-y-4">

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 active:scale-[0.98] transition-all shadow-lg shadow-orange-200"
          >
            Kirim Link Reset
          </button>

        </form>

        {/* BACK TO LOGIN */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Ingat password?{" "}
          <span className="text-orange-500 font-semibold cursor-pointer hover:underline">
            Login kembali
          </span>
        </p>

      </div>
    </div>
  );
}