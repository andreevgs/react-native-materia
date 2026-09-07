import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useMateriaTokens } from "react-native-materia";
import { Tokens } from "react-native-materia/types";
import { NavBarItem } from "./NavBarItem";
import { NavBarDivider } from "./NavBarDivider";
import { NavBarSubheader } from "./NavBarSubheader";
import { ScrollView } from "react-native-gesture-handler";

export const NavBar = () => {
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyle(tokens), [tokens]);

  return (
    <ScrollView style={styles.navbar}>
      <NavBarSubheader>About</NavBarSubheader>
      <NavBarItem href="/about/getting-started" label="Getting Started" />
      <NavBarItem href="/about/provider" label="Provider" />
      <NavBarItem href="/about/theming" label="Theming" />
      <NavBarItem href="/about/tokens" label="Tokens" />
      <NavBarItem href="/about/typography" label="Typography" />
      <NavBarItem href="/about/iconography" label="Iconography" />
      <NavBarItem href="/about/portal" label="Portal" />

      <NavBarDivider />
      <NavBarSubheader>Components</NavBarSubheader>
      <NavBarItem href="/components/button" label="Button" />
      <NavBarItem href="/components/icon-button" label="Icon Button" />
      <NavBarItem href="/components/list" label="List" />
    </ScrollView>
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
