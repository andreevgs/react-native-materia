import React from "react";
import Head from "expo-router/head";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import indexContent from "@/content/index.md";
import { Showcase } from "@/components/Showcase";

const HomePage = () => {
  return (
    <PageContent>
      <Head>
        <title>React Native Materia</title>
      </Head>
      <MarkdownRenderer
        content={indexContent}
        slots={{
          DEMO_SHOWCASE: <Showcase />,
        }}
      />
    </PageContent>
  );
};

export default HomePage;
