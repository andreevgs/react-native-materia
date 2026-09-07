import { useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useMateriaTokens } from "react-native-materia";
import { Tokens } from "react-native-materia/types";

export const RowWrap = ({ style, ...props }: ViewProps) => {
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return <View style={[styles.rowWrap, style]} {...props} />;
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    rowWrap: {
      flexDirection: "row",
      gap: tokens.spacing.m,
      flexWrap: "wrap",
    },
  });
