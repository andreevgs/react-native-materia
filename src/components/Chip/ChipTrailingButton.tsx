import React, { useMemo } from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";

import { useMateriaTokens } from "../../core/MateriaProvider";
import { Tokens } from "../../core/theme/types";
import { IconSource } from "../../types";
import { Icon } from "../Icon";
import { TouchableRipple } from "../TouchableRipple/TouchableRipple";
import {
  CHIP_TRAILING_BUTTON_SIZE,
  CHIP_TRAILING_HIT_SLOP_INSETS,
} from "./const";

interface ChipTrailingButtonProps {
  icon: IconSource;
  color: string;
  size: number;
  stateLayerColor: string;
  disabled: boolean;
  marginRight: number;
  accessibilityLabel?: string;
  onPress: (e: GestureResponderEvent) => void;
}

export const ChipTrailingButton = ({
  icon,
  color,
  size,
  stateLayerColor,
  disabled,
  marginRight,
  accessibilityLabel,
  onPress,
}: ChipTrailingButtonProps) => {
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <TouchableRipple
      onPress={onPress}
      disabled={disabled}
      borderless={true}
      rippleColor={stateLayerColor}
      hitSlop={CHIP_TRAILING_HIT_SLOP_INSETS}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      style={[styles.button, { marginRight }]}
      contentContainerStyle={styles.content}
      contentPointerEvents="none"
    >
      <Icon
        source={icon}
        color={color}
        size={size}
        accessibilityElementsHidden={true}
        importantForAccessibility="no-hide-descendants"
      />
    </TouchableRipple>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    button: {
      width: CHIP_TRAILING_BUTTON_SIZE,
      height: CHIP_TRAILING_BUTTON_SIZE,
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
