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
import { type Lang, t } from "../i18n";

interface Props {
  lang: Lang;
}

export function Dashboard({ lang }: Props) {
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

      {/* Section 1: Historical */}
      <section className="chart-section">
        <div className="section-header">
          <h3 className="section-number">01</h3>
          <p className="section-subtitle">{t("section.historical.subtitle", lang)}</p>
        </div>
        <div className="controls-row">
          <AggregationToggle value={aggregation} onChange={setAggregation} lang={lang} />
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
