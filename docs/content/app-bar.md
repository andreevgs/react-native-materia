# AppBar

App bars appear at the top of the screen to display navigation actions, screen titles, and contextual tools. They implement the Material Design 3 top app bar specification with automatic safe area insets, slot-based content composition, and smooth background color morphing on scroll.

<!-- SLOT: DEMO_MAIN -->

## Usage

Import `AppBar` from `react-native-materia` along with `IconButton` for navigation controls:

```tsx
import React from "react";
import { AppBar, IconButton } from "react-native-materia";

export const Example = () => (
  <AppBar
    headline="App Bar"
    leading={
      <IconButton
        icon="arrow-back-rounded"
        onPress={() => {}}
      />
    }
  />
);
```

## Slots

The `AppBar` layout is structured into dedicated slots for leading controls, central titles, and trailing action items.

### Leading

The leading slot hosts primary navigation actions, such as a drawer menu trigger or a back navigation button.

<!-- SLOT: DEMO_LEADING -->

```tsx
<AppBar
  headline="App Bar"
  leading={
    <IconButton
      icon="menu-rounded"
      onPress={() => {}}
    />
  }
/>
```

### Headline and Subtitle

The central content slot accepts both `headline` and `subtitle`. Passing strings automatically styles the title with the `titleLarge` typography role and the subtitle with `labelMedium`.

<!-- SLOT: DEMO_SUBTITLE -->

```tsx
<AppBar
  headline="App Bar"
  subtitle="With Subtitle"
  leading={
    <IconButton
      icon="arrow-back-rounded"
      onPress={() => {}}
    />
  }
/>
```

### Trailing

The trailing slot positions secondary contextual actions. When multiple actions are provided, they arrange horizontally with standardized token spacing.

<!-- SLOT: DEMO_TRAILING -->

```tsx
<AppBar
  headline="App Bar"
  subtitle="With Subtitle"
  leading={
    <IconButton
      icon="arrow-back-rounded"
      onPress={() => {}}
    />
  }
  trailing={
    <>
      <IconButton
        icon="check-rounded"
        onPress={() => {}}
      />
      <IconButton
        icon="close-rounded"
        onPress={() => {}}
      />
    </>
  }
/>
```

## Scroll State

When content scrolls underneath the top app bar, setting `isScrolled` to `true` smoothly morphs the background color from `colors.surface` to `colors.surfaceContainer` using Reanimated timing transitions. This creates visual separation between the app bar and scrolling content without harsh border lines.

In practice, bind `isScrolled` to the scroll position of your `ScrollView` or `FlatList` by checking if the scroll offset is greater than zero:

<!-- SLOT: DEMO_SCROLLED -->

```tsx
import React, { useState } from "react";
import { View, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { AppBar, IconButton } from "react-native-materia";

export const ScrolledAppBarExample = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrolled(offsetY > 0);
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        headline="App Bar"
        subtitle="With Subtitle"
        isScrolled={isScrolled}
        leading={
          <IconButton
            icon="arrow-back-rounded"
            onPress={() => {}}
          />
        }
        trailing={
          <>
            <IconButton
              icon="check-rounded"
              onPress={() => {}}
            />
            <IconButton
              icon="close-rounded"
              onPress={() => {}}
            />
          </>
        }
      />
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={{ height: 600 }} />
      </ScrollView>
    </View>
  );
};
```

## Safe Area Support

The component integrates with `react-native-safe-area-context` to automatically detect device notch and status bar heights. It applies top safe area insets to `paddingTop` and `minHeight` so screen headers remain clear of device hardware cutouts without manual margin calculations.

## Props

The `AppBar` component accepts the following properties:

### headline

`string | ReactNode`

The main title displayed in the app bar. Passing a string renders it with `titleLarge` typography and single-line truncation.

### subtitle

`string | ReactNode`

Optional secondary text displayed beneath the headline. Passing a string renders it with `labelMedium` typography and single-line truncation.

### leading

`ReactNode`

Component rendered at the start of the app bar, typically an `IconButton` for navigation.

### trailing

`ReactNode`

Component or fragment containing actions rendered at the end of the app bar.

### isScrolled

`boolean`

Whether the underlying scroll view is scrolled. When `true`, transitions the background from `colors.surface` to `colors.surfaceContainer`.

Default value: `false`

### style

`StyleProp<ViewStyle>`

Custom view styles applied to the outer animated container.

## Types

Type definitions associated with the `AppBar` component:

### AppBarProps

Interface defining all properties accepted by the `AppBar` component.

```typescript
interface AppBarProps {
  leading?: ReactNode;
  trailing?: ReactNode;
  headline?: string | ReactNode;
  subtitle?: string | ReactNode;
  style?: StyleProp<ViewStyle>;
  isScrolled?: boolean;
}
```
