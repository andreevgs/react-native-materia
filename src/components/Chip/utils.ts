import Color from "color";
import { ChipMode, ChipStyleConfig } from "./types";
import { MateriaScheme, Tokens } from "../../core/theme/types";

export const getChipColors = (
  mode: ChipMode,
  colors: MateriaScheme,
  tokens: Tokens,
  disabled: boolean,
): ChipStyleConfig => {
  if (disabled) {
    const disabledContainerColor = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledContainer)
      .rgb()
      .string();

    const disabledContentColor = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledContent)
      .rgb()
      .string();

    const hasContainer = mode === "tonal" || mode === "elevated";
    const hasBorder = mode === "outlined";

    return {
      backgroundColor: hasContainer ? disabledContainerColor : "transparent",
      textColor: disabledContentColor,
      borderColor: hasBorder ? disabledContainerColor : "transparent",
      rippleColor: "transparent",
    };
  }

  const map: Record<ChipMode, ChipStyleConfig> = {
    outlined: {
      backgroundColor: "transparent",
      textColor: colors.onSurfaceVariant,
      borderColor: colors.outlineVariant,
      rippleColor: Color(colors.onSurfaceVariant)
        .alpha(tokens.stateOpacity.pressed)
        .rgb()
        .string(),
    },
    tonal: {
      backgroundColor: colors.secondaryContainer,
      textColor: colors.onSecondaryContainer,
      borderColor: "transparent",
      rippleColor: Color(colors.onSecondaryContainer)
        .alpha(tokens.stateOpacity.pressed)
        .rgb()
        .string(),
    },
    elevated: {
      backgroundColor: colors.surfaceContainerLow,
      textColor: colors.onSurface,
      borderColor: "transparent",
      rippleColor: Color(colors.onSurface)
        .alpha(tokens.stateOpacity.pressed)
        .rgb()
        .string(),
    },
  };

  return map[mode];
};

export const getChipShadowStyle = (
  isElevated: boolean,
  tokens: Tokens,
  colors: MateriaScheme,
) =>
  isElevated
    ? { ...tokens.elevation.level1, shadowColor: colors.shadow }
    : tokens.elevation.level0;
