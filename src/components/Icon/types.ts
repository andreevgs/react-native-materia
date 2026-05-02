import { ColorValue, StyleProp, ViewStyle } from "react-native";
import { IconSource } from "../../core/icons";

export interface IconProps {
  source: IconSource;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
}
