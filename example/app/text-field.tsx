import { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Icon,
  MateriaText,
  TextField,
  AppBar,
  IconButton,
  useMateriaColors,
  useMateriaTokens,
} from "react-native-materia";
import { useRouter } from "expo-router";
import { Tokens, MateriaScheme } from "react-native-materia/types";
import { ScrollScreenWrapper } from "../components/ScrollScreenWrapper";

const ErrorIcon = () => {
  const colors = useMateriaColors();
  return <Icon source="error" color={colors.error} />;
};

const TextFieldDemo = () => {
  const router = useRouter();
  const tokens = useMateriaTokens();
  const colors = useMateriaColors();

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [value5, setValue5] = useState("Invalid input");
  const [value6, setValue6] = useState("");
  const [value7, setValue7] = useState("");

  const [value1Outlined, setValue1Outlined] = useState("");
  const [value2Outlined, setValue2Outlined] = useState("");
  const [value3Outlined, setValue3Outlined] = useState("");
  const [value4Outlined, setValue4Outlined] = useState("");
  const [value5Outlined, setValue5Outlined] = useState("Invalid input");
  const [value6Outlined, setValue6Outlined] = useState("");
  const [value7Outlined, setValue7Outlined] = useState("");

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  return (
    <View style={styles.screen}>
      <AppBar
        headline="Text Field"
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
      />
      <ScrollScreenWrapper style={styles.content} contentContainerStyle={styles.container}>
        <MateriaText variant="titleMedium" style={styles.sectionTitle}>
          Filled
        </MateriaText>
        <TextField
          label="Filled Text Field"
          value={value1}
          onChangeText={setValue1}
          placeholder="Enter text"
        />
        <TextField
          label="With Leading Icon"
          value={value2}
          onChangeText={setValue2}
          leadingIcon="info-rounded"
        />
        <TextField
          label="With Trailing Icon"
          value={value3}
          onChangeText={setValue3}
          trailingIcon="close"
        />
        <TextField
          label="With Supporting Text"
          value={value4}
          onChangeText={setValue4}
          supportingText="This is some supporting text"
        />
        <TextField
          label="With Error"
          value={value5}
          onChangeText={setValue5}
          error
          supportingText="Error message goes here"
          trailingIcon={ErrorIcon}
        />
        <TextField
          label="Dynamic Supporting Text"
          value={value6}
          onChangeText={setValue6}
          supportingText={value6.length > 0 ? "You typed something!" : undefined}
        />
        <TextField
          label="Validation"
          value={value7}
          onChangeText={setValue7}
          error={value7.length > 10}
          supportingText={
            value7.length > 10 ? "Too many characters!" : `Maximum 10 characters`
          }
        />
        <TextField label="Disabled Text Field" value="Read only text" disabled />

        <MateriaText variant="titleMedium" style={styles.sectionTitle}>
          Outlined
        </MateriaText>
        <TextField
          mode="outlined"
          label="Outlined Text Field"
          value={value1Outlined}
          onChangeText={setValue1Outlined}
          placeholder="Enter text"
        />
        <TextField
          mode="outlined"
          label="With Leading Icon"
          value={value2Outlined}
          onChangeText={setValue2Outlined}
          leadingIcon="info-rounded"
        />
        <TextField
          mode="outlined"
          label="With Trailing Icon"
          value={value3Outlined}
          onChangeText={setValue3Outlined}
          trailingIcon="close"
        />
        <TextField
          mode="outlined"
          label="With Supporting Text"
          value={value4Outlined}
          onChangeText={setValue4Outlined}
          supportingText="This is some supporting text"
        />
        <TextField
          mode="outlined"
          label="With Error"
          value={value5Outlined}
          onChangeText={setValue5Outlined}
          error
          supportingText="Error message goes here"
          trailingIcon={ErrorIcon}
        />
        <TextField
          mode="outlined"
          label="Dynamic Supporting Text"
          value={value6Outlined}
          onChangeText={setValue6Outlined}
          supportingText={
            value6Outlined.length > 0 ? "You typed something!" : undefined
          }
        />
        <TextField
          mode="outlined"
          label="Validation"
          value={value7Outlined}
          onChangeText={setValue7Outlined}
          error={value7Outlined.length > 10}
          supportingText={
            value7Outlined.length > 10
              ? "Too many characters!"
              : `Maximum 10 characters`
          }
        />
        <TextField
          mode="outlined"
          label="Disabled Text Field"
          value="Read only text"
          disabled
        />
      </ScrollScreenWrapper>
    </View>
  );
};

const createStyles = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingTop: 0,
    },
    container: {
      paddingHorizontal: tokens.spacing.l,
      paddingBottom: tokens.spacing.xl,
      gap: tokens.spacing.m,
    },
    sectionTitle: {
      marginTop: tokens.spacing.l,
      marginBottom: tokens.spacing.xs,
    },
  });

export default TextFieldDemo;
