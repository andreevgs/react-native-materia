import React, { useMemo } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { useMateriaColors, useMateriaTokens } from "../../core/MateriaProvider";
import { ButtonProps } from "./types";
import { Icon } from "../Icon";
import { TouchableRipple } from "../TouchableRipple/TouchableRipple";
import { MateriaText } from "../Text";

import { getButtonColors, getButtonShadowStyle } from "./utils";
import { Tokens } from "../../types";

export const Button = ({
  children,
  mode = "filled",
  onPress,
  disabled = false,
  loading = false,
  icon,
  style,
  labelStyle,
}: ButtonProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const { backgroundColor, textColor, borderColor } = useMemo(
    () => getButtonColors(mode, colors, tokens, disabled),
    [mode, colors, tokens, disabled],
  );
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const isElevated = mode === "elevated" && !disabled;
  const shadowStyle = useMemo(
    () => getButtonShadowStyle(isElevated, tokens, colors),
    [isElevated, tokens, colors],
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          borderWidth: mode === "outlined" ? 1 : 0,
        },
        shadowStyle,
        style,
      ]}
    >
      <TouchableRipple
        onPress={onPress}
        disabled={disabled || loading}
        rippleColor={textColor}
        style={styles.touchable}
        contentContainerStyle={styles.content}
        contentPointerEvents="none"
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={textColor}
            style={styles.icon}
          />
        ) : (
          icon && (
            <Icon
              style={styles.icon}
              source={icon}
              color={textColor}
              size={tokens.iconSize["20dp"]}
            />
          )
        )}

        <MateriaText
          variant="labelLarge"
          style={[{ color: textColor }, labelStyle]}
          numberOfLines={1}
        >
          {children}
        </MateriaText>
      </TouchableRipple>
    </View>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      minWidth: 64,
      height: tokens.buttonScale.s.height,
      borderRadius: tokens.shape.full,
      overflow: "hidden",
      borderStyle: "solid",
    },
    touchable: {
      flex: 1,
      borderRadius: tokens.shape.full,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: tokens.spacing.l,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      marginRight: tokens.spacing.s,
    },
  });
