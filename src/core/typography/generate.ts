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
    const targetWeight = activeTypeface.fontWeight ?? token.fontWeight;

    let resolvedFontFamily: string;
    let resolvedFontWeight = targetWeight;

    if (
      activeTypeface.fontFamily &&
      typeof activeTypeface.fontFamily === "object"
    ) {
      resolvedFontFamily =
        targetWeight === "500"
          ? activeTypeface.fontFamily.fontFamilyMedium
          : activeTypeface.fontFamily.fontFamilyRegular;
    } else {
      resolvedFontFamily = activeTypeface.fontFamily;
    }

    typography[variant] = {
      ...(fixVerticalRhythm ? defaultCommonStyles : {}),
      ...token,
      fontFamily: resolvedFontFamily,
      fontWeight: resolvedFontWeight,
    };
  });

  return typography;
};
