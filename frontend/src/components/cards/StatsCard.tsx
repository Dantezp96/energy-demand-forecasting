interface StatsCardProps {
  label: string;
  value: string;
  unit?: string;
}

export function StatsCard({ label, value, unit }: StatsCardProps) {
  return (
    <div className="stats-card">
      <span className="stats-label">{label}</span>
      <span className="stats-value">
        {value}
        {unit && <span className="stats-unit">{unit}</span>}
      </span>
    </div>
  );
}
