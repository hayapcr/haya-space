export default function MemberOrders() {
  const orders = [
    {
      id: "ORD-001",
      paket: "Nasi Box Special",
      status: "Diproses",
      total: "Rp 250.000",
    },
    {
      id: "ORD-002",
      paket: "Snack Box Premium",
      status: "Selesai",
      total: "Rp 150.000",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-8 text-4xl font-black text-[#0F1B3D]">
        Pesanan Saya
      </h1>

      <div className="grid gap-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl bg-white p-6 shadow-md flex justify-between"
          >
            <div>
              <p className="font-bold text-[#F8B602]">{order.id}</p>
              <h3 className="text-xl font-black">{order.paket}</h3>
              <p className="text-sm text-gray-500">{order.status}</p>
            </div>

            <p className="font-black text-[#0F1B3D]">{order.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}