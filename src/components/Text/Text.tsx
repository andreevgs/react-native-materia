import React from "react";
import { Text as RNText } from "react-native";
import { useMateriaColors, useMateriaTypography } from "../../core";
import { MateriaTextProps } from "./types";

export const MateriaText = React.forwardRef<RNText, MateriaTextProps>(
  ({ variant = "bodyMedium", style, ...props }, ref) => {
    const typography = useMateriaTypography();
    const colors = useMateriaColors();

    const textColor = colors.onSurface;

    return (
      <RNText
        ref={ref}
        style={[typography[variant], { color: textColor }, style]}
        maxFontSizeMultiplier={1.5}
        {...props}
      />
    );
  },
);
