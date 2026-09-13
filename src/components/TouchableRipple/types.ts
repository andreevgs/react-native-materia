import React from "react";
import { StyleProp, ViewStyle, PressableProps, ViewProps } from "react-native";
import { SharedValue } from "react-native-reanimated";

/** Props for the TouchableRipple component. */
export interface TouchableRippleProps extends Omit<PressableProps, "style"> {
  /** Custom style for the touchable container. */
  style?: StyleProp<ViewStyle>;
  /** Custom style for the inner content container. */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Children to render inside the touchable surface. */
  children?: React.ReactNode;
  /** Whether the ripple should extend beyond the bounds of the container. Defaults to `false`. */
  borderless?: boolean;
  /** Color of the ripple and state layer. Defaults to `colors.onSurface`. */
  rippleColor?: string;
  /** Whether to use native Android ripple on supported devices. Defaults to `true`. */
  useNativeEffect?: boolean;
  /** Pointer events for the content container. Defaults to `"none"`. */
  contentPointerEvents?: ViewProps["pointerEvents"];
  /** Delay in milliseconds before showing ripple on touch down. Defaults to `150ms` on mobile, `0ms` on web. */
  pressDelay?: number;
}

/** Resolved colors for the ripple and state layer. */
export interface RippleColorConfig {
  /** Solid color used for the state layer and JS ripple waves. */
  solidColor: string;
  /** Semi-transparent color used for native Android ripple. */
  nativeColor: string;
}

/** Internal state tracking an active ripple animation instance. */
export interface RippleItem {
  /** Unique identifier for the ripple instance. */
  uniqueKey: string;
  /** Whether the touch gesture is currently active. */
  isActive: boolean;
  /** Whether the ripple should accelerate its exit due to newer taps. */
  isExiting?: boolean;
  /** Touch X coordinate relative to container in dp. */
  x: number;
  /** Touch Y coordinate relative to container in dp. */
  y: number;
  /** Container width at the moment ripple started in dp. */
  parentWidth: number;
  /** Container height at the moment ripple started in dp. */
  parentHeight: number;
}

/** Props for an individual Ripple wave component. */
export interface RippleProps {
  /** Touch X coordinate in dp. */
  x?: number;
  /** Touch Y coordinate in dp. */
  y?: number;
  /** Color of the ripple wave. */
  color: string;
  /** Initial opacity when ripple starts fading in. */
  initialOpacity: number;
  /** Container width in dp. */
  parentWidth: number;
  /** Container height in dp. */
  parentHeight: number;
  /** Callback invoked when the ripple animation completes and unmounts. */
  onFinished: (key: string) => void;
  /** Unique key identifying this ripple wave. */
  uniqueKey: string;
  /** Whether the press gesture is still active. */
  isActive: boolean;
  /** Whether the ripple should accelerate its exit due to newer taps. */
  isExiting?: boolean;
}

/** Calculated dimensions and positions for ripple wave expansion. */
export interface RippleGeometry {
  /** Initial starting diameter of the ripple in dp. */
  initialDiameter: number;
  /** Maximum scale factor to fully cover the surface diagonal. */
  expansionScale: number;
  /** Initial top-left coordinate where the ripple starts in dp. */
  originPosition: { x: number; y: number };
  /** Centered top-left coordinate where the ripple settles in dp. */
  centerPosition: { x: number; y: number };
}

/** Props for the StateLayer sub-component. */
export interface StateLayerProps {
  /** Color of the state layer background. */
  color: string;
  /** Shared opacity animated value. */
  opacity: SharedValue<number>;
  /** Border radius styles to constrain state layer clipping. */
  borderStyles?: StyleProp<ViewStyle>;
}

/** Props for the RippleOverlay sub-component. */
export interface RippleOverlayProps {
  /** List of currently active ripple items. */
  ripples: RippleItem[];
  /** Color of the ripple waves. */
  color: string;
  /** Pressed opacity value from design tokens. */
  pressedOpacity: number;
  /** Whether the ripple overflows container bounds. */
  borderless: boolean;
  /** Border radius styles to constrain ripple clipping. */
  borderStyles?: StyleProp<ViewStyle>;
  /** Callback invoked when a ripple finishes its animation. */
  onRippleFinished: (key: string) => void;
}

/** Props for the feathered soft-edge SVG circle. */
export interface SoftEdgeRippleProps {
  /** Diameter of the SVG canvas in dp. */
  size: number;
  /** Color of the radial gradient. */
  color: string;
  /** Unique SVG gradient ID to prevent DOM collision across instances. */
  gradientId: string;
}

/** Web pointer event shape for detecting pointer type (mouse vs touch/pen). */
export interface WebPointerEvent {
  /** Native event payload containing pointer metadata. */
  nativeEvent?: { pointerType?: string };
}
