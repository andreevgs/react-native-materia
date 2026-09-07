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
                <Button mode="filled">Filled</Button>
                <Button mode="tonal">Tonal</Button>
                <Button mode="outlined">Outlined</Button>
                <Button mode="elevated">Elevated</Button>
                <Button mode="text">Text</Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_FILLED: (
            <Figure>
              <RowWrap>
                <Button mode="filled">Filled Button</Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_TONAL: (
            <Figure>
              <RowWrap>
                <Button mode="tonal">Tonal Button</Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_OUTLINED: (
            <Figure>
              <RowWrap>
                <Button mode="outlined">Outlined Button</Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_ELEVATED: (
            <Figure>
              <RowWrap>
                <Button mode="elevated">Elevated Button</Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_TEXT: (
            <Figure>
              <RowWrap>
                <Button mode="text">Text Button</Button>
              </RowWrap>
            </Figure>
          ),
          DEMO_ICON: (
            <Figure>
              <RowWrap>
                <Button mode="filled" icon="check-rounded">
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
