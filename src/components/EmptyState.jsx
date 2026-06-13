export default function EmptyState({ text = "Belum ada data" }) {
  return (
    <div className="py-10 text-center text-gray-500">
      <div className="mb-2 text-4xl">📭</div>
      <p>{text}</p>
    </div>
  );
}