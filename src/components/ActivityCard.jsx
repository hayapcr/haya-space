export default function ActivityCard({ order }) {
  return (
    <div className="group bg-white p-6 rounded-[2rem] border border-[#F3F4F6] flex justify-between items-center hover:shadow-xl transition-all duration-500 border-l-4 border-l-transparent hover:border-l-[#F8B602]">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 bg-[#F9FAFB] rounded-2xl flex items-center justify-center font-bold text-[#9CA3AF] group-hover:bg-[#FFF8E1] group-hover:text-[#F8B602] transition-colors">
          {order.name[0]}
        </div>

        <div>
          <p className="font-semibold text-[#1F2937] leading-none mb-1">
            {order.name}
          </p>

          <p className="text-[11px] text-[#6B7280] font-medium uppercase tracking-tighter">
            {order.menu}
          </p>
        </div>

      </div>

      <div className="flex items-center gap-2">

        <div className={`w-1.5 h-1.5 rounded-full ${order.color}`}></div>

        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6B7280]">
          {order.status}
        </span>

      </div>

    </div>
  );
}