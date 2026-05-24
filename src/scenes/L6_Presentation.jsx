import React, { useEffect, useRef } from 'react';
import { useUIState } from '../lib/state.jsx';
import { LAYERS } from '../data/layers.jsx';
import { makeTl } from '../lib/anim.js';
import { VscLock } from 'react-icons/vsc';

const InfoBox = ({ layer }) => {
  if (!layer) return null;
  const { Icon, name, desc } = layer;
  return (
    <div className="p-4 bg-[var(--term)] border-2 border-gray-700 rounded-lg flex items-center gap-4">
      <Icon className="text-3xl text-green-400" />
      <div>
        <h3 className="font-bold text-lg text-white">
          {name} (Layer {layer.id})
        </h3>
        <p className="text-gray-300">{desc}</p>
      </div>
    </div>
  );
};

const DataPanel = ({ title, children, className }) => (
  <div className={`flex-1 p-4 bg-[var(--term)] border-2 border-gray-700 rounded-lg ${className}`}>
    <div className="h-8 bg-gray-800 rounded-t-md flex items-center px-4">
      <span className="text-gray-400">{title}</span>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
);

export default function L6_Presentation() {
  const { setCurrentStep } = useUIState();
  const layerData = LAYERS.find(l => l.id === 6);
  const encodedTextRef = useRef(null);
  const lockRef = useRef(null);

  useEffect(() => {
    const tl = makeTl();
    if (encodedTextRef.current && lockRef.current) {
      tl.from(encodedTextRef.current, {
        duration: 2.5,
        scrambleText: {
          text: '█'.repeat(layerData.sample.encoded.length),
          chars: '01',
          revealDelay: 0.5,
          speed: 0.3,
        },
      }).from(lockRef.current, {
        scale: 0,
        opacity: 0,
        ease: 'bounce.out',
      }, "-=1");
    }
    return () => tl.kill();
  }, [layerData]);


  if (!layerData) return null;

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-8 relative">
      <div className="flex-grow flex flex-col md:flex-row gap-4 md:gap-8 items-center">
        <DataPanel title="Plain Data">
          <p className="text-lg md:text-2xl text-white break-words">{layerData.sample.plain}</p>
        </DataPanel>
        
        <div className="text-3xl md:text-5xl text-green-500 rotate-90 md:rotate-0">→</div>

        <DataPanel title="Encoded & Encrypted Data" className="relative">
          <div ref={lockRef} className="absolute top-6 right-6 text-2xl md:text-3xl text-green-400">
            <VscLock />
          </div>
          <pre ref={encodedTextRef} className="whitespace-pre-wrap text-sm md:text-2xl text-yellow-400 break-all">
            {layerData.sample.encoded}
          </pre>
          
        </DataPanel>
      </div>
      
      <div className="mt-4 md:mt-8">
        <InfoBox layer={layerData} />
      </div>

      <div className="mt-4 md:absolute md:bottom-8 md:right-8 flex justify-end">
        <button
          onClick={() => setCurrentStep('L5')}
          className="px-2 py-1 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors text-sm md:text-base"
        >
          Next: Session Layer
        </button>
      </div>
    </div>
  );
}
