from pydantic import BaseModel, Field


class ForecastRequest(BaseModel):
    horizon_hours: int = Field(default=168, ge=24, le=168)
    start_from: str | None = None


class ForecastPoint(BaseModel):
    datetime: str
    predicted_mw: float
    lower_bound: float
    upper_bound: float


class ForecastResponse(BaseModel):
    forecast: list[ForecastPoint]
    horizon_hours: int
    model_used: str = "Prophet"
