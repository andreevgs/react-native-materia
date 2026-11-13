import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";

import { IconSource } from "../../types";
import { Icon } from "../Icon";
import { MateriaText } from "../Text";
import { CHIP_ELEMENT_GAP } from "./const";

interface ChipContentProps {
  children: ReactNode;
  leadingIcon?: IconSource;
  leadingIconColor: string;
  trailingIcon?: IconSource;
  trailingIconColor: string;
  labelColor: string;
  labelStyle?: StyleProp<TextStyle>;
  iconSize: number;
}

const DECORATIVE_A11Y_PROPS = {
  accessibilityElementsHidden: true,
  importantForAccessibility: "no-hide-descendants",
} as const;

export const ChipContent = ({
  children,
  leadingIcon,
  leadingIconColor,
  trailingIcon,
  trailingIconColor,
  labelColor,
  labelStyle,
  iconSize,
}: ChipContentProps) => (
  <>
    {leadingIcon && (
      <Icon
        source={leadingIcon}
        color={leadingIconColor}
        size={iconSize}
        style={styles.leadingIcon}
        {...DECORATIVE_A11Y_PROPS}
      />
    )}

    <MateriaText
      variant="labelLarge"
      style={[styles.label, { color: labelColor }, labelStyle]}
      numberOfLines={1}
    >
      {children}
    </MateriaText>

    {trailingIcon && (
      <Icon
        source={trailingIcon}
        color={trailingIconColor}
        size={iconSize}
        style={styles.trailingIcon}
        {...DECORATIVE_A11Y_PROPS}
      />
    )}
  </>
);

const styles = StyleSheet.create({
  label: {
    flexShrink: 1,
  },
  leadingIcon: {
    marginRight: CHIP_ELEMENT_GAP,
  },
  trailingIcon: {
    marginLeft: CHIP_ELEMENT_GAP,
  },
});
