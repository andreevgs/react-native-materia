import { AccessibilityRole, AccessibilityState } from "react-native";
import Color from "color";
import {
  CHIP_BORDER_WIDTH,
  CHIP_ELEMENT_GAP,
  CHIP_PADDING_WITH_ICON,
  CHIP_PADDING_WITHOUT_ICON,
  CHIP_TRAILING_BUTTON_INSET,
  CHIP_VERTICAL_PADDING,
} from "./const";
import {
  ChipAccessibilityConfig,
  ChipLayoutMetrics,
  ChipStyleConfig,
  ChipVariant,
  GetChipAccessibilityOptions,
  GetChipColorsOptions,
  GetChipLayoutOptions,
} from "./types";
import { MateriaScheme, Tokens } from "../../core/theme/types";

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
}: GetChipLayoutOptions): ChipLayoutMetrics => ({
  paddingVertical: CHIP_VERTICAL_PADDING,
  paddingLeft: hasLeading ? CHIP_PADDING_WITH_ICON : CHIP_PADDING_WITHOUT_ICON,
  paddingRight: hasTrailing
    ? CHIP_PADDING_WITH_ICON
    : CHIP_PADDING_WITHOUT_ICON,
  trailingButtonGap: CHIP_ELEMENT_GAP - CHIP_TRAILING_BUTTON_INSET,
  trailingButtonRightMargin:
    CHIP_PADDING_WITH_ICON - CHIP_TRAILING_BUTTON_INSET,
});

export const getChipAccessibility = (
  variant: ChipVariant,
  {
    disabled,
    selected,
    isInteractive,
    accessibilityRole,
    accessibilityState,
  }: GetChipAccessibilityOptions,
): ChipAccessibilityConfig => {
  let defaultRole: AccessibilityRole | undefined;
  if (variant === "filter") {
    defaultRole = "checkbox";
  } else if (isInteractive) {
    defaultRole = "button";
  }

  const stateByVariant: Record<ChipVariant, AccessibilityState> = {
    assist: {},
    suggestion: {},
    filter: { checked: selected },
    input: { selected },
  };

  return {
    accessibilityRole: accessibilityRole ?? defaultRole,
    accessibilityState: {
      disabled,
      ...stateByVariant[variant],
      ...accessibilityState,
    },
  };
};
