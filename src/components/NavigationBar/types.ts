import { IconSource } from "../../types";

/** Route item descriptor for navigation bar tabs. */
export type NavigationRoute = {
  /** Unique key identifying the route. */
  key: string;
  /** Visible label text displayed beneath the icon. */
  label: string;
  /** Inactive or default icon source. */
  icon?: IconSource;
  /** Active icon source displayed when tab is selected. */
  activeIcon?: IconSource;
  /** Accessibility label for assistive technologies. */
  accessibilityLabel?: string;
};

/** Props for the NavigationBar component. */
export interface NavigationBarProps {
  /** Array of route items to display. */
  routes: NavigationRoute[];
  /** Index of currently active route tab. */
  selectedIndex: number;
  /** Callback fired when a tab is pressed. */
  onTabPress: (index: number, key: string) => void;
}

/** Props for an individual NavigationBarItem sub-component. */
export interface NavigationBarItemProps {
  /** Route descriptor for this item. */
  route: NavigationRoute;
  /** Index of this tab item. */
  index: number;
  /** Whether this tab is currently selected. */
  isActive: boolean;
  /** Global tab press handler passed down from NavigationBar. */
  onTabPress: (index: number, key: string) => void;
}
