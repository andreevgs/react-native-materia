import { Platform, TextStyle } from "react-native";
import { MateriaTypography, Typeface, TypographyVariant } from "./types";

export const baseScale: Record<TypographyVariant, TextStyle> = {
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

const defaultBrand: Typeface = Platform.select({
  ios: { fontFamily: "System", fontWeight: "400" },
  android: { fontFamily: "Roboto", fontWeight: "400" },
  default: { fontFamily: "System", fontWeight: "400" },
});

const defaultPlain: Typeface = Platform.select({
  ios: { fontFamily: "System", fontWeight: "400" },
  android: { fontFamily: "Roboto", fontWeight: "400" },
  default: { fontFamily: "System", fontWeight: "400" },
});

const defaultCommonStyles: TextStyle =
  Platform.OS === "android"
    ? { includeFontPadding: false, textAlignVertical: "center" }
    : {};

export const defaultMateriaTypography: MateriaTypography = (
  Object.keys(baseScale) as TypographyVariant[]
).reduce((acc, variant) => {
  const token = baseScale[variant];
  const isBrand =
    variant.startsWith("display") || variant.startsWith("headline");
  const activeTypeface = isBrand ? defaultBrand : defaultPlain;

  acc[variant] = {
    ...defaultCommonStyles,
    ...token,
    fontFamily: activeTypeface.fontFamily,
    fontWeight: activeTypeface.fontWeight ?? token.fontWeight,
  };

  return acc;
}, {} as MateriaTypography);
