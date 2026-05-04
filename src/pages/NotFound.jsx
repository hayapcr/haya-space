export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-orange-50 overflow-hidden">

      <div className="text-center bg-white p-10 rounded-2xl shadow-xl shadow-orange-100/50 max-w-md w-full">

        {/* ICON / NUMBER */}
        <h1 className="text-7xl font-black text-orange-500">404</h1>

        {/* MESSAGE */}
        <h2 className="text-2xl font-bold text-slate-800 mt-4">
          Halaman Tidak Ditemukan
        </h2>

        <p className="text-slate-500 text-sm mt-2">
          Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>

        {/* BUTTON */}
        <a
          href="/"
          className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-[0.98]"
        >
          Kembali ke Dashboard
        </a>

        {/* FOOTER TEXT */}
        <p className="mt-6 text-xs text-slate-400 uppercase tracking-widest font-semibold">
          Error Page • Catering System
        </p>

      </div>
    </div>
  );
}