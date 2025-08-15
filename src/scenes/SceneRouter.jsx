import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useUIState } from '../lib/state.jsx';
import IdleScene from './IdleScene.jsx';
import L7_Application from './L7_Application.jsx';
import L6_Presentation from './L6_Presentation.jsx';
import L5_Session from './L5_Session.jsx';
import L4_Transport from './L4_Transport.jsx';
import L3_Network from './L3_Network.jsx';
import L2_DataLink from './L2_DataLink.jsx';
import L1_Physical from './L1_Physical.jsx';
import RX_L1_Physical from './RX_L1_Physical.jsx';
import RX_L2_DataLink from './RX_L2_DataLink.jsx';
import RX_L3_Network from './RX_L3_Network.jsx';
import RX_L4_Transport from './RX_L4_Transport.jsx';
import RX_L5_Session from './RX_L5_Session.jsx';
import RX_L6_Presentation from './RX_L6_Presentation.jsx';
import RX_L7_Application from './RX_L7_Application.jsx';

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
      case 'L5':
        sceneComponent = <L5_Session />;
        break;
      case 'L4':
        sceneComponent = <L4_Transport />;
        break;
      case 'L3':
        sceneComponent = <L3_Network />;
        break;
      case 'L2':
        sceneComponent = <L2_DataLink />;
        break;
      case 'L1':
        sceneComponent = <L1_Physical />;
        break;
      case 'L1_RECV':
        sceneComponent = <RX_L1_Physical />;
        break;
      case 'L2_RECV':
        sceneComponent = <RX_L2_DataLink />;
        break;
      case 'L3_RECV':
        sceneComponent = <RX_L3_Network />;
        break;
      case 'L4_RECV':
        sceneComponent = <RX_L4_Transport />;
        break;
      case 'L5_RECV':
        sceneComponent = <RX_L5_Session />;
        break;
      case 'L6_RECV':
        sceneComponent = <RX_L6_Presentation />;
        break;
      case 'L7_RECV':
        sceneComponent = <RX_L7_Application />;
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
