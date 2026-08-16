'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type CursorVariant = 'default' | 'view' | 'read' | 'open' | 'explore' | 'external';

interface CursorContextType {
  variant: CursorVariant;
  isVisible: boolean;
  setCursor: (variant: CursorVariant) => void;
  resetCursor: () => void;
  hideCursor: () => void;
  showCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  variant: 'default',
  isVisible: true,
  setCursor: () => {},
  resetCursor: () => {},
  hideCursor: () => {},
  showCursor: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isVisible, setIsVisible] = useState(true);

  const setCursor = useCallback((v: CursorVariant) => setVariant(v), []);
  const resetCursor = useCallback(() => setVariant('default'), []);
  const hideCursor = useCallback(() => setIsVisible(false), []);
  const showCursor = useCallback(() => setIsVisible(true), []);

  return (
    <CursorContext.Provider value={{ variant, isVisible, setCursor, resetCursor, hideCursor, showCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursorState = () => useContext(CursorContext);

/** Cursor label text for each variant */
export const cursorLabels: Record<CursorVariant, string> = {
  default: '',
  view: 'VIEW',
  read: 'READ',
  open: 'OPEN',
  explore: 'EXPLORE',
  external: 'OPEN ↗',
};
