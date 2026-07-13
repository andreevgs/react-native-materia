import Color from "color";
import { MateriaScheme } from "../../types";
import { SwitchStyleConfig } from "./types";

export const getSwitchColors = (
  value: boolean,
  disabled: boolean,
  colors: MateriaScheme,
): SwitchStyleConfig => {
  if (disabled) {
    if (value) {
      const disabledTrack = Color(colors.onSurface).alpha(0.12).rgb().string();
      return {
        trackColor: disabledTrack,
        thumbColor: colors.surface,
        borderColor: "transparent",
      };
    } else {
      return {
        trackColor: Color(colors.surfaceContainerHighest)
          .alpha(0.12)
          .rgb()
          .string(),
        thumbColor: Color(colors.onSurface).alpha(0.38).rgb().string(),
        borderColor: Color(colors.onSurface).alpha(0.12).rgb().string(),
      };
    }
  }

  if (value) {
    return {
      trackColor: colors.primary,
      thumbColor: colors.onPrimary,
      borderColor: colors.primary,
    };
  } else {
    return {
      trackColor: colors.surfaceContainerHighest,
      thumbColor: colors.outline,
      borderColor: colors.outline,
    };
  }
};
