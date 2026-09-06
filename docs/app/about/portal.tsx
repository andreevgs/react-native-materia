import React from "react";
import Head from "expo-router/head";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import portalContent from "@/content/portal.md";

const PortalPage = () => {
  return (
    <PageContent>
      <Head>
        <title>React Native Materia - Portal</title>
      </Head>
      <MarkdownRenderer content={portalContent} />
    </PageContent>
  );
};

export default PortalPage;
