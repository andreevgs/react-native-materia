/**
 * Constants for MD3 Bottom Sheet specs and animation configuration.
 * @see https://m3.material.io/components/bottom-sheets/specs
 */

// Maximum container width for bottom sheet according to MD3 specs (640dp)
export const BOTTOM_SHEET_MAX_WIDTH = 640;

// Horizontal margin applied on large screens (>640dp) according to MD3 specs (56dp)
export const BOTTOM_SHEET_LARGE_SCREEN_MARGIN = 56;

// MD3 Standard Spring config for bottom sheet open/close animations
export const BOTTOM_SHEET_SPRING_CONFIG = {
  damping: 30,
  stiffness: 250,
  mass: 1,
  overshootClamping: false,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 5,
};
