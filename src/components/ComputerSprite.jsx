import React, { forwardRef } from 'react';

const ComputerSprite = forwardRef((props, ref) => {
  return (
    <div className="flex items-end space-x-2 z-10">
      {/* CRT Monitor */}
      <div ref={ref} className="w-24 h-20 bg-gray-800 border-2 border-gray-600 rounded-t-lg flex items-center justify-center">
        <div className="w-20 h-16 bg-black"></div>
      </div>
      {/* CPU Tower */}
      <div className="w-10 h-24 bg-gray-700 border-2 border-gray-600 rounded-md"></div>
    </div>
  );
});

ComputerSprite.displayName = 'ComputerSprite';

export default ComputerSprite;
