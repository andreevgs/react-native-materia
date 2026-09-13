import { memo } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { StateLayerProps } from "./types";

export const StateLayer = memo(
  ({ color, opacity, borderStyles }: StateLayerProps) => {
    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      backgroundColor: color,
    }));

    return (
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, animatedStyle, borderStyles]}
      />
    );
  },
);

StateLayer.displayName = "StateLayer";
