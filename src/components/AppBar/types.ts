import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface AppBarProps {
  leading?: ReactNode;
  trailing?: ReactNode;
  headline?: string | ReactNode;
  subtitle?: string | ReactNode;
  style?: StyleProp<ViewStyle>;
  isScrolled?: boolean;
}
