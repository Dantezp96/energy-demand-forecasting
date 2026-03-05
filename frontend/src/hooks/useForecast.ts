import { useState, useEffect } from "react";
import { fetchForecast, type ForecastPoint } from "../api/forecast";

export function useForecast(horizonHours: number = 168) {
  const [data, setData] = useState<ForecastPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchForecast(horizonHours)
      .then((res) => setData(res.forecast))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [horizonHours]);

  return { data, loading, error };
}
