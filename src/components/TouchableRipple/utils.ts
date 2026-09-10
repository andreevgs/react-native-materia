import { Platform, NativeSyntheticEvent, TargetedEvent } from "react-native";
import React from "react";

import {
  SOFT_EDGE_CONTAINER_RATIO,
  SOFT_EDGE_MIN_SIZE_DP,
  RIPPLE_START_DIAMETER_RATIO,
  RIPPLE_OVERFLOW_PADDING_DP,
} from "./const";
import { RippleGeometry } from "./types";

interface MatchableElement {
  matches?: (selector: string) => boolean;
}

export const isWebFocusVisible = (
  e: NativeSyntheticEvent<TargetedEvent> | React.FocusEvent,
): boolean => {
  if (Platform.OS !== "web") return true;
  try {
    const target = (e.currentTarget || e.target || e.nativeEvent?.target) as
      | (EventTarget & MatchableElement)
      | null
      | undefined;

    if (typeof target?.matches === "function") {
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
    SOFT_EDGE_CONTAINER_RATIO * largestDimension,
    SOFT_EDGE_MIN_SIZE_DP,
  );

  const initialDiameter = Math.max(
    1,
    Math.floor(largestDimension * RIPPLE_START_DIAMETER_RATIO),
  );
  const containerDiagonal = Math.sqrt(
    containerWidth ** 2 + containerHeight ** 2,
  );
  const boundingRadius =
    containerDiagonal + RIPPLE_OVERFLOW_PADDING_DP;

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
