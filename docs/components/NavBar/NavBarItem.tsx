import { Link, type Href, usePathname } from "expo-router";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Tokens, MateriaScheme } from "react-native-materia/types";
import {
  MateriaText,
  TouchableRipple,
  useMateriaTokens,
  useMateriaColors,
} from "react-native-materia";

interface NavBarItemProps {
  href: Href;
  label: string;
}

export const NavBarItem = ({ href, label }: NavBarItemProps) => {
  const tokens = useMateriaTokens();
  const colors = useMateriaColors();
  const pathname = usePathname();

  const isActive = pathname === href;
  const styles = useMemo(() => createStyle(tokens, colors), [tokens, colors]);

  const combinedStyle = useMemo(
    () =>
      StyleSheet.flatten([styles.navbarItem, isActive && styles.activeItem]),
    [styles, isActive],
  );

  return (
    <Link href={href} asChild>
      <TouchableRipple style={combinedStyle}>
        <MateriaText variant="bodyLarge">{label}</MateriaText>
      </TouchableRipple>
    </Link>
  );
};

const createStyle = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    navbarItem: {
      height: 56,
      justifyContent: "center",
      paddingHorizontal: tokens.spacing.l,
      marginBottom: tokens.spacing.m,
      borderRadius: tokens.shape.full,
    },
    activeItem: {
      backgroundColor: colors.surfaceContainerHighest,
    },
  });
