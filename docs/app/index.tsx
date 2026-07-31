import { View, Text, StyleSheet } from 'react-native';

export default function DocsIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Materia Docs</Text>
      <Text>Welcome to the documentation!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
