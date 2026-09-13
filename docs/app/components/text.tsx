import React from "react";
import Head from "expo-router/head";
import { View, StyleSheet } from "react-native";
import { MateriaText, useMateriaColors } from "react-native-materia";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Figure } from "@/components/Figure";
import textContent from "@/content/text.md";

const TextPage = () => {
  const colors = useMateriaColors();

  return (
    <PageContent>
      <Head>
        <title>React Native Materia - Text</title>
      </Head>
      <MarkdownRenderer
        content={textContent}
        slots={{
          DEMO_MAIN: (
            <Figure>
              <View style={styles.largeStack}>
                <MateriaText variant="headlineMedium">Typography in Materia</MateriaText>
                <MateriaText variant="titleMedium">Harmonious and Expressive</MateriaText>
                <MateriaText variant="bodyMedium">
                  Built on Material Design 3 type scales, automatically adapting
                  to the active theme colors and font metrics.
                </MateriaText>
                <MateriaText variant="labelLarge">Action Label</MateriaText>
              </View>
            </Figure>
          ),
          DEMO_DISPLAY: (
            <Figure>
              <View style={styles.largeStack}>
                <MateriaText variant="displayLarge">Display Large</MateriaText>
                <MateriaText variant="displayMedium">Display Medium</MateriaText>
                <MateriaText variant="displaySmall">Display Small</MateriaText>
              </View>
            </Figure>
          ),
          DEMO_HEADLINE: (
            <Figure>
              <View style={styles.stack}>
                <MateriaText variant="headlineLarge">Headline Large</MateriaText>
                <MateriaText variant="headlineMedium">Headline Medium</MateriaText>
                <MateriaText variant="headlineSmall">Headline Small</MateriaText>
              </View>
            </Figure>
          ),
          DEMO_TITLE: (
            <Figure>
              <View style={styles.stack}>
                <MateriaText variant="titleLarge">Title Large</MateriaText>
                <MateriaText variant="titleMedium">Title Medium</MateriaText>
                <MateriaText variant="titleSmall">Title Small</MateriaText>
              </View>
            </Figure>
          ),
          DEMO_BODY: (
            <Figure>
              <View style={styles.stack}>
                <MateriaText variant="bodyLarge">
                  Body Large: Long-form reading text with increased line spacing
                  and size.
                </MateriaText>
                <MateriaText variant="bodyMedium">
                  Body Medium: The default paragraph text style for descriptions
                  and general copy.
                </MateriaText>
                <MateriaText variant="bodySmall">
                  Body Small: Compact explanatory copy and secondary content
                  notes.
                </MateriaText>
              </View>
            </Figure>
          ),
          DEMO_LABEL: (
            <Figure>
              <View style={styles.stack}>
                <MateriaText variant="labelLarge">Label Large</MateriaText>
                <MateriaText variant="labelMedium">Label Medium</MateriaText>
                <MateriaText variant="labelSmall">Label Small</MateriaText>
              </View>
            </Figure>
          ),
          DEMO_COLORS: (
            <Figure>
              <View style={styles.stack}>
                <MateriaText variant="bodyMedium" style={{ color: colors.primary }}>
                  Primary colored text
                </MateriaText>
                <MateriaText variant="bodyMedium" style={{ color: colors.error }}>
                  Error colored text
                </MateriaText>
                <MateriaText
                  variant="bodyMedium"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  Secondary variant text
                </MateriaText>
              </View>
            </Figure>
          ),
        }}
      />
    </PageContent>
  );
};

const styles = StyleSheet.create({
  stack: {
    width: "100%",
    gap: 12,
  },
  largeStack: {
    width: "100%",
    gap: 16,
  },
});

export default TextPage;
