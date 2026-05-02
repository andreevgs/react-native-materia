import React from "react";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMateriaColors } from "react-native-materia";

export const ScreenWrapper = ({ style, ...props }: ViewProps) => {
  const insets = useSafeAreaInsets();
  const colors = useMateriaColors();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          paddingTop: insets.top,
        },
        style,
      ]}
      {...props}
    />
  );
};
