import Color from "color";
import { AccessibilityRole, AccessibilityState } from "react-native";
import {
  CHIP_BORDER_WIDTH,
  CHIP_ELEMENT_GAP,
  CHIP_PADDING_WITH_ICON,
  CHIP_PADDING_WITHOUT_ICON,
  CHIP_TRAILING_BUTTON_INSET,
} from "./const";
import { ChipStyleConfig, ChipVariant } from "./types";
import { MateriaScheme, Tokens } from "../../core/theme/types";

interface GetChipColorsOptions {
  elevated: boolean;
  selected: boolean;
  disabled: boolean;
}

interface GetChipLayoutOptions {
  hasLeading: boolean;
  hasTrailing: boolean;
  borderWidth: number;
}

export interface ChipLayoutMetrics {
  paddingLeft: number;
  paddingRight: number;
  trailingButtonGap: number;
  trailingButtonRightMargin: number;
}

export const getChipColors = (
  variant: ChipVariant,
  colors: MateriaScheme,
  tokens: Tokens,
  { elevated, selected, disabled }: GetChipColorsOptions,
): ChipStyleConfig => {
  const isElevated = variant !== "input" && elevated;
  const isSelected = (variant === "filter" || variant === "input") && selected;

  if (disabled) {
    const disabledContainer = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledContainer)
      .rgb()
      .string();
    const disabledContent = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledContent)
      .rgb()
      .string();

    const hasFilledContainer = isSelected || isElevated;

    return {
      backgroundColor: hasFilledContainer ? disabledContainer : "transparent",
      borderColor: hasFilledContainer ? "transparent" : disabledContainer,
      borderWidth: hasFilledContainer ? 0 : CHIP_BORDER_WIDTH,
      labelColor: disabledContent,
      leadingIconColor: disabledContent,
      trailingIconColor: disabledContent,
      stateLayerColor: "transparent",
    };
  }

  if (isSelected) {
    return {
      backgroundColor: colors.secondaryContainer,
      borderColor: "transparent",
      borderWidth: 0,
      labelColor: colors.onSecondaryContainer,
      leadingIconColor: colors.onSecondaryContainer,
      trailingIconColor: colors.onSecondaryContainer,
      stateLayerColor: colors.onSecondaryContainer,
    };
  }

  const labelByVariant: Record<ChipVariant, string> = {
    assist: colors.onSurface,
    filter: colors.onSurfaceVariant,
    input: colors.onSurfaceVariant,
    suggestion: colors.onSurfaceVariant,
  };

  const leadingIconByVariant: Record<ChipVariant, string> = {
    assist: colors.primary,
    filter: colors.primary,
    input: colors.onSurfaceVariant,
    suggestion: colors.primary,
  };

  const stateLayerByVariant: Record<ChipVariant, string> = {
    assist: colors.onSurface,
    filter: colors.onSurfaceVariant,
    input: colors.onSurfaceVariant,
    suggestion: colors.onSurfaceVariant,
  };

  return {
    backgroundColor: isElevated ? colors.surfaceContainerLow : "transparent",
    borderColor: isElevated ? "transparent" : colors.outlineVariant,
    borderWidth: isElevated ? 0 : CHIP_BORDER_WIDTH,
    labelColor: labelByVariant[variant],
    leadingIconColor: leadingIconByVariant[variant],
    trailingIconColor: colors.onSurfaceVariant,
    stateLayerColor: stateLayerByVariant[variant],
  };
};

export const getChipShadowStyle = (
  isElevated: boolean,
  tokens: Tokens,
  colors: MateriaScheme,
) =>
  isElevated
    ? { ...tokens.elevation.level1, shadowColor: colors.shadow }
    : tokens.elevation.level0;

export const getChipLayoutMetrics = ({
  hasLeading,
  hasTrailing,
  borderWidth,
}: GetChipLayoutOptions): ChipLayoutMetrics => ({
  paddingLeft:
    (hasLeading ? CHIP_PADDING_WITH_ICON : CHIP_PADDING_WITHOUT_ICON) -
    borderWidth,
  paddingRight:
    (hasTrailing ? CHIP_PADDING_WITH_ICON : CHIP_PADDING_WITHOUT_ICON) -
    borderWidth,
  trailingButtonGap: CHIP_ELEMENT_GAP - CHIP_TRAILING_BUTTON_INSET,
  trailingButtonRightMargin:
    CHIP_PADDING_WITH_ICON - borderWidth - CHIP_TRAILING_BUTTON_INSET,
});

export const getChipAccessibility = (
  variant: ChipVariant,
  {
    disabled,
    selected,
    accessibilityRole,
    accessibilityState,
  }: {
    disabled: boolean;
    selected: boolean;
    accessibilityRole?: AccessibilityRole;
    accessibilityState?: AccessibilityState;
  },
): {
  accessibilityRole: AccessibilityRole;
  accessibilityState: AccessibilityState;
} => ({
  accessibilityRole:
    accessibilityRole ?? (variant === "filter" ? "checkbox" : "button"),
  accessibilityState: {
    disabled,
    ...(variant === "filter"
      ? { checked: selected, selected }
      : variant === "input"
        ? { selected }
        : {}),
    ...accessibilityState,
  },
});
