import React, { useEffect, useRef } from 'react';
import { useUIState } from '../lib/state.jsx';
import { LAYERS } from '../data/layers.jsx';
import { makeTl } from '../lib/anim.js';
import { FaComputer } from "react-icons/fa6";

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
        <p className="text-gray-300 p-2">{desc}</p>
      </div>
    </div>
  );
};

const HandshakePacket = ({ from, to, name, Seq, Ack, className }) => (
    <div className={`bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg p-2 ${className}`}>
        <div className="text-center font-bold text-green-400 mb-1">{name}</div>
        <div className="text-xs font-mono">
            <p>From: {from}</p>
            <p>To: {to}</p>
            <p>Seq: {Seq}</p>
            <p>Ack: {Ack}</p>
        </div>
    </div>
);


export default function L5_Session() {
  const { setCurrentStep } = useUIState();
  const layerData = LAYERS.find(l => l.id === 5);

  const synRef = useRef(null);
  const synAckRef = useRef(null);
  const ackRef = useRef(null);

  useEffect(() => {
    const tl = makeTl();
    if (synRef.current && synAckRef.current && ackRef.current) {
        // Using fromTo for more reliable re-triggering on mount
        tl.fromTo(synRef.current, { autoAlpha: 0, x: -100 }, { autoAlpha: 1, x: 0 })
          .fromTo(synAckRef.current, { autoAlpha: 0, x: 100 }, { autoAlpha: 1, x: 0 })
          .fromTo(ackRef.current, { autoAlpha: 0, x: -100 }, { autoAlpha: 1, x: 0 });
    }
    return () => tl.kill();
  }, []);

  if (!layerData) return null;

  const { step1, step2, step3 } = layerData.sample;

  return (
    <div className="w-full h-full flex flex-col p-8 relative">
      <div className="flex-grow flex flex-col justify-center items-center gap-1 overflow-y-auto">
        <div className="flex justify-between w-full max-w-4xl flex-shrink-0">
            <div>
                <FaComputer className="text-6xl text-blue-400" />
                <p>Client</p>
            </div>
            <div>
                <FaComputer className="text-6xl text-purple-400" />
                <p>Server</p>
            </div>
        </div>

        <div className="w-full max-w-4xl z-10">
            <div ref={synRef} className="w-1/3">
                <HandshakePacket from="Client" to="Server" {...step1} />
            </div>
            <div ref={synAckRef} className="w-1/3 ml-auto">
                <HandshakePacket from="Server" to="Client" {...step2} />
            </div>
            <div ref={ackRef} className="w-1/3">
                <HandshakePacket from="Client" to="Server" {...step3} />
            </div>
        </div>
      </div>
      
      <div className="flex-shrink-0 mt-4">
        <InfoBox layer={layerData} />
      </div>

      <div className="absolute bottom-8 right-8">
        <button
          onClick={() => setCurrentStep('L4')}
          className="px-2 py-1 mb-2 mr-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors"
        >
          Next: Transport Layer
        </button>
      </div>
    </div>
  );
}
