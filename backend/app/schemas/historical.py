from pydantic import BaseModel


class DataPoint(BaseModel):
    datetime: str
    demand_mw: float


class HistoricalResponse(BaseModel):
    data: list[DataPoint]
    total_records: int
    aggregation: str
