# Typography

The typography system in React Native Materia implements the Material Design 3 type scale. It establishes visual hierarchy across your application with fifteen distinct typographic variants, automatic cross-platform vertical rhythm correction, and flexible typeface configuration for brand and plain fonts.

## Overview

Material Design 3 organizes typography into five functional roles: display, headline, title, body, and label. Each role is divided into three size variants: large, medium, and small, resulting in fifteen standard type styles.

The system distinguishes between brand typefaces, applied to large expressive headers such as display and headline styles, and plain typefaces, optimized for readability in body copy, titles, and utilitarian labels.

By default, React Native Materia uses platform-native system fonts (`Roboto` on Android, `San Francisco` on iOS, and system fonts on Web). You can customize fonts globally using the `generateMateriaTypography` utility.

## Configuring Custom Typography

React Native Materia provides the `generateMateriaTypography` helper function to create a complete type scale from custom font definitions.

The generator accepts a `TypographyConfig` configuration object:

```tsx
import { generateMateriaTypography } from "react-native-materia";
import {
  TypefaceStaticFonts,
  Typeface,
  TypographyConfig,
  MateriaTypography,
} from "react-native-materia/types";

const brandStaticFonts: TypefaceStaticFonts = {
  fontFamilyRegular: "Poppins_400Regular",
  fontFamilyMedium: "Poppins_500Medium",
};

const plainStaticFonts: TypefaceStaticFonts = {
  fontFamilyRegular: "Roboto_400Regular",
  fontFamilyMedium: "Roboto_500Medium",
};

const brandTypeface: Typeface = {
  fontFamily: brandStaticFonts,
  fontWeight: "normal",
};

const plainTypeface: Typeface = {
  fontFamily: plainStaticFonts,
  fontWeight: "normal",
};

const typographyConfig: TypographyConfig = {
  brand: brandTypeface,
  plain: plainTypeface,
  fixVerticalRhythm: true,
};

export const customTypography: MateriaTypography =
  generateMateriaTypography(typographyConfig);
```

### Static Fonts with Expo

The example above demonstrates integrating custom fonts loaded with `expo-font` or packages from `@expo-google-fonts`, configuring `"Poppins"` for expressive brand headers and `"Roboto"` for plain body copy.

When using static font files, each weight is bundled as an individual font family asset. You pass these via `TypefaceStaticFonts` through `fontFamilyRegular` and `fontFamilyMedium`. The generator automatically maps variants with weight 500 to the medium font asset, and variants with weight 400 to the regular font asset.

### Preventing Faux Bolding with Font Weight Reset

When static font assets are used, the font weight is already physically baked into the font glyphs themselves.

On certain Android devices and iOS versions, if React Native also specifies an explicit `fontWeight` such as `"500"` on top of a font asset that is already medium, the underlying operating system text renderer may apply synthetic faux-bolding. This causes the text to look unnaturally thick and distorted.

To prevent this automatic double-bolding, `Typeface` provides the `fontWeight` property. Setting `fontWeight: "normal"` or `"400"` explicitly overrides the default token weight applied to the generated styles. This instructs the platform to render the loaded font file as-is, preserving crisp and clean letterforms.

### Brand and Plain Typefaces

The `brand` typeface configures display and headline variants. The `plain` typeface configures title, body, and label variants. You can specify a single font family string, or pass a static fonts object.

### Vertical Rhythm Correction

Setting `fixVerticalRhythm: true` applies `includeFontPadding: false` on Android devices. This eliminates extraneous vertical font metrics added by Android native text rendering, aligning text vertically across iOS, Android, and Web platforms.

## Applying Typography to MateriaProvider

Pass your generated typography scale to the `typography` prop of `MateriaProvider`:

```tsx
import { MateriaProvider } from "react-native-materia";
import { customTypography } from "./typography";

export default function App() {
  return (
    <MateriaProvider typography={customTypography}>
      <MainApp />
    </MateriaProvider>
  );
}
```

Once passed, all pre-built library components such as `Button`, `Chip`, `ListItem`, `AppBar`, and `TextField` will automatically use your custom font families and metric adjustments.

## Using Typography in Components

You can consume your typography configuration in two primary ways:

### MateriaText Component

The simplest and recommended way to render styled text is through the `MateriaText` component. It accepts a `variant` prop matching any of the fifteen type scale names and automatically tints text with `colors.onSurface`.

```tsx
import { MateriaText } from "react-native-materia";
import { View } from "react-native";

export const TypographyDemo = () => {
  return (
    <View>
      <MateriaText variant="headlineMedium">Section Header</MateriaText>
      <MateriaText variant="bodyMedium">
        This paragraph automatically adapts to the configured typography scale and theme colors.
      </MateriaText>
    </View>
  );
};
```

Detailed props and component behavior are covered in the [MateriaText Component Documentation](/components/text).

### useMateriaTypography Hook

When building custom styled components, you can retrieve the active typography style map using `useMateriaTypography`.

```tsx
import { useMateriaTypography } from "react-native-materia";
import { Text } from "react-native";

export const CustomLabel = () => {
  const typography = useMateriaTypography();

  return <Text style={typography.labelLarge}>Custom Action</Text>;
};
```

## Type Scale Variants

Every typographic variant specifies font size, line height, letter spacing, and font weight according to Material Design 3 specifications.

### Display

Display styles are the largest typography elements on the screen. They are reserved for short, high-impact titles, hero headers, or landing banners.

`displayLarge`: font size `57`, line height `64`, letter spacing `-0.25`, weight `400`.

`displayMedium`: font size `45`, line height `52`, letter spacing `0`, weight `400`.

`displaySmall`: font size `36`, line height `44`, letter spacing `0`, weight `400`.

### Headline

Headline styles mark primary content divisions or page headers. They draw immediate attention without dominating the layout like display styles.

`headlineLarge`: font size `32`, line height `40`, letter spacing `0`, weight `400`.

`headlineMedium`: font size `28`, line height `36`, letter spacing `0`, weight `400`.

`headlineSmall`: font size `24`, line height `32`, letter spacing `0`, weight `400`.

### Title

Title styles introduce medium-emphasis sections, card headers, and list categories. They are smaller than headlines and maintain balance in dense user interfaces.

`titleLarge`: font size `22`, line height `28`, letter spacing `0`, weight `400`.

`titleMedium`: font size `16`, line height `24`, letter spacing `0.15`, weight `500`.

`titleSmall`: font size `14`, line height `20`, letter spacing `0.1`, weight `500`.

### Body

Body styles are designed for long-form reading, descriptions, and paragraphs. They prioritize legibility and comfortable line heights.

`bodyLarge`: font size `16`, line height `24`, letter spacing `0.5`, weight `400`.

`bodyMedium`: font size `14`, line height `20`, letter spacing `0.25`, weight `400`.

`bodySmall`: font size `12`, line height `16`, letter spacing `0.4`, weight `400`.

### Label

Label styles provide utilitarian text styling for interactive components such as button text, chip captions, tabs, and input labels.

`labelLarge`: font size `14`, line height `20`, letter spacing `0.1`, weight `500`.

`labelMedium`: font size `12`, line height `16`, letter spacing `0.5`, weight `500`.

`labelSmall`: font size `11`, line height `16`, letter spacing `0.5`, weight `500`.

## Related Links

Explore more in the [Provider Guide](/about/provider), [Theming Guide](/about/theming), [Design Tokens](/about/tokens), and [Iconography](/about/iconography) sections.
