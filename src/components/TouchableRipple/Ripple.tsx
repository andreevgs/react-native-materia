import { memo, useEffect, useMemo, useRef, useCallback } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  withSequence,
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
    const isMountedRef = useRef(true);

    const geometry = useMemo(
      () => calculateRippleGeometry(x, y, parentWidth, parentHeight),
      [x, y, parentWidth, parentHeight],
    );

    const safeOnFinished = useCallback(
      (key: string) => {
        if (isMountedRef.current) {
          onFinished(key);
        }
      },
      [onFinished],
    );

    useEffect(() => {
      return () => {
        isMountedRef.current = false;
      };
    }, []);

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

    // 1. Expand scale and drift towards center
    useEffect(() => {
      progress.value = withTiming(1, {
        duration: RIPPLE_CONFIG.EXPAND_DURATION_MS,
        easing: RIPPLE_CONFIG.STANDARD_EASING,
      });
    }, [progress]);

    // 2. Fade in opacity on initial press
    useEffect(() => {
      if (isActive && !isFinished.current) {
        opacity.value = withTiming(initialOpacity, {
          duration: RIPPLE_CONFIG.FADE_IN_DURATION_MS,
          easing: RIPPLE_CONFIG.OPACITY_EASING,
        });
      }
    }, [isActive, initialOpacity, opacity]);

    // 3. Handle release (either immediately for quick taps or after touch release)
    useEffect(() => {
      if (!isActive && !isFinished.current) {
        isFinished.current = true;

        const timeElapsed = Date.now() - createdAt.current;

        // If released before fade-in completes, sequence the rest of fade-in before fade-out
        if (timeElapsed < RIPPLE_CONFIG.FADE_IN_DURATION_MS) {
          const remainingFadeIn = RIPPLE_CONFIG.FADE_IN_DURATION_MS - timeElapsed;
          const holdDelay =
            RIPPLE_CONFIG.MIN_TAP_DURATION_MS - RIPPLE_CONFIG.FADE_IN_DURATION_MS;

          opacity.value = withSequence(
            withTiming(initialOpacity, {
              duration: remainingFadeIn,
              easing: RIPPLE_CONFIG.OPACITY_EASING,
            }),
            withDelay(
              holdDelay,
              withTiming(
                0,
                {
                  duration: RIPPLE_CONFIG.FADE_OUT_DURATION_MS,
                  easing: RIPPLE_CONFIG.OPACITY_EASING,
                },
                (finished) => {
                  if (finished) {
                    runOnJS(safeOnFinished)(uniqueKey);
                  }
                },
              ),
            ),
          );
        } else {
          const delay = Math.max(
            0,
            RIPPLE_CONFIG.MIN_TAP_DURATION_MS - timeElapsed,
          );

          const fadeOutAnim = withTiming(
            0,
            {
              duration: RIPPLE_CONFIG.FADE_OUT_DURATION_MS,
              easing: RIPPLE_CONFIG.OPACITY_EASING,
            },
            (finished) => {
              if (finished) {
                runOnJS(safeOnFinished)(uniqueKey);
              }
            },
          );

          if (delay > 0) {
            opacity.value = withDelay(delay, fadeOutAnim);
          } else {
            opacity.value = fadeOutAnim;
          }
        }
      }
    }, [isActive, initialOpacity, safeOnFinished, uniqueKey, opacity]);

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
