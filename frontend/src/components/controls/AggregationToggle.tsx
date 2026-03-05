const OPTIONS = ["hourly", "daily", "weekly", "monthly"] as const;

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export function AggregationToggle({ value, onChange }: Props) {
  return (
    <div className="toggle-group">
      <label className="control-label">Aggregation</label>
      <div className="toggle-buttons">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            className={`toggle-btn ${value === opt ? "active" : ""}`}
            onClick={() => onChange(opt)}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
