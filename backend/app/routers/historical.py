from fastapi import APIRouter, Request, Query
from app.schemas.historical import HistoricalResponse
from app.services.data_service import filter_data, aggregate_data

router = APIRouter()


@router.get("/historical", response_model=HistoricalResponse)
def get_historical(
    request: Request,
    start_date: str | None = Query(None),
    end_date: str | None = Query(None),
    aggregation: str = Query("daily", regex="^(hourly|daily|weekly|monthly)$"),
):
    df = request.app.state.data.copy()
    df = filter_data(df, start_date, end_date)
    data = aggregate_data(df, aggregation)
    return HistoricalResponse(
        data=data,
        total_records=len(data),
        aggregation=aggregation,
    )
