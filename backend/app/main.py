"""Energy Demand Forecasting API."""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.services.data_service import load_data
from app.services.forecast_service import load_model, load_metrics
from app.routers import historical, forecast, metrics


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Loading model and data...")
    app.state.model = load_model()
    app.state.data = load_data()
    app.state.metrics = load_metrics()
    print("Ready!")
    yield


app = FastAPI(title="Energy Demand Forecasting API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://energy-forecast-xi.vercel.app",
        settings.FRONTEND_URL,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(historical.router, prefix="/api")
app.include_router(forecast.router, prefix="/api")
app.include_router(metrics.router, prefix="/api")


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": hasattr(app.state, "model")}
