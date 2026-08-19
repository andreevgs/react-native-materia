import { PageContainerContent } from "@/components/PageContainer/PageContainerContent";
import { MateriaText } from "react-native-materia";
import Head from "expo-router/head";

const Main = () => {
  return (
    <PageContainerContent>
      <Head>
        <title>React Native Materia</title>
      </Head>
      <MateriaText variant="headlineSmall">
        React Native Materia Docs
      </MateriaText>
    </PageContainerContent>
  );
};

export default Main;
