import { IconButton } from "react-native-materia";
import { ComponentDemo } from "../components/ComponentDemo";

const IconButtonDemo = () => {
  return (
    <ComponentDemo>
      <IconButton icon="check" mode="standard" onPress={() => {}} />
      <IconButton icon="check" mode="filled" onPress={() => {}} />
      <IconButton icon="check" mode="tonal" onPress={() => {}} />
      <IconButton icon="check" mode="outlined" onPress={() => {}} />
    </ComponentDemo>
  );
};

export default IconButtonDemo;
