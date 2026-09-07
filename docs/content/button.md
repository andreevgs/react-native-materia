# Button

Buttons express actions that users can take. They guide user interaction through visual hierarchy and distinct surface styling.

<!-- SLOT: DEMO_MAIN -->

## Usage

Import the `Button` component from `react-native-materia` and pass the label as children:

```tsx
import { Button } from "react-native-materia";

export const Example = () => (
  <Button mode="filled" onPress={() => console.log("Pressed")}>
    Click Me
  </Button>
);
```

## Variants

Buttons come in five distinct modes to represent different emphasis levels within a user interface.

### Filled

High-emphasis button for the primary action on a screen.

<!-- SLOT: DEMO_FILLED -->

```tsx
<Button mode="filled">Filled Button</Button>
```

### Tonal

Medium-high emphasis button for secondary actions that require more visual weight than an outlined button.

<!-- SLOT: DEMO_TONAL -->

```tsx
<Button mode="tonal">Tonal Button</Button>
```

### Outlined

Medium-emphasis button for secondary or alternative actions.

<!-- SLOT: DEMO_OUTLINED -->

```tsx
<Button mode="outlined">Outlined Button</Button>
```

### Elevated

Medium-emphasis button featuring a subtle shadow for elevation over patterned backgrounds.

<!-- SLOT: DEMO_ELEVATED -->

```tsx
<Button mode="elevated">Elevated Button</Button>
```

### Text

Low-emphasis button suitable for less prominent actions, such as inside cards or dialog footers.

<!-- SLOT: DEMO_TEXT -->

```tsx
<Button mode="text">Text Button</Button>
```

## Icons

Buttons can display a leading icon alongside the label to reinforce action intent and improve visual recognition.

The `icon` prop accepts a string name from the built-in Materia icon set, a custom component, or an image source. To explore all available icons and learn how to use custom iconography, visit the [Iconography](/about/iconography) page.

<!-- SLOT: DEMO_ICON -->

```tsx
<Button mode="filled" icon="check-rounded">
  Save Changes
</Button>
```

## States

Buttons can reflect different interaction states, such as `disabled` when an action is unavailable, or `loading` when an asynchronous operation is in progress.

<!-- SLOT: DEMO_STATES -->

```tsx
<Button mode="filled" disabled>
  Disabled
</Button>
<Button mode="filled" loading>
  Loading
</Button>
```

## Props

The `Button` component accepts the following properties:

### children

`ReactNode`

The content rendered inside the button, typically a text label.

### mode

`ButtonMode`

Defines the visual appearance and emphasis level of the button. Accepts `"filled"`, `"tonal"`, `"outlined"`, `"elevated"`, or `"text"`.

Default value: `"filled"`

### onPress

`() => void`

Callback function invoked when the user presses the button.

### disabled

`boolean`

Disables button interaction and applies disabled visual styling.

Default value: `false`

### loading

`boolean`

Displays a loading indicator inside the button and disables interaction.

Default value: `false`

### icon

`IconSource`

Specifies an optional leading icon to display before the button label. Accepts a built-in icon name string, a custom React component, or an SVG component. Refer to the [Iconography](/about/iconography) guide for details.

### style

`StyleProp<ViewStyle>`

Custom view styles applied to the outer button container.

### labelStyle

`StyleProp<TextStyle>`

Custom text styles applied to the inner button label.

### elevationLevel

`number`

Custom elevation level applied when rendering `"elevated"` mode to adjust shadow depth.

## Inherited Props

In addition to the component-specific props above, `ButtonProps` extends `Omit<PressableProps, "style">`, providing full support for standard React Native touch events and accessibility attributes such as `onLongPress`, `testID`, and `accessibilityLabel`.

## Types

Type definitions associated with the `Button` component:

### ButtonMode

Union type representing the available visual modes for the button.

```typescript
type ButtonMode = "filled" | "tonal" | "outlined" | "elevated" | "text";
```

### ButtonProps

Interface defining all props accepted by the `Button` component.

```typescript
interface ButtonProps extends Omit<PressableProps, "style"> {
  children: ReactNode;
  mode?: ButtonMode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: IconSource;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  elevationLevel?: number;
}
```

### ButtonStyleConfig

Internal styling configuration computed based on the active button mode, theme colors, and interaction states.

```typescript
interface ButtonStyleConfig {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  rippleColor: string;
}
```
