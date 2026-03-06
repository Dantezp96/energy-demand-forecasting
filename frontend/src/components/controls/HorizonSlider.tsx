import { type Lang, t } from "../../i18n";

const OPTIONS: { hours: number; key: "controls.1d" | "controls.2d" | "controls.3d" | "controls.5d" | "controls.7d" }[] = [
  { hours: 24, key: "controls.1d" },
  { hours: 48, key: "controls.2d" },
  { hours: 72, key: "controls.3d" },
  { hours: 120, key: "controls.5d" },
  { hours: 168, key: "controls.7d" },
];

interface Props {
  value: number;
  onChange: (val: number) => void;
  lang: Lang;
}

export function HorizonSlider({ value, onChange, lang }: Props) {
  return (
    <div className="toggle-group">
      <label className="control-label">{t("controls.horizon", lang)}</label>
      <div className="toggle-buttons">
        {OPTIONS.map((opt) => (
          <button
            key={opt.hours}
            className={`toggle-btn ${value === opt.hours ? "active" : ""}`}
            onClick={() => onChange(opt.hours)}
          >
            {t(opt.key, lang)}
          </button>
        ))}
      </div>
    </div>
  );
}
