import React, { useEffect, useRef } from 'react';
import { useUIState } from '../lib/state';
import { LAYERS } from '../data/layers';
import InfoBox from '../components/transport/InfoBox';
import Packet from '../components/network/Packet';
import Segment from '../components/transport/Segment';
import Frame from '../components/datalink/Frame';
import NIC from '../components/datalink/NIC';
import { gsap } from 'gsap';

export default function RX_L2_DataLink() {
  const { setCurrentStep } = useUIState();
  const l2Data = LAYERS.find(l => l.id === 2);
  const l3Data = LAYERS.find(l => l.id === 3);
  const l4Data = LAYERS.find(l => l.id === 4);

  const frameRefs = useRef([]);
  const headerRefs = useRef([]);
  const headerInfoRefs = useRef([]);
  const nicRef = useRef(null);

  useEffect(() => {
    if (!l2Data || !l3Data || !l4Data) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Frames emerge from NIC
    tl.fromTo(frameRefs.current, 
    {
      x: '+=200',
      autoAlpha: 0,
    },
    {
      x: 0,
      autoAlpha: 1,
      stagger: 0.3,
      duration: 2,
      ease: 'power2.out'
    });

    // De-framing animation
    tl.to([headerRefs.current, headerInfoRefs.current], {
        autoAlpha: 0,
        y: '-=30',
        stagger: 0.3,
        duration: 1.5,
        ease: 'power2.in'
    }, "+=1.5");


    return () => tl.kill();
  }, []);

  if (!l2Data || !l3Data || !l4Data) return null;

  return (
    <div className="w-full h-full flex flex-col p-8 relative">
      <div className="flex-grow flex items-center justify-around gap-8">
        {/* Frames emerging from NIC */}
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-xl font-bold text-purple-300 mb-4">Frames Emerge from NIC</h2>
          <div className="flex gap-4">
            {l4Data.sample.segments.map((seg, i) => (
              <div key={seg.seq} ref={el => frameRefs.current[i] = el}>
                <Frame 
                  frameHeader={l2Data.sample.mac}
                  headerRef={el => headerRefs.current[i] = el}
                  headerInfoRef={el => headerInfoRefs.current[i] = el}
                >
                  <Packet ipHeader={l3Data.sample.ip}>
                    <Segment segment={seg} ports={l4Data.sample.ports} />
                  </Packet>
                </Frame>
              </div>
            ))}
          </div>
        </div>

        {/* NIC */}
        <div className="flex flex-col items-center">
            <NIC ref={nicRef} />
        </div>
      </div>

      <div className="mt-12">
        <InfoBox layer={l2Data} />
      </div>

      <div className="absolute bottom-8 right-8">
        <button
          onClick={() => setCurrentStep('L3_RECV')}
          className="px-2 py-1 mb-2 mr-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors"
        >
          Next: De-encapsulation
        </button>
      </div>
    </div>
  );
}
