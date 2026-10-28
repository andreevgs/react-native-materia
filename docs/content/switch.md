# Switch

Switches toggle the state of a single setting on or off. They provide immediate binary control following the Material Design 3 specification, with organic thumb morphing, state layer expansion, and smooth color interpolation.

<!-- SLOT: DEMO_MAIN -->

## Usage

Import `Switch` from `react-native-materia` and provide `value` and `onValueChange`:

```tsx
import React, { useState } from "react";
import { Switch } from "react-native-materia";

export const Example = () => {
  const [checked, setChecked] = useState(false);

  return <Switch value={checked} onValueChange={setChecked} />;
};
```

## States

Switches adapt their visual appearance across active, inactive, and disabled states.

### Selected and Unselected

When unselected, the switch renders an outlined track with a smaller 16dp thumb. When toggled on, the thumb smoothly expands to 24dp, stretches dynamically during motion, and settles with high-contrast primary colors.

<!-- SLOT: DEMO_STATES -->

```tsx
<Switch value={false} onValueChange={() => {}} />
<Switch value={true} onValueChange={() => {}} />
```

### Disabled

When `disabled` is set to `true`, the switch ignores touch events and transitions its track, border, and thumb to low-contrast disabled tokens.

<!-- SLOT: DEMO_DISABLED -->

```tsx
<Switch value={false} onValueChange={() => {}} disabled />
<Switch value={true} onValueChange={() => {}} disabled />
```

### Controlled Press

When embedding a switch inside a compound control such as a settings `List.Item`, the entire row is interactive. Passing the `pressed` prop allows synchronizing the thumb expansion with the parent surface gestures using `onPressIn` and `onPressOut`.

<!-- SLOT: DEMO_PRESSED -->

```tsx
import React, { useState } from "react";
import { List, Switch, Icon } from "react-native-materia";

export const CompoundSwitchExample = () => {
  const [enabled, setEnabled] = useState(true);
  const [pressed, setPressed] = useState(false);

  return (
    <List.Item
      headline="Wi-Fi"
      supportingText="Connected to Network"
      leadingContent={<Icon source="wifi-rounded" />}
      trailingContent={
        <Switch value={enabled} pressed={pressed} onValueChange={() => {}} />
      }
      onPress={() => setEnabled((v) => !v)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    />
  );
};
```

## Props

The `Switch` component accepts the following properties:

### value

`boolean`

The active toggle state of the switch. When `true`, the switch is in the selected state.

### onValueChange

`(value: boolean) => void`

Callback function invoked when the switch is tapped, passing the inverted boolean state.

### disabled

`boolean`

Whether user interaction is disabled.

Default value: `false`

### style

`StyleProp<ViewStyle>`

Custom view styles applied to the outer touchable pressable container.

### pressed

`boolean`

Optional manual override for the pressed thumb expansion animation. Useful for synchronizing press state with a parent touchable element such as `List.Item`. When omitted, press state is tracked automatically by user touches.

## Types

Type definitions associated with the `Switch` component:

### SwitchProps

Interface defining all properties accepted by the `Switch` component.

```typescript
interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  pressed?: boolean;
}
```
