import { View, StyleSheet } from "react-native";
import { Figure } from "./Figure";
import { RowWrap } from "./RowWrap";
import {
  Button,
  Icon,
  IconButton,
  List,
  Switch,
  TextField,
  useMateriaColors,
  useMateriaTokens,
} from "react-native-materia";
import { Tokens } from "react-native-materia/types";
import { useMemo, useState } from "react";

const ChevronIcon = () => {
  const tokens = useMateriaTokens();
  return <Icon source="chevron-right-rounded" size={tokens.iconSize["20dp"]} />;
};

const ErrorIcon = () => {
  const colors = useMateriaColors();
  return <Icon source="error-rounded" color={colors.error} />;
};

export const Showcase = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [value1, setValue1] = useState(true);
  const [value2, setValue2] = useState(false);

  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <Figure>
      <RowWrap style={styles.container}>
        <View style={styles.column}>
          <Button mode="filled">Button</Button>
          <Button mode="tonal">Button</Button>
          <Button mode="outlined">Button</Button>
          <Button mode="elevated">Button</Button>
          <Button mode="text">Button</Button>
        </View>
        <View style={styles.column}>
          <IconButton icon="check-rounded" mode="filled" />
          <IconButton icon="check-rounded" mode="tonal" />
          <IconButton icon="check-rounded" mode="outlined" />
          <IconButton icon="check-rounded" mode="standard" />
        </View>
        <View style={[styles.column, styles.list]}>
          <List variant="segmented">
            <List.Item
              headline="First List Item"
              trailingContent={<ChevronIcon />}
            />
            <List.Item
              headline="Second List Item"
              trailingContent={<ChevronIcon />}
            />
            <List.Item
              headline="Third List Item"
              trailingContent={<ChevronIcon />}
            />
            <List.Item
              headline="Fourth List Item"
              trailingContent={<ChevronIcon />}
            />
          </List>
        </View>
        <View style={styles.column}>
          <TextField
            mode="outlined"
            label="First Text Field"
            value={first}
            onChangeText={setFirst}
          />
          <TextField
            mode="filled"
            label="Second Text Field"
            value={second}
            onChangeText={setSecond}
          />
          <TextField
            mode="filled"
            label="Third Text Field"
            value={third}
            onChangeText={setThird}
            supportingText="Supporting text"
            trailingIcon={ErrorIcon}
            error
          />
        </View>
        <View style={styles.column}>
          <Switch value={value1} onValueChange={setValue1} />
          <Switch value={value2} onValueChange={setValue2} />
        </View>
      </RowWrap>
    </Figure>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      gap: tokens.spacing.xl,
    },
    column: {
      gap: tokens.spacing.m,
    },
    list: {
      minWidth: 300,
    },
    switch: {
      alignItems: "center",
    },
  });
