# Chip

Chips help people enter information, make selections, filter content, or trigger actions. The library exports a unified `Chip` component controlled by a `variant` prop, along with dedicated `AssistChip`, `FilterChip`, `InputChip`, and `SuggestionChip` components (also accessible as `Chip.Assist`, `Chip.Filter`, `Chip.Input`, and `Chip.Suggestion`).

<!-- SLOT: DEMO_MAIN -->

## Usage

Import `Chip` from `react-native-materia`. You can render the unified `Chip` component with a `variant` prop (defaulting to `"assist"`), use dot-notation sub-components such as `Chip.Assist`, or import variant components like `AssistChip` directly. Wrap chips in a `View` with explicit alignment (see the Layout section below):

```tsx
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, useMateriaTokens } from "react-native-materia";
import type { Tokens } from "react-native-materia/types";

export const Example = () => {
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <View style={styles.chipGroup}>
      <Chip.Assist
        leadingIcon="add-rounded"
        onPress={() => console.log("Pressed")}
      >
        Assist
      </Chip.Assist>
    </View>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    chipGroup: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      gap: tokens.spacing.s,
    },
  });
```

## Variants

Chips are available in four semantic variants tailored to specific user interactions. Each variant applies dedicated color tokens and accessibility roles while sharing common sizing (`32dp` height, `8dp` corner radius) and ripple behavior.

### Assist

Assist chips trigger smart or automated actions related to primary screen content. They support an optional `leadingIcon` and `elevated` surface styling.

<!-- SLOT: DEMO_ASSIST -->

```tsx
<Chip.Assist leadingIcon="add-rounded" onPress={() => {}}>
  Add to calendar
</Chip.Assist>
<Chip.Assist leadingIcon="alarm-rounded" onPress={() => {}}>
  Set alarm
</Chip.Assist>
```

### Filter

Filter chips use descriptive labels to toggle filters over a collection. Setting `selected` to `true` switches the chip to a filled active container and displays a leading checkmark icon by default.

<!-- SLOT: DEMO_FILTER -->

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Chip } from "react-native-materia";

export const FilterExample = () => {
  const [recent, setRecent] = useState(true);
  const [favorites, setFavorites] = useState(false);

  return (
    <View style={styles.chipGroup}>
      <Chip.Filter
        selected={recent}
        onPress={() => setRecent((prev) => !prev)}
      >
        Recent
      </Chip.Filter>
      <Chip.Filter
        selected={favorites}
        onPress={() => setFavorites((prev) => !prev)}
      >
        Favorites
      </Chip.Filter>
    </View>
  );
};
```

### Input

Input chips represent discrete pieces of user-entered information such as contacts, categories, or search attributes. They support `selected`, `leadingIcon`, `trailingIcon`, and an `onClose` callback for removal, and do not support `elevated` styling.

<!-- SLOT: DEMO_INPUT -->

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Chip } from "react-native-materia";

export const InputExample = () => {
  const [tags, setTags] = useState(["React Native", "TypeScript"]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <View style={styles.chipGroup}>
      {tags.map((tag) => (
        <Chip.Input
          key={tag}
          selected={selectedTag === tag}
          onPress={() =>
            setSelectedTag((prev) => (prev === tag ? null : tag))
          }
          onClose={() =>
            setTags((prev) => prev.filter((item) => item !== tag))
          }
        >
          {tag}
        </Chip.Input>
      ))}
    </View>
  );
};
```

### Suggestion

Suggestion chips present dynamically generated recommendations or quick replies to help narrow user intent. They support `leadingIcon` and `elevated` surface styling.

<!-- SLOT: DEMO_SUGGESTION -->

```tsx
<Chip.Suggestion leadingIcon="search-rounded" onPress={() => {}}>
  Cafes nearby
</Chip.Suggestion>
<Chip.Suggestion leadingIcon="schedule-rounded" onPress={() => {}}>
  Open now
</Chip.Suggestion>
<Chip.Suggestion onPress={() => {}}>Outdoor seating</Chip.Suggestion>
```

## Layout

`Chip` follows standard React Native Flexbox rules from its parent container rather than forcing its own alignment. Placed directly inside a default column `View`, a chip stretches across the available width; inside a row with taller siblings, it stretches vertically unless aligned by the parent.

When rendering a group of chips, wrap them in a `View` with row wrapping, start- or center-aligned cross-axis positioning, and spacing from [Tokens](/about/tokens) (`8dp` or more keeps multi-row touch targets separated). For a standalone chip or a vertical list of chips, align children to the start on the parent `View` or override `alignSelf` via `style`.

<!-- SLOT: DEMO_LAYOUT -->

```tsx
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, useMateriaTokens } from "react-native-materia";
import type { Tokens } from "react-native-materia/types";

const TOPICS = [
  "Design Systems",
  "React Native",
  "Accessibility",
  "Animation",
  "Typography",
  "Theming",
];

export const ChipGroupExample = () => {
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "Design Systems",
    "React Native",
  ]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((item) => item !== topic)
        : [...prev, topic],
    );
  };

  return (
    <View style={styles.chipGroup}>
      {TOPICS.map((topic) => (
        <Chip.Filter
          key={topic}
          selected={selectedTopics.includes(topic)}
          onPress={() => toggleTopic(topic)}
        >
          {topic}
        </Chip.Filter>
      ))}
    </View>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    chipGroup: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      gap: tokens.spacing.s,
      maxWidth: 360,
    },
  });
```

## Elevation

`Assist`, `Filter`, and `Suggestion` chips accept an `elevated` prop. When enabled, the chip replaces its outline border with a solid surface container fill and adds subtle shadow elevation.

<!-- SLOT: DEMO_ELEVATED -->

```tsx
<Chip.Assist elevated onPress={() => {}}>
  Elevated Assist
</Chip.Assist>
<Chip.Filter elevated selected onPress={() => {}}>
  Elevated Filter
</Chip.Filter>
<Chip.Suggestion elevated onPress={() => {}}>
  Elevated Suggestion
</Chip.Suggestion>
```

## Icons and Trailing Actions

Chip icons render at `18dp`, and horizontal padding adjusts automatically when leading or trailing icons are present. Both `leadingIcon` and `trailingIcon` accept any `IconSource`; see [Iconography](/about/iconography) and [Icon](/components/icon) for details on built-in and custom icons.

### Leading Icons

Use `leadingIcon` to place a visual cue before the label. On `Filter` chips, when both `selected` and `showCheckmark` are enabled, the built-in checkmark replaces `leadingIcon`. Set `showCheckmark` to `false` to keep the custom `leadingIcon` visible while selected.

<!-- SLOT: DEMO_LEADING_ICON -->

```tsx
<Chip.Assist leadingIcon="add-rounded" onPress={() => {}}>
  Pair device
</Chip.Assist>
<Chip.Filter
  selected
  leadingIcon="wifi-rounded"
  onPress={() => {}}
>
  Wi-Fi
</Chip.Filter>
<Chip.Filter
  selected
  showCheckmark={false}
  leadingIcon="bluetooth-rounded"
  onPress={() => {}}
>
  Bluetooth
</Chip.Filter>
```

### Trailing Icons and Actions

On `Filter` chips, passing `trailingIcon` alone renders a static icon after the label. Supplying `onTrailingIconPress` turns the trailing icon into an independent circular action button with its own touch target, ripple feedback, and `trailingAccessibilityLabel`.

On `Input` chips, passing `onClose` renders a trailing remove button with a close icon by default, or a custom `trailingIcon` if specified. When `onClose` is provided without primary press handlers like `onPress`, the label surface stays static while the trailing button remains interactive.

<!-- SLOT: DEMO_TRAILING -->

```tsx
<Chip.Filter
  trailingIcon="keyboard-arrow-down-rounded"
  onPress={() => {}}
>
  Category
</Chip.Filter>
<Chip.Filter
  selected
  trailingIcon="close-rounded"
  trailingAccessibilityLabel="Clear price filter"
  onPress={() => {}}
  onTrailingIconPress={() => {}}
>
  Under $50
</Chip.Filter>
<Chip.Input
  leadingIcon="search-rounded"
  trailingIcon="delete-rounded"
  closeAccessibilityLabel="Delete saved search"
  onClose={() => {}}
>
  Saved: Headphones
</Chip.Input>
```

## States

Interactive chips display touch ripples along with hover and focus state layers. When no primary press handlers such as `onPress` or `onLongPress` are provided, the primary chip surface renders as a static view without ripple feedback.

### Disabled

Setting `disabled` to `true` blocks interaction on both the chip surface and any trailing action button, removes elevation shadows, and applies muted disabled styling.

<!-- SLOT: DEMO_DISABLED -->

```tsx
<Chip.Assist disabled>Disabled Assist</Chip.Assist>
<Chip.Assist elevated disabled>
  Disabled Elevated
</Chip.Assist>
<Chip.Filter selected disabled>
  Disabled Selected
</Chip.Filter>
<Chip.Input disabled onClose={() => {}}>
  Disabled Input
</Chip.Input>
```

## Accessibility

`Filter` chips use the `"checkbox"` accessibility role and report `checked` via `accessibilityState`. `Assist`, `Input`, and `Suggestion` chips use the `"button"` role when interactive, and `Input` chips also report `selected` in `accessibilityState`. Both `accessibilityRole` and `accessibilityState` can be overridden or extended via props.

To maintain a `48dp` minimum touch target over the `32dp` visual container, the primary chip surface expands its touch bounds vertically via `hitSlop` by default. Trailing action buttons also expand their touch target and supply default accessibility labels (`"More options"` for `Filter`, and `"Remove"` or `"Remove <label>"` for `Input`).

## Props

The `Chip` component family accepts the following properties:

### variant

`ChipVariant`

Determines the semantic variant and styling behavior when using the unified `Chip` component. TypeScript narrows variant-specific props based on this value.

Default value: `"assist"`

### children

`ReactNode`

Label text or custom content rendered inside the chip. String children render with `labelLarge` typography and single-line truncation.

### disabled

`boolean`

Disables touch interaction on both the primary chip area and any trailing action button, suppresses elevation, and applies disabled styling.

Default value: `false`

### leadingIcon

`IconSource`

Optional `18dp` icon rendered before the chip label. Accepts a registered icon name, a custom React component, or a render function.

### elevated

`boolean`

Replaces the outline border with an elevated surface fill and subtle shadow. Available on `"assist"`, `"filter"`, and `"suggestion"` variants.

Default value: `false`

### selected

`boolean`

Controls the active selection state, switching the chip to a filled active container and contrasting content color. Available on `"filter"` and `"input"` variants.

Default value: `false`

### showCheckmark

`boolean`

Controls whether a selected `Filter` chip displays the leading checkmark icon instead of `leadingIcon`. Available on the `"filter"` variant.

Default value: `true`

### trailingIcon

`IconSource`

Optional `18dp` icon rendered after the chip label. Available on `"filter"` and `"input"` variants. On `Input` chips, defaults to `"close-rounded"` when `onClose` is provided.

### onTrailingIconPress

`(e: GestureResponderEvent) => void`

Turns `trailingIcon` into an independent circular action button and invokes this callback when pressed. Available on the `"filter"` variant.

### trailingAccessibilityLabel

`string`

Accessibility label announced for the interactive trailing action button on a `Filter` chip. Available on the `"filter"` variant.

Default value: `"More options"`

### onClose

`(e: GestureResponderEvent) => void`

Callback invoked when the trailing remove button on an `Input` chip is pressed. Providing `onClose` enables the trailing button with a default close icon. Available on the `"input"` variant.

### closeAccessibilityLabel

`string`

Accessibility label announced for the trailing remove button on an `Input` chip. Available on the `"input"` variant.

Default value: `"Remove <children>"` when `children` is a string, or `"Remove"`

### style

`StyleProp<ViewStyle>`

Custom view styles applied to the outer chip container, such as alignment or sizing overrides. Border radius overrides are also applied to state layers and ripple clipping.

### labelStyle

`StyleProp<TextStyle>`

Custom text styles applied to the inner label text.

## Inherited Props

In addition to the component-specific props above, `BaseChipProps` extends `Omit<PressableProps, "style" | "children">`, providing full support for standard React Native interaction handlers and accessibility attributes such as `onPress`, `onLongPress`, `hitSlop`, `testID`, and `accessibilityLabel`.

## Types

Type definitions associated with the `Chip` components:

### ChipVariant

Union type representing the available semantic chip variants.

```typescript
type ChipVariant = "assist" | "filter" | "input" | "suggestion";
```

### BaseChipProps

Shared props extended by every chip variant interface.

```typescript
interface BaseChipProps extends Omit<PressableProps, "style" | "children"> {
  children: ReactNode;
  disabled?: boolean;
  leadingIcon?: IconSource;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}
```

### AssistChipProps

Props accepted by `AssistChip` and `Chip.Assist`.

```typescript
interface AssistChipProps extends BaseChipProps {
  elevated?: boolean;
}
```

### FilterChipProps

Props accepted by `FilterChip` and `Chip.Filter`.

```typescript
interface FilterChipProps extends BaseChipProps {
  selected?: boolean;
  elevated?: boolean;
  showCheckmark?: boolean;
  trailingIcon?: IconSource;
  onTrailingIconPress?: (e: GestureResponderEvent) => void;
  trailingAccessibilityLabel?: string;
}
```

### InputChipProps

Props accepted by `InputChip` and `Chip.Input`.

```typescript
interface InputChipProps extends BaseChipProps {
  selected?: boolean;
  trailingIcon?: IconSource;
  onClose?: (e: GestureResponderEvent) => void;
  closeAccessibilityLabel?: string;
}
```

### SuggestionChipProps

Props accepted by `SuggestionChip` and `Chip.Suggestion`.

```typescript
interface SuggestionChipProps extends BaseChipProps {
  elevated?: boolean;
}
```

### ChipProps

Discriminated union of props accepted by the unified `Chip` component.

```typescript
type ChipProps =
  | ({ variant?: "assist" } & AssistChipProps)
  | ({ variant: "filter" } & FilterChipProps)
  | ({ variant: "input" } & InputChipProps)
  | ({ variant: "suggestion" } & SuggestionChipProps);
```
