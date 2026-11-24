import { MutableRefObject, ReactNode } from "react";
import { ViewStyle, StyleProp, ScrollViewProps } from "react-native";
import { GestureType } from "react-native-gesture-handler";
import { AnimatedProps, SharedValue } from "react-native-reanimated";

/** Imperative handle exposed by BottomSheetCore, BottomSheet, and ModalBottomSheet. */
export interface BottomSheetCoreRef {
  /** Dismisses the bottom sheet off-screen. */
  dismiss: () => void;
  /** Opens the bottom sheet to the given snap point index. Defaults to `initialSnapIndex`. */
  open: (index?: number) => void;
  /** Animates the bottom sheet to the snap point at the specified index. */
  snapToIndex: (index: number) => void;
}

/** Core configuration props shared by standard and modal bottom sheets. */
export interface BottomSheetCoreProps {
  /** Content rendered inside the bottom sheet container. */
  children: ReactNode;
  /** Snap heights in percentage strings (e.g., `'50%'`) or absolute dp numbers (e.g., `200`). */
  snapPoints?: (string | number)[];
  /** Initial snap point index opened on mount or when calling `open()`. Defaults to `0`. */
  initialSnapIndex?: number;
  /** Callback invoked when the active snap point index changes (`-1` when dismissed). */
  onSnapPointChange?: (index: number) => void;
  /** Callback invoked after the bottom sheet finishes dismissing. */
  onDismiss?: () => void;
  /** Callback invoked immediately when a gesture-driven dismissal begins. */
  onDismissStart?: () => void;
  /** Additional style applied to the animated bottom sheet surface container. */
  style?: StyleProp<ViewStyle>;
  /** Z-order applied to the bottom sheet wrapper for stacking multiple sheets. */
  zIndex?: number;
}

/** Props for the standalone `BottomSheet` component. */
export interface BottomSheetProps extends BottomSheetCoreProps {}

/** Props for the `ModalBottomSheet` component rendered inside a portal with a scrim. */
export interface ModalBottomSheetProps extends BottomSheetProps {
  /** Whether the modal bottom sheet is currently visible. */
  visible: boolean;
  /** Custom portal host name to render into. Defaults to `"root"`. */
  hostName?: string;
  /** Accessibility label announced for the background scrim. Defaults to `"Close bottom sheet"`. */
  scrimAccessibilityLabel?: string;
}

/** Props for the gesture-coordinated `BottomSheetScrollView` component. */
export interface BottomSheetScrollViewProps
  extends AnimatedProps<ScrollViewProps> {
  /** Scrollable child content rendered inside the bottom sheet. */
  children?: ReactNode;
}

/** Internal context value coordinating gestures and scroll state with BottomSheetScrollView. */
export interface BottomSheetContextValue {
  /** Current Y translation offset of the bottom sheet container in dp. */
  translateY: SharedValue<number>;
  /** Active snap point index, or `-1` when dismissed. */
  currentSnapIndex: SharedValue<number>;
  /** Minimum translateY offset in dp corresponding to the highest snap point. */
  highestSnapY: SharedValue<number>;
  /** Current vertical scroll offset in dp reported by BottomSheetScrollView. */
  scrollOffsetY: SharedValue<number>;
  /** Whether a touch gesture is currently active on BottomSheetScrollView. */
  isScrollGestureActive: SharedValue<boolean>;
  /** Whether sheet pan dragging has locked inner scrolling from the top edge. */
  isSheetDraggingFromScroll: SharedValue<boolean>;
  /** Ref to the parent pan gesture for simultaneous gesture recognition. */
  panGestureRef: MutableRefObject<GestureType | undefined>;
  /** Ref to the child native scroll gesture for simultaneous gesture recognition. */
  scrollGestureRef: MutableRefObject<GestureType | undefined>;
  /** Registers or unregisters a mounted BottomSheetScrollView with the parent sheet. */
  registerScrollView: (mounted: boolean) => void;
}
