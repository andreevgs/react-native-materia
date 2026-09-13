import React from "react";
import Head from "expo-router/head";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import gettingStartedContent from "@/content/getting-started.md";

const GettingStarted = () => {
  return (
    <PageContent>
      <Head>
        <title>React Native Materia - Getting Started</title>
      </Head>
      <MarkdownRenderer content={gettingStartedContent} />
    </PageContent>
  );
};

export default GettingStarted;
