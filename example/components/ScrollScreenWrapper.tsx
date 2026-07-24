import React from "react";
import { ScrollViewProps } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMateriaColors } from "react-native-materia";

export const ScrollScreenWrapper = ({
  style,
  contentContainerStyle,
  ...props
}: ScrollViewProps) => {
  const insets = useSafeAreaInsets();
  const colors = useMateriaColors();

  return (
    <KeyboardAwareScrollView
      bottomOffset={30}
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
          paddingBottom: insets.bottom,
        },
        contentContainerStyle,
      ]}
      {...props}
    />
  );
};
