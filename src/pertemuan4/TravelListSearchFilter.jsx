import { FaSearch } from "react-icons/fa";

export default function SearchFilter({
  search,
  setSearch,
  category,
  setCategory
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

      {/* SEARCH */}
      <div className="relative">
        <input
          type="text"
          placeholder="Cari menu catering..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
        />
        <FaSearch className="absolute left-3 top-4 text-gray-400" />
      </div>

      {/* FILTER CATEGORY */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
      >
        <option value="">Semua Kategori</option>
        <option value="Ayam">Ayam</option>
        <option value="Ikan">Ikan</option>
        <option value="Daging">Daging</option>
        <option value="Seafood">Seafood</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Mie">Mie</option>
        <option value="Nasi">Nasi</option>
        <option value="Sayur">Sayur</option>
        <option value="Paket">Paket</option>
      </select>

    </div>
  );
}