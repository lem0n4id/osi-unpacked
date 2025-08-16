import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { STORY_SEQUENCE } from '../data/story';

const UIStateContext = createContext();

export const UIStateProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState('IDLE');
  const [currentLayer, setCurrentLayer] = useState(null);
  const [direction, setDirection] = useState('forward');
  const [characterStates, setCharacterStates] = useState({
    left: 'idle',
    right: 'idle',
  });

  useEffect(() => {
    const match = currentStep.match(/^L(\d+)/);
    if (match && match[1]) {
      const layerId = parseInt(match[1], 10);
      setCurrentLayer(layerId);
      if (currentStep.includes('_RECV')) {
        setDirection('reverse');
      } else {
        setDirection('forward');
      }
    } else if (currentStep === 'IDLE') {
      setDirection('forward');
      setCurrentLayer(null);
    } else {
      setCurrentLayer(null);
    }
  }, [currentStep]);

  const setCharacterState = useCallback((side, state) => {
    setCharacterStates((prev) => ({ ...prev, [side]: state }));
  }, []);

  const handleNext = useCallback(() => {
    const currentIndex = STORY_SEQUENCE.indexOf(currentStep);
    if (currentIndex < STORY_SEQUENCE.length - 1) {
      const nextStep = STORY_SEQUENCE[currentIndex + 1];
      setCurrentStep(nextStep);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    const currentIndex = STORY_SEQUENCE.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStep = STORY_SEQUENCE[currentIndex - 1];
      setCurrentStep(prevStep);
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep('IDLE');
  }, []);

  const value = {
    currentStep,
    setCurrentStep,
    currentLayer,
    setCurrentLayer,
    direction,
    setDirection,
    characterStates,
    setCharacterState,
    handleNext,
    handleBack,
    handleReset,
  };

  return <UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>;
};

export const useUIState = () => {
  const context = useContext(UIStateContext);
  if (context === undefined) {
    throw new Error('useUIState must be used within a UIStateProvider');
  }
  return context;
};
