import React, { forwardRef } from 'react';

const ComputerSprite = forwardRef((props, ref) => {
  return (
    <div className="flex items-end space-x-1 md:space-x-2 z-10">
      {/* CRT Monitor */}
      <div ref={ref} className="w-16 h-14 md:w-24 md:h-20 bg-gray-800 border-2 border-gray-600 rounded-t-lg flex items-center justify-center">
        <div className="w-14 h-12 md:w-20 md:h-16 bg-black"></div>
      </div>
      {/* CPU Tower */}
      <div className="w-8 h-16 md:w-10 md:h-24 bg-gray-700 border-2 border-gray-600 rounded-md"></div>
    </div>
  );
});

ComputerSprite.displayName = 'ComputerSprite';

export default ComputerSprite;
