# IconButton

Icon buttons help people take supplementary actions with a single tap. They are used when a compact button is required, such as in app bars, toolbars, and search containers.

<!-- SLOT: DEMO_MAIN -->

## Usage

Import the `IconButton` component from `react-native-materia` and provide a valid `icon` name or component:

```tsx
import { IconButton } from "react-native-materia";

export const Example = () => (
  <IconButton
    icon="settings-outline-rounded"
    onPress={() => console.log("Pressed")}
  />
);
```

## Variants

Icon buttons come in four distinct modes to represent different emphasis levels within an interface.

### Filled

High-emphasis icon button with a solid background fill for prominent actions.

<!-- SLOT: DEMO_FILLED -->

```tsx
<IconButton mode="filled" icon="check-rounded" />
```

### Tonal

Medium-high emphasis icon button with a softer tonal background fill.

<!-- SLOT: DEMO_TONAL -->

```tsx
<IconButton mode="tonal" icon="check-rounded" />
```

### Outlined

Medium-emphasis icon button with an outline border and transparent fill.

<!-- SLOT: DEMO_OUTLINED -->

```tsx
<IconButton mode="outlined" icon="check-rounded" />
```

### Standard

Low-emphasis icon button with a transparent surface, ideal for toolbars and compact actions.

<!-- SLOT: DEMO_STANDARD -->

```tsx
<IconButton mode="standard" icon="check-rounded" />
```

## States

Icon buttons reflect different interaction states, such as `disabled` when an action is unavailable, or `loading` when an operation is processing.

<!-- SLOT: DEMO_STATES -->

```tsx
<IconButton mode="filled" icon="check-rounded" disabled />
<IconButton mode="filled" icon="check-rounded" loading />
```

## Props

The `IconButton` component accepts the following properties:

### icon

`IconSource`

Specifies the icon to display inside the button. Accepts a built-in icon name string, a custom React component, or an SVG component. Refer to the [Iconography](/about/iconography) guide for details.

### mode

`IconButtonMode`

Defines the visual appearance and emphasis level of the button. Accepts `"filled"`, `"tonal"`, `"outlined"`, or `"standard"`.

Default value: `"standard"`

### loading

`boolean`

Replaces the icon with an activity indicator and disables user interaction.

Default value: `false`

### disabled

`boolean`

Disables button interaction and applies disabled styling.

Default value: `false`

### style

`StyleProp<ViewStyle>`

Custom view styles applied to the outer container.

## Inherited Props

In addition to the component-specific props above, `IconButtonProps` extends `Omit<PressableProps, "style">`, providing full support for standard React Native touch events and accessibility attributes such as `onPress`, `onLongPress`, `testID`, and `accessibilityLabel`.

## Types

Type definitions associated with the `IconButton` component:

### IconButtonMode

Union type representing the available visual modes for the icon button.

```typescript
type IconButtonMode = "filled" | "tonal" | "outlined" | "standard";
```

### IconButtonProps

Interface defining all props accepted by the `IconButton` component.

```typescript
interface IconButtonProps extends Omit<PressableProps, "style"> {
  icon: IconSource;
  mode?: IconButtonMode;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
```

### IconButtonStyleConfig

Internal styling configuration computed based on the active mode, theme colors, and interaction states.

```typescript
interface IconButtonStyleConfig {
  backgroundColor: string;
  iconColor: string;
  borderColor: string;
}
```
