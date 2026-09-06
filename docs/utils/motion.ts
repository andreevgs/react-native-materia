import { FadeInDown, Easing } from "react-native-reanimated";
import { Tokens } from "react-native-materia/types";

/**
 * Creates an entrance transition animation complying with Material Design 3 guidelines:
 * - Emphasized Decelerate easing curve [0.05, 0.7, 0.1, 1.0]
 * - Medium duration token (300ms)
 * - Subtle upward translation (Shared Axis Y entrance)
 */
export const createPageEntranceTransition = (tokens: Tokens) => {
  return FadeInDown.duration(tokens.duration.medium2).easing(
    Easing.bezier(...tokens.easing.emphasizedDecelerate),
  );
};
