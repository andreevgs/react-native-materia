import React, { useMemo, useState, useEffect, startTransition } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useMateriaColors, useMateriaTokens } from "react-native-materia";
import { MateriaScheme, Tokens } from "react-native-materia/types";
import { tokenizeCode } from "@/utils/tokenizer";
import { monospaceFont } from "@/const/typography";

interface SectionCodeSnippetProps {
  code: string;
}

export const SectionCodeSnippet = ({ code }: SectionCodeSnippetProps) => {
  const tokens = useMateriaTokens();
  const colors = useMateriaColors();
  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  const [parsedTokens, setParsedTokens] = useState<
    ReturnType<typeof tokenizeCode>
  >([]);

  useEffect(() => {
    startTransition(() => {
      setParsedTokens(tokenizeCode(code.trim()));
    });
  }, [code]);

  const tokenStyles = useMemo(
    () => ({
      keyword: { color: colors.tertiary },
      string: { color: colors.secondary },
      jsxTag: { color: colors.primary },
      comment: { color: colors.onSurfaceVariant },
      number: { color: colors.error },
      punctuation: { color: colors.onSurfaceVariant },
      plain: { color: colors.onSurface },
    }),
    [colors],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.codeText}>
          {parsedTokens.map((token, index) => (
            <Text
              key={index}
              style={tokenStyles[token.type] || tokenStyles.plain}
            >
              {token.text}
            </Text>
          ))}
        </Text>
      </ScrollView>
    </View>
  );
};

const createStyles = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surfaceContainer,
      borderWidth: 1,
      borderColor: colors.outline,
      borderRadius: 24,
      overflow: "hidden",
    },
    scrollContainer: {
      padding: tokens.spacing.l,
    },
    codeText: {
      fontFamily: monospaceFont,
      fontSize: 14,
      lineHeight: 21,
    },
  });
