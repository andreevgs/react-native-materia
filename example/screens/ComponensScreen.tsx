import { ScrollView, StyleSheet, View } from "react-native";
import { Button, IconButton, useMateriaColors } from "react-native-materia";

const ComponensScreen = () => {
  const colors = useMateriaColors();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
      >
        <Button
          mode="filled"
          onPress={() => console.log("Pressed")}
          style={{ width: 300 }}
        >
          Filled Button Filled Button Filled Button Filled Button Filled Button
          Filled Button Filled Button Filled Button
        </Button>

        <Button mode="tonal">Tonal Button</Button>

        <Button mode="elevated" elevationLevel={14} icon="delete">
          Elevetaed Button
        </Button>

        <Button mode="outlined" icon="delete">
          Outlined Outlined Outlined Outlined
        </Button>

        <Button mode="tonal" icon="delete">
          Delete
        </Button>

        <Button mode="filled" loading>
          Loading...
        </Button>

        <Button mode="filled" disabled>
          Disabled
        </Button>

        <View style={styles.iconButtons}>
          <IconButton icon="close" />
          <IconButton icon="menu" />
          <IconButton icon="check" />
          <IconButton icon="delete" />
        </View>

        <View style={styles.iconButtons}>
          <IconButton icon="close" mode="tonal" />
          <IconButton icon="menu" mode="tonal" />
          <IconButton icon="check" mode="tonal" />
          <IconButton icon="delete" mode="tonal" />
        </View>

        <View style={styles.iconButtons}>
          <IconButton icon="close" mode="standard" />
          <IconButton icon="menu" mode="standard" />
          <IconButton icon="check" mode="standard" />
          <IconButton icon="delete" mode="standard" />
        </View>

        <View style={styles.iconButtons}>
          <IconButton icon="close" mode="outlined" />
          <IconButton icon="menu" mode="outlined" />
          <IconButton icon="check" mode="outlined" />
          <IconButton icon="delete" mode="outlined" />
        </View>

        <View style={styles.iconButtons}>
          <IconButton icon="close" loading mode="filled" />
          <IconButton icon="menu" disabled mode="filled" />
          <IconButton icon="check" mode="filled" />
          <IconButton icon="delete" mode="filled" />
        </View>
      </ScrollView>
    </View>
  );
};

export default ComponensScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 16,
  },
  iconButtons: {
    flexDirection: "row",
    gap: 16,
  },
});
