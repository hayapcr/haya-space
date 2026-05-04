export default function Orders() {
  const orders = [
    { id: 1, name: "Andi", menu: "Nasi Box Ayam Bakar", status: "Done", date: "4 Mei 2026", total: "Rp 50.000" },
    { id: 2, name: "Siti", menu: "Snack Box Premium", status: "Pending", date: "4 Mei 2026", total: "Rp 45.000" },
    { id: 3, name: "Budi", menu: "Coffee Break Set", status: "Cancel", date: "3 Mei 2026", total: "Rp 120.000" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 bg-[#FDFCFB] min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Incoming <span className="text-orange-500 italic">Orders</span> 📦
          </h1>
          <p className="text-slate-400 font-medium mt-1">
            Pantau dan kelola pesanan katering hari ini.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold shadow-sm hover:bg-slate-50 transition">
            Filter
          </button>
          <button className="px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-lg hover:bg-slate-800 transition">
            Download Report
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-slate-50 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            {/* TABLE HEAD */}
            <thead>
              <tr className="text-left text-slate-400 text-xs font-black uppercase tracking-[0.2em] bg-slate-50/50">
                <th className="px-8 py-6">Order ID</th>
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Menu Item</th>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6">Total</th>
                <th className="px-8 py-6 text-right">Status</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-slate-50">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="group hover:bg-orange-50/30 transition-colors"
                >

                  {/* ORDER ID (UPDATED UI) */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">

                      {/* ID BADGE */}
                      <div className="relative">

                        <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-orange-100 flex items-center justify-center font-black text-slate-500 group-hover:text-orange-600 transition">
                          #{order.id}
                        </div>

                        {/* STATUS DOT */}
                        <span
                          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            order.status === "Done"
                              ? "bg-green-500"
                              : order.status === "Pending"
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                        ></span>

                      </div>

                      {/* TEXT INFO */}
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 tracking-widest">
                          ORDER ID
                        </span>
                        <span className="font-black text-slate-800">
                          #00{order.id}
                        </span>
                      </div>

                    </div>
                  </td>

                  {/* CUSTOMER */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500 group-hover:bg-orange-100 group-hover:text-orange-600 transition">
                        {order.name[0]}
                      </div>
                      <span className="font-black text-slate-800">
                        {order.name}
                      </span>
                    </div>
                  </td>

                  {/* MENU */}
                  <td className="px-8 py-6 font-medium text-slate-600">
                    {order.menu}
                  </td>

                  {/* DATE */}
                  <td className="px-8 py-6 text-sm text-slate-400 font-medium">
                    {order.date}
                  </td>

                  {/* TOTAL */}
                  <td className="px-8 py-6 font-black text-slate-700">
                    {order.total}
                  </td>

                  {/* STATUS */}
                  <td className="px-8 py-6 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm ${
                        order.status === "Done"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Pending"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          order.status === "Done"
                            ? "bg-green-500"
                            : order.status === "Pending"
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                      />
                      {order.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* FOOTER */}
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center text-sm font-bold text-slate-400">
          <span>Showing {orders.length} orders</span>

          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg bg-white border flex items-center justify-center hover:bg-orange-50 transition">
              1
            </button>
            <button className="w-8 h-8 rounded-lg bg-white border flex items-center justify-center hover:bg-orange-50 transition">
              2
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}