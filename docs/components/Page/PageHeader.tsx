import { forwardRef, useMemo } from "react";
import {
  MateriaText,
  MateriaTextProps,
  useMateriaTokens,
} from "react-native-materia";
import { StyleSheet, Text as RNText } from "react-native";
import { Tokens } from "react-native-materia/types";

export const PageHeader = forwardRef<RNText, MateriaTextProps>(
  ({ style, ...props }, ref) => {
    const tokens = useMateriaTokens();
    const styles = useMemo(() => createStyle(tokens), [tokens]);
    return (
      <MateriaText
        ref={ref}
        variant="displayLarge"
        style={[styles.pageHeader, style]}
        {...props}
      />
    );
  },
);

const createStyle = (tokens: Tokens) =>
  StyleSheet.create({
    pageHeader: {
      marginVertical: tokens.spacing.xxxl,
    },
  });
