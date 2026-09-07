# React Native Materia

A customizable component library implementing the modern [Material Design 3](https://m3.material.io/) specification for React Native.

[![npm version](https://img.shields.io/npm/v/react-native-materia.svg)](https://www.npmjs.com/package/react-native-materia)
[![license](https://img.shields.io/npm/l/react-native-materia.svg)](https://github.com/andreevgs/react-native-materia/blob/main/LICENSE)

---

## Overview

React Native Materia is built around the modern Material Design 3 specification, treating color, shape, elevation, and motion as unified primitives. It provides faithful implementations of MD3 components with dynamic color schemes, tonal surfaces, and adaptive contrast levels.

At the center of the library is `MateriaProvider`, an unopinionated runtime root that coordinates dynamic theming (`"light"`, `"dark"`, `"system"`), contrast levels (`"standard"`, `"medium"`, `"high"`), 8dp grid spacing tokens, fifteen typography variants, and global icon registries. Palettes can be generated programmatically from a seed color or imported directly from [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/).

All animations and interactions run directly on the UI thread via `react-native-reanimated` and `react-native-gesture-handler` for smooth and consistent performance across iOS, Android, and Web. A built-in portal subsystem ensures floating elements like dialogs, menus, and bottom sheets render reliably above navigation hierarchies without context loss or layout clipping.

---

## Installation

Install the package into your project using your package manager of choice:

```bash
npm install react-native-materia
```

```bash
yarn add react-native-materia
```

```bash
pnpm add react-native-materia
```

### Peer Dependencies

React Native Materia requires several peer dependencies for animations, gesture interactions, and vector iconography:

```bash
npm install react-native-reanimated react-native-gesture-handler react-native-svg
```

```bash
yarn add react-native-reanimated react-native-gesture-handler react-native-svg
```

```bash
pnpm add react-native-reanimated react-native-gesture-handler react-native-svg
```

If you are using Expo, install matching dependency versions with:

```bash
npx expo install react-native-reanimated react-native-gesture-handler react-native-svg
```

---

## Quick Start

Wrap your application's root component with `MateriaProvider`. To support overlay components like modal dialogs and bottom sheets, also wrap your content with `PortalProvider` and render a root `PortalHost`:

```tsx
import React from "react";
import {
  MateriaProvider,
  PortalProvider,
  PortalHost,
} from "react-native-materia";
import { MainNavigation } from "./navigation";

export default function App() {
  return (
    <MateriaProvider>
      <PortalProvider>
        <MainNavigation />
        <PortalHost />
      </PortalProvider>
    </MateriaProvider>
  );
}
```

> **Note:** `MateriaProvider` automatically integrates `GestureHandlerRootView` with full-screen flex layout, so no separate gesture handler root wrapper is required.

### Using Components

You can now import and use any pre-built component across your application:

```tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-materia";

export const ExampleScreen = () => {
  return (
    <View style={styles.container}>
      <Button
        mode="filled"
        icon="check-rounded"
        onPress={() => console.log("Pressed")}
      >
        Save Changes
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

---

## Documentation

Comprehensive interactive documentation, live component playgrounds, and architecture guides are available in the dedicated documentation app.

To launch the documentation app locally:

```bash
npm run docs
```

### Core Architecture

- [Getting Started](docs/content/getting-started.md) — install dependencies and configure the root provider.
- [Provider](docs/content/provider.md) — manage theme modes, contrast levels, and gesture roots.
- [Theming](docs/content/theming.md) — seed color palettes and Material Theme Builder integration.
- [Tokens](docs/content/tokens.md) — spacing, corner shapes, elevation shadows, and motion curves.
- [Typography](docs/content/typography.md) — configure font families across the 15 MD3 type roles.
- [Iconography](docs/content/iconography.md) — system icons, custom SVG packs, and icon styling.
- [Portal](docs/content/portal.md) — render dialogs and sheets above navigation layers.

### Components

- [Button](docs/content/button.md) — actions across five emphasis levels.
- [IconButton](docs/content/icon-button.md) — compact icon-only actions with ripple feedback.
- [Icon](docs/content/icon.md) — scalable vector icons with automatic accessibility support.
- [List](docs/content/list.md) — standard and segmented rows with content slots.

---

## Design Guidelines

While React Native Materia implements the tokens, components, and motion curves of the design system, creating an effective user experience requires adhering to the official [Material Design 3 Guidelines](https://m3.material.io/).

Structural decisions regarding screen composition, visual hierarchy, choosing appropriate component variants (such as filled vs. outlined buttons, or modal bottom sheets vs. dialogs), and spatial layout should always be guided by the official specification.

---

## License

MIT © [andreevgs](https://github.com/andreevgs)
