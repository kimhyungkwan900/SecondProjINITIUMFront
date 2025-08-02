
export default function TextInput({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-md border border-blue-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
}
