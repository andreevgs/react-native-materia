# Design Tokens

Design tokens represent the atomic visual and spatial decisions of Material Design 3 in React Native Materia. They establish a shared foundation for spacing, corner shapes, elevation shadows, state opacities, and animation timings across all components.

## Overview

Rather than relying on magic numbers or arbitrary pixel values, the library structures all dimensions through standardized scales. By leveraging design tokens, your application maintains a coherent spatial rhythm, consistent interaction feedback, and natural motion physics.

Tokens are provided through React context and should always be accessed via the `useMateriaTokens` hook.

## Using Tokens with StyleSheet

The recommended pattern for applying tokens to component styles is using a dedicated style factory function combined with `useMemo`.

Define a `createStyle` function outside the component that receives `Tokens` (and optionally `MateriaScheme` for theme colors) and returns a `StyleSheet.create` object. Inside the component, read tokens with `useMateriaTokens` and memoize the styles:

```tsx
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useMateriaTokens, useMateriaColors } from "react-native-materia";
import { Tokens, MateriaScheme } from "react-native-materia/types";

export const Card = () => {
  const tokens = useMateriaTokens();
  const colors = useMateriaColors();
  const styles = useMemo(() => createStyle(tokens, colors), [tokens, colors]);

  return <View style={styles.card} />;
};

const createStyle = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    card: {
      padding: tokens.spacing.l,
      borderRadius: tokens.shape.medium,
      backgroundColor: colors.surfaceContainer,
      gap: tokens.spacing.s,
    },
  });
```

This pattern offers significant architectural advantages. Because both tokens and theme colors live in `MateriaProvider` context, they share a consistent lifecycle and mental model. Wrapping the style factory in `useMemo` ensures `StyleSheet.create` executes only when dependencies change, avoiding style re-allocation on every render while maintaining full TypeScript safety.

## Spacing

The spacing scale is built on the standard 8dp baseline grid, with additional micro-spacing values for fine layout adjustments.

`spacing.none`: `0` density offset.

`spacing.xxs`: `2` density points, used for tight alignment corrections and fine-tuning.

`spacing.xs`: `4` density points, applied to compact element padding.

`spacing.xss`: `6` density points, an intermediate size for dense layouts.

`spacing.s`: `8` density points, the baseline unit of the grid scale.

`spacing.sm`: `10` density points, an intermediate gap size.

`spacing.m`: `12` density points, standard internal padding for cards and dialogs.

`spacing.l`: `16` density points, the standard screen margin and content gutter.

`spacing.xl`: `24` density points, used for major visual separations.

`spacing.xxl`: `32` density points, used between major content sections.

`spacing.xxxl`: `48` density points, used for large layout gaps.

`spacing.xxxxl`: `64` density points, used for significant hero whitespace.

## Shape

The shape scale defines corner radius values across seven standard sizes to communicate component hierarchy and containment.

`shape.none`: `0`, creating sharp rectangular corners.

`shape.extraSmall`: `4`, used for snackbars and text field active indicators.

`shape.small`: `8`, used for chips, compact cards, and rich tooltips.

`shape.medium`: `12`, the default radius for standard cards and small floating action buttons.

`shape.large`: `16`, used for navigation drawers and extended action buttons.

`shape.extraLarge`: `28`, used for modal dialogs and time picker surfaces.

`shape.full`: `9999`, creating stadium pill shapes for filled buttons, badges, and slider thumbs.

## Elevation

The elevation scale provides preconfigured cross-platform shadow styles across six elevation levels, mapping to Android `elevation` and iOS `shadowOffset`, `shadowOpacity`, and `shadowRadius`.

`elevation.level0`: elevation `0`, representing flat layout surfaces with zero shadow.

`elevation.level1`: elevation `1`, used for resting elevated cards and switch thumbs.

`elevation.level2`: elevation `3`, used for contained buttons and resting cards in hovered states.

`elevation.level3`: elevation `6`, used for dropdown menus, scrolled app bars, and dialogs.

`elevation.level4`: elevation `8`, used for high-priority dialogs and hovered floating action buttons.

`elevation.level5`: elevation `12`, used for modal bottom sheets and toast notifications.

Shadow colors are intentionally omitted from token definitions so you can combine elevation styles with `colors.shadow` or `colors.surfaceTint` from the active theme.

## State Opacities

Material Design 3 uses semi-transparent state layers placed over interactive surfaces to indicate interaction states without altering background colors.

`stateOpacity.hover`: `0.08` opacity, applied when pointers hover over elements on web or desktop.

`stateOpacity.focus`: `0.1` opacity, applied when keyboard or screen focus is active.

`stateOpacity.pressed`: `0.1` opacity, the standard intensity for touch ripples and pressed highlights.

`stateOpacity.dragged`: `0.16` opacity, applied when items are being dragged.

`stateOpacity.disabledContainer`: `0.12` opacity, the container background opacity for disabled elements.

`stateOpacity.disabledContent`: `0.38` opacity, the foreground text and icon opacity for disabled elements.

`stateOpacity.disabledFilledContainer`: `0.04` opacity, the lighter container opacity defined for filled inputs.

## Motion

The motion system provides duration tokens in milliseconds and cubic-bezier easing curves to coordinate natural UI choreography.

### Duration

Duration values range from quick micro-interactions to complex screen transitions.

`duration.short1` (`50` ms) to `duration.short4` (`200` ms) govern micro-animations like checkbox toggles and compact state morphs.

`duration.medium1` (`250` ms) to `duration.medium4` (`400` ms) handle component expansions, modal reveals, and standard view changes.

`duration.long1` (`450` ms) to `duration.long4` (`600` ms) are reserved for heavy layout shifts and full-screen transitions.

### Easing Curves

Cubic-bezier coordinate arrays allow creating smooth, non-linear timing curves.

`easing.emphasized`: `[0.2, 0.0, 0.0, 1.0]`, the default expressive curve with a snappy start and a soft decelerated landing.

`easing.emphasizedDecelerate`: `[0.05, 0.7, 0.1, 1.0]`, used for elements entering the screen.

`easing.emphasizedAccelerate`: `[0.3, 0.0, 0.8, 0.15]`, used for elements leaving the screen.

`easing.standard`: `[0.2, 0.0, 0.0, 1.0]`, utilitarian easing for on-screen state transitions.

`easing.standardDecelerate`: `[0.0, 0.0, 0.0, 1.0]`, utilitarian incoming curve.

`easing.standardAccelerate`: `[0.3, 0.0, 1.0, 1.0]`, utilitarian outgoing curve.

`easing.linear`: `[0.0, 0.0, 1.0, 1.0]`, constant velocity transition.

## Icon Sizes

Standardized icon dimensions are defined under `tokens.iconSize`:

`iconSize["18dp"]`: `18` density points, standard for chip leading icons.

`iconSize["20dp"]`: `20` density points, standard for button icons.

`iconSize["24dp"]`: `24` density points, the default size for standalone icons, text field adornments, and navigation items.

`iconSize["40dp"]`: `40` density points, used for avatar placeholders and medium graphics.

`iconSize["48dp"]`: `48` density points, used for hero icons and empty states.

## Related Links

Explore more in the [Provider Guide](/about/provider), [Theming Guide](/about/theming), [Typography](/about/typography), and [Iconography](/about/iconography) sections.
