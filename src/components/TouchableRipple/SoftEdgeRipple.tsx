import { memo } from "react";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";

import { SoftEdgeRippleProps } from "./types";

export const SoftEdgeRipple = memo(
  ({ size, color, gradientId }: SoftEdgeRippleProps) => {
    const radius = size / 2;

    return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <RadialGradient
            id={gradientId}
            cx="50%"
            cy="50%"
            rx="50%"
            ry="50%"
            fx="50%"
            fy="50%"
          >
            <Stop offset="0%" stopColor={color} stopOpacity={1} />
            <Stop offset="65%" stopColor={color} stopOpacity={1} />
            <Stop offset="100%" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          fill={`url(#${gradientId})`}
        />
      </Svg>
    );
  },
);
