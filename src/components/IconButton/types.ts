import { PressableProps, StyleProp, ViewStyle } from "react-native";
import { IconSource } from "../../types";

export type IconButtonMode = "filled" | "tonal" | "outlined" | "standard";

export interface IconButtonProps extends Omit<PressableProps, "style"> {
  icon: IconSource;
  mode?: IconButtonMode;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface IconButtonStyleConfig {
  backgroundColor: string;
  iconColor: string;
  borderColor: string;
}
