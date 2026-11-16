import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  EdgeInsets,
  SafeAreaInsetsContext,
} from "react-native-safe-area-context";
import { useMateriaColors } from "react-native-materia";
import { MateriaScheme } from "react-native-materia/types";

const BOTTOM_FRAME_INSETS: EdgeInsets = {
  top: 0,
  right: 0,
  bottom: 24,
  left: 0,
};

interface DeviceFrameBottomProps {
  children: React.ReactNode;
}

export const DeviceFrameBottom = ({ children }: DeviceFrameBottomProps) => {
  const colors = useMateriaColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.deviceFrame}>
      <SafeAreaInsetsContext.Provider value={BOTTOM_FRAME_INSETS}>
        {children}
      </SafeAreaInsetsContext.Provider>
      <View style={styles.gestureBar} pointerEvents="none">
        <View style={styles.gestureHandle} />
      </View>
    </View>
  );
};

const createStyles = (colors: MateriaScheme) =>
  StyleSheet.create({
    deviceFrame: {
      position: "relative",
      justifyContent: "flex-end",
      borderWidth: 6,
      borderColor: colors.outlineVariant,
      borderTopWidth: 0,
      width: "100%",
      maxWidth: 360,
      height: 220,
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
      overflow: "hidden",
    },
    gestureBar: {
      width: "100%",
      position: "absolute",
      bottom: 0,
      left: 0,
      zIndex: 1,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    gestureHandle: {
      width: 108,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.onSurfaceVariant,
    },
  });
