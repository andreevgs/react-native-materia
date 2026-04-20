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
          <View style={styles.leadingIconContainer} pointerEvents="none">
            <Icon source={leadingIcon} color={textColor} size={18} />
          </View>
        )}

        <MateriaText
          variant="labelLarge"
          style={[{ color: textColor }, labelStyle]}
          numberOfLines={1}
        >
          {children}
        </MateriaText>

        {trailingIcon && (
          <View style={styles.trailingIconContainer} pointerEvents="none">
            <Icon
              source={trailingIcon}
              color={textColor}
              size={tokens.iconSize["18dp"]}
            />
          </View>
        )}
      </TouchableRipple>
    </View>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      height: 32,
      borderRadius: tokens.shape.small,
      overflow: "hidden",
      borderStyle: "solid",
      alignSelf: "flex-start",
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
      height: "100%",
    },
    leadingIconContainer: {
      marginRight: tokens.spacing.s,
    },
    trailingIconContainer: {
      marginLeft: tokens.spacing.s,
    },
  });
