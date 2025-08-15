import React from 'react';

const ComputerSprite = () => {
  return (
    <div className="flex items-end space-x-2">
      {/* CRT Monitor */}
      <div className="w-24 h-20 bg-gray-800 border-2 border-gray-600 rounded-t-lg flex items-center justify-center">
        <div className="w-20 h-16 bg-black"></div>
      </div>
      {/* CPU Tower */}
      <div className="w-10 h-24 bg-gray-700 border-2 border-gray-600 rounded-md"></div>
    </div>
  );
};

export default ComputerSprite;
