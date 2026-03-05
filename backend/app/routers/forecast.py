from fastapi import APIRouter, Request
from app.schemas.forecast import ForecastRequest, ForecastResponse
from app.services.forecast_service import forecast

router = APIRouter()


@router.post("/forecast", response_model=ForecastResponse)
def get_forecast(request: Request, body: ForecastRequest):
    model = request.app.state.model
    data = forecast(model, body.horizon_hours, body.start_from)
    return ForecastResponse(
        forecast=data,
        horizon_hours=body.horizon_hours,
    )
