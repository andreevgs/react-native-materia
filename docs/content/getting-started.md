# Getting started

React Native Materia is a customizable component library implementing [Material Design 3](https://m3.material.io/). It provides a comprehensive suite of pre-built UI components with custom animations, dynamic theming, and cross-platform support.

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

## Peer Dependencies

React Native Materia requires several peer dependencies for fluid animations, gesture handling, and vector iconography:

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

## Setup

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

By default, `MateriaProvider` automatically integrates `GestureHandlerRootView` with full-screen flex layout, so no separate gesture handler root wrapper is required.

## Usage

You can now import and use any pre-built component across your application:

```tsx
import React from "react";
import { Button } from "react-native-materia";
import { View, StyleSheet } from "react-native";

export const Example = () => {
  return (
    <View style={styles.container}>
      <Button mode="filled" icon="check-rounded" onPress={() => {}}>
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
    padding: 16,
  },
});
```

## Core Architecture

The core module establishes the foundational architecture for the entire library. Through `MateriaProvider`, components gain synchronized access to dynamic color themes, design tokens, typography scales, icon registries, and overlay portals.

### Provider

The root provider orchestrates global theme modes (`"system"`, `"light"`, `"dark"`), contrast levels (`"standard"`, `"medium"`, `"high"`), gesture handling, and context hooks like `useMateriaColors` and `useMateriaTokens`.

Read more in the [Provider](/about/provider) documentation.

### Theming

Theming is fully customizable and compatible with [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/). You can import exported themes directly as typed JavaScript or TypeScript modules, or generate balanced color schemes programmatically from a single seed color.

Read more in the [Theming](/about/theming) documentation.

### Design Tokens

All layout metrics, spacings, elevation levels, and motion curves adhere to the Material Design 3 specification. Tokens cover the 8dp spacing grid, corner radius scales from extra small to full stadium, platform-tuned shadow elevations, and interaction state opacities.

Read more in the [Tokens](/about/tokens) documentation.

### Typography

Text styling is governed by the standard MD3 type scale across fifteen variants spanning display, headline, title, body, and label roles. The typography generator allows configuring custom brand and plain fonts while resolving cross-platform vertical rhythm differences on Android.

Read more in the [Typography](/about/typography) documentation.

### Iconography

Icons are managed globally through a unified iconography registry bundled with standard MD3 rounded symbols. You can customize the look of library components or extend the default set with custom SVG icons while enjoying complete TypeScript type safety and autocompletion.

Read more in the [Iconography](/about/iconography) documentation.

### Portal System

Overlays such as Bottom Sheets, Snackbars, and Dialogs rely on the portal architecture. The `Portal` and `PortalHost` primitives teleport floating elements to the top of the view hierarchy without breaking React context or introducing z-index clipping.

Read more in the [Portal](/about/portal) documentation.
