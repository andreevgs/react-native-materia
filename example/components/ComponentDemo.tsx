import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export const ComponentDemo = ({ style, children, ...props }: ViewProps) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
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
