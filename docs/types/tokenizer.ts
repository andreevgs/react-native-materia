export interface CodeSnippetToken {
  text: string;
  type:
    | "keyword"
    | "string"
    | "comment"
    | "jsxTag"
    | "punctuation"
    | "number"
    | "plain";
}
