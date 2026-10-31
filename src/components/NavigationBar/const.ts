import { Platform, ViewStyle } from "react-native";

/**
 * Layout constants for NavigationBar based on MD3 Flexible Navigation Bar specification.
 * @see https://m3.material.io/components/navigation-bar/specs
 */

// --- Indicator Specs ---

/** Width of the active indicator pill in dp (56dp). */
export const INDICATOR_WIDTH = 56;

/** Height of the active indicator pill in dp (32dp). */
export const INDICATOR_HEIGHT = 32;

// --- Container Specs ---

/** Container height of the navigation bar in dp (64dp) according to MD3 Flexible Navigation Bar. */
export const NAVIGATION_BAR_HEIGHT = 64;

// --- Platform Styles ---

/** Web touch styles to provide pointer cursor and prevent text selection. */
export const webTouchStyle: ViewStyle = Platform.select({
  web: {
    userSelect: "none",
    cursor: "pointer",
  },
  default: {},
}) as ViewStyle;
