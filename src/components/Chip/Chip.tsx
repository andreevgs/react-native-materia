import { AssistChip } from "./AssistChip";
import { FilterChip } from "./FilterChip";
import { InputChip } from "./InputChip";
import { SuggestionChip } from "./SuggestionChip";
import { ChipProps } from "./types";

export const Chip = (props: ChipProps) => {
  switch (props.variant) {
    case "filter": {
      const { variant: _variant, ...filterProps } = props;
      return <FilterChip {...filterProps} />;
    }
    case "input": {
      const { variant: _variant, ...inputProps } = props;
      return <InputChip {...inputProps} />;
    }
    case "suggestion": {
      const { variant: _variant, ...suggestionProps } = props;
      return <SuggestionChip {...suggestionProps} />;
    }
    case "assist":
    default: {
      const { variant: _variant, ...assistProps } = props;
      return <AssistChip {...assistProps} />;
    }
  }
};
