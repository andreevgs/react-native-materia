import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";

import { useMateriaColors, useMateriaTokens } from "../../core/MateriaProvider";
import { ChipProps } from "./types";
import { Icon } from "../Icon";
import { TouchableRipple } from "../TouchableRipple/TouchableRipple";
import { MateriaText } from "../Text";

import { getChipColors, getChipShadowStyle } from "./utils";
import { Tokens } from "../../core/theme/types";

export const Chip = ({
  children,
  mode = "outlined",
  onPress,
  disabled = false,
  leadingIcon,
  trailingIcon,
  style,
  labelStyle,
}: ChipProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const { backgroundColor, textColor, borderColor } = useMemo(
    () => getChipColors(mode, colors, tokens, disabled),
    [mode, colors, tokens, disabled],
  );
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const isElevated = mode === "elevated" && !disabled;
  const shadowStyle = useMemo(
    () => getChipShadowStyle(isElevated, tokens, colors),
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
        disabled={disabled}
        rippleColor={textColor}
        style={styles.touchable}
        contentContainerStyle={[
          styles.content,
          {
            paddingLeft: leadingIcon ? tokens.spacing.s : tokens.spacing.l,
            paddingRight: trailingIcon ? tokens.spacing.s : tokens.spacing.l,
          },
        ]}
        contentPointerEvents="none"
      >
        {leadingIcon && (
          <Icon
            source={leadingIcon}
            color={textColor}
            size={18}
            style={styles.leadingIcon}
          />
        )}

        <MateriaText
          variant="labelLarge"
          style={[{ color: textColor }, labelStyle]}
          numberOfLines={1}
        >
          {children}
        </MateriaText>

        {trailingIcon && (
          <Icon
            source={trailingIcon}
            color={textColor}
            size={tokens.iconSize["18dp"]}
            style={styles.trailingIcon}
          />
        )}
      </TouchableRipple>
    </View>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      height: tokens.chipScale.default.height,
      borderRadius: tokens.shape.small,
      overflow: "hidden",
      borderStyle: "solid",
    },
    touchable: {
      flex: 1,
      borderRadius: tokens.shape.small,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    leadingIcon: {
      marginRight: tokens.spacing.s,
    },
    trailingIcon: {
      marginLeft: tokens.spacing.s,
    },
  });
