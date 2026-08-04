import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  AppBar,
  IconButton,
  Button,
  ModalBottomSheet,
  BottomSheet,
  useMateriaColors,
  MateriaText,
  useMateriaTokens,
} from "react-native-materia";
import { useRouter } from "expo-router";
import { MateriaScheme, Tokens } from "react-native-materia/types";

const BottomSheetDemo = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const router = useRouter();

  const styles = useMemo(() => createStyles(tokens, colors), [tokens, colors]);

  return (
    <View style={styles.container}>
      <AppBar
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
        headline="Bottom Sheet"
      />

      <View style={styles.content}>
        <MateriaText
          variant="titleMedium"
          style={{ color: colors.onBackground }}
        >
          Standard Bottom Sheet
        </MateriaText>
        <MateriaText
          variant="bodyMedium"
          style={{ color: colors.onBackground, opacity: 0.8 }}
        >
          The standard bottom sheet is pinned to the bottom of the screen.
        </MateriaText>

        <MateriaText
          variant="titleMedium"
          style={[{ color: colors.onBackground }, styles.sectionTitle]}
        >
          Modal Bottom Sheet
        </MateriaText>
        <MateriaText
          variant="bodyMedium"
          style={{ color: colors.onBackground, opacity: 0.8 }}
        >
          A modal bottom sheet uses a portal to display over all other content
          and includes a scrim.
        </MateriaText>

        <Button
          mode="filled"
          onPress={() => setModalVisible(true)}
          style={styles.button}
        >
          Open Modal Sheet
        </Button>
      </View>

      <ModalBottomSheet
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <View style={styles.sheetContent}>
          <MateriaText
            variant="headlineSmall"
            style={{ color: colors.onSurface }}
          >
            Modal Sheet Content
          </MateriaText>
          <MateriaText
            variant="bodyLarge"
            style={{
              color: colors.onSurfaceVariant,
              marginTop: tokens.spacing.m,
            }}
          >
            This sheet is rendered inside the PortalHost at the root of the app.
            Swipe down or tap the backdrop to close it.
          </MateriaText>

          <Button
            mode="tonal"
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            Close
          </Button>
        </View>
      </ModalBottomSheet>

      <BottomSheet>
        <View style={styles.sheetContent}>
          <MateriaText
            variant="titleMedium"
            style={{ color: colors.onSurface }}
          >
            Persistent Standard Sheet
          </MateriaText>
          <MateriaText
            variant="bodyMedium"
            style={{
              color: colors.onSurfaceVariant,
              marginTop: tokens.spacing.xs,
            }}
          >
            Always visible at the bottom of the container.
          </MateriaText>
        </View>
      </BottomSheet>
    </View>
  );
};

const createStyles = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      padding: tokens.spacing.l,
    },
    sectionTitle: {
      marginTop: tokens.spacing.xl,
    },
    button: {
      alignSelf: "flex-start",
      marginTop: tokens.spacing.l,
    },
    sheetContent: {
      paddingHorizontal: tokens.spacing.xl,
      paddingTop: tokens.spacing.s,
      paddingBottom: tokens.spacing.xl,
    },
    closeButton: {
      marginTop: tokens.spacing.xl,
    },
  });

export default BottomSheetDemo;
