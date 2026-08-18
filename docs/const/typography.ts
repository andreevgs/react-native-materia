import { generateMateriaTypography } from "react-native-materia";

const FONT_FAMILY_REGULAR = "Roboto_400Regular";
const FONT_FAMILY_MEDIUM = "Roboto_500Medium";

const typefaceStaticFonts = {
  fontFamilyRegular: FONT_FAMILY_REGULAR,
  fontFamilyMedium: FONT_FAMILY_MEDIUM,
};

export const typography = generateMateriaTypography({
  brand: { fontFamily: typefaceStaticFonts },
  plain: { fontFamily: typefaceStaticFonts },
  fixVerticalRhythm: true,
});
