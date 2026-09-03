import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import { useMateriaTokens } from "../../core";
import { TextFieldOutlineProps } from "./types";
import { LABEL_SCALE, NOTCH_PADDING, OUTLINED_NOTCH_LEAD_WIDTH } from "./const";

export const TextFieldOutline = ({
  populateAnim,
  activeAnim,
  labelWidth,
  indicatorColorInactive,
  indicatorColorActive,
  hasLabel,
}: TextFieldOutlineProps) => {
  const tokens = useMateriaTokens();

  const leftAnimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(activeAnim.value, [0, 1], [1, 2]);
    return {
      borderTopWidth: width,
      borderBottomWidth: width,
      borderLeftWidth: width,
      borderRightWidth: 0,
    };
  });

  const rightAnimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(activeAnim.value, [0, 1], [1, 2]);
    return {
      borderTopWidth: width,
      borderBottomWidth: width,
      borderRightWidth: width,
      borderLeftWidth: 0,
    };
  });

  const borderColorAnim = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      activeAnim.value,
      [0, 1],
      [indicatorColorInactive, indicatorColorActive],
    ),
  }));

  const notchStyle = useAnimatedStyle(() => {
    const notchWidth = hasLabel
      ? interpolate(
          populateAnim.value,
          [0, 1],
          [0, labelWidth.value * LABEL_SCALE + NOTCH_PADDING],
        )
      : 0;

    const activeWidth = interpolate(activeAnim.value, [0, 1], [1, 2]);
    const topWidth = interpolate(
      populateAnim.value,
      [0, 0.5, 1],
      [activeWidth, activeWidth, 0],
    );

    return {
      width: notchWidth,
      borderTopWidth: topWidth,
      borderBottomWidth: activeWidth,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    };
  });

  return (
    <View
      style={styles.container}
      pointerEvents="none"
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden={true}
    >
      <Animated.View
        style={[
          styles.left,
          {
            borderTopLeftRadius: tokens.shape.extraSmall,
            borderBottomLeftRadius: tokens.shape.extraSmall,
          },
          leftAnimatedStyle,
          borderColorAnim,
        ]}
      />
      <Animated.View style={[borderColorAnim, notchStyle]} />
      <Animated.View
        style={[
          styles.right,
          {
            borderTopRightRadius: tokens.shape.extraSmall,
            borderBottomRightRadius: tokens.shape.extraSmall,
          },
          rightAnimatedStyle,
          borderColorAnim,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  left: {
    width: OUTLINED_NOTCH_LEAD_WIDTH,
  },
  right: {
    flex: 1,
  },
});
