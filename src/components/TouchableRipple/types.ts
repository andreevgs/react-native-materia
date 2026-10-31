import React from "react";
import {
  StyleProp,
  ViewStyle,
  PressableProps,
  ViewProps,
  GestureResponderEvent,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TargetedEvent,
  MouseEvent,
  PressableAndroidRippleConfig,
} from "react-native";
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

/** Configuration options for the useRipple hook. */
export interface UseRippleOptions {
  /** Color of the ripple wave and state layer. Defaults to `colors.onSurface`. */
  color?: string;
  /** Whether ripples should always originate from the center of the host. Defaults to `false`. */
  centered?: boolean;
  /** Whether the ripple extends beyond host bounds. Defaults to `false`. */
  borderless?: boolean;
  /** Whether interactions are disabled. Defaults to `false`. */
  disabled?: boolean | null;
  /** Whether to use native Android ripple on supported devices. Defaults to `true`. */
  useNativeEffect?: boolean;
  /** Delay in milliseconds before showing ripple on touch down. Defaults to `150ms` on mobile, `0ms` on web. */
  pressDelay?: number;
  /** Callback fired when a touch gesture begins. */
  onPressIn?: ((e: GestureResponderEvent) => void) | null;
  /** Callback fired when a touch gesture ends or cancels. */
  onPressOut?: ((e: GestureResponderEvent) => void) | null;
  /** Callback fired when a mouse pointer enters the element. */
  onHoverIn?: ((e: MouseEvent) => void) | null;
  /** Callback fired when a mouse pointer leaves the element. */
  onHoverOut?: ((e: MouseEvent) => void) | null;
  /** Callback fired when the element gains focus. */
  onFocus?: ((e: NativeSyntheticEvent<TargetedEvent>) => void) | null;
  /** Callback fired when the element loses focus. */
  onBlur?: ((e: NativeSyntheticEvent<TargetedEvent>) => void) | null;
}

/** Event handlers to spread onto any interactive Pressable element. */
export interface RippleTriggerHandlers {
  /** Callback fired when touch press begins. */
  onPressIn: (e: GestureResponderEvent) => void;
  /** Callback fired when touch press ends. */
  onPressOut: (e: GestureResponderEvent) => void;
  /** Callback fired when hover begins. */
  onHoverIn: (e: MouseEvent) => void;
  /** Callback fired when hover ends. */
  onHoverOut: (e: MouseEvent) => void;
  /** Callback fired when element gains focus. */
  onFocus: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  /** Callback fired when element loses focus. */
  onBlur: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  /** Native Android ripple configuration if supported and enabled. */
  android_ripple: PressableAndroidRippleConfig | null;
  /** Delay before press feedback triggers on mobile. */
  unstable_pressDelay: number | undefined;
}

/** Controller state and handlers returned by useRipple for driving a RippleHost. */
export interface RippleController {
  /** Event handlers to spread onto the triggering Pressable element. */
  handlers: RippleTriggerHandlers;
  /** Layout callback to attach to the host container to measure its dimensions. */
  onHostLayout: (e: LayoutChangeEvent) => void;
  /** Active ripple wave items currently animating. */
  ripples: RippleItem[];
  /** Reanimated shared value driving the state layer opacity. */
  stateLayerOpacity: SharedValue<number>;
  /** Solid color used for the state layer and JS ripple waves. */
  solidColor: string;
  /** Pressed state opacity value from design tokens. */
  pressedOpacity: number;
  /** Whether ripples should clip to the host surface. */
  borderless: boolean;
  /** Whether native Android ripple is actively handling the touch feedback. */
  hasNativeRipple: boolean;
  /** Callback invoked when a ripple wave completes its animation. */
  removeRipple: (key: string) => void;
}

/** Props for the RippleHost sub-component. */
export interface RippleHostProps {
  /** Controller state and handlers returned by useRipple. */
  ripple: RippleController;
  /** Custom style for the host container. */
  style?: StyleProp<ViewStyle>;
  /** Border radius styles to constrain ripple clipping. */
  borderStyles?: StyleProp<ViewStyle>;
  /** Whether the ripple overflows container bounds. Defaults to `ripple.borderless`. */
  borderless?: boolean;
}

