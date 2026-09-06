import React from "react";
import Head from "expo-router/head";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import tokensContent from "@/content/tokens.md";

const TokensPage = () => {
  return (
    <PageContent>
      <Head>
        <title>React Native Materia - Tokens</title>
      </Head>
      <MarkdownRenderer content={tokensContent} />
    </PageContent>
  );
};

export default TokensPage;
