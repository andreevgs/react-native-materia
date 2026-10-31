import { useState, useCallback, useMemo, useEffect, useRef, useId } from "react";
import {
  LayoutChangeEvent,
  GestureResponderEvent,
  Platform,
  NativeSyntheticEvent,
  TargetedEvent,
  MouseEvent,
} from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

import {
  UseRippleOptions,
  RippleController,
  RippleItem,
  WebPointerEvent,
} from "./types";
import {
  STATE_LAYER_HOVER_TRANSITION_MS,
  STATE_LAYER_FOCUS_TRANSITION_MS,
  RIPPLE_PRESS_DELAY_MS,
  RIPPLE_MAX_CONCURRENT_COUNT,
} from "./const";
import { useMateriaColors, useMateriaTokens } from "../../core";
import {
  canUseNativeRipple,
  canUseNativeRippleForeground,
  getRippleColors,
  isWebFocusVisible,
} from "./utils";

export const useRipple = ({
  color,
  centered = false,
  borderless = false,
  disabled = false,
  useNativeEffect = true,
  pressDelay,
  onPressIn,
  onPressOut,
  onHoverIn,
  onHoverOut,
  onFocus,
  onBlur,
}: UseRippleOptions = {}): RippleController => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const hasNativeRipple = canUseNativeRipple(useNativeEffect);
  const useForeground = canUseNativeRippleForeground(borderless);

  const { solidColor, nativeColor } = useMemo(
    () =>
      getRippleColors(
        color,
        colors.onSurface,
        tokens.stateOpacity.pressed,
      ),
    [color, colors.onSurface, tokens.stateOpacity.pressed],
  );

  const hostLayoutRef = useRef({ width: 0, height: 0 });

  const onHostLayout = useCallback((e: LayoutChangeEvent) => {
    hostLayoutRef.current = e.nativeEvent.layout;
  }, []);

  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const stateLayerOpacity = useSharedValue(0);

  const isDisabled = Boolean(disabled);

  const updateStateLayer = useCallback(() => {
    if (isDisabled) {
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
  }, [isDisabled, tokens.stateOpacity, stateLayerOpacity]);

  useEffect(() => {
    updateStateLayer();
  }, [isDisabled, updateStateLayer]);

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
      const { width, height } = hostLayoutRef.current;
      if (hasNativeRipple || width === 0 || height === 0) return;

      const posX =
        centered || typeof x !== "number" || isNaN(x) ? width / 2 : x;
      const posY =
        centered || typeof y !== "number" || isNaN(y) ? height / 2 : y;

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
    [hasNativeRipple, idPrefix, centered],
  );

  const removeRipple = useCallback((key: string) => {
    setRipples((prev) => prev.filter((r) => r.uniqueKey !== key));
  }, []);

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      if (isDisabled) return;
      addRipple(e.nativeEvent.locationX, e.nativeEvent.locationY, true);
      onPressIn?.(e);
    },
    [isDisabled, addRipple, onPressIn],
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

  const handlers = useMemo(
    () => ({
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
      onHoverIn: handleHoverIn,
      onHoverOut: handleHoverOut,
      onFocus: handleFocus,
      onBlur: handleBlur,
      android_ripple: androidRippleConfig,
      unstable_pressDelay: delay > 0 ? delay : undefined,
    }),
    [
      handlePressIn,
      handlePressOut,
      handleHoverIn,
      handleHoverOut,
      handleFocus,
      handleBlur,
      androidRippleConfig,
      delay,
    ],
  );

  return {
    handlers,
    onHostLayout,
    ripples,
    stateLayerOpacity,
    solidColor,
    pressedOpacity: tokens.stateOpacity.pressed,
    borderless,
    hasNativeRipple,
    removeRipple,
  };
};
