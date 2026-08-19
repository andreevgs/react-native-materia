import {
  IconButton,
  MateriaText,
  useMateriaColors,
  useMateriaTokens,
} from "react-native-materia";
import { View, StyleSheet } from "react-native";
import { MateriaScheme, Tokens } from "react-native-materia/types";
import { Link } from "expo-router";

export const Header = () => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const styles = createStyles(tokens, colors);

  return (
    <View style={styles.header}>
      <MateriaText variant="titleLarge" style={styles.name}>
        React Native Materia
      </MateriaText>
      <Link href="https://github.com/andreevgs/react-native-materia" asChild>
        <IconButton icon="github" onPress={() => {}} />
      </Link>
    </View>
  );
};

const createStyles = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    name: {
      color: colors.primary,
    },
    header: {
      padding: tokens.spacing.l,
      backgroundColor: colors.surfaceContainer,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
