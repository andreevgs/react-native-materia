import Color from "color";
import { ButtonMode, ButtonStyleConfig } from "./types";
import { MateriaScheme, Tokens } from "../../core/theme/types";

export const getButtonColors = (
  mode: ButtonMode,
  colors: MateriaScheme,
  tokens: Tokens,
  disabled: boolean,
): ButtonStyleConfig => {
  if (disabled) {
    const disabledContainerColor = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledContainer)
      .rgb()
      .string();

    const disabledContentColor = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledContent)
      .rgb()
      .string();

    const hasContainer =
      mode === "filled" || mode === "tonal" || mode === "elevated";
    const hasBorder = mode === "outlined";

    return {
      backgroundColor: hasContainer ? disabledContainerColor : "transparent",
      textColor: disabledContentColor,
      borderColor: hasBorder ? disabledContainerColor : "transparent",
      rippleColor: "transparent",
    };
  }

  const map: Record<ButtonMode, ButtonStyleConfig> = {
    filled: {
      backgroundColor: colors.primary,
      textColor: colors.onPrimary,
      borderColor: "transparent",
      rippleColor: Color(colors.onPrimary)
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
    outlined: {
      backgroundColor: "transparent",
      textColor: colors.onSurfaceVariant,
      borderColor: colors.outlineVariant,
      rippleColor: Color(colors.onSurfaceVariant)
        .alpha(tokens.stateOpacity.pressed)
        .rgb()
        .string(),
    },
    elevated: {
      backgroundColor: colors.surfaceContainerLow,
      textColor: colors.primary,
      borderColor: "transparent",
      rippleColor: Color(colors.primary)
        .alpha(tokens.stateOpacity.pressed)
        .rgb()
        .string(),
    },
    text: {
      backgroundColor: "transparent",
      textColor: colors.primary,
      borderColor: "transparent",
      rippleColor: Color(colors.primary)
        .alpha(tokens.stateOpacity.pressed)
        .rgb()
        .string(),
    },
  };

  return map[mode];
};

export const getButtonShadowStyle = (
  isElevated: boolean,
  tokens: Tokens,
  colors: MateriaScheme,
) =>
  isElevated
    ? { ...tokens.elevation.level1, shadowColor: colors.shadow }
    : tokens.elevation.level0;
