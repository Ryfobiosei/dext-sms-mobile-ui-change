import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {View, useColorScheme, Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type {ThemeMode} from './colors';

const STORAGE_KEY = '@dext_theme_mode';

type ThemeContextType = {
  mode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({children}: {children: ReactNode}) {
  const systemColorScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(stored => {
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setModeState(stored);
        }
      })
      .finally(() => setLoaded(true));
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {
      // ignore storage errors
    });
  }, []);

  const resolvedTheme = useMemo<'light' | 'dark'>(() => {
    if (mode === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return mode;
  }, [mode, systemColorScheme]);

  const toggle = useCallback(() => {
    setMode(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setMode]);

  useEffect(() => {
    if (loaded && typeof Appearance.setColorScheme === 'function') {
      Appearance.setColorScheme(resolvedTheme);
    }
  }, [resolvedTheme, loaded]);

  const value = useMemo(
    () => ({
      mode,
      resolvedTheme,
      setMode,
      toggle,
    }),
    [mode, resolvedTheme, setMode, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>
      <View className={resolvedTheme === 'dark' ? 'dark flex-1' : 'flex-1'}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
