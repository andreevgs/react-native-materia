import { Platform, TextStyle } from "react-native";
import { MateriaTypography, TypographyScale, TypographyVariant } from "./types";

export const baseScale: TypographyScale = {
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
    fontWeight: "400",
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
    fontWeight: "400",
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
    fontWeight: "400",
  },
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
    fontWeight: "400",
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
    fontWeight: "400",
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
    fontWeight: "400",
  },
  titleLarge: {
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
    fontWeight: "400",
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontWeight: "500",
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontWeight: "500",
  },
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontWeight: "500",
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: "500",
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: "500",
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontWeight: "400",
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontWeight: "400",
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontWeight: "400",
  },
};

export const defaultFontFamily = Platform.select({
  ios: "System",
  android: "Roboto",
  default: "System",
});

export const defaultCommonStyles: TextStyle =
  Platform.OS === "android"
    ? { includeFontPadding: false, textAlignVertical: "center" }
    : {};

export const defaultMateriaTypography: MateriaTypography = (
  Object.keys(baseScale) as TypographyVariant[]
).reduce((acc, variant) => {
  acc[variant] = {
    ...baseScale[variant],
    ...defaultCommonStyles,
    fontFamily: defaultFontFamily,
  };
  return acc;
}, {} as MateriaTypography);
