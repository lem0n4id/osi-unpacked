import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useUIState } from '../lib/state.jsx';
import IdleScene from './IdleScene.jsx';

// Placeholder for the L7 scene
const L7_Application = () => (
  <div className="w-full h-full flex items-center justify-center">
    <h1 className="text-4xl text-white">Layer 7: Application</h1>
  </div>
);

const sceneTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

const SceneRouter = () => {
  const { currentStep } = useUIState();

  const renderScene = () => {
    let sceneComponent;
    switch (currentStep) {
      case 'L7':
        sceneComponent = <L7_Application />;
        break;
      case 'IDLE':
      default:
        sceneComponent = <IdleScene />;
        break;
    }
    return (
      <motion.div
        key={currentStep}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={sceneTransition}
      >
        {sceneComponent}
      </motion.div>
    );
  };

  return <AnimatePresence mode="wait">{renderScene()}</AnimatePresence>;
};

export default SceneRouter;
