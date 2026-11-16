import { StyleSheet } from "react-native";

import { Icon } from "../Icon";
import { MateriaText } from "../Text";
import { CHIP_ELEMENT_GAP } from "./const";
import { ChipContentProps } from "./types";

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
