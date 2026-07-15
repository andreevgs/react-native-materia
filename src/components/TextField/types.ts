import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";
import { IconSource } from "../../types";

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
