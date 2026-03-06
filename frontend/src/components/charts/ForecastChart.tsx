import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { ForecastPoint } from "../../api/forecast";
import { type Lang, t } from "../../i18n";

interface Props {
  data: ForecastPoint[];
  loading: boolean;
  lang: Lang;
}

function formatDate(datetime: string, lang: Lang) {
  return new Date(datetime).toLocaleDateString(lang === "es" ? "es-CO" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
  });
}

export function ForecastChart({ data, loading, lang }: Props) {
  if (loading) return <div className="chart-loading">{t("loading.forecast", lang)}</div>;
  if (!data.length) return <div className="chart-empty">{t("empty.forecast", lang)}</div>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">{t("chart.forecast", lang)}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis
            dataKey="datetime"
            stroke="#64748B"
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => formatDate(v, lang)}
          />
          <YAxis
            stroke="#64748B"
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
            width={50}
          />
          <Tooltip
            contentStyle={{
              background: "#0F172A",
              border: "1px solid #1E293B",
              borderRadius: 8,
              color: "#E2E8F0",
            }}
            labelFormatter={(label) =>
              new Date(label).toLocaleString(lang === "es" ? "es-CO" : "en-US")
            }
            formatter={(value, name) => [
              `${Number(value).toLocaleString()} MW`,
              name === "upper_bound"
                ? t("chart.upperBound", lang)
                : name === "lower_bound"
                  ? t("chart.lowerBound", lang)
                  : t("chart.predicted", lang),
            ]}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="upper_bound"
            stroke="none"
            fill="url(#confidenceGradient)"
            name={t("chart.confidenceBand", lang)}
          />
          <Area
            type="monotone"
            dataKey="lower_bound"
            stroke="none"
            fill="#020617"
            name=" "
          />
          <Line
            type="monotone"
            dataKey="predicted_mw"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={false}
            name={t("chart.predicted", lang)}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
