import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableRipple } from "../TouchableRipple";
import { MateriaText } from "../Text";
import { ListItemProps } from "./types";
import { useMateriaColors } from "../../core";
import { useMateriaTokens } from "../../core/MateriaProvider";
import { Tokens } from "../../types";

export const ListItem = ({
  headline,
  supportingText,
  leadingContent,
  trailingContent,
  style,
  ...props
}: ListItemProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <TouchableRipple
      style={[styles.container, style]}
      contentPointerEvents="none"
      {...props}
    >
      <View style={styles.content}>
        {leadingContent && (
          <View style={styles.leadingContainer}>{leadingContent}</View>
        )}
        <View style={styles.headlineContainer}>
          <MateriaText variant="bodyLarge">{headline}</MateriaText>
          {supportingText ? (
            <MateriaText
              variant="bodyMedium"
              style={{ color: colors.onSurfaceVariant }}
            >
              {supportingText}
            </MateriaText>
          ) : null}
        </View>
        {trailingContent && (
          <View style={styles.trailingContainer}>{trailingContent}</View>
        )}
      </View>
    </TouchableRipple>
  );
};
const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      width: "100%",
    },
    content: {
      minHeight: 56,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: tokens.spacing.l,
      paddingVertical: tokens.spacing.sm,
    },
    leadingContainer: {
      marginRight: tokens.spacing.m,
    },
    headlineContainer: {
      flex: 1,
    },
    trailingContainer: {
      marginLeft: tokens.spacing.m,
    },
  });
