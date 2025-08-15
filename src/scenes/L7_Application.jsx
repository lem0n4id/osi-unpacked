import React from 'react';
import { useUIState } from '../lib/state.jsx';
import { LAYERS } from '../data/layers.jsx';

const InfoBox = ({ layer }) => {
  if (!layer) return null;
  const { Icon, name, desc } = layer;
  return (
    <div className="p-4 pb-8 bg-[var(--term)] border-2 border-gray-700 rounded-lg flex items-center gap-4">
      <Icon className="text-3xl text-green-400" />
      <div>
        <h3 className="text-lg text-white">
          {name} (Layer {layer.id})
        </h3>
        <p className="text-gray-300">{desc}</p>
      </div>
    </div>
  );
};

const MessagingAppPanel = () => (
  <div className="flex-1 p-4 bg-[var(--term)] border-2 border-gray-700 rounded-lg">
    <div className="h-8 bg-gray-800 rounded-t-md flex items-center px-4">
      <span className="text-gray-400">💬 Messenger.exe</span>
    </div>
    <div className="p-4 flex justify-end">
      <div className="relative bg-blue-600 text-white p-3 rounded-lg max-w-xs after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-full after:w-0 after:h-0 after:border-[10px] after:border-solid after:border-transparent after:border-l-blue-600 after:border-r-0">
        <p>Hello World!</p>
      </div>
    </div>
  </div>
);

const ProtocolDataPanel = ({ layer }) => {
  if (!layer) return null;
  return (
    <div className="flex-1 p-4 bg-[var(--term)] border-2 border-gray-700 rounded-lg">
       <div className="h-8 bg-gray-800 rounded-t-md flex items-center px-4">
        <span className="text-gray-400">📦 Protocol Data</span>
      </div>
      <pre className="whitespace-pre-wrap text-sm text-green-400 p-4">{layer.sample}</pre>
    </div>
  );
};


export default function L7_Application() {
  const { setCurrentStep } = useUIState();
  const layerData = LAYERS.find(l => l.id === 7);

  return (
    <div className="w-full h-full flex flex-col p-8 relative">
      <div className="flex-grow flex gap-8">
        <MessagingAppPanel />
        <ProtocolDataPanel layer={layerData} />
      </div>
      <div className="mt-8">
        <InfoBox layer={layerData} />
      </div>
      <div className="absolute bottom-8 right-8">
        <button
          onClick={() => setCurrentStep('L6')}
          className="px-2 py-1 mb-2 mr-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors"
        >
          Next: Presentation Layer
        </button>
      </div>
    </div>
  );
}
