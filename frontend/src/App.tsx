import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Timer } from './components/Timer';
import { Stats } from './components/Stats';
import { HistoricView } from './features/historic/HistoricView';
import AnalyticsPage from './features/analytics/AnalyticsPage';
import { ThemeSelector } from './components/ThemeSelector';
import { SplitToggle } from './components/timer/SplitToggle';
import { useThemeStore } from './theme/useTheme';

function TimerLayout() {
  return (
    <>
      <Timer />
      <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
        <Stats />
      </aside>
    </>
  );
}

function HistoricLayout() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeSlideUp 0.8s ease-out backwards' }}>
      <HistoricView />
    </div>
  );
}

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
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
                className={`nav-link ${currentPath === '/' ? 'active' : 'inactive'}`}
              >
                Timer
              </Link>
              <Link 
                to="/historic" 
                className={`nav-link ${currentPath === '/historic' ? 'active' : 'inactive'}`}
              >
                Historic
              </Link>
              <Link 
                to="/analytics" 
                className={`nav-link ${currentPath === '/analytics' ? 'active' : 'inactive'}`}
              >
                Analytics
              </Link>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <SplitToggle />
              <ThemeSelector />
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<TimerLayout />} />
          <Route path="/historic" element={<HistoricLayout />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
