'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  loadingProgress: number;
  loadingStage: string;
  setLoadingComplete: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  loadingProgress: 0,
  loadingStage: '',
  setLoadingComplete: () => {},
});

const LOADING_STAGES = [
  'INITIALIZING PROJECTS...',
  'LOADING EXPERIMENTS...',
  'CONNECTING ARCHIVE...',
  'RENDERING EXPERIENCE...',
  'READY.',
];

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState(LOADING_STAGES[0]);

  const setLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    let currentStage = 0;
    const stageInterval = setInterval(() => {
      currentStage++;
      if (currentStage < LOADING_STAGES.length) {
        setLoadingStage(LOADING_STAGES[currentStage]);
        setLoadingProgress(((currentStage + 1) / LOADING_STAGES.length) * 100);
      } else {
        clearInterval(stageInterval);
        // Allow a brief moment at READY. before completing
        setTimeout(() => {
          setLoadingComplete();
        }, 400);
      }
    }, 350);

    return () => clearInterval(stageInterval);
  }, [isLoading, setLoadingComplete]);

  return (
    <LoadingContext.Provider value={{ isLoading, loadingProgress, loadingStage, setLoadingComplete }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
