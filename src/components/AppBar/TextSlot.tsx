import React, { ReactNode } from "react";
import { MateriaText } from "../Text";
import { TypographyVariant } from "../../core/typography/types";

export interface TextSlotProps {
  content?: string | ReactNode;
  variant: TypographyVariant;
  color: string;
}

export const TextSlot = ({ content, variant, color }: TextSlotProps) => {
  if (!content) return null;

  if (typeof content === "string") {
    return (
      <MateriaText variant={variant} style={{ color }} numberOfLines={1}>
        {content}
      </MateriaText>
    );
  }

  return <>{content}</>;
};
