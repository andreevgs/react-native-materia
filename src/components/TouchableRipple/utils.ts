import { Platform, NativeSyntheticEvent, TargetedEvent } from "react-native";
import React from "react";

/**
 * Checks if a focus event in Web was triggered by a keyboard interaction (focus-visible).
 * We use a try/catch block here because very old browsers (e.g. Safari < 15.4)
 * will throw a SyntaxError if they do not support the ':focus-visible' pseudo-class.
 */
export const isWebFocusVisible = (
  e: NativeSyntheticEvent<TargetedEvent> | React.FocusEvent,
): boolean => {
  if (Platform.OS !== "web") return true;
  try {
    const target = e.target || e.nativeEvent?.target;
    // @ts-ignore: React Native types don't include DOM methods like matches() on EventTarget, but we know it's an HTMLElement on Web
    if (target && typeof target.matches === "function") {
      // @ts-ignore
      return target.matches(":focus-visible");
    }
  } catch {
    // If the browser doesn't support :focus-visible
  }
  return true;
};
