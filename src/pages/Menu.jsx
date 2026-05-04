import { useState } from "react";
import data from "../data/menuData.json";
import SearchFilter from "../components/SearchFilter";
import MenuCard from "../components/MenuCard";

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
            <MenuCard key={item.id} item={item} />
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