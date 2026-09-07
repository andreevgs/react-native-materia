import { useState, useEffect, startTransition } from "react";
import { parseMarkdownDocument } from "@/utils/md-parser";
import { ParsedMarkdownDocument } from "@/types/md-parser";

/**
 * Hook to asynchronously prepare markdown document structure in a non-blocking transition.
 * When `content` changes, previous content is immediately reset to avoid retaining stale views.
 */
export const usePreparedMarkdown = (
  content: string,
): ParsedMarkdownDocument | null => {
  const [preparedData, setPreparedData] =
    useState<ParsedMarkdownDocument | null>(null);

  useEffect(() => {
    let active = true;
    setPreparedData(null);

    startTransition(() => {
      const parsed = parseMarkdownDocument(content);

      if (active) {
        setPreparedData(parsed);
      }
    });

    return () => {
      active = false;
    };
  }, [content]);

  return preparedData;
};
