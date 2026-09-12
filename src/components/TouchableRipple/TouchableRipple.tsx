import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useId,
  forwardRef,
} from "react";
import {
  StyleSheet,
  View,
  LayoutChangeEvent,
  Pressable,
  GestureResponderEvent,
  Platform,
  NativeSyntheticEvent,
  TargetedEvent,
  MouseEvent,
} from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

import { RippleItem, TouchableRippleProps, WebPointerEvent } from "./types";
import {
  STATE_LAYER_HOVER_TRANSITION_MS,
  STATE_LAYER_FOCUS_TRANSITION_MS,
  RIPPLE_PRESS_DELAY_MS,
  RIPPLE_MAX_CONCURRENT_COUNT,
  webTouchStyle,
  webDisabledStyle,
} from "./const";
import { useMateriaColors, useMateriaTokens } from "../../core";
import {
  canUseNativeRipple,
  canUseNativeRippleForeground,
  extractBorderRadiusStyles,
  getRippleColors,
  isWebFocusVisible,
} from "./utils";
import { StateLayer } from "./StateLayer";
import { RippleOverlay } from "./RippleOverlay";

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
    const colors = useMateriaColors();
    const tokens = useMateriaTokens();

    const hasNativeRipple = canUseNativeRipple(useNativeEffect);
    const useForeground = canUseNativeRippleForeground(borderless);

    const { solidColor, nativeColor } = useMemo(
      () =>
        getRippleColors(
          rippleColor,
          colors.onSurface,
          tokens.stateOpacity.pressed,
        ),
      [rippleColor, colors.onSurface, tokens.stateOpacity.pressed],
    );

    const borderStyles = useMemo(
      () => extractBorderRadiusStyles(style),
      [style],
    );

    const layoutRef = useRef({ width: 0, height: 0 });

    const handleLayout = useCallback(
      (e: LayoutChangeEvent) => {
        layoutRef.current = e.nativeEvent.layout;
        onLayout?.(e);
      },
      [onLayout],
    );

    const isHoveredRef = useRef(false);
    const isFocusedRef = useRef(false);
    const stateLayerOpacity = useSharedValue(0);

    const updateStateLayer = useCallback(() => {
      if (disabled) {
        stateLayerOpacity.value = withTiming(0, {
          duration: STATE_LAYER_HOVER_TRANSITION_MS,
        });
      } else if (isFocusedRef.current) {
        stateLayerOpacity.value = withTiming(tokens.stateOpacity.focus, {
          duration: STATE_LAYER_FOCUS_TRANSITION_MS,
        });
      } else if (isHoveredRef.current) {
        stateLayerOpacity.value = withTiming(tokens.stateOpacity.hover, {
          duration: STATE_LAYER_HOVER_TRANSITION_MS,
        });
      } else {
        stateLayerOpacity.value = withTiming(0, {
          duration: STATE_LAYER_HOVER_TRANSITION_MS,
        });
      }
    }, [disabled, tokens.stateOpacity, stateLayerOpacity]);

    useEffect(() => {
      updateStateLayer();
    }, [disabled, updateStateLayer]);

    const handleHoverIn = useCallback(
      (e: MouseEvent) => {
        if (Platform.OS === "web") {
          const nativeEvent = (e as MouseEvent & WebPointerEvent).nativeEvent;
          if (nativeEvent?.pointerType && nativeEvent.pointerType !== "mouse") {
            return;
          }
        }
        isHoveredRef.current = true;
        updateStateLayer();
        onHoverIn?.(e);
      },
      [updateStateLayer, onHoverIn],
    );

    const handleHoverOut = useCallback(
      (e: MouseEvent) => {
        isHoveredRef.current = false;
        updateStateLayer();
        onHoverOut?.(e);
      },
      [updateStateLayer, onHoverOut],
    );

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TargetedEvent>) => {
        isFocusedRef.current = isWebFocusVisible(e);
        updateStateLayer();
        onFocus?.(e);
      },
      [updateStateLayer, onFocus],
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TargetedEvent>) => {
        isFocusedRef.current = false;
        updateStateLayer();
        onBlur?.(e);
      },
      [updateStateLayer, onBlur],
    );

    const [ripples, setRipples] = useState<RippleItem[]>([]);
    const idPrefix = useId();
    const rippleCounterRef = useRef(0);

    const addRipple = useCallback(
      (x?: number, y?: number, isActive = true) => {
        const { width, height } = layoutRef.current;
        if (hasNativeRipple || width === 0 || height === 0) return;

        const posX = typeof x === "number" && !isNaN(x) ? x : width / 2;
        const posY = typeof y === "number" && !isNaN(y) ? y : height / 2;

        const id = `${idPrefix}_${++rippleCounterRef.current}`;
        setRipples((prev) => {
          const trimmed =
            prev.length >= RIPPLE_MAX_CONCURRENT_COUNT
              ? prev.slice(prev.length - (RIPPLE_MAX_CONCURRENT_COUNT - 1))
              : prev;

          const updatedPrev = trimmed.map((r) => ({
            ...r,
            isActive: false,
            isExiting: true,
          }));

          return [
            ...updatedPrev,
            {
              uniqueKey: id,
              x: posX,
              y: posY,
              isActive,
              isExiting: false,
              parentWidth: width,
              parentHeight: height,
            },
          ];
        });
      },
      [hasNativeRipple, idPrefix],
    );

    const removeRipple = useCallback((key: string) => {
      setRipples((prev) => prev.filter((r) => r.uniqueKey !== key));
    }, []);

    const handlePressIn = useCallback(
      (e: GestureResponderEvent) => {
        if (disabled) return;
        addRipple(e.nativeEvent.locationX, e.nativeEvent.locationY, true);
        onPressIn?.(e);
      },
      [disabled, addRipple, onPressIn],
    );

    const handlePressOut = useCallback(
      (e: GestureResponderEvent) => {
        setRipples((prev) =>
          prev.map((r) => (r.isActive ? { ...r, isActive: false } : r)),
        );
        onPressOut?.(e);
      },
      [onPressOut],
    );

    const defaultDelay =
      Platform.OS === "web" || hasNativeRipple ? 0 : RIPPLE_PRESS_DELAY_MS;
    const delay = pressDelay ?? defaultDelay;

    const androidRippleConfig = useMemo(() => {
      if (!hasNativeRipple) return null;
      return {
        color: nativeColor,
        borderless,
        foreground: useForeground,
      };
    }, [hasNativeRipple, nativeColor, borderless, useForeground]);

    const renderedChildren = useMemo(
      () => (
        <View
          style={contentContainerStyle}
          pointerEvents={contentPointerEvents}
        >
          {children}
        </View>
      ),
      [children, contentContainerStyle, contentPointerEvents],
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
        unstable_pressDelay={delay > 0 ? delay : undefined}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onLayout={handleLayout}
        focusable={!disabled}
        android_ripple={androidRippleConfig}
        style={[
          borderless ? styles.borderless : styles.clipping,
          disabled && styles.disabledWeb,
          style,
        ]}
        {...props}
      >
        {renderedChildren}

        <StateLayer
          color={solidColor}
          opacity={stateLayerOpacity}
          borderStyles={borderStyles}
        />

        {!hasNativeRipple && (
          <RippleOverlay
            ripples={ripples}
            color={solidColor}
            pressedOpacity={tokens.stateOpacity.pressed}
            borderless={borderless}
            borderStyles={borderStyles}
            onRippleFinished={removeRipple}
          />
        )}
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
