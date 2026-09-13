import React from "react";
import Head from "expo-router/head";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import themingContent from "@/content/theming.md";

const ThemingPage = () => {
  return (
    <PageContent>
      <Head>
        <title>React Native Materia - Theming</title>
      </Head>
      <MarkdownRenderer content={themingContent} />
    </PageContent>
  );
};

export default ThemingPage;
