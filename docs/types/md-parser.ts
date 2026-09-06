export interface CodeBlockData {
  code: string;
}

export type MarkdownBlock =
  | { type: "code"; codeIndex: number }
  | { type: "slot"; slotName: string }
  | { type: "pageHeader"; text: string }
  | { type: "sectionHeader"; text: string }
  | { type: "sectionSubheader"; text: string }
  | { type: "paragraph"; text: string };

export interface MarkdownBlockItem {
  key: string;
  block: MarkdownBlock;
}

export type MarkdownDocumentNode =
  | { type: "root"; key: string; block: MarkdownBlock }
  | {
      type: "section";
      key: string;
      blocks: MarkdownBlockItem[];
    };

export interface ExtractedCodeBlocks {
  content: string;
  codeBlocks: CodeBlockData[];
}

export interface ParsedMarkdownDocument {
  flatBlocks: MarkdownBlockItem[];
  codeBlocks: CodeBlockData[];
}

export type InlineSegment =
  | { type: "text"; content: string }
  | { type: "code"; content: string }
  | { type: "link"; text: string; href: string; isCode: boolean };

