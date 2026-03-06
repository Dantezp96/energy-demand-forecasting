import { useState, useMemo } from "react";
import { useHistoricalData } from "../hooks/useHistoricalData";
import { useForecast } from "../hooks/useForecast";
import { useMetrics } from "../hooks/useMetrics";
import { HistoricalChart } from "./charts/HistoricalChart";
import { ForecastChart } from "./charts/ForecastChart";
import { ComparisonChart } from "./charts/ComparisonChart";
import { StatsCard } from "./cards/StatsCard";
import { AggregationToggle } from "./controls/AggregationToggle";
import { HorizonSlider } from "./controls/HorizonSlider";
import { type Lang, t } from "../i18n";

interface Props {
  lang: Lang;
}

interface ComparisonPoint {
  datetime: string;
  actual: number;
  predicted: number;
}

function getGroupKey(datetime: string, aggregation: string): string {
  const d = new Date(datetime);
  switch (aggregation) {
    case "daily":
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    case "weekly": {
      const startOfYear = new Date(d.getFullYear(), 0, 1);
      const week = Math.ceil(((d.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
      return `${d.getFullYear()}-W${week}`;
    }
    case "monthly":
      return `${d.getFullYear()}-${d.getMonth()}`;
    default:
      return datetime;
  }
}

function aggregateComparison(data: ComparisonPoint[], aggregation: string): ComparisonPoint[] {
  if (aggregation === "hourly" || !data.length) return data;

  const groups = new Map<string, { datetimes: string[]; actuals: number[]; predicteds: number[] }>();

  for (const point of data) {
    const key = getGroupKey(point.datetime, aggregation);
    if (!groups.has(key)) {
      groups.set(key, { datetimes: [], actuals: [], predicteds: [] });
    }
    const g = groups.get(key)!;
    g.datetimes.push(point.datetime);
    g.actuals.push(point.actual);
    g.predicteds.push(point.predicted);
  }

  return Array.from(groups.values()).map((g) => ({
    datetime: g.datetimes[0],
    actual: Math.round(g.actuals.reduce((a, b) => a + b, 0) / g.actuals.length),
    predicted: Math.round(g.predicteds.reduce((a, b) => a + b, 0) / g.predicteds.length),
  }));
}

export function Dashboard({ lang }: Props) {
  const [aggregation, setAggregation] = useState("daily");
  const [horizon, setHorizon] = useState(168);

  const historical = useHistoricalData(undefined, undefined, aggregation);
  const forecast = useForecast(horizon);
  const metrics = useMetrics();

  const rawComparison = useMemo(() =>
    metrics.data?.comparison
      ? metrics.data.comparison.dates.map((d, i) => ({
          datetime: d,
          actual: Math.round(metrics.data!.comparison.actual[i]),
          predicted: Math.round(metrics.data!.comparison.predicted[i]),
        }))
      : [],
    [metrics.data]
  );

  const comparisonData = useMemo(
    () => aggregateComparison(rawComparison, aggregation),
    [rawComparison, aggregation]
  );

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="stats-grid">
        <StatsCard
          label={t("stats.mape", lang)}
          value={metrics.data ? `${metrics.data.metrics.mape}` : "—"}
          unit="%"
        />
        <StatsCard
          label={t("stats.peak", lang)}
          value={
            metrics.data
              ? `${(metrics.data.dataset_stats.peak_demand_mw / 1000).toFixed(1)}`
              : "—"
          }
          unit="GW"
        />
        <StatsCard
          label={t("stats.avg", lang)}
          value={
            metrics.data
              ? `${(metrics.data.dataset_stats.avg_demand_mw / 1000).toFixed(1)}`
              : "—"
          }
          unit="GW"
        />
        <StatsCard
          label={t("stats.records", lang)}
          value={
            metrics.data
              ? `${(metrics.data.dataset_stats.total_records / 1000).toFixed(0)}`
              : "—"
          }
          unit="K"
        />
      </div>

      {/* Global Aggregation Control */}
      <div className="controls-row">
        <AggregationToggle value={aggregation} onChange={setAggregation} lang={lang} />
      </div>

      {/* Section 1: Historical */}
      <section className="chart-section">
        <div className="section-header">
          <h3 className="section-number">01</h3>
          <p className="section-subtitle">{t("section.historical.subtitle", lang)}</p>
        </div>
        <HistoricalChart data={historical.data} loading={historical.loading} lang={lang} />
        <div className="explain-card">
          <h4 className="explain-title">{t("explain.historical.title", lang)}</h4>
          <p dangerouslySetInnerHTML={{ __html: t("explain.historical.text", lang) }} />
        </div>
      </section>

      {/* Section 2: Forecast */}
      <section className="chart-section">
        <div className="section-header">
          <h3 className="section-number">02</h3>
          <p className="section-subtitle">{t("section.forecast.subtitle", lang)}</p>
        </div>
        <div className="controls-row">
          <HorizonSlider value={horizon} onChange={setHorizon} lang={lang} />
        </div>
        <ForecastChart data={forecast.data} loading={forecast.loading} lang={lang} />
        <div className="explain-card">
          <h4 className="explain-title">{t("explain.forecast.title", lang)}</h4>
          <p dangerouslySetInnerHTML={{ __html: t("explain.forecast.text", lang) }} />
        </div>
      </section>

      {/* Section 3: Comparison */}
      <section className="chart-section">
        <div className="section-header">
          <h3 className="section-number">03</h3>
          <p className="section-subtitle">{t("section.comparison.subtitle", lang)}</p>
        </div>
        <ComparisonChart data={comparisonData} loading={metrics.loading} lang={lang} />
        <div className="explain-card">
          <h4 className="explain-title">{t("explain.comparison.title", lang)}</h4>
          <p dangerouslySetInnerHTML={{ __html: t("explain.comparison.text", lang) }} />
        </div>
      </section>

      {/* Methodology Section */}
      <div className="methodology-card">
        <h3 className="methodology-title">{t("methodology.title", lang)}</h3>
        <ul className="methodology-list">
          <li dangerouslySetInnerHTML={{ __html: t("methodology.dataset", lang) }} />
          <li dangerouslySetInnerHTML={{ __html: t("methodology.model", lang) }} />
          <li dangerouslySetInnerHTML={{ __html: t("methodology.split", lang) }} />
          <li dangerouslySetInnerHTML={{ __html: t("methodology.metrics", lang) }} />
          <li dangerouslySetInnerHTML={{ __html: t("methodology.stack", lang) }} />
        </ul>
      </div>
    </div>
  );
}
