"""Service for loading Prophet model and generating forecasts."""

import json
import pandas as pd
from pathlib import Path
from prophet import Prophet
from prophet.serialize import model_from_json

MODEL_PATH = Path(__file__).parent.parent.parent / "model" / "prophet_model.json"
METRICS_PATH = Path(__file__).parent.parent.parent / "model" / "metrics.json"


def load_model() -> Prophet:
    with open(MODEL_PATH, "r") as f:
        return model_from_json(f.read())


def load_metrics() -> dict:
    with open(METRICS_PATH, "r") as f:
        return json.load(f)


def forecast(model: Prophet, horizon_hours: int, start_from: str | None = None) -> list[dict]:
    if start_from is None:
        start_from = "2018-12-31T23:00:00"

    future = pd.DataFrame({
        "ds": pd.date_range(start=start_from, periods=horizon_hours, freq="h")
    })
    pred = model.predict(future)

    return [
        {
            "datetime": row["ds"].isoformat(),
            "predicted_mw": round(row["yhat"], 1),
            "lower_bound": round(row["yhat_lower"], 1),
            "upper_bound": round(row["yhat_upper"], 1),
        }
        for _, row in pred.iterrows()
    ]
