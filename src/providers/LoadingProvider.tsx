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
  setLoadingComplete: () => { },
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

    // Array of critical images to preload
    const criticalImages = [
      '/images/hero/K.Habikugasarma.jpeg',
      '/images/hero/Kelaniya.png',
      '/images/hero/Vavuniya_Tamil_Madhya_Maha_Vidyalayam.jpg',
      '/images/projects/Retro Snake gamer.png',
      '/images/projects/S&S console game.png',
      '/images/projects/Lankacourier management system.png',
    ];

    let currentStage = 0;

    // Simulate initial fast progress for UX
    const stageInterval = setInterval(() => {
      if (currentStage < LOADING_STAGES.length - 2) {
        currentStage++;
        setLoadingStage(LOADING_STAGES[currentStage]);
        setLoadingProgress(((currentStage + 1) / LOADING_STAGES.length) * 80); // Cap at 80% while loading images
      }
    }, 400);

    // Actual image preloading
    const preloadImages = () => {
      return Promise.all(
        criticalImages.map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve; // Resolve even on error to not block UI
          });
        })
      );
    };

    // Timeout fallback (max 3 seconds)
    const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3000));

    Promise.race([preloadImages(), timeoutPromise]).then(() => {
      clearInterval(stageInterval);
      setLoadingStage(LOADING_STAGES[LOADING_STAGES.length - 2]); // Rendering Experience
      setLoadingProgress(95);

      setTimeout(() => {
        setLoadingStage(LOADING_STAGES[LOADING_STAGES.length - 1]); // READY.
        setLoadingProgress(100);

        setTimeout(() => {
          setLoadingComplete();
        }, 500);
      }, 400);
    });

    return () => clearInterval(stageInterval);
  }, [isLoading, setLoadingComplete]);

  return (
    <LoadingContext.Provider value={{ isLoading, loadingProgress, loadingStage, setLoadingComplete }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
