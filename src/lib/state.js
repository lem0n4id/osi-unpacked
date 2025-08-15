import React, { createContext, useState, useContext } from 'react';

const UIStateContext = createContext();

export const UIStateProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState('IDLE');
  const [currentLayer, setCurrentLayer] = useState(null);
  const [direction, setDirection] = useState('forward');

  const value = {
    currentStep,
    setCurrentStep,
    currentLayer,
    setCurrentLayer,
    direction,
    setDirection,
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
