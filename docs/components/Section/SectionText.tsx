import { forwardRef } from "react";
import { MateriaText, MateriaTextProps } from "react-native-materia";
import { Text as RNText } from "react-native";

export const SectionText = forwardRef<RNText, MateriaTextProps>(
  ({ style, ...props }, ref) => {
    return (
      <MateriaText
        ref={ref}
        variant="bodyLarge"
        style={style}
        {...props}
      />
    );
  },
);
