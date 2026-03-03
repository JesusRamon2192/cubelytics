import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Timer } from './components/Timer';
import { Stats } from './components/Stats';
import { HistoricView } from './features/historic/HistoricView';
import AnalyticsPage from './features/analytics/AnalyticsPage';
import { ThemeSelector } from './components/ThemeSelector';
import { SplitToggle } from './components/timer/SplitToggle';
import { useThemeStore } from './theme/useTheme';
import { useAuth } from './features/auth/AuthContext';
import { Login } from './features/auth/Login';
import { Register } from './features/auth/Register';
import { ProtectedRoute } from './features/auth/ProtectedRoute';
import { AdminPanel } from './features/admin/AdminPanel';

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
  const { user, logout } = useAuth();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-container">
          <div className="brand-container">
            <h1>CubeLytics</h1>
            <div className="brand-subtitle" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              CFOP Training
              {!user && <span style={{ fontSize: '0.7rem', background: 'var(--accent)', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>Guest Mode</span>}
            </div>
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
              {user?.role === 'ADMIN' && (
                <Link 
                  to="/admin" 
                  className={`nav-link ${currentPath === '/admin' ? 'active' : 'inactive'}`}
                >
                  Admin
                </Link>
              )}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <SplitToggle />
              <ThemeSelector />
              {user ? (
                <button onClick={logout} style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
              ) : (
                <Link to="/login" style={{ padding: '0.4rem 0.8rem', background: 'var(--accent)', color: 'white', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem' }}>Login</Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/" element={<TimerLayout />} />
          <Route path="/historic" element={<HistoricLayout />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
