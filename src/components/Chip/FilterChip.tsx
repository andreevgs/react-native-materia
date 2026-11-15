import { ChipCore } from "./ChipCore";
import { CHIP_DEFAULT_TRAILING_A11Y_LABEL } from "./const";
import { FilterChipProps } from "./types";

export const FilterChip = ({
  selected = false,
  elevated = false,
  showCheckmark = true,
  onTrailingIconPress,
  trailingAccessibilityLabel = CHIP_DEFAULT_TRAILING_A11Y_LABEL,
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
