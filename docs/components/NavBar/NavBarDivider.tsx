import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { MateriaScheme } from "react-native-materia/types";
import { useMateriaColors } from "react-native-materia";

export const NavBarDivider = () => {
  const colors = useMateriaColors();
  const styles = useMemo(() => createStyle(colors), [colors]);
  return <View style={styles.divider} />;
};

const createStyle = (colors: MateriaScheme) =>
  StyleSheet.create({
    divider: {
      height: 1,
      width: "100%",
      backgroundColor: colors.outlineVariant,
    },
  });
