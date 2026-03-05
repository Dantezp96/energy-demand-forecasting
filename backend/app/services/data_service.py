"""Service for loading and filtering historical energy data."""

import pandas as pd
from pathlib import Path

DATA_PATH = Path(__file__).parent.parent.parent / "data" / "pjm_hourly.csv"


def load_data() -> pd.DataFrame:
    df = pd.read_csv(DATA_PATH)
    df["Datetime"] = pd.to_datetime(df["Datetime"])
    return df


def filter_data(df: pd.DataFrame, start_date: str | None, end_date: str | None) -> pd.DataFrame:
    if start_date:
        df = df[df["Datetime"] >= pd.to_datetime(start_date)]
    if end_date:
        df = df[df["Datetime"] <= pd.to_datetime(end_date)]
    return df


def aggregate_data(df: pd.DataFrame, level: str) -> list[dict]:
    freq_map = {"hourly": None, "daily": "D", "weekly": "W", "monthly": "ME"}
    freq = freq_map.get(level)

    if freq is None:
        # Return hourly as-is, but limit to avoid huge payloads
        result = df.tail(2000) if len(df) > 2000 else df
        return [
            {"datetime": row["Datetime"].isoformat(), "demand_mw": round(row["PJME_MW"], 1)}
            for _, row in result.iterrows()
        ]

    agg = df.set_index("Datetime").resample(freq)["PJME_MW"].mean().reset_index()
    return [
        {"datetime": row["Datetime"].isoformat(), "demand_mw": round(row["PJME_MW"], 1)}
        for _, row in agg.iterrows()
    ]
