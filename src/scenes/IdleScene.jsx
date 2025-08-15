import React from 'react';
import CharacterSprite from '../components/CharacterSprite';
import ComputerSprite from '../components/ComputerSprite';
import Cable from '../components/Cable';
import { useUIState } from '../lib/state.jsx';

const IdleScene = () => {
  const { setCurrentStep, setCurrentLayer } = useUIState();

  const handleSend = () => {
    setCurrentStep('L7');
    setCurrentLayer(7);
  };

  return (
    <div className="relative w-full h-full flex justify-between items-end p-10">
      {/* Left side */}
      <div className="flex items-end space-x-4">
        <CharacterSprite state="idle" />
        <ComputerSprite />
        <button
          onClick={handleSend}
          className="self-center mt-20 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Send Message
        </button>
      </div>

      <Cable />

      {/* Right side */}
      <div className="flex items-end space-x-4">
        <ComputerSprite />
        <CharacterSprite state="idle" />
      </div>
    </div>
  );
};

export default IdleScene;
