import React, {
  useMemo,
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  LayoutChangeEvent,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import { useMateriaColors, useMateriaTokens } from "../../core";
import { BottomSheetCoreProps } from "./types";
import { getBottomSheetColors, getBottomSheetShadowStyle } from "./utils";
import { Tokens } from "../../core/theme/types";
import {
  BOTTOM_SHEET_MAX_WIDTH,
  BOTTOM_SHEET_LARGE_SCREEN_MARGIN,
  BOTTOM_SHEET_SPRING_CONFIG,
} from "./const";

export interface BottomSheetCoreRef {
  dismiss: () => void;
  open: () => void;
}

export const BottomSheetCore = forwardRef<
  BottomSheetCoreRef,
  BottomSheetCoreProps
>(({ children, style, onDismiss, onDismissStart, zIndex }, ref) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const insets = useSafeAreaInsets();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const isLargeScreen = windowWidth > BOTTOM_SHEET_MAX_WIDTH;
  const [sheetHeight, setSheetHeight] = useState(0);

  const translateY = useSharedValue(windowHeight);
  const dragOffset = useSharedValue(0);

  const { containerColor, dragHandleColor } = useMemo(
    () => getBottomSheetColors(colors),
    [colors],
  );

  const shadowStyle = useMemo(
    () => getBottomSheetShadowStyle(tokens, colors),
    [tokens, colors],
  );

  const styles = useMemo(
    () => createStyles(tokens, insets, isLargeScreen, zIndex),
    [tokens, insets, isLargeScreen, zIndex],
  );

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      if (sheetHeight === 0 && height > 0) {
        setSheetHeight(height);
        translateY.value = withSpring(0, BOTTOM_SHEET_SPRING_CONFIG);
      }
    },
    [sheetHeight, translateY],
  );

  const handleDismiss = useCallback(() => {
    if (onDismiss) onDismiss();
  }, [onDismiss]);

  useImperativeHandle(ref, () => ({
    dismiss: () => {
      translateY.value = withSpring(
        sheetHeight > 0 ? sheetHeight : windowHeight,
        BOTTOM_SHEET_SPRING_CONFIG,
        (finished) => {
          if (finished) runOnJS(handleDismiss)();
        },
      );
    },
    open: () => {
      translateY.value = withSpring(0, BOTTOM_SHEET_SPRING_CONFIG);
    },
  }));

  const panGesture = Gesture.Pan()
    .onStart(() => {
      dragOffset.value = translateY.value;
    })
    .onUpdate((event) => {
      const newY = event.translationY + dragOffset.value;
      if (newY < 0) {
        translateY.value = newY * 0.15;
      } else {
        translateY.value = newY;
      }
    })
    .onEnd((event) => {
      if (event.velocityY > 1000 || translateY.value > sheetHeight * 0.4) {
        if (onDismissStart) runOnJS(onDismissStart)();
        translateY.value = withSpring(
          sheetHeight,
          { ...BOTTOM_SHEET_SPRING_CONFIG, velocity: event.velocityY },
          (finished) => {
            if (finished) runOnJS(handleDismiss)();
          },
        );
      } else {
        translateY.value = withSpring(0, {
          ...BOTTOM_SHEET_SPRING_CONFIG,
          velocity: event.velocityY,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <GestureDetector gesture={panGesture}>
        <Animated.View
          onLayout={handleLayout}
          role="dialog"
          accessibilityViewIsModal={true}
          importantForAccessibility="yes"
          style={[
            styles.container,
            shadowStyle,
            { backgroundColor: containerColor },
            animatedStyle,
            style,
          ]}
        >
          <View style={styles.dragHandleContainer}>
            <View
              style={[styles.dragHandle, { backgroundColor: dragHandleColor }]}
            />
          </View>

          <View style={styles.content}>{children}</View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
});

const createStyles = (
  tokens: Tokens,
  insets: EdgeInsets,
  isLargeScreen: boolean,
  zIndex?: number,
) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      zIndex,
    },
    container: {
      width: "100%",
      maxWidth: BOTTOM_SHEET_MAX_WIDTH,
      borderTopLeftRadius: tokens.shape.extraLarge,
      borderTopRightRadius: tokens.shape.extraLarge,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      marginHorizontal: isLargeScreen ? BOTTOM_SHEET_LARGE_SCREEN_MARGIN : 0,
    },
    dragHandleContainer: {
      width: "100%",
      alignItems: "center",
      paddingVertical: 22,
    },
    dragHandle: {
      width: 32,
      height: 4,
      borderRadius: 2,
    },
    content: {
      paddingBottom: insets.bottom,
    },
  });
