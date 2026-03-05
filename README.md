# Energy Demand Forecasting

Interactive dashboard for energy demand prediction using Prophet time series model.

## Features
- Historical energy demand visualization with zoom/pan
- 1-7 day ahead forecasting with confidence intervals
- Actual vs predicted comparison on test set
- Hourly/daily/weekly/monthly aggregation
- Dark theme responsive dashboard

## Tech Stack
- **Backend**: FastAPI, Prophet, Pandas
- **Frontend**: React, TypeScript, Recharts, Vite
- **Deployment**: Railway (API), Vercel (Frontend)

## Run Locally
```bash
# Backend
cd backend && pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend && npm install && npm run dev
```

## Author
Omar Daniel Zorro - Data Scientist & ML Engineer
