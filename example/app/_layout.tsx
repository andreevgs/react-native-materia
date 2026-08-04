import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { MateriaProvider, useMateriaColors, PortalProvider, PortalHost } from "react-native-materia";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
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
      <KeyboardProvider>
        <MateriaProvider mode="light">
          <PortalProvider>
            <RootLayout />
            <PortalHost />
            <StatusBar barStyle="light-content" />
          </PortalProvider>
        </MateriaProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};

export default App;
