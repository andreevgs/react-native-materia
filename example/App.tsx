import { StatusBar } from "expo-status-bar";
import { MateriaProvider, useMateriaColors } from "react-native-materia";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ComponentsScreen from "./screens/ComponensScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const RootLayout = () => {
  const colors = useMateriaColors();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: insets.top,
      }}
    >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            animation: "fade",
            sceneStyle: {
              backgroundColor: "transparent",
              borderTopWidth: 0,
              elevation: 0,
            },
          }}
        >
          <Tab.Screen
            name="components"
            component={ComponentsScreen}
            options={{
              tabBarLabel: "Components",
            }}
          />
          <Tab.Screen
            name="settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: "Settings",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <MateriaProvider mode="dark">
        <RootLayout />
        <StatusBar style="auto" />
      </MateriaProvider>
    </SafeAreaProvider>
  );
}
