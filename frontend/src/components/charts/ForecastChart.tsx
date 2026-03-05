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

interface Props {
  data: ForecastPoint[];
  loading: boolean;
}

function formatDate(datetime: string) {
  return new Date(datetime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
  });
}

export function ForecastChart({ data, loading }: Props) {
  if (loading) return <div className="chart-loading">Generating forecast...</div>;
  if (!data.length) return <div className="chart-empty">No forecast data</div>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Energy Demand Forecast</h3>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6C63FF" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" />
          <XAxis
            dataKey="datetime"
            stroke="#A1A1AA"
            tick={{ fontSize: 11 }}
            tickFormatter={formatDate}
          />
          <YAxis
            stroke="#A1A1AA"
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
            width={50}
          />
          <Tooltip
            contentStyle={{
              background: "#1A1A2E",
              border: "1px solid #2A2A3E",
              borderRadius: 8,
              color: "#E4E4E7",
            }}
            labelFormatter={(label) => new Date(label).toLocaleString()}
            formatter={(value, name) => [
              `${Number(value).toLocaleString()} MW`,
              name === "upper_bound"
                ? "Upper Bound"
                : name === "lower_bound"
                  ? "Lower Bound"
                  : "Predicted",
            ]}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="upper_bound"
            stroke="none"
            fill="url(#confidenceGradient)"
            name="Confidence Band"
          />
          <Area
            type="monotone"
            dataKey="lower_bound"
            stroke="none"
            fill="#0F0F1A"
            name=" "
          />
          <Line
            type="monotone"
            dataKey="predicted_mw"
            stroke="#6C63FF"
            strokeWidth={2}
            dot={false}
            name="Predicted"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
