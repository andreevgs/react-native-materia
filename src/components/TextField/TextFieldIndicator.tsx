import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import { TextFieldIndicatorProps } from "./types";

export const TextFieldIndicator = ({
  focusAnim,
  indicatorColorInactive,
  indicatorColorActive,
}: TextFieldIndicatorProps) => {
  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(focusAnim.value, [0, 1], [1, 2]),
      backgroundColor: interpolateColor(
        focusAnim.value,
        [0, 1],
        [indicatorColorInactive, indicatorColorActive],
      ),
    };
  });

  return (
    <Animated.View style={[styles.activeIndicator, indicatorAnimatedStyle]} />
  );
};

const styles = StyleSheet.create({
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
