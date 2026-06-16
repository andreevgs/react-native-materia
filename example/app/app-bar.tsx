import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import {
  AppBar,
  IconButton,
  useMateriaColors,
  MateriaText,
  useMateriaTokens,
} from "react-native-materia";
import { useRouter } from "expo-router";
import { MateriaScheme, Tokens } from "react-native-materia/types";

const AppBarDemo = () => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const router = useRouter();

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  return (
    <View style={styles.container}>
      <AppBar
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
        headline="App Bar"
        subtitle="With Subtitle"
        trailing={
          <>
            <IconButton icon="check" onPress={() => {}} />
            <IconButton icon="close" onPress={() => {}} />
          </>
        }
      />

      <View style={styles.content}>
        <MateriaText variant="bodyLarge" style={{ color: colors.onBackground }}>
          The App Bar above is in its default state (surface color). Below is an
          example of an App Bar with the "isScrolled" prop enabled, which gives
          it the surfaceContainer color as per Material Design 3 guidelines.
        </MateriaText>

        <AppBar
          isScrolled
          leading={<IconButton icon="menu" onPress={() => {}} />}
          headline="Scrolled State"
          trailing={<IconButton icon="check" onPress={() => {}} />}
        />
      </View>
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
      padding: tokens.spacing.l,
      gap: tokens.spacing.xl,
    },
  });

export default AppBarDemo;
