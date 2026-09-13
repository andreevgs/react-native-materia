import React from "react";
import { Button, AppBar, IconButton } from "react-native-materia";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { ComponentDemo } from "../components/ComponentDemo";

const ButtonDemo = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <AppBar
        headline="Button"
        leading={<IconButton icon="arrow-back-rounded" onPress={() => router.back()} />}
      />
      <ComponentDemo>
        <Button onPress={() => { }} mode="filled" icon="check-rounded">
          Filled Button
        </Button>
        <Button onPress={() => { }} mode="tonal">
          Tonal Button
        </Button>
        <Button onPress={() => { }} mode="outlined" icon="check-rounded">
          Outlined Button
        </Button>
        <Button onPress={() => { }} mode="elevated">
          Elevated Button
        </Button>
        <Button onPress={() => { }} mode="text">
          Text Button
        </Button>
      </ComponentDemo>
    </ScreenWrapper>
  );
};

export default ButtonDemo;

