import {
  Platform,
  NativeSyntheticEvent,
  TargetedEvent,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import React from "react";
import Color from "color";

import {
  SOFT_EDGE_CONTAINER_RATIO,
  SOFT_EDGE_MIN_SIZE_DP,
  RIPPLE_START_DIAMETER_RATIO,
  RIPPLE_OVERFLOW_PADDING_DP,
  RADIUS_PROPERTIES,
} from "./const";
import { RippleColorConfig, RippleGeometry } from "./types";

interface MatchableElement {
  matches?: (selector: string) => boolean;
}

export const canUseNativeRipple = (useNativeEffect: boolean): boolean => {
  return Platform.OS === "android" && Platform.Version >= 21 && useNativeEffect;
};

export const canUseNativeRippleForeground = (borderless: boolean): boolean => {
  return (
    !borderless &&
    Platform.OS === "android" &&
    Number(Platform.Version) >= 23
  );
};

export const getRippleColors = (
  rippleColor: string | undefined,
  defaultColor: string,
  pressedOpacity: number,
): RippleColorConfig => {
  const solidColor = rippleColor || defaultColor;
  const nativeColor = Color(solidColor)
    .alpha(pressedOpacity)
    .rgb()
    .string();

  return { solidColor, nativeColor };
};

export const extractBorderRadiusStyles = (
  style?: StyleProp<ViewStyle>,
): ViewStyle => {
  if (!style) return {};
  const flattened = StyleSheet.flatten(style) || {};
  const result: ViewStyle = {};

  for (const prop of RADIUS_PROPERTIES) {
    const val = flattened[prop];
    if (typeof val === "number" || typeof val === "string") {
      (result as Record<string, string | number>)[prop] = val;
    }
  }

  return result;
};

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
  const boundingRadius = containerDiagonal + RIPPLE_OVERFLOW_PADDING_DP;

  const expansionScale = (boundingRadius + featherOffset) / initialDiameter;

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
