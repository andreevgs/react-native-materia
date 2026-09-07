import Head from "expo-router/head";
import { List, Icon, Switch } from "react-native-materia";
import { StyleSheet } from "react-native";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Figure } from "@/components/Figure";
import listContent from "@/content/list.md";

const ListPage = () => {
  return (
    <PageContent>
      <Head>
        <title>React Native Materia - List</title>
      </Head>
      <MarkdownRenderer
        content={listContent}
        slots={{
          DEMO_MAIN: (
            <Figure>
              <List variant="segmented" style={styles.list}>
                <List.Item headline="Item 1" />
                <List.Item headline="Item 2" />
                <List.Item headline="Item 3" />
              </List>
            </Figure>
          ),
          DEMO_STANDARD: (
            <Figure>
              <List variant="standard" style={styles.list}>
                <List.Item headline="Standard Item 1" />
                <List.Item headline="Standard Item 2" />
              </List>
            </Figure>
          ),
          DEMO_SEGMENTED: (
            <Figure>
              <List variant="segmented" style={styles.list}>
                <List.Item headline="Segmented Item 1" />
                <List.Item headline="Segmented Item 2" />
              </List>
            </Figure>
          ),
          DEMO_CONTENT: (
            <Figure>
              <List variant="segmented" style={styles.list}>
                <List.Item
                  headline="Wi-Fi"
                  supportingText="Connected to Network"
                  leadingContent={<Icon source="wifi-rounded" />}
                  trailingContent={
                    <Switch value={true} onValueChange={() => {}} />
                  }
                  onPress={() => {}}
                />
                <List.Item
                  headline="Bluetooth"
                  supportingText="Off"
                  leadingContent={<Icon source="bluetooth-rounded" />}
                  trailingContent={
                    <Switch value={false} onValueChange={() => {}} />
                  }
                  onPress={() => {}}
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

export default ListPage;
