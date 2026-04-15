import { Platform, TextStyle } from "react-native";
import {
  MateriaTypography,
  TypographyConfig,
  TypographyVariant,
} from "./types";
import { baseScale, defaultCommonStyles } from "./const";

export const generateMateriaTypography = (
  config: TypographyConfig,
): MateriaTypography => {
  const { brand, plain, fixVerticalRhythm } = config;

  const typography = {} as MateriaTypography;

  (Object.keys(baseScale) as TypographyVariant[]).forEach((variant) => {
    const token = baseScale[variant];
    const isBrand =
      variant.startsWith("display") || variant.startsWith("headline");

    const activeTypeface = isBrand ? brand : plain;

    typography[variant] = {
      ...(fixVerticalRhythm ? defaultCommonStyles : {}),
      ...token,
      fontFamily: activeTypeface.fontFamily,
      fontWeight: activeTypeface.fontWeight ?? token.fontWeight,
    };
  });

  return typography;
};
