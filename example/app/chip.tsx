import React from "react";
import { Chip, AppBar, IconButton } from "react-native-materia";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { ComponentDemo } from "../components/ComponentDemo";

const ChipDemo = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <AppBar
        headline="Chip"
        leading={<IconButton icon="arrow-back" onPress={() => router.back()} />}
      />
      <ComponentDemo>
        <Chip onPress={() => {}} mode="outlined">
          Outlined Chip
        </Chip>
        <Chip onPress={() => {}} mode="tonal">
          Tonal Chip
        </Chip>
        <Chip onPress={() => {}} mode="elevated">
          Elevated Chip
        </Chip>
        <Chip onPress={() => {}} mode="outlined" leadingIcon="check">
          With Leading Icon
        </Chip>
        <Chip onPress={() => {}} mode="tonal" leadingIcon="check">
          Tonal With Leading Icon
        </Chip>
        <Chip onPress={() => {}} mode="tonal" trailingIcon="close">
          Tonal With Trailing Icon
        </Chip>
      </ComponentDemo>
    </ScreenWrapper>
  );
};

export default ChipDemo;

