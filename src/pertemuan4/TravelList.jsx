import { useState } from "react";
import data from "../data/menuData.json";
import SearchFilter from "../components/SearchFilter";

export default function Menu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // FILTER LOGIC
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || item.category === category)
  );

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Menu Catering 🍱
        </h1>
        <p className="text-gray-500">
          Pilih menu terbaik untuk acara kamu
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      {/* GRID MENU */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
            >

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg"
              />

              {/* CONTENT */}
              <h2 className="text-lg font-bold mt-3">
                {item.name}
              </h2>

              <p className="text-sm text-gray-500">
                {item.category}
              </p>

              <p className="text-sm mt-2 text-gray-600">
                {item.detail.menu}
              </p>

              {/* PRICE & RATING */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-green-600 font-bold">
                  Rp {item.price.toLocaleString()}
                </p>

                <span className="text-yellow-500 text-sm">
                  ⭐ {item.rating}
                </span>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full text-center mt-10">
            <p className="text-gray-500 text-lg">
              Menu tidak ditemukan
            </p>
          </div>
        )}

      </div>
    </div>
  );
}