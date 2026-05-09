import { Button } from "react-native-materia";
import { ComponentDemo } from "../components/ComponentDemo";

const ButtonDemo = () => {
  return (
    <ComponentDemo>
      <Button onPress={() => {}} mode="filled" icon="check">
        Filled Button
      </Button>
      <Button onPress={() => {}} mode="tonal">
        Tonal Button
      </Button>
      <Button onPress={() => {}} mode="outlined" icon="check">
        Outlined Button
      </Button>
      <Button onPress={() => {}} mode="elevated">
        Elevated Button
      </Button>
      <Button onPress={() => {}} mode="text">
        Text Button
      </Button>
    </ComponentDemo>
  );
};

export default ButtonDemo;
