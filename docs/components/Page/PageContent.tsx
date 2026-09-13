import { useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useMateriaColors, useMateriaTokens } from "react-native-materia";
import { MateriaScheme, Tokens } from "react-native-materia/types";

interface PageContentProps {
  children: React.ReactNode;
}

export const PageContent = ({ children }: PageContentProps) => {
  const tokens = useMateriaTokens();
  const colors = useMateriaColors();
  const styles = useMemo(() => createStyle(tokens, colors), [tokens, colors]);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  );
};

const createStyle = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: tokens.shape.extraLarge,
      overflow: "hidden",
    },
    scrollContent: {
      paddingTop: tokens.spacing.xl,
      paddingBottom: tokens.spacing.xxxl,
      paddingHorizontal: tokens.spacing.xxl,
    },
    content: {
      maxWidth: 980,
      width: "100%",
      marginHorizontal: "auto",
    },
  });
