import AppShell from './components/AppShell';
import SceneCanvas from './components/SceneCanvas';
import IdleScene from './scenes/IdleScene';
import './App.css';

function App() {
  return (
    <AppShell>
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold mb-4 text-[color:var(--green)]">Welcome to the OSI Story</h2>
        <p className="mb-2">This is a fun and interactive way to learn about the OSI model.</p>
        <p>Explore the layers and understand how they work together!</p>
      </div>
      <SceneCanvas>
        <IdleScene />
      </SceneCanvas>
    </AppShell>
  );
}

export default App;
