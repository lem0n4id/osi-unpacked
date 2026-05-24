import React, { useEffect, useRef } from 'react';
import { useUIState } from '../lib/state.jsx';
import { LAYERS } from '../data/layers.jsx';
import { gsap } from 'gsap';
import InfoBox from '../components/transport/InfoBox.jsx';
import Segment from '../components/transport/Segment.jsx';
import Packet from '../components/network/Packet.jsx';
import RouterIcon from '../components/network/RouterIcon.jsx';
import { FaComputer } from 'react-icons/fa6';

export default function L3_Network() {
  const { setCurrentStep } = useUIState();
  const layerData = LAYERS.find(l => l.id === 3);
  const l4Data = LAYERS.find(l => l.id === 4);

  const containerRef = useRef(null);
  const packetRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();
    if (packetRefs.current.length > 0) {
      tl.fromTo(packetRefs.current,
        { autoAlpha: 0, scale: 0.8 },
        { autoAlpha: 1, scale: 1, stagger: 0.3, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
    return () => tl.kill();
  }, []);

  if (!layerData || !l4Data) return null;

return (
    <div className="w-full h-full flex flex-col p-4 md:p-8 relative">
        <div ref={containerRef} className="flex-grow flex flex-col justify-center items-center gap-4 md:gap-8">
            {/* Packets */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 w-full overflow-x-auto">
                {l4Data.sample.segments.map((seg, i) => (
                    <Packet
                        key={seg.seq}
                        ipHeader={layerData.sample.ip}
                        ref={el => packetRefs.current[i] = el}
                        animateIn={true}
                    >
                        <Segment segment={seg} ports={l4Data.sample.ports} />
                    </Packet>
                ))}
            </div>

            {/* Routing Path */}
            <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center mt-4 md:mt-8 gap-2 md:gap-0">
                    <div className="flex flex-col items-center">
                        <FaComputer className="text-3xl md:text-5xl text-green-400" />
                        <span className="text-xs font-mono">{layerData.sample.ip.src}</span>
                    </div>
                    <div className="hidden md:block flex-grow h-1 bg-gray-700 mx-4"></div>
                        <RouterIcon label="R1" />
                    <div className="hidden md:block flex-grow h-1 bg-gray-700 mx-4"></div>
                        <RouterIcon label="R2" />
                    <div className="hidden md:block flex-grow h-1 bg-gray-700 mx-4"></div>
                    <div className="flex flex-col items-center">
                        <FaComputer className="text-3xl md:text-5xl text-yellow-400" />
                        <span className="text-xs font-mono">{layerData.sample.ip.dst}</span>
                    </div>
            </div>
        </div>
        
        <div className="mt-4 md:mt-8">
            <InfoBox layer={layerData} />
        </div>

        <div className="mt-4 md:absolute md:bottom-8 md:right-8 flex justify-end">
            <button
                onClick={() => setCurrentStep('L2')}
                className="px-2 py-1 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors text-sm md:text-base"
            >
                Next: Data Link Layer
            </button>
        </div>
    </div>
);
}
