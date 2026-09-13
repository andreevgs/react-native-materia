import React from "react";
import Head from "expo-router/head";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import providerContent from "@/content/provider.md";

const ProviderPage = () => {
  return (
    <PageContent>
      <Head>
        <title>React Native Materia - Provider</title>
      </Head>
      <MarkdownRenderer content={providerContent} />
    </PageContent>
  );
};

export default ProviderPage;
