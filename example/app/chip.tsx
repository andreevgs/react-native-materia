import { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  AppBar,
  Chip,
  IconButton,
  MateriaText,
  useMateriaTokens,
} from "react-native-materia";
import { useRouter } from "expo-router";
import { Tokens } from "react-native-materia/types";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { ScrollContent } from "../components/ScrollContent";

const INITIAL_INPUT_VISIBLE = {
  closable: true,
  iconCloseOnly: true,
  selectedCloseOnly: true,
  customTrailing: true,
};

const ChipDemo = () => {
  const router = useRouter();
  const tokens = useMateriaTokens();

  const [filterSelected, setFilterSelected] = useState({
    basic: false,
    preselected: true,
    withIcon: false,
    noCheckmark: true,
    trailing: false,
    trailingAction: false,
    elevated: false,
    elevatedSelected: true,
  });

  const [inputSelected, setInputSelected] = useState({
    basic: false,
    withIcon: false,
    closable: true,
    customTrailing: false,
  });

  const [inputVisible, setInputVisible] = useState(INITIAL_INPUT_VISIBLE);

  const toggleFilter = (key: keyof typeof filterSelected) => {
    setFilterSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleInput = (key: keyof typeof inputSelected) => {
    setInputSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closeInput = (key: keyof typeof inputVisible) => {
    setInputVisible((prev) => ({ ...prev, [key]: false }));
  };

  const hasClosedInputs = Object.values(inputVisible).some(
    (visible) => !visible,
  );

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <ScreenWrapper>
      <AppBar
        headline="Chip"
        leading={
          <IconButton icon="arrow-back-rounded" onPress={() => router.back()} />
        }
      />
      <ScrollContent contentContainerStyle={styles.container}>
        <MateriaText variant="titleMedium" style={styles.sectionTitle}>
          Assist
        </MateriaText>
        <View style={styles.row}>
          <Chip.Assist onPress={() => {}}>Assist</Chip.Assist>
          <Chip.Assist onPress={() => {}} leadingIcon="add-rounded">
            With Icon
          </Chip.Assist>
          <Chip.Assist onPress={() => {}} elevated>
            Elevated
          </Chip.Assist>
          <Chip.Assist onPress={() => {}} elevated leadingIcon="add-rounded">
            Elevated Icon
          </Chip.Assist>
          <Chip.Assist disabled>Disabled</Chip.Assist>
          <Chip.Assist elevated disabled leadingIcon="add-rounded">
            Disabled Elevated
          </Chip.Assist>
        </View>

        <MateriaText variant="titleMedium" style={styles.sectionTitle}>
          Filter
        </MateriaText>
        <View style={styles.row}>
          <Chip.Filter
            selected={filterSelected.basic}
            onPress={() => toggleFilter("basic")}
          >
            Filter
          </Chip.Filter>
          <Chip.Filter
            selected={filterSelected.preselected}
            onPress={() => toggleFilter("preselected")}
          >
            Selected
          </Chip.Filter>
          <Chip.Filter
            selected={filterSelected.withIcon}
            leadingIcon="add-rounded"
            onPress={() => toggleFilter("withIcon")}
          >
            With Icon
          </Chip.Filter>
          <Chip.Filter
            selected={filterSelected.noCheckmark}
            showCheckmark={false}
            leadingIcon="add-rounded"
            onPress={() => toggleFilter("noCheckmark")}
          >
            No Checkmark
          </Chip.Filter>
          <Chip.Filter
            selected={filterSelected.trailing}
            trailingIcon="chevron-right-rounded"
            onPress={() => toggleFilter("trailing")}
          >
            Trailing Icon
          </Chip.Filter>
          <Chip.Filter
            selected={filterSelected.trailingAction}
            trailingIcon="close-rounded"
            trailingAccessibilityLabel="Clear filter"
            onTrailingIconPress={() =>
              setFilterSelected((prev) => ({ ...prev, trailingAction: false }))
            }
            onPress={() => toggleFilter("trailingAction")}
          >
            Trailing Action
          </Chip.Filter>
          <Chip.Filter
            selected={filterSelected.elevated}
            elevated
            onPress={() => toggleFilter("elevated")}
          >
            Elevated
          </Chip.Filter>
          <Chip.Filter
            selected={filterSelected.elevatedSelected}
            elevated
            onPress={() => toggleFilter("elevatedSelected")}
          >
            Elevated Selected
          </Chip.Filter>
          <Chip.Filter disabled>Disabled</Chip.Filter>
          <Chip.Filter selected disabled>
            Disabled Selected
          </Chip.Filter>
          <Chip.Filter elevated disabled>
            Disabled Elevated
          </Chip.Filter>
        </View>

        <MateriaText variant="titleMedium" style={styles.sectionTitle}>
          Input
        </MateriaText>
        <View style={styles.row}>
          <Chip.Input
            selected={inputSelected.basic}
            onPress={() => toggleInput("basic")}
          >
            Input
          </Chip.Input>
          <Chip.Input
            selected={inputSelected.withIcon}
            leadingIcon="add-rounded"
            onPress={() => toggleInput("withIcon")}
          >
            With Icon
          </Chip.Input>
          {inputVisible.closable && (
            <Chip.Input
              selected={inputSelected.closable}
              onPress={() => toggleInput("closable")}
              onClose={() => closeInput("closable")}
            >
              Closable
            </Chip.Input>
          )}
          {inputVisible.iconCloseOnly && (
            <Chip.Input
              leadingIcon="info-rounded"
              onClose={() => closeInput("iconCloseOnly")}
            >
              Close Only
            </Chip.Input>
          )}
          {inputVisible.selectedCloseOnly && (
            <Chip.Input
              selected
              onClose={() => closeInput("selectedCloseOnly")}
            >
              Selected Close
            </Chip.Input>
          )}
          {inputVisible.customTrailing && (
            <Chip.Input
              selected={inputSelected.customTrailing}
              trailingIcon="delete-rounded"
              closeAccessibilityLabel="Delete item"
              onPress={() => toggleInput("customTrailing")}
              onClose={() => closeInput("customTrailing")}
            >
              Custom Trailing
            </Chip.Input>
          )}
          <Chip.Input disabled onClose={() => {}}>
            Disabled
          </Chip.Input>
          <Chip.Input selected disabled onClose={() => {}}>
            Disabled Selected
          </Chip.Input>
          {hasClosedInputs && (
            <Chip.Assist
              leadingIcon="add-rounded"
              onPress={() => setInputVisible(INITIAL_INPUT_VISIBLE)}
            >
              Restore Closed
            </Chip.Assist>
          )}
        </View>

        <MateriaText variant="titleMedium" style={styles.sectionTitle}>
          Suggestion
        </MateriaText>
        <View style={styles.row}>
          <Chip.Suggestion onPress={() => {}}>Suggestion</Chip.Suggestion>
          <Chip.Suggestion onPress={() => {}} leadingIcon="add-rounded">
            With Icon
          </Chip.Suggestion>
          <Chip.Suggestion onPress={() => {}} elevated>
            Elevated
          </Chip.Suggestion>
          <Chip.Suggestion
            onPress={() => {}}
            elevated
            leadingIcon="add-rounded"
          >
            Elevated Icon
          </Chip.Suggestion>
          <Chip.Suggestion disabled>Disabled</Chip.Suggestion>
          <Chip.Suggestion elevated disabled leadingIcon="add-rounded">
            Disabled Elevated
          </Chip.Suggestion>
        </View>
      </ScrollContent>
    </ScreenWrapper>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: tokens.spacing.l,
      paddingBottom: tokens.spacing.xl,
      gap: tokens.spacing.m,
    },
    sectionTitle: {
      marginTop: tokens.spacing.l,
      marginBottom: tokens.spacing.xs,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: tokens.spacing.s,
    },
  });

export default ChipDemo;
