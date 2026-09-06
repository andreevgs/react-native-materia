import React from "react";
import Head from "expo-router/head";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import typographyContent from "@/content/typography.md";

const TypographyPage = () => {
  return (
    <PageContent>
      <Head>
        <title>React Native Materia - Typography</title>
      </Head>
      <MarkdownRenderer content={typographyContent} />
    </PageContent>
  );
};

export default TypographyPage;
