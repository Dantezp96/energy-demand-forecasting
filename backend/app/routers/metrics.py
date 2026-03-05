from fastapi import APIRouter, Request

router = APIRouter()


@router.get("/metrics")
def get_metrics(request: Request):
    return request.app.state.metrics
