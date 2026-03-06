import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { type Lang, t } from "../../i18n";

interface ComparisonPoint {
  datetime: string;
  actual: number;
  predicted: number;
}

interface Props {
  data: ComparisonPoint[];
  loading: boolean;
  lang: Lang;
}

function formatDate(datetime: string, lang: Lang) {
  return new Date(datetime).toLocaleDateString(lang === "es" ? "es-CO" : "en-US", {
    month: "short",
    day: "numeric",
  });
}

export function ComparisonChart({ data, loading, lang }: Props) {
  if (loading) return <div className="chart-loading">{t("loading.comparison", lang)}</div>;
  if (!data.length) return <div className="chart-empty">{t("empty.comparison", lang)}</div>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">{t("chart.comparison", lang)}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
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
              name === "actual" ? t("chart.actual", lang) : t("chart.predicted", lang),
            ]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#64748B"
            strokeWidth={1.5}
            dot={false}
            name={t("chart.actual", lang)}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#10B981"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={false}
            name={t("chart.predicted", lang)}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
