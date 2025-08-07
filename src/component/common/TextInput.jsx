
export default function TextInput({ type, placeholder, value, onChange, className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
}
