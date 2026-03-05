import { api } from "./client";

export interface ForecastPoint {
  datetime: string;
  predicted_mw: number;
  lower_bound: number;
  upper_bound: number;
}

export interface ForecastResponse {
  forecast: ForecastPoint[];
  horizon_hours: number;
  model_used: string;
}

export async function fetchForecast(
  horizonHours: number = 168,
  startFrom?: string
): Promise<ForecastResponse> {
  const { data } = await api.post<ForecastResponse>("/forecast", {
    horizon_hours: horizonHours,
    start_from: startFrom,
  });
  return data;
}
