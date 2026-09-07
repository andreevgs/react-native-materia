# Provider

`MateriaProvider` is the central context provider for all React Native Materia components. It establishes the design system environment by managing themes, color schemes, typography, iconography, design tokens, and gesture handling across your application.

## Overview

Wrapping your application in `MateriaProvider` enables dynamic theme switching between light, dark, and system color schemes, as well as multiple contrast levels including standard, medium, and high.

It distributes design tokens across your component tree for consistent spacing, shape radii, state opacities, and animation durations according to Material Design 3 specifications.

The provider also initializes typography scales, manages a global iconography registry for overriding default icons, and wraps the application in `GestureHandlerRootView` to ensure swipe gestures and bottom sheet interactions work out of the box.

## Usage

Place `MateriaProvider` at the very root of your component tree, typically in `App.tsx` or your root layout:

```tsx
import { MateriaProvider, Button, MateriaText } from "react-native-materia";
import { View, StyleSheet } from "react-native";

export default function App() {
  return (
    <MateriaProvider mode="system" contrastLevel="standard">
      <View style={styles.container}>
        <MateriaText variant="headlineMedium">Hello Materia</MateriaText>
        <Button mode="filled">Get Started</Button>
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

## Gesture Handling

`MateriaProvider` automatically wraps its children with `GestureHandlerRootView` from `react-native-gesture-handler` with style `flex: 1`. This ensures touch events, pan gestures, and sheet dismissal interactions operate seamlessly without requiring manual gesture root setup in your application.

## Props

The following props can be passed to configure `MateriaProvider`:

### theme

`MateriaTheme`

Custom theme definition object adhering to the `MateriaTheme` interface. Compatible with JSON outputs from [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/).

Default value: `defaultMateriaTheme`

### mode

`"light" | "dark" | "system"`

Sets the visual color mode of the application. When set to system, the theme dynamically follows the host operating system appearance.

Default value: `"system"`

### contrastLevel

`"standard" | "medium" | "high"`

Sets the color contrast variant of the active scheme. Supports accessibility requirements and user preference options.

Default value: `"standard"`

### typography

`MateriaTypography`

Custom typography configuration defining type scales across display, headline, title, body, and label variants.

Default value: `defaultMateriaTypography`

### icons

`Partial<MateriaIconography>`

Partial mapping of icon names to custom icon components or SVG definitions. Merged with `defaultMateriaIconography` to override or extend standard icons.

Default value: `undefined`

### children

`React.ReactNode`

The React node hierarchy that will have access to the Materia design system contexts.

## Context Hooks

`MateriaProvider` exposes several React hooks to consume theme data directly in your custom components:

### useMateriaColors

Returns the active color scheme palette for the current mode and contrast level.

```tsx
import { useMateriaColors } from "react-native-materia";
import { View, Text } from "react-native";

export const CustomCard = () => {
  const colors = useMateriaColors();

  return (
    <View
      style={{
        backgroundColor: colors.surfaceContainer,
        borderColor: colors.outline,
      }}
    >
      <Text style={{ color: colors.onSurface }}>Card Content</Text>
    </View>
  );
};
```

### useMateriaTokens

Provides access to design metrics including spacing, corner radii, elevation shadows, state layer opacities, and transition durations.

```tsx
import { useMateriaTokens } from "react-native-materia";
import { View } from "react-native";

export const SpacedBox = () => {
  const tokens = useMateriaTokens();

  return (
    <View
      style={{
        padding: tokens.spacing.l,
        borderRadius: tokens.shape.medium,
      }}
    />
  );
};
```

### useMateriaMode

Provides current color mode information and a boolean flag indicating whether dark mode is currently active.

```tsx
import { useMateriaMode } from "react-native-materia";
import { Text } from "react-native";

export const ThemeStatus = () => {
  const { mode, isDark } = useMateriaMode();

  return (
    <Text>
      Active mode: {mode} (Dark: {isDark ? "Yes" : "No"})
    </Text>
  );
};
```

### useMateriaTypography

Returns the active type scale configurations, including font families, sizes, weights, and line heights.

```tsx
import { useMateriaTypography } from "react-native-materia";
import { Text } from "react-native";

export const CustomHeadline = () => {
  const typography = useMateriaTypography();

  return <Text style={typography.headlineMedium}>Custom Headline</Text>;
};
```

### useMateriaIconography

Returns the active icon registry, combining default icons with any custom icon overrides passed to `MateriaProvider`.

```tsx
import { useMateriaIconography } from "react-native-materia";

export const IconChecker = () => {
  const icons = useMateriaIconography();
  const CheckIcon = icons.check;

  return <CheckIcon />;
};
```

### useMateriaTheme

Returns the complete raw theme object containing light and dark schemes, core seed colors, and extended palettes.

```tsx
import { useMateriaTheme } from "react-native-materia";

export const ThemeInspector = () => {
  const theme = useMateriaTheme();

  return null;
};
```

## Related Links

Explore more about core library architecture in the [Theming Guide](/about/theming), [Design Tokens](/about/tokens), [Typography](/about/typography), and [Iconography](/about/iconography) sections.
