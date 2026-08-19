import {
  MateriaProvider,
  PortalHost,
  PortalProvider,
} from "react-native-materia";
import { StatusBar, StyleSheet, View } from "react-native";
import { NavBar } from "@/components/NavBar/NavBar";
import { MateriaScheme } from "react-native-materia/types";
import { useMateriaColors } from "react-native-materia";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Slot } from "expo-router";
import { useFonts } from "@expo-google-fonts/roboto/useFonts";
import { Roboto_400Regular } from "@expo-google-fonts/roboto/400Regular";
import { Roboto_500Medium } from "@expo-google-fonts/roboto/500Medium";
import { typography } from "@/const/typography";
import { Header } from "@/components/Header";
import { icons } from "@/const/icons";

const RootLayout = () => {
  const colors = useMateriaColors();
  const styles = createStyle(colors);

  return (
    <View style={styles.rootLayout}>
      <Header />
      <View style={styles.main}>
        <NavBar />
        <PageContainer style={styles.pageContainer}>
          <Slot />
        </PageContainer>
      </View>
    </View>
  );
};

const createStyle = (colors: MateriaScheme) =>
  StyleSheet.create({
    rootLayout: {
      flex: 1,
    },
    main: {
      backgroundColor: colors.surfaceContainer,
      flexDirection: "row",
      flex: 1,
    },
    pageContainer: {
      flex: 1,
    },
  });

const App = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) return null;

  return (
    <MateriaProvider mode="light" typography={typography} icons={icons}>
      <PortalProvider>
        <RootLayout />
        <PortalHost />
        <StatusBar barStyle="light-content" />
      </PortalProvider>
    </MateriaProvider>
  );
};

export default App;
