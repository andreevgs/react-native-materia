import { forwardRef } from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { Tokens } from "react-native-materia/types";
import {
  MateriaText,
  MateriaTextProps,
  useMateriaTokens,
} from "react-native-materia";

export const NavBarSubheader = forwardRef<RNText, MateriaTextProps>(
  (props, ref) => {
    const tokens = useMateriaTokens();
    const styles = createStyle(tokens);
    return (
      <MateriaText
        ref={ref}
        variant="headlineSmall"
        {...props}
        style={[styles.navbarSubheader, props.style]}
      />
    );
  },
);

const createStyle = (tokens: Tokens) =>
  StyleSheet.create({
    navbarSubheader: {
      paddingTop: tokens.spacing.m,
      paddingHorizontal: tokens.spacing.l,
      paddingBottom: tokens.spacing.m,
    },
  });
