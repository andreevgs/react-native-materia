import { ReactNode } from "react";
import { ViewStyle, TextStyle, StyleProp, PressableProps } from "react-native";
import { IconSource } from "../../types";

export type ButtonMode = "filled" | "tonal" | "outlined" | "elevated" | "text";

export interface ButtonProps extends Omit<PressableProps, "style"> {
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
