import { StyleProp, ViewStyle } from "react-native";
import { IconSource } from "../../types";

export type IconButtonMode = "filled" | "tonal" | "outlined" | "standard";

export interface IconButtonProps {
  icon: IconSource;
  mode?: IconButtonMode;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export interface IconButtonStyleConfig {
  backgroundColor: string;
  iconColor: string;
  borderColor: string;
}
