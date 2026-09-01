import { View, ViewProps, StyleSheet } from "react-native";
import { useMemo } from "react";
import { Tokens } from "react-native-materia/types";
import { useMateriaTokens } from "react-native-materia";

export const Section = ({ style, ...props }: ViewProps) => {
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyle(tokens), [tokens]);

  return <View style={[styles.sections, style]} {...props} />;
};

const createStyle = (tokens: Tokens) =>
  StyleSheet.create({
    sections: {
      marginTop: tokens.spacing.xl,
      rowGap: tokens.spacing.l,
    },
  });
