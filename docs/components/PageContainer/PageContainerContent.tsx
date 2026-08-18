import { View, StyleSheet } from "react-native";
import { useMateriaColors, useMateriaTokens } from "react-native-materia";
import { MateriaScheme, Tokens } from "react-native-materia/types";

interface PageContainerContentProps {
  children: React.ReactNode;
}

export const PageContainerContent = ({
  children,
}: PageContainerContentProps) => {
  const tokens = useMateriaTokens();
  const colors = useMateriaColors();
  const styles = createStyle(tokens, colors);

  return <View style={[styles.pageContainerContent]}>{children}</View>;
};

const createStyle = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    pageContainerContent: {
      flex: 1,
      backgroundColor: colors.surface,
      paddingLeft: tokens.spacing.l,
      borderRadius: tokens.shape.extraLarge,
    },
  });
