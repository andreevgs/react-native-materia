import React from "react";
import { ChipCore } from "./ChipCore";
import { SuggestionChipProps } from "./types";

export const SuggestionChip = ({
  elevated = false,
  ...props
}: SuggestionChipProps) => (
  <ChipCore variant="suggestion" elevated={elevated} {...props} />
);
