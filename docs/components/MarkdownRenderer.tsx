import { Fragment, ReactNode, useMemo } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { usePathname } from "expo-router";
import { useMateriaTokens } from "react-native-materia";
import { getMarkdownBlockSpacing } from "@/utils/md-parser";
import { MarkdownBlock } from "@/types/md-parser";
import { usePreparedMarkdown } from "@/hooks/usePreparedMarkdown";
import { createPageEntranceTransition } from "@/utils/motion";
import { PageHeader } from "./Page/PageHeader";
import { SectionHeader } from "./Section/SectionHeader";
import { SectionSubheader } from "./Section/SectionSubheader";
import { SectionText } from "./Section/SectionText";
import { SectionCodeSnippet } from "./Section/SectionCodeSnippet";
import { InlineMarkdown } from "./InlineMarkdown";

interface MarkdownRendererProps {
  content: string;
  slots?: Record<string, ReactNode>;
}

export const MarkdownRenderer = ({
  content,
  slots = {},
}: MarkdownRendererProps) => {
  const tokens = useMateriaTokens();
  const pathname = usePathname();
  const preparedData = usePreparedMarkdown(content);

  const entranceAnimation = useMemo(
    () => createPageEntranceTransition(tokens),
    [tokens],
  );

  if (!preparedData) {
    return null;
  }

  const { flatBlocks, codeBlocks } = preparedData;

  const renderBlockNode = (block: MarkdownBlock, key: string) => {
    switch (block.type) {
      case "code": {
        const snippet = codeBlocks[block.codeIndex];
        return <SectionCodeSnippet key={key} code={snippet.code} />;
      }
      case "slot":
        return <Fragment key={key}>{slots[block.slotName]}</Fragment>;
      case "pageHeader":
        return <PageHeader key={key}>{block.text}</PageHeader>;
      case "sectionHeader":
        return <SectionHeader key={key}>{block.text}</SectionHeader>;
      case "sectionSubheader":
        return <SectionSubheader key={key}>{block.text}</SectionSubheader>;
      case "paragraph":
        return (
          <SectionText key={key}>
            <InlineMarkdown text={block.text} blockKey={key} />
          </SectionText>
        );
      default:
        return null;
    }
  };

  return (
    <Animated.View key={pathname} entering={entranceAnimation}>
      {flatBlocks.map(({ block, key }, index) => {
        const prevType = index > 0 ? flatBlocks[index - 1].block.type : null;
        const spacing = getMarkdownBlockSpacing(prevType, block.type, tokens);

        return (
          <Fragment key={key}>
            {spacing > 0 && <View style={{ height: spacing }} />}
            {renderBlockNode(block, key)}
          </Fragment>
        );
      })}
    </Animated.View>
  );
};
