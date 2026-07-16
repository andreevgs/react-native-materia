import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { useMateriaTypography } from "../../core";
import { TextFieldLabelProps } from "./types";

export const TextFieldLabel = ({
  label,
  focusAnim,
  labelColor,
  labelStyle,
}: TextFieldLabelProps) => {
  const typography = useMateriaTypography();
  const labelWidth = useSharedValue(0);

  const labelAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      focusAnim.value,
      [0, 1],
      [0, -(labelWidth.value * 0.125)],
    );

    return {
      transform: [
        { translateX },
        { translateY: interpolate(focusAnim.value, [0, 1], [16, 4]) },
        { scale: interpolate(focusAnim.value, [0, 1], [1, 0.75]) },
      ],
    };
  });

  return (
    <Animated.Text
      onLayout={(e) => {
        labelWidth.value = e.nativeEvent.layout.width;
      }}
      style={[
        typography.bodyLarge,
        styles.label,
        {
          color: labelColor,
        },
        labelAnimatedStyle,
        labelStyle,
      ]}
      numberOfLines={1}
    >
      {label}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});
