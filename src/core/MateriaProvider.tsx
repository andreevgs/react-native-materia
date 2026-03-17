import { createContext, useContext, useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CORE_ICON_PATHS } from "./icons";
import { MateriaScheme, MateriaTheme, Tokens } from "./theme/types";
import { useColorScheme } from "react-native";
import { MateriaTypography } from "./typography/types";
import * as materiaTokens from "./theme/tokens";
import { defaultMateriaTheme } from "./theme/const";
import { defaultMateriaTypography } from "./typography/const";

export type IconRegistry = Record<string, string>;
export type MateriaThemeMode = "system" | "light" | "dark";
export type MateriaContrastLevel = "standard" | "medium" | "high";

interface MateriaContextType {
  theme: MateriaTheme;
  tokens: Tokens;
  colors: MateriaScheme;
  icons: IconRegistry;
  mode: MateriaThemeMode;
  isDark: boolean;
  contrastLevel: MateriaContrastLevel;
  typography: MateriaTypography;
}

const MateriaContext = createContext<MateriaContextType | null>(null);

interface MateriaProviderProps {
  children: React.ReactNode;
  theme?: MateriaTheme;
  typography?: MateriaTypography;
  mode?: MateriaThemeMode;
  contrastLevel?: MateriaContrastLevel;
  icons?: IconRegistry;
}

export const MateriaProvider = ({
  children,
  theme = defaultMateriaTheme,
  typography = defaultMateriaTypography,
  mode = "system",
  contrastLevel = "standard",
  icons,
}: MateriaProviderProps) => {
  const systemScheme = useColorScheme();

  const isDark = useMemo(() => {
    if (mode === "system") {
      return systemScheme === "dark";
    }
    return mode === "dark";
  }, [mode, systemScheme]);

  const activeScheme: MateriaScheme = useMemo(() => {
    const base = isDark ? "dark" : "light";

    if (contrastLevel === "standard") {
      return theme.schemes[base];
    }

    const key =
      `${base}-${contrastLevel}-contrast` as keyof typeof theme.schemes;
    return theme.schemes[key] || theme.schemes[base];
  }, [theme, isDark, contrastLevel]);

  const mergedIcons: IconRegistry = useMemo(
    () => ({
      ...CORE_ICON_PATHS,
      ...icons,
    }),
    [icons],
  );

  const contextValue: MateriaContextType = useMemo(
    () => ({
      theme,
      tokens: materiaTokens,
      typography,
      colors: activeScheme,
      icons: mergedIcons,
      mode,
      isDark,
      contrastLevel,
    }),
    [theme, activeScheme, mergedIcons, mode, isDark, contrastLevel, typography],
  );

  return (
    <MateriaContext.Provider value={contextValue}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {children}
      </GestureHandlerRootView>
    </MateriaContext.Provider>
  );
};

export const useMateriaTheme = () => {
  const context = useContext(MateriaContext);
  if (!context)
    throw new Error("useMateriaTheme must be used within MateriaProvider");
  return context.theme;
};

export const useMateriaColors = () => {
  const context = useContext(MateriaContext);
  if (!context)
    throw new Error("useMateriaColors must be used within MateriaProvider");
  return context.colors;
};

export const useMateriaTokens = () => {
  const context = useContext(MateriaContext);
  if (!context)
    throw new Error("useMateriaTokens must be used within MateriaProvider");
  return context.tokens;
};

export const useMateriaTypography = () => {
  const context = useContext(MateriaContext);
  if (!context)
    throw new Error("useMateriaTypography must be used within MateriaProvider");
  return context.typography;
};

export const useMateriaMode = () => {
  const context = useContext(MateriaContext);
  if (!context)
    throw new Error("useMateriaMode must be used within MateriaProvider");
  return { isDark: context.isDark, mode: context.mode };
};

export const useIconRegistry = (): IconRegistry => {
  const context = useContext(MateriaContext);
  if (!context) {
    throw new Error("useIconRegistry must be used within a MateriaProvider");
  }
  return context.icons;
};
