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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <span className="text-md text-gray-400 bg-gray-800 px-3 py-1 rounded">
          STEP: {currentStep} | DIR: {direction}
        </span>
        <button
          onClick={handleRestart}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors duration-300"
        >
          Restart
        </button>
      </div>
      <header className="w-full max-w-5xl py-2 mb-4 border-b border-gray-700">
        <h1 className="text-2xl text-green-400">OSI Story</h1>
      </header>
      <main className="w-full max-w-5xl flex-grow">
        <div className="w-full h-full transition-transform duration-300 ease-in-out scale-[0.90] lg-custom:scale-100">
          {children}
        </div>
      </main>
      <footer className="w-full max-w-5xl py-2 mt-4 text-center text-gray-500 border-t border-gray-700">
        <p>Built with React, GSAP, and Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default AppShell;
