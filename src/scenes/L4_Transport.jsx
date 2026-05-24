import React, { useEffect, useRef } from 'react';
import { useUIState } from '../lib/state.jsx';
import { LAYERS } from '../data/layers.jsx';
import { gsap } from 'gsap';
import { BsArrowDown } from 'react-icons/bs';
import InfoBox from '../components/transport/InfoBox.jsx';
import Segment from '../components/transport/Segment.jsx';

export default function L4_Transport() {
  const { setCurrentStep } = useUIState();
  const layerData = LAYERS.find(l => l.id === 4);
  const segmentRefs = useRef([]);
  const containerRef = useRef(null);
  const dataBlockRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    if (dataBlockRef.current && arrowRef.current && segmentRefs.current.length > 0) {
        // 1. Initial state: all animated elements are hidden except the segments
        gsap.set(dataBlockRef.current, { autoAlpha: 0 });
        gsap.set(arrowRef.current, { autoAlpha: 0, scale: 0.5 });
        gsap.set(segmentRefs.current, { autoAlpha: 0 });

        tl
          // 2. Fade in the main data block
          .to(dataBlockRef.current, { autoAlpha: 1, duration: 0.8, ease: 'power2.out' })
          // 3. "Draw" the arrow down
          .to(arrowRef.current, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, "-=0.2")
          // 4. Fade in the segments
          .fromTo(segmentRefs.current,
            { y: -20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, stagger: 0.2, duration: 0.5, ease: 'power2.out' },
            "+=0.5" // Start after a short delay from the previous animation
          );
    }
    return () => tl.kill();
  }, []);

  if (!layerData) return null;

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-8 relative">
      <div ref={containerRef} className="flex-grow flex flex-col justify-center items-center gap-2">
        <div ref={dataBlockRef} className="w-full max-w-md p-4 bg-gray-900 rounded-lg border-2 border-purple-500 opacity-0">
            <h3 className="text-center font-bold text-purple-400 text-sm md:text-base">Encrypted Data Stream</h3>
        </div>

        <div ref={arrowRef} className="my-2 opacity-0">
            <BsArrowDown className="text-2xl md:text-4xl text-green-400" />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start gap-2 md:gap-4 w-full overflow-x-auto">
            {layerData.sample.segments.map((seg, i) => (
                <Segment 
                    key={seg.seq} 
                    segment={seg} 
                    ports={layerData.sample.ports}
                    ref={el => segmentRefs.current[i] = el}
                />
            ))}
        </div>
      </div>
      
      <div className="mt-4 md:mt-8">
        <InfoBox layer={layerData} />
      </div>

      <div className="mt-4 md:absolute md:bottom-8 md:right-8 flex justify-end">
        <button
          onClick={() => setCurrentStep('L3')}
          className="px-2 py-1 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors text-sm md:text-base"
        >
          Next: Network Layer
        </button>
      </div>
    </div>
  );
}
