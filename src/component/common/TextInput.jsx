
export default function TextInput({ type, placeholder, value, onChange, className }) {
  const defaultClassName = "w-full rounded-md border border-blue-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300";
  const finalClassName = className !== undefined ? className : defaultClassName;

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={finalClassName}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
}
