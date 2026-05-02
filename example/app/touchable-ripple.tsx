import { StyleSheet } from "react-native";
import {
  TouchableRipple,
  MateriaText,
  useMateriaTokens,
  useMateriaColors,
} from "react-native-materia";
import { ComponentDemo } from "../components/ComponentDemo";
import { useMemo } from "react";
import { MateriaScheme, Tokens } from "react-native-materia/types";

const TouchableRippleDemo = () => {
  const tokens = useMateriaTokens();
  const colors = useMateriaColors();

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);
  const textColor = colors.onSecondaryContainer;
  return (
    <ComponentDemo>
      <TouchableRipple onPress={() => {}} style={styles.rippleBox}>
        <MateriaText variant="bodyLarge" style={{ color: textColor }}>
          Press me!
        </MateriaText>
      </TouchableRipple>
    </ComponentDemo>
  );
};

const createStyles = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    rippleBox: {
      padding: tokens.spacing.xxxl,
      borderRadius: tokens.shape.large,
      backgroundColor: colors.secondaryContainer,
    },
  });

export default TouchableRippleDemo;
