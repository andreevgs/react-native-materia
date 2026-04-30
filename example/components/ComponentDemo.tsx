import React from "react";
import { StyleSheet, ViewProps } from "react-native";
import { ScreenWrapper } from "./ScreenWrapper";

export const ComponentDemo = ({ style, children, ...props }: ViewProps) => {
  return (
    <ScreenWrapper style={[styles.container, style]} {...props}>
      {children}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});
