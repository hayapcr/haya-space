export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-yellow-500 text-white rounded-xl"
    >
      {text}
    </button>
  );
}