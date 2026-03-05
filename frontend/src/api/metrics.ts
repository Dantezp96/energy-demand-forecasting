import { api } from "./client";

export interface MetricsResponse {
  model: string;
  dataset: string;
  training_period: { start: string; end: string };
  test_period: { start: string; end: string };
  metrics: { mape: number; rmse: number; mae: number };
  dataset_stats: {
    total_records: number;
    peak_demand_mw: number;
    avg_demand_mw: number;
    min_demand_mw: number;
  };
  comparison: {
    dates: string[];
    actual: number[];
    predicted: number[];
  };
}

export async function fetchMetrics(): Promise<MetricsResponse> {
  const { data } = await api.get<MetricsResponse>("/metrics");
  return data;
}
