'use client';

import { useTheme } from 'next-themes';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type ThemeName = 'light' | 'dark';

type ThemeWipeContextValue = {
  resolvedTheme: ThemeName;
  isTransitioning: boolean;
  toTheme: ThemeName | null;
  scrollY: number;
  toggleThemeWithWipe: (overrideTheme?: 'system') => void;
  completeWipe: () => void;
};

const ThemeWipeContext = createContext<ThemeWipeContextValue | null>(null);

export function useThemeWipe() {
  const ctx = useContext(ThemeWipeContext);
  if (!ctx)
    throw new Error('useThemeWipe must be used within ThemeWipeProvider');
  return ctx;
}

export function ThemeWipeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme, systemTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [toTheme, setToTheme] = useState<ThemeName | null>(null);
  const [scrollY, setScrollY] = useState(0);

  const toggleThemeWithWipe = useCallback(
    (overrideTheme?: 'system') => {
      if (isTransitioning) return;

      const next: ThemeName =
        overrideTheme === 'system'
          ? (systemTheme ?? 'dark')
          : resolvedTheme === 'dark'
            ? 'light'
            : 'dark';
      setToTheme(next);
      setScrollY(typeof window !== 'undefined' ? window.scrollY : 0);
      setIsTransitioning(true);
    },
    [isTransitioning, resolvedTheme, systemTheme],
  );

  const completeWipe = useCallback(() => {
    if (!toTheme) {
      setIsTransitioning(false);
      return;
    }

    setTheme(toTheme);
    requestAnimationFrame(() => {
      setIsTransitioning(false);
      setToTheme(null);
    });
  }, [setTheme, toTheme]);

  const value = useMemo<ThemeWipeContextValue>(
    () => ({
      resolvedTheme: toTheme ?? (resolvedTheme as ThemeName) ?? 'dark',
      toTheme,
      isTransitioning,
      scrollY,
      toggleThemeWithWipe,
      completeWipe,
    }),
    [toTheme, isTransitioning, scrollY, toggleThemeWithWipe, completeWipe],
  );

  return (
    <ThemeWipeContext.Provider value={value}>
      {children}
    </ThemeWipeContext.Provider>
  );
}
