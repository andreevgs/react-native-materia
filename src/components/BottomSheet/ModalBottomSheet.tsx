import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Pressable, BackHandler } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

import { Portal, useMateriaColors, useMateriaTokens } from "../../core";
import { BottomSheetCore, BottomSheetCoreRef } from "./BottomSheetCore";
import { ModalBottomSheetProps } from "./types";
import { getScrimContainerStyle } from "./utils";
import {
  BOTTOM_SHEET_DEFAULT_PORTAL_NAME,
  BOTTOM_SHEET_SCRIM_DEFAULT_ACCESSIBILITY_LABEL,
} from "./const";

export const ModalBottomSheet = ({
  visible,
  hostName = BOTTOM_SHEET_DEFAULT_PORTAL_NAME,
  onDismiss,
  scrimAccessibilityLabel = BOTTOM_SHEET_SCRIM_DEFAULT_ACCESSIBILITY_LABEL,
  ...props
}: ModalBottomSheetProps) => {
  const [mounted, setMounted] = useState(false);
  const bottomSheetRef = useRef<BottomSheetCoreRef>(null);
  const isMountedRef = useRef(false);
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const scrimOpacity = useSharedValue(0);

  const isDismissingFromGestureRef = useRef(false);

  const scrimContainerStyle = useMemo(
    () => getScrimContainerStyle(colors),
    [colors],
  );

  const scrimAnimatedContainerStyle = useAnimatedStyle(() => ({
    opacity: scrimOpacity.value,
    zIndex: 1,
  }));

  useEffect(() => {
    isMountedRef.current = mounted;
  }, [mounted]);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      isDismissingFromGestureRef.current = false;
      scrimOpacity.value = withTiming(1, { duration: tokens.duration.medium1 });
      if (mounted) {
        bottomSheetRef.current?.open();
      }
    } else if (mounted) {
      scrimOpacity.value = withTiming(0, { duration: tokens.duration.medium1 });
      if (!isDismissingFromGestureRef.current) {
        bottomSheetRef.current?.dismiss();
      }
    }
  }, [visible, mounted, scrimOpacity, tokens]);

  useEffect(() => {
    if (!mounted) return;

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (onDismiss) {
          onDismiss();
        } else {
          scrimOpacity.value = withTiming(0, {
            duration: tokens.duration.medium1,
          });
          bottomSheetRef.current?.dismiss();
        }
        return true;
      },
    );

    return () => backHandler.remove();
  }, [mounted, scrimOpacity, onDismiss, tokens]);

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
    scrimOpacity.value = withTiming(0, { duration: tokens.duration.medium1 });
    if (onDismiss) onDismiss();
  };

  const handleDismiss = () => {
    runOnJS(finishDismiss)();
  };

  const handleScrimPress = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      scrimOpacity.value = withTiming(0, { duration: tokens.duration.medium1 });
      bottomSheetRef.current?.dismiss();
    }
  };

  if (!mounted) return null;

  return (
    <Portal hostName={hostName}>
      <Animated.View
        style={[
          styles.container,
          scrimContainerStyle,
          scrimAnimatedContainerStyle,
        ]}
        pointerEvents={visible ? "auto" : "none"}
      >
        <Pressable
          style={styles.scrim}
          onPress={handleScrimPress}
          role="button"
          accessibilityLabel={scrimAccessibilityLabel}
        />
      </Animated.View>

      <BottomSheetCore
        ref={bottomSheetRef}
        onDismissStart={handleDismissStart}
        onDismiss={handleDismiss}
        zIndex={2}
        {...props}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    cursor: "auto",
  },
});
