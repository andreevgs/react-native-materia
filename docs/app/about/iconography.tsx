import React from "react";
import Head from "expo-router/head";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import iconographyContent from "@/content/iconography.md";

const IconographyPage = () => {
  return (
    <PageContent>
      <Head>
        <title>React Native Materia - Iconography</title>
      </Head>
      <MarkdownRenderer content={iconographyContent} />
    </PageContent>
  );
};

export default IconographyPage;
