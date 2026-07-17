import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import { TextFieldIndicatorProps } from "./types";

export const TextFieldIndicator = ({
  activeAnim,
  indicatorColorInactive,
  indicatorColorActive,
}: TextFieldIndicatorProps) => {
  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(activeAnim.value, [0, 1], [1, 2]),
      backgroundColor: interpolateColor(
        activeAnim.value,
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
