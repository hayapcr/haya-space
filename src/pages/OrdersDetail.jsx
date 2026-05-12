import { useParams } from "react-router-dom";

export default function OrdersDetail() {
  const { id } = useParams();

  // dummy data
  const orders = [
    {
      id: 1,
      name: "Andi",
      menu: "Nasi Box Ayam Bakar",
      status: "Done",
      date: "4 Mei 2026",
      total: "Rp 50.000",
      address: "Jakarta Selatan",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc500f"
    },
    {
      id: 2,
      name: "Siti",
      menu: "Snack Box Premium",
      status: "Pending",
      date: "4 Mei 2026",
      total: "Rp 45.000",
      address: "Bandung",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307"
    },
    {
      id: 3,
      name: "Budi",
      menu: "Coffee Break Set",
      status: "Cancel",
      date: "3 Mei 2026",
      total: "Rp 120.000",
      address: "Surabaya",
      image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0"
    },
  ];

  const order = orders.find((o) => o.id === Number(id));

  if (!order) {
    return <div className="p-4 text-red-500">Order tidak ditemukan</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow">

      {/* IMAGE */}
      <img
        src={order.image}
        alt={order.menu}
        className="rounded-xl mb-4 w-full h-48 object-cover"
      />

      <h1 className="text-2xl font-black mb-4">
        Order Detail #{order.id}
      </h1>

      <div className="space-y-3 text-gray-700">

        <p><span className="font-bold">Customer:</span> {order.name}</p>
        <p><span className="font-bold">Menu:</span> {order.menu}</p>
        <p><span className="font-bold">Status:</span> {order.status}</p>
        <p><span className="font-bold">Date:</span> {order.date}</p>
        <p><span className="font-bold">Total:</span> {order.total}</p>
        <p><span className="font-bold">Address:</span> {order.address}</p>

      </div>
    </div>
  );
}