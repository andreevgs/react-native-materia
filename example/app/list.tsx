import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Icon, List, AppBar, IconButton, useMateriaTokens } from "react-native-materia";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { ScrollContent } from "../components/ScrollContent";
import { Tokens } from "react-native-materia/types";

const ListDemo = () => {
  const router = useRouter();
  const tokens = useMateriaTokens();

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <ScreenWrapper>
      <AppBar
        headline="List"
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
      />
      <ScrollContent>
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
      </ScrollContent>
    </ScreenWrapper>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    segmentedContainer: {
      paddingHorizontal: tokens.spacing.l,
      marginTop: tokens.spacing.xl,
    },
  });

export default ListDemo;
