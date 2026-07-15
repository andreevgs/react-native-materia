import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, ScrollViewProps } from "react-native";
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
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
    </KeyboardAvoidingView>
  );
};
