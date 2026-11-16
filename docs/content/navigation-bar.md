# NavigationBar

Navigation bars provide switching between primary destinations in an application. Rendered at the bottom of the screen, they display three to five routes with icons, labels, and bottom safe area handling.

<!-- SLOT: DEMO_MAIN -->

## Usage

Import `NavigationBar` from `react-native-materia` and pass an array of `routes`, the controlled `selectedIndex`, and an `onTabPress` callback:

```tsx
import React, { useState } from "react";
import { NavigationBar } from "react-native-materia";
import type { NavigationRoute } from "react-native-materia";

const routes: NavigationRoute[] = [
  {
    key: "home",
    label: "Home",
    icon: "home-outline-rounded",
    activeIcon: "home-rounded",
  },
  {
    key: "info",
    label: "Info",
    icon: "info-outline-rounded",
    activeIcon: "info-rounded",
  },
  {
    key: "settings",
    label: "Settings",
    icon: "settings-outline-rounded",
    activeIcon: "settings-rounded",
  },
];

export const Example = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <NavigationBar
      routes={routes}
      selectedIndex={selectedIndex}
      onTabPress={(index) => setSelectedIndex(index)}
    />
  );
};
```

## Routes

The `routes` array defines the destinations rendered across the navigation bar. Each `NavigationRoute` object provides a unique `key`, a display `label`, and optional icon sources.

### Active and Inactive Icons

Each route accepts both `icon` and `activeIcon`. Supplying `activeIcon` lets a destination switch from an outlined icon in its inactive state to a filled icon when selected. When `activeIcon` is omitted, the component falls back to `icon` in both states.

<!-- SLOT: DEMO_ICONS -->

```tsx
import React, { useState } from "react";
import { NavigationBar } from "react-native-materia";
import type { NavigationRoute } from "react-native-materia";

const routes: NavigationRoute[] = [
  {
    key: "home",
    label: "Home",
    icon: "home-outline-rounded",
    activeIcon: "home-rounded",
  },
  {
    key: "info",
    label: "Info",
    icon: "info-outline-rounded",
    activeIcon: "info-rounded",
  },
  {
    key: "settings",
    label: "Settings",
    icon: "settings-outline-rounded",
  },
];

export const IconVariationExample = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <NavigationBar
      routes={routes}
      selectedIndex={selectedIndex}
      onTabPress={(index) => setSelectedIndex(index)}
    />
  );
};
```

### Destination Count

`NavigationBar` expects between `3` and `5` routes and logs a development-mode warning if fewer than `3` or more than `5` destinations are passed. Each tab item applies equal flex sizing so destinations distribute evenly across the container width.

<!-- SLOT: DEMO_FIVE_ROUTES -->

```tsx
import React, { useState } from "react";
import { NavigationBar } from "react-native-materia";
import type { NavigationRoute } from "react-native-materia";

const routes: NavigationRoute[] = [
  {
    key: "home",
    label: "Home",
    icon: "home-outline-rounded",
    activeIcon: "home-rounded",
  },
  {
    key: "create",
    label: "Create",
    icon: "add-rounded",
  },
  {
    key: "info",
    label: "Info",
    icon: "info-outline-rounded",
    activeIcon: "info-rounded",
  },
  {
    key: "trash",
    label: "Trash",
    icon: "delete-rounded",
  },
  {
    key: "settings",
    label: "Settings",
    icon: "settings-outline-rounded",
    activeIcon: "settings-rounded",
  },
];

export const FiveRoutesExample = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <NavigationBar
      routes={routes}
      selectedIndex={selectedIndex}
      onTabPress={(index) => setSelectedIndex(index)}
    />
  );
};
```

### Custom Icons

Both `icon` and `activeIcon` accept any `IconSource`, including custom React components conforming to `MateriaIconProps`. Define custom icon components outside your parent component so their references remain stable across renders. Visit the [Iconography](/about/iconography) and [Icon](/components/icon) guides for details on custom vector sources.

<!-- SLOT: DEMO_CUSTOM_ICONS -->

```tsx
import React, { useState } from "react";
import Svg, { Path } from "react-native-svg";
import { NavigationBar } from "react-native-materia";
import type { NavigationRoute } from "react-native-materia";
import type { MateriaIconProps } from "react-native-materia/types";

const CustomBookmarkOutlineIcon = ({
  color,
  size,
  style,
  ...props
}: MateriaIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style} {...props}>
    <Path
      fill={color}
      d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"
    />
  </Svg>
);

const CustomBookmarkIcon = ({
  color,
  size,
  style,
  ...props
}: MateriaIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style} {...props}>
    <Path
      fill={color}
      d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
    />
  </Svg>
);

const routes: NavigationRoute[] = [
  {
    key: "home",
    label: "Home",
    icon: "home-outline-rounded",
    activeIcon: "home-rounded",
  },
  {
    key: "saved",
    label: "Saved",
    icon: CustomBookmarkOutlineIcon,
    activeIcon: CustomBookmarkIcon,
  },
  {
    key: "settings",
    label: "Settings",
    icon: "settings-outline-rounded",
    activeIcon: "settings-rounded",
  },
];

export const CustomIconsExample = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <NavigationBar
      routes={routes}
      selectedIndex={selectedIndex}
      onTabPress={(index) => setSelectedIndex(index)}
    />
  );
};
```

## Active Indicator

When `selectedIndex` changes, the active pill indicator animates horizontally around the selected icon. Pressing a tab triggers a centered touch ripple within the indicator bounds.

## Safe Area Support

The component integrates with `react-native-safe-area-context` to automatically detect bottom gesture bar and home indicator heights. It applies bottom safe area insets to `paddingBottom` and container `height` so navigation items remain clear of system bars. Ensure your application root is wrapped in `SafeAreaProvider`.

## Accessibility

`NavigationBar` assigns `accessibilityRole="tablist"` to its outer container, and each tab item applies `accessibilityRole="tab"` and `accessibilityState={{ selected: isActive }}`. By default, `accessibilityLabel` uses `route.label`, or you can set `accessibilityLabel` on a `NavigationRoute` object to supply a more descriptive announcement for assistive technologies.

## Props

The `NavigationBar` component accepts the following properties:

### routes

`NavigationRoute[]`

Array of route item descriptors displayed in the navigation bar. Between `3` and `5` routes are expected.

### selectedIndex

`number`

Zero-based index of the currently active route tab.

### onTabPress

`(index: number, key: string) => void`

Callback function invoked when a tab item is pressed, receiving the pressed tab `index` and its `route.key`.

## Types

Type definitions associated with the `NavigationBar` component:

### NavigationRoute

Route item descriptor for navigation bar tabs.

```typescript
type NavigationRoute = {
  key: string;
  label: string;
  icon?: IconSource;
  activeIcon?: IconSource;
  accessibilityLabel?: string;
};
```

### NavigationBarProps

Interface defining all properties accepted by the `NavigationBar` component.

```typescript
interface NavigationBarProps {
  routes: NavigationRoute[];
  selectedIndex: number;
  onTabPress: (index: number, key: string) => void;
}
```
