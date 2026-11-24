import React, { useMemo, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  AppBar,
  IconButton,
  Button,
  ModalBottomSheet,
  BottomSheet,
  BottomSheetScrollView,
  BottomSheetCoreRef,
  useMateriaColors,
  MateriaText,
  useMateriaTokens,
} from "react-native-materia";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { Tokens } from "react-native-materia/types";

const SAMPLE_ITEMS = Array.from({ length: 24 }, (_, i) => i + 1);

const BottomSheetDemo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [snapSheetVisible, setSnapSheetVisible] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);

  const snapSheetRef = useRef<BottomSheetCoreRef>(null);

  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const router = useRouter();

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <ScreenWrapper>
      <AppBar
        leading={
          <IconButton icon="arrow-back-rounded" onPress={() => router.back()} />
        }
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

        <Button
          mode="tonal"
          onPress={() => setSnapSheetVisible(true)}
          style={styles.button}
        >
          Open Multi-Snap Scrollable Sheet
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

      <ModalBottomSheet
        ref={snapSheetRef}
        visible={snapSheetVisible}
        snapPoints={["25%", "50%", "100%"]}
        initialSnapIndex={1}
        onSnapPointChange={setSnapIndex}
        onDismiss={() => setSnapSheetVisible(false)}
      >
        <View style={styles.snapHeader}>
          <MateriaText
            variant="titleMedium"
            style={{ color: colors.onSurface }}
          >
            Snap Point: {snapIndex >= 0 ? `${snapIndex}` : "Closed"}
          </MateriaText>
          <View style={styles.snapActions}>
            <Button
              mode="text"
              onPress={() => snapSheetRef.current?.snapToIndex(0)}
            >
              25%
            </Button>
            <Button
              mode="text"
              onPress={() => snapSheetRef.current?.snapToIndex(1)}
            >
              50%
            </Button>
            <Button
              mode="text"
              onPress={() => snapSheetRef.current?.snapToIndex(2)}
            >
              100%
            </Button>
          </View>
        </View>

        <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
          {SAMPLE_ITEMS.map((item) => (
            <View
              key={item}
              style={[
                styles.scrollItem,
                { backgroundColor: colors.surfaceContainerHigh },
              ]}
            >
              <MateriaText
                variant="bodyLarge"
                style={{ color: colors.onSurface }}
              >
                Scrollable Item {item}
              </MateriaText>
            </View>
          ))}
        </BottomSheetScrollView>
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
    </ScreenWrapper>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
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
    snapHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: tokens.spacing.xl,
      paddingBottom: tokens.spacing.s,
    },
    snapActions: {
      flexDirection: "row",
      alignItems: "center",
    },
    scrollContent: {
      paddingHorizontal: tokens.spacing.xl,
      paddingBottom: tokens.spacing.xl,
      gap: tokens.spacing.s,
    },
    scrollItem: {
      padding: tokens.spacing.m,
      borderRadius: tokens.shape.medium,
    },
  });

export default BottomSheetDemo;
