export type Lang = "es" | "en";

const translations = {
  // Header
  "app.title": { en: "Energy Demand Forecasting", es: "Pronóstico de Demanda Energética" },
  "nav.portfolio": { en: "Portfolio", es: "Portafolio" },
  "nav.github": { en: "GitHub", es: "GitHub" },

  // Hero
  "hero.title": { en: "Real-Time Energy Demand Forecasting", es: "Pronóstico de Demanda Energética en Tiempo Real" },
  "hero.desc": {
    en: "Interactive dashboard powered by <strong>Prophet</strong> time series model. Analyze historical PJM energy consumption and generate forecasts up to 7 days ahead.",
    es: "Dashboard interactivo impulsado por el modelo de series de tiempo <strong>Prophet</strong>. Analiza el consumo histórico de energía PJM y genera pronósticos hasta 7 días.",
  },

  // Stats
  "stats.mape": { en: "Model MAPE", es: "MAPE del Modelo" },
  "stats.peak": { en: "Peak Demand", es: "Demanda Pico" },
  "stats.avg": { en: "Avg Demand", es: "Demanda Promedio" },
  "stats.records": { en: "Total Records", es: "Total Registros" },

  // Controls
  "controls.aggregation": { en: "Aggregation", es: "Agregación" },
  "controls.hourly": { en: "Hourly", es: "Horario" },
  "controls.daily": { en: "Daily", es: "Diario" },
  "controls.weekly": { en: "Weekly", es: "Semanal" },
  "controls.monthly": { en: "Monthly", es: "Mensual" },
  "controls.horizon": { en: "Forecast Horizon", es: "Horizonte de Pronóstico" },
  "controls.day": { en: "day", es: "día" },
  "controls.days": { en: "days", es: "días" },

  // Charts
  "chart.historical": { en: "Historical Energy Demand", es: "Demanda Energética Histórica" },
  "chart.forecast": { en: "Energy Demand Forecast", es: "Pronóstico de Demanda Energética" },
  "chart.comparison": { en: "Actual vs Predicted (Test Set)", es: "Real vs Predicho (Conjunto de Prueba)" },

  // Chart labels
  "chart.demand": { en: "Demand", es: "Demanda" },
  "chart.actual": { en: "Actual", es: "Real" },
  "chart.predicted": { en: "Predicted", es: "Predicho" },
  "chart.upperBound": { en: "Upper Bound", es: "Límite Superior" },
  "chart.lowerBound": { en: "Lower Bound", es: "Límite Inferior" },
  "chart.confidenceBand": { en: "Confidence Band", es: "Banda de Confianza" },

  // Loading
  "loading.historical": { en: "Loading historical data...", es: "Cargando datos históricos..." },
  "loading.forecast": { en: "Generating forecast...", es: "Generando pronóstico..." },
  "loading.comparison": { en: "Loading comparison...", es: "Cargando comparación..." },
  "empty.data": { en: "No data available", es: "Sin datos disponibles" },
  "empty.forecast": { en: "No forecast data", es: "Sin datos de pronóstico" },
  "empty.comparison": { en: "No comparison data", es: "Sin datos de comparación" },

  // Footer
  "footer.text": {
    en: "Built by <strong>Omar Daniel Zorro</strong> — Data Scientist & ML Engineer",
    es: "Desarrollado por <strong>Omar Daniel Zorro</strong> — Científico de Datos & Ingeniero ML",
  },

  // Language toggle
  "lang.switch": { en: "ES", es: "EN" },
} as const;

type Key = keyof typeof translations;

export function t(key: Key, lang: Lang): string {
  return translations[key][lang];
}
