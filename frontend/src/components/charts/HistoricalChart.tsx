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

interface Props {
  data: DataPoint[];
  loading: boolean;
}

function formatDate(datetime: string) {
  return new Date(datetime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatMW(value: number) {
  return `${(value / 1000).toFixed(0)}K`;
}

export function HistoricalChart({ data, loading }: Props) {
  if (loading) return <div className="chart-loading">Loading historical data...</div>;
  if (!data.length) return <div className="chart-empty">No data available</div>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Historical Energy Demand</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
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
            tickFormatter={formatMW}
            width={50}
          />
          <Tooltip
            contentStyle={{
              background: "#1A1A2E",
              border: "1px solid #2A2A3E",
              borderRadius: 8,
              color: "#E4E4E7",
            }}
            labelFormatter={(label) =>
              new Date(label).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
              })
            }
            formatter={(value) => [`${Number(value).toLocaleString()} MW`, "Demand"]}
          />
          <Area
            type="monotone"
            dataKey="demand_mw"
            stroke="#6C63FF"
            fill="url(#demandGradient)"
            strokeWidth={2}
          />
          <Brush
            dataKey="datetime"
            height={25}
            stroke="#6C63FF"
            fill="#0F0F1A"
            tickFormatter={formatDate}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
