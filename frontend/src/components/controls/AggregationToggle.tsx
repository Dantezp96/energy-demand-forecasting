import { type Lang, t } from "../../i18n";

const OPTIONS = ["hourly", "daily", "weekly", "monthly"] as const;

const LABEL_KEYS: Record<string, "controls.hourly" | "controls.daily" | "controls.weekly" | "controls.monthly"> = {
  hourly: "controls.hourly",
  daily: "controls.daily",
  weekly: "controls.weekly",
  monthly: "controls.monthly",
};

interface Props {
  value: string;
  onChange: (val: string) => void;
  lang: Lang;
}

export function AggregationToggle({ value, onChange, lang }: Props) {
  return (
    <div className="toggle-group">
      <label className="control-label">{t("controls.aggregation", lang)}</label>
      <div className="toggle-buttons">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            className={`toggle-btn ${value === opt ? "active" : ""}`}
            onClick={() => onChange(opt)}
          >
            {t(LABEL_KEYS[opt], lang)}
          </button>
        ))}
      </div>
    </div>
  );
}
