import { TextProps as RNTextProps } from "react-native";
import { TypographyVariant } from "../../core/typography/types";

export interface MateriaTextProps extends RNTextProps {
  variant?: TypographyVariant;
}
