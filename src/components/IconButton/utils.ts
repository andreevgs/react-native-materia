import Color from "color";
import { IconButtonMode, IconButtonStyleConfig } from "./types";
import { MateriaScheme, Tokens } from "../../core/theme/types";

export const getIconButtonColors = (
  mode: IconButtonMode,
  colors: MateriaScheme,
  tokens: Tokens,
  disabled: boolean,
): IconButtonStyleConfig => {
  if (disabled) {
    const disabledContainerColor = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledContainer)
      .rgb()
      .string();

    const disabledContentColor = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledContent)
      .rgb()
      .string();

    const hasContainer = mode === "filled" || mode === "tonal";
    const hasBorder = mode === "outlined";

    return {
      backgroundColor: hasContainer ? disabledContainerColor : "transparent",
      iconColor: disabledContentColor,
      borderColor: hasBorder ? disabledContainerColor : "transparent",
    };
  }

  const map: Record<IconButtonMode, IconButtonStyleConfig> = {
    filled: {
      backgroundColor: colors.primary,
      iconColor: colors.onPrimary,
      borderColor: "transparent",
    },
    tonal: {
      backgroundColor: colors.secondaryContainer,
      iconColor: colors.onSecondaryContainer,
      borderColor: "transparent",
    },
    outlined: {
      backgroundColor: "transparent",
      iconColor: colors.onSurfaceVariant,
      borderColor: colors.outlineVariant,
    },
    standard: {
      backgroundColor: "transparent",
      iconColor: colors.onSurfaceVariant,
      borderColor: "transparent",
    },
  };

  return map[mode];
};
