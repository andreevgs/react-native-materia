import { Icon, List, useMateriaTokens } from "react-native-materia";
import { ScrollScreenWrapper } from "../components/ScrollScreenWrapper";
import { View } from "react-native";

const ListDemo = () => {
  const tokens = useMateriaTokens();

  return (
    <ScrollScreenWrapper>
      <List variant="standard">
        <List.Item
          headline="Standard Item 1"
          supportingText="Supporting text"
        />
        <List.Item headline="Standard Item 2" />

        <List.Item
          headline="Standard Item 4"
          leadingContent={
            <Icon source="info-rounded" size={tokens.iconSize["20dp"]} />
          }
          trailingContent={
            <Icon source="chevron-right" size={tokens.iconSize["20dp"]} />
          }
          supportingText="Supporting text"
        />
      </List>
      <View
        style={{
          paddingHorizontal: tokens.spacing.l,
          marginTop: tokens.spacing.xl,
        }}
      >
        <List variant="segmented">
          <List.Item
            headline="Segmented Item 1"
            supportingText="Supporting text"
          />
          <List.Item headline="Segmented Item 2" />

          <List.Item
            headline="Segmented Item 4"
            leadingContent={
              <Icon source="info-rounded" size={tokens.iconSize["20dp"]} />
            }
            trailingContent={
              <Icon source="chevron-right" size={tokens.iconSize["20dp"]} />
            }
            supportingText="Supporting text"
          />
        </List>
      </View>
    </ScrollScreenWrapper>
  );
};

export default ListDemo;
