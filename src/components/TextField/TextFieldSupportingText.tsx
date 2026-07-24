import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { useMateriaTokens, useMateriaTypography } from "../../core";
import { Tokens } from "../../types";
import { TextFieldSupportingTextProps } from "./types";

export const TextFieldSupportingText = ({
  supportingText,
  supportingTextColor,
}: TextFieldSupportingTextProps) => {
  const tokens = useMateriaTokens();
  const typography = useMateriaTypography();

  const displayedSupportingTextRef = useRef(supportingText);
  const [displayedSupportingText, setDisplayedSupportingText] =
    useState(supportingText);

  const supportingTextAnim = useSharedValue(supportingText ? 1 : 0);
  const supportingTextOpacityAnim = useSharedValue(supportingText ? 1 : 0);

  const updateDisplayedText = useCallback((text: string) => {
    displayedSupportingTextRef.current = text;
    setDisplayedSupportingText(text);
  }, []);

  useEffect(() => {
    const bezier = Easing.bezier(
      tokens.easing.standard[0],
      tokens.easing.standard[1],
      tokens.easing.standard[2],
      tokens.easing.standard[3],
    );

    if (supportingText) {
      if (
        supportingText !== displayedSupportingTextRef.current &&
        displayedSupportingTextRef.current
      ) {
        supportingTextOpacityAnim.value = withTiming(
          0,
          { duration: tokens.duration.short2 },
          (finished) => {
            if (finished) {
              runOnJS(updateDisplayedText)(supportingText);
              supportingTextOpacityAnim.value = withTiming(1, {
                duration: tokens.duration.short2,
                easing: bezier,
              });
            }
          },
        );
      } else {
        updateDisplayedText(supportingText);
        supportingTextAnim.value = withTiming(1, {
          duration: tokens.duration.short3,
          easing: bezier,
        });
        supportingTextOpacityAnim.value = withTiming(1, {
          duration: tokens.duration.short3,
          easing: bezier,
        });
      }
    } else {
      supportingTextAnim.value = withTiming(0, {
        duration: tokens.duration.short3,
        easing: bezier,
      });
      supportingTextOpacityAnim.value = withTiming(0, {
        duration: tokens.duration.short3,
        easing: bezier,
      });
      displayedSupportingTextRef.current = supportingText;
    }
  }, [
    supportingText,
    tokens,
    supportingTextAnim,
    supportingTextOpacityAnim,
    updateDisplayedText,
  ]);

  const supportingTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: interpolate(supportingTextAnim.value, [0, 1], [0, 24]),
      opacity: supportingTextOpacityAnim.value,
      marginTop: interpolate(
        supportingTextAnim.value,
        [0, 1],
        [0, tokens.spacing.xs],
      ),
    };
  });

  const styles = createStyles(tokens);

  if (!supportingText && !displayedSupportingText) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.supportingTextContainer, supportingTextAnimatedStyle]}
    >
      <Animated.Text
        style={[
          typography.bodySmall,
          styles.supportingText,
          { color: supportingTextColor },
        ]}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden={true}
      >
        {displayedSupportingText}
      </Animated.Text>
      <View />
    </Animated.View>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    supportingTextContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: tokens.spacing.l,
      overflow: "hidden",
    },
    supportingText: {
      flex: 1,
    },
  });
