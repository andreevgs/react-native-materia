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
}

export interface BottomSheetProps extends Omit<BottomSheetCoreProps, 'onDismiss'> {
  /**
   * Optional callback when sheet finishes its closing animation, if applicable.
   */
  onDismiss?: () => void;
}

export interface ModalBottomSheetProps extends BottomSheetProps {
  /**
   * Whether the modal is currently visible.
   */
  visible: boolean;
  
  /**
   * Optional custom name for the portal host if not using 'root'.
   */
  hostName?: string;
}
