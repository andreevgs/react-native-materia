import { ReactNode } from "react";
import {
  ViewStyle,
  TextStyle,
  StyleProp,
  GestureResponderEvent,
  PressableProps,
  AccessibilityRole,
  AccessibilityState,
} from "react-native";
import type { IconSource } from "../../types";
import type { RippleTriggerHandlers } from "../TouchableRipple";

/** Semantic Material Design 3 chip variants. */
export type ChipVariant = "assist" | "filter" | "input" | "suggestion";

/** Shared props common to all chip variants. */
export interface BaseChipProps extends Omit<PressableProps, "style" | "children"> {
  /** Label text or element rendered inside the chip. */
  children: ReactNode;
  /** Whether interaction is disabled. Defaults to `false`. */
  disabled?: boolean;
  /** Optional icon rendered before the label (18dp). */
  leadingIcon?: IconSource;
  /** Custom style for the outer chip container. */
  style?: StyleProp<ViewStyle>;
  /** Custom style for the label text. */
  labelStyle?: StyleProp<TextStyle>;
}

/** Props for the AssistChip component. */
export interface AssistChipProps extends BaseChipProps {
  /** Whether the chip uses an elevated surface container instead of an outline. Defaults to `false`. */
  elevated?: boolean;
}

/** Props for the FilterChip component. */
export interface FilterChipProps extends BaseChipProps {
  /** Whether the filter chip is currently selected. Defaults to `false`. */
  selected?: boolean;
  /** Whether the chip uses an elevated surface container. Defaults to `false`. */
  elevated?: boolean;
  /** Whether to display a leading checkmark icon (18dp) when selected. Defaults to `true`. */
  showCheckmark?: boolean;
  /** Optional trailing icon (18dp), e.g., a dropdown indicator. */
  trailingIcon?: IconSource;
  /** Optional handler making the trailing icon an independent button. */
  onTrailingIconPress?: (e: GestureResponderEvent) => void;
  /** Accessibility label for the interactive trailing icon button. */
  trailingAccessibilityLabel?: string;
}

/** Props for the InputChip component. */
export interface InputChipProps extends BaseChipProps {
  /** Whether the input chip is currently selected. Defaults to `false`. */
  selected?: boolean;
  /** Optional trailing icon (18dp). Defaults to `"close-rounded"` when `onClose` is provided. */
  trailingIcon?: IconSource;
  /** Handler invoked when the trailing remove button is pressed. */
  onClose?: (e: GestureResponderEvent) => void;
  /** Accessibility label for the close button. Defaults to `"Remove"`. */
  closeAccessibilityLabel?: string;
}

/** Props for the SuggestionChip component. */
export interface SuggestionChipProps extends BaseChipProps {
  /** Whether the chip uses an elevated surface container instead of an outline. Defaults to `false`. */
  elevated?: boolean;
}

/** Discriminated union props for the unified Chip component. */
export type ChipProps =
  | ({
      /** Chip variant determining behavior and MD3 color tokens. Defaults to `"assist"`. */
      variant?: "assist";
    } & AssistChipProps)
  | ({
      /** Chip variant determining behavior and MD3 color tokens. */
      variant: "filter";
    } & FilterChipProps)
  | ({
      /** Chip variant determining behavior and MD3 color tokens. */
      variant: "input";
    } & InputChipProps)
  | ({
      /** Chip variant determining behavior and MD3 color tokens. */
      variant: "suggestion";
    } & SuggestionChipProps);

/** Internal props for the shared ChipCore engine. */
export interface ChipCoreProps extends BaseChipProps {
  /** Semantic chip variant. */
  variant: ChipVariant;
  /** Whether the chip is currently selected. Defaults to `false`. */
  selected?: boolean;
  /** Whether the chip uses an elevated surface container. Defaults to `false`. */
  elevated?: boolean;
  /** Whether to display a leading checkmark icon (18dp) when selected. Defaults to `false`. */
  showCheckmark?: boolean;
  /** Optional trailing icon (18dp). */
  trailingIcon?: IconSource;
  /** Optional handler invoked when the trailing action button is pressed. */
  onTrailingPress?: (e: GestureResponderEvent) => void;
  /** Accessibility label for the trailing action button. */
  trailingAccessibilityLabel?: string;
}

/** Internal resolved color and border configuration for the current chip state. */
export interface ChipStyleConfig {
  /** Container background color. */
  backgroundColor: string;
  /** Container border stroke color. */
  borderColor: string;
  /** Container border stroke width in dp. */
  borderWidth: number;
  /** Label text color. */
  labelColor: string;
  /** Leading icon or checkmark color. */
  leadingIconColor: string;
  /** Trailing icon color. */
  trailingIconColor: string;
  /** Base color passed to TouchableRipple for state layer and ripple rendering. */
  stateLayerColor: string;
}

/** Props for the primary ChipContainer wrapper. */
export interface ChipContainerProps
  extends Omit<PressableProps, "style" | "children"> {
  /** Whether the primary chip area is interactive and renders as a Pressable. */
  interactive: boolean;
  /** Whether interaction is disabled. */
  disabled: boolean;
  /** Style applied to the primary container. */
  style?: StyleProp<ViewStyle>;
  /** Ripple and state layer event handlers from useRipple. */
  rippleHandlers: RippleTriggerHandlers;
  /** Inner content of the primary chip area. */
  children: ReactNode;
}

/** Props for the ChipContent sub-component. */
export interface ChipContentProps {
  /** Label text or element rendered inside the chip. */
  children: ReactNode;
  /** Optional leading icon or checkmark rendered before the label. */
  leadingIcon?: IconSource;
  /** Resolved tint color for the leading icon. */
  leadingIconColor: string;
  /** Optional static trailing icon rendered after the label. */
  trailingIcon?: IconSource;
  /** Resolved tint color for the static trailing icon. */
  trailingIconColor: string;
  /** Resolved color for the label text. */
  labelColor: string;
  /** Custom style overrides for the label text. */
  labelStyle?: StyleProp<TextStyle>;
  /** Icon size in dp. */
  iconSize: number;
}

/** Props for the ChipTrailingButton sub-component. */
export interface ChipTrailingButtonProps {
  /** Icon rendered inside the trailing action button. */
  icon: IconSource;
  /** Resolved tint color for the trailing icon. */
  color: string;
  /** Icon size in dp. */
  size: number;
  /** Base color used for the button state layer and ripple wave. */
  stateLayerColor: string;
  /** Whether the trailing action button is disabled. */
  disabled: boolean;
  /** Right margin in dp aligning the button inside the chip surface. */
  marginRight: number;
  /** Accessibility label for screen readers. */
  accessibilityLabel?: string;
  /** Callback fired when the trailing action button is pressed. */
  onPress: (e: GestureResponderEvent) => void;
}

/** State flags used to compute chip color and border tokens. */
export interface GetChipColorsOptions {
  /** Whether the chip uses an elevated surface container. */
  elevated: boolean;
  /** Whether the chip is currently selected. */
  selected: boolean;
  /** Whether the chip is disabled. */
  disabled: boolean;
}

/** Input options for computing horizontal chip padding and trailing button offsets. */
export interface GetChipLayoutOptions {
  /** Whether a leading icon or checkmark is present. */
  hasLeading: boolean;
  /** Whether a trailing icon or action button is present. */
  hasTrailing: boolean;
}

/** Calculated spacing and margin metrics in dp for the chip layout. */
export interface ChipLayoutMetrics {
  /** Vertical padding inside the primary content container in dp. */
  paddingVertical: number;
  /** Left horizontal padding inside the primary area in dp. */
  paddingLeft: number;
  /** Right horizontal padding inside the primary area when no interactive trailing button is present in dp. */
  paddingRight: number;
  /** Right padding between the label and the interactive trailing button in dp. */
  trailingButtonGap: number;
  /** Right margin applied to the interactive trailing button in dp. */
  trailingButtonRightMargin: number;
}

/** Input options for resolving accessibility role and state on the primary chip element. */
export interface GetChipAccessibilityOptions {
  /** Whether interaction is disabled. */
  disabled: boolean;
  /** Whether the chip is currently selected. */
  selected: boolean;
  /** Whether the primary chip surface has an active press handler. */
  isInteractive: boolean;
  /** Explicit accessibility role override. */
  accessibilityRole?: AccessibilityRole;
  /** Explicit accessibility state override. */
  accessibilityState?: AccessibilityState;
}

/** Resolved accessibility props applied to the primary chip surface. */
export interface ChipAccessibilityConfig {
  /** Resolved semantic role for screen readers. */
  accessibilityRole?: AccessibilityRole;
  /** Resolved accessibility state flags. */
  accessibilityState: AccessibilityState;
}
