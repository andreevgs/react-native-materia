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
import { ScreenWrapper } from "../components/ScreenWrapper";
import { Tokens } from "react-native-materia/types";

const AppBarDemo = () => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const router = useRouter();

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <ScreenWrapper>
      <AppBar
        leading={<IconButton icon="arrow-back-rounded" onPress={() => router.back()} />}
        headline="App Bar"
        subtitle="With Subtitle"
        trailing={
          <>
            <IconButton icon="check-rounded" onPress={() => { }} />
            <IconButton icon="close-rounded" onPress={() => { }} />
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
          leading={<IconButton icon="menu-rounded" onPress={() => { }} />}
          headline="Scrolled State"
          trailing={<IconButton icon="check-rounded" onPress={() => { }} />}
        />
      </View>
    </ScreenWrapper>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    content: {
      flex: 1,
      padding: tokens.spacing.l,
      gap: tokens.spacing.xl,
    },
  });

export default AppBarDemo;

