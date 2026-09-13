# TextField

Text fields let users enter and edit text. They typically appear in forms and dialogs with built-in support for floating labels, assistive text, error states, and leading or trailing icons.

<!-- SLOT: DEMO_MAIN -->

## Usage

Import `TextField` from `react-native-materia`. Control input state using `value` and `onChangeText`:

```tsx
import React, { useState } from "react";
import { TextField } from "react-native-materia";

export const Example = () => {
  const [text, setText] = useState("");

  return (
    <TextField
      label="Username"
      value={text}
      onChangeText={setText}
    />
  );
};
```

## Variants

Text fields are available in two visual modes: filled and outlined. Both variants share the same interaction model, floating label animations, and accessibility properties.

### Filled

Filled text fields feature a subtle container fill color and animate an active accent underline indicator on focus. They offer high contrast against plain surfaces.

<!-- SLOT: DEMO_FILLED -->

```tsx
<TextField mode="filled" label="Full name" />
```

### Outlined

Outlined text fields feature a transparent container with an outline border. When focused or populated, the floating label smoothly cuts a notch into the top border line.

<!-- SLOT: DEMO_OUTLINED -->

```tsx
<TextField mode="outlined" label="Email address" />
```

## Icons

Text fields support leading and trailing icons to communicate context, clarify purpose, or provide auxiliary actions.

### Leading Icon

Leading icons appear before the input text, visually indicating the input purpose.

<!-- SLOT: DEMO_LEADING_ICON -->

```tsx
<TextField
  label="Search"
  leadingIcon="search-rounded"
/>
```

### Trailing Icon

Trailing icons appear after the input text, providing status feedback, contextual hints, or quick actions.

<!-- SLOT: DEMO_TRAILING_ICON -->

```tsx
<TextField
  label="Security Code"
  trailingIcon="info-outline-rounded"
/>
```

## Supporting Text

Supporting text appears beneath the input area to guide user input with hints, constraints, or secondary descriptions.

<!-- SLOT: DEMO_SUPPORTING -->

```tsx
<TextField
  label="Phone number"
  supportingText="Include country code, e.g. +1"
/>
```

## States

Text fields dynamically adapt their colors, borders, and interaction behaviors according to active user input and component state.

### Error

When `error` is set to `true`, the text field transitions its label, indicator line or outline, and supporting text to error tones.

<!-- SLOT: DEMO_ERROR -->

```tsx
<TextField
  label="Email"
  value="invalid-email"
  error
  supportingText="Enter a valid email address"
/>
```

### Disabled

When `disabled` is set to `true`, interaction is blocked, and container opacity adjusts to reflect an inactive state.

<!-- SLOT: DEMO_DISABLED -->

```tsx
<TextField
  label="Account ID"
  value="USR-94820"
  disabled
/>
```

## Props

The `TextField` component accepts the following properties:

### mode

`TextFieldMode`

The visual styling mode of the text field.

Default value: `"filled"`

### label

`string`

The floating label text. The label animates smoothly above the text entry area when the field is focused or contains text.

### value

`string`

The controlled value of the text input.

### onChangeText

`(text: string) => void`

Callback function invoked whenever the user modifies the text content.

### supportingText

`string`

Assistive text rendered below the input container for hints or error descriptions.

### leadingIcon

`IconSource`

Icon rendered at the leading edge of the input container. Accepts a built-in icon name string, a custom React component, or an SVG component.

### trailingIcon

`IconSource`

Icon rendered at the trailing edge of the input container. Accepts a built-in icon name string, a custom React component, or an SVG component.

### error

`boolean`

Applies error styling to the container, indicator line or outline, label, and supporting text.

Default value: `false`

### disabled

`boolean`

Disables user interaction and applies muted opacity styling to all field elements.

Default value: `false`

### style

`StyleProp<ViewStyle>`

Custom view styles applied to the outer wrapper container including supporting text.

### containerStyle

`StyleProp<ViewStyle>`

Custom view styles applied to the inner input box container.

### inputStyle

`StyleProp<TextStyle>`

Custom text styles applied directly to the underlying `TextInput` element.

### labelStyle

`StyleProp<TextStyle>`

Custom text styles applied to the animated floating label element.

## Inherited Props

In addition to the component-specific props above, `TextFieldProps` extends `Omit<TextInputProps, "style" | "defaultValue">`, offering full support for standard React Native text input capabilities such as `placeholder`, `secureTextEntry`, `keyboardType`, `autoCapitalize`, `autoCorrect`, `multiline`, `returnKeyType`, and native accessibility attributes.

## Types

Type definitions associated with the `TextField` component:

### TextFieldMode

Union type representing the available visual modes for text fields.

```typescript
type TextFieldMode = "filled" | "outlined";
```

### TextFieldProps

Interface defining all props accepted by the `TextField` component.

```typescript
interface TextFieldProps
  extends Omit<TextInputProps, "style" | "defaultValue"> {
  mode?: TextFieldMode;
  label?: string;
  supportingText?: string;
  leadingIcon?: IconSource;
  trailingIcon?: IconSource;
  disabled?: boolean;
  error?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
}
```

### TextFieldStyleConfig

Internal styling colors computed based on current theme, visual mode, and interaction states.

```typescript
interface TextFieldStyleConfig {
  containerColor: string;
  indicatorColorInactive: string;
  indicatorColorActive: string;
  labelColor: string;
  inputColor: string;
  supportingTextColor: string;
  iconColor: string;
  caretColor: string;
}
```
