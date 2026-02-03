import React from 'react';

const SceneCanvas = ({ children }) => {
  return (
    <div className="relative w-full min-h-[400px] md:aspect-video bg-black/50 border border-gray-700 rounded-lg overflow-hidden flex items-center">
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default SceneCanvas;
