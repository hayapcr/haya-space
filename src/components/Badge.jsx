export default function Badge({ status }) {

  const statusStyle = {
    Done: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancel: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[status]}`}
    >
      {status}
    </span>
  );
}