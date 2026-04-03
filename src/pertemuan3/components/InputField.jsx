export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  error,
}) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border p-2 rounded"
      />

      {error && (
        <div className="mt-2 bg-red-100 text-red-600 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}