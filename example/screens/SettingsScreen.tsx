import { View, StyleSheet } from "react-native";
import { List, MateriaText } from "react-native-materia";
import { Icon } from "../../src/components/Icon";

const SettingsScreen = () => {
  return (
    <View style={[styles.settings]}>
      <List variant="segmented">
        <List.Item
          headline="Main settings"
          supportingText="Design, sounds and notifications, Design, sounds and notifications, Design, sounds and notifications, Design, sounds and notifications"
          leadingContent={<Icon source="check" />}
          onPress={() => console.log("Pressed")}
        />
        <List.Item
          headline="Main settings"
          supportingText="Design, sounds and notifications"
          leadingContent={<Icon source="check" />}
          onPress={() => console.log("Pressed")}
        />
        <List.Item
          headline="Main settings"
          supportingText="Design, sounds and notifications"
          leadingContent={<Icon source="check" />}
          onPress={() => console.log("Pressed")}
        />
        <List.Item
          headline="About app"
          trailingContent={<Icon source="check" />}
          onPress={() => console.log("Pressed")}
        />
      </List>
    </View>
  );
};

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    gap: 16,
  },
});

export default SettingsScreen;
