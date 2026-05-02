import { MateriaText } from "react-native-materia";
import { ComponentDemo } from "../components/ComponentDemo";

const TextDemo = () => {
  return (
    <ComponentDemo>
      <MateriaText variant="displayLarge">Display Large</MateriaText>
      <MateriaText variant="headlineLarge">Headline Large</MateriaText>
      <MateriaText variant="titleLarge">Title Large</MateriaText>
      <MateriaText variant="bodyLarge">Body Large</MateriaText>
      <MateriaText variant="labelLarge">Label Large</MateriaText>
    </ComponentDemo>
  );
};

export default TextDemo;
