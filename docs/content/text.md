# Text

The `Text` component is represented in code as `MateriaText` to avoid collisions with the React Native built-in `Text` element. It seamlessly integrates with the Material Design 3 type scale, automatically resolving font metrics, line heights, letter spacing, and applying `colors.onSurface` from the active theme.

<!-- SLOT: DEMO_MAIN -->

## Usage

Import `MateriaText` from `react-native-materia`. When rendered without an explicit variant, the component defaults to the standard `"bodyMedium"` style:

```tsx
import React from "react";
import { MateriaText } from "react-native-materia";

export const Example = () => (
  <MateriaText>Default body medium text</MateriaText>
);
```

## Variants

Material Design 3 organizes typography into five distinct roles: display, headline, title, body, and label. Each role contains three size levels: large, medium, and small, providing fifteen typographic variants.

To configure custom fonts, static font assets, or tune letter spacing across all variants, visit the [Typography](/about/typography) guide.

### Display

Display styles represent the largest text on screen. They are reserved for prominent, short numbers or expressive headlines on larger displays.

<!-- SLOT: DEMO_DISPLAY -->

```tsx
<MateriaText variant="displayLarge">Display Large</MateriaText>
<MateriaText variant="displayMedium">Display Medium</MateriaText>
<MateriaText variant="displaySmall">Display Small</MateriaText>
```

### Headline

Headline styles are high-emphasis typographic elements suited for major screen sections and key content headers.

<!-- SLOT: DEMO_HEADLINE -->

```tsx
<MateriaText variant="headlineLarge">Headline Large</MateriaText>
<MateriaText variant="headlineMedium">Headline Medium</MateriaText>
<MateriaText variant="headlineSmall">Headline Small</MateriaText>
```

### Title

Title styles provide medium-emphasis headers across application views, including list group headers, card titles, and top app bars.

<!-- SLOT: DEMO_TITLE -->

```tsx
<MateriaText variant="titleLarge">Title Large</MateriaText>
<MateriaText variant="titleMedium">Title Medium</MateriaText>
<MateriaText variant="titleSmall">Title Small</MateriaText>
```

### Body

Body styles are designed for longer passages of text, descriptions, dialogue, and article content where legibility is paramount.

<!-- SLOT: DEMO_BODY -->

```tsx
<MateriaText variant="bodyLarge">Body Large</MateriaText>
<MateriaText variant="bodyMedium">Body Medium</MateriaText>
<MateriaText variant="bodySmall">Body Small</MateriaText>
```

### Label

Label styles are utilitarian styles applied to button text, chips, input field labels, tabs, and concise auxiliary captions.

<!-- SLOT: DEMO_LABEL -->

```tsx
<MateriaText variant="labelLarge">Label Large</MateriaText>
<MateriaText variant="labelMedium">Label Medium</MateriaText>
<MateriaText variant="labelSmall">Label Small</MateriaText>
```

## Colors and Styling

By default, `MateriaText` inherits the primary content color `colors.onSurface` from the active theme. You can tint text using colors from `useMateriaColors()` or override styling via the `style` prop.

<!-- SLOT: DEMO_COLORS -->

```tsx
import React from "react";
import { MateriaText, useMateriaColors } from "react-native-materia";

export const ColoredTextExample = () => {
  const colors = useMateriaColors();

  return (
    <>
      <MateriaText variant="bodyMedium" style={{ color: colors.primary }}>
        Primary colored text
      </MateriaText>
      <MateriaText variant="bodyMedium" style={{ color: colors.error }}>
        Error colored text
      </MateriaText>
      <MateriaText variant="bodyMedium" style={{ color: colors.onSurfaceVariant }}>
        Secondary variant text
      </MateriaText>
    </>
  );
};
```

## Accessibility

Accessibility font scaling is enabled by default. The component sets `maxFontSizeMultiplier` to `1.5`, allowing text to grow dynamically according to user OS font size preferences while safeguarding screen layouts against severe clipping and overlapping.

You can customize or lift this ceiling by specifying `maxFontSizeMultiplier` directly on the component:

```tsx
<MateriaText variant="bodyMedium" maxFontSizeMultiplier={2.0}>
  Accessible scalable text
</MateriaText>
```

## Props

The `MateriaText` component accepts the following properties:

### variant

`TypographyVariant`

The typographic scale variant applied to the text. Determines font family, font size, line height, font weight, and letter spacing.

Default value: `"bodyMedium"`

### style

`StyleProp<TextStyle>`

Custom text styles applied to the element. Allows overriding font size, line height, color, text alignment, margins, or any other standard React Native text styling attribute.

### children

`ReactNode`

The text string or nested elements rendered inside the component.

## Inherited Props

In addition to the component-specific props above, `MateriaTextProps` extends standard React Native `TextProps`, providing full support for native props such as `numberOfLines`, `ellipsizeMode`, `onPress`, `onLongPress`, `selectable`, `testID`, and accessibility attributes.

## Types

Type definitions associated with the `MateriaText` component:

### MateriaTextProps

Interface defining all properties accepted by the `MateriaText` component.

```typescript
interface MateriaTextProps extends TextProps {
  variant?: TypographyVariant;
}
```

### TypographyVariant

Union type representing all fifteen available typographic variant names in the Material Design 3 scale.

```typescript
type TypographyVariant =
  | "displayLarge"
  | "displayMedium"
  | "displaySmall"
  | "headlineLarge"
  | "headlineMedium"
  | "headlineSmall"
  | "titleLarge"
  | "titleMedium"
  | "titleSmall"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall"
  | "labelLarge"
  | "labelMedium"
  | "labelSmall";
```
