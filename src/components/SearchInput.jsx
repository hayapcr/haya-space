export default function SearchInput({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      placeholder="Cari menu..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-4 border rounded-xl"
    />
  );
}