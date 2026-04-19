import React, {
  useState,
  useCallback,
  useRef,
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
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Color from "color";

import { RippleItem, TouchableRippleProps } from "./types";
import { Ripple } from "./Ripple";
import { useMateriaColors } from "../../core";
import { useMateriaTokens } from "../../core/MateriaProvider";

const supportNativeRipple = Platform.OS === "android" && Platform.Version >= 21;

export const TouchableRipple = ({
  style,
  contentContainerStyle,
  children,
  onPress,
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
  ...props
}: TouchableRippleProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const idCounter = useRef(0);

  const hasNativeRipple = supportNativeRipple && useNativeEffect;

  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const stateLayerOpacity = useSharedValue(0);

  const borderStyles = useMemo(() => {
    const flattened = StyleSheet.flatten(style) || {};
    return {
      borderRadius:
        typeof flattened.borderRadius === "number" ? flattened.borderRadius : 0,
      ...(typeof flattened.borderTopLeftRadius === "number" && {
        borderTopLeftRadius: flattened.borderTopLeftRadius,
      }),
      ...(typeof flattened.borderTopRightRadius === "number" && {
        borderTopRightRadius: flattened.borderTopRightRadius,
      }),
      ...(typeof flattened.borderBottomLeftRadius === "number" && {
        borderBottomLeftRadius: flattened.borderBottomLeftRadius,
      }),
      ...(typeof flattened.borderBottomRightRadius === "number" && {
        borderBottomRightRadius: flattened.borderBottomRightRadius,
      }),
    };
  }, [style]);

  const solidRippleColor = useMemo(() => {
    return rippleColor || colors.onSurface;
  }, [rippleColor, colors.onSurface]);

  const nativeRippleColor = useMemo(() => {
    return Color(solidRippleColor)
      .alpha(tokens.stateOpacity.pressed)
      .rgb()
      .string();
  }, [solidRippleColor]);

  useEffect(() => {
    if (disabled) {
      stateLayerOpacity.value = withTiming(0, { duration: 200 });
    } else if (isPressed && !hasNativeRipple) {
      stateLayerOpacity.value = withTiming(tokens.stateOpacity.pressed, {
        duration: 200,
      });
    } else if (isFocused) {
      stateLayerOpacity.value = withTiming(tokens.stateOpacity.focus, {
        duration: 200,
      });
    } else if (isHovered) {
      stateLayerOpacity.value = withTiming(tokens.stateOpacity.hover, {
        duration: 200,
      });
    } else {
      stateLayerOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [isPressed, isFocused, isHovered, disabled, stateLayerOpacity]);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setLayout((prev) =>
      prev.width === width && prev.height === height ? prev : { width, height },
    );
  }, []);

  const addRipple = useCallback(
    (x: number, y: number) => {
      if (hasNativeRipple || layout.width === 0 || layout.height === 0) return;

      const id = `ripple_${++idCounter.current}`;
      setRipples((prev) => [...prev, { uniqueKey: id, x, y, isActive: true }]);
    },
    [hasNativeRipple, layout.width, layout.height],
  );

  const removeRipple = useCallback((key: string) => {
    setRipples((prev) => prev.filter((r) => r.uniqueKey !== key));
  }, []);

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      if (disabled) return;
      setIsPressed(true);
      addRipple(e.nativeEvent.locationX, e.nativeEvent.locationY);
      onPressIn?.(e);
    },
    [disabled, addRipple, onPressIn],
  );

  const handlePressOut = useCallback(
    (e: GestureResponderEvent) => {
      setIsPressed(false);
      setRipples((prev) =>
        prev.map((r) => (r.isActive ? { ...r, isActive: false } : r)),
      );
      onPressOut?.(e);
    },
    [onPressOut],
  );

  const handleHoverIn = useCallback(
    (e: any) => {
      setIsHovered(true);
      onHoverIn?.(e);
    },
    [onHoverIn],
  );

  const handleHoverOut = useCallback(
    (e: any) => {
      setIsHovered(false);
      onHoverOut?.(e);
    },
    [onHoverOut],
  );

  const handleFocus = useCallback(
    (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: any) => {
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
      {...props}
      disabled={disabled}
      onPress={onPress}
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
              foreground: true,
            }
          : null
      }
      style={[
        style,
        borderless ? styles.borderless : styles.clipping,
        disabled && styles.disabled,
      ]}
    >
      <View style={contentContainerStyle} pointerEvents={contentPointerEvents}>
        {children}
      </View>
      <Animated.View
        style={[StyleSheet.absoluteFill, stateLayerStyle, borderStyles]}
        pointerEvents="none"
      />
      {!hasNativeRipple && (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.rippleContainer,
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
};

const styles = StyleSheet.create({
  clipping: { overflow: "hidden" },
  borderless: { overflow: "visible" },
  disabled: { opacity: 0.38 },
  rippleContainer: { overflow: "visible" },
});
