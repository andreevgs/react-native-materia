import React, { useState } from "react";
import Head from "expo-router/head";
import { View, StyleSheet } from "react-native";
import { TextField } from "react-native-materia";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Figure } from "@/components/Figure";
import textFieldContent from "@/content/text-field.md";

const TextFieldPage = () => {
  const [mainFilled, setMainFilled] = useState("");
  const [mainOutlined, setMainOutlined] = useState("");
  const [filledVal, setFilledVal] = useState("");
  const [outlinedVal, setOutlinedVal] = useState("");
  const [leadingVal, setLeadingVal] = useState("");
  const [trailingVal, setTrailingVal] = useState("");
  const [supportingVal, setSupportingVal] = useState("");
  const [errorVal, setErrorVal] = useState("invalid-email");

  return (
    <PageContent>
      <Head>
        <title>React Native Materia - TextField</title>
      </Head>
      <MarkdownRenderer
        content={textFieldContent}
        slots={{
          DEMO_MAIN: (
            <Figure>
              <View style={styles.stack}>
                <TextField
                  mode="filled"
                  label="Username"
                  value={mainFilled}
                  onChangeText={setMainFilled}
                />
                <TextField
                  mode="outlined"
                  label="Email"
                  value={mainOutlined}
                  onChangeText={setMainOutlined}
                />
              </View>
            </Figure>
          ),
          DEMO_FILLED: (
            <Figure>
              <View style={styles.container}>
                <TextField
                  mode="filled"
                  label="Full name"
                  value={filledVal}
                  onChangeText={setFilledVal}
                />
              </View>
            </Figure>
          ),
          DEMO_OUTLINED: (
            <Figure>
              <View style={styles.container}>
                <TextField
                  mode="outlined"
                  label="Email address"
                  value={outlinedVal}
                  onChangeText={setOutlinedVal}
                />
              </View>
            </Figure>
          ),
          DEMO_LEADING_ICON: (
            <Figure>
              <View style={styles.container}>
                <TextField
                  label="Search"
                  leadingIcon="search-rounded"
                  value={leadingVal}
                  onChangeText={setLeadingVal}
                />
              </View>
            </Figure>
          ),
          DEMO_TRAILING_ICON: (
            <Figure>
              <View style={styles.container}>
                <TextField
                  label="Security Code"
                  trailingIcon="info-outline-rounded"
                  value={trailingVal}
                  onChangeText={setTrailingVal}
                />
              </View>
            </Figure>
          ),
          DEMO_SUPPORTING: (
            <Figure>
              <View style={styles.container}>
                <TextField
                  label="Phone number"
                  supportingText="Include country code, e.g. +1"
                  value={supportingVal}
                  onChangeText={setSupportingVal}
                />
              </View>
            </Figure>
          ),
          DEMO_ERROR: (
            <Figure>
              <View style={styles.container}>
                <TextField
                  label="Email"
                  value={errorVal}
                  onChangeText={setErrorVal}
                  error
                  supportingText="Enter a valid email address"
                />
              </View>
            </Figure>
          ),
          DEMO_DISABLED: (
            <Figure>
              <View style={styles.container}>
                <TextField
                  label="Account ID"
                  value="USR-94820"
                  disabled
                />
              </View>
            </Figure>
          ),
        }}
      />
    </PageContent>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 360,
  },
  stack: {
    width: "100%",
    maxWidth: 360,
    gap: 16,
  },
});

export default TextFieldPage;
