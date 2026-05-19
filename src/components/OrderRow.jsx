import { Link } from "react-router-dom";
import Badge from "./Badge";

export default function OrderRow({ order, statusStyle }) {
  return (
    <tr className="border-t hover:bg-orange-50 transition">

      <td className="px-6 py-4 font-bold text-gray-700">
        #{order.id}
      </td>

      <td className="px-6 py-4 font-semibold">
        <Link
          to={`/orders/${order.id}`}
          className="text-orange-600 hover:underline"
        >
          {order.name}
        </Link>
      </td>

      <td className="px-6 py-4 text-gray-700">
        {order.menu}
      </td>

      <td className="px-6 py-4 text-gray-500">
        {order.date}
      </td>

      <td className="px-6 py-4 font-bold text-gray-800">
        {order.total}
      </td>

      <td className="px-6 py-4">
        <Badge status={order.status} />
      </td>

    </tr>
  );
}