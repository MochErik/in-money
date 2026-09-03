from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import numpy as np
from datetime import datetime

app = FastAPI(title="Zenith Financial Analytics Engine", version="2.0.0")

class TransactionItem(BaseModel):
    amount: float
    type: str
    timestamp: int

class ForecastResponse(BaseModel):
    daily_runway_days: float
    projected_monthly_spend: float
    burn_rate_per_day: float
    status: str

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "python-cashflow-analytics",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/forecast", response_model=ForecastResponse)
def compute_forecast(transactions: List[TransactionItem]):
    expenses = [t.amount for t in transactions if t.type == "EXPENSE"]
    if not expenses:
        return ForecastResponse(
            daily_runway_days=999.0,
            projected_monthly_spend=0.0,
            burn_rate_per_day=0.0,
            status="INSUFFICIENT_DATA"
        )
    
    avg_expense = float(np.mean(expenses))
    daily_burn = avg_expense * 2.5 # approx 2.5 transactions per day
    projected_month = daily_burn * 30.0
    
    return ForecastResponse(
        daily_runway_days=round(145780000 / (daily_burn if daily_burn > 0 else 1), 1),
        projected_monthly_spend=round(projected_month, 2),
        burn_rate_per_day=round(daily_burn, 2),
        status="HEALTHY_FORECAST"
    )
