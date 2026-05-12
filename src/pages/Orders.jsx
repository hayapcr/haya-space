import { Link } from "react-router-dom";

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
          <h1 className="text-4xl font-black">
            Incoming <span className="text-orange-500 italic">Orders</span> 📦
          </h1>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl overflow-hidden shadow">

        <table className="w-full">

          <thead>
            <tr className="text-left text-xs uppercase bg-slate-50">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Menu</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-orange-50">

                {/* ID */}
                <td className="px-6 py-4 font-bold">
                  #{order.id}
                </td>

                {/* CUSTOMER (CLICKABLE 🔥) */}
                <td className="px-6 py-4 font-semibold text-orange-600">
                  <Link to={`/orders/${order.id}`}>
                    {order.name}
                  </Link>
                </td>

                {/* MENU */}
                <td className="px-6 py-4">
                  {order.menu}
                </td>

                {/* DATE */}
                <td className="px-6 py-4">
                  {order.date}
                </td>

                {/* TOTAL */}
                <td className="px-6 py-4 font-bold">
                  {order.total}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  {order.status}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}