import React, { useState } from "react";
import Head from "expo-router/head";
import { Icon, List, Switch } from "react-native-materia";
import { StyleSheet } from "react-native";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Figure } from "@/components/Figure";
import { RowWrap } from "@/components/RowWrap";
import switchContent from "@/content/switch.md";

const SwitchPage = () => {
  const [mainChecked, setMainChecked] = useState(true);
  const [unselectedVal, setUnselectedVal] = useState(false);
  const [selectedVal, setSelectedVal] = useState(true);
  const [pressedFirstVal, setPressedFirstVal] = useState(false);
  const [pressedSecondVal, setPressedSecondVal] = useState(true);

  const [pressedFirst, setPressedFirst] = useState(false);
  const [pressedSecond, setPressedSecond] = useState(false);

  return (
    <PageContent>
      <Head>
        <title>React Native Materia - Switch</title>
      </Head>
      <MarkdownRenderer
        content={switchContent}
        slots={{
          DEMO_MAIN: (
            <Figure>
              <Switch value={mainChecked} onValueChange={setMainChecked} />
            </Figure>
          ),
          DEMO_STATES: (
            <Figure>
              <RowWrap style={{ alignItems: "center" }}>
                <Switch
                  value={unselectedVal}
                  onValueChange={setUnselectedVal}
                />
                <Switch value={selectedVal} onValueChange={setSelectedVal} />
              </RowWrap>
            </Figure>
          ),
          DEMO_DISABLED: (
            <Figure>
              <RowWrap style={{ alignItems: "center" }}>
                <Switch value={false} onValueChange={() => {}} disabled />
                <Switch value={true} onValueChange={() => {}} disabled />
              </RowWrap>
            </Figure>
          ),
          DEMO_PRESSED: (
            <Figure>
              <List variant="segmented" style={styles.list}>
                <List.Item
                  headline="Wi-Fi"
                  supportingText="Connected to Network"
                  leadingContent={<Icon source="wifi-rounded" />}
                  trailingContent={
                    <Switch
                      value={pressedFirstVal}
                      pressed={pressedFirst}
                      onValueChange={() => {}}
                    />
                  }
                  onPress={() => setPressedFirstVal((v) => !v)}
                  onPressIn={() => setPressedFirst(true)}
                  onPressOut={() => setPressedFirst(false)}
                />
                <List.Item
                  headline="Bluetooth"
                  supportingText="Off"
                  leadingContent={<Icon source="bluetooth-rounded" />}
                  trailingContent={
                    <Switch
                      value={pressedSecondVal}
                      pressed={pressedSecond}
                      onValueChange={() => {}}
                    />
                  }
                  onPress={() => setPressedSecondVal((v) => !v)}
                  onPressIn={() => setPressedSecond(true)}
                  onPressOut={() => setPressedSecond(false)}
                />
              </List>
            </Figure>
          ),
        }}
      />
    </PageContent>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "40%",
    minWidth: 300,
  },
});

export default SwitchPage;
