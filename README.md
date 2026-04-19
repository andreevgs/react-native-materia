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
- `variant` (`TypographyVariant`): The typography variant to use. Defaults to `"bodyMedium"`.
  - **Available Variants:** `"displayLarge"` | `"displayMedium"` | `"displaySmall"` | `"headlineLarge"` | `"headlineMedium"` | `"headlineSmall"` | `"titleLarge"` | `"titleMedium"` | `"titleSmall"` | `"labelLarge"` | `"labelMedium"` | `"labelSmall"` | `"bodyLarge"` | `"bodyMedium"` | `"bodySmall"`

### Icon

The `Icon` component allows rendering SVG icons with Material Design 3 spacing and theming baked in. You can use string-based core paths registered in your `MateriaProvider` or directly pass a custom SVG component as the source.

```tsx
import { Icon } from "react-native-materia";

// Using a standard registered icon string
<Icon source="search" size={24} />;

// Passing custom SVG components directly
import CustomSvg from "./custom-icon.svg";
<Icon source={CustomSvg} color="red" />;
```

**Props:**

- `source` (`IconSource`): Can be a registered string name (`IconName`) or a React function component (`React.FC<SvgProps>`).
- `size` (`number`): The size of the icon container (width and height). Defaults to `tokens.iconSize["24dp"]` (24px).
- `color` (`ColorValue`): The fill color of the icon. Defaults to the theme's `onSurfaceVariant` color.
- `style` (`StyleProp<ViewStyle>`): Standard React Native `ViewStyle` passed to the wrapping container.

### Extending IconRegistry

By default, the library includes a small set of essential core icons: 
`"arrow-back"`, `"arrow-forward"`, `"close"`, `"menu"`, `"more-vert"`, `"check"`, `"add"`, `"search"`, `"error"`, `"warning"`, `"delete"`.

You can easily extend this default set of icons with your own custom paths. A great source for Material Design icons is [Iconify (Material Symbols)](https://icon-sets.iconify.design/material-symbols).

To add a new icon:
1. Find any SVG icon you like.
2. Extract the value of the `d` attribute from the `<path>` element.
3. Create an object where the keys are the icon names and the values are the path strings. This is similar to the internal `CORE_ICON_PATHS` structure.
4. Pass this object to the `icons` prop of the `MateriaProvider`.

```tsx
import React from "react";
import { MateriaProvider, Icon } from "react-native-materia";

const myCustomIcons = {
  // Value taken exactly from the `d` attribute of an SVG <path>
  "my-custom-star": "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
};

export default function App() {
  return (
    <MateriaProvider icons={myCustomIcons}>
      <Icon source="my-custom-star" size={24} color="blue" />
    </MateriaProvider>
  );
}
```

> **Note:** The `IconRegistry` approach is currently designed for simple icons that consist of a single `<path>`. If you need to use a complex icon containing multiple paths or elements, we recommend using `react-native-svg` to create a standard component. You can then pass this component directly to the `source` prop of `Icon` or the `icon` prop of `Button` and `IconButton`.

### Button

A standard interactive button with all Material Design 3 state layers and ripples built-in.

```tsx
import { Button } from 'react-native-materia';

<Button mode="filled" onPress={() => console.log('Pressed')}>
  Submit
</Button>

<Button mode="outlined" icon="add">
  Add Item
</Button>
```

**Props:**
- `mode` (`ButtonMode`): Visual variant `"filled" | "tonal" | "outlined" | "elevated" | "text"`. Defaults to `"filled"`.
- `disabled` (`boolean`): Disables interaction and adapts colors.
- `loading` (`boolean`): Shows an activity indicator inside the button and disables interaction.
- `icon` (`IconSource`): Optional leading icon to display before the text.

### IconButton

Functions like a regular button, but its content consists exclusively of an icon. It provides the standard Material Design 3 state layers (like ripple effects) and comes in several visual styles (standard, filled, tonal, and outlined).

```tsx
import { IconButton } from 'react-native-materia';

<IconButton 
  icon="search" 
  mode="standard" 
  onPress={() => console.log('Search clicked')} 
/>
```

**Props:**
- `icon` (`IconSource`): The icon to render.
- `mode` (`IconButtonMode`): Visual variant `"filled" | "tonal" | "outlined" | "standard"`. Defaults to `"standard"`.
- `disabled` (`boolean`): Disables interaction.
- `loading` (`boolean`): Shows an activity indicator instead of the icon.

### List

A flexible container for displaying rows of information, such as menus, settings, or items in a feed. It supports both standard continuous layouts and visually separated segmented variants.

```tsx
import { List } from 'react-native-materia';

<List variant="standard">
  <List.Item 
    headline="List item" 
    supportingText="Additional description" 
    leadingContent={<Icon source="person" />} 
    onPress={() => console.log('Item pressed')}
  />
</List>
```

**Props (List):**
- `variant` (`"standard" | "segmented"`): Defines the visual layout style.

**Props (List.Item):**

- `headline` (`string`): The primary text of the item.
- `supportingText` (`string`): Optional secondary text beneath the headline.
- `leadingContent` (`ReactNode`): Element placed at the start.
- `trailingContent` (`ReactNode`): Element placed at the end.
- Multiple press props (`onPress`, etc) are inherited from `TouchableRipple`.

### TouchableRipple

The foundation component for interactive elements. It provides the Material Design state layer functionality including responsive hover, focus, and cross-platform ripple effects.

```tsx
import { TouchableRipple } from 'react-native-materia';
import { View, Text } from 'react-native';

<TouchableRipple 
  onPress={() => console.log('Rippled!')} 
  rippleColor="rgba(0,0,0,0.2)"
>
  <View style={{ padding: 16 }}>
    <Text>Press Me</Text>
  </View>
</TouchableRipple>
```

**Props:**
- `onPress`, `onLongPress`, `onHoverIn`, `onFocus`, etc.: Interaction handlers.
- `borderless` (`boolean`): Whether the ripple should flow identically to the container bounds or spread outside.
- `rippleColor` (`string`): Custom color for the ripple and state layer.
- `useNativeEffect` (`boolean`): Uses platform-specific native effects (like Android's native ripple) when available. Defaults to `true`.

---

🚧 **Work in Progress:** This library is heavily under development and is preparing for further updates!
