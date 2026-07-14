import { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import {
  Switch,
  MateriaText,
  List,
  useMateriaTokens,
  useMateriaColors,
} from "react-native-materia";
import { ScrollScreenWrapper } from "../components/ScrollScreenWrapper";
import { Tokens } from "react-native-materia/types";

const SwitchDemo = () => {
  const tokens = useMateriaTokens();
  const colors = useMateriaColors();
  const styles = useMemo(() => createStyles(tokens), [tokens]);
  const textColor = colors.onSurfaceVariant;

  const [value1, setValue1] = useState(true);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState(true);
  const [value4, setValue4] = useState(false);

  return (
    <ScrollScreenWrapper contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <View style={styles.row}>
          <MateriaText variant="bodyLarge">Switch On</MateriaText>
          <Switch value={value1} onValueChange={setValue1} />
        </View>
        <View style={styles.row}>
          <MateriaText variant="bodyLarge">Switch Off</MateriaText>
          <Switch value={value2} onValueChange={setValue2} />
        </View>
        <View style={styles.row}>
          <MateriaText variant="bodyLarge">Disabled On</MateriaText>
          <Switch value={true} onValueChange={() => {}} disabled />
        </View>
        <View style={styles.row}>
          <MateriaText variant="bodyLarge">Disabled Off</MateriaText>
          <Switch value={false} onValueChange={() => {}} disabled />
        </View>
      </View>

      <MateriaText
        variant="labelLarge"
        style={[styles.label, { color: textColor }]}
      >
        With List Item
      </MateriaText>
      <List variant="segmented">
        <List.Item
          headline="Item with switch"
          trailingContent={<Switch value={value3} onValueChange={setValue3} />}
          onPress={() => setValue3(!value3)}
        />
        <List.Item
          headline="Item with switch"
          supportingText="Supporting text"
          trailingContent={<Switch value={value4} onValueChange={setValue4} />}
          onPress={() => setValue4(!value4)}
        />
        <List.Item
          headline="Disabled item with switch"
          trailingContent={
            <Switch value={true} onValueChange={() => {}} disabled />
          }
          disabled
        />
      </List>
    </ScrollScreenWrapper>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      paddingVertical: tokens.spacing.s,
      paddingHorizontal: tokens.spacing.l,
    },
    section: {
      marginBottom: tokens.spacing.m,
    },
    label: {
      paddingVertical: tokens.spacing.s,
      paddingHorizontal: tokens.spacing.l,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: tokens.spacing.m,
    },
  });

export default SwitchDemo;
