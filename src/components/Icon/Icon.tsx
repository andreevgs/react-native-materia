import React from "react";
import { View } from "react-native";
import {
  useMateriaIconography,
  useMateriaColors,
  useMateriaTokens,
} from "../../core/MateriaProvider";
import { IconProps } from "./types";

export const Icon = ({ source: Source, size, color, style }: IconProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const icons = useMateriaIconography();

  const iconColor = color ?? colors.onSurfaceVariant;
  const iconSize = size ?? tokens.iconSize["24dp"];
  const iconSizeStyle = { width: iconSize, height: iconSize };

  if (typeof Source === "string") {
    const Component = icons[Source as keyof typeof icons];

    if (!Component) {
      if (__DEV__) {
        console.warn(
          `[Materia] Icon "${String(Source)}" not found. Check your MateriaIconography.`,
        );
      }
      return (
        <View
          style={[iconSizeStyle, { backgroundColor: "transparent" }, style]}
        />
      );
    }

    return (
      <Component color={iconColor as string} size={iconSize} style={style} />
    );
  }

  if (Source) {
    return <Source color={iconColor as string} size={iconSize} style={style} />;
  }

  return null;
};
