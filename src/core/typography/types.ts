import { TextStyle } from "react-native";

export type TypographyVariant =
  | "displayLarge"
  | "displayMedium"
  | "displaySmall"
  | "headlineLarge"
  | "headlineMedium"
  | "headlineSmall"
  | "titleLarge"
  | "titleMedium"
  | "titleSmall"
  | "labelLarge"
  | "labelMedium"
  | "labelSmall"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall";

export type TypographyScale = Record<
  TypographyVariant,
  Omit<TextStyle, "fontFamily">
>;
export type MateriaTypography = Record<TypographyVariant, TextStyle>;

export interface Typeface {
  fontFamily: string;
  fontWeight?: TextStyle["fontWeight"];
}

export interface TypographyConfig {
  brand: Typeface;
  plain: Typeface;
  fixVerticalRhythm: boolean;
}
