import { memo, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { RippleProps } from "./types";

const RIPPLE_DURATION = 400;
const MIN_RIPPLE_LIFESPAN = 225;
const FADE_OUT_DURATION = 200;

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
    const scale = useSharedValue(0);
    const opacity = useSharedValue(initialOpacity);

    const isFinished = useRef(false);
    const [createdAt] = useState(() => Date.now());

    const radius = useMemo(() => {
      const distX = Math.max(x, parentWidth - x);
      const distY = Math.max(y, parentHeight - y);
      return Math.sqrt(distX * distX + distY * distY);
    }, [x, y, parentWidth, parentHeight]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        transform: [
          { translateX: x - radius },
          { translateY: y - radius },
          { scale: scale.value },
        ],
      };
    });

    useEffect(() => {
      scale.value = withTiming(1, {
        duration: RIPPLE_DURATION,
        easing: Easing.bezier(0.2, 0.0, 0.0, 1.0),
      });
    }, [scale]);

    useEffect(() => {
      if (!isActive && !isFinished.current) {
        isFinished.current = true;

        const timeElapsed = Date.now() - createdAt;
        const delay = Math.max(0, MIN_RIPPLE_LIFESPAN - timeElapsed);

        const fadeOutAnim = withTiming(
          0,
          { duration: FADE_OUT_DURATION },
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
    }, [isActive, onFinished, uniqueKey, opacity, createdAt]);

    return (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ripple,
          {
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            backgroundColor: color,
          },
          animatedStyle,
        ]}
      />
    );
  },
);

const styles = StyleSheet.create({
  ripple: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
});
