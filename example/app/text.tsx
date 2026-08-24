import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { MateriaText, AppBar, IconButton, useMateriaColors, useMateriaTokens } from "react-native-materia";
import { useRouter } from "expo-router";
import { ComponentDemo } from "../components/ComponentDemo";
import { MateriaScheme, Tokens } from "react-native-materia/types";

const TextDemo = () => {
  const router = useRouter();
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  return (
    <View style={styles.container}>
      <AppBar
        headline="Text"
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
      />
      <ComponentDemo style={styles.content}>
        <MateriaText variant="displayLarge">Display Large</MateriaText>
        <MateriaText variant="headlineLarge">Headline Large</MateriaText>
        <MateriaText variant="titleLarge">Title Large</MateriaText>
        <MateriaText variant="bodyLarge">Body Large</MateriaText>
        <MateriaText variant="labelLarge">Label Large</MateriaText>
      </ComponentDemo>
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
      paddingTop: 0,
    },
  });

export default TextDemo;
