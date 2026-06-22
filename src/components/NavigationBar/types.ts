import { IconSource } from "../../types";

export type NavigationRoute = {
  key: string;
  label?: string;
  icon?: IconSource;
  activeIcon?: IconSource;
  accessibilityLabel?: string;
};

export interface NavigationBarProps {
  routes: NavigationRoute[];
  selectedIndex: number;
  onTabPress: (index: number, key: string) => void;
}

export interface NavigationBarItemProps {
  route: NavigationRoute;
  isActive: boolean;
  onPress: () => void;
}
