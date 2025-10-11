import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo
} from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setLightMode: () => void;
  setDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // default to dark

  const updateTheme = useCallback((dark: boolean) => {
    setIsDarkMode(dark);
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    updateTheme(!isDarkMode);
  }, [isDarkMode, updateTheme]);

  const setLightMode = useCallback(() => {
    updateTheme(false);
  }, [updateTheme]);

  const setDarkMode = useCallback(() => {
    updateTheme(true);
  }, [updateTheme]);

  useEffect(() => {
    if (globalThis.window !== undefined) {
      const savedTheme = localStorage.getItem('theme');
      const initialTheme = savedTheme !== 'light'; // default to dark if not explicitly light
      updateTheme(initialTheme);
    }
  }, [updateTheme]);

  const contextValue = useMemo(() => ({
    isDarkMode,
    toggleTheme,
    setLightMode,
    setDarkMode
  }), [isDarkMode, toggleTheme, setLightMode, setDarkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
