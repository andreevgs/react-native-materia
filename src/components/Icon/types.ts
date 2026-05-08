import { StyleProp, ViewStyle } from "react-native";
import { IconSource } from "../../types";

export interface IconProps {
  source: IconSource;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
