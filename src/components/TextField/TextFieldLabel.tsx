import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { useMateriaTypography } from "../../core";
import { TextFieldLabelProps } from "./types";
import {
  LABEL_SCALE,
  LABEL_SCALE_COMPENSATION_X,
  LABEL_TRANSLATE_Y_POPULATED_FILLED,
  LABEL_TRANSLATE_Y_POPULATED_OUTLINED,
  LABEL_TRANSLATE_Y_UNPOPULATED,
  OUTLINED_LEADING_ICON_SHIFT,
} from "./const";

export const TextFieldLabel = ({
  label,
  populateAnim,
  labelColor,
  labelStyle,
  labelWidth,
  mode,
  hasLeadingIcon,
}: TextFieldLabelProps) => {
  const typography = useMateriaTypography();

  const labelAnimatedStyle = useAnimatedStyle(() => {
    const extraShift =
      mode === "outlined" && hasLeadingIcon ? OUTLINED_LEADING_ICON_SHIFT : 0;
    const targetTranslateX =
      extraShift - labelWidth.value * LABEL_SCALE_COMPENSATION_X;

    const translateX = interpolate(
      populateAnim.value,
      [0, 1],
      [0, targetTranslateX],
    );

    const translateYValue =
      mode === "outlined"
        ? LABEL_TRANSLATE_Y_POPULATED_OUTLINED
        : LABEL_TRANSLATE_Y_POPULATED_FILLED;

    return {
      transform: [
        { translateX },
        {
          translateY: interpolate(
            populateAnim.value,
            [0, 1],
            [LABEL_TRANSLATE_Y_UNPOPULATED, translateYValue],
          ),
        },
        { scale: interpolate(populateAnim.value, [0, 1], [1, LABEL_SCALE]) },
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
