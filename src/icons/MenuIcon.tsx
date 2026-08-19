import React from "react";
import Svg, { Path } from "react-native-svg";
import { MateriaIconProps } from "./types";

export const MenuIcon = ({ color, size, style }: MateriaIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <Path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill={color} />
  </Svg>
);
