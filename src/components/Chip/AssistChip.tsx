import { ChipCore } from "./ChipCore";
import { AssistChipProps } from "./types";

export const AssistChip = ({ elevated = false, ...props }: AssistChipProps) => (
  <ChipCore variant="assist" elevated={elevated} {...props} />
);
