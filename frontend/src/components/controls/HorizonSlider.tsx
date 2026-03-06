import { type Lang, t } from "../../i18n";

interface Props {
  value: number;
  onChange: (val: number) => void;
  lang: Lang;
}

export function HorizonSlider({ value, onChange, lang }: Props) {
  const days = Math.round(value / 24);
  const dayLabel = days !== 1 ? t("controls.days", lang) : t("controls.day", lang);
  return (
    <div className="slider-group">
      <label className="control-label">
        {t("controls.horizon", lang)}: <strong>{days} {dayLabel}</strong> ({value}h)
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
