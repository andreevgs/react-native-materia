import { useCallback, useMemo, forwardRef } from "react";
import { StyleSheet, View, LayoutChangeEvent, Pressable } from "react-native";
import { TouchableRippleProps } from "./types";
import { webTouchStyle, webDisabledStyle } from "./const";
import { extractBorderRadiusStyles } from "./utils";
import { useRipple } from "./useRipple";
import { RippleHost } from "./RippleHost";

export const TouchableRipple = forwardRef<View, TouchableRippleProps>(
  (
    {
      style,
      contentContainerStyle,
      children,
      onLongPress,
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
      onFocus,
      onBlur,
      onLayout,
      borderless = false,
      disabled = false,
      rippleColor,
      useNativeEffect = false,
      contentPointerEvents = "none",
      pressDelay,
      accessibilityRole,
      accessibilityState,
      ...props
    },
    ref,
  ) => {
    const ripple = useRipple({
      color: rippleColor,
      borderless,
      disabled,
      pressDelay,
      useNativeEffect,
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
      onFocus,
      onBlur,
    });

    const borderStyles = useMemo(
      () => extractBorderRadiusStyles(style),
      [style],
    );

    const handleLayout = useCallback(
      (e: LayoutChangeEvent) => {
        ripple.onHostLayout(e);
        onLayout?.(e);
      },
      [ripple, onLayout],
    );

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        accessibilityRole={
          accessibilityRole ?? (props.onPress ? "button" : undefined)
        }
        accessibilityState={{
          disabled: Boolean(disabled),
          ...accessibilityState,
        }}
        onLongPress={onLongPress}
        onLayout={handleLayout}
        focusable={!disabled}
        style={[
          borderless ? styles.borderless : styles.clipping,
          disabled && styles.disabledWeb,
          style,
        ]}
        {...ripple.handlers}
        {...props}
      >
        <View
          style={contentContainerStyle}
          pointerEvents={contentPointerEvents}
        >
          {children}
        </View>

        <RippleHost
          ripple={ripple}
          borderStyles={borderStyles}
          borderless={borderless}
        />
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  clipping: {
    overflow: "hidden",
    ...webTouchStyle,
  },
  borderless: {
    overflow: "visible",
    ...webTouchStyle,
  },
  disabledWeb: {
    ...webDisabledStyle,
  },
});

TouchableRipple.displayName = "TouchableRipple";
