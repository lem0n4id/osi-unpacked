import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { useUIState } from '../lib/state.jsx';
import { LAYERS } from '../data/layers.jsx';
import Packet from '../components/network/Packet';
import Segment from '../components/transport/Segment';
import InfoBox from '../components/transport/InfoBox';
import Button from '../components/Button';
import { scene, fadeIn } from '../lib/FramerMotion.jsx';

const RX_L3_Network = () => {
  const { setCurrentStep } = useUIState();
  const layerData = LAYERS.find(l => l.id === 3);
  const l4Data = LAYERS.find(l => l.id === 4);

  const packetRefs = useRef([]);
  packetRefs.current = [];
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (packetRefs.current.length === 0) return;

    const ipHeaders = packetRefs.current.map(p => p.querySelector('.ip-header'));
    const ipLabels = packetRefs.current.map(p => p.querySelector('.ip-label'));

    const tl = gsap.timeline({
      onComplete: () => setShowInfo(true),
      defaults: { duration: 1.2, ease: 'power3.inOut' }
    });

    tl.to([...ipHeaders, ...ipLabels], {
      y: -35,
      autoAlpha: 0,
      stagger: 0.1,
    }, "+=1.0");

    return () => tl.kill();
  }, [l4Data]);

  const addToRefs = (el) => {
    if (el && !packetRefs.current.includes(el)) {
      packetRefs.current.push(el);
    }
  };

  const handleNext = () => {
    setCurrentStep('L4_RECV');
  };

  if (!layerData || !l4Data) return null;

  return (
    <motion.div variants={scene} initial="hidden" animate="visible" exit="hidden" className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-blue-400 text-center">Layer 3: Network (Receiving)</h2>
      <p className="text-sm md:text-lg mb-4 md:mb-8 text-center">The IP header is removed from each packet, revealing the original TCP Segments.</p>

      <div className="flex flex-col md:flex-row items-center justify-center w-full flex-wrap gap-2 md:gap-4">
        {l4Data.sample.segments.map((segment, index) => (
          <Packet ref={addToRefs} key={index} ipHeader={layerData.sample.ip} animateIn={false}>
            <Segment segment={segment} ports={l4Data.sample.ports} />
          </Packet>
        ))}
      </div>

      {showInfo && (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" exit="hidden" className="mt-4 md:mt-8 w-full max-w-2xl">
          <InfoBox title="De-encapsulation: Packet to Segment">
            <p className="text-sm md:text-base">The network layer on the receiving computer examines the IP header. It confirms the packet is for this device.</p>
            <p className="mt-2 text-sm md:text-base">The IP header has served its purpose and is now removed. The remaining data, which is a TCP Segment, is passed up to the next layer: the Transport Layer.</p>
          </InfoBox>
          <div className="mt-4 md:mt-8 text-center">
            <Button onClick={handleNext}>Next: Reassembly</Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RX_L3_Network;
