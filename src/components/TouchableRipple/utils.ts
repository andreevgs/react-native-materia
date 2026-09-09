import { Platform, NativeSyntheticEvent, TargetedEvent } from "react-native";
import React from "react";

import { RIPPLE_CONFIG } from "./const";
import { RippleGeometry } from "./types";

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
    const target =
      (e as unknown as { currentTarget?: any })?.currentTarget ||
      e.target ||
      e.nativeEvent?.target;
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

export const calculateRippleGeometry = (
  touchX: number | undefined,
  touchY: number | undefined,
  containerWidth: number,
  containerHeight: number,
): RippleGeometry => {
  const largestDimension = Math.max(containerHeight, containerWidth);
  const featherOffset = Math.max(
    RIPPLE_CONFIG.FEATHER_CONTAINER_RATIO * largestDimension,
    RIPPLE_CONFIG.MIN_FEATHER_SIZE_PX,
  );

  const initialDiameter = Math.max(
    1,
    Math.floor(largestDimension * RIPPLE_CONFIG.START_DIAMETER_RATIO),
  );
  const containerDiagonal = Math.sqrt(
    containerWidth ** 2 + containerHeight ** 2,
  );
  const boundingRadius =
    containerDiagonal + RIPPLE_CONFIG.OVERFLOW_PADDING_PX;

  const expansionScale =
    (boundingRadius + featherOffset) / initialDiameter;

  const centerPosition = {
    x: (containerWidth - initialDiameter) / 2,
    y: (containerHeight - initialDiameter) / 2,
  };

  const hasValidCoordinates =
    typeof touchX === "number" &&
    !isNaN(touchX) &&
    typeof touchY === "number" &&
    !isNaN(touchY);

  const originPosition = hasValidCoordinates
    ? {
        x: touchX - initialDiameter / 2,
        y: touchY - initialDiameter / 2,
      }
    : centerPosition;

  return {
    initialDiameter,
    expansionScale,
    originPosition,
    centerPosition,
  };
};
