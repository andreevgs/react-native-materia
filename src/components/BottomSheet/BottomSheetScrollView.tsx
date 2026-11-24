import React, { forwardRef, useCallback, useEffect, useMemo } from "react";
import { Platform, ScrollViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  scrollTo,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedRef,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";

import { useBottomSheetContext } from "./BottomSheetContext";
import { BottomSheetScrollViewProps } from "./types";

export const BottomSheetScrollView = forwardRef<
  Animated.ScrollView,
  BottomSheetScrollViewProps
>(
  (
    {
      children,
      bounces = false,
      overScrollMode = "never",
      scrollEnabled = true,
      ...restProps
    },
    forwardedRef,
  ) => {
    const context = useBottomSheetContext();
    const internalScrollRef = useAnimatedRef<Animated.ScrollView>();
    const fallbackScrollOffset = useSharedValue(0);
    const lockedScrollOffset = useSharedValue(0);

    const translateY = context?.translateY;
    const highestSnapY = context?.highestSnapY;
    const isScrollGestureActive = context?.isScrollGestureActive;
    const isSheetDraggingFromScroll = context?.isSheetDraggingFromScroll;
    const contextScrollOffsetY = context?.scrollOffsetY;
    const panGestureRef = context?.panGestureRef;
    const scrollGestureRef = context?.scrollGestureRef;
    const registerScrollView = context?.registerScrollView;

    const scrollOffsetY = contextScrollOffsetY ?? fallbackScrollOffset;
    useScrollViewOffset(internalScrollRef, scrollOffsetY);

    useEffect(() => {
      if (!registerScrollView) return;
      registerScrollView(true);
      return () => {
        registerScrollView(false);
      };
    }, [registerScrollView]);

    const setRefs = useCallback(
      (node: Animated.ScrollView | null) => {
        if (node) {
          internalScrollRef(node);
        }
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [internalScrollRef, forwardedRef],
    );

    const nativeGesture = useMemo(() => {
      const gesture = Gesture.Native();

      if (
        scrollGestureRef &&
        panGestureRef &&
        isScrollGestureActive &&
        contextScrollOffsetY
      ) {
        gesture
          .withRef(scrollGestureRef)
          .simultaneousWithExternalGesture(panGestureRef)
          .onBegin(() => {
            "worklet";
            isScrollGestureActive.value = true;
            lockedScrollOffset.value = contextScrollOffsetY.value;
          })
          .onFinalize(() => {
            "worklet";
            isScrollGestureActive.value = false;
          });
      }

      return gesture;
    }, [
      scrollGestureRef,
      panGestureRef,
      isScrollGestureActive,
      contextScrollOffsetY,
      lockedScrollOffset,
    ]);

    useAnimatedReaction(
      () => {
        if (!translateY || !highestSnapY || !isSheetDraggingFromScroll) {
          return false;
        }
        return (
          isSheetDraggingFromScroll.value ||
          translateY.value > highestSnapY.value + 0.5
        );
      },
      (shouldLock, prevShouldLock) => {
        if (!contextScrollOffsetY || Platform.OS === "web") return;
        if (shouldLock && !prevShouldLock) {
          lockedScrollOffset.value = Math.max(0, contextScrollOffsetY.value);
        }
        if (shouldLock) {
          scrollTo(internalScrollRef, 0, lockedScrollOffset.value, false);
        }
      },
    );

    useAnimatedReaction(
      () => contextScrollOffsetY?.value ?? 0,
      (offset) => {
        if (
          !translateY ||
          !highestSnapY ||
          !isSheetDraggingFromScroll ||
          Platform.OS === "web"
        ) {
          return;
        }
        const shouldLock =
          isSheetDraggingFromScroll.value ||
          translateY.value > highestSnapY.value + 0.5;
        if (shouldLock && Math.abs(offset - lockedScrollOffset.value) > 0.5) {
          scrollTo(internalScrollRef, 0, lockedScrollOffset.value, false);
        }
      },
    );

    const animatedProps = useAnimatedProps<ScrollViewProps>(() => {
      const isScrollEnabledProp =
        typeof scrollEnabled === "boolean"
          ? scrollEnabled
          : (scrollEnabled?.value ?? true);
      if (!translateY || !highestSnapY || !isSheetDraggingFromScroll) {
        return { scrollEnabled: isScrollEnabledProp };
      }
      const atMaxSnap = translateY.value <= highestSnapY.value + 0.5;
      return {
        scrollEnabled:
          isScrollEnabledProp &&
          atMaxSnap &&
          !isSheetDraggingFromScroll.value,
      };
    }, [translateY, highestSnapY, isSheetDraggingFromScroll, scrollEnabled]);

    return (
      <GestureDetector gesture={nativeGesture}>
        <Animated.ScrollView
          ref={setRefs}
          bounces={bounces}
          overScrollMode={overScrollMode}
          animatedProps={animatedProps}
          scrollEventThrottle={16}
          {...restProps}
        >
          {children}
        </Animated.ScrollView>
      </GestureDetector>
    );
  },
);
