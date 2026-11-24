import React, {
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  LayoutChangeEvent,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import { useMateriaColors, useMateriaTokens } from "../../core";
import { BottomSheetCoreProps, BottomSheetCoreRef } from "./types";
import {
  getBottomSheetShadowStyle,
  getBottomSheetContainerStyle,
  getBottomSheetDragHandleStyle,
  parseSnapPoints,
  getClosestSnapPoint,
  getSnapPointIndex,
} from "./utils";
import { BottomSheetContext } from "./BottomSheetContext";
import { Tokens } from "../../core/theme/types";
import {
  BOTTOM_SHEET_MAX_WIDTH,
  BOTTOM_SHEET_LARGE_SCREEN_MARGIN,
  BOTTOM_SHEET_SPRING_CONFIG,
  BOTTOM_SHEET_OVERSCROLL_SKIRT_HEIGHT,
  BOTTOM_SHEET_VELOCITY_DECAY_FACTOR,
  BOTTOM_SHEET_DISMISS_VELOCITY_THRESHOLD,
  BOTTOM_SHEET_OVERSCROLL_RESISTANCE,
  BOTTOM_SHEET_DISMISS_THRESHOLD_RATIO,
} from "./const";

export type { BottomSheetCoreRef } from "./types";

export const BottomSheetCore = forwardRef<
  BottomSheetCoreRef,
  BottomSheetCoreProps
>(
  (
    {
      children,
      snapPoints,
      initialSnapIndex = 0,
      onSnapPointChange,
      style,
      onDismiss,
      onDismissStart,
      zIndex,
    },
    ref,
  ) => {
    const colors = useMateriaColors();
    const tokens = useMateriaTokens();
    const insets = useSafeAreaInsets();
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();

    const isLargeScreen = windowWidth > BOTTOM_SHEET_MAX_WIDTH;
    const [containerHeight, setContainerHeight] = useState(windowHeight);
    const [sheetHeight, setSheetHeight] = useState(0);
    const [scrollViewCount, setScrollViewCount] = useState(0);

    const hasOpenedRef = useRef(false);
    const panGestureRef = useRef<GestureType | undefined>(undefined);
    const scrollGestureRef = useRef<GestureType | undefined>(undefined);

    const hasSnapPoints = Boolean(snapPoints && snapPoints.length > 0);
    const parsedSnapPoints = useMemo(
      () =>
        hasSnapPoints && snapPoints
          ? parseSnapPoints(snapPoints, containerHeight, insets.top)
          : [],
      [hasSnapPoints, snapPoints, containerHeight, insets.top],
    );

    const highestSnapYValue =
      parsedSnapPoints.length > 0
        ? parsedSnapPoints[parsedSnapPoints.length - 1]!
        : 0;

    const translateY = useSharedValue(windowHeight);
    const dragOffset = useSharedValue(0);
    const panStartTranslationY = useSharedValue(0);
    const isPanTakingOver = useSharedValue(false);
    const currentSnapIndex = useSharedValue(-1);
    const snapPointsY = useSharedValue<number[]>(parsedSnapPoints);
    const highestSnapY = useSharedValue(highestSnapYValue);
    const sheetHeightSV = useSharedValue(0);
    const scrollOffsetY = useSharedValue(0);
    const isScrollGestureActive = useSharedValue(false);
    const isSheetDraggingFromScroll = useSharedValue(false);

    useEffect(() => {
      snapPointsY.value = parsedSnapPoints;
      highestSnapY.value = highestSnapYValue;
    }, [parsedSnapPoints, highestSnapYValue, snapPointsY, highestSnapY]);

    useEffect(() => {
      sheetHeightSV.value = sheetHeight;
    }, [sheetHeight, sheetHeightSV]);

    const notifySnapPointChange = useCallback(
      (index: number) => {
        onSnapPointChange?.(index);
      },
      [onSnapPointChange],
    );

    const notifyDismissStart = useCallback(() => {
      onDismissStart?.();
    }, [onDismissStart]);

    const handleDismiss = useCallback(() => {
      onDismiss?.();
    }, [onDismiss]);

    useEffect(() => {
      if (
        hasOpenedRef.current &&
        currentSnapIndex.value >= 0 &&
        parsedSnapPoints.length > 0
      ) {
        const clamped = Math.max(
          0,
          Math.min(currentSnapIndex.value, parsedSnapPoints.length - 1),
        );
        if (clamped !== currentSnapIndex.value) {
          currentSnapIndex.value = clamped;
          notifySnapPointChange(clamped);
        }
        translateY.value = withSpring(
          parsedSnapPoints[clamped]!,
          BOTTOM_SHEET_SPRING_CONFIG,
        );
      }
    }, [parsedSnapPoints, currentSnapIndex, notifySnapPointChange, translateY]);

    const bottomSheetContainerStyle = useMemo(
      () => getBottomSheetContainerStyle(colors),
      [colors],
    );
    const bottomSheetDragHandleStyle = useMemo(
      () => getBottomSheetDragHandleStyle(colors),
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

    const snapContainerStyle = useMemo(
      () =>
        hasSnapPoints && containerHeight > 0
          ? { height: containerHeight + BOTTOM_SHEET_OVERSCROLL_SKIRT_HEIGHT }
          : undefined,
      [hasSnapPoints, containerHeight],
    );

    const snapContentStyle = useMemo(
      () =>
        hasSnapPoints
          ? { flex: 1, paddingBottom: highestSnapYValue + insets.bottom }
          : undefined,
      [hasSnapPoints, highestSnapYValue, insets.bottom],
    );

    const handleWrapperLayout = useCallback(
      (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        if (height > 0 && height !== containerHeight) {
          setContainerHeight(height);
        }
      },
      [containerHeight],
    );

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        const actualHeight = height - BOTTOM_SHEET_OVERSCROLL_SKIRT_HEIGHT;
        if (actualHeight <= 0) {
          return;
        }

        if (actualHeight !== sheetHeight) {
          setSheetHeight(actualHeight);
          sheetHeightSV.value = actualHeight;
        }

        if (!hasOpenedRef.current) {
          hasOpenedRef.current = true;
          if (parsedSnapPoints.length > 0) {
            const clampedIndex = Math.max(
              0,
              Math.min(initialSnapIndex, parsedSnapPoints.length - 1),
            );
            const targetY = parsedSnapPoints[clampedIndex]!;
            currentSnapIndex.value = clampedIndex;
            notifySnapPointChange(clampedIndex);
            translateY.value = withSpring(targetY, BOTTOM_SHEET_SPRING_CONFIG);
          } else {
            currentSnapIndex.value = 0;
            notifySnapPointChange(0);
            translateY.value = withSpring(0, BOTTOM_SHEET_SPRING_CONFIG);
          }
        }
      },
      [
        sheetHeight,
        sheetHeightSV,
        parsedSnapPoints,
        initialSnapIndex,
        currentSnapIndex,
        notifySnapPointChange,
        translateY,
      ],
    );

    const snapToIndex = useCallback(
      (index: number) => {
        if (parsedSnapPoints.length > 0) {
          const clampedIndex = Math.max(
            0,
            Math.min(index, parsedSnapPoints.length - 1),
          );
          const targetY = parsedSnapPoints[clampedIndex]!;
          if (currentSnapIndex.value !== clampedIndex) {
            currentSnapIndex.value = clampedIndex;
            notifySnapPointChange(clampedIndex);
          }
          translateY.value = withSpring(targetY, BOTTOM_SHEET_SPRING_CONFIG);
        } else {
          if (currentSnapIndex.value !== 0) {
            currentSnapIndex.value = 0;
            notifySnapPointChange(0);
          }
          translateY.value = withSpring(0, BOTTOM_SHEET_SPRING_CONFIG);
        }
      },
      [parsedSnapPoints, currentSnapIndex, notifySnapPointChange, translateY],
    );

    useImperativeHandle(
      ref,
      () => ({
        dismiss: () => {
          if (currentSnapIndex.value !== -1) {
            currentSnapIndex.value = -1;
            notifySnapPointChange(-1);
          }
          const targetDismissY =
            sheetHeight > 0 ? sheetHeight : containerHeight;
          translateY.value = withSpring(
            targetDismissY,
            BOTTOM_SHEET_SPRING_CONFIG,
            (finished) => {
              if (finished) runOnJS(handleDismiss)();
            },
          );
        },
        open: (index?: number) => {
          snapToIndex(index ?? initialSnapIndex);
        },
        snapToIndex,
      }),
      [
        currentSnapIndex,
        notifySnapPointChange,
        sheetHeight,
        containerHeight,
        translateY,
        handleDismiss,
        snapToIndex,
        initialSnapIndex,
      ],
    );

    const registerScrollView = useCallback((mounted: boolean) => {
      setScrollViewCount((count) => Math.max(0, count + (mounted ? 1 : -1)));
    }, []);

    const panGesture = useMemo(() => {
      const gesture = Gesture.Pan().withRef(panGestureRef);

      if (scrollViewCount > 0) {
        gesture.simultaneousWithExternalGesture(scrollGestureRef);
      }

      return gesture
        .onStart((event) => {
          "worklet";
          const minY = highestSnapY.value;
          const atMaxSnap = translateY.value <= minY + 0.5;

          if (isScrollGestureActive.value && atMaxSnap) {
            if (scrollOffsetY.value > 0 || event.translationY < 0) {
              isPanTakingOver.value = false;
              isSheetDraggingFromScroll.value = false;
              return;
            }
            isPanTakingOver.value = true;
            isSheetDraggingFromScroll.value = true;
            dragOffset.value = translateY.value;
            panStartTranslationY.value = event.translationY;
            return;
          }

          isPanTakingOver.value = true;
          isSheetDraggingFromScroll.value = isScrollGestureActive.value;
          dragOffset.value = translateY.value;
          panStartTranslationY.value = event.translationY;
        })
        .onUpdate((event) => {
          "worklet";
          const minY = highestSnapY.value;

          if (!isPanTakingOver.value) {
            if (
              isScrollGestureActive.value &&
              scrollOffsetY.value <= 0 &&
              event.translationY > 0
            ) {
              isPanTakingOver.value = true;
              isSheetDraggingFromScroll.value = true;
              dragOffset.value = minY;
              panStartTranslationY.value = event.translationY;
            } else {
              return;
            }
          }

          const deltaY = event.translationY - panStartTranslationY.value;
          const newY = dragOffset.value + deltaY;

          if (newY < minY) {
            if (isSheetDraggingFromScroll.value) {
              translateY.value = minY;
            } else {
              translateY.value =
                minY + (newY - minY) * BOTTOM_SHEET_OVERSCROLL_RESISTANCE;
            }
          } else {
            translateY.value = newY;
          }
        })
        .onEnd((event) => {
          "worklet";
          if (!isPanTakingOver.value) {
            return;
          }

          const points = snapPointsY.value;
          const currentSheetHeight = sheetHeightSV.value;

          if (points.length > 0) {
            const lowestSnapY = points[0]!;
            const projectedY =
              translateY.value +
              event.velocityY * BOTTOM_SHEET_VELOCITY_DECAY_FACTOR;

            const shouldDismiss =
              event.velocityY > BOTTOM_SHEET_DISMISS_VELOCITY_THRESHOLD ||
              (translateY.value > lowestSnapY && projectedY > lowestSnapY);

            if (shouldDismiss) {
              if (currentSnapIndex.value !== -1) {
                currentSnapIndex.value = -1;
                runOnJS(notifySnapPointChange)(-1);
              }
              runOnJS(notifyDismissStart)();
              translateY.value = withSpring(
                currentSheetHeight,
                { ...BOTTOM_SHEET_SPRING_CONFIG, velocity: event.velocityY },
                (finished) => {
                  if (finished) runOnJS(handleDismiss)();
                },
              );
            } else {
              const targetY = getClosestSnapPoint(
                translateY.value,
                event.velocityY,
                points,
              );
              const targetIndex = getSnapPointIndex(targetY, points);
              if (currentSnapIndex.value !== targetIndex) {
                currentSnapIndex.value = targetIndex;
                runOnJS(notifySnapPointChange)(targetIndex);
              }
              translateY.value = withSpring(targetY, {
                ...BOTTOM_SHEET_SPRING_CONFIG,
                velocity: event.velocityY,
              });
            }
          } else {
            const shouldDismiss =
              event.velocityY > BOTTOM_SHEET_DISMISS_VELOCITY_THRESHOLD ||
              translateY.value >
                currentSheetHeight * BOTTOM_SHEET_DISMISS_THRESHOLD_RATIO;

            if (shouldDismiss) {
              if (currentSnapIndex.value !== -1) {
                currentSnapIndex.value = -1;
                runOnJS(notifySnapPointChange)(-1);
              }
              runOnJS(notifyDismissStart)();
              translateY.value = withSpring(
                currentSheetHeight,
                { ...BOTTOM_SHEET_SPRING_CONFIG, velocity: event.velocityY },
                (finished) => {
                  if (finished) runOnJS(handleDismiss)();
                },
              );
            } else {
              if (currentSnapIndex.value !== 0) {
                currentSnapIndex.value = 0;
                runOnJS(notifySnapPointChange)(0);
              }
              translateY.value = withSpring(0, {
                ...BOTTOM_SHEET_SPRING_CONFIG,
                velocity: event.velocityY,
              });
            }
          }
        })
        .onFinalize(() => {
          "worklet";
          isPanTakingOver.value = false;
          isSheetDraggingFromScroll.value = false;
        });
    }, [
      scrollViewCount,
      highestSnapY,
      translateY,
      isScrollGestureActive,
      scrollOffsetY,
      isPanTakingOver,
      isSheetDraggingFromScroll,
      dragOffset,
      panStartTranslationY,
      snapPointsY,
      sheetHeightSV,
      currentSnapIndex,
      notifySnapPointChange,
      notifyDismissStart,
      handleDismiss,
    ]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const contextValue = useMemo(
      () => ({
        translateY,
        currentSnapIndex,
        highestSnapY,
        scrollOffsetY,
        isScrollGestureActive,
        isSheetDraggingFromScroll,
        panGestureRef,
        scrollGestureRef,
        registerScrollView,
      }),
      [
        translateY,
        currentSnapIndex,
        highestSnapY,
        scrollOffsetY,
        isScrollGestureActive,
        isSheetDraggingFromScroll,
        registerScrollView,
      ],
    );

    return (
      <BottomSheetContext.Provider value={contextValue}>
        <View
          style={styles.wrapper}
          pointerEvents="box-none"
          onLayout={handleWrapperLayout}
        >
          <GestureDetector gesture={panGesture}>
            <Animated.View
              onLayout={handleLayout}
              role="dialog"
              accessibilityViewIsModal={true}
              importantForAccessibility="yes"
              style={[
                styles.container,
                snapContainerStyle,
                shadowStyle,
                bottomSheetContainerStyle,
                animatedStyle,
                style,
              ]}
            >
              <View style={styles.dragHandleContainer}>
                <View style={[styles.dragHandle, bottomSheetDragHandleStyle]} />
              </View>

              <View style={[styles.content, snapContentStyle]}>
                {children}
              </View>
            </Animated.View>
          </GestureDetector>
        </View>
      </BottomSheetContext.Provider>
    );
  },
);

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
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      maxWidth: BOTTOM_SHEET_MAX_WIDTH,
      borderTopLeftRadius: tokens.shape.extraLarge,
      borderTopRightRadius: tokens.shape.extraLarge,
      paddingBottom: BOTTOM_SHEET_OVERSCROLL_SKIRT_HEIGHT,
      marginBottom: -BOTTOM_SHEET_OVERSCROLL_SKIRT_HEIGHT,
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
