import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { MateriaScheme } from "react-native-materia/types";
import { Icon, MateriaText, useMateriaColors } from "react-native-materia";

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame = ({ children }: DeviceFrameProps) => {
  const colors = useMateriaColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.deviceFrame}>
      <View style={styles.statusBar}>
        <View style={styles.statusBarContent}>
          <MateriaText
            variant="labelMedium"
            style={{ color: colors.onSurfaceVariant }}
          >
            0:00
          </MateriaText>
          <View style={styles.statusBarIcons}>
            <Icon
              source="android-cell-bar-rounded"
              size={14}
              color={colors.onSurfaceVariant}
            />
            <Icon
              source="wifi-rounded"
              size={14}
              color={colors.onSurfaceVariant}
            />
            <Icon
              source="battery-android-full-rounded"
              size={18}
              color={colors.onSurfaceVariant}
            />
          </View>
        </View>
      </View>
      {children}
    </View>
  );
};

const createStyles = (colors: MateriaScheme) =>
  StyleSheet.create({
    deviceFrame: {
      position: "relative",
      borderWidth: 1,
      borderColor: colors.outlineVariant,
      borderBottomWidth: 0,
      width: "100%",
      maxWidth: 360,
      height: 220,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      overflow: "hidden",
    },
    statusBar: {
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1,
      height: 32,
      paddingTop: 10,
    },
    statusBarContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 24,
    },
    statusBarIcons: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
  });
