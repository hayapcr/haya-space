export default function OrderForm({ setOpenForm }) {
  return (
    <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">

      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF8E1] rounded-full blur-3xl -z-10"></div>

      <h2 className="text-3xl font-bold tracking-tight mb-8 italic">
        New <span className="text-[#F8B602]">Order.</span>
      </h2>

      <div className="space-y-4">

        <div className="space-y-1">

          <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280] ml-2">
            Customer Name
          </label>

          <input
            placeholder="Ex: John Doe"
            className="w-full p-4 bg-[#F9FAFB] border-none rounded-2xl focus:ring-2 focus:ring-[#F8B602] transition-all font-medium placeholder:text-[#9CA3AF] text-sm"
          />

        </div>

        <div className="space-y-1">

          <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280] ml-2">
            Menu Item
          </label>

          <input
            placeholder="Ex: Nasi Goreng"
            className="w-full p-4 bg-[#F9FAFB] border-none rounded-2xl focus:ring-2 focus:ring-[#F8B602] transition-all font-medium placeholder:text-[#9CA3AF] text-sm"
          />

        </div>

        <div className="space-y-1">

          <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280] ml-2">
            Quantity
          </label>

          <input
            type="number"
            placeholder="0"
            className="w-full p-4 bg-[#F9FAFB] border-none rounded-2xl focus:ring-2 focus:ring-[#F8B602] transition-all font-medium placeholder:text-[#9CA3AF] text-sm"
          />

        </div>

      </div>

      <div className="flex flex-col gap-3 mt-10">

        <button className="w-full py-4 bg-[#F8B602] text-white rounded-2xl font-semibold uppercase tracking-widest text-xs shadow-lg hover:bg-[#FFCC00] transition-all">
          Create Order
        </button>

        <button
          onClick={() => setOpenForm(false)}
          className="w-full py-4 bg-transparent text-[#6B7280] rounded-2xl font-semibold uppercase tracking-widest text-[10px] hover:text-[#EF4444] transition-all"
        >
          Cancel Process
        </button>

      </div>

    </div>
  );
}