export default function AlertBox({ type = "info", children }) {
  const styles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
  };

  return (
    <div className={`px-4 py-3 rounded-xl border text-sm ${styles[type]}`}>
      {children}
    </div>
  );
}