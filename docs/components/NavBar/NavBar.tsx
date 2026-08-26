import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useMateriaTokens } from "react-native-materia";
import { Tokens } from "react-native-materia/types";
import { NavBarItem } from "./NavBarItem";
import { NavBarDivider } from "./NavBarDivider";
import { NavBarSubheader } from "./NavBarSubheader";

export const NavBar = () => {
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyle(tokens), [tokens]);

  return (
    <View style={styles.navbar}>
      <NavBarSubheader>About</NavBarSubheader>
      <NavBarItem href="/about/introduction" label="Introduction" />
      <NavBarItem href="/about/getting-started" label="Getting Started" />
      <NavBarItem href="/about/support" label="Support" />
      <NavBarDivider />
      <NavBarSubheader>Components</NavBarSubheader>
      <NavBarItem href="/components/button" label="Button" />
      <NavBarItem href="/components/list" label="List" />
    </View>
  );
};

const createStyle = (tokens: Tokens) =>
  StyleSheet.create({
    navbar: {
      maxWidth: 300,
      minWidth: 300,
      flex: 1,
      paddingHorizontal: tokens.spacing.m,
      paddingVertical: tokens.spacing.s,
    },
  });
