import { Chip as ChipComponent } from "./Chip";
import { AssistChip } from "./AssistChip";
import { FilterChip } from "./FilterChip";
import { InputChip } from "./InputChip";
import { SuggestionChip } from "./SuggestionChip";

export const Chip = Object.assign(ChipComponent, {
  Assist: AssistChip,
  Filter: FilterChip,
  Input: InputChip,
  Suggestion: SuggestionChip,
});

export { AssistChip, FilterChip, InputChip, SuggestionChip };
export type {
  ChipVariant,
  ChipProps,
  AssistChipProps,
  FilterChipProps,
  InputChipProps,
  SuggestionChipProps,
} from "./types";
