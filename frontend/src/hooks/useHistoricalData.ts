import { useState, useEffect } from "react";
import { fetchHistorical, type DataPoint } from "../api/historical";

export function useHistoricalData(
  startDate?: string,
  endDate?: string,
  aggregation: string = "daily"
) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchHistorical(startDate, endDate, aggregation)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [startDate, endDate, aggregation]);

  return { data, loading, error };
}
