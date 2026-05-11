import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
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

  const backgroundColor = isScrolled ? colors.surfaceContainer : colors.surface;

  const styles = useMemo(
    () => createStyles(tokens, insets, backgroundColor),
    [tokens, insets, backgroundColor],
  );

  return (
    <View style={[styles.container, style]}>
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
    </View>
  );
};

const createStyles = (
  tokens: Tokens,
  insets: EdgeInsets,
  backgroundColor: string,
) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      backgroundColor,
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
