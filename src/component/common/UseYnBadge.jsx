export default function UseYnBadge({ yn }) {
  const isY = String(yn || "").toUpperCase() === "Y";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
        isY
          ? "text-green-600 border-green-200 bg-green-50"
          : "text-gray-500 border-gray-200 bg-gray-50"
      }`}
      title={isY ? "사용" : "미사용"}
    >
      {isY ? "사용" : "미사용"}
    </span>
  );
}
