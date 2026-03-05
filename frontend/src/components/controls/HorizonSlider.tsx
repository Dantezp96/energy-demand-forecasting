interface Props {
  value: number;
  onChange: (val: number) => void;
}

export function HorizonSlider({ value, onChange }: Props) {
  const days = Math.round(value / 24);
  return (
    <div className="slider-group">
      <label className="control-label">
        Forecast Horizon: <strong>{days} day{days !== 1 ? "s" : ""}</strong> ({value}h)
      </label>
      <input
        type="range"
        min={24}
        max={168}
        step={24}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="horizon-slider"
      />
    </div>
  );
}
