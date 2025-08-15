import React from 'react';
import CharacterSprite from '../components/CharacterSprite';
import ComputerSprite from '../components/ComputerSprite';
import Cable from '../components/Cable';

const IdleScene = () => {
  return (
    <div className="relative w-full h-full flex justify-between items-end p-10">
      {/* Left side */}
      <div className="flex items-end space-x-4">
        <CharacterSprite state="idle" />
        <ComputerSprite />
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
