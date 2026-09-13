import { Chip } from "react-native-materia";
import { StyleSheet, Text } from "react-native";
import { monospaceFont } from "@/const/typography";

export const VersionChip = () => (
  <Chip mode="outlined" style={styles.versionChip}>
    <Text style={styles.version}>v1.0.0</Text>
  </Chip>
);

const styles = StyleSheet.create({
  versionChip: {
    pointerEvents: "none",
  },
  version: {
    fontFamily: monospaceFont,
  },
});
