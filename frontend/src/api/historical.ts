import { api } from "./client";

export interface DataPoint {
  datetime: string;
  demand_mw: number;
}

export interface HistoricalResponse {
  data: DataPoint[];
  total_records: number;
  aggregation: string;
}

export async function fetchHistorical(
  startDate?: string,
  endDate?: string,
  aggregation: string = "daily"
): Promise<HistoricalResponse> {
  const params: Record<string, string> = { aggregation };
  if (startDate) params.start_date = startDate;
  if (endDate) params.end_date = endDate;
  const { data } = await api.get<HistoricalResponse>("/historical", { params });
  return data;
}
