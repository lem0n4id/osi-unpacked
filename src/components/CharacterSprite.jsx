import React from 'react';

const CharacterSprite = ({ state }) => {
  const baseStyle = "w-16 h-24 bg-gray-500 rounded-md";
  
  let stateStyle = '';
  switch (state) {
    case 'typing':
      stateStyle = 'animate-pulse';
      break;
    case 'smile':
      stateStyle = 'border-4 border-yellow-400';
      break;
    case 'idle':
    default:
      stateStyle = 'border-2 border-gray-400';
      break;
  }

return (
    <div className={`${baseStyle} ${stateStyle} flex items-center justify-center`}>
        
        <img src="/character.svg" alt="Character" className="w-full h-full" />
    </div>
);
};

export default CharacterSprite;
