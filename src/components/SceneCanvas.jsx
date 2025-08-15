import React from 'react';

const SceneCanvas = ({ children }) => {
  return (
    <div className="relative w-full aspect-video bg-black/50 border border-gray-700 rounded-lg overflow-hidden">
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
};

export default SceneCanvas;
