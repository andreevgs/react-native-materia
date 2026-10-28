import { Insets, Platform } from "react-native";

/** Width of the active indicator pill in dp (56dp). */
export const INDICATOR_WIDTH = 56;

/** Height of the active indicator pill in dp (32dp). */
export const INDICATOR_HEIGHT = 32;

/** Hit slop used on native platforms to extend the tap area across the entire item column. */
export const NAV_ITEM_HIT_SLOP: Insets | undefined = Platform.select({
  web: undefined,
  default: { top: 6, bottom: 26, left: 500, right: 500 },
});

/** Whether the current runtime platform is web. */
export const IS_WEB = Platform.OS === "web";
