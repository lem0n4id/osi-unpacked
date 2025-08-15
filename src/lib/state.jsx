import React, { createContext, useState, useContext, useCallback } from 'react';

const UIStateContext = createContext();

export const UIStateProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState('IDLE');
  const [currentLayer, setCurrentLayer] = useState(null);
  const [direction, setDirection] = useState('forward');
  const [characterStates, setCharacterStates] = useState({
    left: 'idle',
    right: 'idle',
  });

  const setCharacterState = useCallback((side, state) => {
    setCharacterStates((prev) => ({ ...prev, [side]: state }));
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
