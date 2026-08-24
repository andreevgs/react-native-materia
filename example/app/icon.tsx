import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Icon, AppBar, IconButton, useMateriaColors, useMateriaTokens } from "react-native-materia";
import { useRouter } from "expo-router";
import { ComponentDemo } from "../components/ComponentDemo";
import { MateriaScheme, Tokens } from "react-native-materia/types";

const IconDemo = () => {
  const router = useRouter();
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  return (
    <View style={styles.container}>
      <AppBar
        headline="Icon"
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
      />
      <ComponentDemo style={styles.content}>
        <Icon source={"check"} size={48} color={colors.primary} />
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

export default IconDemo;
