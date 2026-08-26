import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Tokens } from "react-native-materia/types";
import {
  MateriaText,
  MateriaTextProps,
  useMateriaTokens,
} from "react-native-materia";

export const NavBarSubheader = ({ style, ...props }: MateriaTextProps) => {
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyle(tokens), [tokens]);
  return (
    <MateriaText
      variant="headlineSmall"
      style={[styles.navbarSubheader, style]}
      {...props}
    />
  );
};

const createStyle = (tokens: Tokens) =>
  StyleSheet.create({
    navbarSubheader: {
      paddingTop: tokens.spacing.m,
      paddingHorizontal: tokens.spacing.l,
      paddingBottom: tokens.spacing.m,
    },
  });
