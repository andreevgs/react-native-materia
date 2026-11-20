import React from "react";
import { MateriaIconProps } from "react-native-materia/types";
import Svg, { Path } from "react-native-svg";

export const KeyboardArrowDownRoundedIcon = ({
  color,
  size,
  style,
}: MateriaIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <Path
      fill={color}
      d="M11.625 14.913q-.175-.063-.325-.213l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062t-.375-.062"
    />
  </Svg>
);
