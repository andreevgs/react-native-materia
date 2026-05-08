import { IconButton } from "react-native-materia";
import { ComponentDemo } from "../components/ComponentDemo";
import Svg, { Path } from "react-native-svg";
import { MateriaIconProps } from "react-native-materia/types";

const CustomIcon = ({ color, size, style }: MateriaIconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      style={style}
      viewBox="0 0 24 24"
    >
      <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </Svg>
  );
};

const IconButtonDemo = () => {
  return (
    <ComponentDemo>
      <IconButton icon="check" mode="standard" onPress={() => {}} />
      <IconButton icon="check" mode="filled" onPress={() => {}} />
      <IconButton icon="check" mode="tonal" onPress={() => {}} />
      <IconButton icon={CustomIcon} mode="outlined" onPress={() => {}} />
    </ComponentDemo>
  );
};

export default IconButtonDemo;
