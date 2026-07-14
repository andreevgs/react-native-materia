import React, { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import {
  AppBar,
  IconButton,
  NavigationBar,
  useMateriaColors,
  MateriaText,
  useMateriaTokens,
} from "react-native-materia";
import { useRouter } from "expo-router";
import { MateriaScheme, Tokens } from "react-native-materia/types";

const NavigationBarDemo = () => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const routes = [
    {
      key: "home",
      label: "Home",
      icon: "home-outline-rounded" as const,
      activeIcon: "home-rounded" as const,
    },
    {
      key: "info",
      label: "Info",
      icon: "info-outline-rounded" as const,
      activeIcon: "info-rounded" as const,
    },
    {
      key: "settings",
      label: "Settings",
      icon: "settings-outline-rounded" as const,
      activeIcon: "settings-rounded" as const,
    },
  ];

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  const activeRoute = routes[selectedIndex];

  return (
    <View style={styles.container}>
      <AppBar
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
        headline="Navigation Bar"
      />

      <View style={styles.content}>
        <MateriaText variant="headlineMedium" style={styles.text}>
          Active Tab: {activeRoute.label}
        </MateriaText>
        <MateriaText variant="bodyLarge" style={styles.subtext}>
          Key: {activeRoute.key}
        </MateriaText>
      </View>

      <NavigationBar
        routes={routes}
        selectedIndex={selectedIndex}
        onTabPress={(index) => setSelectedIndex(index)}
      />
    </View>
  );
};

const createStyles = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: tokens.spacing.l,
    },
    text: {
      color: colors.onBackground,
      marginBottom: tokens.spacing.s,
    },
    subtext: {
      color: colors.onSurfaceVariant,
    },
  });

export default NavigationBarDemo;
