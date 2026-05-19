import { Link } from "react-router-dom";
import OrderRow from "../components/OrderRow";
import Container from "../components/Container";
import Table from "../components/Table";

export default function Orders() {

  const orders = [
    {
      id: 1,
      name: "Andi",
      menu: "Nasi Box Ayam Bakar",
      status: "Done",
      date: "4 Mei 2026",
      total: "Rp 50.000"
    },
    {
      id: 2,
      name: "Siti",
      menu: "Snack Box Premium",
      status: "Pending",
      date: "4 Mei 2026",
      total: "Rp 45.000"
    },
    {
      id: 3,
      name: "Budi",
      menu: "Coffee Break Set",
      status: "Cancel",
      date: "3 Mei 2026",
      total: "Rp 120.000"
    },
    {
      id: 4,
      name: "Rina",
      menu: "Nasi Box Rendang",
      status: "Done",
      date: "3 Mei 2026",
      total: "Rp 55.000"
    },
    {
      id: 5,
      name: "Joko",
      menu: "Snack Box Simple",
      status: "Pending",
      date: "2 Mei 2026",
      total: "Rp 30.000"
    },
    {
      id: 6,
      name: "Dewi",
      menu: "Coffee Break Premium",
      status: "Done",
      date: "2 Mei 2026",
      total: "Rp 110.000"
    },
    {
      id: 7,
      name: "Agus",
      menu: "Nasi Box Ayam Geprek",
      status: "Done",
      date: "1 Mei 2026",
      total: "Rp 48.000"
    },
    {
      id: 8,
      name: "Lina",
      menu: "Snack Box Ekonomi",
      status: "Cancel",
      date: "1 Mei 2026",
      total: "Rp 25.000"
    },
    {
      id: 9,
      name: "Fajar",
      menu: "Paket Meeting Lunch",
      status: "Pending",
      date: "30 April 2026",
      total: "Rp 200.000"
    },
    {
      id: 10,
      name: "Sari",
      menu: "Nasi Box Ikan Bakar",
      status: "Done",
      date: "30 April 2026",
      total: "Rp 60.000"
    },
    {
      id: 11,
      name: "Rudi",
      menu: "Snack Box Premium",
      status: "Done",
      date: "29 April 2026",
      total: "Rp 45.000"
    },
    {
      id: 12,
      name: "Maya",
      menu: "Coffee Break Set",
      status: "Pending",
      date: "29 April 2026",
      total: "Rp 100.000"
    },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Cancel":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Container>

      <div className="w-full min-h-screen bg-[#F5F5F5] p-4 md:p-6 lg:p-8 font-['Poppins'] space-y-8 relative overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-orange-300/20 rounded-full blur-[100px] -z-10"></div>

        <div className="absolute bottom-[-5%] left-[-5%] w-[350px] h-[350px] bg-yellow-200/20 rounded-full blur-[100px] -z-10"></div>

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

          {/* TITLE */}
          <div className="space-y-2">

            <div className="flex items-center gap-3">

              <span className="px-4 py-1.5 bg-[#1F2937] text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg">
                Order Management
              </span>

              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>

              <span className="text-gray-500 text-xs font-medium tracking-widest uppercase">
                Incoming Orders
              </span>

            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-tight text-[#1F2937]">
              Incoming{" "}
              <span className="text-orange-500 italic">
                Orders.
              </span>
            </h1>

            <p className="text-gray-500 text-sm">
              Total Orders: {orders.length}
            </p>

          </div>

          {/* ACTION BUTTON */}
          <Link
            to="/dashboard"
            className="w-fit px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Back Dashboard
          </Link>

        </div>


          {/* TABLE */}
          <Table
            title="Order List"
            description="Monitor all customer catering orders."
          >

            <thead className="bg-orange-100 text-orange-800">

              <tr className="text-left text-xs uppercase tracking-wider">

                <th className="px-6 py-4 font-bold">
                  ID
                </th>

                <th className="px-6 py-4 font-bold">
                  Customer
                </th>

                <th className="px-6 py-4 font-bold">
                  Menu
                </th>

                <th className="px-6 py-4 font-bold">
                  Date
                </th>

                <th className="px-6 py-4 font-bold">
                  Total
                </th>

                <th className="px-6 py-4 font-bold">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <OrderRow
                  key={order.id}
                  order={order}
                  statusStyle={statusStyle}
                />

              ))}

            </tbody>

          </Table>

        </div>

    </Container>
  );
}