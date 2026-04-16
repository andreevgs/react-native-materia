import { ColorValue, StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import { CoreIconName } from "../../types";

export type IconName = CoreIconName | (string & {});

export type IconSource = IconName | React.FC<SvgProps>;

export interface IconProps {
  source: IconSource;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
}
