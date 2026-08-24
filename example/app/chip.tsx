import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Chip, AppBar, IconButton, useMateriaColors, useMateriaTokens } from "react-native-materia";
import { useRouter } from "expo-router";
import { ComponentDemo } from "../components/ComponentDemo";
import { MateriaScheme, Tokens } from "react-native-materia/types";

const ChipDemo = () => {
  const router = useRouter();
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  return (
    <View style={styles.container}>
      <AppBar
        headline="Chip"
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
      />
      <ComponentDemo style={styles.content}>
        <Chip onPress={() => { }} mode="outlined">
          Outlined Chip
        </Chip>
        <Chip onPress={() => { }} mode="tonal">
          Tonal Chip
        </Chip>
        <Chip onPress={() => { }} mode="elevated">
          Elevated Chip
        </Chip>
        <Chip onPress={() => { }} mode="outlined" leadingIcon="check">
          With Leading Icon
        </Chip>
        <Chip onPress={() => { }} mode="tonal" leadingIcon="check">
          Tonal With Leading Icon
        </Chip>
        <Chip onPress={() => { }} mode="tonal" trailingIcon="close">
          Tonal With Trailing Icon
        </Chip>
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

export default ChipDemo;
