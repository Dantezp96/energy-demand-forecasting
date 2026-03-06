import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { type Lang, t } from "./i18n";
import "./App.css";

function App() {
  const [lang, setLang] = useState<Lang>("es");

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">
            <span className="logo-icon">&#9889;</span> {t("app.title", lang)}
          </h1>
          <nav className="header-nav">
            <button
              className="lang-toggle"
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
            >
              {t("lang.switch", lang)}
            </button>
            <a
              href="https://frontend-mauve-seven-17.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              {t("nav.portfolio", lang)}
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
            <h2>{t("hero.title", lang)}</h2>
            <p dangerouslySetInnerHTML={{ __html: t("hero.desc", lang) }} />
          </div>
          <Dashboard lang={lang} />
        </div>
      </main>

      <footer className="footer">
        <p dangerouslySetInnerHTML={{ __html: t("footer.text", lang) }} />
      </footer>
    </div>
  );
}

export default App;
