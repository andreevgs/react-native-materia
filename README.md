# React Native Materia

React Native Materia is a UI library for React Native built from the ground up, embracing the principles of the modern [Material You](https://m3.material.io/) (Material Design 3) specification. It offers a highly customizable, themeable, and accessible set of components that let you build beautiful and consistent interfaces seamlessly.

## Installation

You can install `react-native-materia` along with its peer dependencies using your preferred package manager.

```bash
npm install react-native-materia react-native-gesture-handler react-native-svg
# or
yarn add react-native-materia react-native-gesture-handler react-native-svg
# or
pnpm add react-native-materia react-native-gesture-handler react-native-svg
```

**Note:** Since we rely on `react-native-gesture-handler` and `react-native-svg`, ensure they are correctly integrated according to their installation instructions (e.g., adding necessary Babel plugins for gesture handler).

## Setup

To use React Native Materia in your application, you must wrap your app's root component with the `MateriaProvider`. This provider seamlessly sets up the theming context, typography, color schemes, and icon registry. Additionally, it wraps your app in an underlying `GestureHandlerRootView` to ensure interactions work flawlessly across components.

```tsx
import React from "react";
import { MateriaProvider } from "react-native-materia";
import AppContent from "./AppContent";

export default function App() {
  return (
    <MateriaProvider mode="system" contrastLevel="standard">
      <AppContent />
    </MateriaProvider>
  );
}
```

### Provider Props

- `mode` - Theme mode (`"system" | "light" | "dark"`). Defaults to `"system"`.
- `contrastLevel` - Contrast level (`"standard" | "medium" | "high"`). Defaults to `"standard"`.
- `theme` / `typography` - (Optional) Provide your own customized Materia themes or typography scales.
- `icons` - (Optional) Custom SVG path data for icons. By default, Core Icons are included.

> **Tip:** The `theme` interface (`MateriaTheme`) is fully compatible with the JSON output from the official [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/), allowing you to quickly generate and drop in a new theme!

## Usage

React Native Materia exposes both components and utility hooks (like `useMateriaTheme`, `useMateriaColors`, `useMateriaTypography`, `useIconRegistry`) to help you build out your screens in the material way.

## Components

_(More components coming soon, here are the current essentials!)_

### MateriaText

A highly customizable text component linked to the `TypographyVariant` from the Material Design 3 guidelines. It scales properly out of the box and seamlessly maps to the theme's default text colors (using `onSurface` as the standard base).

```tsx
import { MateriaText } from 'react-native-materia';

// Standard body text
<MateriaText variant="bodyMedium">Hello World!</MateriaText>

// Headline text
<MateriaText variant="headlineLarge">My Title</MateriaText>
```

**Props:**

- Inherits from the standard React Native `TextProps`.
- `variant` (`TypographyVariant`): The typography variant to use (e.g., `"bodyMedium"`, `"headlineLarge"`, `"labelSmall"`). Defaults to `"bodyMedium"`.

### Icon

The `Icon` component allows rendering SVG icons with Material Design 3 spacing and theming baked in. You can use string-based core paths registered in your `MateriaProvider` or directly pass a custom SVG component as the source.

```tsx
import { Icon } from "react-native-materia";

// Using a standard registered icon string
<Icon source="home" size={24} />;

// Passing custom SVG components directly
import CustomSvg from "./custom-icon.svg";
<Icon source={CustomSvg} color="red" />;
```

**Props:**

- `source` (`IconSource`): Can be a registered string name (`IconName`) or a React function component (`React.FC<SvgProps>`).
- `size` (`number`): The size of the icon container (width and height). Defaults to `tokens.iconSize["24dp"]` (24px).
- `color` (`ColorValue`): The fill color of the icon. Defaults to the theme's `onSurfaceVariant` color.
- `style` (`StyleProp<ViewStyle>`): Standard React Native `ViewStyle` passed to the wrapping container.

---

🚧 **Work in Progress:** This library is heavily under development and is preparing for further updates!
