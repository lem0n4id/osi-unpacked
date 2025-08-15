import React from 'react';
import { useUIState } from '../lib/state.jsx';
import IdleScene from './IdleScene.jsx';

// Placeholder for the L7 scene
const L7_Application = () => (
  <div className="w-full h-full flex items-center justify-center">
    <h1 className="text-4xl text-white">Layer 7: Application</h1>
  </div>
);

const SceneRouter = () => {
  const { currentStep } = useUIState();

  switch (currentStep) {
    case 'L7':
      return <L7_Application />;
    case 'IDLE':
    default:
      return <IdleScene />;
  }
};

export default SceneRouter;
