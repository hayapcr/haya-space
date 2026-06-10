import { useRef, useEffect } from "react";

export default function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
}) {

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <div className="bg-white p-5 rounded-2xl shadow mb-6 grid md:grid-cols-2 gap-4">

      <input
        ref={searchRef}
        type="text"
        placeholder="Cari menu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-slate-100 px-4 py-3 rounded-xl outline-none"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-slate-100 px-4 py-3 rounded-xl outline-none"
      >
        <option value="">Semua Kategori</option>
        <option value="Ayam">Ayam</option>
        <option value="Ikan">Ikan</option>
        <option value="Daging">Daging</option>
        <option value="Nasi">Nasi</option>
        <option value="Mie">Mie</option>
        <option value="Sayur">Sayur</option>
        <option value="Seafood">Seafood</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Paket">Paket</option>
      </select>

    </div>
  );
}