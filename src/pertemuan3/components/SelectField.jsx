export default function SelectField({
  label,
  value,
  onChange,
  options,
  error,
}) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Pilih</option>

        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      {error && (
        <div className="mt-2 bg-red-100 text-red-600 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}