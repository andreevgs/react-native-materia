import Color from "color";
import { MateriaScheme, Tokens } from "../../core/theme/types";

export const getBottomSheetContainerStyle = (colors: MateriaScheme) => ({
  backgroundColor: colors.surfaceContainerLow,
});

export const getBottomSheetDragHandleStyle = (colors: MateriaScheme) => {
  const dragHandleColor = Color(colors.onSurfaceVariant)
    .alpha(0.4)
    .rgb()
    .string();

  return {
    backgroundColor: dragHandleColor,
  };
};

export const getBottomSheetShadowStyle = (
  tokens: Tokens,
  colors: MateriaScheme,
) => ({
  elevation: tokens.elevation.level1.elevation,
  shadowOffset: tokens.elevation.level1.shadowOffset,
  shadowColor: colors.shadow,
  shadowOpacity: 0.15,
  shadowRadius: 3,
});

export const getScrimContainerStyle = (colors: MateriaScheme) => ({
  backgroundColor: Color(colors.scrim).alpha(0.32).rgb().string(),
});
