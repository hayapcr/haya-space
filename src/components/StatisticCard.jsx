export default function StatisticCard({
  label,
  value,
  color,
}) {
  return (
    <div className="group bg-white p-10 rounded-[3.5rem] border border-[#F3F4F6] shadow-lg hover:shadow-[#F8B602]/10 transition-all duration-500 hover:-translate-y-2">

      <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-[0.3em] mb-4 group-hover:text-[#F8B602] transition-colors">
        {label}
      </p>

      <h2 className={`text-4xl font-bold tracking-tight ${color}`}>
        {value}
      </h2>

    </div>
  );
}