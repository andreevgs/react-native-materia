import { ReactNode } from "react";
import { ViewStyle, TextStyle, StyleProp } from "react-native";
import { IconSource } from "../../core/icons";

export type ButtonMode = "filled" | "tonal" | "outlined" | "elevated" | "text";

export interface ButtonProps {
  children: ReactNode;
  mode?: ButtonMode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: IconSource;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  elevationLevel?: number;
}

export interface ButtonStyleConfig {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  rippleColor: string;
}
