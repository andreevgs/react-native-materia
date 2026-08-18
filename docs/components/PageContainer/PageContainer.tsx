import { View, StyleSheet, ViewStyle } from "react-native";
import { useMateriaTokens } from "react-native-materia";
import { Tokens } from "react-native-materia/types";

interface PageContainerProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const PageContainer = ({ style, children }: PageContainerProps) => {
  const tokens = useMateriaTokens();
  const styles = createStyle(tokens);

  return <View style={[styles.pageContainer, style]}>{children}</View>;
};

const createStyle = (tokens: Tokens) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      flexDirection: "row",
      paddingRight: tokens.spacing.l,
      paddingBottom: tokens.spacing.l,
    },
  });
