import { Chip } from "react-native-materia";
import { ComponentDemo } from "../components/ComponentDemo";

const ChipDemo = () => {
  return (
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
  );
};

export default ChipDemo;
