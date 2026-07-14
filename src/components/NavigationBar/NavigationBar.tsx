import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationBarProps } from "./types";
import { NavigationBarItem } from "./NavigationBarItem";
import { useMateriaColors, useMateriaTokens } from "../../core/MateriaProvider";
import { MateriaScheme, Tokens } from "../../types";

export const NavigationBar = ({
  routes,
  selectedIndex,
  onTabPress,
}: NavigationBarProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () => createStyles(tokens, colors, insets),
    [tokens, colors, insets],
  );

  return (
    <View style={styles.container}>
      {routes.map((route, index) => (
        <NavigationBarItem
          key={route.key}
          route={route}
          isActive={selectedIndex === index}
          onPress={() => onTabPress(index, route.key)}
        />
      ))}
    </View>
  );
};

const createStyles = (
  tokens: Tokens,
  colors: MateriaScheme,
  insets: EdgeInsets,
) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: colors.surfaceContainer,
      paddingBottom: insets.bottom,
      height: 64 + insets.bottom,
      ...tokens.elevation.level2,
    },
  });
