import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import {
  useIconRegistry,
  useMateriaColors,
  useMateriaTokens,
} from "../../core/MateriaProvider";
import { IconProps } from "./types";

export const Icon = ({ source, size, color, style }: IconProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const icons = useIconRegistry();

  const iconColor = color ?? colors.onSurfaceVariant;
  const iconSize = size ?? tokens.iconSize["24dp"];
  const iconSizeStyle = { width: iconSize, height: iconSize };

  if (typeof source === "function") {
    const Component = source;
    return (
      <View style={[iconSizeStyle, style]}>
        <Component
          width={iconSize}
          height={iconSize}
          fill={iconColor}
          color={iconColor}
        />
      </View>
    );
  }

  if (typeof source === "string") {
    const path = icons[source];

    if (!path) {
      console.warn(
        `[Materia] Icon "${source}" not found. Check your IconRegistry.`,
      );
      return (
        <View
          style={[iconSizeStyle, { backgroundColor: "transparent" }, style]}
        />
      );
    }

    return (
      <View style={[iconSizeStyle, style]}>
        <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24">
          <Path d={path} fill={iconColor as string} />
        </Svg>
      </View>
    );
  }

  return null;
};
