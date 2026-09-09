---
name: Develop Components
description: Architecture, file organization, decomposition patterns, and styling standards for developing UI components in react-native-materia.
---

# Component Development Guide for react-native-materia

When implementing, refactoring, or extending UI components in `src/components/`, strictly follow the Material Design 3 (MD3) architecture and code decomposition conventions established in `react-native-materia`.

---

## 1. Directory & File Structure

Every component MUST reside in its own dedicated directory under `src/components/<ComponentName>/`.
Never create monolithic single-file components.

```
src/components/<ComponentName>/
├── index.ts              # Clean public barrel export (component + public types)
├── types.ts              # Props interfaces, mode unions, style config types, ref types
├── utils.ts              # Pure helper functions: color calculation, shadows, platform tweaks
├── const.ts              # (Optional) Dimensions, animation configs, spec constants
├── <ComponentName>.tsx   # Main component implementation
└── <SubComponent>.tsx    # (Optional) Decomposed sub-components for complex visual/animated parts
```

And register the component in the top-level barrel export:
- `src/components/index.ts`: `export * from "./<ComponentName>";`

---

## 2. File Responsibilities & Patterns

### 2.1. `index.ts`
Only export what consumers of the library should access:
```typescript
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps, ComponentNameMode } from "./types";
```

### 2.2. `types.ts`
- Extend base React Native types with `Omit` where applicable (e.g. `Omit<PressableProps, "style">`).
- Define union types for variants/modes (e.g., `export type ButtonMode = "filled" | "tonal" | "outlined" | "elevated" | "text";`).
- Define style config interfaces (e.g., `<ComponentName>StyleConfig`) representing the resolved colors, borders, and ripples for the current state.
```typescript
import { ReactNode } from "react";
import { ViewStyle, StyleProp, PressableProps } from "react-native";
import { IconSource } from "../../types";

export type ComponentMode = "filled" | "outlined" | "elevated";

export interface ComponentNameProps extends Omit<PressableProps, "style"> {
  children?: ReactNode;
  mode?: ComponentMode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  // ...
}

export interface ComponentNameStyleConfig {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  rippleColor: string;
}
```

### 2.3. `utils.ts` (Pure Functions & Color Mapping)
**Rule**: UI components should NEVER contain complex inline ternary logic for resolving colors and states. All color mapping, opacity blending, and shadow calculations must be pure, testable functions in `utils.ts`.

- Use the `color` library to calculate alpha opacity based on `tokens.stateOpacity` (e.g., `pressed`, `hover`, `focus`, `disabledContainer`, `disabledContent`).
- Standard signature: `get<Component>Colors(mode, colors, tokens, disabled, ...): StyleConfig`.
```typescript
import Color from "color";
import { ComponentMode, ComponentNameStyleConfig } from "./types";
import { MateriaScheme, Tokens } from "../../core/theme/types";

export const getComponentColors = (
  mode: ComponentMode,
  colors: MateriaScheme,
  tokens: Tokens,
  disabled: boolean,
): ComponentNameStyleConfig => {
  if (disabled) {
    const disabledContainer = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledContainer)
      .rgb()
      .string();
    const disabledContent = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledContent)
      .rgb()
      .string();

    return {
      backgroundColor: mode === "filled" ? disabledContainer : "transparent",
      textColor: disabledContent,
      borderColor: mode === "outlined" ? disabledContainer : "transparent",
      rippleColor: "transparent",
    };
  }

  const map: Record<ComponentMode, ComponentNameStyleConfig> = {
    filled: {
      backgroundColor: colors.primary,
      textColor: colors.onPrimary,
      borderColor: "transparent",
      rippleColor: Color(colors.onPrimary)
        .alpha(tokens.stateOpacity.pressed)
        .rgb()
        .string(),
    },
    // ...
  };

  return map[mode];
};

export const getComponentShadowStyle = (
  isElevated: boolean,
  tokens: Tokens,
  colors: MateriaScheme,
) =>
  isElevated
    ? { ...tokens.elevation.level1, shadowColor: colors.shadow }
    : tokens.elevation.level0;
```

### 2.4. `const.ts` (Constants & MD3 Specs)
Use `const.ts` when the component relies on fixed dimensions, timing, spring curves, or layout offsets:
- If the constants or behaviors directly reflect values dictated by the official Material Design 3 specification, include the spec URL in a JSDoc `@see` comment. Do not add spec links if the constants are internal implementation details.
```typescript
/**
 * Layout constants for TextField based on MD3 specification.
 * @see https://m3.material.io/components/text-fields/specs
 */
export const LABEL_SCALE = 0.75;
export const NOTCH_PADDING = 8;
```

---

## 3. Functional Decomposition Rules

When a component contains multiple visual layers, distinct animations, or compound roles, **decompose into sub-components**:

1. **Self-Contained Visual Parts**:
   - Outlines & notches: e.g., `TextFieldOutline.tsx`
   - Floating labels: e.g., `TextFieldLabel.tsx`
   - State indicators / underlines: e.g., `TextFieldIndicator.tsx`
   - Supporting / helper text transitions: e.g., `TextFieldSupportingText.tsx`
   - Compound items: e.g., `ListItem.tsx`, `NavigationBarItem.tsx`
2. **Polymorphic Slot Normalization**:
   - Extract slot renderers (e.g., `TextSlot.tsx` in `AppBar`) to handle `string | ReactNode` uniformly.
3. **Core vs Variant Separation**:
   - Extract gesture and sheet presentation engine into `BottomSheetCore.tsx`, and expose `BottomSheet.tsx` and `ModalBottomSheet.tsx` as lightweight wrappers.

---

## 4. Theme & Token Integration

Always access design tokens through the core hooks:
```typescript
import {
  useMateriaColors,
  useMateriaTokens,
  useMateriaTypography,
  useMateriaIconography,
} from "../../core";
```
- **Colors**: Access semantic colors (`colors.primary`, `colors.onSurface`, `colors.surfaceContainer`, etc.).
- **Spacing & Shapes**: Use `tokens.spacing.<xs|s|m|l|xl>`, `tokens.shape.<small|medium|full>`.
- **Icon Sizes**: Use `tokens.iconSize["18dp" | "20dp" | "24dp"]`.
- **Elevation**: Use `tokens.elevation.level0` through `level5`.
- **Typography**: Apply via `<MateriaText variant="...">` or `typography[variant]`.
- **Explicit Dimensions**: Explicit `width` or `height` (e.g., `minHeight: 64 + insets.top`, `minWidth: 64`) may be hardcoded when strictly necessary for the component layout, but always prioritize existing tokens (`tokens.spacing.*`, `tokens.buttonScale.*`, `tokens.chipScale.*`, `tokens.iconButtonScale.*`).

---

## 5. Interaction & State Layering (`TouchableRipple`)

For pressable surfaces:
1. Wrap interactive areas in `TouchableRipple`:
   ```tsx
   <TouchableRipple
     onPress={onPress}
     disabled={disabled}
     rippleColor={textColor}
     style={styles.touchable}
     contentContainerStyle={styles.content}
     contentPointerEvents="none"
     {...props}
   >
     {children}
   </TouchableRipple>
   ```
2. Set `contentPointerEvents="none"` on the inner content container to prevent nested elements from intercepting touch gestures meant for the ripple.
3. Pass `rippleColor` matching the contrasting text/icon color.
4. Let `TouchableRipple` handle native Android ripples, Reanimated fallbacks on iOS/Web, and `:focus-visible` detection on Web.

---

## 6. Animations (Reanimated Guidelines)

1. **Shared Values & Animated Styles**:
   ```typescript
   const progress = useSharedValue(isActive ? 1 : 0);
   ```
2. **Standard MD3 Timing & Spread Easing**:
   Use `tokens.duration.*` and spread `tokens.easing.*`:
   ```typescript
   const bezier = Easing.bezier(...tokens.easing.standard);

   progress.value = withTiming(isActive ? 1 : 0, {
     duration: tokens.duration.short3,
     easing: bezier,
   });
   ```
3. **JS Thread Callbacks**:
   Always wrap callbacks passed to animation completion handlers in `runOnJS`:
   ```typescript
   withTiming(0, { duration: 200 }, (finished) => {
     if (finished && onFinished) {
       runOnJS(onFinished)();
     }
   });
   ```

---

## 7. Performance & Style Architecture

1. **StyleSheet Factory**:
   Declare `createStyles` at the bottom of the file outside the component function:
   ```typescript
   const createStyles = (tokens: Tokens) =>
     StyleSheet.create({
       container: {
         borderRadius: tokens.shape.full,
         // ...
       },
     });
   ```
2. **Memoization**:
   Always memoize styles, color configurations, and shadow styles:
   ```typescript
   const styles = useMemo(() => createStyles(tokens), [tokens]);
   const colorsConfig = useMemo(
     () => getComponentColors(mode, colors, tokens, disabled),
     [mode, colors, tokens, disabled],
   );
   const shadowStyle = useMemo(
     () => getComponentShadowStyle(isElevated, tokens, colors),
     [isElevated, tokens, colors],
   );
   ```

---

## 8. Accessibility (a11y) & Cross-Platform

1. **Accessibility Props**:
   - Provide `accessibilityRole` (e.g. `"button"`, `"tab"`, `"checkbox"`).
   - Supply `accessibilityState={{ disabled, selected: isActive }}`.
   - For decorative icons or icons next to text, hide them from the screen reader:
     `accessibilityElementsHidden={true}` and `importantForAccessibility="no-hide-descendants"`.
2. **Web Adaptations**:
   - Use `Platform.select` for web-specific styling (e.g., removing text input outlines: `outlineStyle: "none"`).
   - Ensure `userSelect: "none"` on touchable surfaces.
