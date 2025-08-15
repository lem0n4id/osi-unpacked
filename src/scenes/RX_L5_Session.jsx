import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useUIState } from '../lib/state.jsx';
import { scene, fadeIn } from '../lib/FramerMotion.jsx';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../components/Button.jsx';
import InfoBox from '../components/transport/InfoBox.jsx';
import { LAYERS } from '../data/layers.jsx';

const RX_L5_Session = () => {
  const { setCurrentStep } = useUIState();
  const [showInfo, setShowInfo] = useState(false);
  const iconRef = useRef(null);
  const layerData = LAYERS.find(l => l.id === 5);

  useEffect(() => {
    const icon = iconRef.current;
    const tl = gsap.timeline({
      onComplete: () => setShowInfo(true)
    });

    gsap.set(icon, { autoAlpha: 0, scale: 0.5 });

    tl.to(icon, { 
      autoAlpha: 1, 
      scale: 1, 
      duration: 0.8, 
      ease: 'elastic.out(1, 0.5)' 
    }, "+=0.5")
    .to(icon, {
      autoAlpha: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.in'
    }, "+=1.0");

    return () => tl.kill();
  }, []);

  const handleNext = () => {
    setCurrentStep('L6_RECV');
  };

  return (
    <motion.div variants={scene} initial="hidden" animate="visible" exit="hidden" className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-8 relative">
      <h2 className="text-3xl font-bold mb-4 text-orange-400">Layer 5: Session (Receiving)</h2>
      <p className="text-lg mb-8">The session established earlier is still active.</p>
      
      <div className="flex-grow flex items-center justify-center">
        <div ref={iconRef}>
          <FaCheckCircle className="text-9xl text-green-500" />
        </div>
      </div>

      {showInfo && (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" exit="hidden" className="w-full max-w-3xl absolute -bottom-4">
          <InfoBox layer={layerData}>
            <p>The Session Layer confirms that the session is still open and manages the dialogue between the two computers. Since the connection is stable, the data is passed up to the Presentation Layer.</p>
          </InfoBox>
          <div className="mt-8 text-center">
            <Button onClick={handleNext}>Next: Decrypt Data</Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RX_L5_Session;
