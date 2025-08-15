import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useUIState } from '../lib/state.jsx';
import IdleScene from './IdleScene.jsx';
import L7_Application from './L7_Application.jsx';
import L6_Presentation from './L6_Presentation.jsx';

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
      case 'L6':
        sceneComponent = <L6_Presentation />;
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
