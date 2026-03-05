import { Dashboard } from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">
            <span className="logo-icon">&#9889;</span> Energy Demand Forecasting
          </h1>
          <nav className="header-nav">
            <a
              href="https://frontend-mauve-seven-17.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Portfolio
            </a>
            <a
              href="https://github.com/Dantezp96/energy-demand-forecasting"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="hero-section">
            <h2>Real-Time Energy Demand Forecasting</h2>
            <p>
              Interactive dashboard powered by <strong>Prophet</strong> time series model.
              Analyze historical PJM energy consumption and generate forecasts up to 7 days ahead.
            </p>
          </div>
          <Dashboard />
        </div>
      </main>

      <footer className="footer">
        <p>
          Built by <strong>Omar Daniel Zorro</strong> — Data Scientist & ML Engineer
        </p>
      </footer>
    </div>
  );
}

export default App;
