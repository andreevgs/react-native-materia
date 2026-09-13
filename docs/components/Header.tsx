import {
  Icon,
  IconButton,
  MateriaText,
  useMateriaColors,
  useMateriaMode,
  useMateriaTokens,
} from "react-native-materia";
import { useCallback, useMemo } from "react";
import { View, StyleSheet, Pressable, useWindowDimensions } from "react-native";
import { MateriaScheme, Tokens } from "react-native-materia/types";
import { Link } from "expo-router";
import { MAX_WIDTH_MOBILE } from "@/const/window";
import { VersionChip } from "./VersionChip";
import { useCurrentTheme } from "@/providers/CurrentThemeProvider";

interface HeaderProps {
  onMenuPress?: () => void;
}

const MenuIcon = () => {
  const colors = useMateriaColors();
  return <Icon source="menu-rounded" color={colors.primary} />;
};

export const Header = ({ onMenuPress }: HeaderProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const { isDark } = useMateriaMode();
  const { setCurrentTheme } = useCurrentTheme();

  const { width } = useWindowDimensions();
  const isMobile = width < MAX_WIDTH_MOBILE;

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  const toggleTheme = useCallback(() => {
    const newTheme = isDark ? "light" : "dark";
    setCurrentTheme(newTheme);
  }, [isDark, setCurrentTheme]);

  return (
    <View style={styles.header}>
      {isMobile ? (
        <View style={styles.leftMobile}>
          <IconButton icon={MenuIcon} onPress={onMenuPress} />
          <Link href="/" asChild>
            <Pressable style={styles.titleContainerMobile}>
              <MateriaText variant="titleLarge" style={styles.name}>
                React Native Materia
              </MateriaText>
            </Pressable>
          </Link>
        </View>
      ) : (
        <View style={styles.left}>
          <Link href="/" asChild>
            <Pressable style={styles.titleContainer}>
              <Icon
                source={"layers-rounded"}
                color={colors.primary}
                style={styles.icon}
              />
              <MateriaText variant="titleLarge" style={styles.name}>
                React Native Materia
              </MateriaText>
            </Pressable>
          </Link>
        </View>
      )}
      <View style={styles.right}>
        <View style={styles.rightActions}>
          <IconButton
            icon={isDark ? "light-mode-rounded" : "dark-mode-rounded"}
            onPress={toggleTheme}
          />
          <Link
            href="https://github.com/andreevgs/react-native-materia"
            asChild
          >
            <IconButton
              icon="github"
              /* @ts-ignore RN Web specific prop */
              hrefAttrs={{ target: "_blank" }}
              onPress={() => {}}
            />
          </Link>
        </View>

        {!isMobile && <VersionChip />}
      </View>
    </View>
  );
};

const createStyles = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: tokens.spacing.m,
    },
    leftMobile: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: tokens.spacing.xs,
    },
    titleContainer: {
      paddingLeft: tokens.spacing.m,
      flexDirection: "row",
      alignItems: "center",
      gap: tokens.spacing.m,
      userSelect: "none",
    },
    titleContainerMobile: {
      marginLeft: tokens.spacing.m,
    },
    icon: {
      marginRight: tokens.spacing.s,
    },
    right: {
      flexDirection: "row",
      alignItems: "center",
      gap: tokens.spacing.l,
    },
    rightActions: {
      flexDirection: "row",
      gap: tokens.spacing.xxs,
    },
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
    version: {
      pointerEvents: "none",
    },
  });
