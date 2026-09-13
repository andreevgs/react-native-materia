import { CodeSnippetToken } from "@/types/tokenizer";

type TokenType = Exclude<CodeSnippetToken["type"], "plain">;

const KEYWORDS = [
  "import", "export", "from", "default", "const", "let", "var", "function",
  "return", "if", "else", "switch", "case", "break", "continue", "type",
  "interface", "extends", "implements", "true", "false", "null", "undefined",
  "async", "await", "as", "any", "unknown", "never", "string", "number",
  "boolean", "void", "new", "this", "typeof", "keyof", "readonly", "class",
  "enum", "in", "of", "for", "while", "try", "catch", "finally", "throw",
];

const TOKEN_RULES: [TokenType, string][] = [
  // 1: Comments (single-line // or multi-line /* */)
  ["comment", "//[^\\n]*|/\\*[\\s\\S]*?\\*/"],
  // 2: Strings (double, single, template literals with escape support)
  [
    "string",
    '"(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\'|`(?:[^`\\\\]|\\\\.)*`',
  ],
  // 3: Keywords, types, and language primitives
  ["keyword", `\\b(?:${KEYWORDS.join("|")})\\b`],
  // 4: JSX tags (<Tag, </Tag>, />)
  ["jsxTag", "<\\/?[A-Za-z_][\\w.-]*|\\/>"],
  // 5: Numbers
  ["number", "\\b\\d+(?:\\.\\d+)?\\b"],
  // 6: Compound operators & punctuation
  [
    "punctuation",
    "=>|===|!==|==|!=|<=|>=|&&|\\|\\||\\?\\?|\\?\\.|\\.\\.\\.|[{}()\\[\\];,.<>=|&?+*/!%^-]",
  ],
];

const CODE_TOKENIZER_REGEX = new RegExp(
  TOKEN_RULES.map(([type, pattern]) => `(?<${type}>${pattern})`).join("|"),
  "g",
);

const getTokenType = (
  groups: Record<string, string | undefined>,
): CodeSnippetToken["type"] => {
  for (const key in groups) {
    if (groups[key] !== undefined) {
      return key as CodeSnippetToken["type"];
    }
  }
  return "plain";
};

export const tokenizeCode = (code: string): CodeSnippetToken[] => {
  const tokens: CodeSnippetToken[] = [];
  let lastIndex = 0;

  const addPlain = (end: number) => {
    if (end > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, end), type: "plain" });
    }
  };

  for (const match of code.matchAll(CODE_TOKENIZER_REGEX)) {
    const matchIndex = match.index!;
    addPlain(matchIndex);

    tokens.push({
      text: match[0],
      type: getTokenType(match.groups!),
    });

    lastIndex = matchIndex + match[0].length;
  }

  addPlain(code.length);

  return tokens;
};

