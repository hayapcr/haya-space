import { useState } from "react";
import { Link } from "react-router-dom";
import data from "../data/menuData.json";
import SearchFilter from "../components/SearchFilter";

export default function Menu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredData = data.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "" ||
      item.category.toLowerCase() === category.toLowerCase();

    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        🍽️ Menu Catering
      </h1>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Link
              key={item.id}
              to={`/menu/${item.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-44 object-cover"
              />

              <div className="p-4">

                <h2 className="font-bold text-lg">
                  {item.name}
                </h2>

                <p className="text-gray-500 text-sm">
                  {item.category}
                </p>

                <p className="text-emerald-600 font-semibold mt-2">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>

              </div>

            </Link>
          ))
        ) : (
          <p className="text-gray-500">
            Menu tidak ditemukan
          </p>
        )}

      </div>

    </div>
  );
}