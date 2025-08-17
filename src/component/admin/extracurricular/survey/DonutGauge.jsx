import { useMemo } from "react";

export default function DonutGauge({ value = 0, size = 180, stroke = 14, color = "#354649", bg = "#E0E7E9", label = "참여율" }) {
  const pct = useMemo(() => {
    const n = Number(value);
    if (!isFinite(n)) return 0;
    return Math.min(100, Math.max(0, n));
  }, [value]);

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={bg}
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeLinecap="round"
          />
        </g>
      </svg>
      <div className="mt-[-90px] text-center select-none">
        <div className="text-3xl font-bold text-[#354649]">{pct.toFixed(1)}%</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  );
}