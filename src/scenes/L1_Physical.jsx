import React, { useEffect, useRef } from 'react';
import { useUIState } from '../lib/state';
import { LAYERS } from '../data/layers';
import InfoBox from '../components/transport/InfoBox';
import CharacterSprite from '../components/CharacterSprite';
import ComputerSprite from '../components/ComputerSprite';
import Cable from '../components/Cable';
import SignalPulse from '../components/physical/SignalPulse';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export default function L1_Physical() {
  const { setCurrentStep, setDirection } = useUIState();
  const layerData = LAYERS.find(l => l.id === 1);
  
  const cablePathRef = useRef(null);
  const pulsesRef = useRef([]);

  useEffect(() => {
    if (!cablePathRef.current) return;

    const tl = gsap.timeline({ delay: 1, repeat: -1, repeatDelay: 1 });
    
    tl.to(pulsesRef.current, {
      duration: 4,
      ease: 'none',
      motionPath: {
        path: cablePathRef.current,
        align: cablePathRef.current,
        alignOrigin: [0.5, 0.5],
        start: 0,
        end: 1
      },
      stagger: 0.2,
      autoAlpha: 1,
    });

    return () => tl.kill();
  }, []);

  const handleSignalArrived = () => {
    setDirection('reverse');
    setCurrentStep('L1_RECV');
  };

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-8 relative">
      <div className="flex-grow flex flex-col md:flex-row justify-between items-end p-4 md:p-10 relative gap-4">
        {/* Left side */}
        <div className="flex items-end space-x-2 md:space-x-4">
          <CharacterSprite state="idle" />
          <ComputerSprite />
        </div>

        <div className="hidden md:block">
          <Cable ref={cablePathRef} />
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <SignalPulse key={i} ref={el => pulsesRef.current[i] = el} />
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-end space-x-2 md:space-x-4">
          <ComputerSprite />
          <CharacterSprite state="idle" />
        </div>
      </div>

      <div className="mt-4 md:mt-8">
        <InfoBox layer={layerData} />
      </div>

      <div className="mt-4 md:absolute md:bottom-8 md:right-8 flex justify-end">
        <button
          onClick={handleSignalArrived}
          className="px-2 py-1 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors text-sm md:text-base"
        >
          Signal Arrived: Begin Unpacking
        </button>
      </div>
    </div>
  );
}
