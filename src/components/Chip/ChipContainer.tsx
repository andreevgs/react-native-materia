import { Pressable, View, ViewProps } from "react-native";
import { ChipContainerProps } from "./types";

export const ChipContainer = ({
  interactive,
  disabled,
  style,
  rippleHandlers,
  onPress,
  onLongPress,
  hitSlop,
  children,
  ...restProps
}: ChipContainerProps) => {
  if (interactive) {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        focusable={!disabled}
        hitSlop={hitSlop}
        style={style}
        {...restProps}
        {...rippleHandlers}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={style} {...(restProps as ViewProps)}>
      {children}
    </View>
  );
};
