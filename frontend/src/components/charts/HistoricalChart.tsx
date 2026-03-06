import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
} from "recharts";
import type { DataPoint } from "../../api/historical";
import { type Lang, t } from "../../i18n";

interface Props {
  data: DataPoint[];
  loading: boolean;
  lang: Lang;
}

function formatDate(datetime: string, lang: Lang) {
  return new Date(datetime).toLocaleDateString(lang === "es" ? "es-CO" : "en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatMW(value: number) {
  return `${(value / 1000).toFixed(0)}K`;
}

export function HistoricalChart({ data, loading, lang }: Props) {
  if (loading) return <div className="chart-loading">{t("loading.historical", lang)}</div>;
  if (!data.length) return <div className="chart-empty">{t("empty.data", lang)}</div>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">{t("chart.historical", lang)}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
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
            tickFormatter={formatMW}
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
              new Date(label).toLocaleString(lang === "es" ? "es-CO" : "en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
              })
            }
            formatter={(value) => [`${Number(value).toLocaleString()} MW`, t("chart.demand", lang)]}
          />
          <Area
            type="monotone"
            dataKey="demand_mw"
            stroke="#0EA5E9"
            fill="url(#demandGradient)"
            strokeWidth={2}
          />
          <Brush
            dataKey="datetime"
            height={25}
            stroke="#0EA5E9"
            fill="#020617"
            tickFormatter={(v) => formatDate(v, lang)}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
