import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";
import { IconSource } from "../../types";
import { SharedValue } from "react-native-reanimated";

export type TextFieldMode = "filled" | "outlined";

export interface TextFieldProps extends Omit<TextInputProps, "style"> {
  mode?: TextFieldMode;
  label?: string;
  supportingText?: string;
  leadingIcon?: IconSource;
  trailingIcon?: IconSource;
  disabled?: boolean;
  error?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export interface TextFieldStyleConfig {
  containerColor: string;
  indicatorColorInactive: string;
  indicatorColorActive: string;
  labelColor: string;
  inputColor: string;
  supportingTextColor: string;
  iconColor: string;
  caretColor: string;
}

export interface TextFieldLabelProps {
  label: string;
  populateAnim: SharedValue<number>;
  labelColor: string;
  labelStyle?: StyleProp<TextStyle>;
  labelWidth: SharedValue<number>;
  mode: TextFieldMode;
  hasLeadingIcon: boolean;
}

export interface TextFieldOutlineProps {
  populateAnim: SharedValue<number>;
  activeAnim: SharedValue<number>;
  labelWidth: SharedValue<number>;
  indicatorColorInactive: string;
  indicatorColorActive: string;
  hasLabel: boolean;
}

export interface TextFieldIndicatorProps {
  activeAnim: SharedValue<number>;
  indicatorColorInactive: string;
  indicatorColorActive: string;
}

export interface TextFieldSupportingTextProps {
  supportingText?: string;
  supportingTextColor: string;
}
