/**
 * Design Tokens for Materia UI Library.
 * * This file contains the foundational values for the design system, including
 * spacing, shapes, elevation (shadows), and interaction state opacities.
 * * These tokens are implementation-agnostic and strictly follow Material Design 3 guidelines.
 * * @module core/theme/tokens
 */

// ---------------------------------------------------------------------------
// 1. SPACING
// ---------------------------------------------------------------------------

/**
 * Spacing tokens based on the 8dp baseline grid (with 4dp for smaller nuances).
 * * Material Design uses a consistent spacing scale to assist in the alignment
 * of layouts. The baseline grid is 8dp.
 * * @see https://m3.material.io/foundations/layout/understanding-layout/spacing
 */
export const spacing = {
  /** No spacing (0dp) */
  none: 0,
  /** Extra extra small spacing (2dp) - Rare, for fine-tuning */
  xxs: 2,
  /** Extra small spacing (4dp) - Used for small elements */
  xs: 4,
  /** Small spacing (8dp) - Base unit */
  s: 8,
  /** Medium spacing (12dp) - Often used for internal padding */
  m: 12,
  /** Large spacing (16dp) - Standard content padding (screen edges) */
  l: 16,
  /** Extra large spacing (24dp) */
  xl: 24,
  /** Extra extra large spacing (32dp) */
  xxl: 32,
  /** (48dp) - Used for large gaps */
  xxxl: 48,
  /** (64dp) - Significant whitespace */
  xxxxl: 64,
} as const;

// ---------------------------------------------------------------------------
// 2. SHAPE (CORNER RADIUS)
// ---------------------------------------------------------------------------

/**
 * Shape scale tokens for component corner rounding.
 * * Material Design 3 categorizes shapes by size (XS to XL) and Full (Stadium).
 * * @see https://m3.material.io/styles/shape/corner-radius-scale
 */
export const shape = {
  /** Rectangular shape (0dp) */
  none: 0,
  /** * Extra small rounding (4dp).
   * Used for: Autocomplete menu, Snackbars (sometimes), Text fields (active indicator).
   */
  extraSmall: 4,
  /** * Small rounding (8dp).
   * Used for: Chips, Rich tooltips, Cards (compact).
   */
  small: 8,
  /** * Medium rounding (12dp).
   * Used for: Cards (default), Small FABs.
   */
  medium: 12,
  /** * Large rounding (16dp).
   * Used for: Navigation drawers, Large FABs, Extended FABs.
   */
  large: 16,
  /** * Extra large rounding (28dp).
   * Used for: Dialogs, Time pickers, Large FABs.
   */
  extraLarge: 28,
  /** * Full rounding (9999dp).
   * Used for: Buttons (Stadium shape), Badges, Sliders, Switch.
   */
  full: 9999,
} as const;

// ---------------------------------------------------------------------------
// 3. ELEVATION (SHADOWS)
// ---------------------------------------------------------------------------

/**
 * Elevation levels mapping to platform-specific shadow styles.
 * * MD3 defines 6 levels of elevation (0-5).
 * * Note regarding iOS: The `shadowColor` property is intentionally omitted or set to generic
 * because it should be supplied by the active theme (e.g., `theme.colors.shadow`).
 * * @see https://m3.material.io/styles/elevation/tokens
 */
export const elevation = {
  /** Level 0: No elevation. Used for flat layouts. */
  level0: {
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  /** * Level 1.
   * Used for: Cards (elevated), Switch (thumb).
   */
  level1: {
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  /** * Level 2.
   * Used for: Contained Buttons, Cards (hover/focus).
   * Note: Android elevation 3 is roughly equivalent to MD3 Level 2 visually.
   */
  level2: {
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  /** * Level 3.
   * Used for: Dropdown menus, Top App Bar (scrolled), Dialogs.
   */
  level3: {
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  /** * Level 4.
   * Used for: Dialogs (high priority), FAB (hover).
   */
  level4: {
    elevation: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.24,
    shadowRadius: 2.62,
  },
  /** * Level 5.
   * Used for: Modal sheets, Toast notifications.
   */
  level5: {
    elevation: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.26,
    shadowRadius: 3.0,
  },
} as const;

// ---------------------------------------------------------------------------
// 4. STATE LAYERS (OPACITY)
// ---------------------------------------------------------------------------

/**
 * Opacity values for state layers (visual indicators for interactions).
 * * These values represent the alpha channel applied to the State Layer color
 * (usually Primary or OnSurface) overlaid on top of the content.
 * * @see https://m3.material.io/foundations/interaction/states/applying-states
 */
export const stateOpacity = {
  /** Opacity for hover state (mostly web/desktop). */
  hover: 0.08,
  /** Opacity for focus state (e.g., text fields). */
  focus: 0.1,
  /** Opacity for pressed state (Ripple effect). */
  pressed: 0.1,
  /** Opacity for dragged state. */
  dragged: 0.16,

  /** * Opacity for the CONTAINER of a disabled element.
   * Example: A disabled button's background opacity relative to OnSurface.
   */
  disabledContainer: 0.12,

  /** * Opacity for the CONTENT of a disabled element.
   * Example: A disabled button's text or icon opacity relative to OnSurface.
   */
  disabledContent: 0.38,
} as const;

// ---------------------------------------------------------------------------
// 5. COMPONENT SIZING (LAYOUT CONSTANTS)
// ---------------------------------------------------------------------------

/**
 * Standard sizes for common Material Design components.
 * Use these to avoid magic numbers in styles.
 */
export const componentSize = {
  /** Standard icon size (24dp). */
  icon: 24,
  /** Small avatar size (32dp). */
  avatarSmall: 32,
  /** Medium avatar size (40dp). */
  avatarMedium: 40,
  /** Standard button height (40dp). */
  buttonHeight: 40,
  /** Standard text input container height (56dp). */
  inputHeight: 56,
  /** Small Floating Action Button size (40dp). */
  fabSmall: 40,
  /** Default Floating Action Button size (56dp). */
  fabDefault: 56,
  /** Large Floating Action Button size (96dp). */
  fabLarge: 96,
  /** Bottom Navigation Bar height (80dp). */
  bottomBarHeight: 80,
  /** Standard Top App Bar height (64dp). */
  appBarHeight: 64,
} as const;
