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
    <div className="fixed bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 w-[95vw] md:w-full md:max-w-xl z-50">
      <div className="bg-gray-800/80 backdrop-blur-sm text-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={handleBack}
            disabled={isFirstStep}
            className={`py-1.5 md:py-2 px-3 md:px-4 rounded transition-colors duration-300 text-sm md:text-base flex-1 md:flex-none ${
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
            className={`py-1.5 md:py-2 px-3 md:px-4 rounded transition-colors duration-300 text-sm md:text-base flex-1 md:flex-none ${
              isFirstStep
                ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            Reset
          </button>
        </div>
        <div className="flex-grow text-center flex flex-col items-center gap-1 w-full md:w-auto">
          {layerData && (
            <div className="text-sm md:text-md text-gray-300">
              {layerData.name} (Layer {layerData.id})
            </div>
          )}
          <ProgressIndicator />
        </div>
        <button
          onClick={handleNext}
          disabled={isLastStep}
          className={`py-1.5 md:py-2 px-3 md:px-4 rounded transition-colors duration-300 text-sm md:text-base w-full md:w-auto ${
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
