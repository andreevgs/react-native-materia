import {
  argbFromHex,
  hexFromArgb,
  Hct,
  MaterialDynamicColors,
  DynamicScheme,
  SchemeTonalSpot,
  TonalPalette,
  DynamicColor,
} from "@material/material-color-utilities";

import {
  MateriaTheme,
  MateriaSchemes,
  MateriaScheme,
  MateriaPalettes,
  MateriaTonalPalette,
} from "./types";

const mdc = new MaterialDynamicColors();

const mapPaletteToMateria = (palette: TonalPalette): MateriaTonalPalette => {
  const tones = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100,
  ];
  const output: any = {};
  tones.forEach((tone) => {
    output[tone.toString()] = hexFromArgb(palette.tone(tone));
  });
  return output as MateriaTonalPalette;
};

const generateSchemeFromDynamic = (scheme: DynamicScheme): MateriaScheme => {
  const getHex = (dynamicColor: DynamicColor) =>
    hexFromArgb(dynamicColor.getArgb(scheme));

  return {
    primary: getHex(mdc.primary()),
    onPrimary: getHex(mdc.onPrimary()),
    primaryContainer: getHex(mdc.primaryContainer()),
    onPrimaryContainer: getHex(mdc.onPrimaryContainer()),

    secondary: getHex(mdc.secondary()),
    onSecondary: getHex(mdc.onSecondary()),
    secondaryContainer: getHex(mdc.secondaryContainer()),
    onSecondaryContainer: getHex(mdc.onSecondaryContainer()),

    tertiary: getHex(mdc.tertiary()),
    onTertiary: getHex(mdc.onTertiary()),
    tertiaryContainer: getHex(mdc.tertiaryContainer()),
    onTertiaryContainer: getHex(mdc.onTertiaryContainer()),

    error: getHex(mdc.error()),
    onError: getHex(mdc.onError()),
    errorContainer: getHex(mdc.errorContainer()),
    onErrorContainer: getHex(mdc.onErrorContainer()),

    background: getHex(mdc.background()),
    onBackground: getHex(mdc.onBackground()),

    surface: getHex(mdc.surface()),
    onSurface: getHex(mdc.onSurface()),
    surfaceVariant: getHex(mdc.surfaceVariant()),
    onSurfaceVariant: getHex(mdc.onSurfaceVariant()),

    surfaceDim: getHex(mdc.surfaceDim()),
    surfaceBright: getHex(mdc.surfaceBright()),
    surfaceContainerLowest: getHex(mdc.surfaceContainerLowest()),
    surfaceContainerLow: getHex(mdc.surfaceContainerLow()),
    surfaceContainer: getHex(mdc.surfaceContainer()),
    surfaceContainerHigh: getHex(mdc.surfaceContainerHigh()),
    surfaceContainerHighest: getHex(mdc.surfaceContainerHighest()),

    surfaceTint: getHex(mdc.surfaceTint()),
    outline: getHex(mdc.outline()),
    outlineVariant: getHex(mdc.outlineVariant()),
    shadow: getHex(mdc.shadow()),
    scrim: getHex(mdc.scrim()),

    inverseSurface: getHex(mdc.inverseSurface()),
    inverseOnSurface: getHex(mdc.inverseOnSurface()),
    inversePrimary: getHex(mdc.inversePrimary()),

    primaryFixed: getHex(mdc.primaryFixed()),
    onPrimaryFixed: getHex(mdc.onPrimaryFixed()),
    primaryFixedDim: getHex(mdc.primaryFixedDim()),
    onPrimaryFixedVariant: getHex(mdc.onPrimaryFixedVariant()),

    secondaryFixed: getHex(mdc.secondaryFixed()),
    onSecondaryFixed: getHex(mdc.onSecondaryFixed()),
    secondaryFixedDim: getHex(mdc.secondaryFixedDim()),
    onSecondaryFixedVariant: getHex(mdc.onSecondaryFixedVariant()),

    tertiaryFixed: getHex(mdc.tertiaryFixed()),
    onTertiaryFixed: getHex(mdc.onTertiaryFixed()),
    tertiaryFixedDim: getHex(mdc.tertiaryFixedDim()),
    onTertiaryFixedVariant: getHex(mdc.onTertiaryFixedVariant()),
  };
};

export const generateMateriaTheme = (seedHex: string): MateriaTheme => {
  const sourceColorHct = Hct.fromInt(argbFromHex(seedHex));

  const lightScheme = new SchemeTonalSpot(sourceColorHct, false, 0.0);
  const darkScheme = new SchemeTonalSpot(sourceColorHct, true, 0.0);

  const lightMediumScheme = new SchemeTonalSpot(sourceColorHct, false, 0.5);
  const darkMediumScheme = new SchemeTonalSpot(sourceColorHct, true, 0.5);

  const lightHighScheme = new SchemeTonalSpot(sourceColorHct, false, 1.0);
  const darkHighScheme = new SchemeTonalSpot(sourceColorHct, true, 1.0);

  const schemes: MateriaSchemes = {
    light: generateSchemeFromDynamic(lightScheme),
    dark: generateSchemeFromDynamic(darkScheme),

    "light-medium-contrast": generateSchemeFromDynamic(lightMediumScheme),
    "light-high-contrast": generateSchemeFromDynamic(lightHighScheme),

    "dark-medium-contrast": generateSchemeFromDynamic(darkMediumScheme),
    "dark-high-contrast": generateSchemeFromDynamic(darkHighScheme),
  };

  // Palettes are the same in any scheme
  const palettes: MateriaPalettes = {
    primary: mapPaletteToMateria(lightScheme.primaryPalette),
    secondary: mapPaletteToMateria(lightScheme.secondaryPalette),
    tertiary: mapPaletteToMateria(lightScheme.tertiaryPalette),
    neutral: mapPaletteToMateria(lightScheme.neutralPalette),
    "neutral-variant": mapPaletteToMateria(lightScheme.neutralVariantPalette),
  };

  return {
    description: "Generated via @material/material-color-utilities package",
    seed: seedHex,
    coreColors: { primary: seedHex },
    extendedColors: [],
    schemes,
    palettes,
  };
};
