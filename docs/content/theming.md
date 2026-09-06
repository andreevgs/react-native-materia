# Theming

React Native Materia features a dynamic, unopinionated theming engine built strictly on the Material Design 3 color system. It provides mathematically balanced color schemes, six contrast levels, complete compatibility with Google's Material Theme Builder, and seamless runtime theme switching.

## Overview

The theming system is designed to give developers total control over how themes are generated and applied. Rather than imposing opinionated state management, React Native Materia simply consumes a theme definition, visual mode, and contrast level through `MateriaProvider`.

Themes can be generated programmatically from a single seed color using the official `@material/material-color-utilities` algorithm, or imported directly from [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/) JSON exports.

Every theme encapsulates six complete color schemes spanning light and dark modes across standard, medium, and high contrast levels, alongside full tonal palettes ranging from tone `0` to `100` for primary, secondary, tertiary, and neutral colors.

## Generating Themes Programmatically

The easiest way to create a full Material Design 3 theme is with `generateMateriaTheme`. Pass any hex color as a seed color, and the utility will generate all light, dark, and contrast schemes along with five tonal palettes.

```tsx
import { generateMateriaTheme, MateriaProvider } from "react-native-materia";
import { MateriaTheme } from "react-native-materia/types";

const appTheme: MateriaTheme = generateMateriaTheme("#00668B");

export default function App() {
  return (
    <MateriaProvider theme={appTheme} mode="system">
      <MainApp />
    </MateriaProvider>
  );
}
```

The algorithm uses the HCT (Hue, Chroma, Tone) color space to ensure accessible contrast ratios between foreground and background elements regardless of the chosen seed color.

## Material Theme Builder Integration

React Native Materia themes match the exact schema output by [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/), available as a web app and Figma plugin.

While you can download a JSON file from Material Theme Builder, it is most convenient to save the exported object as a `theme.ts` or `theme.js` file typed with `MateriaTheme`. This gives you immediate compile-time type validation, avoids requiring `resolveJsonModule` in `tsconfig.json`, and allows clean static module imports.

```tsx
import { MateriaProvider } from "react-native-materia";
import { theme } from "./theme";

export default function App() {
  return (
    <MateriaProvider theme={theme}>
      <MainApp />
    </MateriaProvider>
  );
}
```

Because the object structure is identical between Material Theme Builder and React Native Materia, all custom schemes, contrast variations, and tonal palettes work out of the box without any manual transformation.

## Theme Modes and System Switching

The `mode` prop on `MateriaProvider` controls the active visual mode and accepts `"system"`, `"light"`, or `"dark"`.

When set to `"system"`, the provider monitors React Native's `useColorScheme` hook and automatically updates the active theme whenever the user toggles dark mode in their device settings.

To implement an in-app theme toggle, store the preference in your own application state and pass the active mode into `MateriaProvider`:

```tsx
import React, { useState } from "react";
import { MateriaProvider, Button, MateriaText } from "react-native-materia";
import { MateriaThemeMode } from "react-native-materia/types";
import { View, StyleSheet } from "react-native";

export default function App() {
  const [themeMode, setThemeMode] = useState<MateriaThemeMode>("system");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <MateriaProvider mode={themeMode}>
      <View style={styles.container}>
        <MateriaText variant="titleMedium">Current mode: {themeMode}</MateriaText>
        <Button mode="filled" onPress={toggleTheme}>Toggle Theme</Button>
      </View>
    </MateriaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
```

## Contrast Levels

Material Design 3 specifies three contrast levels: standard, medium, and high. You can select the active contrast by setting the `contrastLevel` prop on `MateriaProvider`.

Supported contrast levels are `"standard"`, `"medium"`, and `"high"`.

Under the hood, `MateriaProvider` resolves the color scheme by combining `mode` and `contrastLevel`. Standard contrast resolves to `light` or `dark`, while medium contrast resolves to `light-medium-contrast` or `dark-medium-contrast`, and high contrast selects `light-high-contrast` or `dark-high-contrast`. This allows your application to satisfy accessibility requirements and honor system-level high-contrast settings seamlessly.

## Color Roles in Material Design 3

Every color scheme in `MateriaScheme` contains semantic color tokens that adapt to light, dark, and contrast variations.

### Primary, Secondary, and Tertiary

`primary` is the main brand accent, applied to key actions like filled buttons and active states. Components placed on primary backgrounds use `onPrimary`. Tonal containers use `primaryContainer` and `onPrimaryContainer`.

`secondary` provides a secondary accent for less prominent components like chips, filter toggles, and floating action buttons.

`tertiary` introduces balancing accents for contrasting elements, input highlights, or creative accents.

### Surface and Containers

Material Design 3 replaces elevation drop shadows on surfaces with distinct surface container roles.

The base `surface` color is used for flat views. The `surfaceDim` and `surfaceBright` tokens provide subdued and illuminated base backgrounds.

Five container levels offer progressive elevation and visual separation: `surfaceContainerLowest`, `surfaceContainerLow`, `surfaceContainer`, `surfaceContainerHigh`, and `surfaceContainerHighest`.

### Outlines and Utility

`outline` provides high-contrast borders for inputs and outlined buttons. `outlineVariant` provides softer dividers and subtle container borders.

`error`, `onError`, `errorContainer`, and `onErrorContainer` represent destructive actions and validation alerts.

`scrim` and `shadow` provide backdrop dimming and elevation shadow colors.

## Consuming Colors in Components

The recommended way to access active colors in your components is with the `useMateriaColors` hook.

```tsx
import { useMateriaColors, useMateriaMode } from "react-native-materia";
import { View, Text, StyleSheet } from "react-native";

export const CustomCard = () => {
  const colors = useMateriaColors();
  const { isDark } = useMateriaMode();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surfaceContainer,
          borderColor: colors.outlineVariant,
        },
      ]}
    >
      <Text style={{ color: colors.onSurface }}>
        Active theme: {isDark ? "Dark" : "Light"}
      </Text>
      <Text style={{ color: colors.onSurfaceVariant }}>
        Card description rendered with semantic theme colors.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
});
```

All pre-built library components like `Button`, `Chip`, `TextField`, and `ListItem` consume these same color roles, ensuring complete visual harmony across custom and standard views.

## Related Links

Explore more in the [Provider Guide](/about/provider), [Design Tokens](/about/tokens), [Typography](/about/typography), and [Iconography](/about/iconography) sections.
