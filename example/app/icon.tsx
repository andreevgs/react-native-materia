import React from "react";
import { Icon, AppBar, IconButton, useMateriaColors } from "react-native-materia";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { ComponentDemo } from "../components/ComponentDemo";

const IconDemo = () => {
  const router = useRouter();
  const colors = useMateriaColors();

  return (
    <ScreenWrapper>
      <AppBar
        headline="Icon"
        leading={<IconButton icon="arrow-back-rounded" onPress={() => router.back()} />}
      />
      <ComponentDemo>
        <Icon source="check-rounded" size={48} color={colors.primary} />
      </ComponentDemo>
    </ScreenWrapper>
  );
};

export default IconDemo;

