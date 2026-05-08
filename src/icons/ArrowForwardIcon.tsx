import React from "react";
import Svg, { Path } from "react-native-svg";
import { MateriaIconProps } from "../core/iconography/types";

export const ArrowForwardIcon = ({ color, size, style }: MateriaIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <Path
      d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
      fill={color}
    />
  </Svg>
);
