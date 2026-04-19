import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { TouchableRippleProps } from "../TouchableRipple/types";

export type ListVariant = "standard" | "segmented";

export interface ListItemProps extends Omit<TouchableRippleProps, "children"> {
  headline: string;
  supportingText?: string;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
}

export interface ListProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: "standard" | "segmented";
}
