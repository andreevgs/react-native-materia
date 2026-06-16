import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { AppBarProps } from "./types";
import { useMateriaColors, useMateriaTokens } from "../../core/MateriaProvider";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { TextSlot } from "./TextSlot";
import { Tokens } from "../../types";

export const AppBar = ({
  leading,
  trailing,
  headline,
  subtitle,
  style,
  isScrolled = false,
}: AppBarProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const insets = useSafeAreaInsets();

  const progress = useDerivedValue(() => {
    return withTiming(isScrolled ? 1 : 0, {
      duration: tokens.duration.medium1,
      easing: Easing.bezier(
        tokens.easing.standard[0],
        tokens.easing.standard[1],
        tokens.easing.standard[2],
        tokens.easing.standard[3],
      ),
    });
  }, [isScrolled, tokens]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.surface, colors.surfaceContainer],
    );
    return {
      backgroundColor,
    };
  }, [colors]);

  const styles = useMemo(() => createStyles(tokens, insets), [tokens, insets]);

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      {leading && <View style={styles.leadingContainer}>{leading}</View>}

      <View style={styles.content}>
        <TextSlot
          content={headline}
          variant="titleLarge"
          color={colors.onSurface}
        />
        <TextSlot
          content={subtitle}
          variant="labelMedium"
          color={colors.onSurfaceVariant}
        />
      </View>

      {trailing && <View style={styles.trailingContainer}>{trailing}</View>}
    </Animated.View>
  );
};

const createStyles = (tokens: Tokens, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      minHeight: 64 + insets.top,
      paddingTop: insets.top,
      paddingHorizontal: tokens.spacing.xs,
    },
    leadingContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: tokens.spacing.xs,
    },
    content: {
      flex: 1,
    },
    trailingContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: tokens.spacing.xs,
      gap: tokens.spacing.xs,
    },
  });
