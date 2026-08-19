import React from "react";
import Svg, { Path } from "react-native-svg";
import { MateriaIconProps } from "./types";

export const CheckIcon = ({ color, size, style }: MateriaIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill={color} />
  </Svg>
);
