import {
  Icon,
  IconButton,
  MateriaText,
  useMateriaColors,
  useMateriaTokens,
} from "react-native-materia";
import { useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { MateriaScheme, Tokens } from "react-native-materia/types";
import { Link } from "expo-router";

export const Header = () => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  return (
    <View style={styles.header}>
      <Link href="/" asChild>
        <Pressable style={styles.logo}>
          <Icon source={"layers-rounded"} color={colors.primary} />
          <MateriaText variant="titleLarge" style={styles.name}>
            React Native Materia
          </MateriaText>
        </Pressable>
      </Link>
      <Link href="https://github.com/andreevgs/react-native-materia" asChild>
        <IconButton
          icon="github"
          /* @ts-ignore RN Web specific prop */
          hrefAttrs={{ target: "_blank" }}
          onPress={() => {}}
        />
      </Link>
    </View>
  );
};

const createStyles = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    logo: {
      paddingLeft: tokens.spacing.m,
      flexDirection: "row",
      alignItems: "center",
      gap: tokens.spacing.m,
      userSelect: "none",
    },
    name: {
      color: colors.primary,
    },
    header: {
      padding: tokens.spacing.l,
      backgroundColor: colors.surfaceContainer,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
