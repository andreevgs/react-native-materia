import { useEffect, useMemo } from "react";
import { StyleSheet, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  Easing,
  interpolateColor,
} from "react-native-reanimated";

import { SwitchProps } from "./types";
import { getSwitchColors } from "./utils";
import { useMateriaColors, useMateriaTokens } from "../../core/MateriaProvider";
import { Tokens } from "../../types";

export const Switch = ({
  value,
  onValueChange,
  disabled = false,
  style,
  pressed,
}: SwitchProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const animationConfig = useMemo(() => {
    return {
      duration: tokens.duration.medium1,
      easing: Easing.bezier(
        tokens.easing.emphasized[0],
        tokens.easing.emphasized[1],
        tokens.easing.emphasized[2],
        tokens.easing.emphasized[3],
      ),
    };
  }, [tokens]);

  const activeColors = useMemo(
    () => getSwitchColors(true, disabled, colors),
    [disabled, colors],
  );
  const inactiveColors = useMemo(
    () => getSwitchColors(false, disabled, colors),
    [disabled, colors],
  );

  const thumbPosition = useSharedValue(value ? 1 : 0);
  const pressedProgress = useSharedValue(0);

  useEffect(() => {
    thumbPosition.value = withTiming(value ? 1 : 0, animationConfig);
  }, [value, thumbPosition, animationConfig]);

  useEffect(() => {
    if (pressed !== undefined) {
      pressedProgress.value = withTiming(pressed ? 1 : 0, animationConfig);
    }
  }, [pressed, pressedProgress, animationConfig]);

  const animatedThumbStyle = useAnimatedStyle(() => {
    // MD3 Spec: Unselected thumb is 16x16, Selected is 24x24
    const baseSize = thumbPosition.value * tokens.spacing.s + tokens.spacing.l;

    // MD3 Spec: Unselected margin is 8dp (6 inner + 2 border), Selected margin is 4dp from right
    const baseLeft = thumbPosition.value * tokens.spacing.l + 6;

    // Organic stretch effect during transition (+12dp max width)
    const stretchProgress = Math.pow(
      Math.sin(thumbPosition.value * Math.PI),
      0.5,
    );
    const stretch = stretchProgress * tokens.spacing.m;

    // MD3 Spec: State layer expands to 28x28 when pressed
    const targetPressedSize = tokens.shape.extraLarge;
    const height =
      baseSize + (targetPressedSize - baseSize) * pressedProgress.value;
    const width = height + stretch;

    // MD3 Spec: Thumb always expands from its center
    const topOffset = (targetPressedSize - height) / 2;
    const sizeIncreaseWidth = width - baseSize;
    const adjustedLeft = baseLeft - sizeIncreaseWidth / 2;

    // Interpolate thumb color based on thumb position
    const backgroundColor = interpolateColor(
      thumbPosition.value,
      [0, 1],
      [inactiveColors.thumbColor, activeColors.thumbColor],
    );

    return {
      width,
      height,
      left: adjustedLeft,
      top: topOffset,
      backgroundColor,
    };
  });

  const animatedTrackStyle = useAnimatedStyle(() => {
    // Interpolate track and border colors based on thumb position
    const backgroundColor = interpolateColor(
      thumbPosition.value,
      [0, 1],
      [inactiveColors.trackColor, activeColors.trackColor],
    );
    const borderColor = interpolateColor(
      thumbPosition.value,
      [0, 1],
      [inactiveColors.borderColor, activeColors.borderColor],
    );

    return {
      backgroundColor,
      borderColor,
    };
  });

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      disabled={disabled}
      onPressIn={() => {
        if (pressed === undefined) {
          pressedProgress.value = withTiming(1, animationConfig);
        }
      }}
      onPressOut={() => {
        if (pressed === undefined) {
          pressedProgress.value = withTiming(0, animationConfig);
        }
      }}
      style={style}
    >
      <Animated.View style={[styles.track, animatedTrackStyle]}>
        <Animated.View style={[styles.thumb, animatedThumbStyle]} />
      </Animated.View>
    </Pressable>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    track: {
      width: 52,
      height: 32,
      borderRadius: tokens.shape.full,
      borderWidth: tokens.spacing.xxs,
      borderStyle: "solid",
    },
    thumb: {
      position: "absolute",
      borderRadius: tokens.shape.full,
    },
  });
