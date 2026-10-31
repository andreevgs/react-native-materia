import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationBarProps } from "./types";
import { NavigationBarItem } from "./NavigationBarItem";
import { useMateriaColors } from "../../core/MateriaProvider";
import { MateriaScheme } from "../../types";
import { NAVIGATION_BAR_HEIGHT } from "./const";

export const NavigationBar = ({
  routes,
  selectedIndex,
  onTabPress,
}: NavigationBarProps) => {
  if (__DEV__ && (routes.length < 3 || routes.length > 5)) {
    console.warn(
      `[Materia] NavigationBar expects between 3 and 5 routes, received ${routes.length}.`,
    );
  }

  const colors = useMateriaColors();
  const insets = useSafeAreaInsets();

  const styles = useMemo(() => createStyles(colors, insets), [colors, insets]);

  return (
    <View style={styles.container} accessibilityRole="tablist">
      {routes.map((route, index) => (
        <NavigationBarItem
          key={route.key}
          route={route}
          index={index}
          isActive={selectedIndex === index}
          onTabPress={onTabPress}
        />
      ))}
    </View>
  );
};

const createStyles = (colors: MateriaScheme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: colors.surfaceContainer,
      paddingBottom: insets.bottom,
      height: NAVIGATION_BAR_HEIGHT + insets.bottom,
    },
  });
