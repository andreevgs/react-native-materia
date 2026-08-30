import { ComponentType, ReactNode } from "react";
import { StyleProp, ViewStyle, AccessibilityProps } from "react-native";

export interface MateriaIconProps extends AccessibilityProps {
  color: string;
  size: number;
  style?: StyleProp<ViewStyle>;
}

export type MateriaIcon = ComponentType<MateriaIconProps>;

export interface MateriaIconography {

  "arrow-back-rounded": MateriaIcon;
  "arrow-forward-rounded": MateriaIcon;
  "close-rounded": MateriaIcon;
  "menu-rounded": MateriaIcon;
  "check-rounded": MateriaIcon;
  "add-rounded": MateriaIcon;
  "chevron-right-rounded": MateriaIcon;
  "info-rounded": MateriaIcon;
  "info-outline-rounded": MateriaIcon;
  "home-outline-rounded": MateriaIcon;
  "home-rounded": MateriaIcon;
  "settings-outline-rounded": MateriaIcon;
  "settings-rounded": MateriaIcon;
  "error-rounded": MateriaIcon;
  "delete-rounded": MateriaIcon;
}

export type MateriaIconName = keyof MateriaIconography;

export type IconSource =
  | MateriaIconName
  | MateriaIcon
  | ((props: MateriaIconProps) => ReactNode);
