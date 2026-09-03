import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import {
  Portal,
  useMateriaColors,
  useMateriaTokens,
} from "react-native-materia";
import { NavBar } from "./NavBar";
import { usePathname } from "expo-router";
import { getScrimContainerStyle } from "./utils";
import { MateriaScheme, Tokens } from "react-native-materia/types";
import { NAVBAR_DRAWER_WIDTH } from "./const";

interface NavBarDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const NavBarDrawer = ({ open, onClose }: NavBarDrawerProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(open);

  const translateX = useSharedValue(-NAVBAR_DRAWER_WIDTH);
  const scrimOpacity = useSharedValue(0);

  const animatedDrawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const scrimContainerStyle = useMemo(
    () => getScrimContainerStyle(colors),
    [colors],
  );

  const scrimContainerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: scrimOpacity.value,
    zIndex: 1,
  }));

  const styles = useMemo(() => createStyle(tokens, colors), [tokens, colors]);

  useEffect(() => {
    const config = { duration: 500, easing: Easing.bezier(0.3, 0, 0, 1) };
    if (open) {
      setMounted(true);
      translateX.value = withTiming(0, config);
      scrimOpacity.value = withTiming(0.4, config);
    } else {
      scrimOpacity.value = withTiming(0, config);
      translateX.value = withTiming(
        -NAVBAR_DRAWER_WIDTH,
        config,
        (finished) => {
          if (finished) {
            runOnJS(setMounted)(false);
          }
        },
      );
    }
  }, [open, scrimOpacity, translateX]);

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!mounted) return null;

  return (
    <Portal hostName="docs-drawer">
      <Animated.View
        style={[
          styles.container,
          scrimContainerStyle,
          scrimContainerAnimatedStyle,
        ]}
        pointerEvents={open ? "auto" : "none"}
      >
        <Pressable style={styles.scrim} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.drawer,
          {
            backgroundColor: colors.surfaceContainer,
            borderTopRightRadius: tokens.shape.extraLarge,
            borderBottomRightRadius: tokens.shape.extraLarge,
          },
          animatedDrawerStyle,
        ]}
      >
        <NavBar />
      </Animated.View>
    </Portal>
  );
};

const createStyle = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    scrim: {
      ...StyleSheet.absoluteFillObject,
      cursor: "auto",
    },
    drawer: {
      zIndex: 2,
      position: "absolute",
      overflow: "hidden",
      top: 0,
      bottom: 0,
      left: 0,
      width: NAVBAR_DRAWER_WIDTH,
      backgroundColor: colors.surfaceContainer,
      borderTopRightRadius: tokens.shape.extraLarge,
      borderBottomRightRadius: tokens.shape.extraLarge,
    },
  });
