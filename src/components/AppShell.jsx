import React from 'react';
import { useUIState } from '../lib/state.jsx';

const AppShell = ({ children }) => {
  const { currentStep, direction, setCurrentStep, setCurrentLayer, setDirection } = useUIState();

  const handleRestart = () => {
    setCurrentStep('IDLE');
    setCurrentLayer(null);
    setDirection('forward');
  };

  return (
    <div className="flex flex-col items-center justify-start p-2 md:p-4">
      <div className="absolute top-2 md:top-4 right-2 md:right-4 flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4">
        <span className="text-xs md:text-md text-gray-400 bg-gray-800 px-2 md:px-3 py-1 rounded">
          STEP: {currentStep} | DIR: {direction}
        </span>
        <button
          onClick={handleRestart}
          className="bg-red-600 hover:bg-red-700 text-white py-1.5 md:py-2 px-3 md:px-4 rounded transition-colors duration-300 text-sm md:text-base"
        >
          Restart
        </button>
      </div>
      <header className="w-full max-w-5xl py-2 mb-2 md:mb-4 border-b border-gray-700">
        <h1 className="text-xl md:text-2xl text-green-400">OSI Unpacked</h1>
      </header>
      <main className="w-full max-w-5xl">
        {children}
      </main>
      <footer className="w-full max-w-5xl py-2 mt-2 md:mt-4 text-center text-xs md:text-base text-gray-500 border-t border-gray-700">
        <p>Built with React, GSAP, and Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default AppShell;
