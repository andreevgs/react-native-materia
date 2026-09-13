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
- **JSDoc Standards for Types & Interfaces**:
  - Every interface, type alias, prop, and interface field MUST have a concise, single-line JSDoc comment (`/** ... */`).
  - Avoid bulky multi-line comment blocks (`/**\n * ...\n */`) for simple properties.
  - When describing physical dimensions (paddings, margins, sizes, radiuses, offsets), ALWAYS use **`dp`** (mobile-first), NEVER `px`.
  - When describing durations or intervals, ALWAYS use **`ms`**.
  - Always note default values for optional props (e.g., `Defaults to "none"`, `Defaults to 16dp`).
```typescript
import { ReactNode } from "react";
import { ViewStyle, StyleProp, PressableProps } from "react-native";
import { IconSource } from "../../types";

/** Visual presentation modes for the component. */
export type ComponentMode = "filled" | "outlined" | "elevated";

export interface ComponentNameProps extends Omit<PressableProps, "style"> {
  /** Text or element rendered inside the surface. */
  children?: ReactNode;
  /** Visual presentation mode. Defaults to `"filled"`. */
  mode?: ComponentMode;
  /** Whether interaction is disabled. Defaults to `false`. */
  disabled?: boolean;
  /** Custom style for the outer container. */
  style?: StyleProp<ViewStyle>;
  /** Horizontal padding inside the container in dp. Defaults to `16dp`. */
  paddingHorizontal?: number;
}

export interface ComponentNameStyleConfig {
  /** Background color for the current state. */
  backgroundColor: string;
  /** Content and text color for the current state. */
  textColor: string;
  /** Border stroke color for the current state. */
  borderColor: string;
  /** Color of the ripple wave and state layer. */
  rippleColor: string;
}
```

### 2.3. `utils.ts` (Pure Functions & Color Mapping)
**Rule**: UI components should NEVER contain complex inline ternary logic for resolving colors and states. All color mapping, opacity blending, and shadow calculations must be pure, testable functions in `utils.ts`.

- Use the `color` library to calculate alpha opacity based on `tokens.stateOpacity` (e.g., `pressed`, `hover`, `focus`, `disabledContainer`, `disabledContent`).
- Standard signature: `get<Component>Colors(mode, colors, tokens, disabled, ...): StyleConfig`.
- **No JSDoc in `utils.ts`**: Do NOT write JSDoc comments in `utils.ts`. Keep functions self-documenting through precise TypeScript types and descriptive names. JSDoc is strictly reserved for `types.ts` and `const.ts`.
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

### 2.4. `const.ts` (Constants, Specs & Platform Styles)
Use `const.ts` when the component relies on fixed dimensions, timing, spring curves, layout offsets, or platform styles:
1. **Spec Link**: If constants reflect MD3 specifications, include the spec URL in a header JSDoc `@see` comment.
2. **Anatomical Prefixes**: Prefix constants by the anatomical element they govern (e.g. `LABEL_*`, `NOTCH_*`, `STATE_LAYER_*`, `RIPPLE_*`, `SOFT_EDGE_*`).
3. **JSDoc Standards & Section Spacing**:
   - Group related constants into anatomical sections with clean comment headers, followed by an **empty line**:
     ```typescript
     // --- Section Name ---

     /** Description of the constant (units in dp or ms). */
     export const SECTION_CONSTANT_NAME = 15;
     ```
   - Use clean, single-line JSDoc comments (`/** ... */`) for each individual constant so that IDE hover tooltips show exact documentation.
   - When referencing measurements in comments, always use **`dp`** (mobile-first), not `px`.
   - When referencing durations, always use **`ms`**.
4. **Mandatory Static Platform Style Extraction**:
   - **Rule**: NEVER write inline `Platform.select({ web: ... })` inside JSX or component render functions.
   - Extract all static platform styles (such as web touch cursor, outline, and selection styles) into `const.ts`:
     ```typescript
     export const webTouchStyle: ViewStyle = Platform.select({
       web: {
         userSelect: "none",
         outlineStyle: "none",
         cursor: "pointer",
       },
       default: {},
     }) as ViewStyle;

     export const webDisabledStyle: ViewStyle = Platform.select({
       web: {
         cursor: "default",
       },
       default: {},
     }) as ViewStyle;
     ```
   - In `createStyles` or component JSX, simply spread or reference these pre-compiled styles: `style={[styles.container, webTouchStyle, disabled && styles.disabledWeb]}`.
   - This eliminates repetitive object creation at runtime, improves SSR/web stability, and keeps JSX declarative.
```typescript
/**
 * Layout constants for TextField based on MD3 specification.
 * @see https://m3.material.io/components/text-fields/specs
 */

// --- Label Specs ---

/** Scale factor applied to the label when floating. */
export const LABEL_SCALE = 0.75;

// --- Notch Specs ---

/** Horizontal padding for the notch on each side of the label text (8dp). */
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
   - **Static Extraction**: Extract web-specific styles into `const.ts` via `Platform.select` (e.g. `webTouchStyle` for `userSelect: "none"`, `outlineStyle: "none"`, `cursor: "pointer"`, and `webDisabledStyle` for `cursor: "default"`). Never inline `Platform.select` into JSX or render functions.
   - Ensure `userSelect: "none"` on touchable surfaces to prevent text selection during taps.

---

## 9. TypeScript Strictness (Zero-Pain Type Safety)

**Rule: If `unknown` or `any` (or `@ts-ignore`) can be avoided without pain, they MUST be avoided.**

Always prefer clean, idiomatic TypeScript solutions over type-widening or compiler suppression:
1. **No double casts via `as unknown as ...`**:
   Use intersection types (`Event & CustomEvent`) when extending standard native events with platform-specific fields:
   ```typescript
   interface WebPointerEvent {
     nativeEvent?: { pointerType?: string };
   }
   // Clean intersection instead of `e as unknown as { ... }`
   const nativeEvent = (e as MouseEvent & WebPointerEvent).nativeEvent;
   ```
2. **Targeted interfaces instead of `any` / `@ts-ignore`**:
   When checking optional DOM methods on Web event targets, declare a lightweight interface:
   ```typescript
   interface MatchableElement {
     matches?: (selector: string) => boolean;
   }
   const target = (e.currentTarget || e.target) as
     | (EventTarget & MatchableElement)
     | null
     | undefined;

   if (typeof target?.matches === "function") {
     return target.matches(":focus-visible");
   }
   ```
3. **Record indexing instead of `@ts-ignore`**:
   When dynamically populating an object by iterating over a list of typed keys:
   ```typescript
   // Use Record<string, T> instead of `@ts-ignore`
   (result as Record<string, string | number>)[prop] = val;
   ```
4. **Clean type narrowing instead of `unknown` / `any`**:
   Use TypeScript type guards (`typeof`, `in`, `instanceof`, `Array.isArray`) and optional chaining (`target?.matches`) to narrow down types cleanly without loose casting.

---

## 10. JSDoc & Documentation Standards

**Strict Scope Rule**: JSDoc comments MUST ONLY be written in `const.ts` and `types.ts`.
- **Allowed in**: `src/components/<ComponentName>/types.ts` and `src/components/<ComponentName>/const.ts`.
- **Forbidden in**: `<ComponentName>.tsx`, sub-components (`<SubComponent>.tsx`), `utils.ts`, and `index.ts`. Do not write JSDoc comments for React components, hooks, utility functions, or barrel exports; keep them clean and self-documenting through TypeScript types and clear naming.

### Formatting Rules for `types.ts` and `const.ts`:
1. **Single-line format**:
   Use `/** Concise description. */`. Avoid bulky multi-line blocks (`/**\n * ...\n */`) for simple props, type properties, and constants. Multi-line is reserved for header spec links (`@see ...`) in `const.ts`.
2. **100% Coverage in Scope**:
   Every exported interface, prop, type alias, and constant in `types.ts` and `const.ts` MUST have a JSDoc comment explaining its role.
3. **Units of Measurement**:
   - Physical dimensions (paddings, margins, sizes, radiuses, offsets): ALWAYS use **`dp`** (e.g. `8dp`, `16dp`), NEVER `px`. We are mobile-first.
   - Durations and intervals: ALWAYS use **`ms`** (e.g. `150ms`, `250ms`).
4. **Props & Interfaces (`types.ts`)**:
   - Explicitly state default values where applicable (e.g. `Defaults to "none"`, `Defaults to 0`).
5. **Constants (`const.ts`)**:
   - Group constants into anatomical sections with `// --- Section Name ---` headers.
   - Always leave an **empty blank line** between the section header and the first constant's JSDoc comment.
   - Use anatomical prefixes (e.g., `STATE_LAYER_*`, `RIPPLE_*`, `LABEL_*`, `NOTCH_*`).

