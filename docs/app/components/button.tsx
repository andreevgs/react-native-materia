import React from "react";
import Head from "expo-router/head";
import { Button } from "react-native-materia";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Figure } from "@/components/Figure";
import buttonContent from "@/content/button.md";
import { RowWrap } from "@/components/RowWrap";

const ButtonPage = () => {
  return (
    <PageContent>
      <Head>
        <title>React Native Materia - Button</title>
      </Head>
      <MarkdownRenderer
        content={buttonContent}
        slots={{
          DEMO_MAIN: (
            <Figure>
              <RowWrap>
                <Button mode="filled" onPress={() => {}}>
                  Filled
                </Button>
                <Button mode="tonal" onPress={() => {}}>
                  Tonal
                </Button>
                <Button mode="outlined" onPress={() => {}}>
                  Outlined
                </Button>
                <Button mode="elevated" onPress={() => {}}>
                  Elevated
                </Button>
                <Button mode="text" onPress={() => {}}>
                  Text
                </Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_FILLED: (
            <Figure>
              <RowWrap>
                <Button mode="filled" onPress={() => {}}>
                  Filled Button
                </Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_TONAL: (
            <Figure>
              <RowWrap>
                <Button mode="tonal" onPress={() => {}}>
                  Tonal Button
                </Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_OUTLINED: (
            <Figure>
              <RowWrap>
                <Button mode="outlined" onPress={() => {}}>
                  Outlined Button
                </Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_ELEVATED: (
            <Figure>
              <RowWrap>
                <Button mode="elevated" onPress={() => {}}>
                  Elevated Button
                </Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_TEXT: (
            <Figure>
              <RowWrap>
                <Button mode="text" onPress={() => {}}>
                  Text Button
                </Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_ICON: (
            <Figure>
              <RowWrap>
                <Button
                  mode="filled"
                  icon="check-rounded"
                  onPress={() => {}}
                >
                  Save Changes
                </Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_STATES: (
            <Figure>
              <RowWrap>
                <Button mode="filled" disabled>
                  Disabled
                </Button>
                <Button mode="filled" loading>
                  Loading
                </Button>
              </RowWrap>
            </Figure>
          ),
        }}
      />
    </PageContent>
  );
};

export default ButtonPage;
