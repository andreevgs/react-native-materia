# List

Lists are continuous, vertical indexes of text or images. They present multiple line items in a vertical format.

<!-- SLOT: DEMO_MAIN -->

## Usage

Import the `List` component from `react-native-materia` to build vertical lists. The `List.Item` sub-component is used to render individual rows:

```tsx
import { List } from "react-native-materia";

export const Example = () => (
  <List>
    <List.Item headline="Item 1" />
    <List.Item headline="Item 2" />
  </List>
);
```

## Variants

Lists can be displayed in standard or segmented formats to suit different organizational needs.

### Standard

The default unstyled list format, suitable for seamless vertical collections.

<!-- SLOT: DEMO_STANDARD -->

```tsx
<List variant="standard">
  <List.Item headline="Standard Item 1" />
  <List.Item headline="Standard Item 2" />
</List>
```

### Segmented

A segmented list that visually groups items together with subtle surface backgrounds and rounded corners. Suitable for settings screens and grouped preferences.

<!-- SLOT: DEMO_SEGMENTED -->

```tsx
<List variant="segmented">
  <List.Item headline="Segmented Item 1" />
  <List.Item headline="Segmented Item 2" />
</List>
```

## Content Slots

List items can be customized with leading and trailing content, as well as secondary supporting text.

Use `leadingContent` and `trailingContent` to embed icons, switches, or avatars, and `supportingText` for descriptive secondary information.

<!-- SLOT: DEMO_CONTENT -->

```tsx
<List variant="segmented">
  <List.Item
    headline="Wi-Fi"
    supportingText="Connected to Network"
    leadingContent={<Icon source="wifi-rounded" />}
    trailingContent={<Switch value={true} onValueChange={() => {}} />}
  />
  <List.Item
    headline="Bluetooth"
    supportingText="Off"
    leadingContent={<Icon source="bluetooth-rounded" />}
    trailingContent={<Switch value={false} onValueChange={() => {}} />}
  />
</List>
```

## List Props

The `List` component accepts the following properties:

### children

`ReactNode`

The content elements of the list, typically one or more `List.Item` components.

### variant

`ListVariant`

Defines the visual variant of the list. Accepts `"standard"` or `"segmented"`.

Default value: `"standard"`

### style

`StyleProp<ViewStyle>`

Custom view styles applied to the outer list container.

## List.Item Props

The `List.Item` component accepts the following properties:

### headline

`string`

The primary text label of the list item.

### supportingText

`string`

Secondary descriptive text displayed below the headline.

### leadingContent

`ReactNode`

Component or element displayed at the start of the item, such as an icon, checkbox, or avatar.

### trailingContent

`ReactNode`

Component or element displayed at the end of the item, such as a switch, icon, or value text.

### pressDelay

`number`

Delay in milliseconds before the ripple touch effect begins. Recommended for scrollable lists to prevent accidental ripple triggers during scroll gestures.

## Inherited Props

In addition to the component-specific props above, `ListItemProps` extends `Omit<TouchableRippleProps, "children">`, providing full support for standard touch interaction and accessibility properties such as `onPress`, `onLongPress`, `disabled`, and `accessibilityLabel`.

## Types

Type definitions associated with the `List` and `List.Item` components:

### ListVariant

Union type representing available list visual variants.

```typescript
type ListVariant = "standard" | "segmented";
```

### ListProps

Properties accepted by the parent `List` component.

```typescript
interface ListProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: "standard" | "segmented";
}
```

### ListItemProps

Properties accepted by `List.Item`.

```typescript
interface ListItemProps extends Omit<TouchableRippleProps, "children"> {
  headline: string;
  supportingText?: string;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  pressDelay?: number;
}
```
