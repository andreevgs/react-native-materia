import React from "react";
import { ChipCore } from "./ChipCore";
import { CHIP_CLOSE_ICON, CHIP_DEFAULT_CLOSE_A11Y_LABEL } from "./const";
import { InputChipProps } from "./types";

export const InputChip = ({
  selected = false,
  trailingIcon,
  onClose,
  closeAccessibilityLabel = CHIP_DEFAULT_CLOSE_A11Y_LABEL,
  ...props
}: InputChipProps) => (
  <ChipCore
    variant="input"
    selected={selected}
    trailingIcon={trailingIcon ?? (onClose ? CHIP_CLOSE_ICON : undefined)}
    onTrailingPress={onClose}
    trailingAccessibilityLabel={closeAccessibilityLabel}
    {...props}
  />
);
