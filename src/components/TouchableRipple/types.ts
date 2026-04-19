import { StyleProp, ViewStyle, PressableProps, ViewProps } from "react-native";

export interface TouchableRippleProps extends Omit<PressableProps, "style"> {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  borderless?: boolean;
  rippleColor?: string;
  useNativeEffect?: boolean;
  contentPointerEvents?: ViewProps["pointerEvents"];
}

export type RippleItem = {
  uniqueKey: string;
  isActive: boolean;
  x: number;
  y: number;
};

export interface RippleProps {
  x: number;
  y: number;
  color: string;
  initialOpacity: number;
  parentWidth: number;
  parentHeight: number;
  onFinished: (key: string) => void;
  uniqueKey: string;
  isActive: boolean;
}
