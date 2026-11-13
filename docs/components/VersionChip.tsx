import { Chip } from "react-native-materia";
import { StyleSheet, Text } from "react-native";
import { monospaceFont } from "@/const/typography";

export const VersionChip = () => (
  <Chip.Assist style={styles.versionChip}>
    <Text style={styles.version}>v1.0.0</Text>
  </Chip.Assist>
);

const styles = StyleSheet.create({
  versionChip: {
    pointerEvents: "none",
  },
  version: {
    fontFamily: monospaceFont,
  },
});
