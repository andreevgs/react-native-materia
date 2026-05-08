import { ReactNode } from "react";
import {
  ViewStyle,
  TextStyle,
  StyleProp,
  GestureResponderEvent,
} from "react-native";
import type { IconSource } from "../../types";

export type ChipMode = "outlined" | "tonal" | "elevated";

export interface ChipProps {
  children: ReactNode;
  mode?: ChipMode;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  leadingIcon?: IconSource;
  trailingIcon?: IconSource;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export interface ChipStyleConfig {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  rippleColor: string;
}
