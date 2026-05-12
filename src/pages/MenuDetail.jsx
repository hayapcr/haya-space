import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../data/menuData.json";

export default function MenuDetail() {
  const { id } = useParams();

  const [menu, setMenu] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const selectedMenu = data.find(
      (item) => item.id === Number(id)
    );

    if (!selectedMenu) {
      setError("Menu tidak ditemukan");
      return;
    }

    setMenu(selectedMenu);
  }, [id]);

  if (error)
    return <div className="text-red-600 p-4">{error}</div>;

  if (!menu)
    return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">

      <img
        src={menu.image}
        alt={menu.name}
        className="rounded-xl mb-4 w-full h-48 object-cover"
      />

      <h2 className="text-2xl font-bold mb-2">
        {menu.name}
      </h2>

      <p className="text-gray-600 mb-1">
        Kategori: {menu.category}
      </p>

      <p className="text-gray-600 mb-1">
        Menu: {menu.detail.menu}
      </p>

      <p className="text-gray-600 mb-1">
        Pedas: {menu.detail.spicy ? "Ya 🌶️" : "Tidak"}
      </p>

      <p className="text-gray-600 mb-1">
        Stock: {menu.detail.stock}
      </p>

      <p className="text-gray-800 font-semibold text-lg mt-3">
        Harga: Rp {menu.price.toLocaleString("id-ID")}
      </p>

    </div>
  );
}