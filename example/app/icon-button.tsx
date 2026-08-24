import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, AppBar, useMateriaColors, useMateriaTokens } from "react-native-materia";
import { useRouter } from "expo-router";
import { ComponentDemo } from "../components/ComponentDemo";
import Svg, { Path } from "react-native-svg";
import { MateriaIconProps, MateriaScheme, Tokens } from "react-native-materia/types";

const CustomIcon = ({ color, size, style, ...props }: MateriaIconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      style={style}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </Svg>
  );
};

const IconButtonDemo = () => {
  const router = useRouter();
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  return (
    <View style={styles.container}>
      <AppBar
        headline="Icon Button"
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
      />
      <ComponentDemo style={styles.content}>
        <IconButton icon="check" mode="standard" onPress={() => { }} />
        <IconButton icon="check" mode="filled" onPress={() => { }} />
        <IconButton icon="check" mode="tonal" onPress={() => { }} />
        <IconButton icon={CustomIcon} mode="outlined" onPress={() => { }} />
      </ComponentDemo>
    </View>
  );
};

const createStyles = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingTop: 0,
    },
  });

export default IconButtonDemo;
