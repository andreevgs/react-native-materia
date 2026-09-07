import { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  MateriaProvider,
  PortalHost,
  PortalProvider,
  useMateriaColors,
} from "react-native-materia";
import { MateriaScheme } from "react-native-materia/types";
import { Slot } from "expo-router";
import { useFonts } from "@expo-google-fonts/roboto/useFonts";
import { Roboto_400Regular } from "@expo-google-fonts/roboto/400Regular";
import { Roboto_500Medium } from "@expo-google-fonts/roboto/500Medium";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar/NavBar";
import { NavBarDrawer } from "@/components/NavBar/NavBarDrawer";
import { PageContainer } from "@/components/Page/PageContainer";
import { MAX_WIDTH_MOBILE } from "@/const/window";
import { typography } from "@/const/typography";
import { icons } from "@/const/icons";
import "@/styles/global.css";
import {
  CurrentThemeProvider,
  useCurrentTheme,
} from "@/providers/CurrentThemeProvider";

const DocsLayout = () => {
  const colors = useMateriaColors();

  const { width } = useWindowDimensions();
  const isMobile = width < MAX_WIDTH_MOBILE;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const styles = useMemo(() => createStyle(colors), [colors]);

  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);
  const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <View style={styles.rootLayout}>
      <Header onMenuPress={toggleDrawer} />
      <View style={styles.main}>
        {!isMobile && <NavBar />}
        <PageContainer style={styles.pageContainer}>
          <Slot />
        </PageContainer>
        {isMobile && (
          <NavBarDrawer open={drawerOpen} onClose={handleCloseDrawer} />
        )}
      </View>
    </View>
  );
};

const createStyle = (colors: MateriaScheme) =>
  StyleSheet.create({
    rootLayout: {
      flex: 1,
      backgroundColor: colors.surfaceContainer,
    },
    main: {
      flexDirection: "row",
      flex: 1,
    },
    pageContainer: {
      flex: 1,
    },
  });

const RootLayout = () => {
  const { currentTheme } = useCurrentTheme();

  return (
    <MateriaProvider mode={currentTheme} typography={typography} icons={icons}>
      <PortalProvider>
        <DocsLayout />
        <PortalHost />
      </PortalProvider>
    </MateriaProvider>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) return null;

  return (
    <CurrentThemeProvider>
      <RootLayout />
    </CurrentThemeProvider>
  );
};

export default App;
