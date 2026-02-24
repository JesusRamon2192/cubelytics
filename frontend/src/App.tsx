// React import not needed 
import { Timer } from './components/Timer';
import { Stats } from './components/Stats';
import { History } from './components/History';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Twisty Timer PRO</h1>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>CFOP Training</div>
      </header>

      <main className="main-content">
        <Timer />
        <aside className="sidebar">
          <Stats />
          <History />
        </aside>
      </main>
    </div>
  );
}

export default App;
