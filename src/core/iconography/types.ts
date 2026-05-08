import { ComponentType, ReactNode } from "react";
import { StyleProp, ViewStyle, AccessibilityProps } from "react-native";

export interface MateriaIconProps extends AccessibilityProps {
  color: string;
  size: number;
  style?: StyleProp<ViewStyle>;
}

export type MateriaIcon = ComponentType<MateriaIconProps>;

export interface MateriaIconography {
  "arrow-back": MateriaIcon;
  "arrow-forward": MateriaIcon;
  "close": MateriaIcon;
  "menu": MateriaIcon;
  "check": MateriaIcon;
  "add": MateriaIcon;
  "chevron-right": MateriaIcon;
  "info-rounded": MateriaIcon;
  "error": MateriaIcon;
  "delete": MateriaIcon;
}

export type MateriaIconName = keyof MateriaIconography;

export type IconSource =
  | MateriaIconName
  | MateriaIcon
  | ((props: MateriaIconProps) => ReactNode);
