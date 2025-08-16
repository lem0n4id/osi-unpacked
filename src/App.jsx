import { useEffect } from 'react';
import AppShell from './components/AppShell';
import SceneCanvas from './components/SceneCanvas';
import SceneRouter from './scenes/SceneRouter';
import HUD from './components/HUD.jsx';
import { useUIState } from './lib/state.jsx';
import './App.css';

function App() {
  const { handleNext, handleBack, handleReset } = useUIState();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handleBack();
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handleBack, handleReset]);

  return (
    <div className="h-full overflow-hidden">
      <AppShell>
        <SceneCanvas>
          <SceneRouter />
        </SceneCanvas>
      </AppShell>
      <HUD />
    </div>
  );
}

export default App;
