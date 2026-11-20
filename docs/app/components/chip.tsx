import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import Head from "expo-router/head";
import { Chip, useMateriaTokens } from "react-native-materia";
import type { Tokens } from "react-native-materia/types";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Figure } from "@/components/Figure";
import { RowWrap } from "@/components/RowWrap";
import chipContent from "@/content/chip.md";

const INITIAL_INPUT_TAGS = ["React Native", "TypeScript"];
const LAYOUT_TOPICS = [
  "Design Systems",
  "React Native",
  "Accessibility",
  "Animation",
  "Typography",
  "Theming",
];

const ChipPage = () => {
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const [mainFilter, setMainFilter] = useState(true);
  const [mainInput, setMainInput] = useState(false);

  const [recentFilter, setRecentFilter] = useState(true);
  const [favoritesFilter, setFavoritesFilter] = useState(false);

  const [inputTags, setInputTags] = useState(INITIAL_INPUT_TAGS);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "Design Systems",
    "React Native",
  ]);

  const [elevatedFilter, setElevatedFilter] = useState(true);

  const [wifiFilter, setWifiFilter] = useState(true);
  const [bluetoothFilter, setBluetoothFilter] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState(true);
  const [savedSearchVisible, setSavedSearchVisible] = useState(true);

  return (
    <PageContent>
      <Head>
        <title>React Native Materia - Chip</title>
      </Head>
      <MarkdownRenderer
        content={chipContent}
        slots={{
          DEMO_MAIN: (
            <Figure>
              <RowWrap>
                <Chip.Assist leadingIcon="add-rounded" onPress={() => {}}>
                  Assist
                </Chip.Assist>
                <Chip.Filter
                  selected={mainFilter}
                  onPress={() => setMainFilter((prev) => !prev)}
                >
                  Filter
                </Chip.Filter>
                <Chip.Input
                  selected={mainInput}
                  onPress={() => setMainInput((prev) => !prev)}
                  onClose={() => {}}
                >
                  Input
                </Chip.Input>
                <Chip.Suggestion onPress={() => {}}>Suggestion</Chip.Suggestion>
              </RowWrap>
            </Figure>
          ),
          DEMO_ASSIST: (
            <Figure>
              <RowWrap>
                <Chip.Assist leadingIcon="add-rounded" onPress={() => {}}>
                  Add to calendar
                </Chip.Assist>
                <Chip.Assist leadingIcon="alarm-rounded" onPress={() => {}}>
                  Set alarm
                </Chip.Assist>
              </RowWrap>
            </Figure>
          ),
          DEMO_FILTER: (
            <Figure>
              <RowWrap>
                <Chip.Filter
                  selected={recentFilter}
                  onPress={() => setRecentFilter((prev) => !prev)}
                >
                  Recent
                </Chip.Filter>
                <Chip.Filter
                  selected={favoritesFilter}
                  onPress={() => setFavoritesFilter((prev) => !prev)}
                >
                  Favorites
                </Chip.Filter>
              </RowWrap>
            </Figure>
          ),
          DEMO_INPUT: (
            <Figure>
              <RowWrap>
                {inputTags.map((tag) => (
                  <Chip.Input
                    key={tag}
                    selected={selectedTag === tag}
                    onPress={() =>
                      setSelectedTag((prev) => (prev === tag ? null : tag))
                    }
                    onClose={() => {
                      setInputTags((prev) =>
                        prev.filter((item) => item !== tag),
                      );
                      setSelectedTag((prev) => (prev === tag ? null : prev));
                    }}
                  >
                    {tag}
                  </Chip.Input>
                ))}
                {inputTags.length < INITIAL_INPUT_TAGS.length && (
                  <Chip.Assist
                    leadingIcon="add-rounded"
                    onPress={() => setInputTags(INITIAL_INPUT_TAGS)}
                  >
                    Restore
                  </Chip.Assist>
                )}
              </RowWrap>
            </Figure>
          ),
          DEMO_SUGGESTION: (
            <Figure>
              <RowWrap>
                <Chip.Suggestion
                  leadingIcon="search-rounded"
                  onPress={() => {}}
                >
                  Cafes nearby
                </Chip.Suggestion>
                <Chip.Suggestion
                  leadingIcon="schedule-rounded"
                  onPress={() => {}}
                >
                  Open now
                </Chip.Suggestion>
                <Chip.Suggestion onPress={() => {}}>
                  Outdoor seating
                </Chip.Suggestion>
              </RowWrap>
            </Figure>
          ),
          DEMO_LAYOUT: (
            <Figure>
              <RowWrap style={styles.chipGroup}>
                {LAYOUT_TOPICS.map((topic) => (
                  <Chip.Filter
                    key={topic}
                    selected={selectedTopics.includes(topic)}
                    onPress={() =>
                      setSelectedTopics((prev) =>
                        prev.includes(topic)
                          ? prev.filter((item) => item !== topic)
                          : [...prev, topic],
                      )
                    }
                  >
                    {topic}
                  </Chip.Filter>
                ))}
              </RowWrap>
            </Figure>
          ),
          DEMO_ELEVATED: (
            <Figure>
              <RowWrap>
                <Chip.Assist elevated onPress={() => {}}>
                  Elevated Assist
                </Chip.Assist>
                <Chip.Filter
                  elevated
                  selected={elevatedFilter}
                  onPress={() => setElevatedFilter((prev) => !prev)}
                >
                  Elevated Filter
                </Chip.Filter>
                <Chip.Suggestion elevated onPress={() => {}}>
                  Elevated Suggestion
                </Chip.Suggestion>
              </RowWrap>
            </Figure>
          ),
          DEMO_LEADING_ICON: (
            <Figure>
              <RowWrap>
                <Chip.Assist leadingIcon="add-rounded" onPress={() => {}}>
                  Pair device
                </Chip.Assist>
                <Chip.Filter
                  selected={wifiFilter}
                  leadingIcon="wifi-rounded"
                  onPress={() => setWifiFilter((prev) => !prev)}
                >
                  Wi-Fi
                </Chip.Filter>
                <Chip.Filter
                  selected={bluetoothFilter}
                  showCheckmark={false}
                  leadingIcon="bluetooth-rounded"
                  onPress={() => setBluetoothFilter((prev) => !prev)}
                >
                  Bluetooth
                </Chip.Filter>
              </RowWrap>
            </Figure>
          ),
          DEMO_TRAILING: (
            <Figure>
              <RowWrap>
                <Chip.Filter
                  selected={categoryFilter}
                  trailingIcon="keyboard-arrow-down-rounded"
                  onPress={() => setCategoryFilter((prev) => !prev)}
                >
                  Category
                </Chip.Filter>
                <Chip.Filter
                  selected={priceFilter}
                  trailingIcon="close-rounded"
                  trailingAccessibilityLabel="Clear price filter"
                  onPress={() => setPriceFilter((prev) => !prev)}
                  onTrailingIconPress={() => setPriceFilter(false)}
                >
                  Under $50
                </Chip.Filter>
                {savedSearchVisible ? (
                  <Chip.Input
                    leadingIcon="search-rounded"
                    trailingIcon="delete-rounded"
                    closeAccessibilityLabel="Delete saved search"
                    onClose={() => setSavedSearchVisible(false)}
                  >
                    Saved: Headphones
                  </Chip.Input>
                ) : (
                  <Chip.Assist
                    leadingIcon="add-rounded"
                    onPress={() => setSavedSearchVisible(true)}
                  >
                    Restore
                  </Chip.Assist>
                )}
              </RowWrap>
            </Figure>
          ),
          DEMO_DISABLED: (
            <Figure>
              <RowWrap>
                <Chip.Assist disabled>Disabled Assist</Chip.Assist>
                <Chip.Assist elevated disabled>
                  Disabled Elevated
                </Chip.Assist>
                <Chip.Filter selected disabled>
                  Disabled Selected
                </Chip.Filter>
                <Chip.Input disabled onClose={() => {}}>
                  Disabled Input
                </Chip.Input>
              </RowWrap>
            </Figure>
          ),
        }}
      />
    </PageContent>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    chipGroup: {
      alignItems: "flex-start",
      gap: tokens.spacing.s,
      maxWidth: 360,
    },
  });

export default ChipPage;
