import React from "react";
import Head from "expo-router/head";
import { IconButton } from "react-native-materia";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Figure } from "@/components/Figure";
import { RowWrap } from "@/components/RowWrap";
import iconButtonContent from "@/content/icon-button.md";

const IconButtonPage = () => {
  return (
    <PageContent>
      <Head>
        <title>React Native Materia - IconButton</title>
      </Head>
      <MarkdownRenderer
        content={iconButtonContent}
        slots={{
          DEMO_MAIN: (
            <Figure>
              <RowWrap>
                <IconButton mode="filled" icon="check-rounded" />
                <IconButton mode="tonal" icon="check-rounded" />
                <IconButton mode="outlined" icon="check-rounded" />
                <IconButton mode="standard" icon="check-rounded" />
              </RowWrap>
            </Figure>
          ),
          DEMO_FILLED: (
            <Figure>
              <RowWrap>
                <IconButton mode="filled" icon="check-rounded" />
              </RowWrap>
            </Figure>
          ),
          DEMO_TONAL: (
            <Figure>
              <RowWrap>
                <IconButton mode="tonal" icon="check-rounded" />
              </RowWrap>
            </Figure>
          ),
          DEMO_OUTLINED: (
            <Figure>
              <RowWrap>
                <IconButton mode="outlined" icon="check-rounded" />
              </RowWrap>
            </Figure>
          ),
          DEMO_STANDARD: (
            <Figure>
              <RowWrap>
                <IconButton mode="standard" icon="check-rounded" />
              </RowWrap>
            </Figure>
          ),
          DEMO_STATES: (
            <Figure>
              <RowWrap>
                <IconButton mode="filled" icon="check-rounded" disabled />
                <IconButton mode="filled" icon="check-rounded" loading />
              </RowWrap>
            </Figure>
          ),
        }}
      />
    </PageContent>
  );
};

export default IconButtonPage;
