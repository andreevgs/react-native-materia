import { StyleProp, ViewStyle, AccessibilityProps } from "react-native";

export interface MateriaIconProps extends AccessibilityProps {
  color: string;
  size: number;
  style?: StyleProp<ViewStyle>;
}
