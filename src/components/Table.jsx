export default function Table({ title, description, children }) {
  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">

      {/* TABLE HEADER */}
      <div className="px-6 py-5 border-b bg-gradient-to-r from-orange-50 to-yellow-50">

        <h2 className="text-lg font-bold text-[#1F2937]">
          {title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>

      </div>

      {/* TABLE CONTENT */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">
          {children}
        </table>

      </div>

    </div>
  );
}