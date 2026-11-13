import React from "react";
import { ChipCore } from "./ChipCore";
import { FilterChipProps } from "./types";

export const FilterChip = ({
  selected = false,
  elevated = false,
  showCheckmark = true,
  onTrailingIconPress,
  trailingAccessibilityLabel,
  ...props
}: FilterChipProps) => (
  <ChipCore
    variant="filter"
    selected={selected}
    elevated={elevated}
    showCheckmark={showCheckmark}
    onTrailingPress={onTrailingIconPress}
    trailingAccessibilityLabel={trailingAccessibilityLabel}
    {...props}
  />
);
