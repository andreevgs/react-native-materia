import { memo, useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  interpolate,
  runOnJS,
} from "react-native-reanimated";

import { RippleProps } from "./types";
import { calculateRippleGeometry } from "./utils";
import { RIPPLE_CONFIG } from "./const";
import { SoftEdgeRipple } from "./SoftEdgeRipple";

export const Ripple = memo(
  ({
    x,
    y,
    color,
    initialOpacity,
    parentWidth,
    parentHeight,
    onFinished,
    uniqueKey,
    isActive,
  }: RippleProps) => {
    const progress = useSharedValue(0);
    const opacity = useSharedValue(0);

    const isFinished = useRef(false);
    const createdAt = useRef(Date.now());

    const geometry = useMemo(
      () => calculateRippleGeometry(x, y, parentWidth, parentHeight),
      [x, y, parentWidth, parentHeight],
    );

    const animatedStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        progress.value,
        [0, 1],
        [geometry.originPosition.x, geometry.centerPosition.x],
      );
      const translateY = interpolate(
        progress.value,
        [0, 1],
        [geometry.originPosition.y, geometry.centerPosition.y],
      );
      const scale = interpolate(
        progress.value,
        [0, 1],
        [1, geometry.expansionScale],
      );

      return {
        opacity: opacity.value,
        transform: [{ translateX }, { translateY }, { scale }],
      };
    });

    useEffect(() => {
      // 1. Fade-in opacity (105ms in M3 spec)
      opacity.value = withTiming(initialOpacity, {
        duration: RIPPLE_CONFIG.FADE_IN_DURATION_MS,
      });

      // 2. Expand scale and drift towards center (450ms with standard easing in M3 spec)
      progress.value = withTiming(1, {
        duration: RIPPLE_CONFIG.EXPAND_DURATION_MS,
        easing: RIPPLE_CONFIG.STANDARD_EASING,
      });
    }, [initialOpacity, opacity, progress]);

    useEffect(() => {
      if (!isActive && !isFinished.current) {
        isFinished.current = true;

        const timeElapsed = Date.now() - createdAt.current;
        const delay = Math.max(
          0,
          RIPPLE_CONFIG.MIN_TAP_DURATION_MS - timeElapsed,
        );

        const fadeOutAnim = withTiming(
          0,
          { duration: RIPPLE_CONFIG.FADE_OUT_DURATION_MS },
          (finished) => {
            if (finished) {
              runOnJS(onFinished)(uniqueKey);
            }
          },
        );

        if (delay > 0) {
          opacity.value = withDelay(delay, fadeOutAnim);
        } else {
          opacity.value = fadeOutAnim;
        }
      }
    }, [isActive, onFinished, uniqueKey, opacity]);

    return (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.rippleOrigin,
          {
            width: geometry.initialDiameter,
            height: geometry.initialDiameter,
          },
          animatedStyle,
        ]}
      >
        <SoftEdgeRipple
          size={geometry.initialDiameter}
          color={color}
          gradientId={`grad_${uniqueKey}`}
        />
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  rippleOrigin: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
});
