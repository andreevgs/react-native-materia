import React, { createContext, useContext, useEffect, useState } from "react";
import { MateriaThemeMode } from "react-native-materia/types";

interface CurrentThemeContextType {
  currentTheme: MateriaThemeMode;
  setCurrentTheme: (mode: MateriaThemeMode) => void;
}

export const CurrentThemeContext =
  createContext<CurrentThemeContextType | null>(null);

const getSavedCurrentTheme = (): MateriaThemeMode => {
  if (typeof window === "undefined") {
    return "system";
  }
  try {
    const savedTheme = localStorage.getItem("currentTheme");
    return (savedTheme || "system") as MateriaThemeMode;
  } catch {
    return "system";
  }
};

const setSavedCurrentTheme = (currentTheme: MateriaThemeMode) => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem("currentTheme", currentTheme);
  } catch {
    //
  }
};

export const CurrentThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentTheme, setCurrentTheme] =
    useState<MateriaThemeMode>(getSavedCurrentTheme);

  useEffect(() => {
    setSavedCurrentTheme(currentTheme);
  }, [currentTheme]);

  return (
    <CurrentThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </CurrentThemeContext.Provider>
  );
};

export const useCurrentTheme = () => {
  const context = useContext(CurrentThemeContext);
  if (!context)
    throw new Error("useCurrentTheme must be used within CurrentThemeProvider");
  return context;
};
