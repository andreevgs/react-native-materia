import { Easing } from "react-native-reanimated";

export const RIPPLE_CONFIG = {
  /** Duration of ripple scale expansion animation in milliseconds */
  EXPAND_DURATION_MS: 450,
  /** Minimum duration a ripple remains visible even for quick taps */
  MIN_TAP_DURATION_MS: 225,
  /** Fade-in opacity animation duration in milliseconds on press */
  FADE_IN_DURATION_MS: 105,
  /** Fade-out opacity animation duration in milliseconds on release */
  FADE_OUT_DURATION_MS: 375,
  /** Delay in milliseconds before showing ripple on touch devices to avoid triggering during scrolls */
  PRESS_DELAY_MS: 150,
  /** Initial size scale ratio relative to container max dimension */
  START_DIAMETER_RATIO: 0.2,
  /** Additional padding added to max radius */
  OVERFLOW_PADDING_PX: 10,
  /** Minimum soft edge size in pixels */
  MIN_FEATHER_SIZE_PX: 75,
  /** Soft edge container ratio relative to max dimension */
  FEATHER_CONTAINER_RATIO: 0.35,
  /** MD3 Standard easing curve: cubic-bezier(0.2, 0.0, 0.0, 1.0) */
  STANDARD_EASING: Easing.bezier(0.2, 0.0, 0.0, 1.0),
  /** Linear easing curve for opacity transitions according to MD3 specification */
  OPACITY_EASING: Easing.linear,
  /** State layer hover transition duration in milliseconds */
  HOVER_TRANSITION_MS: 15,
  /** State layer focus transition duration in milliseconds */
  FOCUS_TRANSITION_MS: 150,
} as const;
