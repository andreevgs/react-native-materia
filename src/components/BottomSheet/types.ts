import { ViewStyle, StyleProp } from "react-native";
import { ReactNode } from "react";

export interface BottomSheetCoreProps {
  /**
   * Content of the bottom sheet.
   */
  children: ReactNode;

  /**
   * Snap points in percentage or absolute pixels (e.g., ['50%', '100%'] or [200, 500]).
   * For Phase 2, we just define them, physics will be in Phase 3.
   */
  snapPoints?: (string | number)[];

  /**
   * Callback when the bottom sheet is dismissed.
   */
  onDismiss?: () => void;

  /**
   * Additional style for the bottom sheet container.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Callback when the bottom sheet starts to dismiss via gesture.
   */
  onDismissStart?: () => void;

  /**
   * Defines the z-order of the bottom sheet container, useful for stacking multiple sheets.
   */
  zIndex?: number;
}

/**
 * Props for the standalone `BottomSheet` component.
 * Serves as the public API contract for non-modal bottom sheets, inheriting core sheet properties.
 */
export interface BottomSheetProps extends BottomSheetCoreProps {}

export interface ModalBottomSheetProps extends BottomSheetProps {
  /**
   * Whether the modal is currently visible.
   */
  visible: boolean;

  /**
   * Optional custom name for the portal host if not using 'root'.
   */
  hostName?: string;

  /**
   * Accessibility label for the background scrim (e.g. for screen readers to announce "Close").
   * @default "Close bottom sheet"
   */
  scrimAccessibilityLabel?: string;
}
