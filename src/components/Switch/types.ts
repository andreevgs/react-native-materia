import { StyleProp, ViewStyle } from "react-native";

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  pressed?: boolean;
}

export interface SwitchStyleConfig {
  trackColor: string;
  thumbColor: string;
  borderColor: string;
}
