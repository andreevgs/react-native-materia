import React from "react";
import { StyleProp, ViewStyle, PressableProps, ViewProps } from "react-native";

export interface TouchableRippleProps extends Omit<PressableProps, "style"> {
  /** Custom style for the touchable container */
  style?: StyleProp<ViewStyle>;
  /** Custom style for the inner content container */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Children to render inside the touchable surface */
  children?: React.ReactNode;
  /** Whether the ripple should extend beyond the bounds of the container */
  borderless?: boolean;
  /** Color of the ripple and state layer. Defaults to `colors.onSurface` */
  rippleColor?: string;
  /** Whether to use native Android ripple on supported devices. Defaults to `true` */
  useNativeEffect?: boolean;
  /** Pointer events for the content container. Defaults to `"none"` */
  contentPointerEvents?: ViewProps["pointerEvents"];
  /** Delay in milliseconds before showing ripple on touch down. Defaults to 150ms on mobile, 0ms on web */
  touchDelay?: number;
}

export interface RippleItem {
  uniqueKey: string;
  isActive: boolean;
  x: number;
  y: number;
}

export interface RippleProps {
  x?: number;
  y?: number;
  color: string;
  initialOpacity: number;
  parentWidth: number;
  parentHeight: number;
  onFinished: (key: string) => void;
  uniqueKey: string;
  isActive: boolean;
}

export interface RippleGeometry {
  initialDiameter: number;
  expansionScale: number;
  originPosition: { x: number; y: number };
  centerPosition: { x: number; y: number };
}

export interface SoftEdgeRippleProps {
  size: number;
  color: string;
  gradientId: string;
}
