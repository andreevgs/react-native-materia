/**
 * Constants for MD3 Bottom Sheet specs and animation configuration.
 * @see https://m3.material.io/components/bottom-sheets/specs
 */

// --- Layout Specs ---

/** Maximum container width for bottom sheet according to MD3 specs (640dp). */
export const BOTTOM_SHEET_MAX_WIDTH = 640;

/** Horizontal margin applied on large screens (>640dp) according to MD3 specs (56dp). */
export const BOTTOM_SHEET_LARGE_SCREEN_MARGIN = 56;

/** Extra skirt height appended below the sheet to cover overscroll spring bounce (1000dp). */
export const BOTTOM_SHEET_OVERSCROLL_SKIRT_HEIGHT = 1000;

// --- Animation & Physics ---

/** MD3 standard spring configuration for bottom sheet open, snap, and dismiss animations. */
export const BOTTOM_SHEET_SPRING_CONFIG = {
  damping: 30,
  stiffness: 250,
  mass: 1,
  overshootClamping: false,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 5,
};

/** Velocity projection decay factor in seconds for estimating resting snap position. */
export const BOTTOM_SHEET_VELOCITY_DECAY_FACTOR = 0.2;

/** Downward pan velocity threshold in dp/s that triggers sheet dismissal. */
export const BOTTOM_SHEET_DISMISS_VELOCITY_THRESHOLD = 1000;

/** Resistance multiplier applied when dragging past the highest snap boundary. */
export const BOTTOM_SHEET_OVERSCROLL_RESISTANCE = 0.15;

/** Ratio of total sheet height past which a slow drag triggers dismissal when snapPoints is omitted. */
export const BOTTOM_SHEET_DISMISS_THRESHOLD_RATIO = 0.4;

// --- Modal & Accessibility ---

/** Default portal host name used by ModalBottomSheet. */
export const BOTTOM_SHEET_DEFAULT_PORTAL_NAME = "root";

/** Default accessibility label announced for the modal backdrop scrim. */
export const BOTTOM_SHEET_SCRIM_DEFAULT_ACCESSIBILITY_LABEL =
  "Close bottom sheet";
