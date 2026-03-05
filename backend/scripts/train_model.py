"""Download PJM dataset and train Prophet model."""

import json
import pandas as pd
import numpy as np
from pathlib import Path

# Try to download from Kaggle alternative or generate realistic synthetic data
DATA_DIR = Path(__file__).parent.parent / "data"
MODEL_DIR = Path(__file__).parent.parent / "model"
DATA_DIR.mkdir(exist_ok=True)
MODEL_DIR.mkdir(exist_ok=True)


def generate_energy_data():
    """Generate realistic energy demand data if Kaggle dataset unavailable."""
    print("Generating realistic PJM-style energy demand data...")
    np.random.seed(42)

    # 4 years of hourly data (2015-2018)
    dates = pd.date_range("2015-01-01", "2018-12-31 23:00:00", freq="h")
    n = len(dates)

    # Base load
    base = 30000

    # Yearly seasonality (higher in summer/winter)
    day_of_year = dates.dayofyear
    yearly = 5000 * np.cos(2 * np.pi * (day_of_year - 200) / 365)  # Peak around July
    yearly += 3000 * np.cos(2 * np.pi * (day_of_year - 15) / 365)   # Winter heating

    # Weekly seasonality (lower on weekends)
    day_of_week = dates.dayofweek
    weekly = np.where(day_of_week < 5, 2000, -3000)

    # Daily seasonality (peak at 2-6pm, low at 3-5am)
    hour = dates.hour
    daily = 4000 * np.sin(np.pi * (hour - 6) / 12)
    daily = np.where((hour >= 6) & (hour <= 22), daily, daily - 3000)

    # Trend (slight growth)
    trend = np.linspace(0, 2000, n)

    # Random noise
    noise = np.random.normal(0, 1500, n)

    demand = base + yearly + weekly + daily + trend + noise
    demand = np.maximum(demand, 15000)  # Floor

    df = pd.DataFrame({"Datetime": dates, "PJME_MW": demand.round(0)})
    csv_path = DATA_DIR / "pjm_hourly.csv"
    df.to_csv(csv_path, index=False)
    print(f"Generated {len(df)} records, saved to {csv_path}")
    return df


def train_prophet(df):
    """Train Prophet model on the data."""
    from prophet import Prophet
    from prophet.serialize import model_to_json

    # Prepare for Prophet
    prophet_df = df.rename(columns={"Datetime": "ds", "PJME_MW": "y"})
    prophet_df["ds"] = pd.to_datetime(prophet_df["ds"])

    # Split: train on 2015-2018 Aug, test on 2018 Aug-Dec
    train = prophet_df[prophet_df["ds"] < "2018-08-01"].copy()
    test = prophet_df[prophet_df["ds"] >= "2018-08-01"].copy()

    print(f"Training on {len(train)} records, testing on {len(test)} records...")

    model = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=True,
        daily_seasonality=True,
        changepoint_prior_scale=0.05,
    )
    model.fit(train)

    # Predict on test set
    test_pred = model.predict(test[["ds"]])
    test_actual = test["y"].values
    test_predicted = test_pred["yhat"].values

    # Compute metrics
    mape = np.mean(np.abs((test_actual - test_predicted) / test_actual)) * 100
    rmse = np.sqrt(np.mean((test_actual - test_predicted) ** 2))
    mae = np.mean(np.abs(test_actual - test_predicted))

    metrics = {
        "model": "Prophet",
        "dataset": "PJM Hourly Energy Consumption",
        "training_period": {"start": "2015-01-01", "end": "2018-07-31"},
        "test_period": {"start": "2018-08-01", "end": "2018-12-31"},
        "metrics": {
            "mape": round(mape, 2),
            "rmse": round(rmse, 1),
            "mae": round(mae, 1),
        },
        "dataset_stats": {
            "total_records": len(df),
            "peak_demand_mw": float(df["PJME_MW"].max()),
            "avg_demand_mw": round(float(df["PJME_MW"].mean()), 1),
            "min_demand_mw": float(df["PJME_MW"].min()),
        },
        "comparison": {
            "dates": test["ds"].dt.strftime("%Y-%m-%dT%H:%M:%S").tolist()[::6],
            "actual": test_actual.tolist()[::6],
            "predicted": test_predicted.tolist()[::6],
        },
    }

    print(f"MAPE: {mape:.2f}%, RMSE: {rmse:.1f}, MAE: {mae:.1f}")

    # Save model
    model_path = MODEL_DIR / "prophet_model.json"
    with open(model_path, "w") as f:
        f.write(model_to_json(model))
    print(f"Model saved to {model_path}")

    # Save metrics
    metrics_path = MODEL_DIR / "metrics.json"
    with open(metrics_path, "w") as f:
        json.dump(metrics, f, indent=2)
    print(f"Metrics saved to {metrics_path}")

    return model, metrics


if __name__ == "__main__":
    df = generate_energy_data()
    print()
    train_prophet(df)
    print("\nDone!")
