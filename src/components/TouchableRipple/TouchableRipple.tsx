import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import {
  StyleSheet,
  View,
  LayoutChangeEvent,
  Pressable,
  GestureResponderEvent,
  Platform,
  NativeSyntheticEvent,
  TargetedEvent,
  MouseEvent,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Color from "color";

import { RippleItem, TouchableRippleProps } from "./types";
import { Ripple } from "./Ripple";
import { RIPPLE_CONFIG } from "./const";
import { useMateriaColors, useMateriaTokens } from "../../core";
import { isWebFocusVisible } from "./utils";

const supportNativeRipple = Platform.OS === "android" && Platform.Version >= 21;
let globalRippleCounter = 0;

export const TouchableRipple = React.forwardRef<View, TouchableRippleProps>(
  (
    {
      style,
      contentContainerStyle,
      children,
      onLongPress,
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
      onFocus,
      onBlur,
      borderless = false,
      disabled = false,
      rippleColor,
      useNativeEffect = true,
      contentPointerEvents,
      touchDelay,
      ...props
    },
    ref,
  ) => {
    const colors = useMateriaColors();
    const tokens = useMateriaTokens();

    const hasNativeRipple = supportNativeRipple && useNativeEffect;

    const [layout, setLayout] = useState({ width: 0, height: 0 });
    const [ripples, setRipples] = useState<RippleItem[]>([]);

    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const stateLayerOpacity = useSharedValue(0);

    const borderStyles = useMemo(() => {
      const flattened = StyleSheet.flatten(style) || {};
      const result: ViewStyle = {};

      if (typeof flattened.borderRadius === "number") {
        result.borderRadius = flattened.borderRadius;
      }
      if (typeof flattened.borderTopLeftRadius === "number") {
        result.borderTopLeftRadius = flattened.borderTopLeftRadius;
      }
      if (typeof flattened.borderTopRightRadius === "number") {
        result.borderTopRightRadius = flattened.borderTopRightRadius;
      }
      if (typeof flattened.borderBottomLeftRadius === "number") {
        result.borderBottomLeftRadius = flattened.borderBottomLeftRadius;
      }
      if (typeof flattened.borderBottomRightRadius === "number") {
        result.borderBottomRightRadius = flattened.borderBottomRightRadius;
      }
      if (typeof flattened.borderStartStartRadius === "number") {
        result.borderStartStartRadius = flattened.borderStartStartRadius;
      }
      if (typeof flattened.borderStartEndRadius === "number") {
        result.borderStartEndRadius = flattened.borderStartEndRadius;
      }
      if (typeof flattened.borderEndStartRadius === "number") {
        result.borderEndStartRadius = flattened.borderEndStartRadius;
      }
      if (typeof flattened.borderEndEndRadius === "number") {
        result.borderEndEndRadius = flattened.borderEndEndRadius;
      }

      return result;
    }, [style]);

    const solidRippleColor = useMemo(() => {
      return rippleColor || colors.onSurface;
    }, [rippleColor, colors.onSurface]);

    const nativeRippleColor = useMemo(() => {
      return Color(solidRippleColor)
        .alpha(tokens.stateOpacity.pressed)
        .rgb()
        .string();
    }, [solidRippleColor, tokens]);

    // M3 State Layer handles hover and focus over the surface
    useEffect(() => {
      if (disabled) {
        stateLayerOpacity.value = withTiming(0, {
          duration: RIPPLE_CONFIG.HOVER_TRANSITION_MS,
        });
      } else if (isFocused) {
        stateLayerOpacity.value = withTiming(tokens.stateOpacity.focus, {
          duration: RIPPLE_CONFIG.FOCUS_TRANSITION_MS,
        });
      } else if (isHovered) {
        stateLayerOpacity.value = withTiming(tokens.stateOpacity.hover, {
          duration: RIPPLE_CONFIG.HOVER_TRANSITION_MS,
        });
      } else {
        stateLayerOpacity.value = withTiming(0, {
          duration: RIPPLE_CONFIG.HOVER_TRANSITION_MS,
        });
      }
    }, [isFocused, isHovered, disabled, stateLayerOpacity, tokens]);

    const handleLayout = useCallback((e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout;
      setLayout((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height },
      );
    }, []);

    const addRipple = useCallback(
      (x?: number, y?: number, isActive = true) => {
        if (hasNativeRipple || layout.width === 0 || layout.height === 0)
          return;

        const posX = typeof x === "number" && !isNaN(x) ? x : layout.width / 2;
        const posY = typeof y === "number" && !isNaN(y) ? y : layout.height / 2;

        const id = `tr_${++globalRippleCounter}`;
        setRipples((prev) => [
          ...prev,
          { uniqueKey: id, x: posX, y: posY, isActive },
        ]);
      },
      [hasNativeRipple, layout.width, layout.height],
    );

    const removeRipple = useCallback((key: string) => {
      setRipples((prev) => prev.filter((r) => r.uniqueKey !== key));
    }, []);

    const delay =
      touchDelay !== undefined
        ? touchDelay
        : Platform.OS === "web" || hasNativeRipple
          ? 0
          : RIPPLE_CONFIG.PRESS_DELAY_MS;

    const handlePressIn = useCallback(
      (e: GestureResponderEvent) => {
        if (disabled) return;
        const x = e.nativeEvent.locationX;
        const y = e.nativeEvent.locationY;
        addRipple(x, y, true);
        onPressIn?.(e);
      },
      [disabled, addRipple, onPressIn],
    );

    const handlePressOut = useCallback(
      (e: GestureResponderEvent) => {
        setRipples((prev) =>
          prev.map((r) => (r.isActive ? { ...r, isActive: false } : r)),
        );
        onPressOut?.(e);
      },
      [onPressOut],
    );

    const handleHoverIn = useCallback(
      (e: MouseEvent) => {
        if (Platform.OS === "web") {
          const nativeEvent = (
            e as unknown as { nativeEvent?: { pointerType?: string } }
          )?.nativeEvent;
          if (nativeEvent?.pointerType && nativeEvent.pointerType !== "mouse") {
            return;
          }
        }
        setIsHovered(true);
        onHoverIn?.(e);
      },
      [onHoverIn],
    );

    const handleHoverOut = useCallback(
      (e: MouseEvent) => {
        setIsHovered(false);
        onHoverOut?.(e);
      },
      [onHoverOut],
    );

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TargetedEvent>) => {
        setIsFocused(isWebFocusVisible(e));
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TargetedEvent>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const stateLayerStyle = useAnimatedStyle(() => ({
      opacity: stateLayerOpacity.value,
      backgroundColor: solidRippleColor,
    }));

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        unstable_pressDelay={delay > 0 ? delay : undefined}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onLayout={handleLayout}
        focusable={!disabled}
        android_ripple={
          hasNativeRipple
            ? {
                color: nativeRippleColor,
                borderless,
                foreground: !borderless,
              }
            : null
        }
        style={[
          style,
          borderless ? styles.borderless : styles.clipping,
        ]}
        {...props}
      >
        <View
          style={contentContainerStyle}
          pointerEvents={contentPointerEvents}
        >
          {children}
        </View>

        {/* M3 State Layer for Hover / Focus */}
        <Animated.View
          style={[StyleSheet.absoluteFill, stateLayerStyle, borderStyles]}
          pointerEvents="none"
        />

        {/* M3 Press Ripple Waves */}
        {!hasNativeRipple && (
          <View
            style={[
              StyleSheet.absoluteFill,
              borderless ? styles.borderless : styles.clipping,
              borderStyles,
            ]}
            pointerEvents="none"
          >
            {ripples.map((ripple) => (
              <Ripple
                key={ripple.uniqueKey}
                uniqueKey={ripple.uniqueKey}
                x={ripple.x}
                y={ripple.y}
                color={solidRippleColor}
                initialOpacity={tokens.stateOpacity.pressed}
                parentWidth={layout.width}
                parentHeight={layout.height}
                onFinished={removeRipple}
                isActive={ripple.isActive}
              />
            ))}
          </View>
        )}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  clipping: {
    overflow: "hidden",
    ...Platform.select({
      web: { userSelect: "none" as const, outlineStyle: "none" as const },
    }),
  },
  borderless: {
    overflow: "visible",
    ...Platform.select({
      web: { userSelect: "none" as const, outlineStyle: "none" as const },
    }),
  },
});
