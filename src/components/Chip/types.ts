import { ReactNode } from "react";
import {
  ViewStyle,
  TextStyle,
  StyleProp,
  GestureResponderEvent,
  PressableProps,
} from "react-native";
import type { IconSource } from "../../types";

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
