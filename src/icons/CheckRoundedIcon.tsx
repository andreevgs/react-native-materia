import React from "react";
import Svg, { Path } from "react-native-svg";
import { MateriaIconProps } from "../core/iconography/types";

export const CheckRoundedIcon = ({ color, size, style }: MateriaIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <Path
      fill={color}
      d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"
    />
  </Svg>
);
