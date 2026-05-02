import { ViewStyle } from "react-native";
import { MateriaScheme, Tokens } from "../../core/theme/types";
import { ListVariant } from "./types";

export const getListItemStyle = (
  variant: ListVariant,
  tokens: Tokens,
  colors: MateriaScheme,
): ViewStyle => {
  const map: Record<ListVariant, ViewStyle> = {
    standard: {
      backgroundColor: "transparent",
      borderRadius: tokens.shape.none,
    },
    segmented: {
      backgroundColor: colors.surfaceContainer,
      borderRadius: tokens.shape.extraSmall,
    },
  };
  return map[variant];
};

export const getListStyle = (
  variant: ListVariant,
  tokens: Tokens,
): ViewStyle => {
  const map: Record<ListVariant, ViewStyle> = {
    standard: {},
    segmented: {
      gap: tokens.spacing.xxs,
      borderRadius: tokens.shape.large,
      overflow: "hidden",
    },
  };
  return map[variant];
};
