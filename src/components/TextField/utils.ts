import Color from "color";
import { TextFieldMode, TextFieldStyleConfig } from "./types";
import { MateriaScheme, Tokens } from "../../core/theme/types";

export const getTextFieldColors = (
  mode: TextFieldMode,
  colors: MateriaScheme,
  tokens: Tokens,
  disabled: boolean,
  focused: boolean,
  error: boolean,
  hovered: boolean = false,
): TextFieldStyleConfig => {
  if (disabled) {
    const disabledFilledContainerColor = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledFilledContainer)
      .rgb()
      .string();

    const disabledOutlineColor = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledContainer)
      .rgb()
      .string();

    const disabledContentColor = Color(colors.onSurface)
      .alpha(tokens.stateOpacity.disabledContent)
      .rgb()
      .string();

    return {
      containerColor:
        mode === "filled" ? disabledFilledContainerColor : "transparent",
      indicatorColorInactive:
        mode === "outlined" ? disabledOutlineColor : disabledContentColor,
      indicatorColorActive:
        mode === "outlined" ? disabledOutlineColor : disabledContentColor,
      labelColor: disabledContentColor,
      inputColor: disabledContentColor,
      supportingTextColor: disabledContentColor,
      iconColor: disabledContentColor,
      caretColor: disabledContentColor,
    };
  }

  let containerColor =
    mode === "filled" ? colors.surfaceContainerHighest : "transparent";

  if (hovered && mode === "filled") {
    containerColor = Color(containerColor)
      .mix(Color(colors.onSurface), tokens.stateOpacity.hover)
      .rgb()
      .string();
  }

  if (error) {
    return {
      containerColor,
      indicatorColorInactive: colors.error,
      indicatorColorActive: colors.error,
      labelColor: colors.error,
      inputColor: colors.onSurface,
      supportingTextColor: colors.error,
      iconColor: colors.onSurfaceVariant,
      caretColor: colors.error,
    };
  }

  return {
    containerColor,
    indicatorColorInactive: hovered
      ? colors.onSurface
      : mode === "outlined"
        ? colors.outline
        : colors.onSurfaceVariant,
    indicatorColorActive: colors.primary,
    labelColor: focused ? colors.primary : colors.onSurfaceVariant,
    inputColor: colors.onSurface,
    supportingTextColor: colors.onSurfaceVariant,
    iconColor: colors.onSurfaceVariant,
    caretColor: colors.primary,
  };
};
