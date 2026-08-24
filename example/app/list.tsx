import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Icon, List, AppBar, IconButton, useMateriaTokens, useMateriaColors } from "react-native-materia";
import { useRouter } from "expo-router";
import { ScrollScreenWrapper } from "../components/ScrollScreenWrapper";
import { MateriaScheme, Tokens } from "react-native-materia/types";

const ListDemo = () => {
  const router = useRouter();
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  return (
    <View style={styles.container}>
      <AppBar
        headline="List"
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
      />
      <ScrollScreenWrapper style={styles.content}>
        <List variant="standard">
          <List.Item
            headline="Standard Item 1"
            supportingText="Supporting text"
          />
          <List.Item headline="Standard Item 2" />

          <List.Item
            headline="Standard Item 4"
            leadingContent={
              <Icon source="info-rounded" size={tokens.iconSize["20dp"]} />
            }
            trailingContent={
              <Icon source="chevron-right" size={tokens.iconSize["20dp"]} />
            }
            supportingText="Supporting text"
          />
        </List>
        <View style={styles.segmentedContainer}>
          <List variant="segmented">
            <List.Item
              headline="Segmented Item 1"
              supportingText="Supporting text"
            />
            <List.Item headline="Segmented Item 2" />

            <List.Item
              headline="Segmented Item 4"
              leadingContent={
                <Icon source="info-rounded" size={tokens.iconSize["20dp"]} />
              }
              trailingContent={
                <Icon source="chevron-right" size={tokens.iconSize["20dp"]} />
              }
              supportingText="Supporting text"
            />
          </List>
        </View>
      </ScrollScreenWrapper>
    </View>
  );
};

const createStyles = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingTop: 0,
    },
    segmentedContainer: {
      paddingHorizontal: tokens.spacing.l,
      marginTop: tokens.spacing.xl,
    },
  });

export default ListDemo;
