import Head from "expo-router/head";
import { MateriaText } from "react-native-materia";
import { PageContainerContent } from "@/components/PageContainer/PageContainerContent";

const Support = () => {
  return (
    <PageContainerContent>
      <Head>
        <title>React Native Materia - Support</title>
      </Head>
      <MateriaText variant="displayLarge">Support</MateriaText>
    </PageContainerContent>
  );
};

export default Support;
