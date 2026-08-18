import { Link, type Href } from "expo-router";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Tokens } from "react-native-materia/types";
import {
  MateriaText,
  TouchableRipple,
  useMateriaTokens,
} from "react-native-materia";

interface NavBarItemProps {
  href: Href;
  label: string;
}

export const NavBarItem = ({ href, label }: NavBarItemProps) => {
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyle(tokens), [tokens]);

  return (
    <Link href={href} asChild>
      <TouchableRipple onPress={() => {}} style={styles.navbarItem}>
        <MateriaText variant="bodyLarge">{label}</MateriaText>
      </TouchableRipple>
    </Link>
  );
};

const createStyle = (tokens: Tokens) =>
  StyleSheet.create({
    navbarItem: {
      height: 56,
      justifyContent: "center",
      paddingHorizontal: tokens.spacing.l,
      marginBottom: tokens.spacing.m,
      borderRadius: tokens.shape.full,
    },
  });
