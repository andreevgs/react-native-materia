import { MAX_WIDTH_MOBILE } from "@/const/window";
import { useMemo } from "react";
import { View, StyleSheet, ViewStyle, useWindowDimensions } from "react-native";
import { useMateriaTokens, PortalHost } from "react-native-materia";
import { Tokens } from "react-native-materia/types";

interface PageContainerProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const PageContainer = ({ style, children }: PageContainerProps) => {
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyle(tokens), [tokens]);

  const { width } = useWindowDimensions();
  const isMobile = width < MAX_WIDTH_MOBILE;

  const combinedStyle = useMemo(
    () =>
      StyleSheet.flatten([
        styles.pageContainer,
        isMobile && styles.pageContainerMobile,
        style,
      ]),
    [styles, isMobile, style],
  );

  return (
    <View style={combinedStyle}>
      {children}
      <PortalHost name="docs-drawer" />
    </View>
  );
};

const createStyle = (tokens: Tokens) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      flexDirection: "row",
      position: "relative",
      paddingRight: tokens.spacing.l,
      paddingBottom: tokens.spacing.l,
    },
    pageContainerMobile: {
      paddingLeft: tokens.spacing.l,
    },
  });
