import React from "react";
import { StyleSheet, ScrollViewProps } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface ScrollContentProps extends ScrollViewProps {}

export const ScrollContent = ({
  style,
  contentContainerStyle,
  ...props
}: ScrollContentProps) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      bottomOffset={30}
      style={[styles.container, style]}
      contentContainerStyle={[
        {
          paddingBottom: insets.bottom,
        },
        contentContainerStyle,
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
