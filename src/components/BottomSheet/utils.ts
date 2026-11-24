import Color from "color";
import { MateriaScheme, Tokens } from "../../core/theme/types";
import { BOTTOM_SHEET_VELOCITY_DECAY_FACTOR } from "./const";

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

export const parseSnapPoints = (
  snapPoints: (string | number)[],
  containerHeight: number,
  topInset: number,
): number[] => {
  if (snapPoints.length === 0 || containerHeight <= 0) {
    return [];
  }

  const availableHeight = Math.max(0, containerHeight - topInset);

  const offsets = snapPoints.map((point) => {
    let height = 0;

    if (typeof point === "number") {
      height = Number.isFinite(point) ? point : 0;
    } else {
      const trimmed = point.trim();
      if (trimmed.endsWith("%")) {
        const percentage = parseFloat(trimmed.slice(0, -1));
        height = Number.isFinite(percentage)
          ? (percentage / 100) * availableHeight
          : 0;
      } else {
        const parsed = parseFloat(trimmed);
        height = Number.isFinite(parsed) ? parsed : 0;
      }
    }

    const clampedHeight = Math.max(0, Math.min(height, availableHeight));
    return containerHeight - clampedHeight;
  });

  return offsets.sort((a, b) => b - a);
};

export const getClosestSnapPoint = (
  currentY: number,
  velocityY: number,
  snapPointsInY: number[],
): number => {
  "worklet";
  if (snapPointsInY.length === 0) {
    return 0;
  }

  const projectedY =
    currentY + velocityY * BOTTOM_SHEET_VELOCITY_DECAY_FACTOR;

  let closest = snapPointsInY[0]!;
  let minDistance = Math.abs(projectedY - closest);

  for (let i = 1; i < snapPointsInY.length; i++) {
    const point = snapPointsInY[i]!;
    const distance = Math.abs(projectedY - point);
    if (distance < minDistance) {
      minDistance = distance;
      closest = point;
    }
  }

  return closest;
};

export const getSnapPointIndex = (
  targetY: number,
  snapPointsInY: number[],
): number => {
  "worklet";
  if (snapPointsInY.length === 0) {
    return -1;
  }

  for (let i = 0; i < snapPointsInY.length; i++) {
    if (snapPointsInY[i] === targetY) {
      return i;
    }
  }

  return 0;
};
