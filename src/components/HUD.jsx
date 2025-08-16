import React from 'react';
import { useUIState } from '../lib/state.jsx';
import ProgressIndicator from './ProgressIndicator.jsx';
import { LAYERS } from '../data/layers.jsx';

const HUD = () => {
  const { currentStep, currentLayer, handleBack, handleNext, handleReset } = useUIState();
  const isFirstStep = currentStep === 'IDLE';
  const isLastStep = currentStep === 'SUMMARY';

  const layerData = LAYERS.find(l => l.id === currentLayer);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl mx-auto z-50">
      <div className="bg-gray-800/80 backdrop-blur-sm text-white p-2 rounded-lg shadow-lg flex items-center justify-between gap-2">
        <button
          onClick={handleBack}
          disabled={isFirstStep}
          className={`py-2 px-4 rounded transition-colors duration-300 ${
            isFirstStep
              ? 'bg-gray-500 cursor-not-allowed text-gray-300'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Back
        </button>
        <button
          onClick={handleReset}
          disabled={isFirstStep}
          className={`py-2 px-4 rounded transition-colors duration-300 ${
            isFirstStep
              ? 'bg-gray-500 cursor-not-allowed text-gray-300'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Reset
        </button>
        <div className="flex-grow text-center flex flex-col items-center gap-1">
          {layerData && (
            <div className="text-md text-gray-300">
              {layerData.name} (Layer {layerData.id})
            </div>
          )}
          <ProgressIndicator />
        </div>
        <button
          onClick={handleNext}
          disabled={isLastStep}
          className={`py-2 px-4 rounded transition-colors duration-300 ${
            isLastStep
              ? 'bg-gray-500 cursor-not-allowed text-gray-300'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HUD;
