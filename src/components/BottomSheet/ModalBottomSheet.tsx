import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Pressable, BackHandler } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

import { Portal, useMateriaColors } from "../../core";
import { BottomSheetCore, BottomSheetCoreRef } from "./BottomSheetCore";
import { ModalBottomSheetProps } from "./types";
import { getScrimStyle } from "./utils";

export const ModalBottomSheet = ({
  visible,
  hostName = "root",
  onDismiss,
  ...props
}: ModalBottomSheetProps) => {
  const [mounted, setMounted] = useState(false);
  const bottomSheetRef = useRef<BottomSheetCoreRef>(null);
  const isMountedRef = useRef(false);
  const colors = useMateriaColors();

  const scrimOpacity = useSharedValue(0);
  const scrimPointerEvents = useSharedValue<"auto" | "none">("none");

  const isDismissingFromGestureRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = mounted;
  }, [mounted]);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      isDismissingFromGestureRef.current = false;
      scrimPointerEvents.value = "auto";
      scrimOpacity.value = withTiming(1, { duration: 250 });
      if (mounted) {
        bottomSheetRef.current?.open();
      }
    } else if (mounted) {
      scrimPointerEvents.value = "none";
      scrimOpacity.value = withTiming(0, { duration: 250 });
      if (!isDismissingFromGestureRef.current) {
        bottomSheetRef.current?.dismiss();
      }
    }
  }, [visible, mounted, scrimOpacity, scrimPointerEvents]);

  useEffect(() => {
    if (!mounted) return;

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (onDismiss) {
          onDismiss();
        } else {
          scrimPointerEvents.value = "none";
          scrimOpacity.value = withTiming(0, { duration: 250 });
          bottomSheetRef.current?.dismiss();
        }
        return true;
      },
    );

    return () => backHandler.remove();
  }, [mounted, scrimOpacity, scrimPointerEvents, onDismiss]);

  const finishDismiss = () => {
    if (isMountedRef.current) {
      setMounted(false);
    }
    if (onDismiss && !isDismissingFromGestureRef.current) {
      onDismiss();
    }
  };

  const handleDismissStart = () => {
    isDismissingFromGestureRef.current = true;
    scrimPointerEvents.value = "none";
    scrimOpacity.value = withTiming(0, { duration: 250 });
    if (onDismiss) onDismiss();
  };

  const handleDismiss = () => {
    runOnJS(finishDismiss)();
  };

  const handleScrimPress = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      scrimPointerEvents.value = "none";
      scrimOpacity.value = withTiming(0, { duration: 250 });
      bottomSheetRef.current?.dismiss();
    }
  };

  const scrimStyle = useMemo(() => getScrimStyle(colors), [colors]);

  const scrimAnimatedStyle = useAnimatedStyle(() => ({
    opacity: scrimOpacity.value,
    zIndex: 1,
  }));

  const scrimAnimatedProps = useAnimatedProps(
    () =>
      ({
        pointerEvents: scrimPointerEvents.value,
      }) as any,
  );

  if (!mounted) return null;

  return (
    <Portal hostName={hostName}>
      <Animated.View
        style={[StyleSheet.absoluteFill, scrimStyle, scrimAnimatedStyle]}
        animatedProps={scrimAnimatedProps}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleScrimPress}
          role="button"
          accessibilityLabel="Close bottom sheet"
        />
      </Animated.View>

      <BottomSheetCore
        ref={bottomSheetRef}
        onDismissStart={handleDismissStart}
        onDismiss={handleDismiss}
        style={{ zIndex: 2 }}
        {...props}
      />
    </Portal>
  );
};
