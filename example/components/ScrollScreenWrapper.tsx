import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMateriaColors } from "react-native-materia";

export const ScrollScreenWrapper = ({ style, contentContainerStyle, ...props }: ScrollViewProps) => {
  const insets = useSafeAreaInsets();
  const colors = useMateriaColors();

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
        },
        style,
      ]}
      contentContainerStyle={[
        {
          paddingTop: insets.top,
        },
        contentContainerStyle,
      ]}
      {...props}
    />
  );
};
