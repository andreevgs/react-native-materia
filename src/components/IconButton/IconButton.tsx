import React, { useMemo } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { useMateriaColors, useMateriaTokens } from "../../core/MateriaProvider";
import { IconButtonProps } from "./types";
import { Icon } from "../Icon";
import { TouchableRipple } from "../TouchableRipple/TouchableRipple";
import { getIconButtonColors } from "./utils";
import { Tokens } from "../../types";

export const IconButton = ({
  icon,
  mode = "standard",
  onPress,
  disabled = false,
  loading = false,
  style,
}: IconButtonProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const iconSize = tokens.iconSize["24dp"];

  const { backgroundColor, iconColor, borderColor } = useMemo(
    () => getIconButtonColors(mode, colors, tokens, disabled),
    [mode, colors, tokens, disabled],
  );

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          borderWidth: mode === "outlined" ? 1 : 0,
        },
        style,
      ]}
    >
      <TouchableRipple
        onPress={onPress}
        disabled={disabled || loading}
        rippleColor={iconColor}
        style={styles.touchable}
        contentContainerStyle={styles.content}
        contentPointerEvents="none"
      >
        {loading ? (
          <ActivityIndicator size="small" color={iconColor} />
        ) : (
          <Icon source={icon} color={iconColor} size={iconSize} />
        )}
      </TouchableRipple>
    </View>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      width: tokens.iconButtonScale.s.width,
      height: tokens.iconButtonScale.s.height,
      borderRadius: tokens.shape.full,
      overflow: "hidden",
      borderStyle: "solid",
    },
    touchable: {
      flex: 1,
      borderRadius: tokens.shape.full,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
