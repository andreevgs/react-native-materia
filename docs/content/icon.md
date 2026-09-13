# Icon

Icons are visual representations of commands, navigation, and common user actions. They provide visual clarity and enhance interface recognition across applications.

<!-- SLOT: DEMO_MAIN -->

## Usage

Import the `Icon` component from `react-native-materia` and provide a valid `source` prop:

```tsx
import React from "react";
import { Icon } from "react-native-materia";

export const Example = () => <Icon source="check-rounded" size={24} />;
```

## Sizing

Icons can be sized using numeric dimensions. By default, the icon adopts the standard Material Design `24dp` size token.

For consistent layout pacing across screens, access standard sizing tokens through `useMateriaTokens()`. The scale provides `18dp`, `20dp`, `24dp`, `40dp`, and `48dp`.

<!-- SLOT: DEMO_SIZES -->

```tsx
import React from "react";
import { Icon, useMateriaTokens } from "react-native-materia";

export const IconSizing = () => {
  const tokens = useMateriaTokens();

  return (
    <>
      <Icon source="settings-outline-rounded" size={tokens.iconSize["18dp"]} />
      <Icon source="settings-outline-rounded" size={tokens.iconSize["24dp"]} />
      <Icon source="settings-outline-rounded" size={tokens.iconSize["40dp"]} />
      <Icon source="settings-outline-rounded" size={tokens.iconSize["48dp"]} />
    </>
  );
};
```

## Colors

Icons can be tinted using active theme colors or custom color values. When no color is specified, the icon automatically falls back to `colors.onSurfaceVariant` from the active theme.

<!-- SLOT: DEMO_COLORS -->

```tsx
<Icon source="info-rounded" color={colors.primary} />
<Icon source="delete-rounded" color={colors.error} />
<Icon source="check-rounded" color={colors.tertiary} />
```

## Custom Sources

In addition to registered icon string names, `Icon` accepts custom React components conforming to `MateriaIconProps`.

Always declare custom icon components as standalone components outside the parent render function. Passing inline render functions directly into the `source` prop is strongly discouraged because it creates a new component reference on every render cycle, triggering unnecessary component remounts and interrupting animations.

<!-- SLOT: DEMO_CUSTOM -->

```tsx
import React from "react";
import Svg, { Path } from "react-native-svg";
import { Icon, useMateriaColors } from "react-native-materia";
import { MateriaIconProps } from "react-native-materia/types";

export const CustomBookmarkIcon = ({
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

export const CustomIconDemo = () => {
  const colors = useMateriaColors();

  return (
    <Icon source={CustomBookmarkIcon} color={colors.secondary} size={32} />
  );
};
```

To explore all registered icons and learn how to configure custom icon packs, visit the [Iconography](/about/iconography) guide.

## Accessibility

The `Icon` component handles accessibility automatically. When `accessibilityLabel` is omitted, the icon is treated as purely decorative and is hidden from screen readers. Supplying an `accessibilityLabel` marks the icon as an accessible element with full assistive support:

```tsx
<Icon source="delete-rounded" accessibilityLabel="Delete item" />
```

## Props

The `Icon` component accepts the following properties:

### source

`IconSource`

The icon identifier or component to render. Accepts registered icon names like `"check-rounded"`, React components, or render functions. Refer to the [Iconography](/about/iconography) guide for the full list of built-in icons.

### size

`number`

The width and height of the icon in density-independent pixels.

Default value: `24`

### color

`string`

The tint color applied to the icon. When omitted, defaults to `colors.onSurfaceVariant` from the active theme.

### style

`StyleProp<ViewStyle>`

Custom view styles applied to the outer icon container.

### accessibilityLabel

`string`

A descriptive text label announced by screen readers. When provided, the icon becomes an accessible element; when omitted, it is hidden from accessibility tools.

## Inherited Props

In addition to the component-specific props above, `IconProps` extends `AccessibilityProps`, providing full support for standard React Native accessibility attributes such as `accessibilityHint`, `accessibilityRole`, and `testID`.

## Types

Type definitions associated with the `Icon` component:

### IconProps

Interface defining all properties accepted by the `Icon` component.

```typescript
interface IconProps extends AccessibilityProps {
  source: IconSource;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
```

### IconSource

Union type representing acceptable icon source formats.

```typescript
type IconSource =
  | MateriaIconName
  | MateriaIcon
  | ((props: MateriaIconProps) => ReactNode);
```

### MateriaIconName

Union type representing all string identifiers available in the iconography registry.

```typescript
type MateriaIconName = keyof MateriaIconography;
```

### MateriaIcon

Component type representing a dedicated icon component that accepts `MateriaIconProps`.

```typescript
type MateriaIcon = ComponentType<MateriaIconProps>;
```

### MateriaIconProps

Properties passed to custom icon render functions and components.

```typescript
interface MateriaIconProps extends AccessibilityProps {
  color: string;
  size: number;
  style?: StyleProp<ViewStyle>;
}
```
