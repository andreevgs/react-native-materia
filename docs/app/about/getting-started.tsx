import Head from "expo-router/head";
import { MateriaText } from "react-native-materia";
import { PageContainerContent } from "@/components/PageContainer/PageContainerContent";

const GettingStarted = () => {
  return (
    <PageContainerContent>
      <Head>
        <title>React Native Materia - Getting Started</title>
      </Head>
      <MateriaText variant="displayLarge">Getting started</MateriaText>
    </PageContainerContent>
  );
};

export default GettingStarted;
