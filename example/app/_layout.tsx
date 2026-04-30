import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { MateriaProvider, useMateriaColors } from "react-native-materia";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SystemUI from "expo-system-ui";

const RootLayout = () => {
  const colors = useMateriaColors();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background);
  }, [colors]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

const App = () => {
  return (
    <SafeAreaProvider>
      <MateriaProvider mode="light">
        <RootLayout />
        <StatusBar barStyle="light-content" />
      </MateriaProvider>
    </SafeAreaProvider>
  );
};

export default App;
