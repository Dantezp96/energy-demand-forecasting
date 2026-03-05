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

interface ComparisonPoint {
  datetime: string;
  actual: number;
  predicted: number;
}

interface Props {
  data: ComparisonPoint[];
  loading: boolean;
}

function formatDate(datetime: string) {
  return new Date(datetime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function ComparisonChart({ data, loading }: Props) {
  if (loading) return <div className="chart-loading">Loading comparison...</div>;
  if (!data.length) return <div className="chart-empty">No comparison data</div>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Actual vs Predicted (Test Set)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
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
              name === "actual" ? "Actual" : "Predicted",
            ]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#A1A1AA"
            strokeWidth={1.5}
            dot={false}
            name="Actual"
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#6C63FF"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={false}
            name="Predicted"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
