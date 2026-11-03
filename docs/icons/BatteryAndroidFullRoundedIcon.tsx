import Svg, { Path } from "react-native-svg";
import { MateriaIconProps } from "react-native-materia/types";

export const BatteryAndroidFullRoundedIcon = ({
  color,
  size,
  style,
}: MateriaIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <Path
      fill={color}
      d="M4 18q-1.25 0-2.125-.875T1 15V9q0-1.25.875-2.125T4 6h13.5q1.25 0 2.125.875T20.5 9v6q0 1.25-.875 2.125T17.5 18zm17.5-3.5v-5h.5q.425 0 .713.288T23 10.5v3q0 .425-.288.713T22 14.5z"
    />
  </Svg>
);
