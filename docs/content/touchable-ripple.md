# TouchableRipple

TouchableRipple is a touch-responsive surface primitive that implements Material Design 3 state layers and ink ripples. It responds to hover, keyboard focus, and press interactions with smooth Reanimated physics and soft-edged radial gradients.

<!-- SLOT: DEMO_MAIN -->

## Usage

Import `TouchableRipple` from `react-native-materia` and wrap any content or surface component:

```tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableRipple, MateriaText } from "react-native-materia";

export const Example = () => (
  <TouchableRipple
    onPress={() => console.log("Pressed")}
    style={styles.surface}
  >
    <MateriaText variant="bodyLarge">Tap anywhere on surface</MateriaText>
  </TouchableRipple>
);

const styles = StyleSheet.create({
  surface: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.12)",
  },
});
```

## Bounded and Borderless

Touchable surfaces can constrain their ripple effect to the element boundary or allow the wave to radiate freely beyond the container.

### Bounded

By default, the ripple animation is bounded and strictly clipped to the container shape and border radius.

<!-- SLOT: DEMO_BOUNDED -->

```tsx
<TouchableRipple style={styles.card} onPress={() => {}}>
  <MateriaText variant="titleMedium">Bounded Surface</MateriaText>
</TouchableRipple>
```

### Borderless

Setting `borderless` to `true` allows the ripple to expand outside the component boundaries without clipping. This mode is ideal for circular icon buttons, floating avatars, and compact navigation targets.

<!-- SLOT: DEMO_BORDERLESS -->

```tsx
<TouchableRipple borderless style={styles.circle} onPress={() => {}}>
  <Icon source="settings-outline-rounded" size={24} />
</TouchableRipple>
```

## Custom Colors

By default, the ripple wave and state layers inherit `colors.onSurface` from the active theme. You can provide any custom color string using the `rippleColor` prop. The component automatically computes the appropriate semi-transparent state layer opacities for hover, focus, and press states.

<!-- SLOT: DEMO_COLORS -->

```tsx
import React from "react";
import {
  TouchableRipple,
  MateriaText,
  useMateriaColors,
} from "react-native-materia";

export const ColoredRippleDemo = () => {
  const colors = useMateriaColors();

  return (
    <>
      <TouchableRipple
        rippleColor={colors.primary}
        style={styles.surface}
        onPress={() => {}}
      >
        <MateriaText variant="bodyMedium" style={{ color: colors.primary }}>
          Primary Color
        </MateriaText>
      </TouchableRipple>

      <TouchableRipple
        rippleColor={colors.error}
        style={styles.surface}
        onPress={() => {}}
      >
        <MateriaText variant="bodyMedium" style={{ color: colors.error }}>
          Error Color
        </MateriaText>
      </TouchableRipple>
    </>
  );
};
```

## State Layers

TouchableRipple incorporates the Material Design 3 interaction state model. On desktop browsers and pointer devices, hovering over the surface triggers a smooth 15ms transition to the hover state layer. When navigated via keyboard, the surface activates the focus state layer using standard focus-visible detection to prevent intrusive focus rings on mouse taps.

<!-- SLOT: DEMO_STATES -->

```tsx
<TouchableRipple style={styles.surface} disabled onPress={() => {}}>
  <MateriaText variant="bodyMedium">Disabled Surface</MateriaText>
</TouchableRipple>
```

## Props

The `TouchableRipple` component accepts the following properties:

### borderless

`boolean`

Whether the ink ripple extends beyond the bounds of the container without clipping.

Default value: `false`

### rippleColor

`string`

Custom color applied to the ripple wave and interaction state layers. When omitted, defaults to `colors.onSurface` from the active theme.

### disabled

`boolean`

Whether touch interactions, hover highlights, and keyboard focus are disabled.

Default value: `false`

### style

`StyleProp<ViewStyle>`

Custom view styles applied to the outer touchable container. Corner radii defined in this style are automatically extracted to clip inner state layers and ripple waves.

### contentContainerStyle

`StyleProp<ViewStyle>`

Custom view styles applied to the inner wrapper containing the children.

### children

`ReactNode`

The content elements rendered inside the touchable surface.

### useNativeEffect

`boolean`

Whether to use the native Android ripple effect on supported devices (Android API 21 and above). When set to `false`, the platform renders the cross-platform Reanimated soft-edge SVG ripple.

Default value: `false`

### contentPointerEvents

`ViewProps["pointerEvents"]`

Pointer events configuration applied to the inner content container.

Default value: `"none"`

### pressDelay

`number`

Delay in milliseconds before showing the ripple wave on touch down. Useful on touch screens to prevent ripples from triggering during scroll gestures.

Default value: `150` on mobile, `0` on web

## Inherited Props

In addition to the component-specific props above, `TouchableRippleProps` extends `Omit<PressableProps, "style">`, providing complete support for standard React Native interaction handlers such as `onPress`, `onLongPress`, `onPressIn`, `onPressOut`, `onHoverIn`, `onHoverOut`, `onFocus`, `onBlur`, `testID`, and accessibility attributes.

## Types

Type definitions associated with the `TouchableRipple` component:

### TouchableRippleProps

Interface defining all properties accepted by the `TouchableRipple` component.

```typescript
interface TouchableRippleProps extends Omit<PressableProps, "style"> {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
  borderless?: boolean;
  rippleColor?: string;
  useNativeEffect?: boolean;
  contentPointerEvents?: ViewProps["pointerEvents"];
  pressDelay?: number;
}
```

### RippleColorConfig

Resolved colors used for state layers and native effects.

```typescript
interface RippleColorConfig {
  solidColor: string;
  nativeColor: string;
}
```
