import { useMemo } from "react";
import { type Href } from "expo-router";
import { parseInlineSegments } from "@/utils/md-parser";
import { InlineCode } from "./InlineCode";
import { InlineLink } from "./InlineLink";

interface InlineMarkdownProps {
  text: string;
  blockKey: string;
}

/**
 * Renders inline markdown segments (links, code spans, and plain text).
 */
export const InlineMarkdown = ({ text, blockKey }: InlineMarkdownProps) => {
  const segments = useMemo(() => parseInlineSegments(text), [text]);

  return (
    <>
      {segments.map((segment, index) => {
        const key = `${blockKey}-${index}`;

        switch (segment.type) {
          case "text":
            return segment.content;
          case "code":
            return <InlineCode key={key}>{segment.content}</InlineCode>;
          case "link":
            return (
              <InlineLink key={key} href={segment.href as Href}>
                {segment.isCode ? (
                  <InlineCode>{segment.text}</InlineCode>
                ) : (
                  segment.text
                )}
              </InlineLink>
            );
        }
      })}
    </>
  );
};
