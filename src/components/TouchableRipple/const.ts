/**
 * Layout, animation, and platform constants for TouchableRipple based on MD3 specifications.
 * @see https://m3.material.io/foundations/interaction-states
 */

import { Platform, ViewStyle } from "react-native";
import { Easing } from "react-native-reanimated";

// --- State Layer ---

/** Hover opacity transition duration (15ms). */
export const STATE_LAYER_HOVER_TRANSITION_MS = 15;

/** Focus opacity transition duration (150ms). */
export const STATE_LAYER_FOCUS_TRANSITION_MS = 150;

// --- Ripple Wave ---

/** Maximum number of concurrent ripple waves allowed on the surface (2). */
export const RIPPLE_MAX_CONCURRENT_COUNT = 2;

/** Accelerated fade-out duration when a ripple is preempted by a newer tap (150ms). */
export const RIPPLE_RAPID_FADE_OUT_DURATION_MS = 150;

/** Ripple scale expansion duration (450ms). */
export const RIPPLE_EXPAND_DURATION_MS = 450;

/** Minimum visible duration for quick taps to prevent visual flash (225ms). */
export const RIPPLE_MIN_TAP_DURATION_MS = 225;

/** Fade-in opacity transition duration on touch down (105ms). */
export const RIPPLE_FADE_IN_DURATION_MS = 105;

/** Fade-out opacity transition duration on touch release (375ms). */
export const RIPPLE_FADE_OUT_DURATION_MS = 375;

/** Delay before showing ripple to avoid triggering during scrolls (150ms). */
export const RIPPLE_PRESS_DELAY_MS = 150;

/** Initial diameter ratio relative to container max dimension (0.2). */
export const RIPPLE_START_DIAMETER_RATIO = 0.2;

/** Padding added to container diagonal to guarantee full coverage (10dp). */
export const RIPPLE_OVERFLOW_PADDING_DP = 10;

/** MD3 Standard easing curve: cubic-bezier(0.2, 0.0, 0.0, 1.0). */
export const RIPPLE_STANDARD_EASING = Easing.bezier(0.2, 0.0, 0.0, 1.0);

/** Linear easing curve for opacity transitions according to MD3. */
export const RIPPLE_OPACITY_EASING = Easing.linear;

// --- Soft Edge (Feathering) ---

/** Minimum radial gradient feather radius (75dp). */
export const SOFT_EDGE_MIN_SIZE_DP = 75;

/** Feather boundary ratio relative to container max dimension (0.35). */
export const SOFT_EDGE_CONTAINER_RATIO = 0.35;

// --- Border Radius Properties ---

/** Style property keys extracted from style prop to apply border clipping to ripple waves and state layers. */
export const RADIUS_PROPERTIES: (keyof ViewStyle)[] = [
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "borderTopStartRadius",
  "borderTopEndRadius",
  "borderBottomStartRadius",
  "borderBottomEndRadius",
  "borderStartStartRadius",
  "borderStartEndRadius",
  "borderEndStartRadius",
  "borderEndEndRadius",
];

// --- Static Platform Styles ---

/** Web styles to disable browser text selection, outline focus rings, and set pointer cursor. */
export const webTouchStyle: ViewStyle = Platform.select({
  web: {
    userSelect: "none",
    outlineStyle: "none",
    cursor: "pointer",
  },
  default: {},
}) as ViewStyle;

/** Web styles to restore default cursor when interaction is disabled. */
export const webDisabledStyle: ViewStyle = Platform.select({
  web: {
    cursor: "default",
  },
  default: {},
}) as ViewStyle;
