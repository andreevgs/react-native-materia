import { ComponentType, ReactNode } from "react";
import { MateriaIconProps } from "../../icons/types";

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
  "info-outline-rounded": MateriaIcon;
  "home-outline-rounded": MateriaIcon;
  "home-rounded": MateriaIcon;
  "settings-outline-rounded": MateriaIcon;
  "settings-rounded": MateriaIcon;
  "error": MateriaIcon;
  "delete": MateriaIcon;
}

export type MateriaIconName = keyof MateriaIconography;

export type IconSource =
  | MateriaIconName
  | MateriaIcon
  | ((props: MateriaIconProps) => ReactNode);
