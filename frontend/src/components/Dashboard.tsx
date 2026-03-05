import { useState } from "react";
import { useHistoricalData } from "../hooks/useHistoricalData";
import { useForecast } from "../hooks/useForecast";
import { useMetrics } from "../hooks/useMetrics";
import { HistoricalChart } from "./charts/HistoricalChart";
import { ForecastChart } from "./charts/ForecastChart";
import { ComparisonChart } from "./charts/ComparisonChart";
import { StatsCard } from "./cards/StatsCard";
import { AggregationToggle } from "./controls/AggregationToggle";
import { HorizonSlider } from "./controls/HorizonSlider";

export function Dashboard() {
  const [aggregation, setAggregation] = useState("daily");
  const [horizon, setHorizon] = useState(168);

  const historical = useHistoricalData(undefined, undefined, aggregation);
  const forecast = useForecast(horizon);
  const metrics = useMetrics();

  const comparisonData =
    metrics.data?.comparison
      ? metrics.data.comparison.dates.map((d, i) => ({
          datetime: d,
          actual: Math.round(metrics.data!.comparison.actual[i]),
          predicted: Math.round(metrics.data!.comparison.predicted[i]),
        }))
      : [];

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="stats-grid">
        <StatsCard
          label="Model MAPE"
          value={metrics.data ? `${metrics.data.metrics.mape}` : "—"}
          unit="%"
        />
        <StatsCard
          label="Peak Demand"
          value={
            metrics.data
              ? `${(metrics.data.dataset_stats.peak_demand_mw / 1000).toFixed(1)}`
              : "—"
          }
          unit="GW"
        />
        <StatsCard
          label="Avg Demand"
          value={
            metrics.data
              ? `${(metrics.data.dataset_stats.avg_demand_mw / 1000).toFixed(1)}`
              : "—"
          }
          unit="GW"
        />
        <StatsCard
          label="Total Records"
          value={
            metrics.data
              ? `${(metrics.data.dataset_stats.total_records / 1000).toFixed(0)}`
              : "—"
          }
          unit="K"
        />
      </div>

      {/* Controls */}
      <div className="controls-row">
        <AggregationToggle value={aggregation} onChange={setAggregation} />
        <HorizonSlider value={horizon} onChange={setHorizon} />
      </div>

      {/* Charts */}
      <HistoricalChart data={historical.data} loading={historical.loading} />
      <ForecastChart data={forecast.data} loading={forecast.loading} />
      <ComparisonChart data={comparisonData} loading={metrics.loading} />
    </div>
  );
}
