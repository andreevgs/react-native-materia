/**
 * Layout and interaction constants for Chip based on MD3 specification.
 * @see https://m3.material.io/components/chips/specs
 */

import { Platform, ViewStyle } from "react-native";

// --- Container Specs ---

/** Visual height of the chip container (32dp). */
export const CHIP_HEIGHT = 32;

/** Minimum accessible touch target size along either axis (48dp). */
export const CHIP_TOUCH_TARGET_SIZE = 48;

/** Vertical hitSlop applied to expand the 32dp container to a 48dp touch target (8dp). */
export const CHIP_VERTICAL_HIT_SLOP =
  (CHIP_TOUCH_TARGET_SIZE - CHIP_HEIGHT) / 2;

/** Border stroke width for flat unselected chips (1dp). */
export const CHIP_BORDER_WIDTH = 1;

// --- Padding & Gap Specs ---

/** Horizontal padding at an edge without an icon (16dp). */
export const CHIP_PADDING_WITHOUT_ICON = 16;

/** Horizontal padding at an edge with a leading or trailing icon (8dp). */
export const CHIP_PADDING_WITH_ICON = 8;

/** Vertical padding inside the chip container before border compensation (6dp). */
export const CHIP_VERTICAL_PADDING = 6;

/** Spacing between internal elements such as icon and label text (8dp). */
export const CHIP_ELEMENT_GAP = 8;

// --- Icon & Trailing Action Specs ---

/** Standard size for leading, checkmark, and trailing icons (18dp). */
export const CHIP_ICON_SIZE = 18;

/** Visual diameter of the independent trailing action ripple target (28dp). */
export const CHIP_TRAILING_BUTTON_SIZE = 28;

/** Internal padding around the 18dp icon inside the 28dp trailing button (5dp). */
export const CHIP_TRAILING_BUTTON_INSET =
  (CHIP_TRAILING_BUTTON_SIZE - CHIP_ICON_SIZE) / 2;

/** Horizontal hitSlop applied to expand the trailing action touch target (10dp). */
export const CHIP_TRAILING_HIT_SLOP = 10;

/** HitSlop rectangle expanding the 32dp chip container to a 48dp touch target. */
export const CHIP_VERTICAL_HIT_SLOP_INSETS = {
  top: CHIP_VERTICAL_HIT_SLOP,
  bottom: CHIP_VERTICAL_HIT_SLOP,
} as const;

/** HitSlop rectangle expanding the trailing action button touch target. */
export const CHIP_TRAILING_HIT_SLOP_INSETS = {
  top: CHIP_VERTICAL_HIT_SLOP,
  bottom: CHIP_VERTICAL_HIT_SLOP,
  left: CHIP_ELEMENT_GAP - CHIP_TRAILING_BUTTON_INSET,
  right: CHIP_TRAILING_HIT_SLOP,
} as const;

// --- Default Icons & Labels ---

/** Default iconography key rendered for a selected filter chip checkmark. */
export const CHIP_CHECKMARK_ICON = "check-rounded" as const;

/** Default iconography key rendered for an input chip close button. */
export const CHIP_CLOSE_ICON = "close-rounded" as const;

/** Default accessibility label for the input chip close button. */
export const CHIP_DEFAULT_CLOSE_A11Y_LABEL = "Remove";

/** Default accessibility label for the filter chip trailing action button. */
export const CHIP_DEFAULT_TRAILING_A11Y_LABEL = "More options";

// --- Static Platform Styles ---

/** Web styles to disable text selection, focus ring outline, and set pointer cursor. */
export const webTouchStyle: ViewStyle = Platform.select({
  web: {
    userSelect: "none",
    outlineStyle: "none",
    cursor: "pointer",
  },
  default: {},
}) as ViewStyle;

/** Web styles to restore default cursor when interaction is disabled or static. */
export const webDisabledStyle: ViewStyle = Platform.select({
  web: {
    cursor: "default",
  },
  default: {},
}) as ViewStyle;
