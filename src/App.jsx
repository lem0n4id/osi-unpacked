import { useEffect } from 'react';
import AppShell from './components/AppShell';
import SceneCanvas from './components/SceneCanvas';
import SceneRouter from './scenes/SceneRouter';
import HUD from './components/HUD.jsx';
import { useUIState } from './lib/state.jsx';
import './App.css';

function App() {
  const { handleNext, handleBack, handleReset, currentStep } = useUIState();

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

  const isIdleScene = currentStep === 'IDLE';

  return (
    <div className="h-full overflow-hidden">
      <AppShell>
        {/* Show welcome text only on Idle scene for mobile, always on desktop */}
        <div className={`text-center mb-4 ${!isIdleScene ? 'hidden md:block' : ''}`}>
          <h2 className="text-xl font-bold mb-4 text-[color:var(--green)]">Welcome to the OSI Unpacked</h2>
          <p className="mb-2">This is a fun and interactive way to learn about the OSI model.</p>
          <p>Explore the layers and understand how they work together!</p>
        </div>
        <SceneCanvas>
          <SceneRouter />
        </SceneCanvas>
      </AppShell>
      <HUD />
    </div>
  );
}

export default App;
