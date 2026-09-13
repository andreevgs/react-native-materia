import {
  CodeBlockData,
  ExtractedCodeBlocks,
  InlineSegment,
  MarkdownBlock,
  MarkdownBlockItem,
  ParsedMarkdownDocument,
} from "@/types/md-parser";
import { Tokens } from "react-native-materia/types";

const MARKDOWN_CODE_BLOCK_REGEX = /```.*?\n([\s\S]*?)```/g;
const CODE_BLOCK_PLACEHOLDER_REGEX = /^<!-- CODE_BLOCK_(\d+) -->$/;
const SLOT_REGEX = /^<!--\s*SLOT:\s*(\w+)\s*-->$/;
const HEADING_REGEX = /^(#{1,3})\s+(.+)$/;
const INLINE_SEGMENT_REGEX =
  /\[(?<linkText>[^\]]+)\]\((?<linkHref>[^)]+)\)|`(?<codeText>[^`]+)`/g;



/**
 * Parses markdown code blocks and replaces them with temporary placeholders.
 */
export const extractCodeBlocks = (markdown: string): ExtractedCodeBlocks => {
  const codeBlocks: CodeBlockData[] = [];
  const normalizedText = markdown.replace(/\r\n/g, "\n");

  const content = normalizedText.replace(
    MARKDOWN_CODE_BLOCK_REGEX,
    (_, code) => {
      codeBlocks.push({ code: code.trim() });
      return `\n\n<!-- CODE_BLOCK_${codeBlocks.length - 1} -->\n\n`;
    },
  );

  return { content, codeBlocks };
};

/**
 * Identifies the type of a raw markdown block (heading, slot, code placeholder, or paragraph).
 */
export const parseMarkdownBlock = (rawMarkdownBlock: string): MarkdownBlock => {
  const content = rawMarkdownBlock.trim();

  const codeMatch = content.match(CODE_BLOCK_PLACEHOLDER_REGEX);
  if (codeMatch) {
    return { type: "code", codeIndex: parseInt(codeMatch[1], 10) };
  }

  const slotMatch = content.match(SLOT_REGEX);
  if (slotMatch) {
    return { type: "slot", slotName: slotMatch[1] };
  }

  const headingMatch = content.match(HEADING_REGEX);
  if (headingMatch) {
    const level = headingMatch[1].length;
    const text = headingMatch[2].trim();
    if (level === 1) return { type: "pageHeader", text };
    if (level === 2) return { type: "sectionHeader", text };
    return { type: "sectionSubheader", text };
  }

  return { type: "paragraph", text: content };
};

/**
 * Parses a markdown document into a sequential block list and extracted code snippets.
 */
export const parseMarkdownDocument = (
  markdown: string,
): ParsedMarkdownDocument => {
  const { content, codeBlocks } = extractCodeBlocks(markdown);
  const rawParagraphs = content.split(/\n\s*\n+/);

  const flatBlocks: MarkdownBlockItem[] = [];

  rawParagraphs.forEach((rawParagraph, index) => {
    const paragraphContent = rawParagraph.trim();
    if (!paragraphContent) return;

    flatBlocks.push({
      key: `block-${index}`,
      block: parseMarkdownBlock(paragraphContent),
    });
  });

  return { flatBlocks, codeBlocks };
};

/**
 * Calculates vertical spacing between two adjacent blocks based on their types.
 */
export const getMarkdownBlockSpacing = (
  prevType: MarkdownBlock["type"] | null,
  nextType: MarkdownBlock["type"],
  tokens: Tokens,
): number => {
  if (!prevType) return 0;
  if (nextType === "sectionHeader") return tokens.spacing.xxl;
  if (nextType === "sectionSubheader" || prevType === "sectionHeader") {
    return tokens.spacing.xl;
  }
  return tokens.spacing.l;
};

/**
 * Parses inline markdown segments (links, code spans, and plain text).
 */
export const parseInlineSegments = (text: string): InlineSegment[] => {
  if (!text.includes("[") && !text.includes("`")) {
    return [{ type: "text", content: text }];
  }

  const segments: InlineSegment[] = [];
  let lastIndex = 0;

  const addText = (end: number) => {
    if (end > lastIndex) {
      segments.push({ type: "text", content: text.slice(lastIndex, end) });
    }
  };

  for (const match of text.matchAll(INLINE_SEGMENT_REGEX)) {
    const matchIndex = match.index!;
    addText(matchIndex);

    const { linkText, linkHref, codeText } = match.groups!;

    if (linkText && linkHref) {
      const isCode = linkText.startsWith("`") && linkText.endsWith("`");
      segments.push({
        type: "link",
        text: isCode ? linkText.slice(1, -1) : linkText,
        href: linkHref,
        isCode,
      });
    } else if (codeText !== undefined) {
      segments.push({
        type: "code",
        content: codeText,
      });
    }

    lastIndex = matchIndex + match[0].length;
  }

  addText(text.length);

  return segments;
};

