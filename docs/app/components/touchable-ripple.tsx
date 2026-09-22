import React, { useState } from "react";
import Head from "expo-router/head";
import { StyleSheet } from "react-native";
import {
  TouchableRipple,
  MateriaText,
  Icon,
  useMateriaColors,
} from "react-native-materia";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Figure } from "@/components/Figure";
import { RowWrap } from "@/components/RowWrap";
import touchableRippleContent from "@/content/touchable-ripple.md";
import { useMateriaTokens } from "react-native-materia";

const TouchableRipplePage = () => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const [pressCount, setPressCount] = useState(0);

  return (
    <PageContent>
      <Head>
        <title>React Native Materia - TouchableRipple</title>
      </Head>
      <MarkdownRenderer
        content={touchableRippleContent}
        slots={{
          DEMO_MAIN: (
            <Figure>
              <TouchableRipple
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.surfaceContainer,
                    borderColor: colors.outlineVariant,
                  },
                ]}
                onPress={() => setPressCount((c) => c + 1)}
              >
                <MateriaText variant="titleMedium">
                  Interactive Surface
                </MateriaText>
                <MateriaText
                  variant="bodyMedium"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  Taps registered: {pressCount}
                </MateriaText>
              </TouchableRipple>
            </Figure>
          ),
          DEMO_BOUNDED: (
            <Figure>
              <TouchableRipple
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.surfaceContainerLow,
                    borderColor: colors.outlineVariant,
                  },
                ]}
                onPress={() => {}}
              >
                <MateriaText variant="titleMedium">Bounded Surface</MateriaText>
                <MateriaText
                  variant="bodySmall"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  Ripple wave is constrained within rounded corners
                </MateriaText>
              </TouchableRipple>
            </Figure>
          ),
          DEMO_BORDERLESS: (
            <Figure>
              <RowWrap style={{ alignItems: "center" }}>
                <TouchableRipple
                  borderless
                  style={styles.circle}
                  onPress={() => {}}
                >
                  <Icon
                    source="settings-outline-rounded"
                    size={tokens.iconSize["24dp"]}
                  />
                </TouchableRipple>
                <TouchableRipple
                  borderless
                  style={styles.circle}
                  onPress={() => {}}
                >
                  <Icon
                    source="info-outline-rounded"
                    size={tokens.iconSize["24dp"]}
                  />
                </TouchableRipple>
                <TouchableRipple
                  borderless
                  style={styles.circle}
                  onPress={() => {}}
                >
                  <Icon
                    source="delete-rounded"
                    size={tokens.iconSize["24dp"]}
                  />
                </TouchableRipple>
              </RowWrap>
            </Figure>
          ),
          DEMO_COLORS: (
            <Figure>
              <RowWrap>
                <TouchableRipple
                  rippleColor={colors.primary}
                  style={[
                    styles.smallCard,
                    {
                      backgroundColor: colors.primaryContainer,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => {}}
                >
                  <MateriaText
                    variant="labelLarge"
                    style={{ color: colors.onPrimaryContainer }}
                  >
                    Primary Color
                  </MateriaText>
                </TouchableRipple>
                <TouchableRipple
                  rippleColor={colors.error}
                  style={[
                    styles.smallCard,
                    {
                      backgroundColor: colors.errorContainer,
                      borderColor: colors.error,
                    },
                  ]}
                  onPress={() => {}}
                >
                  <MateriaText
                    variant="labelLarge"
                    style={{ color: colors.onErrorContainer }}
                  >
                    Error Color
                  </MateriaText>
                </TouchableRipple>
              </RowWrap>
            </Figure>
          ),
          DEMO_STATES: (
            <Figure>
              <TouchableRipple
                disabled
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.surfaceContainerLowest,
                    borderColor: colors.outlineVariant,
                  },
                ]}
                onPress={() => {}}
              >
                <MateriaText
                  variant="titleMedium"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  Disabled Surface
                </MateriaText>
                <MateriaText
                  variant="bodySmall"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  No hover or ripple feedback
                </MateriaText>
              </TouchableRipple>
            </Figure>
          ),
        }}
      />
    </PageContent>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 360,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
  },
  smallCard: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TouchableRipplePage;
