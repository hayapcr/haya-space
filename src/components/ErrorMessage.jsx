export default function ErrorMessage({ message }) {
  return (
    <div className="text-red-500 p-4">
      {message}
    </div>
  );
}