import React from "react";
import { View } from "react-native";
import {
  useMateriaIconography,
  useMateriaColors,
  useMateriaTokens,
} from "../../core/MateriaProvider";
import { IconProps } from "./types";

export const Icon = ({
  source: Source,
  size,
  color,
  style,
  accessibilityLabel,
  ...accessibilityProps
}: IconProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const icons = useMateriaIconography();

  const iconColor = color ?? colors.onSurfaceVariant;
  const iconSize = size ?? tokens.iconSize["24dp"];
  const iconSizeStyle = { width: iconSize, height: iconSize };

  const isAccessible = !!accessibilityLabel;
  const a11yProps = {
    accessible: isAccessible,
    accessibilityLabel,
    accessibilityElementsHidden: !isAccessible,
    importantForAccessibility: isAccessible ? "yes" : "no-hide-descendants",
    ...accessibilityProps,
  } as const;

  if (typeof Source === "string") {
    const Component = icons[Source];

    if (!Component) {
      if (__DEV__) {
        console.warn(
          `[Materia] Icon "${String(Source)}" not found. Check your MateriaIconography.`,
        );
      }
      return (
        <View
          style={[iconSizeStyle, { backgroundColor: "transparent" }, style]}
          {...a11yProps}
        />
      );
    }

    return (
      <Component
        color={iconColor as string}
        size={iconSize}
        style={style}
        {...a11yProps}
      />
    );
  }

  if (Source) {
    return (
      <Source
        color={iconColor as string}
        size={iconSize}
        style={style}
        {...a11yProps}
      />
    );
  }

  return null;
};
