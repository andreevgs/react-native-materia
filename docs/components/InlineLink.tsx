import { Link, type LinkProps } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useMateriaColors } from "react-native-materia";
import { MateriaScheme } from "react-native-materia/types";

export const InlineLink = ({ style, children, ...props }: LinkProps) => {
  const colors = useMateriaColors();
  const [isHovered, setIsHovered] = useState(false);
  const styles = useMemo(() => createStyle(colors), [colors]);

  const combinedStyle = useMemo(
    () =>
      StyleSheet.flatten([
        styles.inlineLink,
        isHovered && styles.inlineLinkHovered,
        style,
      ]),
    [styles, isHovered, style],
  );

  return (
    <Link {...props} asChild>
      <Text
        /* @ts-ignore RN Web specific prop */
        onHoverIn={() => setIsHovered(true)}
        /* @ts-ignore RN Web specific prop */
        onHoverOut={() => setIsHovered(false)}
        style={combinedStyle}
      >
        {children}
      </Text>
    </Link>
  );
};

const createStyle = (colors: MateriaScheme) =>
  StyleSheet.create({
    inlineLink: {
      color: colors.primary,
      textDecorationLine: "none",
    },
    inlineLinkHovered: {
      textDecorationLine: "underline",
    },
  });
