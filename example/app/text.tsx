import React from "react";
import { MateriaText, AppBar, IconButton } from "react-native-materia";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { ComponentDemo } from "../components/ComponentDemo";

const TextDemo = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <AppBar
        headline="Text"
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
      />
      <ComponentDemo>
        <MateriaText variant="displayLarge">Display Large</MateriaText>
        <MateriaText variant="headlineLarge">Headline Large</MateriaText>
        <MateriaText variant="titleLarge">Title Large</MateriaText>
        <MateriaText variant="bodyLarge">Body Large</MateriaText>
        <MateriaText variant="labelLarge">Label Large</MateriaText>
      </ComponentDemo>
    </ScreenWrapper>
  );
};

export default TextDemo;

