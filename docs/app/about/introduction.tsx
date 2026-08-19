import Head from "expo-router/head";
import { MateriaText } from "react-native-materia";
import { PageContainerContent } from "@/components/PageContainer/PageContainerContent";

const Introduction = () => {
  return (
    <PageContainerContent>
      <Head>
        <title>React Native Materia - Introduction</title>
      </Head>
      <MateriaText variant="displayLarge">Introduction</MateriaText>
    </PageContainerContent>
  );
};

export default Introduction;
