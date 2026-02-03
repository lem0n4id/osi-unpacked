import React from 'react';

const SceneCanvas = ({ children }) => {
  return (
    <div className="relative w-full min-h-[500px] md:min-h-0 md:aspect-video bg-black/50 border border-gray-700 rounded-lg overflow-auto pb-24 md:pb-0">
      {children}
    </div>
  );
};

export default SceneCanvas;
