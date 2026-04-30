import { Icon, useMateriaColors } from "react-native-materia";
import { ComponentDemo } from "../components/ComponentDemo";

const IconDemo = () => {
  const colors = useMateriaColors();
  return (
    <ComponentDemo>
      <Icon source={"check"} size={48} color={colors.primary} />
    </ComponentDemo>
  );
};

export default IconDemo;
