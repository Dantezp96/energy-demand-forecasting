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
  "controls.1d": { en: "1 Day", es: "1 Día" },
  "controls.2d": { en: "2 Days", es: "2 Días" },
  "controls.3d": { en: "3 Days", es: "3 Días" },
  "controls.5d": { en: "5 Days", es: "5 Días" },
  "controls.7d": { en: "7 Days", es: "7 Días" },

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

  // Section headers
  "section.historical.subtitle": {
    en: "Explore historical energy consumption — use the aggregation buttons to switch between hourly, daily, weekly or monthly views.",
    es: "Explora el consumo energético histórico — usa los botones de agregación para cambiar entre vista horaria, diaria, semanal o mensual.",
  },
  "section.forecast.subtitle": {
    en: "Generate future demand predictions — select how many days ahead you want to forecast.",
    es: "Genera predicciones de demanda futura — selecciona cuántos días adelante quieres pronosticar.",
  },
  "section.comparison.subtitle": {
    en: "See how accurate the model is by comparing its predictions against real data it never saw.",
    es: "Observa qué tan preciso es el modelo comparando sus predicciones contra datos reales que nunca vio.",
  },

  // Explanatory sections
  "explain.historical.title": { en: "About This Data", es: "Sobre Estos Datos" },
  "explain.historical.text": {
    en: "This chart shows <strong>real hourly energy consumption</strong> from the PJM interconnection (Pennsylvania-New Jersey-Maryland), one of the largest electricity markets in the US. The data spans from 2015 to 2018 with over 35,000 records. You can observe <strong>seasonal patterns</strong>: higher demand in summer (air conditioning) and winter (heating), with lower demand in spring and fall.",
    es: "Este gráfico muestra el <strong>consumo energético real por hora</strong> de la interconexión PJM (Pennsylvania-New Jersey-Maryland), uno de los mercados eléctricos más grandes de EE.UU. Los datos abarcan de 2015 a 2018 con más de 35,000 registros. Se pueden observar <strong>patrones estacionales</strong>: mayor demanda en verano (aire acondicionado) e invierno (calefacción), con menor demanda en primavera y otoño.",
  },
  "explain.forecast.title": { en: "How the Forecast Works", es: "Cómo Funciona el Pronóstico" },
  "explain.forecast.text": {
    en: "The model uses <strong>Facebook Prophet</strong>, a time series algorithm that decomposes the signal into trend, seasonality (daily, weekly, yearly), and holiday effects. The <strong>shaded area</strong> represents the 80% confidence interval — the model is 80% confident the real demand will fall within this band. Try changing the horizon to see how uncertainty grows with longer predictions.",
    es: "El modelo usa <strong>Facebook Prophet</strong>, un algoritmo de series de tiempo que descompone la señal en tendencia, estacionalidad (diaria, semanal, anual) y efectos de días festivos. El <strong>área sombreada</strong> representa el intervalo de confianza del 80% — el modelo tiene un 80% de certeza de que la demanda real caerá dentro de esta banda. Prueba cambiar el horizonte para ver cómo la incertidumbre crece con predicciones más largas.",
  },
  "explain.comparison.title": { en: "Model Evaluation", es: "Evaluación del Modelo" },
  "explain.comparison.text": {
    en: "This chart compares <strong>actual demand</strong> (solid line) vs <strong>model predictions</strong> (dashed line) on data the model never saw during training (Aug-Dec 2018). With a <strong>MAPE of 4.76%</strong>, the model achieves high accuracy — on average, predictions deviate only ~5% from reality. This level of accuracy is valuable for grid operators planning energy supply and managing costs.",
    es: "Este gráfico compara la <strong>demanda real</strong> (línea sólida) vs las <strong>predicciones del modelo</strong> (línea punteada) sobre datos que el modelo nunca vio durante el entrenamiento (ago-dic 2018). Con un <strong>MAPE de 4.76%</strong>, el modelo logra alta precisión — en promedio, las predicciones se desvían solo ~5% de la realidad. Este nivel de precisión es valioso para operadores de red que planifican el suministro energético y gestionan costos.",
  },

  // Methodology
  "methodology.title": { en: "Methodology & Technical Details", es: "Metodología y Detalles Técnicos" },
  "methodology.dataset": {
    en: "<strong>Dataset:</strong> PJM Hourly Energy Consumption — 35,064 hourly records from 2015-2018. Source: Kaggle (PJM Interconnection LLC).",
    es: "<strong>Dataset:</strong> Consumo Energético Horario PJM — 35,064 registros horarios de 2015-2018. Fuente: Kaggle (PJM Interconnection LLC).",
  },
  "methodology.model": {
    en: "<strong>Model:</strong> Facebook Prophet — additive time series model with automatic detection of trend changes, yearly/weekly/daily seasonality, and holiday effects.",
    es: "<strong>Modelo:</strong> Facebook Prophet — modelo aditivo de series de tiempo con detección automática de cambios de tendencia, estacionalidad anual/semanal/diaria y efectos de días festivos.",
  },
  "methodology.split": {
    en: "<strong>Train/Test Split:</strong> Training on Jan 2015 – Jul 2018, evaluation on Aug – Dec 2018 (5 months holdout).",
    es: "<strong>División Train/Test:</strong> Entrenamiento en ene 2015 – jul 2018, evaluación en ago – dic 2018 (5 meses de holdout).",
  },
  "methodology.metrics": {
    en: "<strong>Metrics:</strong> MAPE 4.76% · RMSE 1,819.9 MW · MAE 1,438.1 MW — industry-level accuracy for energy demand forecasting.",
    es: "<strong>Métricas:</strong> MAPE 4.76% · RMSE 1,819.9 MW · MAE 1,438.1 MW — precisión de nivel industrial para pronóstico de demanda energética.",
  },
  "methodology.stack": {
    en: "<strong>Tech Stack:</strong> FastAPI (backend) · React + Recharts (frontend) · Railway (API hosting) · Vercel (frontend hosting).",
    es: "<strong>Stack Tecnológico:</strong> FastAPI (backend) · React + Recharts (frontend) · Railway (hosting API) · Vercel (hosting frontend).",
  },

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
