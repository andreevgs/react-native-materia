import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Icon,
  TextField,
  useMateriaColors,
  useMateriaTokens,
} from "react-native-materia";
import { Tokens } from "react-native-materia/types";
import { ScrollScreenWrapper } from "../components/ScrollScreenWrapper";

const ErrorIcon = () => {
  const colors = useMateriaColors();
  return <Icon source="error" color={colors.error} />;
};

const TextFieldDemo = () => {
  const tokens = useMateriaTokens();

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [value5, setValue5] = useState("");
  const [value6, setValue6] = useState("Invalid input");
  const [value7, setValue7] = useState("");
  const [value8, setValue8] = useState("");

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <ScrollScreenWrapper contentContainerStyle={styles.container}>
      <TextField
        label="Filled Text Field"
        value={value1}
        onChangeText={setValue1}
        placeholder="Enter text"
      />
      <TextField
        mode="outlined"
        label="Outlined Text Field"
        value={value2}
        onChangeText={setValue2}
        placeholder="Enter text"
      />
      <TextField
        label="With Leading Icon"
        value={value3}
        onChangeText={setValue3}
        leadingIcon="info-rounded"
      />
      <TextField
        mode="outlined"
        label="With Trailing Icon"
        value={value4}
        onChangeText={setValue4}
        trailingIcon="close"
      />
      <TextField
        label="With Supporting Text"
        value={value5}
        onChangeText={setValue5}
        supportingText="This is some supporting text"
      />
      <TextField
        label="With Error"
        value={value6}
        onChangeText={setValue6}
        error
        supportingText="Error message goes here"
        trailingIcon={ErrorIcon}
      />
      <TextField
        label="Dynamic Supporting Text"
        value={value7}
        onChangeText={setValue7}
        supportingText={value7.length > 0 ? "You typed something!" : undefined}
      />
      <TextField
        label="Validation"
        value={value8}
        onChangeText={setValue8}
        error={value8.length > 10}
        supportingText={
          value8.length > 10 ? "Too many characters!" : `Maximum 10 characters`
        }
      />
      <TextField label="Disabled Text Field" value="Read only text" disabled />
    </ScrollScreenWrapper>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: tokens.spacing.l,
      gap: tokens.spacing.m,
    },
  });

export default TextFieldDemo;
