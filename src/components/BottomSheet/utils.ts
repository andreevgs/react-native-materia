import Color from "color";
import { MateriaScheme, Tokens } from "../../core/theme/types";

export interface BottomSheetColors {
  containerColor: string;
  dragHandleColor: string;
}

export const getBottomSheetColors = (
  colors: MateriaScheme,
): BottomSheetColors => {
  // MD3 spec: surface-container-low for the bottom sheet container
  const containerColor = colors.surfaceContainerLow;

  // MD3 spec: on-surface-variant for the drag handle with 0.4 opacity
  const dragHandleColor = Color(colors.onSurfaceVariant)
    .alpha(0.4)
    .rgb()
    .string();

  return {
    containerColor,
    dragHandleColor,
  };
};

export const getBottomSheetShadowStyle = (
  tokens: Tokens,
  colors: MateriaScheme,
) => {
  // MD3 spec: Elevation Level 1 for Bottom Sheet
  return {
    elevation: tokens.elevation.level1.elevation,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15, // Approximate shadow matching level 1
    shadowRadius: 3,
  };
};

export const getScrimStyle = (colors: MateriaScheme) => ({
  backgroundColor: Color(colors.scrim).alpha(0.32).rgb().string(),
});
