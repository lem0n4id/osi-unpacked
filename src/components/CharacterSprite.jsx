import React from 'react';
import { useUIState } from '../lib/state';

const CharacterSprite = ({ side }) => {
  const { characterStates } = useUIState();
  const state = characterStates[side] || 'idle';

  // Base styles for the sprite container
  const baseStyle = "w-16 h-24 md:w-24 md:h-32 bg-gray-500 rounded-md flex items-center justify-center";

  // Determine state-specific styles
  let stateStyle = '';
  switch (state) {
    case 'typing':
      stateStyle = 'animate-pulse';
      break;
    case 'smile':
      stateStyle = 'shadow-xl shadow-yellow-400/50 border-2 border-yellow-500';
      break;
    case 'idle':
    default:
      stateStyle = 'border-2 border-gray-400';
      break;
  }

  const getSprite = () => {
    switch (state) {
      case 'smile':
        return '/character_smiling.svg';
      case 'typing':
      case 'idle':
      default:
        return '/character_idle.svg';
    }
  };

  return (
    <div className={`${baseStyle} ${stateStyle} flex items-center justify-center`}>
      <img
        src={getSprite()}
        alt={`Character (${state})`}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default CharacterSprite;
