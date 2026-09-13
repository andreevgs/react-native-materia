import { forwardRef, useMemo } from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { MateriaScheme, Tokens } from "react-native-materia/types";
import { useMateriaColors, useMateriaTokens } from "react-native-materia";
import { monospaceFont } from "@/const/typography";

export const InlineCode = forwardRef<Text, TextProps>((props, ref) => {
  const tokens = useMateriaTokens();
  const colors = useMateriaColors();
  const styles = useMemo(() => createStyle(tokens, colors), [tokens, colors]);

  return <Text ref={ref} {...props} style={[styles.inlineCode, props.style]} />;
});

const createStyle = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    inlineCode: {
      padding: tokens.spacing.xs,
      color: colors.onSurface,
      backgroundColor: colors.surfaceVariant,
      fontFamily: monospaceFont,
      fontSize: 14,
      borderRadius: tokens.shape.small,
    },
  });
