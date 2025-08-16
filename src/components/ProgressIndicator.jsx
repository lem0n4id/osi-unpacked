import React from 'react';
import { useUIState } from '../lib/state';
import { STORY_SEQUENCE } from '../data/story';

const ProgressIndicator = () => {
  const { currentStep } = useUIState();

  const currentIndex = STORY_SEQUENCE.indexOf(currentStep);
  const totalSteps = STORY_SEQUENCE.length - 1;
  const percentage = totalSteps > 0 ? (currentIndex / totalSteps) * 100 : 0;

  return (
    <div className="w-full px-4">
      <div className="relative h-8 bg-gray-700 rounded-md overflow-hidden border-2 border-gray-500">
        <div
          className="absolute top-0 left-0 h-full bg-green-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="text-md text-white drop-shadow-md">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
