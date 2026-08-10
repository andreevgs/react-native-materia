import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import {
  Icon,
  List,
  MateriaText,
  useMateriaTokens,
} from "react-native-materia";
import { ScrollScreenWrapper } from "../components/ScrollScreenWrapper";
import { useMateriaColors } from "react-native-materia";
import { Tokens } from "react-native-materia/types";
import { useMemo } from "react";

const ComponentsScreen = () => {
  const router = useRouter();
  const tokens = useMateriaTokens();
  const colors = useMateriaColors();

  const components = [
    { name: "AppBar", path: "app-bar" },
    { name: "BottomSheet", path: "bottom-sheet" },
    { name: "Button", path: "button" },
    { name: "Chip", path: "chip" },
    { name: "Icon", path: "icon" },
    { name: "IconButton", path: "icon-button" },
    { name: "List", path: "list" },
    { name: "NavigationBar", path: "navigation-bar" },
    { name: "Switch", path: "switch" },
    { name: "Text", path: "text" },
    { name: "TextField", path: "text-field" },
    { name: "TouchableRipple", path: "touchable-ripple" },
  ];

  const styles = useMemo(() => createStyles(tokens), [tokens]);
  const textColor = colors.onSurfaceVariant;

  return (
    <ScrollScreenWrapper contentContainerStyle={styles.container}>
      <MateriaText
        variant="labelLarge"
        style={[styles.label, { color: textColor }]}
      >
        Components
      </MateriaText>
      <List variant="segmented">
        {components.map((comp) => (
          <List.Item
            key={comp.name}
            headline={comp.name}
            pressDelay={65}
            onPress={() => router.push(comp.path as any)}
            trailingContent={
              <Icon source="chevron-right" size={tokens.iconSize["20dp"]} />
            }
          />
        ))}
      </List>
    </ScrollScreenWrapper>
  );
};

export default ComponentsScreen;

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    label: {
      paddingVertical: tokens.spacing.s,
      paddingHorizontal: tokens.spacing.l,
    },
    container: {
      paddingHorizontal: tokens.spacing.l,
    },
  });
