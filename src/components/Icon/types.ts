import { StyleProp, ViewStyle, AccessibilityProps } from "react-native";
import { IconSource } from "../../types";

export interface IconProps extends AccessibilityProps {
  source: IconSource;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
