import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Button, AppBar, IconButton, useMateriaColors, useMateriaTokens } from "react-native-materia";
import { useRouter } from "expo-router";
import { ComponentDemo } from "../components/ComponentDemo";
import { MateriaScheme, Tokens } from "react-native-materia/types";

const ButtonDemo = () => {
  const router = useRouter();
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  return (
    <View style={styles.container}>
      <AppBar
        headline="Button"
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
      />
      <ComponentDemo style={styles.content}>
        <Button onPress={() => { }} mode="filled" icon="check">
          Filled Button
        </Button>
        <Button onPress={() => { }} mode="tonal">
          Tonal Button
        </Button>
        <Button onPress={() => { }} mode="outlined" icon="check">
          Outlined Button
        </Button>
        <Button onPress={() => { }} mode="elevated">
          Elevated Button
        </Button>
        <Button onPress={() => { }} mode="text">
          Text Button
        </Button>
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

export default ButtonDemo;
