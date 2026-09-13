import React, { useMemo } from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { useMateriaColors, useMateriaTokens } from "react-native-materia";
import { MateriaScheme, Tokens } from "react-native-materia/types";

export const Figure = ({ style, ...props }: ViewProps) => {
  const tokens = useMateriaTokens();
  const colors = useMateriaColors();
  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  return <View style={[styles.figure, style]} {...props} />;
};

const createStyles = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    figure: {
      borderWidth: 1,
      borderColor: colors.outline,
      borderRadius: 24,
      padding: tokens.spacing.xl,
    },
  });
