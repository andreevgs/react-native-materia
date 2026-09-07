import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMateriaColors } from "react-native-materia";

export interface ScreenWrapperProps extends ViewProps {
  withSafeArea?: boolean;
}

export const ScreenWrapper = ({
  style,
  withSafeArea = false,
  ...props
}: ScreenWrapperProps) => {
  const insets = useSafeAreaInsets();
  const colors = useMateriaColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: withSafeArea ? insets.top : 0,
        },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
