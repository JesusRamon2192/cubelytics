import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Timer } from './components/Timer';
import { Stats } from './components/Stats';
import { History } from './components/History';
import AnalyticsPage from './features/analytics/AnalyticsPage';
import { ThemeSelector } from './components/ThemeSelector';
import { useThemeStore } from './theme/useTheme';

function TimerLayout() {
  return (
    <>
      <Timer />
      <aside className="sidebar">
        <Stats />
        <History />
      </aside>
    </>
  );
}

function App() {
  const location = useLocation();
  const isAnalytics = location.pathname === '/analytics';
  const { initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-container">
          <div className="brand-container">
            <h1>CubeLytics</h1>
            <div className="brand-subtitle">CFOP Training</div>
          </div>
          <div className="nav-controls">
            <nav className="nav-links">
              <Link 
                to="/" 
                className={`nav-link ${!isAnalytics ? 'active' : 'inactive'}`}
              >
                Timer
              </Link>
              <Link 
                to="/analytics" 
                className={`nav-link ${isAnalytics ? 'active' : 'inactive'}`}
              >
                Analytics
              </Link>
            </nav>
            <ThemeSelector />
          </div>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<TimerLayout />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
