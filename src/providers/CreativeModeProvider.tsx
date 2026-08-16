'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface CreativeModeContextType {
  isCreativeMode: boolean;
  toggleCreativeMode: () => void;
  setCreativeMode: (value: boolean) => void;
}

const CreativeModeContext = createContext<CreativeModeContextType>({
  isCreativeMode: false,
  toggleCreativeMode: () => {},
  setCreativeMode: () => {},
});

export function CreativeModeProvider({ children }: { children: ReactNode }) {
  const [isCreativeMode, setIsCreativeMode] = useState(false);

  const toggleCreativeMode = useCallback(() => {
    setIsCreativeMode(prev => !prev);
  }, []);

  const setCreativeMode = useCallback((value: boolean) => {
    setIsCreativeMode(value);
  }, []);

  return (
    <CreativeModeContext.Provider value={{ isCreativeMode, toggleCreativeMode, setCreativeMode }}>
      {children}
    </CreativeModeContext.Provider>
  );
}

export const useCreativeMode = () => useContext(CreativeModeContext);
